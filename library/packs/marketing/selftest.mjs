#!/usr/bin/env node
// pack-marketing selftest. Packaging only: manifest, files, hashes, encoding,
// placeholders, caps, sections. It does not post, upload, spend, or claim that a
// page is approved.
import { createHash } from 'node:crypto';
import { cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST = 'manifest.json';
const ID = 'pack-marketing';
const CHAR_CAP = 6000; // 1,500 tokens at chars/4
const TEMPLATE_CAP = 4000; // one page
const LINE_CAP = 250;
const KEYS = ['files', 'hashes', 'id', 'loaded', 'requires', 'selftest', 'upgrade', 'version'];
const REQUIRES = ['core', 'game'];
const PLACEHOLDER = '{' + '{';
const SECTIONS = [
  '## When to load',
  '## Boundaries',
  '## Audience and positioning',
  '## Store page copy fields',
  '## Capsule, screenshots, trailer',
  '## Wishlist, demo, press kit',
  '## Community and launch calendar',
  '## Claims and evidence',
  '## Review checklist',
  '## Holds',
  '## Cross-refs',
  'Never post',
  'writes no final copy',
];
const SECRETS = [
  /BEGIN [A-Z ]*PRIVATE KEY/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
];

function need(condition, message) {
  if (!condition) throw new Error(message);
}

const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);
const sha256 = (root, name) => createHash('sha256').update(readFileSync(join(root, name))).digest('hex');

function walk(dir, base = '') {
  const out = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) out.push(...walk(join(dir, entry.name), rel));
    else if (entry.isFile()) out.push(rel);
    else throw new Error(`unsupported entry: ${rel}`);
  }
  return out;
}

function run(root) {
  const results = [];
  const check = (name, fn) => {
    try {
      results.push({ name, ok: true, detail: fn() ?? '' });
    } catch (error) {
      results.push({ name, ok: false, detail: error.message });
    }
  };
  const read = (name) => readFileSync(join(root, name));
  const text = (name) => read(name).toString('utf8');
  let manifest = null;

  check('manifest parses', () => {
    manifest = JSON.parse(text(MANIFEST));
    need(isObject(manifest), 'not an object');
    return MANIFEST;
  });

  const m = () => {
    need(manifest, 'manifest unreadable');
    return manifest;
  };

  check('identity', () => {
    const brand = m();
    need(brand.id === ID, `id ${JSON.stringify(brand.id)}`);
    need(typeof brand.version === 'string' && /^\d+\.\d+\.\d+$/.test(brand.version), `version ${JSON.stringify(brand.version)}`);
    need(JSON.stringify(brand.requires) === JSON.stringify(REQUIRES), `requires ${JSON.stringify(brand.requires)}`);
    need(brand.loaded === 'on-demand', `loaded ${JSON.stringify(brand.loaded)}`);
    return `${brand.id} ${brand.version} ${brand.loaded}`;
  });

  check('keys', () => {
    const keys = Object.keys(m()).filter((key) => key !== '$schema').sort();
    need(JSON.stringify(keys) === JSON.stringify(KEYS), `keys [${keys}] != [${KEYS}]`);
    need(m().$schema === undefined, '$schema must be absent');
    return `${KEYS.length} keys`;
  });

  check('selftest command', () => {
    const command = m().selftest;
    need(typeof command === 'string', 'missing');
    const match = command.match(/^node\s+(\S+)$/);
    need(match, `expected "node <file>", got ${JSON.stringify(command)}`);
    need(existsSync(join(root, match[1])), `${match[1]} missing`);
    return command;
  });

  check('files listing', () => {
    const listed = m().files;
    need(Array.isArray(listed) && listed.length > 0, 'empty or not an array');
    for (const name of listed) {
      need(typeof name === 'string' && name.length > 0, 'non-string entry');
      need(!name.includes('\\'), `${name}: not POSIX`);
      need(!name.startsWith('/') && !name.split('/').includes('..'), `${name}: not relative`);
      need(name !== MANIFEST, `${MANIFEST} must not list itself`);
      const full = join(root, name);
      need(existsSync(full) && statSync(full).isFile(), `${name}: missing`);
      need(statSync(full).size > 0, `${name}: empty`);
    }
    const disk = walk(root).filter((name) => name !== MANIFEST).sort();
    const sorted = [...listed].sort();
    need(JSON.stringify(disk) === JSON.stringify(sorted), `directory [${disk}] != files [${sorted}]`);
    return `${sorted.length} files`;
  });

  check('hashes', () => {
    const hashes = m().hashes;
    need(isObject(hashes), 'not an object');
    const listed = [...m().files].sort();
    const keys = Object.keys(hashes).sort();
    need(JSON.stringify(keys) === JSON.stringify(listed), `keys [${keys}] != files [${listed}]`);
    for (const name of m().files) {
      const expected = hashes[name];
      need(typeof expected === 'string' && /^[0-9a-f]{64}$/.test(expected), `${name}: not a sha256`);
      need(expected === sha256(root, name), `${name}: hash mismatch`);
    }
    return `${listed.length} sha256`;
  });

  check('encoding and placeholders', () => {
    const names = [MANIFEST, ...m().files];
    const issues = [];
    for (const name of names) {
      if (!existsSync(join(root, name))) continue;
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
    const templates = m().files.filter((name) => name.startsWith('templates/') && name.endsWith('.md'));
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
    const names = [MANIFEST, ...m().files];
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
    const upgrade = m().upgrade;
    if (upgrade === 'none') return 'none';
    need(isObject(upgrade), 'not "none" or an object');
    need(typeof upgrade.from === 'string' && upgrade.from.length > 0, 'from missing');
    need(typeof upgrade.note === 'string' && upgrade.note.length > 0, 'note missing');
    return `from ${upgrade.from}`;
  });

  return results;
}
function rewriteManifest(dir, mutate) {
  const file = join(dir, MANIFEST);
  const value = JSON.parse(readFileSync(file, 'utf8'));
  mutate(value);
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

const NEGATIVE = [
  ['extra file', 'files listing', (dir) => writeFileSync(join(dir, 'extra.md'), 'extra\n')],
  ['bad hash', 'hashes', (dir) => rewriteManifest(dir, (value) => { value.hashes['PACK.md'] = '0'.repeat(64); })],
  ['string file entry', 'files listing', (dir) => rewriteManifest(dir, (value) => { value.files[0] = 42; })],
  ['missing section', 'required sections', (dir) => {
    const file = join(dir, 'PACK.md');
    writeFileSync(file, readFileSync(file, 'utf8').replace('## Holds', '## Halted'));
  }],
];

let failed = 0;
for (const result of run(HERE)) {
  if (!result.ok) failed += 1;
  const detail = result.detail ? `: ${result.detail}` : '';
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${detail}`);
}

for (const [label, target, mutate] of NEGATIVE) {
  const dir = mkdtempSync(join(tmpdir(), 'pack-marketing-'));
  try {
    cpSync(HERE, dir, { recursive: true });
    mutate(dir);
    const found = run(dir).find((result) => result.name === target);
    need(found && found.ok === false, `${target} passed unexpectedly`);
    console.log(`ok   negative: ${label}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL negative: ${label}: ${error.message}`);
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

process.exit(failed === 0 ? 0 : 1);
