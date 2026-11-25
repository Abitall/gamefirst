#!/usr/bin/env node
// pack-release selftest. Packaging only: manifest, files, hashes, encoding,
// placeholders, token cap. It does not build the game, contact a store, or
// claim that a release is approved.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST = 'manifest.json';
const ID = 'pack-release';
const CHAR_CAP = 6000; // 1,500 tokens at chars/4
const TEMPLATE_CAP = 4000; // one page
const LINE_CAP = 250;
const KEYS = ['files', 'hashes', 'id', 'loaded', 'requires', 'selftest', 'upgrade', 'version'];
const REQUIRES = ['core', 'game'];
const PLACEHOLDER = '{' + '{';
const SECTIONS = [
  '## Pack contract',
  '### 1. Platform requirements',
  '### 2. Store pages',
  '### 3. Build pipeline',
  '### 4. Crash reporting',
  '### 5. Legal and privacy',
  '### 6. Launch day',
  '### 7. 72h watch',
  '### 8. No-publish rule',
  'never publish',
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

check('identity', () => {
  const m = manifestOf();
  need(m.id === ID, `id ${JSON.stringify(m.id)}`);
  need(typeof m.version === 'string' && /^\d+\.\d+\.\d+$/.test(m.version), `version ${JSON.stringify(m.version)}`);
  need(JSON.stringify(m.requires) === JSON.stringify(REQUIRES), `requires ${JSON.stringify(m.requires)}`);
  need(m.loaded === 'on-demand', `loaded ${JSON.stringify(m.loaded)}`);
  return `${m.id} ${m.version} ${m.loaded}`;
});

check('keys', () => {
  const m = manifestOf();
  const keys = Object.keys(m).filter((key) => key !== '$schema').sort();
  need(JSON.stringify(keys) === JSON.stringify(KEYS), `keys [${keys}] != [${KEYS}]`);
  return `${KEYS.length} keys`;
});

check('$schema', () => {
  const schema = manifestOf().$schema;
  if (schema === undefined) return 'absent';
  need(typeof schema === 'string' && schema.length > 0, 'empty');
  need(!/^https?:\/\//.test(schema), `remote: ${schema}`);
  const local = schema.replace(/^\.\//, '');
  need(existsSync(join(HERE, local)), `missing: ${local}`);
  return local;
});

check('selftest command', () => {
  const command = manifestOf().selftest;
  need(typeof command === 'string', 'missing');
  const match = command.match(/^node\s+(\S+)$/);
  need(match, `expected "node <file>", got ${JSON.stringify(command)}`);
  need(existsSync(join(HERE, match[1])), `${match[1]} missing`);
  return command;
});

check('files listing', () => {
  const m = manifestOf();
  need(Array.isArray(m.files) && m.files.length > 0, 'empty or not an array');
  for (const name of m.files) {
    need(typeof name === 'string' && name.length > 0, 'non-string entry');
    need(!name.includes('\\'), `${name}: not POSIX`);
    need(!name.startsWith('/') && !name.split('/').includes('..'), `${name}: not relative`);
    need(name !== MANIFEST, `${MANIFEST} must not list itself`);
    const full = join(HERE, name);
    need(existsSync(full) && statSync(full).isFile(), `${name}: missing`);
    need(statSync(full).size > 0, `${name}: empty`);
  }
  const disk = walk(HERE, '').filter((name) => name !== MANIFEST).sort();
  const listed = [...m.files].sort();
  need(JSON.stringify(disk) === JSON.stringify(listed), `directory [${disk}] != files [${listed}]`);
  return `${listed.length} files`;
});

check('hashes', () => {
  const m = manifestOf();
  need(isObject(m.hashes), 'not an object');
  need(Array.isArray(m.files), 'files not an array');
  const listed = [...m.files].sort();
  const keys = Object.keys(m.hashes).sort();
  need(JSON.stringify(keys) === JSON.stringify(listed), `keys [${keys}] != files [${listed}]`);
  for (const name of m.files) {
    const expected = m.hashes[name];
    need(typeof expected === 'string' && /^[0-9a-f]{64}$/.test(expected), `${name}: not a sha256`);
    need(expected === sha256(name), `${name}: hash mismatch`);
  }
  return `${listed.length} sha256`;
});

check('encoding and placeholders', () => {
  const names = [MANIFEST, ...manifestOf().files];
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
});

check('token cap', () => {
  const pack = [...text('PACK.md')].length;
  need(pack <= CHAR_CAP, `PACK.md: ${pack} chars > ${CHAR_CAP}`);
  const templates = manifestOf().files.filter((name) => name.startsWith('templates/') && name.endsWith('.md'));
  for (const name of templates) {
    const chars = [...text(name)].length;
    need(chars <= TEMPLATE_CAP, `${name}: ${chars} chars > ${TEMPLATE_CAP}`);
  }
  return `PACK.md ${pack} chars, ${templates.length} template(s)`;
});

check('line budget', () => {
  const lines = text('selftest.mjs').split('\n').length;
  need(lines <= LINE_CAP, `${lines} lines > ${LINE_CAP}`);
  return `${lines} lines`;
});

check('required sections', () => {
  const pack = text('PACK.md');
  const missing = SECTIONS.filter((needle) => !pack.includes(needle));
  need(missing.length === 0, `missing: ${missing.join(', ')}`);
  return `${SECTIONS.length} needles`;
});

check('no secrets', () => {
  const names = [MANIFEST, ...manifestOf().files];
  const hits = [];
  for (const name of names) {
    const body = text(name);
    for (const pattern of SECRETS) {
      if (pattern.test(body)) hits.push(`${name}: ${pattern}`);
    }
  }
  need(hits.length === 0, hits.join('; '));
  return 'no key or token patterns';
});

check('upgrade', () => {
  const upgrade = manifestOf().upgrade;
  if (upgrade === 'none') return 'none';
  need(isObject(upgrade), 'not "none" or an object');
  need(typeof upgrade.from === 'string' && upgrade.from.length > 0, 'from missing');
  need(typeof upgrade.note === 'string' && upgrade.note.length > 0, 'note missing');
  return `from ${upgrade.from}`;
});

let failed = 0;
for (const result of results) {
  if (!result.ok) failed += 1;
  const detail = result.detail ? `: ${result.detail}` : '';
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${detail}`);
}
process.exit(failed === 0 ? 0 : 1);
