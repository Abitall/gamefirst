#!/usr/bin/env node
// pack-art selftest. Packaging only: manifest, files, hashes, encoding,
// placeholders, caps, sections. It does not draw, generate, or judge art.
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST = 'manifest.json';
const ID = 'pack-art';
const PACK_CAP = 6000; // 1,500 tokens at chars/4
const TEMPLATE_CAP = 4000; // one page
const LINE_CAP = 250;
const KEYS = ['files', 'hashes', 'id', 'loaded', 'requires', 'selftest', 'upgrade', 'version'];
const REQUIRES = ['core', 'game'];
const PLACEHOLDER = '{' + '{';
const SECTIONS = [
  '## When to load', '## Boundaries', '## Art pillars and reference board',
  '## Palette, readability, silhouette, scale', '## Asset spec and naming',
  '## Review checklist', '## Outputs', '## Holds', '## Cross-refs',
];
const SECRETS = [/BEGIN [A-Z ]*PRIVATE KEY/, /gh[pousr]_[A-Za-z0-9]{20,}/, /AKIA[0-9A-Z]{16}/];

const read = (root, name) => readFileSync(join(root, name));
const text = (root, name) => read(root, name).toString('utf8');
const sha256 = (root, name) => createHash('sha256').update(read(root, name)).digest('hex');
const isObject = (v) => v !== null && typeof v === 'object' && !Array.isArray(v);

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

function manifestOf(root) {
  const m = JSON.parse(text(root, MANIFEST));
  if (!isObject(m)) throw new Error('not an object');
  return m;
}

function identity(root) {
  const m = manifestOf(root);
  if (m.id !== ID) throw new Error(`id ${JSON.stringify(m.id)}`);
  if (typeof m.version !== 'string' || !/^\d+\.\d+\.\d+$/.test(m.version)) throw new Error(`version ${m.version}`);
  if (JSON.stringify(m.requires) !== JSON.stringify(REQUIRES)) throw new Error(`requires ${m.requires}`);
  if (m.loaded !== 'on-demand') throw new Error(`loaded ${m.loaded}`);
  return `${m.id} ${m.version} ${m.loaded}`;
}

function keys(root) {
  const m = manifestOf(root);
  if ('$schema' in m) throw new Error('$schema is not allowed');
  const actual = Object.keys(m).sort();
  if (JSON.stringify(actual) !== JSON.stringify(KEYS)) throw new Error(`keys [${actual}] != [${KEYS}]`);
  return `${KEYS.length} keys`;
}

function command(root) {
  const value = manifestOf(root).selftest;
  if (typeof value !== 'string') throw new Error('missing');
  const match = value.match(/^node\s+(\S+)$/);
  if (!match) throw new Error(`expected "node <file>", got ${JSON.stringify(value)}`);
  if (!existsSync(join(root, match[1]))) throw new Error(`${match[1]} missing`);
  return value;
}

function files(root) {
  const m = manifestOf(root);
  if (!Array.isArray(m.files) || m.files.length === 0) throw new Error('files is not a non-empty array');
  for (const name of m.files) {
    if (typeof name !== 'string' || name.length === 0) throw new Error('non-string file entry');
    if (name.includes('\\')) throw new Error(`${name}: not POSIX`);
    if (name.startsWith('/') || name.split('/').includes('..')) throw new Error(`${name}: not relative`);
    if (name === MANIFEST) throw new Error(`${MANIFEST} must not list itself`);
    const full = join(root, name);
    if (!existsSync(full) || !statSync(full).isFile()) throw new Error(`${name}: missing`);
    if (statSync(full).size === 0) throw new Error(`${name}: empty`);
  }
  const disk = walk(root).filter((name) => name !== MANIFEST).sort();
  const listed = [...m.files].sort();
  if (JSON.stringify(disk) !== JSON.stringify(listed)) throw new Error(`directory [${disk}] != files [${listed}]`);
  return `${listed.length} files`;
}

function hashes(root) {
  const m = manifestOf(root);
  if (!isObject(m.hashes)) throw new Error('not an object');
  if (!Array.isArray(m.files)) throw new Error('files not an array');
  const listed = [...m.files].sort();
  const actual = Object.keys(m.hashes).sort();
  if (JSON.stringify(actual) !== JSON.stringify(listed)) throw new Error(`keys [${actual}] != files [${listed}]`);
  for (const name of m.files) {
    const expected = m.hashes[name];
    if (typeof expected !== 'string' || !/^[0-9a-f]{64}$/.test(expected)) throw new Error(`${name}: not a sha256`);
    if (expected !== sha256(root, name)) throw new Error(`${name}: hash mismatch`);
  }
  return `${listed.length} sha256`;
}

function encoding(root) {
  const names = [MANIFEST, ...manifestOf(root).files];
  const issues = [];
  for (const name of names) {
    if (!existsSync(join(root, name))) continue;
    const raw = read(root, name);
    const decoded = text(root, name);
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
  if (issues.length) throw new Error(issues.join('; '));
  return `${names.length} text files`;
}

function caps(root) {
  const pack = [...text(root, 'PACK.md')].length;
  if (pack > PACK_CAP) throw new Error(`PACK.md: ${pack} chars > ${PACK_CAP}`);
  const templates = manifestOf(root).files.filter((name) => name.startsWith('templates/') && name.endsWith('.md'));
  for (const name of templates) {
    const chars = [...text(root, name)].length;
    if (chars > TEMPLATE_CAP) throw new Error(`${name}: ${chars} chars > ${TEMPLATE_CAP}`);
  }
  const lines = text(root, 'selftest.mjs').split('\n').length;
  if (lines > LINE_CAP) throw new Error(`selftest.mjs: ${lines} lines > ${LINE_CAP}`);
  return `PACK.md ${pack} chars, selftest ${lines} lines`;
}

function sections(root) {
  const pack = text(root, 'PACK.md');
  const missing = SECTIONS.filter((needle) => !pack.includes(needle));
  if (missing.length) throw new Error(`missing: ${missing.join(', ')}`);
  return `${SECTIONS.length} sections`;
}

function secrets(root) {
  const hits = [];
  for (const name of [MANIFEST, ...manifestOf(root).files]) {
    const body = text(root, name);
    for (const pattern of SECRETS) if (pattern.test(body)) hits.push(`${name}: ${pattern}`);
  }
  if (hits.length) throw new Error(hits.join('; '));
  return 'no key or token patterns';
}

function upgrade(root) {
  const value = manifestOf(root).upgrade;
  if (value === 'none') return 'none';
  if (!isObject(value)) throw new Error('not "none" or an object');
  if (typeof value.from !== 'string' || value.from.length === 0) throw new Error('from missing');
  if (typeof value.note !== 'string' || value.note.length === 0) throw new Error('note missing');
  return `from ${value.from}`;
}

const CHECKS = [
  ['identity', identity], ['keys', keys], ['selftest command', command],
  ['files listing', files], ['hashes', hashes], ['encoding and placeholders', encoding],
  ['caps', caps], ['required sections', sections], ['no secrets', secrets], ['upgrade', upgrade],
];

function copyPack(root) {
  for (const name of walk(HERE)) {
    const target = join(root, name);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(HERE, name), target);
  }
}

function editManifest(root, mutate) {
  const file = join(root, MANIFEST);
  const value = JSON.parse(readFileSync(file, 'utf8'));
  mutate(value);
  writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

function negative(label, mutate, check) {
  const root = mkdtempSync(join(tmpdir(), 'pack-art-'));
  try {
    copyPack(root);
    mutate(root);
    let rejected = false;
    try {
      check(root);
    } catch {
      rejected = true;
    }
    if (!rejected) throw new Error('not rejected');
    return label;
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

const NEGATIVES = [
  ['extra file', (root) => writeFileSync(join(root, 'extra.txt'), 'extra\n'), files],
  ['bad hash', (root) => editManifest(root, (m) => { m.hashes['PACK.md'] = '0'.repeat(64); }), hashes],
  ['string file entry', (root) => editManifest(root, (m) => { m.files = 'PACK.md'; }), files],
  ['missing section', (root) => writeFileSync(join(root, 'PACK.md'), readFileSync(join(root, 'PACK.md'), 'utf8').replace('## Review checklist\n', '')), sections],
];

let failed = 0;
for (const [name, check] of CHECKS) {
  try {
    const detail = check(HERE);
    console.log(`ok   ${name}${detail ? `: ${detail}` : ''}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL ${name}: ${error.message}`);
  }
}
for (const [label, mutate, check] of NEGATIVES) {
  try {
    negative(label, mutate, check);
    console.log(`ok   negative ${label}`);
  } catch (error) {
    failed += 1;
    console.log(`FAIL negative ${label}: ${error.message}`);
  }
}
console.log(failed === 0 ? `pass ${CHECKS.length} checks, ${NEGATIVES.length} negatives` : `fail ${failed}`);
process.exit(failed === 0 ? 0 : 1);
