#!/usr/bin/env node
// Packaging selftest for the Obsidian pack. Reads the pack folder only: no
// vault, no Obsidian, no network, no game repo. Exit 0 when every check passes.
import { createHash } from 'node:crypto';
import {
  cpSync, existsSync, mkdtempSync, readFileSync, readdirSync, rmSync,
  statSync, writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ID = 'pack-obsidian';
const VERSION = '0.1.0';
const REQUIRES = ['core', 'game'];
const CHAR_CAP = 6000;
const TEMPLATE_CAP = 4000;
const LINE_CAP = 250;
const MANIFEST = 'manifest.json';
const KEYS = ['files', 'hashes', 'id', 'loaded', 'requires', 'selftest', 'upgrade', 'version'];
const PLACEHOLDER = '{' + '{';
const SECTIONS = [
  '## When to load',
  '## Boundaries',
  '## Vault and note contract',
  '## Checklist',
  '## Outputs',
  '## Holds and failures',
  '## Cross-refs',
  'source of truth',
  '[[title]]',
  'generated: true',
  'personal data',
];
const SECRETS = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bgh[pousr]_[A-Za-z0-9]{20,}/,
  /\bAKIA[0-9A-Z]{16}\b/,
];

function need(cond, msg) {
  if (!cond) throw new Error(msg);
}

function walk(dir, base = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(base, full).split(sep).join('/');
    if (statSync(full).isDirectory()) out.push(...walk(full, base));
    else if (rel !== MANIFEST) out.push(rel);
  }
  return out;
}

function validate(root) {
  const results = [];
  const run = (name, fn) => {
    try {
      results.push({ name, ok: true, detail: fn() ?? '' });
    } catch (err) {
      results.push({ name, ok: false, detail: err.message });
    }
  };
  const at = (name) => join(root, name);
  const text = (name) => readFileSync(at(name), 'utf8');
  const bytes = (name) => readFileSync(at(name));
  const sha = (name) => createHash('sha256').update(bytes(name)).digest('hex');
  let manifest;
  const files = () => {
    need(Array.isArray(manifest?.files), 'files is not an array');
    return manifest.files;
  };

  run('manifest parses', () => {
    manifest = JSON.parse(text(MANIFEST));
    need(manifest && typeof manifest === 'object' && !Array.isArray(manifest), 'not an object');
  });

  run('identity', () => {
    need(manifest, 'manifest missing');
    need(manifest.id === ID, `id is ${manifest.id}`);
    need(manifest.version === VERSION, `version is ${manifest.version}`);
    need(JSON.stringify(manifest.requires) === JSON.stringify(REQUIRES), 'requires changed');
    need(manifest.loaded === 'on-demand', 'loaded is not on-demand');
  });

  run('keys', () => {
    need(manifest, 'manifest missing');
    const keys = Object.keys(manifest).sort();
    need(JSON.stringify(keys) === JSON.stringify(KEYS), `keys are ${keys.join(', ')}`);
  });

  run('selftest command', () => {
    need(manifest, 'manifest missing');
    const m = /^node\s+(\S+)$/.exec(manifest.selftest ?? '');
    need(m, 'selftest is not "node <file>"');
    need(m[1] === 'selftest.mjs', `selftest runs ${m[1]}`);
  });

  run('files listing', () => {
    const list = files();
    need(list.length > 0, 'files is empty');
    for (const f of list) {
      need(typeof f === 'string', 'a file entry is not a string');
      need(f === f.split('\\').join('/'), `not POSIX: ${f}`);
      need(!f.startsWith('/') && !/^[A-Za-z]:/.test(f), `not relative: ${f}`);
      need(f !== MANIFEST, 'manifest lists itself');
      need(existsSync(at(f)), `missing: ${f}`);
      need(statSync(at(f)).size > 0, `empty: ${f}`);
    }
    const disk = walk(root).sort();
    need([...list].sort().join('\n') === disk.join('\n'), `listing differs from disk: ${disk.join(', ')}`);
  });

  run('hashes', () => {
    const list = files();
    const keys = Object.keys(manifest.hashes ?? {}).sort();
    need(JSON.stringify(keys) === JSON.stringify([...list].sort()), 'hash keys differ from files');
    for (const f of list) {
      need(/^[0-9a-f]{64}$/.test(manifest.hashes[f]), `bad hash shape: ${f}`);
      need(manifest.hashes[f] === sha(f), `hash mismatch: ${f}`);
    }
  });

  run('encoding and placeholders', () => {
    for (const f of [MANIFEST, ...files()]) {
      const buf = bytes(f);
      need(!(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf), `BOM: ${f}`);
      let s;
      try {
        s = new TextDecoder('utf-8', { fatal: true }).decode(buf);
      } catch {
        throw new Error(`not UTF-8: ${f}`);
      }
      need(!s.includes('\r'), `CRLF: ${f}`);
      need(!s.includes(PLACEHOLDER), `placeholder: ${f}`);
      need(!s.includes('\uFFFD'), `replacement char: ${f}`);
    }
  });

  run('token cap', () => {
    const pack = text('PACK.md');
    need(pack.length <= CHAR_CAP, `PACK.md is ${pack.length} chars, cap ${CHAR_CAP}`);
    need(Math.ceil(pack.length / 4) <= 1500, 'PACK.md over 1,500 tokens');
    for (const f of files().filter((x) => x.startsWith('templates/'))) {
      need(text(f).length <= TEMPLATE_CAP, `${f} over ${TEMPLATE_CAP} chars`);
    }
  });

  run('line budget', () => {
    const lines = text('selftest.mjs').trimEnd().split('\n').length;
    need(lines <= LINE_CAP, `selftest.mjs is ${lines} lines, cap ${LINE_CAP}`);
  });

  run('required sections', () => {
    const pack = text('PACK.md');
    for (const s of SECTIONS) need(pack.includes(s), `missing: ${s}`);
  });

  run('no secrets', () => {
    for (const f of [MANIFEST, ...files()]) {
      const s = text(f);
      for (const re of SECRETS) need(!re.test(s), `secret pattern in ${f}`);
    }
  });

  run('upgrade', () => {
    need(manifest, 'manifest missing');
    need(manifest.upgrade === 'none', `upgrade is ${manifest.upgrade}`);
  });

  return results;
}

function editManifest(dir, fn) {
  const p = join(dir, MANIFEST);
  const m = JSON.parse(readFileSync(p, 'utf8'));
  fn(m);
  writeFileSync(p, JSON.stringify(m, null, 2) + '\n');
}

const base = validate(HERE);
for (const r of base) console.log(`${r.ok ? 'ok  ' : 'FAIL'} ${r.name}${r.detail ? ` — ${r.detail}` : ''}`);
let bad = base.filter((r) => !r.ok).length;

const NEGATIVE = [
  ['extra file', (dir) => writeFileSync(join(dir, 'extra.txt'), 'x\n'), 'files listing'],
  ['bad hash', (dir) => editManifest(dir, (m) => { m.hashes['PACK.md'] = '0'.repeat(64); }), 'hashes'],
  ['string file entry', (dir) => editManifest(dir, (m) => { m.files = 'PACK.md'; }), 'files listing'],
  ['missing section', (dir) => {
    const p = join(dir, 'PACK.md');
    writeFileSync(p, readFileSync(p, 'utf8').replace('## Outputs', '## Results'));
  }, 'required sections'],
];

for (const [label, mutate, target] of NEGATIVE) {
  const dir = mkdtempSync(join(tmpdir(), 'pack-obsidian-'));
  try {
    cpSync(HERE, dir, { recursive: true });
    mutate(dir);
    const hit = validate(dir).find((r) => r.name === target && !r.ok);
    if (hit) console.log(`ok   negative: ${label} (${target} failed as expected)`);
    else {
      console.log(`FAIL negative: ${label} (${target} passed)`);
      bad += 1;
    }
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

console.log(bad === 0 ? 'all checks ok' : `${bad} check(s) failed`);
process.exit(bad === 0 ? 0 : 1);
