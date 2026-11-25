#!/usr/bin/env node
/**
 * gamefirst eval (CLI04) - run the deterministic part of the eval suite.
 * Usage: node tools/eval.mjs [game-dir] [--list] [--case ID] [--timeout s] [--json]
 * Copies each fixture to a temp dir, runs its run.mjs or a recipe there. Offline.
 */

import { cpSync, existsSync, lstatSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { basename, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';

const DEFAULT_TIMEOUT = 30;
const MAX_TIMEOUT = 600;
const MAX_BUFFER = 4 * 1024 * 1024;
const MAX_TEXT = 1500;
const FILE = /^(E\d+(?:\.\d+)?)(?:-.*)?\.md$/i;
const label = (item) => basename(item.file, '.md');

const USAGE = `gamefirst eval - run the deterministic part of the eval suite

Usage:
  node tools/eval.mjs [game-dir] [options]

Finds evals/E<ID>-<slug>.md and expects evals/fixtures/<ID>/.
Each fixture is copied to one temp dir and at most one check runs there:
an evals.recipe entry for the ID in project.config.json, else its run.mjs
as "node run.mjs", else a "*" recipe entry, else skip-manual.
No fixture dir means missing-fixture; prompt-only cases never run.
Recipe entry: { "case": "E01" | "*", "cmd": "npm run check", "timeout": 60 }
The tool writes only inside its temp dir and always removes it.

Options:
  --list            list cases and how each one runs; runs nothing
  --case <ID>       one case, by ID or file stem (E01 or E01-small-change)
  --timeout <s>     limit per fixture, 1-600 (default 30)
  --json            print one JSON object (schema 1) instead of the report
  --help            show this help and exit

Exit codes:
  0  no runnable check failed (skip-manual/missing-fixture do not fail)
  1  a check failed, timed out, or could not start
  2  bad arguments, no evals/ directory, or a broken evals.recipe
`;

function parseArgs(raw) {
  const out = { dir: null, caseId: null, list: false, json: false, help: false, timeout: DEFAULT_TIMEOUT };
  const argv = raw.flatMap((arg) => (arg.startsWith('--') && arg.includes('=')
    ? [arg.slice(0, arg.indexOf('=')), arg.slice(arg.indexOf('=') + 1)] : [arg]));
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const value = () => (argv[i + 1] === undefined || argv[i + 1].startsWith('-') ? null : argv[++i]);
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--list') out.list = true;
    else if (arg === '--json') out.json = true;
    else if (arg === '--case') {
      const id = value();
      if (!id) return { error: '--case needs an eval ID' };
      out.caseId = id;
    } else if (arg === '--timeout') {
      const seconds = Number(value());
      if (!Number.isInteger(seconds) || seconds < 1 || seconds > MAX_TIMEOUT) return { error: `--timeout needs an integer 1-${MAX_TIMEOUT}` };
      out.timeout = seconds;
    } else if (arg.startsWith('-')) return { error: `unknown option: ${arg}` };
    else if (out.dir !== null) return { error: `unexpected argument: ${arg}` };
    else out.dir = arg;
  }
  return out;
}

function isDir(path) {
  try { return statSync(path).isDirectory(); } catch { return false; }
}

function readText(file) {
  try { return readFileSync(file, 'utf8').replace(/^\uFEFF/, ''); } catch { return ''; }
}

function loadConfig(root) {
  let file = null;
  try { file = readdirSync(root).find((entry) => entry.toLowerCase() === 'project.config.json'); } catch { /* no root */ }
  if (!file) return { recipe: [] };
  let data;
  try { data = JSON.parse(readText(join(root, file))); } catch (error) { return { error: `project.config.json: ${error.message}` }; }
  const evals = data && typeof data === 'object' ? data.evals : null;
  const recipe = evals && typeof evals === 'object' ? evals.recipe : null;
  if (recipe == null) return { recipe: [] };
  if (!Array.isArray(recipe)) return { error: 'project.config.json: evals.recipe must be an array' };
  const out = [];
  for (const [index, entry] of recipe.entries()) {
    if (!entry || typeof entry !== 'object') return { error: `evals.recipe[${index}] must be an object` };
    const entryCase = typeof entry.case === 'string' ? entry.case.trim().toUpperCase() : '*';
    if (entryCase !== '*' && !/^E\d+(?:\.\d+)?$/.test(entryCase)) return { error: `evals.recipe[${index}].case must be an eval ID or "*"` };
    if (typeof entry.cmd !== 'string' || !entry.cmd.trim()) return { error: `evals.recipe[${index}].cmd must be a non-empty string` };
    const { timeout } = entry;
    if (timeout !== undefined && (!Number.isInteger(timeout) || timeout < 1 || timeout > MAX_TIMEOUT)) {
      return { error: `evals.recipe[${index}].timeout must be an integer 1-${MAX_TIMEOUT}` };
    }
    out.push({ case: entryCase, cmd: entry.cmd.trim(), timeout });
  }
  return { recipe: out };
}

function inspect(root, file, id, recipe, timeout) {
  const fixturePath = join(root, 'evals', 'fixtures', id);
  const exact = recipe.find((item) => item.case === id) || null;
  const wildcard = recipe.find((item) => item.case === '*') || null;
  const mode = !isDir(fixturePath) ? 'none'
    : exact ? 'recipe'
      : existsSync(join(fixturePath, 'run.mjs')) ? 'run.mjs'
        : wildcard ? 'recipe' : 'manual';
  const chosen = mode === 'recipe' ? exact || wildcard : null;
  const line = readText(file).split(/\r?\n/).find((row) => /^#\s+\S/.test(row));
  const name = (line || '').replace(/^#\s+/, '').replace(new RegExp(`^${id}\\s*[\\u2013\\u2014:-]\\s*`, 'i'), '').replace(/\s+/g, ' ').trim();
  return {
    id, name: name || id, file: `evals/${basename(file)}`, fixture: `evals/fixtures/${id}`, fixturePath, mode,
    timeout: (chosen && chosen.timeout) || timeout, cmd: chosen ? chosen.cmd : null,
  };
}

function tail(value, limit = MAX_TEXT) {
  const text = String(value || '').trim();
  return text.length > limit ? `[truncated]\n${text.slice(-limit)}` : text;
}

function execute(item, work) {
  const base = {
    id: item.id, name: item.name, file: item.file, fixture: item.fixture, mode: item.mode, cmd: item.cmd,
    status: item.mode === 'none' ? 'missing-fixture' : 'skip-manual',
    reason: '', exit: null, ms: 0, stdout: '', stderr: '', error: '',
  };
  if (item.mode !== 'run.mjs' && item.mode !== 'recipe') return base;
  const dir = join(work, item.id), started = Date.now();
  let options;
  try {
    cpSync(item.fixturePath, dir, {
      recursive: true,
      filter: (src) => {
        if (lstatSync(src).isSymbolicLink()) throw new Error(`fixture has a symlink: ${src}`);
        return true;
      },
    });
    options = {
      cwd: dir, encoding: 'utf8', timeout: item.timeout * 1000, maxBuffer: MAX_BUFFER,
      stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true, env: { ...process.env, GAMEFIRST_EVAL_CASE: item.id },
    };
  } catch (error) {
    return { ...base, status: 'fail', reason: 'copy', ms: Date.now() - started, error: error.message };
  }
  const result = item.mode === 'run.mjs'
    ? spawnSync(process.execPath, ['run.mjs'], options)
    : spawnSync(item.cmd, { ...options, shell: true });
  const timedOut = Boolean((result.error && result.error.code === 'ETIMEDOUT') || (result.status === null && result.signal));
  return {
    ...base,
    status: !timedOut && !result.error && result.status === 0 ? 'pass' : 'fail',
    reason: timedOut ? 'timeout' : result.error ? 'spawn' : result.status === 0 ? '' : 'exit',
    exit: result.status, ms: Date.now() - started,
    stdout: tail(result.stdout), stderr: tail(result.stderr), error: result.error ? result.error.message : '',
  };
}

function renderRun(report) {
  const out = [`gamefirst eval  ${report.root}`, ''];
  const width = Math.max(4, ...report.cases.map((item) => label(item).length));
  for (const item of report.cases) out.push(`${label(item).padEnd(width)}  ${item.status.padEnd(16)} ${item.mode}`);
  const { total, pass, fail, skipManual, missingFixture } = report.summary;
  out.push('', `${total} ${total === 1 ? 'case' : 'cases'}: ${pass} pass, ${fail} fail, ${skipManual} skip-manual, ${missingFixture} missing-fixture`);
  for (const item of report.cases.filter((row) => row.status === 'fail')) {
    out.push('', `fail ${label(item)} (${item.reason || 'exit'}${item.exit === null ? '' : ` ${item.exit}`})`);
    for (const text of [item.stdout, item.stderr, item.error].filter(Boolean)) out.push(...text.split('\n').slice(-8).map((line) => `  ${line}`));
  }
  return out.join('\n');
}

function main(argv) {
  const args = parseArgs(argv);
  if (args.error) {
    console.error(`eval: ${args.error}\nTry --help.`);
    return 2;
  }
  if (args.help) {
    console.log(USAGE.trimEnd());
    return 0;
  }
  const root = resolve(args.dir || '.');
  if (!isDir(root)) {
    console.error(`eval: game directory not found: ${root}`);
    return 2;
  }
  const evalsDir = join(root, 'evals');
  if (!isDir(evalsDir)) {
    console.error(`eval: evals directory not found: ${evalsDir}\nCreate evals/ with E<ID>-<slug>.md files, or pass the game directory.`);
    return 2;
  }
  const config = loadConfig(root);
  if (config.error) {
    console.error(`eval: ${config.error}`);
    return 2;
  }
  let cases = readdirSync(evalsDir)
    .filter((entry) => FILE.test(entry))
    .map((entry) => inspect(root, join(evalsDir, entry), FILE.exec(entry)[1].toUpperCase(), config.recipe, args.timeout))
    .sort((a, b) => a.id.localeCompare(b.id, 'en', { numeric: true }));

  if (args.caseId !== null) {
    const wanted = args.caseId.trim().toUpperCase().replace(/\.MD$/, '');
    cases = cases.filter((item) => item.id === wanted || basename(item.file).replace(/\.md$/i, '').toUpperCase() === wanted);
    if (!cases.length) {
      const known = readdirSync(evalsDir).filter((entry) => FILE.test(entry)).map((entry) => FILE.exec(entry)[1].toUpperCase());
      console.error(`eval: unknown case: ${args.caseId}\nAvailable: ${known.join(', ') || 'none'}`);
      return 2;
    }
  }

  if (args.list) {
    if (args.json) console.log(JSON.stringify({ schema: 1, root, evalsDir, cases: cases.map(({ fixturePath, ...item }) => item) }));
    else {
      const width = Math.max(4, ...cases.map((item) => label(item).length));
      console.log([`gamefirst eval  ${root}`, '', ...cases.map((item) => `${label(item).padEnd(width)}  ${item.mode.padEnd(8)} ${item.name}`),
        '', `${cases.length} ${cases.length === 1 ? 'case' : 'cases'}; modes: run.mjs, recipe, manual (skip), none (no fixture)`].join('\n'));
    }
    return 0;
  }

  const work = mkdtempSync(join(tmpdir(), 'gamefirst-eval-'));
  let results;
  try {
    results = cases.map((item) => execute(item, work));
  } finally {
    rmSync(work, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 });
  }
  const count = (status) => results.filter((item) => item.status === status).length;
  const summary = {
    total: results.length, pass: count('pass'), fail: count('fail'),
    skipManual: count('skip-manual'), missingFixture: count('missing-fixture'),
  };
  const report = { schema: 1, ok: summary.fail === 0, root, evalsDir, cases: results, summary };
  console.log(args.json ? JSON.stringify(report) : renderRun(report));
  return summary.fail === 0 ? 0 : 1;
}

try {
  process.exitCode = main(process.argv.slice(2));
} catch (error) {
  console.error(`eval: unexpected error: ${error.message}`);
  process.exitCode = 2;
}
