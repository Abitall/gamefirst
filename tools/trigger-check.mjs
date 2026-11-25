#!/usr/bin/env node
// gamefirst trigger-check (CLI09): lexical trigger smoke check for library parts.
// Usage: node tools/trigger-check.mjs [--root DIR] [--fixtures FILE] [--threshold N] [--json] [--help]
// Reads evals/trigger-fixtures.json, reports false positives and negatives.
// Read-only and offline: no model calls, no network, no writes.
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, dirname, join, relative, resolve, sep } from 'node:path';

const DEFAULT_THRESHOLD = 0.3;
const ID_LIKE = /^[a-z]{1,4}\d+(?:\.\d+)?$/;
const SECTION = /^##\s+(trigger|when|use when)\s*$/i;
const KINDS = { rules: 'rule', agents: 'agent', commands: 'command', skills: 'skill', evals: 'eval', crews: 'crew', gates: 'gate' };
const STOP = new Set(`a about after all also an and any are as at be been before being but by
can could did do does each for from had has have how if in into is it its may more must no not
of on one only or other our out over same should so some such than that the their then there
these they this those through to too under up use used using very was we were what when where
which while who why will with would you your`.split(/\s+/));
const USAGE = `gamefirst trigger-check - lexical trigger smoke check

Usage: node tools/trigger-check.mjs [options]

Trigger text: frontmatter description plus the first paragraph under ## Trigger,
## When or ## Use when; commands use the description only, other parts fall back
to their first body paragraph. Prompts from evals/trigger-fixtures.json are
scored lexically (lowercase tokens, stopwords, IDF weights, coverage share).
Smoke check, not semantic routing; semantic cases belong to CLI04.

  --root <dir>       project root to scan (default: .)
  --fixtures <file>  fixture file (default: <root>/evals/trigger-fixtures.json)
  --threshold <n>    score cutoff in (0, 1] (default: 0.3)
  --json             print one JSON object (schema 1)
  --help             show this help and exit
Exit 0 clean, 1 false positive/negative or forbid hit, 2 usage or config error.
`;
const isDir = (path) => { try { return statSync(path).isDirectory(); } catch { return false; } };
const readText = (path) => readFileSync(path, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
const posix = (path) => path.split(sep).join('/');
const fail = (message) => { console.error(`trigger-check: ${message}`); return 2; };

function parseArgs(argv) {
  const out = { root: '.', fixtures: null, threshold: DEFAULT_THRESHOLD, json: false, help: false };
  const args = argv.flatMap((a) => (a.startsWith('--') && a.includes('=') ? [a.slice(0, a.indexOf('=')), a.slice(a.indexOf('=') + 1)] : [a]));
  const valued = { '--root': 'root', '--fixtures': 'fixtures', '--threshold': 'threshold' };
  for (let i = 0; i < args.length; i += 1) {
    const arg = args[i];
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--json') out.json = true;
    else if (valued[arg]) {
      const value = args[i + 1];
      if (value === undefined || !value.trim()) return { error: `${arg} needs a value` };
      i += 1;
      if (arg !== '--threshold') out[valued[arg]] = value;
      else {
        const number = Number(value);
        if (!Number.isFinite(number) || number <= 0 || number > 1) return { error: '--threshold needs a number in (0, 1]' };
        out.threshold = number;
      }
    } else return { error: `unknown argument: ${arg}` };
  }
  return out;
}
function frontmatter(text) {
  const end = text.startsWith('---\n') ? text.indexOf('\n---', 3) : -1;
  if (end < 0) return { data: {}, body: text };
  const data = {};
  for (const line of text.slice(4, end).split('\n')) {
    const match = /^([A-Za-z_-]+):\s*(.*)$/.exec(line);
    if (match && !(match[1] in data)) data[match[1].toLowerCase()] = match[2].trim().replace(/^["']|["']$/g, '');
  }
  return { data, body: text.slice(end + 4).replace(/^\n/, '') };
}
const plain = (block) => block.split('\n').filter((line) => !/^\s*(#|>|\|)/.test(line)).map((line) => line.replace(/^\s*(?:[-*+]|\d+\.)\s+/, '')).join(' ');
function firstParagraph(body) {
  const block = body.split(/\n\s*\n/).map((part) => part.trim()).find((part) => part && !part.startsWith('#'));
  return block ? plain(block) : '';
}
function sectionText(body, kind) {
  const lines = body.split('\n');
  const start = kind === 'command' ? -1 : lines.findIndex((line) => SECTION.test(line));
  if (start < 0) return '';
  const out = [];
  for (const line of lines.slice(start + 1)) {
    if (/^#{1,6}\s/.test(line)) break;
    if (!line.trim()) { if (out.length) break; continue; }
    out.push(line);
  }
  return plain(out.join('\n'));
}
function tokenize(text) {
  return text.toLowerCase().replace(/[^a-z0-9.]+/g, ' ').split(' ')
    .map((token) => token.replace(/^\.+|\.+$/g, ''))
    .filter((token) => token.length > 1 && !STOP.has(token));
}
function kindOf(rel) {
  const hit = rel.toLowerCase().split('/').slice(0, -1).reverse().find((part) => KINDS[part]);
  return hit ? KINDS[hit] : 'part';
}
const slug = (name) => name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
function declaredId(data, body, stem, kind) {
  if (data.id && /^[A-Za-z]{1,4}\d+(?:\.\d+)?$/.test(data.id)) return data.id.toUpperCase();
  const own = /^([A-Za-z]{1,4}\d+(?:\.\d+)?)(?:[-_.]|$)/.exec(stem);
  const prefix = { skill: 'S', crew: 'C', agent: 'A' }[kind];
  const inline = prefix && new RegExp(`^${prefix}\\d{1,3}(?:\\.\\d+)?(?::|\\s)`).exec(firstParagraph(body));
  return (own && own[1].toUpperCase()) || (inline ? inline[0].replace(/\s*:$/, '').trim() : '');
}
function headingOf(body) {
  const line = (body.split('\n').find((row) => /^#\s+\S/.test(row)) || '').replace(/^#\s+/, '');
  return line.replace(/^[A-Za-z]{1,4}\d+(?:\.\d+)?\s*[-\u2013\u2014:]\s*/, '');
}
function loadPart(file, root) {
  const { data, body } = frontmatter(readText(file));
  const stem = basename(file, '.md');
  const kind = kindOf(posix(relative(root, file)));
  const fallback = /^SKILL$/i.test(stem) ? basename(dirname(file)) : stem;
  const name = (data.name || headingOf(body) || fallback).trim();
  const id = declaredId(data, body, stem, kind) || slug(name);
  const terms = new Map();
  for (const token of tokenize(`${data.description || firstParagraph(body)} ${sectionText(body, kind)}`)) terms.set(token, (terms.get(token) || 0) + 1);
  for (const token of tokenize(`${id} ${name}`)) terms.set(token, (terms.get(token) || 0) + 3);
  return { id, key: id.toLowerCase(), name, kind, stem, terms, weights: new Map(),
    file: posix(relative(root, file)), parent: /^SKILL\.md$/i.test(file) ? basename(dirname(file)) : '' };
}

function discover(root) {
  const files = [];
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const full = join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile() && /\.md$/i.test(entry.name) && entry.name.toLowerCase() !== 'readme.md') files.push(full);
    }
  };
  for (const name of ['library', '.opencode']) if (isDir(join(root, name))) walk(join(root, name));
  return files;
}
function buildModel(parts) {
  const df = new Map();
  for (const part of parts) for (const term of part.terms.keys()) df.set(term, (df.get(term) || 0) + 1);
  const weight = (term, count) => (1 + Math.log(count)) * (Math.log(1 + parts.length / ((df.get(term) || 0) + 1)) + 1);
  for (const part of parts) for (const [term, count] of part.terms) part.weights.set(term, weight(term, count));
  const aliases = new Map();
  for (const part of parts) for (const key of new Set([part.id, part.stem, part.name, part.parent, slug(part.name)])) {
    const norm = (key || '').trim().toLowerCase();
    if (norm && !(aliases.get(norm) || []).includes(part.id)) aliases.set(norm, [...(aliases.get(norm) || []), part.id]);
  }
  return { n: parts.length, weight, aliases, ids: new Set(parts.map((part) => part.key).filter((key) => ID_LIKE.test(key))) };
}
function score(part, prompt, model) {
  const tokens = tokenize(prompt);
  const ids = new Set(tokens.filter((token) => ID_LIKE.test(token) && model.ids.has(token)));
  if (ids.has(part.key)) return 1;
  const counts = new Map();
  for (const token of tokens) if (!ids.has(token)) counts.set(token, (counts.get(token) || 0) + 1);
  let total = 0, matched = 0;
  for (const [term, count] of counts) {
    const weight = model.weight(term, count);
    total += weight;
    if (part.weights.has(term)) matched += weight;
  }
  return total ? Math.round((matched / total) * 1000) / 1000 : 0;
}
function resolveRefs(value, where, aliases) {
  if (value === undefined) return { ids: [] };
  if (!Array.isArray(value)) return { error: `${where} must be an array of part IDs or names` };
  const ids = [];
  for (const item of value) {
    const list = typeof item === 'string' ? aliases.get(item.trim().toLowerCase()) || [] : [];
    if (list.length !== 1) return { error: list.length ? `${where}: ambiguous part "${item}"` : `${where}: unknown part "${item}"` };
    if (!ids.includes(list[0])) ids.push(list[0]);
  }
  return { ids };
}
function loadFixtures(file, aliases) {
  if (!existsSync(file)) return { error: `fixtures not found: ${file} (expected evals/trigger-fixtures.json)` };
  let data;
  try { data = JSON.parse(readText(file)); } catch (error) { return { error: `fixtures: ${error.message}` }; }
  const list = Array.isArray(data) ? data : data && data.cases;
  if (!Array.isArray(list) || !list.length) return { error: 'fixtures: expected a non-empty cases array' };
  const cases = [];
  for (const [index, entry] of list.entries()) {
    const where = `cases[${index}]`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) return { error: `${where} must be an object` };
    const id = typeof entry.id === 'string' ? entry.id.trim() : '';
    if (!id) return { error: `${where}.id must be a non-empty string` };
    if (typeof entry.prompt !== 'string' || !entry.prompt.trim()) return { error: `case ${id}: prompt must be a non-empty string` };
    const expect = resolveRefs(entry.expect, `case ${id}.expect`, aliases);
    if (expect.error) return expect;
    const forbid = resolveRefs(entry.forbid, `case ${id}.forbid`, aliases);
    if (forbid.error) return forbid;
    const overlap = expect.ids.filter((part) => forbid.ids.includes(part));
    if (overlap.length) return { error: `case ${id}: expect and forbid overlap: ${overlap.join(', ')}` };
    cases.push({ id, prompt: entry.prompt.trim(), expect: expect.ids, forbid: forbid.ids });
  }
  return { cases };
}
function runCase(entry, parts, model, threshold) {
  const matched = parts.map((part) => ({ id: part.id, score: score(part, entry.prompt, model) }))
    .filter((item) => item.score >= threshold).sort((a, b) => b.score - a.score || (a.id > b.id) - (a.id < b.id));
  const ids = matched.map((item) => item.id), expect = new Set(entry.expect);
  const falsePositive = ids.filter((id) => !expect.has(id)), falseNegative = entry.expect.filter((id) => !ids.includes(id));
  return { ...entry, matched, falsePositive, falseNegative, forbidden: ids.filter((id) => entry.forbid.includes(id)),
    ok: !falsePositive.length && !falseNegative.length };
}
function render(report, fixtures) {
  const out = [`gamefirst trigger-check  ${report.root}`, `fixtures ${fixtures} | parts ${report.parts.length} | threshold ${report.threshold}`, ''];
  for (const item of report.cases) {
    const extra = item.falsePositive.filter((id) => !item.forbidden.includes(id));
    const notes = [item.falseNegative.length && `missing ${item.falseNegative.join(',')}`, item.forbidden.length && `forbidden ${item.forbidden.join(',')}`, extra.length && `extra ${extra.join(',')}`].filter(Boolean);
    const shown = item.matched.map((entry) => entry.id).join(',') || 'none';
    out.push(`${item.ok ? 'ok  ' : 'FAIL'}  ${item.id}  matched ${shown}${notes.length ? ` | ${notes.join('; ')}` : ''}`);
  }
  const { total, pass, fail, falsePositive, falseNegative } = report.summary;
  out.push('', `${total} cases: ${pass} pass, ${fail} fail | false positives ${falsePositive} | false negatives ${falseNegative}`);
  return out.join('\n');
}

function main(argv) {
  const args = parseArgs(argv);
  if (args.error) return fail(`${args.error}\nTry --help.`);
  if (args.help) { console.log(USAGE.trimEnd()); return 0; }
  const root = resolve(args.root);
  if (!isDir(root)) return fail(`root not found: ${root}`);
  const parts = discover(root).map((file) => loadPart(file, root));
  if (!parts.length) return fail(`no library parts under ${root} (expected library/ or .opencode/)`);
  parts.sort((a, b) => (a.id > b.id) - (a.id < b.id));
  const duplicate = parts.find((part, index) => index > 0 && parts[index - 1].id === part.id);
  if (duplicate) return fail(`duplicate part id: ${duplicate.id}`);
  const model = buildModel(parts);
  const file = args.fixtures ? resolve(args.fixtures) : join(root, 'evals', 'trigger-fixtures.json');
  const fixtures = loadFixtures(file, model.aliases);
  if (fixtures.error) return fail(fixtures.error);
  const cases = fixtures.cases.map((entry) => runCase(entry, parts, model, args.threshold));
  const sum = (key) => cases.reduce((count, item) => count + item[key].length, 0);
  const summary = { total: cases.length, pass: cases.filter((item) => item.ok).length,
    fail: cases.filter((item) => !item.ok).length, falsePositive: sum('falsePositive'), falseNegative: sum('falseNegative') };
  const report = { schema: 1, ok: summary.fail === 0, root: posix(root), fixtures: posix(file), threshold: args.threshold,
    parts: parts.map((part) => ({ id: part.id, name: part.name, kind: part.kind, file: part.file })), cases, summary };
  const shown = file.startsWith(root) ? posix(relative(root, file)) : posix(file);
  console.log(args.json ? JSON.stringify(report) : render(report, shown));
  return summary.fail === 0 ? 0 : 1;
}
try { process.exitCode = main(process.argv.slice(2)); } catch (error) {
  console.error(`trigger-check: unexpected error: ${error.message}`);
  process.exitCode = 2;
}
