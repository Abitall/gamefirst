#!/usr/bin/env node
/**
 * gamefirst verify (CLI03) - run the project's verify recipe and report pass/fail with evidence.
 * Usage: node tools/verify.mjs [game-dir] [--claim <slug>] [--timeout <seconds>] [--json] [--no-evidence]
 * It never fixes a failure, never edits a check and never weakens one (S02, E03).
 */

import { spawnSync } from 'node:child_process';
import { appendFileSync, existsSync, mkdirSync, readFileSync, renameSync, statSync, writeFileSync } from 'node:fs';
import { delimiter, isAbsolute, join, relative, resolve, sep } from 'node:path';

const DEFAULT_TIMEOUT = 300;
const MAX_TIMEOUT = 86400; // a check longer than a day is a watch mode, not a check
const BLOCKED = /(?:^|[\s;&|])(?:git\s+push|npm\s+publish|gh\s+release\s+create|rm\s+-rf\s+\/)(?=\s|;|&|\||$)/i;
const posix = (path) => path.split(sep).join('/');

const USAGE = `gamefirst verify - run the project's verify recipe

Usage: node tools/verify.mjs [game-dir] [--claim <slug>] [--timeout <sec>] [--json] [--no-evidence]

Runs each verify.recipe entry from project.config.json, in order, inside game-dir
(default: current directory), and reports PASS/FAIL with evidence. A missing
recipe or a missing tool is a FAIL, not a skip; nothing is ever edited or relaxed.

Options:
  --claim <slug>    evidence folder name; default "verify"
  --timeout <sec>   limit per command; default 300, range 1..86400
  --json            print one JSON object (schema 1) instead of the report
  --no-evidence     run without evidence/; such a PASS is not proof (R1, E03)
  -h, --help        show this help and exit

Recipe entry: { "cmd": "<shell command>", "required": true, "artifact": "path" }
  cmd       run in game-dir; its first word must resolve on PATH
  required  default true; false is reported but cannot fail the run
  artifact  optional file the command must leave non-empty for a PASS

Evidence: evidence/<YYYY-MM-DD>-<claim>/ with REPORT.md, commands.log and one
check-NN.log; a second run the same day gets -2, -3. Publishing or deleting
commands are refused before anything runs (R4, E12).

Exit codes: 0 all required checks passed; 1 a required check failed, timed out,
or no recipe; 2 bad arguments, unreadable config, or an invalid recipe entry.
`;

function parseArgs(argv) {
  const out = { dir: null, claim: 'verify', timeout: DEFAULT_TIMEOUT, json: false, evidence: true, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--json') out.json = true;
    else if (arg === '--no-evidence') out.evidence = false;
    else if (arg === '--claim' || arg === '--timeout') {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith('-')) return { error: `${arg} needs a value` };
      i += 1;
      if (arg === '--claim') out.claim = value; else out.timeout = value;
    } else if (arg.startsWith('--claim=')) out.claim = arg.slice(8);
    else if (arg.startsWith('--timeout=')) out.timeout = arg.slice(10);
    else if (arg.startsWith('-')) return { error: `unknown option: ${arg}` };
    else if (out.dir !== null) return { error: `unexpected argument: ${arg}` };
    else out.dir = arg;
  }
  out.claim = String(out.claim).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/, '');
  if (!out.claim) return { error: '--claim needs at least one letter or digit (a-z, 0-9)' };
  const seconds = Number(out.timeout);
  if (!Number.isInteger(seconds) || seconds < 1 || seconds > MAX_TIMEOUT) return { error: `--timeout must be an integer from 1 to ${MAX_TIMEOUT}` };
  out.timeout = seconds;
  return out;
}
function isFile(path) { try { return statSync(path).isFile(); } catch { return false; } }
function isDir(path) { try { return statSync(path).isDirectory(); } catch { return false; } }
function firstWord(cmd) {
  const match = /^\s*(?:"([^"]+)"|'([^']+)'|(\S+))/.exec(cmd);
  return match ? (match[1] || match[2] || match[3]) : '';
}
function resolveTool(cmd, game) {
  const name = firstWord(cmd);
  if (!name) return false;
  if (name.includes('/') || name.includes('\\')) return isFile(isAbsolute(name) ? name : resolve(game, name));
  const exts = process.platform === 'win32' ? [''].concat((process.env.PATHEXT || '.COM;.EXE;.BAT;.CMD').split(';').filter(Boolean)) : [''];
  for (const dir of (process.env.PATH || '').split(delimiter)) {
    const base = dir.replace(/^"|"$/g, '');
    if (!base) continue;
    for (const ext of exts) if (isFile(join(base, name + ext))) return true;
  }
  return false;
}
function loadRecipe(game) {
  const file = join(game, 'project.config.json');
  if (!existsSync(file)) return { error: `project.config.json not found in ${posix(game)}; create one with new-project.mjs (CLI01)` };
  let data;
  try { data = JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, '')); } catch (error) {
    return { error: `project.config.json is not valid JSON: ${error.message}` };
  }
  if (!data || typeof data !== 'object' || Array.isArray(data)) return { error: 'project.config.json must be a JSON object' };
  const recipe = data.verify ? data.verify.recipe : undefined;
  if (!Array.isArray(recipe)) return { empty: 'no verify recipe in project.config.json; set verify.recipe to an array of { cmd, required, artifact }' };
  if (!recipe.length) return { empty: 'verify.recipe is empty; add at least one { cmd, required, artifact } entry' };
  return validate(recipe, game);
}
function validate(recipe, game) {
  const checks = [];
  for (let i = 0; i < recipe.length; i += 1) {
    const entry = recipe[i];
    const at = `verify.recipe[${i}]`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return { error: `${at} must be an object` };
    if (typeof entry.cmd !== 'string' || !entry.cmd.trim()) return { error: `${at}.cmd must be a non-empty string` };
    if (/[\u0000-\u001f]/.test(entry.cmd)) return { error: `${at}.cmd contains a control character; one command per entry` };
    if (entry.required !== undefined && typeof entry.required !== 'boolean') return { error: `${at}.required must be true or false` };
    if (entry.artifact !== undefined && typeof entry.artifact !== 'string') return { error: `${at}.artifact must be a string path` };
    let artifact = '';
    if (entry.artifact) {
      const rel = relative(game, resolve(game, entry.artifact.replace(/\\/g, '/')));
      if (!rel || rel === '..' || rel.startsWith(`..${sep}`) || isAbsolute(rel)) return { error: `${at}.artifact must be a path inside the game directory` };
      if (rel.split(sep)[0] === 'evidence') return { error: `${at}.artifact must not point into evidence/; evidence is output, not a check` };
      artifact = posix(rel);
    }
    if (BLOCKED.test(entry.cmd)) return { error: `${at}.cmd is blocked: verify never publishes or deletes; remove "${firstWord(entry.cmd)}" (R4, E12)` };
    checks.push({ index: i + 1, cmd: entry.cmd.trim(), required: entry.required !== false, artifact });
  }
  return { checks };
}
function tail(text, lines = 15) {
  const body = String(text || '').replace(/\r\n?/g, '\n').trimEnd();
  if (!body) return '';
  const parts = body.split('\n');
  return (parts.length > lines ? ['...', ...parts.slice(-lines)] : parts).join('\n').slice(-2000);
}
function runOne(check, root, seconds) {
  const started = Date.now();
  const result = spawnSync(check.cmd, {
    cwd: root, shell: true, encoding: 'utf8', timeout: seconds * 1000,
    maxBuffer: 20 * 1024 * 1024, windowsHide: true, env: { ...process.env, NO_COLOR: '1', FORCE_COLOR: '0' },
  });
  const timedOut = Boolean(result.error && result.error.code === 'ETIMEDOUT') || (result.status === null && Boolean(result.signal));
  const overflowed = Boolean(result.error && result.error.code === 'ENOBUFS');
  return {
    exit: typeof result.status === 'number' ? result.status : null, durationMs: Date.now() - started, timedOut, overflowed,
    spawnError: result.error && !timedOut && !overflowed ? result.error.message : '', output: `${result.stdout || ''}${result.stderr || ''}`,
  };
}
function judge(check, run, root, seconds) {
  const base = { exit: run ? run.exit : null, durationMs: run ? run.durationMs : 0, timedOut: false };
  if (!run) return { ...base, result: check.required ? 'FAIL' : 'SKIP', note: `tool not found: ${firstWord(check.cmd)}`, error: `tool not found on PATH: ${firstWord(check.cmd)}; install it or fix the command` };
  const output = tail(run.output);
  if (run.timedOut) return { ...base, timedOut: true, result: 'FAIL', note: `timed out after ${seconds}s`, error: `timed out after ${seconds}s${output ? `:\n${output}` : ''}` };
  if (run.overflowed) return { ...base, result: 'FAIL', note: 'output over 20 MB', error: 'output exceeded 20 MB; the check is not evidence' };
  if (run.spawnError) return { ...base, result: 'FAIL', note: 'cannot run', error: `cannot run the command: ${run.spawnError}` };
  if (run.exit !== 0) return { ...base, result: 'FAIL', note: `exit ${run.exit}`, error: `exit ${run.exit}${output ? `:\n${output}` : ', no output'}` };
  if (check.artifact) {
    let ok = false;
    try { const stat = statSync(resolve(root, check.artifact)); ok = stat.isFile() && stat.size > 0; } catch { ok = false; }
    if (!ok) return { ...base, result: 'FAIL', note: 'artifact missing or empty', error: `artifact missing or empty: ${check.artifact}` };
  }
  return { ...base, result: 'PASS', note: `${run.durationMs} ms`, error: '' };
}
function makeEvidence(root, claim) {
  const base = join(root, 'evidence');
  const now = new Date();
  const stamp = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  let name = `${stamp}-${claim}`;
  for (let n = 2; existsSync(join(base, name)); n += 1) name = `${stamp}-${claim}-${n}`;
  mkdirSync(join(base, name), { recursive: true });
  return join(base, name);
}
function writeAtomic(file, text) {
  writeFileSync(`${file}.tmp`, text, 'utf8');
  renameSync(`${file}.tmp`, file);
}

function runAll(checks, root, seconds, base, claim) {
  const report = { claim, root: posix(root), evidence: base ? posix(base) : null, timeout: seconds, timestamp: new Date().toISOString(), checks: [], failures: 0, errors: [], ok: false };
  if (base) appendFileSync(join(base, 'commands.log'), `# gamefirst verify ${report.timestamp}\n# root ${report.root}; claim ${claim}; timeout ${seconds}s\n`);
  for (const check of checks) {
    const run = resolveTool(check.cmd, root) ? runOne(check, root, seconds) : null;
    const item = { ...check, ...judge(check, run, root, seconds) };
    if (base) {
      item.log = `check-${String(check.index).padStart(2, '0')}.log`;
      writeFileSync(join(base, item.log), `$ ${check.cmd}\n# ${item.result}; exit ${item.exit ?? '-'}; ${item.durationMs} ms${item.timedOut ? '; TIMEOUT' : ''}\n\n${run ? run.output : item.error}\n`, 'utf8');
      appendFileSync(join(base, 'commands.log'), `${check.index} ${item.result} ${check.cmd} | exit ${item.exit ?? '-'} | ${item.timedOut ? 'TIMEOUT ' : ''}${item.durationMs} ms\n`);
    }
    report.checks.push(item);
    if (item.result === 'FAIL' && check.required) report.failures += 1;
  }
  report.ok = report.failures === 0 && report.checks.length > 0;
  return report;
}
function renderReport(report) {
  const lines = [`# verify - ${report.claim}`, '', `- Date: ${report.timestamp}`, `- Project: ${report.root}`,
    `- Recipe: project.config.json (${report.checks.length} checks)`, `- Timeout: ${report.timeout}s per check`, '', '## Verdict', ''];
  if (report.ok) lines.push('PASS - every required check passed.');
  else if (!report.checks.length) lines.push('FAIL - no verify recipe.');
  else lines.push(`FAIL - ${report.failures} required check(s) failed.`);
  if (report.checks.length) {
    lines.push('', '| # | command | required | result | exit | artifact | note |', '|---|---|---|---|---|---|---|');
    for (const check of report.checks) {
      lines.push(`| ${check.index} | \`${check.cmd.replace(/\|/g, '\\|')}\` | ${check.required ? 'yes' : 'no'} | ${check.result} | ${check.exit ?? '-'} | ${check.artifact || '-'} | ${check.note} |`);
    }
  }
  const errors = [...report.errors, ...report.checks.filter((check) => check.result === 'FAIL').map((check) => `${check.index}. ${check.cmd}\n${check.error}`)];
  if (errors.length) lines.push('', '## Errors', '', ...errors.map((error) => `\`\`\`text\n${error}\n\`\`\``));
  lines.push('', '## Next', '');
  lines.push(report.ok ? `Evidence: ${report.evidence || 'not written (--no-evidence)'}` : `Fix the failing check(s), then re-run: node tools/verify.mjs --claim ${report.claim}`);
  return `${lines.join('\n')}\n`;
}
function renderHuman(report) {
  const required = report.checks.filter((check) => check.required).length;
  const lines = [`gamefirst verify  ${report.root}`, `claim     ${report.claim}`, `recipe    ${report.checks.length} checks, ${required} required, ${report.timeout}s each`, ''];
  for (const check of report.checks) lines.push(`  ${String(check.index).padStart(2)}  ${check.result.padEnd(4)}  ${check.cmd}${check.artifact ? `  [${check.artifact}]` : ''}  ${check.note}`);
  for (const check of report.checks.filter((item) => item.result === 'FAIL')) lines.push('', `  ${check.index}. ${check.cmd}`, `     ${check.error.split('\n').join('\n     ')}`);
  for (const error of report.errors) lines.push('', `  ${error}`);
  lines.push('', `verdict   ${report.ok ? 'PASS' : `FAIL  ${report.failures} required check(s) failed`}`);
  lines.push(`evidence  ${report.evidence || 'not written (--no-evidence)'}`);
  if (!report.ok) lines.push(`next      fix the failing check(s), then: node tools/verify.mjs --claim ${report.claim}`);
  return lines.join('\n');
}

function stop(args, root, error) {
  if (args.json) console.log(JSON.stringify({ schema: 1, ok: false, verdict: 'ERROR', claim: args.claim, root: posix(root), error }));
  else console.error(`verify: ${error}`);
  return 2;
}
function main(argv) {
  const args = parseArgs(argv);
  if (args.error) { console.error(`verify: ${args.error}\nTry --help.`); return 2; }
  if (args.help) { console.log(USAGE.trimEnd()); return 0; }
  const root = resolve(args.dir || '.');
  if (!isDir(root)) { console.error(`verify: game directory not found: ${root}`); return 2; }
  const loaded = loadRecipe(root);
  if (loaded.error) return stop(args, root, loaded.error);
  let base = null;
  if (args.evidence) {
    try { base = makeEvidence(root, args.claim); } catch (error) {
      return stop(args, root, `cannot create the evidence folder: ${error.message}; fix permissions or pass --no-evidence`);
    }
  } else console.error('verify: --no-evidence: this run is not evidence and cannot support a done claim (R1, E03)');
  const report = runAll(loaded.checks || [], root, args.timeout, base, args.claim);
  if (loaded.empty) report.errors.push(loaded.empty);
  if (base) {
    try { writeAtomic(join(base, 'REPORT.md'), renderReport(report)); } catch (error) {
      return stop(args, root, `cannot write REPORT.md: ${error.message}`);
    }
  }
  if (args.json) console.log(JSON.stringify({ schema: 1, ok: report.ok, verdict: report.ok ? 'PASS' : 'FAIL', claim: report.claim, root: report.root, timeout: report.timeout, evidence: report.evidence, checks: report.checks, errors: report.errors }));
  else console.log(renderHuman(report));
  return report.ok ? 0 : 1;
}

process.exitCode = main(process.argv.slice(2));
