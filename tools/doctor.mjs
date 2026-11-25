#!/usr/bin/env node
// doctor.mjs - read-only health check for a gamefirst game repository.
// Usage: node tools/doctor.mjs [game-dir] [--json] [--strict] [--help]
// Checks links, lock parts, .opencode files, encoding, Windows paths,
// placeholders, verify recipe and permissions. No writes, no network, no fix.

import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, relative, resolve, sep } from 'node:path';

const USAGE = `gamefirst doctor - read-only health check for a game repository
Usage: node tools/doctor.mjs [game-dir] [--json] [--strict] [--help]

Checks: links in AGENTS.md/README.md; agent.lock.json parts; .opencode files;
UTF-8 without BOM; LF endings; backslash paths; {{ placeholders;
project.config.json verify recipe; opencode.json permission actions.

Options:
  --json     one JSON object (schema 1)
  --strict   warnings fail
  --help     show this help

Exit codes: 0 healthy, 1 issues, 2 bad arguments. This tool never writes.
`;

const TEXT = new Set(['.md', '.json', '.jsonl', '.mjs', '.js', '.cjs', '.ts', '.tsx', '.css', '.html', '.yml', '.yaml', '.txt', '.toml', '.sh', '.ps1']);
const SKIP = new Set(['.git', 'node_modules', 'dist', 'dist-play', 'coverage', '.cache', '.vite']);
const ACTIONS = new Set(['read', 'glob', 'grep', 'webfetch', 'websearch', 'edit', 'shell', 'external_directory']);
const EFFECTS = new Set(['allow', 'ask', 'deny']);
const KINDS = new Set(['rule', 'agent', 'skill', 'crew', 'gate', 'eval']);
const DOCS = new Set(['AGENTS.md', 'README.md']);
const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const LINK = /\[[^\]]*\]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/g;
const CODE = /`([^`\n]+)`/g;

function parseArgs(argv) {
  const out = { dir: null, json: false, strict: false, help: false };
  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--json') out.json = true;
    else if (arg === '--strict') out.strict = true;
    else if (arg.startsWith('-')) return { error: `unknown option: ${arg}` };
    else if (out.dir !== null) return { error: `unexpected argument: ${arg}` };
    else out.dir = arg;
  }
  return out;
}

function walk(dir, out = []) {
  let entries;
  try { entries = readdirSync(dir, { withFileTypes: true }); } catch { return out; }
  for (const entry of entries) {
    if (out.length >= 5000) break;
    if (entry.isSymbolicLink()) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) { if (!SKIP.has(entry.name)) walk(full, out); }
    else if (entry.isFile() && TEXT.has(extname(entry.name).toLowerCase())) out.push(full);
  }
  return out;
}

const posix = (value) => value.split(sep).join('/');
const lineOf = (text, index) => text.slice(0, index).split('\n').length;

function readText(file) {
  const raw = readFileSync(file);
  return { bom: raw.length >= 3 && raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf, text: raw.toString('utf8') };
}

function loadJson(add, root, name, check) {
  const file = join(root, name);
  if (!existsSync(file)) return { missing: true };
  try { return { file, data: JSON.parse(readText(file).text.replace(/^\uFEFF/, '')) }; }
  catch (error) { add('error', check, name, 0, `invalid JSON: ${error.message}`); return { invalid: true }; }
}
function scanMarkdown(add, root, rel, file, text) {
  for (const match of text.matchAll(LINK)) {
    const raw = match[1].trim().replace(/^<|>$/g, '');
    if (!raw || raw.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(raw)) continue;
    const target = raw.split('#')[0].split('?')[0];
    if (!target) continue;
    if (target.includes('\\')) { add('error', 'paths', rel, lineOf(text, match.index), `${raw} uses backslashes`); continue; }
    const hit = target.startsWith('/') ? join(root, target) : resolve(file, '..', target);
    if (!existsSync(hit)) add('error', 'links', rel, lineOf(text, match.index), `${raw} -> not found`);
  }
  for (const match of text.matchAll(CODE)) {
    const span = match[1].trim();
    if (!span.includes('\\')) continue;
    if (!/^[A-Za-z]:\\/.test(span) && !/^[\w.-]+(?:\\[\w.-]+)+/.test(span)) continue;
    add('error', 'paths', rel, lineOf(text, match.index), `${span} uses backslashes`);
  }
}

function scanText(add, root, file) {
  const rel = posix(relative(root, file));
  const { bom, text } = readText(file);
  if (bom) add('error', 'encoding', rel, 1, 'UTF-8 BOM; save without BOM');
  const cr = text.indexOf('\r');
  if (cr !== -1) add('error', 'encoding', rel, lineOf(text, cr), 'CRLF or CR line ending; use LF');
  const marker = text.indexOf('{{');
  if (marker !== -1) add('error', 'placeholder', rel, lineOf(text, marker), 'unreplaced {{ marker');
  if (DOCS.has(rel)) {
    scanMarkdown(add, root, rel, file, text);
    for (const match of text.matchAll(CODE)) {
      const span = match[1].trim();
      if (!span.startsWith('.opencode/') || span.includes('*')) continue;
      const target = span.endsWith('/') ? span.slice(0, -1) : span;
      if (!existsSync(join(root, ...target.split('/')))) add('error', 'opencode', rel, lineOf(text, match.index), `${span} is cited but missing`);
    }
  }
}

function checkLock(add, root) {
  const loaded = loadJson(add, root, 'agent.lock.json', 'lock');
  if (loaded.missing) { add('error', 'lock', null, 0, 'agent.lock.json not found; CLI01 writes it'); return null; }
  if (loaded.invalid) return null;
  const data = loaded.data && typeof loaded.data === 'object' ? loaded.data : {};
  for (const key of ['version', 'core']) {
    if (data[key] == null) add('warn', 'lock', 'agent.lock.json', 0, `missing "${key}"`);
    else if (!SEMVER.test(String(data[key]))) add('error', 'lock', 'agent.lock.json', 0, `"${key}" is not semver: ${data[key]}`);
  }
  if (!Array.isArray(data.parts)) { add('error', 'lock', 'agent.lock.json', 0, 'parts must be an array'); return null; }
  const seen = new Set();
  const locked = new Set();
  data.parts.forEach((part, index) => {
    const at = `parts[${index}]`;
    if (!part || typeof part !== 'object' || Array.isArray(part)) { add('error', 'lock', 'agent.lock.json', 0, `${at} is not an object`); return; }
    for (const key of ['id', 'kind', 'path', 'version']) {
      if (typeof part[key] !== 'string' || !part[key]) add('error', 'lock', 'agent.lock.json', 0, `${at}.${key} is missing`);
    }
    if (part.kind && !KINDS.has(part.kind)) add('error', 'lock', 'agent.lock.json', 0, `${at}.kind "${part.kind}" is not a part kind`);
    if (part.version && !SEMVER.test(part.version)) add('error', 'lock', 'agent.lock.json', 0, `${at}.version is not semver: ${part.version}`);
    if (typeof part.path !== 'string' || !part.path) return;
    const path = part.path;
    locked.add(path);
    const key = `${part.id}|${part.kind}|${path}`;
    if (seen.has(key)) add('warn', 'lock', 'agent.lock.json', 0, `${at} duplicates ${part.id} at ${path}`);
    else seen.add(key);
    if (path.includes('\\')) { add('error', 'paths', 'agent.lock.json', 0, `${at}.path uses backslashes: ${path}`); return; }
    if (path.startsWith('/') || path.split('/').includes('..')) { add('error', 'lock', 'agent.lock.json', 0, `${at}.path must stay inside the repo: ${path}`); return; }
    if (!existsSync(join(root, ...path.split('/')))) add('error', 'lock', 'agent.lock.json', 0, `missing part ${part.id || at}: ${path}`);
  });
  return locked;
}
function checkInstructions(add, root, data) {
  if (data.instructions == null) return;
  if (!Array.isArray(data.instructions)) { add('error', 'opencode', 'opencode.json', 0, 'instructions must be an array of paths or globs'); return; }
  for (const pattern of data.instructions) {
    if (typeof pattern !== 'string' || !pattern) { add('error', 'opencode', 'opencode.json', 0, 'instructions contains an empty entry'); continue; }
    if (pattern.includes('\\')) { add('error', 'paths', 'opencode.json', 0, `instructions pattern uses backslashes: ${pattern}`); continue; }
    if (!pattern.includes('*')) {
      if (!existsSync(join(root, ...pattern.split('/')))) add('error', 'opencode', 'opencode.json', 0, `instructions file missing: ${pattern}`);
      continue;
    }
    const cut = pattern.lastIndexOf('/');
    const dir = join(root, ...(cut === -1 ? ['.'] : pattern.slice(0, cut).split('/')));
    const glob = cut === -1 ? pattern : pattern.slice(cut + 1);
    const regex = new RegExp(`^${glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*')}$`);
    let hits = 0;
    try { hits = readdirSync(dir).filter((name) => regex.test(name)).length; } catch { hits = 0; }
    if (!hits) add('error', 'opencode', 'opencode.json', 0, `instructions pattern matches nothing: ${pattern}`);
  }
}
function checkPermissions(add, data) {
  const perms = data.permissions;
  if (perms == null) { add('warn', 'permissions', 'opencode.json', 0, 'no permissions block; tools fall back to defaults'); return; }
  const rows = Array.isArray(perms)
    ? perms.map((row, index) => [row, `permissions[${index}]`])
    : typeof perms === 'object' ? Object.entries(perms).map(([action, value]) => [{ action, ...(value && typeof value === 'object' ? value : { effect: value }) }, `permissions.${action}`]) : null;
  if (!rows) { add('error', 'permissions', 'opencode.json', 0, 'permissions must be an array or an object'); return; }
  for (const [row, at] of rows) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) { add('error', 'permissions', 'opencode.json', 0, `${at} is not an object`); continue; }
    if (!ACTIONS.has(row.action)) add('error', 'permissions', 'opencode.json', 0, `${at} action "${row.action}" is unsupported and ignored`);
    if (!EFFECTS.has(row.effect)) add('error', 'permissions', 'opencode.json', 0, `${at} effect "${row.effect}" is not allow, ask or deny`);
    if (row.resource != null && (typeof row.resource !== 'string' || !row.resource)) add('error', 'permissions', 'opencode.json', 0, `${at} resource must be a non-empty string`);
    for (const key of Object.keys(row)) if (!['action', 'resource', 'effect'].includes(key)) add('warn', 'permissions', 'opencode.json', 0, `${at} has unknown key "${key}"`);
  }
}
function checkOpencode(add, root, locked) {
  const dir = join(root, '.opencode');
  let present = false;
  try { present = statSync(dir).isDirectory(); } catch { present = false; }
  if (!present) add('error', 'opencode', '.opencode', 0, '.opencode directory not found; CLI01 installs parts there');
  else if (locked) {
    for (const file of walk(dir)) {
      const rel = posix(relative(root, file));
      if (file.endsWith('.md') && !locked.has(rel)) add('warn', 'opencode', rel, 0, 'not in agent.lock.json; run sync-agent or remove it');
    }
  }
  const loaded = loadJson(add, root, 'opencode.json', 'opencode');
  if (loaded.missing) { add('error', 'opencode', 'opencode.json', 0, 'opencode.json not found'); return; }
  if (loaded.invalid) return;
  if (!loaded.data || typeof loaded.data !== 'object') { add('error', 'opencode', 'opencode.json', 0, 'expected a JSON object'); return; }
  checkPermissions(add, loaded.data);
  checkInstructions(add, root, loaded.data);
}
function checkProject(add, root) {
  const loaded = loadJson(add, root, 'project.config.json', 'config');
  if (loaded.missing) { add('error', 'config', 'project.config.json', 0, 'not found; N00 creates it'); return; }
  if (loaded.invalid) return;
  const data = loaded.data && typeof loaded.data === 'object' ? loaded.data : {};
  const recipe = data.verify && data.verify.recipe;
  if (!Array.isArray(recipe) || recipe.length === 0) add('error', 'config', 'project.config.json', 0, 'verify recipe is missing or empty');
  else if (recipe.some((step) => typeof step !== 'string' && (typeof step !== 'object' || step === null))) add('warn', 'config', 'project.config.json', 0, 'verify recipe step is neither a string nor an object');
}

function build(root) {
  const items = [];
  const add = (level, check, file, line, message) => items.push({ level, check, file, line, message });
  const files = walk(root);
  for (const file of files) scanText(add, root, file);
  for (const [name, level] of [['AGENTS.md', 'error'], ['README.md', 'warn']]) {
    if (!existsSync(join(root, name))) add(level, 'docs', name, 0, `${name} not found`);
  }
  const locked = checkLock(add, root);
  checkOpencode(add, root, locked);
  checkProject(add, root);
  const errors = items.filter((item) => item.level === 'error');
  const warnings = items.filter((item) => item.level === 'warn');
  return { root, files: files.length, items, errors, warnings };
}
function render(report, strict) {
  const failed = report.errors.length > 0 || (strict && report.warnings.length > 0);
  const out = [`gamefirst doctor  ${report.root}`];
  out.push(`files ${report.files} | errors ${report.errors.length} | warnings ${report.warnings.length} | strict ${strict ? 'on' : 'off'}`);
  for (const item of report.items) {
    const where = item.file ? `${item.file}${item.line ? `:${item.line}` : ''}` : '-';
    out.push(`${item.level === 'warn' ? 'warning' : 'error  '} ${item.check.padEnd(11)} ${where.padEnd(28)} ${item.message}`);
  }
  if (strict && report.warnings.length) out.push('result: --strict turns warnings into a failure');
  out.push(failed ? `result: ${report.errors.length} error(s), ${report.warnings.length} warning(s)` : `result: healthy (${report.warnings.length} warning(s))`);
  return out.join('\n');
}

function main(argv) {
  const args = parseArgs(argv);
  if (args.error) { console.error(`doctor: ${args.error}\nTry --help.`); return 2; }
  if (args.help) { console.log(USAGE.trimEnd()); return 0; }
  const root = resolve(args.dir || '.');
  let isDir = false;
  try { isDir = statSync(root).isDirectory(); } catch { isDir = false; }
  if (!isDir) { console.error(`doctor: game directory not found: ${root}`); return 2; }
  const report = build(root);
  const failed = report.errors.length > 0 || (args.strict && report.warnings.length > 0);
  if (args.json) {
    console.log(JSON.stringify({ schema: 1, ok: !failed, strict: args.strict, root, files: report.files, errors: report.errors, warnings: report.warnings }));
  } else console.log(render(report, args.strict));
  return failed ? 1 : 0;
}

process.exitCode = main(process.argv.slice(2));
