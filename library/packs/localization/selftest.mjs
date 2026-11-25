#!/usr/bin/env node
// pack-localization selftest. Packaging only: manifest, files, hashes, encoding,
// placeholders, token cap, sections, negative fixtures. It does not translate
// anything, call a service, or claim that a locale is approved.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST = 'manifest.json';
const ID = 'pack-localization';
const CHAR_CAP = 6000; // 1,500 tokens at chars/4
const TEMPLATE_CAP = 4000; // one page
const LINE_CAP = 250;
const KEYS = ['files', 'hashes', 'id', 'loaded', 'requires', 'selftest', 'upgrade', 'version'];
const REQUIRES = ['core', 'game'];
const PLACEHOLDER = '{' + '{';
const SECTIONS = [
  '## When to load',
  '## Boundaries',
  '## Pack contract',
  '## Source-string rules',
  '## Glossary and term base',
  '## Plurals and gender',
  '## Text expansion',
  '## Fonts, RTL and CJK',
  '## Screenshots for translators',
  '## Pseudo-localization',
  '## QA checklist',
  '## Holds',
  '## Cross-refs',
  'never publish or spend',
];
const SECRETS = [
  /BEGIN [A-Z ]*PRIVATE KEY/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
];
const results = [];
function check(name, fn) {
  try {
    results.push({ name, ok: true, detail: fn() ?? '' });
  } catch (error) {
    results.push({ name, ok: false, detail: error.message });
  }
}

function need(condition, message) {
  if (!condition) throw new Error(message);
}

function rejects(label, fn) {
  try {
    fn();
  } catch {
    return label;
  }
  throw new Error(`${label}: not rejected`);
}

const read = (name) => readFileSync(join(HERE, name));
const text = (name) => read(name).toString('utf8');
const sha256 = (name) => createHash('sha256').update(read(name)).digest('hex');
const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
function walk(dir, base) {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
    else throw new Error(`unsupported entry: ${rel}`);
  }
  return out;
}
let manifest = null;
check('manifest parses', () => {
  manifest = JSON.parse(text(MANIFEST));
  need(isObject(manifest), 'not an object');
  return MANIFEST;
});

function manifestOf() {
  need(manifest, 'manifest unreadable');
  return manifest;
}
function identity(m) {
  need(m.id === ID, `id ${JSON.stringify(m.id)}`);
  need(typeof m.version === 'string' && /^\d+\.\d+\.\d+$/.test(m.version), `version ${JSON.stringify(m.version)}`);
  need(JSON.stringify(m.requires) === JSON.stringify(REQUIRES), `requires ${JSON.stringify(m.requires)}`);
  need(m.loaded === 'on-demand', `loaded ${JSON.stringify(m.loaded)}`);
  return `${m.id} ${m.version} ${m.loaded}`;
}

function keys(m) {
  const found = Object.keys(m).filter((key) => key !== '$schema').sort();
  need(JSON.stringify(found) === JSON.stringify(KEYS), `keys [${found}] != [${KEYS}]`);
  return `${KEYS.length} keys`;
}

function fileList(m) {
  need(Array.isArray(m.files) && m.files.length > 0, 'empty or not an array');
  for (const name of m.files) {
    need(typeof name === 'string' && name.length > 0, 'non-string entry');
    need(!name.includes('\\'), `${name}: not POSIX`);
    need(!name.startsWith('/') && !name.split('/').includes('..'), `${name}: not relative`);
    need(name !== MANIFEST, `${MANIFEST} must not list itself`);
    need(name !== 'PACK.md' || m.files.includes('selftest.mjs'), 'selftest.mjs missing');
    const full = join(HERE, name);
    need(existsSync(full) && statSync(full).isFile(), `${name}: missing`);
    need(statSync(full).size > 0, `${name}: empty`);
  }
  return `${m.files.length} files`;
}

function diskMatch(disk, listed) {
  const a = [...disk].sort();
  const b = [...listed].sort();
  need(JSON.stringify(a) === JSON.stringify(b), `directory [${a}] != files [${b}]`);
  return `${b.length} files`;
}

function hashes(m) {
  need(isObject(m.hashes), 'not an object');
  need(Array.isArray(m.files), 'files not an array');
  const listed = [...m.files].sort();
  const found = Object.keys(m.hashes).sort();
  need(JSON.stringify(found) === JSON.stringify(listed), `keys [${found}] != files [${listed}]`);
  for (const name of m.files) {
    const expected = m.hashes[name];
    need(typeof expected === 'string' && /^[0-9a-f]{64}$/.test(expected), `${name}: not a sha256`);
    need(expected === sha256(name), `${name}: hash mismatch`);
  }
  return `${listed.length} sha256`;
}

function encoding(names) {
  const issues = [];
  for (const name of names) {
    if (!existsSync(join(HERE, name))) continue;
    const raw = read(name);
    const decoded = text(name);
    if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) issues.push(`${name}: BOM`);
    if (decoded.includes('\r')) issues.push(`${name}: CRLF`);
    if (decoded.includes(PLACEHOLDER)) issues.push(`${name}: ${PLACEHOLDER}`);
    if (decoded.includes('\uFFFD')) issues.push(`${name}: U+FFFD`);
    try {
      new TextDecoder('utf-8', { fatal: true }).decode(raw);
    } catch {
      issues.push(`${name}: invalid UTF-8`);
    }
  }
  need(issues.length === 0, issues.join('; '));
  return `${names.length} text files`;
}

function caps(m) {
  const pack = [...text('PACK.md')].length;
  need(pack <= CHAR_CAP, `PACK.md: ${pack} chars > ${CHAR_CAP}`);
  const pages = m.files.filter((name) => name.startsWith('templates/') && name.endsWith('.md'));
  for (const name of pages) {
    const chars = [...text(name)].length;
    need(chars <= TEMPLATE_CAP, `${name}: ${chars} chars > ${TEMPLATE_CAP}`);
  }
  return `PACK.md ${pack} chars, ${pages.length} template(s)`;
}

function sections(pack) {
  const missing = SECTIONS.filter((needle) => !pack.includes(needle));
  need(missing.length === 0, `missing: ${missing.join(', ')}`);
  return `${SECTIONS.length} needles`;
}

function secrets(names) {
  const hits = [];
  for (const name of names) {
    const body = text(name);
    for (const pattern of SECRETS) {
      if (pattern.test(body)) hits.push(`${name}: ${pattern}`);
    }
  }
  need(hits.length === 0, hits.join('; '));
  return 'no key or token patterns';
}

check('identity', () => identity(manifestOf()));
check('keys', () => keys(manifestOf()));
check('$schema', () => {
  need(!('$schema' in manifestOf()), '$schema present');
  return 'absent';
});

check('selftest command', () => {
  const command = manifestOf().selftest;
  need(typeof command === 'string', 'missing');
  const match = command.match(/^node\s+(\S+)$/);
  need(match, `expected "node <file>", got ${JSON.stringify(command)}`);
  need(existsSync(join(HERE, match[1])), `${match[1]} missing`);
  return command;
});

check('files listing', () => fileList(manifestOf()));
check('files on disk', () => diskMatch(walk(HERE, '').filter((name) => name !== MANIFEST), manifestOf().files));
check('hashes', () => hashes(manifestOf()));
check('encoding and placeholders', () => encoding([MANIFEST, ...manifestOf().files]));
check('token cap', () => caps(manifestOf()));

check('line budget', () => {
  const lines = text('selftest.mjs').split('\n').length;
  need(lines <= LINE_CAP, `${lines} lines > ${LINE_CAP}`);
  return `${lines} lines`;
});

check('required sections', () => sections(text('PACK.md')));
check('no secrets', () => secrets([MANIFEST, ...manifestOf().files]));
check('upgrade', () => {
  const upgrade = manifestOf().upgrade;
  if (upgrade === 'none') return 'none';
  need(isObject(upgrade), 'not "none" or an object');
  need(typeof upgrade.from === 'string' && upgrade.from.length > 0, 'from missing');
  need(typeof upgrade.note === 'string' && upgrade.note.length > 0, 'note missing');
  return `from ${upgrade.from}`;
});

check('negative: extra file', () => rejects('extra file', () => diskMatch(['PACK.md', 'extra.txt'], ['PACK.md'])));

check('negative: bad hash', () => {
  const m = manifestOf();
  const bad = { ...m, hashes: { ...m.hashes, 'PACK.md': '0'.repeat(64) } };
  return rejects('bad hash', () => hashes(bad));
});

check('negative: string file entry', () => {
  const m = manifestOf();
  return rejects('string file entry', () => fileList({ ...m, files: [...m.files, 42] }));
});

check('negative: missing section', () => rejects('missing section', () => sections(text('PACK.md').replace('## QA checklist', '## QA'))));

let failed = 0;
for (const result of results) {
  if (!result.ok) failed += 1;
  const detail = result.detail ? `: ${result.detail}` : '';
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${detail}`);
}
process.exit(failed === 0 ? 0 : 1);
