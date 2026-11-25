#!/usr/bin/env node
// engine-phaser pack selftest. Packaging and manifest only: it does not start
// a browser, run Phaser, or claim a scene test.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST = 'manifest.json';
const PIN = '4.2.1';
const CHAR_CAP = 6000;
const REQUIRED = ['RULES.md', 'API.md', 'PITFALLS.md', 'RECIPES.md', 'selftest.mjs'];
const DOCS = ['RULES.md', 'API.md', 'PITFALLS.md', 'RECIPES.md'];
const TEXT_FILES = [MANIFEST, ...REQUIRED];
const ROLES = ['rule', 'docs', 'seed', 'permission', 'recipe'];
const PLACEHOLDER = '{' + '{';
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

check('files present', () => {
  const missing = TEXT_FILES.filter((name) => !existsSync(join(HERE, name)));
  need(missing.length === 0, `missing: ${missing.join(', ')}`);
  return `${TEXT_FILES.length} files`;
});

check('identity and pin', () => {
  const m = manifestOf();
  need(m.id === 'engine-phaser', `id ${JSON.stringify(m.id)}`);
  need(m.engine === 'phaser', `engine ${JSON.stringify(m.engine)}`);
  need(m.engineRange === PIN, `engineRange ${JSON.stringify(m.engineRange)} != ${PIN}`);
  need(typeof m.version === 'string' && /^\d+\.\d+\.\d+$/.test(m.version), `version ${JSON.stringify(m.version)}`);
  need(m.stability === 'beta', `stability ${JSON.stringify(m.stability)}`);
  return `${m.id} ${m.version} ${m.stability}`;
});

check('parts', () => {
  const m = manifestOf();
  need(Array.isArray(m.parts), 'not an array');
  for (const role of m.parts) need(ROLES.includes(role), `unknown role ${JSON.stringify(role)}`);
  need(
    JSON.stringify(m.parts) === JSON.stringify(['docs', 'recipe']),
    `expected ["docs","recipe"], got ${JSON.stringify(m.parts)}`,
  );
  return m.parts.join('+');
});

check('files listing', () => {
  const m = manifestOf();
  need(Array.isArray(m.files) && m.files.length > 0, 'empty or not an array');
  for (const name of m.files) {
    need(typeof name === 'string' && name.length > 0, 'non-string entry');
    need(!name.includes('\\'), `${name}: not POSIX`);
    need(!name.startsWith('/') && !name.split('/').includes('..'), `${name}: not relative`);
    need(name !== MANIFEST, `${MANIFEST} must not list itself`);
    need(existsSync(join(HERE, name)) && statSync(join(HERE, name)).isFile(), `${name}: missing`);
  }
  const actual = readdirSync(HERE)
    .filter((name) => name !== MANIFEST && statSync(join(HERE, name)).isFile())
    .sort();
  const listed = [...m.files].sort();
  need(JSON.stringify(actual) === JSON.stringify(listed), `directory [${actual}] != files [${listed}]`);
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

check('apiSource', () => {
  const source = manifestOf().apiSource;
  need(isObject(source), 'not an object');
  for (const key of ['kind', 'uri', 'version', 'date']) {
    need(typeof source[key] === 'string' && source[key].length > 0, `${key} missing`);
  }
  need(['typings', 'docs', 'source'].includes(source.kind), `kind ${JSON.stringify(source.kind)}`);
  need(source.version === PIN, `version ${JSON.stringify(source.version)} != ${PIN}`);
  need(/^\d{4}-\d{2}-\d{2}$/.test(source.date), `date ${JSON.stringify(source.date)}`);
  if (/^https?:\/\//.test(source.uri)) return 'URL recorded, not fetched';
  need(existsSync(join(HERE, source.uri)), `local uri missing: ${source.uri}`);
  return 'local uri exists';
});

check('upgrade', () => {
  const upgrade = manifestOf().upgrade;
  if (upgrade === 'none') return 'none';
  need(isObject(upgrade), 'not "none" or an object');
  need(typeof upgrade.from === 'string' && upgrade.from.length > 0, 'from missing');
  need(typeof upgrade.note === 'string' && upgrade.note.length > 0, 'note missing');
  return `from ${upgrade.from}`;
});

check('selftest command', () => {
  const command = manifestOf().selftest;
  need(typeof command === 'string', 'missing');
  const match = command.match(/^node\s+(\S+)$/);
  need(match, `expected "node <file>", got ${JSON.stringify(command)}`);
  need(existsSync(join(HERE, match[1])), `${match[1]} missing`);
  return command;
});

check('encoding and placeholders', () => {
  const issues = [];
  for (const name of TEXT_FILES) {
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
});

check('token cap', () => {
  for (const name of DOCS) {
    const chars = [...text(name)].length;
    need(chars <= CHAR_CAP, `${name}: ${chars} chars > ${CHAR_CAP}`);
  }
  return `<= ${CHAR_CAP} chars per doc`;
});

check('selftest line budget', () => {
  const lines = text('selftest.mjs').split('\n').length;
  need(lines <= 250, `${lines} lines > 250`);
  return `${lines} lines`;
});

check('API evidence', () => {
  const api = text('API.md');
  for (const needle of ['docs.phaser.io', PIN, 'shakeCamera', 'L129775']) {
    need(api.includes(needle), `missing ${needle}`);
  }
  return 'pin, source, absent symbol, start line';
});

function findPhaser(start) {
  let dir = start;
  for (;;) {
    const found = join(dir, 'node_modules', 'phaser', 'package.json');
    if (existsSync(found)) return found;
    const parent = dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

check('installed pin', () => {
  const found = findPhaser(HERE);
  if (!found) return 'skipped: phaser not installed';
  const version = JSON.parse(readFileSync(found, 'utf8')).version;
  need(version === PIN, `installed ${version} != ${PIN}`);
  return `installed ${version}`;
});

let failed = 0;
for (const result of results) {
  if (!result.ok) failed += 1;
  const detail = result.detail ? `: ${result.detail}` : '';
  console.log(`${result.ok ? 'ok  ' : 'FAIL'} ${result.name}${detail}`);
}
process.exit(failed === 0 ? 0 : 1);
