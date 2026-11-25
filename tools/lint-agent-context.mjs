#!/usr/bin/env node
/**
 * lint-agent-context - read-only linter for a gamefirst agent context tree.
 * Scans AGENTS.md, active .opencode/ parts and library/ parts for token
 * budgets, duplicate lines and IDs, priority conflicts, stale part IDs,
 * missing backticked paths, frontmatter shape and file encoding.
 * Exit codes: 0 clean, 1 findings (or warnings with --strict), 2 usage/config.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';
const USAGE = 'Usage: lint-agent-context [--root DIR] [--json] [--strict] [--budget KIND=N]\n\n' +
  '  --root DIR      gamefirst tree to scan (default: .)\n' +
  '  --json          print a schema-1 JSON report on one line\n' +
  '  --strict        treat warnings as failures\n' +
  '  --budget K=N    override a token budget for rule, agent, skill, gate, eval, crew, command or agents\n' +
  '  --help          show this help';
const BUDGETS = { rule: 600, agent: 700, skill: 800, gate: 500, eval: 500, crew: 700, command: 300, agents: 700 };
const ORDER = ['mode', 'rules', 'skill', 'pack', 'docs'];
const SKILLS = ['research', 'verify', 'retrospect', 'import', 'tool', 'brainstorm', 'engine-choice', 'prototype', 'gym', 'slice', 'content', 'polish', 'release'];
const CREWS = { 'prototype-crew': 'C01', 'slice-crew': 'C02', 'release-crew': 'C03' };
const AGENTS = { partner: 'A01', designer: 'A02', engineer: 'A03', critic: 'A04' };
const COMMANDS = { start: 'SL01', status: 'SL02', next: 'SL03', verify: 'SL04', retro: 'SL05', help: 'SL06' };
const KIND_BY_DIR = { rules: 'rule', agents: 'agent', gates: 'gate', evals: 'eval', crews: 'crew', commands: 'command' };
const IDS = new Set(['G2.5']);
const pad = (n) => String(n).padStart(2, '0');
for (let i = 1; i <= 10; i++) IDS.add(`R${i}`);
for (let i = 0; i <= 3; i++) IDS.add(`G${i}`);
for (const [p, n] of [['S', 13], ['A', 4], ['E', 12], ['CLI', 10], ['D', 10], ['C', 3]]) for (let i = 1; i <= n; i++) IDS.add(p + pad(i));
const posix = (p) => p.split(sep).join('/');
const lineAt = (text, index) => text.slice(0, index).split('\n').length;
const finding = (level, code, message, file, line) => ({ level, code, message, file, line });
const fail = (message) => { throw new Error(message); };
function parseArgs(argv) {
  const opts = { root: '.', json: false, strict: false, budgets: {} };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--help') return { help: true };
    if (arg === '--json') opts.json = true;
    else if (arg === '--strict') opts.strict = true;
    else if (arg === '--root') {
      if (argv[i + 1] === undefined) fail('--root needs a value');
      opts.root = argv[++i];
    } else if (arg === '--budget') {
      const value = argv[++i];
      if (value === undefined) fail('--budget needs a value');
      for (const item of value.split(',')) {
        const m = /^([a-z]+)=(\d+)$/.exec(item.trim());
        if (!m) fail(`bad --budget value: ${item}`);
        if (!(m[1] in BUDGETS)) fail(`unknown budget kind: ${m[1]}`);
        if (+m[2] < 1) fail(`budget must be positive: ${item}`);
        opts.budgets[m[1]] = +m[2];
      }
    } else fail(`unknown argument: ${arg}`);
  }
  return opts;
}
function walk(path, out, cap) {
  if (!existsSync(path) || out.length >= cap) return;
  if (statSync(path).isFile()) { out.push(path); return; }
  for (const name of readdirSync(path).sort()) walk(join(path, name), out, cap);
}
function kindOf(rel) {
  if (rel === 'AGENTS.md') return 'agents';
  if (!rel.endsWith('.md')) return null;
  const parts = rel.split('/');
  const i = parts.findIndex((p) => p in KIND_BY_DIR || p === 'skills');
  if (i < 0) return null;
  if (parts[i] === 'skills') return basename(rel) === 'SKILL.md' ? 'skill' : null;
  return KIND_BY_DIR[parts[i]];
}
function parseFm(text) {
  const lines = text.split(/\r?\n/);
  const out = { has: false, bodyStart: 0, keys: {} };
  if (lines[0].trim() !== '---') return out;
  out.has = true;
  const end = lines.findIndex((l, i) => i > 0 && l.trim() === '---');
  if (end < 0) { out.error = 'unclosed frontmatter'; return out; }
  out.bodyStart = end + 1;
  for (const line of lines.slice(1, end)) {
    const m = /^([A-Za-z0-9_-]+):\s*(.*)$/.exec(line);
    if (m) out.keys[m[1]] = m[2].trim().replace(/^['"]|['"]$/g, '');
  }
  return out;
}
function checkFm(part, out) {
  const { fm, kind, file } = part;
  const bad = (msg) => out.push(finding('error', 'FRONTMATTER', msg, file, 1));
  if (fm.error) return bad(fm.error);
  if (kind !== 'agent' && kind !== 'skill' && kind !== 'command') {
    if (fm.has) bad(`frontmatter is not allowed on a ${kind}`);
    return;
  }
  if (!fm.has) return bad('missing frontmatter block');
  const k = fm.keys;
  if (kind === 'agent') {
    if (!k.description) bad('agent frontmatter needs description');
    if (!['primary', 'subagent', 'all'].includes(k.mode)) bad('agent mode must be primary, subagent or all');
  } else if (kind === 'skill') {
    if (!k.name) bad('skill frontmatter needs name');
    else if (k.name !== basename(dirname(file))) bad(`skill name "${k.name}" must match its directory`);
    if (!k.description) bad('skill frontmatter needs description');
  } else if (!k.description) bad('command frontmatter needs description');
}
function declared(part) {
  const stem = basename(part.file, '.md');
  const text = part.text;
  if (part.file === 'AGENTS.md') return 'AGENTS';
  if (part.kind === 'rule') return /^#\s+(R\d+)\b/m.exec(text)?.[1] || /^R\d+/.exec(stem)?.[0] || null;
  if (part.kind === 'gate') return /^#\s+(G\d(?:\.5)?)\b/m.exec(text)?.[1] || /^G\d(?:\.5)?/.exec(stem)?.[0] || null;
  if (part.kind === 'eval') return /^#\s+(E\d{2})\b/m.exec(text)?.[1] || /^E\d{2}/.exec(stem)?.[0] || null;
  if (part.kind === 'agent') return /^You are (A\d{2})\b/m.exec(text)?.[1] || AGENTS[stem] || null;
  if (part.kind === 'crew') return /\b(C\d{2})\b/.exec(text.slice(0, 600))?.[1] || CREWS[stem] || null;
  if (part.kind === 'command') return COMMANDS[stem] || null;
  const index = SKILLS.indexOf(part.fm.keys.name || basename(dirname(part.file)));
  return index < 0 ? null : `S${pad(index + 1)}`;
}
function bodyLines(part) {
  const lines = part.text.split(/\r?\n/);
  const out = [];
  let fenced = false;
  for (let i = part.fm.bodyStart; i < lines.length; i++) {
    const line = lines[i];
    if (/^\s*(```|~~~)/.test(line)) { fenced = !fenced; continue; }
    if (fenced) continue;
    const norm = line.trim().replace(/\s+/g, ' ').toLowerCase();
    if (norm.length < 40 || norm.split(' ').length < 7 || /^(#|\||-{3,}|>)/.test(norm)) continue;
    out.push([norm, i + 1]);
  }
  return out;
}
function scan(root, opts) {
  if (!existsSync(root) || !statSync(root).isDirectory()) fail(`root is not a directory: ${root}`);
  if (!['AGENTS.md', '.opencode', 'library'].some((p) => existsSync(join(root, p)))) fail(`not a gamefirst tree: ${root}`);
  const files = [];
  for (const name of ['AGENTS.md', '.opencode', 'evals', 'library']) walk(join(root, name), files, 5000);
  const parts = [];
  const findings = [];
  for (const abs of files) {
    const rel = posix(relative(root, abs));
    const kind = kindOf(rel);
    if (!kind) continue;
    const raw = readFileSync(abs, 'utf8');
    const bom = raw.charCodeAt(0) === 0xfeff;
    const text = bom ? raw.slice(1) : raw;
    const seg = rel.split('/')[0];
    const layer = rel === 'AGENTS.md' || rel.startsWith('.opencode/') || rel.startsWith('evals/') ? 'active' : seg === 'engines' ? 'engine' : seg === 'packs' ? 'pack' : seg;
    const part = { file: rel, kind, layer, source: layer === 'active' ? 'active' : 'library', text, tokens: Math.ceil(text.length / 4), budget: opts.budgets[kind] || BUDGETS[kind] };
    part.fm = parseFm(text);
    part.id = declared(part);
    checkFm(part, findings);
    if (bom) findings.push(finding('error', 'ENCODING', 'BOM marker found', rel, 1));
    if (text.includes('\r\n')) findings.push(finding('error', 'ENCODING', 'CRLF line endings; use LF', rel, 1));
    if (text.includes('\uFFFD')) findings.push(finding('error', 'ENCODING', 'invalid UTF-8 bytes', rel, 1));
    if (part.source === 'active' && text.includes('{{')) findings.push(finding('error', 'ENCODING', 'unresolved {{placeholder}}', rel, lineAt(text, text.indexOf('{{'))));
    if (part.tokens > part.budget) findings.push(finding('error', 'BUDGET', `${part.tokens} tokens over budget ${part.budget}`, rel, 1));
    if (!part.id && part.kind !== 'skill' && part.file !== 'AGENTS.md') findings.push(finding('warning', 'NO-ID', `no ${part.kind} ID found`, rel, 1));
    parts.push(part);
  }
  const seen = new Map();
  for (const part of parts.filter((p) => p.source === 'active')) for (const [norm, line] of bodyLines(part)) {
    const first = seen.get(norm);
    if (!first) { seen.set(norm, { file: part.file, line }); continue; }
    if (first.file !== part.file) findings.push(finding('error', 'DUP-LINE', `duplicate line (first at ${first.file}:${first.line})`, part.file, line));
  }
  const ids = new Map();
  for (const part of parts) {
    if (!part.id) continue;
    const key = `${part.source}:${part.id}`;
    const first = ids.get(key);
    if (!first) ids.set(key, part);
    else findings.push(finding('error', 'DUP-ID', `duplicate id ${part.id} (also in ${first.file})`, part.file, 1));
  }
  const agents = parts.find((p) => p.file === 'AGENTS.md');
  if (agents) {
    const lines = agents.text.split(/\r?\n/);
    const index = lines.findIndex((l) => l.includes('>') && (l.match(/\b(mode|rules|skill|pack|docs)\b/g) || []).length > 1);
    if (index < 0) findings.push(finding('warning', 'PRIORITY', 'no priority line found', agents.file, 1));
    else {
      let last = -1;
      for (const word of lines[index].toLowerCase().match(/\b(mode|rules|skill|pack|docs)\b/g) || []) {
        const at = ORDER.indexOf(word);
        if (at <= last) { findings.push(finding('error', 'PRIORITY', `priority must be ${ORDER.join(' > ')}`, agents.file, index + 1)); break; }
        last = at;
      }
    }
  }
  for (const part of parts) {
    const lines = part.text.split(/\r?\n/);
    for (let i = 0; i < lines.length; i++) {
      const m = /\b(mode|rules|skill|pack|docs)\b\s+(?:overrides?|outranks?|takes precedence over)\s+(?:the\s+)?\b(mode|rules|skill|pack|docs)\b/.exec(lines[i]);
      if (m && ORDER.indexOf(m[1]) > ORDER.indexOf(m[2])) findings.push(finding('error', 'PRIORITY', `${m[1]} cannot override ${m[2]}`, part.file, i + 1));
    }
  }
  const REF = /(?<![\w-])(R\d+|S\d{2}|A\d{2}|E\d{2}|CLI\d{2}|G\d(?:\.5)?|D\d{2}|C\d{2})(?!\w)/g;
  for (const part of parts) for (const m of part.text.matchAll(REF)) {
    if (!IDS.has(m[1])) findings.push(finding('error', 'STALE-REF', `unknown part id ${m[1]}`, part.file, lineAt(part.text, m.index)));
  }
  if (existsSync(join(root, 'AGENTS.md')) && existsSync(join(root, '.opencode'))) for (const part of parts) {
    if (part.source !== 'active' || part.kind === 'eval') continue;
    const seenPaths = new Set();
    for (const m of part.text.matchAll(/`([^`\n]+)`/g)) {
      const span = m[1].trim().replace(/\/$/, '');
      if (!/^[\w.-]+(?:\/[\w.-]+)+$/.test(span) || span.split('/').includes('..') || seenPaths.has(span)) continue;
      seenPaths.add(span);
      if (!existsSync(join(root, span))) findings.push(finding('warning', 'MISSING-PATH', `referenced path not found: ${span}`, part.file, lineAt(part.text, m.index)));
    }
  }
  const errors = findings.filter((f) => f.level === 'error'), warnings = findings.filter((f) => f.level === 'warning');
  return { parts, errors, warnings, budgets: { ...BUDGETS, ...opts.budgets } };
}
function printHuman(root, report) {
  const rows = report.parts.map((p) => [p.id || '-', p.kind, p.layer, `${p.tokens}/${p.budget}`, p.file]);
  const widths = [6, 8, 8, 13];
  const cols = (row) => row.map((v, i) => (i < 4 ? String(v).padEnd(widths[i]) : v)).join(' ');
  console.log(`lint-agent-context: ${root}`);
  console.log(`parts: ${rows.length}  errors: ${report.errors.length}  warnings: ${report.warnings.length}`);
  console.log(cols(['ID', 'KIND', 'LAYER', 'TOKENS', 'FILE']));
  for (const row of rows) console.log(cols(row));
  const all = [...report.errors, ...report.warnings];
  if (!all.length) console.log('\nfindings: none');
  else {
    console.log('\nfindings:');
    for (const f of all) console.log(`  ${f.level.toUpperCase().padEnd(7)} ${f.code.padEnd(12)} ${f.file}:${f.line} - ${f.message}`);
  }
  const failed = report.errors.length > 0 || (report.strict && report.warnings.length > 0);
  console.log(`\nresult: ${failed ? 'FAIL' : 'PASS'} (${report.errors.length} errors, ${report.warnings.length} warnings)`);
}
function main(argv) {
  const opts = parseArgs(argv);
  if (opts.help) { console.log(USAGE); return 0; }
  const root = resolve(opts.root);
  const report = scan(root, opts);
  report.strict = opts.strict;
  const code = report.errors.length ? 1 : opts.strict && report.warnings.length ? 1 : 0;
  if (opts.json) console.log(JSON.stringify({
    schema: 1, ok: code === 0, strict: opts.strict, root: posix(root), budgets: report.budgets,
    parts: report.parts.map((p) => ({ id: p.id, kind: p.kind, layer: p.layer, tokens: p.tokens, budget: p.budget, file: p.file })),
    errors: report.errors, warnings: report.warnings,
  }));
  else printHuman(root, report);
  return code;
}
try {
  process.exit(main(process.argv.slice(2)));
} catch (error) {
  console.error(`lint-agent-context: ${error.message}`);
  process.exit(2);
}
