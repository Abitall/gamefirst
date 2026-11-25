#!/usr/bin/env node
/**
 * gamefirst status (CLI02) - read-only snapshot of a game project.
 * Usage: node tools/status.mjs [game-dir] [--json] [--help]
 * Reads STATE.md, BACKLOG.md, project.config.json and agent.lock.json.
 * Never writes, never touches the network, never throws a stack trace.
 */

import { readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, join, resolve } from 'node:path';

const USAGE = `gamefirst status - read-only project snapshot

Usage:
  node tools/status.mjs [game-dir] [--json] [--help]

Reads STATE.md, BACKLOG.md, project.config.json and agent.lock.json from
game-dir (default: current directory). Missing optional files are reported as
"missing"; a missing or incomplete STATE.md is an error.

Options:
  --json   print one JSON object (schema 1) instead of the human report
  --help   show this help and exit

Exit codes:
  0  report complete
  1  STATE.md missing/incomplete, or a JSON file cannot be parsed
  2  bad arguments or game-dir
`;

function parseArgs(argv) {
  const out = { dir: null, json: false, help: false };
  for (const arg of argv) {
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--json') out.json = true;
    else if (arg.startsWith('-')) return { error: `unknown option: ${arg}` };
    else if (out.dir !== null) return { error: `unexpected argument: ${arg}` };
    else out.dir = arg;
  }
  return out;
}

function findFile(dir, name) {
  try {
    const hit = readdirSync(dir).find((entry) => entry.toLowerCase() === name.toLowerCase());
    return hit ? join(dir, hit) : null;
  } catch {
    return null;
  }
}

function readText(file) {
  try {
    return { status: 'ok', text: readFileSync(file, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n') };
  } catch (err) {
    return { status: err.code === 'ENOENT' ? 'missing' : 'error', text: '', error: err.message };
  }
}

function clean(value) {
  return value
    .replace(/^\s*(?:[-*+]|\d+[.)])\s+/, '')
    .replace(/^\[[ xX]\]\s*/, '')
    .replace(/[*_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

const norm = (value) => clean(value).toLowerCase().replace(/:\s*$/, '');

function sectionsOf(lines) {
  const out = [];
  let current = null;
  for (const line of lines) {
    const heading = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading) {
      current = { level: heading[1].length, title: norm(heading[2]), lines: [] };
      out.push(current);
    } else if (current) current.lines.push(line);
  }
  return out;
}

const section = (sections, aliases) => sections.find((item) => aliases.includes(item.title)) || null;

function fieldLine(line) {
  const match = /^\s*(?:[-*+]\s+)?([A-Za-z][A-Za-z0-9 _/-]{0,30}):\s*(.+?)\s*$/.exec(line.replace(/\*\*|__|`/g, ''));
  return match ? [norm(match[1]), clean(match[2])] : null;
}

function inlineValue(lines, aliases) {
  for (const line of lines) {
    const field = fieldLine(line);
    if (field && aliases.includes(field[0])) return field[1];
  }
  return '';
}

function values(lines) {
  return lines.map(clean).filter((value) => value && !/^(none|n\/a)\.?$/i.test(value) && !/^[-*+]$/.test(value) && !/^\[.*\]$/.test(value));
}

function parseState(body) {
  const lines = body.replace(/<!--[\s\S]*?-->/g, '').split('\n');
  const sections = sectionsOf(lines);
  const pick = (aliases) => {
    const found = section(sections, aliases);
    return (found && values(found.lines)[0]) || inlineValue(lines, aliases);
  };
  const list = (aliases) => {
    const found = section(sections, aliases);
    const items = found ? values(found.lines) : [];
    const inline = inlineValue(lines, aliases);
    return items.length ? items : inline && !/^\d+$/.test(inline) ? [inline] : [];
  };
  const autonomy = section(sections, ['autonomy', 'autonomy contract', 'contract']);
  const autonomyKeys = new Set((autonomy ? autonomy.lines : []).map(fieldLine).filter(Boolean).map(([key]) => key));
  const autonomyPresent = autonomyKeys.has('goal')
    && (autonomyKeys.has('done') || autonomyKeys.has('definition of done'))
    && (autonomyKeys.has('stop') || autonomyKeys.has('stop conditions'));
  return {
    phase: pick(['phase', 'stage']),
    mode: pick(['mode']).toLowerCase(),
    active: list(['active parts', 'active', 'parts']).flatMap((item) => item.split(',').map(clean)).filter(Boolean),
    next: pick(['next action', 'next']),
    questions: list(['open questions', 'questions']),
    blockers: list(['blockers', 'blocked', 'blocking', 'blocked by']),
    gates: list(['gate state', 'gates', 'gate']),
    autonomy: { present: autonomyPresent },
  };
}

function parseBacklog(body) {
  const items = [];
  for (const line of body.split('\n')) {
    const match = /^[-*+]\s+(.*)$/.exec(line);
    if (!match) continue;
    let value = match[1].trim();
    if (/^\[[xX]\]\s*/.test(value) || /^~~/.test(value)) continue;
    value = value.replace(/^\[ \]\s*/, '').trim();
    if (value) items.push(clean(value));
  }
  return { open: items.length, top: items[0] || '' };
}

const text = (value) => (typeof value === 'string' ? value.trim() : '');

function parseJson(raw, name) {
  let data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    return { error: `${name}: ${err.message}` };
  }
  return data && typeof data === 'object' && !Array.isArray(data) ? data : { error: `${name}: expected an object` };
}

function parseConfig(raw) {
  const data = parseJson(raw, 'project.config.json');
  if (data.error) return { status: 'error', error: data.error };
  const engine = data.engine;
  const engineText = typeof engine === 'string' ? engine
    : engine && typeof engine === 'object' ? [engine.name, engine.version || engine.range].map(text).filter(Boolean).join(' ') : '';
  const verify = data.verify && Array.isArray(data.verify.recipe) ? data.verify.recipe.length > 0 : false;
  return {
    status: 'ok',
    name: text(data.name || (data.project && data.project.name)),
    version: text(data.version || (data.project && data.project.version)),
    engine: engineText,
    verify,
  };
}

function parseLock(raw) {
  const data = parseJson(raw, 'agent.lock.json');
  if (data.error) return { status: 'error', error: data.error };
  const parts = data.parts == null ? data.installed : data.parts;
  const count = Array.isArray(parts) ? parts.length
    : typeof parts === 'number' ? parts
      : parts && typeof parts === 'object' ? Object.keys(parts).length : 0;
  return { status: 'ok', version: text(data.version || (data.game && data.game.version) || data.gameVersion), parts: count };
}

function load(root, name, missing, parse) {
  const file = findFile(root, name);
  if (!file) {
    missing.push(name);
    return { file: null, status: 'missing' };
  }
  const read = readText(file);
  if (read.status !== 'ok') return { file: basename(file), status: 'error', error: `${name}: ${read.error}` };
  return { file: basename(file), status: 'ok', ...parse(read.text) };
}

function buildReport(root) {
  const errors = [];
  const missing = [];
  const state = {
    file: null, status: 'missing', phase: '', mode: '', active: [], next: '',
    questions: [], blockers: [], gates: [], autonomy: { present: false },
  };

  const stateFile = findFile(root, 'STATE.md');
  if (!stateFile) {
    errors.push('STATE.md not found. Create STATE.md (D02) with a phase and a next action, or pass the game directory.');
  } else {
    state.file = basename(stateFile);
    const read = readText(stateFile);
    if (read.status !== 'ok') {
      state.status = 'error';
      errors.push(`STATE.md: ${read.error}`);
    } else {
      Object.assign(state, parseState(read.text));
      state.status = 'ok';
      if (!state.phase) errors.push('STATE.md has no phase. Add "## Phase" with a value, or "Phase: production".');
      if (!state.next) errors.push('STATE.md has no next action. Add "## Next action" with one line.');
      if (state.mode === 'autonomous' && !state.autonomy.present) {
        errors.push('STATE.md mode is autonomous but has no Autonomy contract. R10 requires at least goal, done and stop.');
      }
    }
  }

  const backlog = { file: null, status: 'missing', open: 0, top: '', ...load(root, 'BACKLOG.md', missing, parseBacklog) };
  if (backlog.error) errors.push(backlog.error);
  const config = { file: null, status: 'missing', name: '', version: '', engine: '', verify: false, ...load(root, 'project.config.json', missing, parseConfig) };
  if (config.error) errors.push(config.error);
  const lock = { file: null, status: 'missing', version: '', parts: 0, ...load(root, 'agent.lock.json', missing, parseLock) };
  if (lock.error) errors.push(lock.error);

  return { schema: 1, ok: errors.length === 0, root, state, backlog, config, lock, missing, errors };
}

function cap(items, limit) {
  return items.slice(0, limit).join('; ') + (items.length > limit ? ` (+${items.length - limit} more)` : '');
}

function renderHuman(report) {
  const out = [];
  const { state, backlog, config, lock } = report;
  const rows = [
    ['phase', state.phase || '-'],
    ['mode', state.mode || '-'],
    ['active', state.active.length ? cap(state.active, 4) : 'none'],
    ['next', state.next || '-'],
    ['blocked', state.blockers.length ? state.blockers.join('; ') : state.status === 'ok' ? 'none' : 'unknown'],
    ['questions', `${state.questions.length} open`],
    ['gate', state.gates.length ? cap(state.gates, 2) : 'none'],
    ['autonomy', state.autonomy.present ? 'contract present' : state.mode === 'autonomous' ? 'MISSING (R10)' : 'off'],
    ['backlog', backlog.status === 'ok' ? `${backlog.open} open${backlog.top ? ` | top: ${backlog.top}` : ''}` : backlog.status],
    ['project', config.status === 'ok'
      ? [config.name || '-', config.version ? `v${config.version}` : '', config.engine, config.verify ? 'verify: yes' : ''].filter(Boolean).join(' | ')
      : config.status],
    ['parts', lock.status === 'ok' ? `${lock.parts} installed${lock.version ? ` | game ${lock.version}` : ''}` : lock.status],
  ];
  if (report.missing.length) rows.push(['missing', report.missing.join(', ')]);
  out.push(`gamefirst status  ${report.root}`);
  for (const [label, value] of rows) out.push(`${label.padEnd(11)} ${value}`);
  state.questions.slice(0, 3).forEach((question, index) => {
    out.push(`${' '.repeat(12)}${index + 1}. ${question.length > 160 ? `${question.slice(0, 157)}...` : question}`);
  });
  if (state.questions.length > 3) out.push(`${' '.repeat(12)}(+${state.questions.length - 3} more)`);
  return out.join('\n');
}

function main(argv) {
  const args = parseArgs(argv);
  if (args.error) {
    console.error(`status: ${args.error}\nTry --help.`);
    return 2;
  }
  if (args.help) {
    console.log(USAGE.trimEnd());
    return 0;
  }
  const root = resolve(args.dir || '.');
  try {
    if (!statSync(root).isDirectory()) {
      console.error(`status: not a directory: ${root}`);
      return 2;
    }
  } catch {
    console.error(`status: game directory not found: ${root}`);
    return 2;
  }
  const report = buildReport(root);
  if (args.json) console.log(JSON.stringify(report));
  else {
    console.log(renderHuman(report));
    for (const error of report.errors) console.error(`status: ${error}`);
  }
  return report.ok ? 0 : 1;
}

process.exitCode = main(process.argv.slice(2));
