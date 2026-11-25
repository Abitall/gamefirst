// sync-agent.mjs - pull, push or diff gamefirst library parts through agent.lock.json.
// Usage: node tools/sync-agent.mjs <pull|push|diff> [game-dir] [--dry-run] [--force] [--json]
import { createHash } from 'node:crypto';
import { existsSync, lstatSync, mkdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const HERE = dirname(fileURLToPath(import.meta.url));
const COMMANDS = new Set(['pull', 'push', 'diff']);
const STATUSES = ['clean', 'stale', 'modified', 'diverged', 'unknown', 'missing', 'missing-source', 'blocked'];
const EDITS = ['modified', 'diverged', 'unknown'];
const MAP = [
  ['.opencode/rules/', 'core/rules'],
  ['.opencode/agents/', 'core/agents'],
  ['.opencode/crews/', 'game/crews'],
  ['.opencode/gates/', 'game/gates'],
  ['evals/', 'core/evals'],
];
const SKILLS = ['core/skills', 'game/skills'];
const HASH = /^[a-f0-9]{64}$/;
class CliError extends Error {
  constructor(message, code = 1, hint = '') { super(message); this.code = code; this.hint = hint; }
}
function fail(message, code = 1, hint = '') { throw new CliError(message, code, hint); }
const USAGE = `sync-agent - sync gamefirst library parts through agent.lock.json
Usage: node tools/sync-agent.mjs <pull|push|diff> [game-dir] [options]
Commands:
  pull   copy library parts into the game; refuses to overwrite local edits
  push   copy local edits back into the library; needs --force to write
  diff   report differences; never writes
Options:
  --dry-run  show what pull or push would do; write nothing
  --force    overwrite local edits (pull) or write the library (push)
  --json     print one JSON object (schema 1)
  -h, --help show this help
Exit codes: 0 clean, 1 conflicts or missing, 2 usage.`;
function parseArgs(argv) {
  const out = { cmd: '', dir: null, dryRun: false, force: false, json: false, help: false };
  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--dry-run') out.dryRun = true;
    else if (arg === '--force') out.force = true;
    else if (arg === '--json') out.json = true;
    else if (arg.startsWith('-')) fail(`unknown option: ${arg}`, 2, 'run with --help');
    else if (!out.cmd) out.cmd = arg;
    else if (out.dir === null) out.dir = arg;
    else fail(`unexpected argument: ${arg}`, 2);
  }
  if (!out.help && !COMMANDS.has(out.cmd)) fail(out.cmd ? `unknown command: ${out.cmd}` : 'missing command', 2, 'use pull, push or diff');
  return out;
}
function isDir(path) { try { return statSync(path).isDirectory(); } catch { return false; } }
function findFramework() {
  let dir = HERE;
  for (;;) {
    if (isDir(join(dir, 'library')) && isDir(join(dir, 'template')) && existsSync(join(dir, 'docs', 'V0.3-BLUEPRINT.md'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) fail('cannot find the gamefirst root (library/, template/, docs/V0.3-BLUEPRINT.md)', 1, 'run sync-agent from a gamefirst checkout');
    dir = parent;
  }
}
function inside(child, parent) {
  const rel = relative(parent, child);
  return rel !== '' && rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}
function readLock(game) {
  const file = join(game, 'agent.lock.json');
  if (!existsSync(file)) fail(`missing ${file}`, 1, 'create the project with new-project (CLI01)');
  let data;
  try { data = JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, '')); } catch (error) { fail(`cannot parse ${file}: ${error.message}`, 1); }
  if (!data || typeof data !== 'object' || !Array.isArray(data.parts)) fail(`${file} has no parts array`, 1);
  const seen = new Set();
  data.parts.forEach((part, index) => {
    if (!part || typeof part !== 'object') fail(`part ${index} is not an object`, 1);
    for (const key of ['id', 'path', 'version']) if (typeof part[key] !== 'string' || !part[key]) fail(`part ${index} has no ${key}`, 1);
    if (part.path.includes('\\') || part.path.startsWith('/') || /^[A-Za-z]:/.test(part.path) || part.path.split('/').includes('..')) fail(`part ${part.id} has an unsafe path: ${part.path}`, 1);
    if (seen.has(part.path)) fail(`duplicate part path: ${part.path}`, 1);
    seen.add(part.path);
    if (part.hash !== undefined && !HASH.test(String(part.hash))) fail(`part ${part.id} has an invalid hash`, 1);
  });
  return { file, data };
}
function librarySource(library, partPath) {
  for (const [prefix, dir] of MAP) if (partPath.startsWith(prefix)) return join(library, dir, partPath.slice(prefix.length));
  const skill = /^\.opencode\/skills\/([^/]+)\/(.+)$/.exec(partPath);
  if (skill) {
    const candidates = SKILLS.map((root) => join(library, root, skill[1], skill[2]));
    return candidates.find((path) => existsSync(path)) ?? candidates[0];
  }
  fail(`unsupported part path: ${partPath}`, 1, 'expected .opencode/rules|agents|skills|crews|gates or evals/');
}
function hashFile(path) {
  try {
    const stat = lstatSync(path);
    if (stat.isSymbolicLink() || !stat.isFile()) return { status: 'blocked' };
    return { status: 'ok', hash: createHash('sha256').update(readFileSync(path)).digest('hex') };
  } catch (error) {
    return { status: error.code === 'ENOENT' ? 'missing' : 'blocked' };
  }
}
function inspect(part, ctx) {
  const target = resolve(ctx.game, part.path);
  if (!inside(target, ctx.game)) fail(`part ${part.id} escapes the game directory: ${part.path}`, 1);
  const source = resolve(librarySource(ctx.library, part.path));
  if (!inside(source, ctx.library)) fail(`part ${part.id} escapes the library: ${source}`, 1);
  const src = hashFile(source);
  const dst = hashFile(target);
  let status = 'blocked';
  if (src.status === 'missing') status = 'missing-source';
  else if (dst.status === 'missing') status = 'missing';
  else if (src.status === 'ok' && dst.status === 'ok') {
    status = src.hash === dst.hash ? 'clean'
      : part.hash === dst.hash ? 'stale'
      : part.hash === src.hash ? 'modified'
      : part.hash ? 'diverged' : 'unknown';
  }
  return { id: part.id, kind: part.kind ?? '', path: part.path, status, source, target, sourceHash: src.hash, targetHash: dst.hash, lockPart: part, action: 'none' };
}
function writeAtomic(path, bytes) {
  mkdirSync(dirname(path), { recursive: true });
  const temp = `${path}.sync-${process.pid}.tmp`;
  try {
    writeFileSync(temp, bytes);
    renameSync(temp, path);
  } catch (error) {
    rmSync(temp, { force: true });
    throw error;
  }
}
function saveLock(ctx) { writeAtomic(ctx.file, `${JSON.stringify(ctx.data, null, 2)}\n`); }
const countStatuses = (parts) => Object.fromEntries(STATUSES.map((status) => [status, parts.filter((part) => part.status === status).length]));
function pull(ctx) {
  const result = { problems: 0, conflicts: 0, blocked: 0, updated: 0 };
  for (const entry of ctx.parts) {
    if (entry.status === 'clean') continue;
    const safe = entry.status === 'stale' || entry.status === 'missing';
    const forced = ctx.args.force && EDITS.includes(entry.status);
    if (!safe && !forced) {
      entry.action = entry.status === 'missing-source' || entry.status === 'blocked' ? 'blocked' : 'conflict';
      result.problems += 1;
      result[entry.action === 'blocked' ? 'blocked' : 'conflicts'] += 1;
      continue;
    }
    entry.action = 'update';
    result.updated += 1;
    if (ctx.args.dryRun) continue;
    writeAtomic(entry.target, readFileSync(entry.source));
    entry.lockPart.hash = entry.sourceHash;
    entry.targetHash = entry.sourceHash;
    ctx.written.push(entry.path);
  }
  if (!ctx.args.dryRun) {
    let changed = ctx.written.length > 0;
    for (const entry of ctx.parts) {
      if (entry.status === 'clean' && !entry.lockPart.hash) { entry.lockPart.hash = entry.targetHash; changed = true; }
    }
    if (changed) saveLock(ctx);
  }
  return result;
}
function push(ctx) {
  const result = { problems: 0, conflicts: 0, blocked: 0, pushed: 0, refused: false };
  const local = ctx.parts.filter((entry) => EDITS.includes(entry.status) || entry.status === 'missing-source');
  if (local.length && !ctx.args.force && !ctx.args.dryRun) {
    for (const entry of local) entry.action = 'refused';
    return { ...result, problems: local.length, conflicts: local.length, refused: true };
  }
  for (const entry of ctx.parts) {
    if (entry.status === 'clean' || entry.status === 'stale') continue;
    if (entry.status === 'missing' || entry.status === 'blocked' || !entry.targetHash) {
      entry.action = 'blocked';
      result.problems += 1;
      result.blocked += 1;
      continue;
    }
    entry.action = 'push';
    result.pushed += 1;
    if (ctx.args.dryRun) continue;
    writeAtomic(entry.source, readFileSync(entry.target));
    entry.lockPart.hash = entry.targetHash;
    ctx.written.push(entry.path);
  }
  if (!ctx.args.dryRun && ctx.written.length) saveLock(ctx);
  return result;
}
function diff(ctx) {
  const result = { problems: 0, conflicts: 0, blocked: 0 };
  for (const entry of ctx.parts) {
    if (entry.status === 'clean') continue;
    if (entry.status === 'stale' || entry.status === 'missing') entry.action = 'update';
    else if (entry.status === 'missing-source' || entry.status === 'blocked') { entry.action = 'blocked'; result.blocked += 1; }
    else { entry.action = 'conflict'; result.conflicts += 1; }
    result.problems += 1;
  }
  return result;
}
function report(ctx, result) {
  return {
    schema: 1,
    command: ctx.command,
    root: ctx.game,
    framework: ctx.framework,
    dryRun: ctx.args.dryRun,
    force: ctx.args.force,
    ok: result.problems === 0,
    counts: countStatuses(ctx.parts),
    parts: ctx.parts.map(({ id, kind, path, status, action }) => ({ id, kind, path, status, action })),
    conflicts: ctx.parts.filter((entry) => entry.action !== 'none' && entry.action !== 'update' && entry.action !== 'push').map((entry) => entry.id),
    written: ctx.written,
  };
}
function render(ctx, result) {
  const counts = countStatuses(ctx.parts);
  const summary = STATUSES.filter((status) => counts[status]).map((status) => `${status} ${counts[status]}`).join('  ');
  const lines = [`sync-agent ${ctx.command}  ${ctx.game}`, `framework  ${ctx.framework}`, summary || 'no parts'];
  for (const entry of ctx.parts) {
    if (entry.status === 'clean') continue;
    lines.push(`${entry.status.padEnd(14)} ${entry.path}${entry.action === 'none' ? '' : ` -> ${entry.action}`}`);
  }
  if (ctx.command === 'pull' && result.conflicts) lines.push(`${result.conflicts} conflict(s); --force overwrites local edits`);
  if (ctx.command === 'push' && result.refused) lines.push(`${result.conflicts} local change(s); push writes the library and needs --force`);
  if (result.blocked) lines.push(`${result.blocked} part(s) need attention: missing library source or blocked file`);
  if (ctx.args.dryRun) lines.push('dry run: nothing written');
  return lines.join('\n');
}
function main(args) {
  if (args.help) { console.log(USAGE); return 0; }
  const game = resolve(args.dir ?? '.');
  if (!isDir(game)) fail(`game directory not found: ${game}`, 2);
  const framework = findFramework();
  const lock = readLock(game);
  const ctx = { args, command: args.cmd, game, framework, library: join(framework, 'library'), file: lock.file, data: lock.data, parts: [], written: [] };
  ctx.parts = lock.data.parts.map((part) => inspect(part, ctx));
  const result = args.cmd === 'pull' ? pull(ctx) : args.cmd === 'push' ? push(ctx) : diff(ctx);
  console.log(args.json ? JSON.stringify(report(ctx, result)) : render(ctx, result));
  return result.problems ? 1 : 0;
}
let args;
try {
  args = parseArgs(process.argv.slice(2));
  process.exitCode = main(args);
} catch (error) {
  const known = error instanceof CliError;
  const message = known ? error.message : `unexpected error: ${error.stack || error.message}`;
  if (args?.json) console.log(JSON.stringify({ schema: 1, ok: false, error: message }));
  else {
    console.error(`sync-agent: ${message}`);
    if (known && error.hint) console.error(`sync-agent: ${error.hint}`);
  }
  process.exitCode = known ? error.code : 1;
}
