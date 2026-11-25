#!/usr/bin/env node
// Offline packaging self-test for the audio pack. No network, no runtime import.
import { createHash } from 'node:crypto';
import {
  existsSync, mkdtempSync, mkdirSync, readFileSync, readdirSync, rmSync,
  statSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST = 'manifest.json';
const CHAR_CAP = 6000;
const TOKEN_CAP = 1500;
const TEMPLATE_CAP = 4000;
const LINE_CAP = 250;
const KEYS = ['files', 'hashes', 'id', 'loaded', 'requires', 'selftest', 'upgrade', 'version'];
const REQUIRES = ['core', 'game'];
const PLACEHOLDER = '{' + '{';
const SECTIONS = [
  '## Boundaries',
  '## Audio pillars',
  '## SFX and music brief',
  '## Loudness, format, loop, compression',
  '## Implementation hooks',
  '## Mixing and accessibility',
  '## Licensing',
  '## Review checklist',
  '## Holds',
  '## Cross-refs',
];
const HEX = /^[a-f0-9]{64}$/;
const SECRETS = [
  /BEGIN [A-Z ]*PRIVATE KEY/,
  /gh[pousr]_[A-Za-z0-9]{20,}/,
  /AKIA[0-9A-Z]{16}/,
];

const results = [];
function check(name, fn) {
  try {
    fn();
    results.push({ name, ok: true });
  } catch (error) {
    results.push({ name, ok: false, detail: error.message });
  }
}
function need(condition, message) {
  if (!condition) throw new Error(message);
}
function read(file) { return readFileSync(file, 'utf8'); }
function bytes(file) { return readFileSync(file); }
function sha256(file) {
  return createHash('sha256').update(bytes(file)).digest('hex');
}
function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}
function walk(dir, base = '') {
  const out = [];
  for (const name of readdirSync(join(dir, base))) {
    const rel = base ? `${base}/${name}` : name;
    const full = join(dir, rel);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...walk(dir, rel));
    else if (stat.isFile()) out.push(rel);
    else throw new Error(`not a file: ${rel}`);
  }
  return out;
}
function loadManifest(dir = HERE) {
  const manifest = JSON.parse(read(join(dir, MANIFEST)));
  need(isObject(manifest), 'manifest must be an object');
  return manifest;
}
function checkIdentity(m) {
  need(m.id === 'pack-audio', `id: ${m.id}`);
  need(m.version === '0.1.0', `version: ${m.version}`);
  need(JSON.stringify(m.requires) === JSON.stringify(REQUIRES), 'requires must be core,game');
  need(m.loaded === 'on-demand', `loaded: ${m.loaded}`);
  need(m.selftest === 'node selftest.mjs', `selftest: ${m.selftest}`);
  need(m.upgrade === 'none', `upgrade: ${m.upgrade}`);
}
function checkKeys(m) {
  const keys = Object.keys(m).sort();
  need(keys.length === KEYS.length, `expected ${KEYS.length} keys, got ${keys.length}`);
  for (const key of KEYS) need(keys.includes(key), `missing key: ${key}`);
  for (const key of keys) need(KEYS.includes(key), `unexpected key: ${key}`);
}
function checkFilesEntries(dir, m) {
  need(Array.isArray(m.files), 'files must be an array');
  need(m.files.length > 0, 'files is empty');
  for (const file of m.files) {
    need(typeof file === 'string', 'files entries must be strings');
    need(file.length > 0, 'empty path');
    need(!file.includes('\\'), `backslash: ${file}`);
    need(!file.startsWith('/') && !file.split('/').includes('..'), `unsafe path: ${file}`);
    need(file !== MANIFEST, 'manifest must not list itself');
    const full = join(dir, file);
    need(existsSync(full), `missing file: ${file}`);
    need(statSync(full).isFile(), `not a file: ${file}`);
    need(statSync(full).size > 0, `empty file: ${file}`);
  }
}
function checkFileSet(dir, m) {
  const disk = walk(dir).filter((file) => file !== MANIFEST).sort();
  const listed = [...m.files].sort();
  need(JSON.stringify(disk) === JSON.stringify(listed),
    `listing differs: disk=${disk.join(',')} manifest=${listed.join(',')}`);
}
function checkHashes(dir, m) {
  need(isObject(m.hashes), 'hashes must be an object');
  const files = [...m.files].sort();
  const keys = Object.keys(m.hashes).sort();
  need(JSON.stringify(keys) === JSON.stringify(files), 'hash keys must equal files');
  for (const file of files) {
    need(HEX.test(m.hashes[file]), `bad hash format: ${file}`);
    need(m.hashes[file] === sha256(join(dir, file)), `hash mismatch: ${file}`);
  }
}
function checkEncoding(dir, m) {
  for (const file of m.files) {
    const buf = bytes(join(dir, file));
    need(!(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf), `BOM: ${file}`);
    need(!buf.includes(0x0d), `CR: ${file}`);
    let text;
    try {
      text = new TextDecoder('utf-8', { fatal: true }).decode(buf);
    } catch {
      throw new Error(`invalid UTF-8: ${file}`);
    }
    need(!text.includes('\uFFFD'), `replacement char: ${file}`);
    need(!text.includes(PLACEHOLDER), `placeholder: ${file}`);
  }
}
function checkCaps(m) {
  const pack = read(join(HERE, 'PACK.md'));
  need(pack.length <= CHAR_CAP, `PACK.md ${pack.length} > ${CHAR_CAP}`);
  need(Math.ceil(pack.length / 4) <= TOKEN_CAP,
    `PACK.md ${Math.ceil(pack.length / 4)} > ${TOKEN_CAP} tokens`);
  for (const file of m.files.filter((f) => f.startsWith('templates/') && f.endsWith('.md'))) {
    const size = read(join(HERE, file)).length;
    need(size <= TEMPLATE_CAP, `${file} ${size} > ${TEMPLATE_CAP}`);
  }
}
function checkSections(text) {
  for (const section of SECTIONS) need(text.includes(section), `missing section: ${section}`);
}
function checkLineCap() {
  const lines = read(join(HERE, 'selftest.mjs')).split('\n').length;
  need(lines <= LINE_CAP, `selftest.mjs ${lines} > ${LINE_CAP}`);
}
function checkSecrets(dir, m) {
  for (const file of m.files) {
    const text = read(join(dir, file));
    for (const pattern of SECRETS) {
      need(!pattern.test(text), `possible secret: ${file}`);
    }
  }
}
function fixture() {
  const dir = mkdtempSync(join(tmpdir(), 'pack-audio-'));
  const source = loadManifest();
  for (const file of source.files) {
    mkdirSync(dirname(join(dir, file)), { recursive: true });
    writeFileSync(join(dir, file), readFileSync(join(HERE, file)));
  }
  const hashes = {};
  for (const file of source.files) hashes[file] = sha256(join(dir, file));
  const manifest = { ...source, hashes };
  writeFileSync(join(dir, MANIFEST), JSON.stringify(manifest, null, 2) + '\n');
  return { dir, manifest };
}
function expectFail(name, fn, needle) {
  check(name, () => {
    let error = null;
    try { fn(); } catch (caught) { error = caught; }
    need(error, 'mutation was accepted');
    need(error.message.toLowerCase().includes(needle.toLowerCase()),
      `wrong error: ${error.message}`);
  });
}
function report() {
  for (const result of results) {
    console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${result.ok ? '' : ` - ${result.detail}`}`);
  }
  const failed = results.filter((result) => !result.ok).length;
  console.log(`\n${results.length - failed}/${results.length} checks passed`);
  process.exit(failed ? 1 : 0);
}

try {
  const m = loadManifest();

  check('1 manifest parses', () => loadManifest());
  check('2 identity', () => checkIdentity(m));
  check('3 eight keys', () => checkKeys(m));
  check('4 file entries', () => checkFilesEntries(HERE, m));
  check('5 file set equals disk', () => checkFileSet(HERE, m));
  check('6 sha256 hashes', () => checkHashes(HERE, m));
  check('7 encoding and placeholders', () => checkEncoding(HERE, m));
  check('8 token caps', () => checkCaps(m));
  check('9 sections and line cap', () => {
    checkSections(read(join(HERE, 'PACK.md')));
    checkLineCap();
  });
  check('10 no secrets', () => checkSecrets(HERE, m));

  const { dir, manifest } = fixture();
  try {
    writeFileSync(join(dir, 'extra.txt'), 'extra\n');
    expectFail('negative: extra file', () => checkFileSet(dir, manifest), 'listing');

    expectFail('negative: bad hash', () => checkHashes(dir, {
      ...manifest,
      hashes: { ...manifest.hashes, 'PACK.md': '0'.repeat(64) },
    }), 'hash mismatch');

    expectFail('negative: string files', () => checkFilesEntries(dir, {
      ...manifest,
      files: 'PACK.md',
    }), 'array');

    const pack = read(join(dir, 'PACK.md')).replace(/## Holds[\s\S]*?(?=\n## |$)/, '');
    writeFileSync(join(dir, 'PACK.md'), pack);
    const hashes = { ...manifest.hashes, 'PACK.md': sha256(join(dir, 'PACK.md')) };
    writeFileSync(join(dir, MANIFEST), JSON.stringify({ ...manifest, hashes }, null, 2) + '\n');
    expectFail('negative: missing section', () => checkSections(pack), 'missing section');
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }

  report();
} catch (error) {
  console.error(`FAIL setup - ${error.message}`);
  process.exit(1);
}
