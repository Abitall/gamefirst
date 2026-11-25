#!/usr/bin/env node
// Packaging selftest for the Unity engine pack. It never runs Unity.
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative, sep } from 'node:path';

const root = dirname(fileURLToPath(import.meta.url));
const manifestPath = join(root, 'manifest.json');
const results = [];
let manifest = null;

const check = (name, fn) => {
  try { results.push({ name, ok: true, detail: fn() }); }
  catch (e) { results.push({ name, ok: false, detail: e.message }); }
};
const need = (ok, msg) => { if (!ok) throw new Error(msg); };
const read = (name) => readFileSync(join(root, name), 'utf8');
const isPlain = (v) => v && typeof v === 'object' && !Array.isArray(v);
const sha = (buf) => createHash('sha256').update(buf).digest('hex');

function walk(dir, base = dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, base, out);
    else out.push(relative(base, p).split(sep).join('/'));
  }
  return out;
}

check('manifest parses', () => {
  const raw = readFileSync(manifestPath);
  manifest = JSON.parse(raw.toString('utf8'));
  need(isPlain(manifest), 'manifest is not a JSON object');
  return 'object';
});

if (!manifest) {
  for (const r of results) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name} - ${r.detail}`);
  process.exit(1);
}

const files = manifest.files;
const hashes = manifest.hashes;

check('identity and pin', () => {
  need(manifest.id === 'engine-unity', 'id must be engine-unity');
  need(manifest.engine === 'unity', 'engine must be unity');
  need(manifest.engineRange === '>=6000.0 <6001', 'engineRange must be >=6000.0 <6001');
  need(/^\d+\.\d+\.\d+$/.test(manifest.version), 'version must be semver');
  need(manifest.stability === 'beta', 'this pack must stay beta until the pin passes');
  need(Array.isArray(manifest.parts), 'parts must be an array');
  need(JSON.stringify(manifest.parts) === JSON.stringify(['docs', 'recipe']),
    'parts must be ["docs","recipe"]');
  return `${manifest.id} ${manifest.version} ${manifest.stability}`;
});

check('files listing shape', () => {
  need(Array.isArray(files) && files.length > 0, 'files must be a non-empty array');
  const seen = new Set();
  for (const f of files) {
    need(typeof f === 'string' && f.length > 0, 'file entry must be a non-empty string');
    need(f.includes('\\') === false, `POSIX path required: ${f}`);
    need(!f.startsWith('/') && !f.includes('../') && f !== 'manifest.json',
      `relative path required: ${f}`);
    need(!seen.has(f), `duplicate file: ${f}`);
    seen.add(f);
  }
  const actual = walk(root).filter((f) => f !== 'manifest.json').sort();
  need(JSON.stringify(actual) === JSON.stringify([...files].sort()),
    `files differ from directory: [${actual.join(', ')}]`);
  return `${files.length} files`;
});

check('files exist and are non-empty', () => {
  for (const f of files) {
    const p = join(root, f);
    need(existsSync(p), `missing file: ${f}`);
    need(statSync(p).isFile(), `not a file: ${f}`);
    need(statSync(p).size > 0, `empty file: ${f}`);
  }
  return files.length;
});

check('hashes match', () => {
  need(isPlain(hashes), 'hashes must be an object');
  need(Object.keys(hashes).length > 0, 'hashes must not be empty');
  const keys = Object.keys(hashes).sort();
  need(JSON.stringify(keys) === JSON.stringify([...files].sort()),
    'hash keys must equal files');
  for (const f of files) {
    const h = hashes[f];
    need(typeof h === 'string' && /^[0-9a-f]{64}$/.test(h), `bad sha256 for ${f}`);
    need(sha(readFileSync(join(root, f))) === h, `hash mismatch for ${f}`);
  }
  return `${files.length} sha256`;
});

check('apiSource object', () => {
  const a = manifest.apiSource;
  need(isPlain(a), 'apiSource must be an object');
  for (const k of ['kind', 'uri', 'version', 'date']) {
    need(typeof a[k] === 'string' && a[k].length > 0, `apiSource.${k} must be a non-empty string`);
  }
  need(['typings', 'docs', 'source'].includes(a.kind), 'apiSource.kind is not allowed');
  need(/^6000\.\d+\.\d+[a-z]\d+$/.test(a.version), 'apiSource.version must be a Unity 6000 version');
  need(/^\d{4}-\d{2}-\d{2}$/.test(a.date) && !Number.isNaN(Date.parse(a.date)),
    'apiSource.date must be YYYY-MM-DD');
  return `${a.kind} ${a.version} ${a.date}`;
});

check('apiSource resolves', () => {
  const { uri, version } = manifest.apiSource;
  if (/^https?:\/\//.test(uri)) return 'url recorded (not fetched)';
  let p = uri;
  if (uri.startsWith('file:///')) p = decodeURIComponent(uri.slice('file:///'.length));
  else if (uri.startsWith('file://')) p = decodeURIComponent(uri.slice('file://'.length));
  need(existsSync(p), `apiSource path does not exist: ${p}`);
  need(p.includes(version), 'apiSource path does not declare the version');
  return p;
});

check('selftest command', () => {
  need(manifest.selftest === 'node selftest.mjs', 'selftest must be "node selftest.mjs"');
  const m = /^node\s+(\S+\.mjs)$/.exec(manifest.selftest);
  need(m && existsSync(join(root, m[1])), 'selftest file does not exist');
  need(files.includes(m[1]), 'selftest file is not listed in files');
  const lines = read(m[1]).replace(/\n$/, '').split('\n').length;
  need(lines <= 250, `selftest is ${lines} lines (max 250)`);
  return `${m[1]}, ${lines} lines`;
});

check('upgrade field', () => {
  const u = manifest.upgrade;
  if (u === 'none') return 'none';
  need(isPlain(u), 'upgrade must be "none" or an object');
  need(typeof u.from === 'string' && u.from.length > 0, 'upgrade.from required');
  need(typeof u.note === 'string' && u.note.length > 0, 'upgrade.note required');
  return `${u.from}: ${u.note}`;
});

check('encoding and placeholders', () => {
  const dec = new TextDecoder('utf-8', { fatal: true });
  const texts = {};
  for (const f of [...files, 'manifest.json']) {
    const buf = readFileSync(join(root, f));
    need(!(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf), `BOM in ${f}`);
    let text;
    try { text = dec.decode(buf); } catch { throw new Error(`invalid UTF-8 in ${f}`); }
    need(!text.includes('\r'), `CR found in ${f}; use LF`);
    need(!text.includes('\uFFFD'), `replacement character in ${f}`);
    need(!text.includes('\0'), `NUL byte in ${f}`);
    need(!/\{\{[\s\S]*?\}\}/.test(text), `unreplaced placeholder in ${f}`);
    texts[f] = text;
  }
  return `${Object.keys(texts).length} files`;
});

check('token caps', () => {
  const docs = ['RULES.md', 'API.md', 'PITFALLS.md', 'RECIPES.md'];
  const detail = [];
  for (const f of docs) {
    const chars = read(f).length;
    const tokens = Math.ceil(chars / 4);
    need(tokens <= 1500, `${f} is ${tokens} tokens (max 1500)`);
    detail.push(`${f}=${tokens}`);
  }
  return detail.join(' ');
});

check('recipes table', () => {
  const lines = read('RECIPES.md').split('\n').filter((l) => l.trim().startsWith('|'));
  const rows = lines.map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((s) => s.trim()));
  need(rows.length >= 3, 'recipe table not found');
  const head = rows[0].map((s) => s.toLowerCase());
  need(JSON.stringify(head) === JSON.stringify(['step', 'cmd', 'required', 'artifact', 'mode']),
    'recipe header must be step | cmd | required | artifact | mode');
  need(rows[1].every((s) => /^:?-{3,}:?$/.test(s)), 'missing recipe separator');
  const data = rows.slice(2);
  const run = [];
  const steps = new Set();
  for (const r of data) {
    need(r.length === 5, `recipe row has ${r.length} cells`);
    need(/^R\d+$/.test(r[0]), `bad step: ${r[0]}`);
    need(!steps.has(r[0]), `duplicate step: ${r[0]}`);
    steps.add(r[0]);
    need(r[1].length > 0, `empty cmd at ${r[0]}`);
    need(['true', 'false'].includes(r[2]), `required at ${r[0]} must be true/false`);
    need(['run', 'manual'].includes(r[4]), `mode at ${r[0]} must be run/manual`);
    if (r[3]) {
      need(r[3] === 'manifest.json' || (files.includes(r[3]) && existsSync(join(root, r[3]))),
        `artifact at ${r[0]} must be a listed file or manifest.json`);
    }
    if (r[4] === 'run') run.push(r);
  }
  need(run.length > 0, 'at least one run recipe is required');
  need(run.some((r) => r[1] === 'node selftest.mjs'), 'R0 selftest run row is missing');
  return `${data.length} rows, ${run.length} run`;
});

check('run recipes exit 0', () => {
  const lines = read('RECIPES.md').split('\n').filter((l) => l.trim().startsWith('|'));
  const rows = lines.slice(2).map((l) => l.trim().replace(/^\||\|$/g, '').split('|').map((s) => s.trim()));
  for (const r of rows) {
    if (r[4] !== 'run') continue;
    const cmd = r[1].replace(/^`+|`+$/g, '');
    if (cmd === 'node selftest.mjs') continue; // this process is the proof
    const res = spawnSync(cmd, { cwd: root, shell: true, encoding: 'utf8', timeout: 120000 });
    need(res.status === 0, `${r[0]} exited ${res.status}: ${(res.stderr || '').trim()}`);
  }
  return 'this process (R0)';
});

check('stable pin (E11)', () => {
  if (manifest.stability !== 'stable') return 'n/a (beta)';
  const installed = process.env.UNITY_EDITOR_VERSION || '';
  need(installed === manifest.engineRange,
    `stable pin requires installed ${manifest.engineRange}, got ${installed || 'unknown'}`);
  return installed;
});

check('API evidence', () => {
  const api = read('API.md');
  const needles = ['6000.3.24f1', '6000.0.83f1', 'LoadSceneAsync', 'sceneLoaded',
    'sceneUnloaded', 'GetComponent', 'Instantiate', 'linearVelocity',
    'JsonUtility', 'Raycast'];
  for (const n of needles) need(api.includes(n), `API.md missing ${n}`);
  return needles.length;
});

let failed = 0;
for (const r of results) {
  if (r.ok) console.log(`ok   ${r.name} - ${r.detail}`);
  else { failed++; console.log(`FAIL ${r.name} - ${r.detail}`); }
}
console.log(`\n${results.length - failed}/${results.length} checks passed`);
process.exit(failed === 0 ? 0 : 1);
