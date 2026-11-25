#!/usr/bin/env node
// upgrade - dry-run, diff, and apply a framework upgrade; reads the game lock, writes only on --apply.
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, readFileSync, readdirSync, renameSync, rmSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/;
const HERE = dirname(fileURLToPath(import.meta.url));
const SOURCES = [
  ['core', 'rules', 'rule'], ['core', 'agents', 'agent'], ['core', 'skills', 'skill'], ['core', 'evals', 'eval'],
  ['game', 'skills', 'skill'], ['game', 'crews', 'crew'], ['game', 'gates', 'gate'],
];
const PREFIX = { rule: 'R', eval: 'E', gate: 'G' };
const FLAGS = { '--apply': 'apply', '--dry-run': 'dryRun', '--force': 'force', '--json': 'json', '--help': 'help', '-h': 'help' };

class CliError extends Error {
  constructor(message, code = 1, hint = '') { super(message); this.code = code; this.hint = hint; }
}
function fail(message, code = 1, hint = '') { throw new CliError(message, code, hint); }

function usage() {
  console.log(`upgrade - dry-run, diff, and apply a gamefirst framework upgrade
Usage: node tools/upgrade.mjs [game-dir] [options]
Options:
  --to <version>  target version; default: bundled VERSION
  --dry-run       report only (the default)
  --apply         write parts, lock, and docs/UPGRADE-<from>-to-<to>.md
  --force         allow a downgrade
  --json          one-line report (schema 1)
  -h, --help      show this help
The game directory must contain agent.lock.json (written by new-project).
Exit codes: 0 success or no-op, 1 failure, 2 usage or missing lock.`);
}

function parseArgs(argv) {
  const out = { dir: null, to: null, apply: false, dryRun: false, force: false, json: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (FLAGS[arg]) out[FLAGS[arg]] = true;
    else if (arg === '--to') {
      const value = argv[++i];
      if (value === undefined || value.startsWith('--')) fail('--to needs a version', 2, 'example: --to 0.3.0');
      out.to = value;
    } else if (arg.startsWith('--to=')) out.to = arg.slice(5);
    else if (arg.startsWith('-')) fail(`unknown option: ${arg}`, 2, 'run with --help');
    else if (out.dir) fail(`unexpected argument: ${arg}`, 2);
    else out.dir = arg;
  }
  if (out.apply && out.dryRun) fail('--apply and --dry-run are mutually exclusive', 2);
  return out;
}

function readText(path) {
  return readFileSync(path, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
}

function parseSemver(value) {
  const match = SEMVER.exec(String(value));
  if (!match) return null;
  return { n: [Number(match[1]), Number(match[2]), Number(match[3])], pre: match[4] ? match[4].split('.') : [] };
}

function compare(a, b) {
  for (let i = 0; i < 3; i += 1) if (a.n[i] !== b.n[i]) return a.n[i] < b.n[i] ? -1 : 1;
  if (!a.pre.length || !b.pre.length) return a.pre.length === b.pre.length ? 0 : (a.pre.length ? -1 : 1);
  for (let i = 0; i < Math.max(a.pre.length, b.pre.length); i += 1) {
    const x = a.pre[i], y = b.pre[i];
    if (x === undefined) return -1;
    if (y === undefined) return 1;
    const xn = /^\d+$/.test(x), yn = /^\d+$/.test(y);
    if (xn && yn) { const d = Number(x) - Number(y); if (d) return d < 0 ? -1 : 1; }
    else if (xn !== yn) return xn ? -1 : 1;
    else if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}

function findRoot() {
  for (let dir = HERE; ; dir = dirname(dir)) {
    if (existsSync(join(dir, 'VERSION')) && existsSync(join(dir, 'library', 'core')) && existsSync(join(dir, 'docs', 'V0.3-BLUEPRINT.md'))) return dir;
    if (dirname(dir) === dir) fail('cannot locate the framework root', 2, 'run the copy inside the framework: tools/upgrade.mjs');
  }
}

function blueprintIds(root) {
  const text = readText(join(root, 'docs', 'V0.3-BLUEPRINT.md'));
  return new Map([...text.matchAll(/^\|\s*([ASC]\d{1,2}(?:\.\d+)?)\s*\|\s*([a-z0-9-]+)\s*\|/gm)].map((match) => [match[2], match[1]]));
}

function idFor(kind, name, ids) {
  if (PREFIX[kind]) return new RegExp(`^(${PREFIX[kind]}\\d+(?:\\.\\d+)?)-`).exec(name)?.[1] ?? null;
  const stem = name.replace(/\.md$/, '');
  return ids.get(stem) ?? stem;
}

function libraryIndex(root, ids) {
  const index = new Map();
  for (const [pack, group, kind] of SOURCES) {
    const dir = join(root, 'library', pack, group);
    if (!existsSync(dir)) continue;
    for (const name of readdirSync(dir).sort()) {
      const file = kind === 'skill' ? join(dir, name, 'SKILL.md') : (name.endsWith('.md') ? join(dir, name) : null);
      if (!file || !existsSync(file)) continue;
      const id = idFor(kind, name, ids);
      if (id && !index.has(id)) index.set(id, { kind, file });
    }
  }
  return index;
}

const lineCount = (text) => (text ? text.replace(/\n$/, '').split('\n').length : 0);
const textHash = (text) => createHash('sha256').update(text).digest('hex');

function lineDelta(oldText, newText) {
  const counts = (text) => {
    const map = new Map();
    for (const line of text ? text.replace(/\n$/, '').split('\n') : []) map.set(line, (map.get(line) ?? 0) + 1);
    return map;
  };
  const before = counts(oldText), after = counts(newText);
  let added = 0, removed = 0;
  for (const [line, count] of after) added += Math.max(0, count - (before.get(line) ?? 0));
  for (const [line, count] of before) removed += Math.max(0, count - (after.get(line) ?? 0));
  return { added, removed };
}

function planUpgrade(gameDir, lock, index) {
  return lock.parts.map((part) => {
    if (!part || typeof part.id !== 'string' || typeof part.kind !== 'string' || typeof part.path !== 'string') fail('agent.lock.json has a malformed part', 1);
    const row = (status, extra = {}) => ({ id: part.id, kind: part.kind, path: part.path, status, added: 0, removed: 0, ...extra });
    const entry = index.get(part.id);
    if (!entry || entry.kind !== part.kind) return row('removed');
    const file = resolve(gameDir, part.path);
    const rel = relative(gameDir, file);
    if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) fail(`unsafe part path for ${part.id}: ${part.path}`, 1);
    const newText = readText(entry.file);
    if (!existsSync(file)) return row('missing', { added: lineCount(newText), source: entry.file, file });
    const oldText = readText(file);
    if (oldText === newText) return row('same', { source: entry.file, file });
    return row('changed', { ...lineDelta(oldText, newText), source: entry.file, file, localEdit: Boolean(part.hash) && textHash(oldText) !== part.hash });
  });
}

const cell = (value) => String(value).replace(/[\u0000-\u001f\u007f|]/g, (char) => (char === '|' ? '\\|' : ''));

function migrationNote(from, to, when, rows) {
  const changed = rows.filter((row) => row.status !== 'same');
  const removed = rows.filter((row) => row.status === 'removed');
  const lines = [
    `# Upgrade ${from} to ${to}`, '', `Applied ${when} by \`tools/upgrade.mjs --apply\`.`, '',
    '## Parts', '', '| ID | Kind | Status | Added | Removed | Path |', '| --- | --- | --- | --- | --- | --- |',
    ...changed.map((row) => `| ${cell(row.id)} | ${cell(row.kind)} | ${row.status} | ${row.added} | ${row.removed} | ${cell(row.path)} |`), '',
  ];
  if (removed.length) lines.push('## Left on disk', '', 'No longer in the framework; review and delete by hand:', '', ...removed.map((row) => `- ${cell(row.id)} (${cell(row.kind)}, ${cell(row.path)})`), '');
  lines.push('## Next', '', 'Review every changed part, run the smoke test, then commit.', '');
  return lines.join('\n');
}

let tempSeq = 0;
function atomicWrite(target, text) {
  mkdirSync(dirname(target), { recursive: true });
  tempSeq += 1;
  const temp = join(dirname(target), `.gamefirst-tmp-${process.pid}-${tempSeq}`);
  try { writeFileSync(temp, text, 'utf8'); renameSync(temp, target); }
  catch (error) { try { rmSync(temp, { force: true }); } catch { /* best effort */ } throw error; }
}

function applyUpgrade(gameDir, lock, rows, from, to, force) {
  if (!force && rows.some((row) => row.status === 'changed' && row.localEdit)) fail('local edits in changed parts; pass --force to overwrite', 2);
  let files = 0;
  for (const row of rows) if (row.status === 'changed' || row.status === 'missing') { atomicWrite(row.file, readText(row.source)); files += 1; }
  const rowsById = new Map(rows.map((row) => [row.id, row]));
  const parts = lock.parts.map((part) => {
    const status = rowsById.get(part.id)?.status;
    const { hash, ...rest } = part;
    if (status === 'removed') return part;
    return status === 'same' ? { ...part, version: to } : { ...rest, version: to };
  });
  atomicWrite(join(gameDir, 'agent.lock.json'), `${JSON.stringify({ ...lock, core: to, parts, upgraded: new Date().toISOString() }, null, 2)}\n`);
  if (!rows.some((row) => row.status !== 'same')) return { files, note: null };
  const note = `docs/UPGRADE-${from}-to-${to}.md`;
  atomicWrite(join(gameDir, note), migrationNote(from, to, new Date().toISOString().slice(0, 10), rows));
  return { files, note };
}

function main(argv) {
  const args = parseArgs(argv);
  if (args.help) { usage(); return 0; }
  const gameDir = resolve(args.dir ?? '.');
  const lockPath = join(gameDir, 'agent.lock.json');
  if (!existsSync(lockPath)) fail(`no agent.lock.json in ${gameDir}`, 2, 'run new-project first, or pass the game directory');
  const root = findRoot();
  const framework = readText(join(root, 'VERSION')).trim();
  if (!parseSemver(framework)) fail(`invalid framework VERSION: ${framework}`, 1);
  const to = args.to ?? framework;
  const target = parseSemver(to);
  if (!target) fail(`invalid target version: ${to}`, 2, 'expected MAJOR.MINOR.PATCH[-prerelease]');
  let lock;
  try { lock = JSON.parse(readText(lockPath)); } catch (error) { fail(`invalid agent.lock.json: ${error.message}`, 1, 'fix the JSON or re-create the project'); }
  if (!lock || typeof lock !== 'object' || !Array.isArray(lock.parts)) fail('agent.lock.json has no parts array', 1);
  const from = lock.core ?? lock.version;
  const base = parseSemver(from);
  if (!base) fail(`agent.lock.json has no valid core version: ${from}`, 1);
  const order = compare(base, target);
  const mode = args.apply ? 'apply' : 'dry-run';

  if (order === 0) {
    if (args.json) console.log(JSON.stringify({ schema: 1, ok: true, from, to, framework, mode, forced: false, upToDate: true, applied: false, warnings: [], summary: { total: 0, same: 0, changed: 0, missing: 0, removed: 0, files: 0 }, parts: [], note: null }));
    else console.log(`${to} is already installed; nothing to upgrade.`);
    return 0;
  }
  if (order > 0 && !args.force) fail(`refusing to downgrade ${from} -> ${to}`, 2, 'pass --force to downgrade');

  const warnings = to === framework ? [] : [`target ${to} is not the bundled framework version ${framework}; parts are taken from ${framework}`];
  const rows = planUpgrade(gameDir, lock, libraryIndex(root, blueprintIds(root)));
  const summary = { total: rows.length, same: 0, changed: 0, missing: 0, removed: 0, files: 0 };
  for (const row of rows) { summary[row.status] += 1; if (row.status === 'changed' || row.status === 'missing') summary.files += 1; }
  const forced = order > 0;
  const applied = args.apply ? applyUpgrade(gameDir, lock, rows, from, to, args.force) : { files: 0, note: null };

  if (args.json) {
    const parts = rows.map((row) => ({ id: row.id, kind: row.kind, path: row.path, status: row.status, added: row.added, removed: row.removed }));
    console.log(JSON.stringify({ schema: 1, ok: true, from, to, framework, mode, forced, upToDate: false, applied: Boolean(args.apply), warnings, summary, parts, note: applied.note }));
    return 0;
  }
  console.log(`upgrade ${from} -> ${to} (framework ${framework})`);
  console.log(`mode: ${mode}${args.apply ? '' : ' (no files written)'}`);
  for (const warning of warnings) console.log(`warning: ${warning}`);
  if (forced) console.log('forced: downgrade allowed by --force');
  console.log('');
  console.log(`${'ID'.padEnd(6)}${'KIND'.padEnd(7)}${'STATUS'.padEnd(9)}${'+'.padStart(4)}${'-'.padStart(4)}  PATH`);
  for (const row of rows) console.log(`${cell(row.id).padEnd(6)}${row.kind.padEnd(7)}${row.status.padEnd(9)}${String(row.added).padStart(4)}${String(row.removed).padStart(4)}  ${cell(row.path)}`);
  console.log('');
  console.log(`${summary.total} parts: ${summary.same} same, ${summary.changed} changed, ${summary.missing} missing, ${summary.removed} removed`);
  if (!args.apply) console.log(summary.files ? `dry-run: ${summary.files} files would change; re-run with --apply` : 'nothing to write; re-run with --apply to update the lock');
  else console.log(`applied: ${applied.files} files, lock updated${applied.note ? `, note ${applied.note}` : ''}`);
  return 0;
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  const code = error instanceof CliError ? error.code : 1;
  if (process.argv.includes('--json')) console.log(JSON.stringify({ schema: 1, ok: false, error: { code, message: error.message, hint: error.hint ?? '' } }));
  else {
    console.error(`upgrade: ${error.message}`);
    if (error.hint) console.error(`hint: ${error.hint}`);
  }
  process.exitCode = code;
}
