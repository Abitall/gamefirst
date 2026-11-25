#!/usr/bin/env node
// new-project.mjs - create a gamefirst game repository from the template and packs.
// Usage: node tools/new-project.mjs <target-dir> --name "Game Name" [--host opencode|codex|claude] [--packs core,game] [--git]

import { existsSync, lstatSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, renameSync, rmdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { basename, dirname, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const SEMVER = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/;
const GAME_VERSION = '0.1.0';
const IMPLEMENTED_PACKS = ['core', 'game'];
const RESERVED_PACKS = ['release', 'obsidian', 'art', 'audio', 'narrative', 'localization', 'marketing'];
const HERE = dirname(fileURLToPath(import.meta.url));
const KIND_ORDER = { rule: 0, agent: 1, skill: 2, crew: 3, gate: 4, eval: 5 };
const HOSTS = {
  opencode: {
    id: 'opencode', label: 'OpenCode', parts: '.opencode',
    rules: '.opencode/rules', skills: '.opencode/skills', agents: '.opencode/agents',
    crews: '.opencode/crews', gates: '.opencode/gates', commands: '.opencode/commands',
  },
  codex: {
    id: 'codex', label: 'Codex', parts: '.agents',
    rules: '.agents/rules', skills: '.agents/skills', agents: '.agents/roles',
    crews: '.agents/crews', gates: '.agents/gates', commands: '.agents/skills',
  },
  claude: {
    id: 'claude', label: 'Claude Code', parts: '.claude',
    rules: '.claude/rules', skills: '.claude/skills', agents: '.claude/agents',
    crews: '.claude/crews', gates: '.claude/gates', commands: '.claude/commands',
  },
};

class CliError extends Error {
  constructor(message, code = 1, hint = '') { super(message); this.code = code; this.hint = hint; }
}

function fail(message, code = 1, hint = '') { throw new CliError(message, code, hint); }

function usage() {
  console.log(`new-project - create a gamefirst game repository
Usage: node tools/new-project.mjs <target-dir> --name "Game Name" [options]
Options:
  --name <text>    game name; required, 1-80 chars, no control characters
  --host <name>    opencode (default), codex, or claude
  --packs <list>   comma-separated; default core,game (core is always installed)
  --git            run "git init" after writing (off by default)
  -h, --help       show this help
The target must not exist or must be empty. Nothing is overwritten.
Exit codes: 0 success, 1 failure, 2 usage error.`);
}

function parseArgs(argv) {
  const out = { packs: 'core,game', host: 'opencode', git: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === '--help' || arg === '-h') out.help = true;
    else if (arg === '--git') out.git = true;
    else if (arg === '--name' || arg === '--packs' || arg === '--host') {
      const value = argv[++i];
      if (value === undefined || value.startsWith('--')) fail(`${arg} needs a value`, 2, 'run with --help');
      out[arg.slice(2)] = value;
    } else if (arg.startsWith('--name=')) out.name = arg.slice(7);
    else if (arg.startsWith('--packs=')) out.packs = arg.slice(8);
    else if (arg.startsWith('--host=')) out.host = arg.slice(7);
    else if (arg.startsWith('-')) fail(`unknown option: ${arg}`, 2, 'run with --help');
    else if (out.target) fail(`unexpected argument: ${arg}`, 2);
    else out.target = arg;
  }
  return out;
}

function readHost(raw) {
  const id = String(raw ?? 'opencode').trim().toLowerCase();
  const host = HOSTS[id];
  if (!host) fail(`unknown host "${raw}"`, 2, `available hosts: ${Object.keys(HOSTS).join(', ')}`);
  return host;
}

function readName(raw) {
  const name = String(raw ?? '').trim();
  if (!name) fail('--name is required', 2, 'example: --name "My Game"');
  if (name.length > 80) fail('--name is longer than 80 characters', 2);
  if (/[\u0000-\u001f\u007f]/.test(name)) fail('--name contains a control character', 2);
  if (name.includes('{{') || name.includes('}}')) fail('--name contains a template marker', 2);
  return name;
}

function readPacks(raw) {
  const requested = String(raw).split(',').map((p) => p.trim().toLowerCase()).filter(Boolean);
  if (!requested.length) fail('--packs needs at least one pack name', 2);
  const packs = ['core', ...requested.filter((p) => p !== 'core')];
  for (const pack of packs) {
    if (RESERVED_PACKS.includes(pack)) fail(`pack "${pack}" is declared in the blueprint but not implemented in v0.3`, 2, `available packs: ${IMPLEMENTED_PACKS.join(', ')}`);
    if (!IMPLEMENTED_PACKS.includes(pack)) fail(`unknown pack "${pack}"`, 2, `available packs: ${IMPLEMENTED_PACKS.join(', ')}`);
  }
  return [...new Set(packs)];
}

function isDir(path) { try { return statSync(path).isDirectory(); } catch { return false; } }

function findRoot() {
  let dir = HERE;
  for (;;) {
    if (isDir(join(dir, 'template')) && isDir(join(dir, 'library')) && existsSync(join(dir, 'docs', 'V0.3-BLUEPRINT.md'))) return dir;
    const parent = dirname(dir);
    if (parent === dir) fail('cannot find the gamefirst root (template/, library/, docs/V0.3-BLUEPRINT.md)', 1, 'run this tool from a gamefirst checkout');
    dir = parent;
  }
}

function readCoreVersion(root) {
  const path = join(root, 'VERSION');
  if (!existsSync(path)) fail(`missing ${path}`, 1);
  const version = readFileSync(path, 'utf8').trim();
  if (!SEMVER.test(version)) fail(`invalid semver in ${path}: "${version}"`, 1);
  return version;
}

function blueprintIds(root) {
  const text = readFileSync(join(root, 'docs', 'V0.3-BLUEPRINT.md'), 'utf8');
  return new Map([...text.matchAll(/^\|\s*([ASC]\d{1,2}(?:\.\d+)?)\s*\|\s*([a-z0-9-]+)\s*\|/gm)].map((m) => [m[2], m[1]]));
}

function inside(child, parent) {
  const rel = relative(parent, child);
  return rel === '' || (!rel.startsWith(`..${sep}`) && rel !== '..' && !isAbsolute(rel));
}

function checkTarget(target, root) {
  if (target === root) fail('target must not be the gamefirst root', 1);
  if (inside(target, join(root, 'template')) || inside(target, join(root, 'library'))) fail('target must not be inside template/ or library/', 1);
  if (!existsSync(target)) return;
  if (!isDir(target)) fail(`target exists and is not a directory: ${target}`, 1);
  const entries = readdirSync(target);
  if (entries.length) fail(`target is not empty: ${target}`, 1, `found ${entries.length} entr${entries.length === 1 ? 'y' : 'ies'}; choose a new or empty directory`);
}

function copyTree(src, dest, ctx, skip = null, rel = '') {
  if (skip && skip(rel)) return;
  const stat = lstatSync(src);
  if (stat.isSymbolicLink()) fail(`refusing to copy symlink: ${src}`, 1);
  if (stat.isDirectory()) {
    mkdirSync(dest, { recursive: true });
    for (const entry of readdirSync(src)) {
      copyTree(join(src, entry), join(dest, entry), ctx, skip, rel ? `${rel}/${entry}` : entry);
    }
    return;
  }
  if (!stat.isFile()) fail(`unsupported file type: ${src}`, 1);
  if (existsSync(dest)) fail(`refusing to overwrite: ${dest}`, 1);
  const bytes = readFileSync(src);
  if (bytes.indexOf(0) !== -1) { writeFileSync(dest, bytes); return; }
  let text = bytes.toString('utf8');
  for (const [marker, value] of Object.entries(ctx.vars)) text = text.split(marker).join(value);
  if (text.includes('{{')) fail(`unreplaced template marker in ${src}`, 1);
  writeFileSync(dest, text, 'utf8');
}

function partId(kind, fileName, ids) {
  const prefix = { rule: 'R', eval: 'E', gate: 'G' }[kind];
  if (prefix) {
    const match = new RegExp(`^(${prefix}\\d+(?:\\.\\d+)?)-`).exec(fileName);
    if (!match) fail(`${kind} file has no ${prefix}-id: ${fileName}`, 1);
    return match[1];
  }
  const stem = fileName.replace(/\.md$/, '');
  if (kind === 'crew') return ids.get(stem) ?? fail(`crew file has no blueprint id: ${fileName}`, 1);
  return ids.get(stem) ?? stem;
}

function addFlat(srcDir, destDir, kind, ctx) {
  if (!isDir(srcDir)) fail(`missing library directory: ${srcDir}`, 1);
  mkdirSync(destDir, { recursive: true });
  for (const fileName of readdirSync(srcDir).sort()) {
    if (!fileName.endsWith('.md')) continue;
    const id = partId(kind, fileName, ctx.ids);
    if (ctx.seen.has(id)) fail(`duplicate part id "${id}"`, 1);
    ctx.seen.add(id);
    const dest = join(destDir, fileName);
    copyTree(join(srcDir, fileName), dest, ctx);
    ctx.parts.push({ id, kind, path: relative(ctx.build, dest).split(sep).join('/'), version: ctx.version });
  }
}

function addSkill(srcDir, destRoot, ctx) {
  const skill = basename(srcDir);
  const id = ctx.ids.get(skill) ?? skill;
  if (ctx.seen.has(id)) fail(`duplicate part id "${id}"`, 1);
  ctx.seen.add(id);
  const dest = join(destRoot, skill);
  copyTree(srcDir, dest, ctx);
  const skillFile = join(dest, 'SKILL.md');
  if (!existsSync(skillFile)) fail(`skill has no SKILL.md: ${srcDir}`, 1);
  ctx.parts.push({ id, kind: 'skill', path: relative(ctx.build, skillFile).split(sep).join('/'), version: ctx.version });
}

function addSkills(srcDir, destRoot, ctx) {
  if (!isDir(srcDir)) fail(`missing skill directory: ${srcDir}`, 1);
  for (const skill of readdirSync(srcDir).sort()) if (isDir(join(srcDir, skill))) addSkill(join(srcDir, skill), destRoot, ctx);
}

function installPack(pack, ctx) {
  const base = join(ctx.root, 'library', pack);
  if (!isDir(base)) fail(`missing pack directory: ${base}`, 1);
  if (pack === 'core') {
    addFlat(join(base, 'rules'), join(ctx.build, ctx.host.rules), 'rule', ctx);
    addFlat(join(base, 'agents'), join(ctx.build, ctx.host.agents), 'agent', ctx);
    addSkills(join(base, 'skills'), join(ctx.build, ctx.host.skills), ctx);
    addFlat(join(base, 'evals'), join(ctx.build, 'evals'), 'eval', ctx);
  } else {
    addSkills(join(base, 'skills'), join(ctx.build, ctx.host.skills), ctx);
    addFlat(join(base, 'crews'), join(ctx.build, ctx.host.crews), 'crew', ctx);
    addFlat(join(base, 'gates'), join(ctx.build, ctx.host.gates), 'gate', ctx);
  }
}

function hostVars(host, name) {
  return {
    '{{GAME_NAME}}': name,
    '{{HOST_NAME}}': host.label,
    '{{HOST_PARTS_DIR}}': host.parts,
    '{{HOST_RULES_DIR}}': host.rules,
    '{{HOST_SKILLS_DIR}}': host.skills,
    '{{HOST_AGENTS_DIR}}': host.agents,
    '{{HOST_COMMANDS_DIR}}': host.commands,
  };
}

function installHost(ctx) {
  if (ctx.host.id === 'claude') {
    copyTree(join(ctx.root, 'hosts', 'claude', 'CLAUDE.md'), join(ctx.build, 'CLAUDE.md'), ctx);
    mkdirSync(join(ctx.build, '.claude'), { recursive: true });
    copyTree(join(ctx.root, 'hosts', 'claude', 'settings.json'), join(ctx.build, '.claude', 'settings.json'), ctx);
  }
  if (ctx.host.id === 'codex') {
    mkdirSync(join(ctx.build, '.agents'), { recursive: true });
    copyTree(join(ctx.root, 'hosts', 'codex', 'README.md'), join(ctx.build, '.agents', 'README.md'), ctx);
  }
}

function readCommand(file) {
  const name = basename(file, '.md');
  const text = readFileSync(file, 'utf8');
  const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
  const front = match ? match[1] : '';
  const body = (match ? match[2] : text).trim();
  const line = /^description:\s*(.+)$/m.exec(front);
  return { name, description: line ? line[1].trim() : `Run the ${name} command`, body };
}

function installCommands(ctx) {
  if (ctx.host.id === 'opencode') return;
  const src = join(ctx.root, 'template', '.opencode', 'commands');
  if (!isDir(src)) fail(`missing command directory: ${src}`, 1);
  const commands = readdirSync(src).filter((name) => name.endsWith('.md')).sort();
  if (ctx.host.id === 'claude') {
    const dest = join(ctx.build, '.claude', 'commands');
    mkdirSync(dest, { recursive: true });
    for (const file of commands) {
      const command = readCommand(join(src, file));
      const text = `---\ndescription: ${JSON.stringify(command.description)}\n---\n\n${command.body}\n`;
      writeFileSync(join(dest, file), text, 'utf8');
    }
  }
  if (ctx.host.id === 'codex') {
    const destRoot = join(ctx.build, ctx.host.skills);
    for (const file of commands) {
      const command = readCommand(join(src, file));
      if (ctx.seen.has(command.name)) fail(`duplicate part id "${command.name}"`, 1);
      ctx.seen.add(command.name);
      const dest = join(destRoot, command.name);
      mkdirSync(dest, { recursive: true });
      const text = `---\nname: ${command.name}\ndescription: ${JSON.stringify(command.description)}\n---\n\n${command.body}\n`;
      writeFileSync(join(dest, 'SKILL.md'), text, 'utf8');
      ctx.parts.push({ id: command.name, kind: 'skill', path: relative(ctx.build, join(dest, 'SKILL.md')).split(sep).join('/'), version: ctx.version });
    }
  }
}

function installClaudeAgents(ctx) {
  if (ctx.host.id !== 'claude') return;
  const dir = join(ctx.build, '.claude', 'agents');
  if (!isDir(dir)) return;
  const tools = { critic: 'Read, Glob, Grep', designer: 'Read, Glob, Grep, Edit, Write', engineer: 'Read, Glob, Grep, Edit, Write, Bash', partner: 'Read, Glob, Grep, Edit, Write, Bash' };
  for (const file of readdirSync(dir).filter((name) => name.endsWith('.md')).sort()) {
    const name = basename(file, '.md');
    const text = readFileSync(join(dir, file), 'utf8');
    const match = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/.exec(text);
    if (!match) fail(`agent has no frontmatter: ${file}`, 1);
    const desc = /^description:\s*(.+)$/m.exec(match[1]);
    if (!desc) fail(`agent has no description: ${file}`, 1);
    const body = match[2].trim();
    const out = `---\nname: ${name}\ndescription: ${JSON.stringify(desc[1].trim())}\ntools: ${tools[name] ?? 'Read, Glob, Grep'}\n---\n\n${body}\n`;
    writeFileSync(join(dir, file), out, 'utf8');
  }
}

function writeJson(path, data) { writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`, 'utf8'); }

function writeManifests(ctx) {
  writeJson(join(ctx.build, 'project.config.json'), {
    name: ctx.name, host: ctx.host.id, engine: null, packs: {}, verify: { recipe: [] }, budgets: {}, default_agent: 'partner',
  });
  writeJson(join(ctx.build, 'agent.lock.json'), {
    version: GAME_VERSION, host: ctx.host.id, core: ctx.version, parts: ctx.parts, created: new Date().toISOString(),
  });
}
function initGit(target) {
  const result = spawnSync('git', ['init'], { cwd: target, encoding: 'utf8' });
  if (result.error || result.status !== 0) {
    const detail = result.error ? result.error.message : (result.stderr || '').trim();
    console.error(`new-project: warning: git init failed: ${detail}`);
    console.error(`new-project: project exists at ${target}; run "git init" there manually.`);
    process.exitCode = 1;
    return;
  }
  console.log('git: initialized');
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) { usage(); return; }
  if (!args.target) fail('missing <target-dir>', 2, 'usage: node tools/new-project.mjs <target-dir> --name "Game Name"');
  const name = readName(args.name);
  const host = readHost(args.host);
  const packs = readPacks(args.packs);
  const root = findRoot();
  const version = readCoreVersion(root);
  const target = resolve(args.target);
  checkTarget(target, root);
  mkdirSync(dirname(target), { recursive: true });
  const build = mkdtempSync(join(dirname(target), '.gamefirst-tmp-'));
  const ctx = { root, build, name, version, host, vars: hostVars(host, name), ids: blueprintIds(root), parts: [], seen: new Set() };
  const skipTemplate = (rel) => ctx.host.id !== 'opencode' && (rel === '.opencode' || rel.startsWith('.opencode/') || rel === 'opencode.json');
  try {
    copyTree(join(root, 'template'), build, ctx, skipTemplate);
    installHost(ctx);
    mkdirSync(join(build, 'tools'), { recursive: true });
    for (const tool of ['verify.mjs', 'status.mjs']) copyTree(join(root, 'tools', tool), join(build, 'tools', tool), ctx);
    for (const pack of packs) installPack(pack, ctx);
    installCommands(ctx);
    installClaudeAgents(ctx);
    if (existsSync(join(root, 'evals', 'trigger-fixtures.json'))) {
      mkdirSync(join(build, 'evals'), { recursive: true });
      copyTree(join(root, 'evals', 'trigger-fixtures.json'), join(build, 'evals', 'trigger-fixtures.json'), ctx);
    }
    ctx.parts.sort((a, b) => KIND_ORDER[a.kind] - KIND_ORDER[b.kind] || a.id.localeCompare(b.id, 'en', { numeric: true }));
    writeManifests(ctx);
    if (existsSync(target)) rmdirSync(target);
    renameSync(build, target);
  } catch (error) {
    rmSync(build, { recursive: true, force: true });
    throw error;
  }
  console.log(`created ${target}`);
  console.log(`  host ${host.id}; core ${version}; packs: ${packs.join(', ')}; parts: ${ctx.parts.length}; crews: ${ctx.parts.filter((p) => p.kind === 'crew').length}; gates: ${ctx.parts.filter((p) => p.kind === 'gate').length}`);
  if (args.git) initGit(target);
}

try {
  main();
} catch (error) {
  if (error instanceof CliError) {
    console.error(`new-project: ${error.message}`);
    if (error.hint) console.error(`new-project: ${error.hint}`);
    process.exit(error.code);
  }
  console.error(`new-project: unexpected error: ${error.stack || error.message}`);
  process.exit(1);
}
