# SL04 - report

## Summary

`/verify` is a one-screen OpenCode command that turns one claim into a PASS or FAIL with an artifact. It reads the claim from `$ARGUMENTS`, runs the accepted runner `node tools/verify.mjs --claim "<claim>"` (CLI03) or the project's documented verify command, reads the printed `evidence/<date>-<claim>/` folder and its `REPORT.md`, and prints claim, result, command, exit, artifact, and next. PASS requires exit 0, every required check passed, and a non-empty artifact (R1). On FAIL it says `not done`, names the failing check, command, and exit code, and gives the smallest next action that supplies the missing input. It never fixes the code, edits, weakens, skips, or rewrites a check, test, or runner, re-runs until green, or reports a pass from memory. S02 owns the method, CLI03 the runner, E03 scores the behavior.

The artifact ships from `staging/SL04/artifact/template/.opencode/commands/verify.md`. The target `template/.opencode/commands/verify.md` is not written yet; on `accept` the file is copied byte-for-byte, so the staging copy is the review artifact.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters | 1,180 | - | - |
| Estimated tokens (characters / 4) | 295.00 | 300 (brief) | 5.00 (1.7%) |
| Tokens vs rubric | 295.00 | 400 | 105.00 (26.3%) |
| Lines | 28 | - | - |
| Bytes | 1,180 | - | - |

Encoding: UTF-8, no BOM, 0 CR, LF line endings, trailing newline. The artifact is pure ASCII, so characters and bytes are equal; there are no em dashes, no non-ASCII prose, no `{{` placeholders, and no backslashes (all paths are POSIX).

Named cut: if 300 became a hard limit after review, drop the `claim` line from the output block and the "Never invent one or drop evidence" clause, saving about 70 characters (17.5 tokens). Not needed at 295.00.

## Check

One check was run on 2026-11-25 from the repository root (`C:\Phaser Projects\gamefirst`) with Node v26.13.0. It validates the staging file; the target does not exist yet, so there is no mirror hash to compare.

```text
$ node C:\Users\Chirv\AppData\Local\Temp\opencode\sl04-check.mjs
{"ok":true,"file":"staging/SL04/artifact/template/.opencode/commands/verify.md","chars":1180,"bytes":1180,"tokens":295,"lines":28,"frontmatter":{"description":"Verify one claim and report PASS or FAIL with its evidence","agent":"partner","subtask":"false"},"labels":["claim","result","command","exit","artifact","next"],"usedIds":["CLI03","E03","R1","R5","S02"],"mappedIds":["R1","R5","S02","CLI03","E03","SL04"],"placeholder":false,"bom":false,"crlf":0,"nonAscii":0}
```

What it asserts:

- Frontmatter parses as exactly three scalar keys in order (`description`, `agent`, `subtask`); `description` is non-empty; `agent` is `partner`; `subtask` is `false`.
- No `{{` placeholder, no backslash, no BOM, no CR, trailing newline present, 0 non-ASCII characters.
- The six output labels (`claim`, `result`, `command`, `exit`, `artifact`, `next`) appear once each at the start of a line, in that order.
- Required behaviour strings exist: `node tools/verify.mjs --claim`, `evidence/<date>-<claim>/`, `REPORT.md`, `no claim`, `no verify runner`, `not done`, `probably works`, `Never fix the code`, `weaken`, `skip`, `rewrite`, `exit 0`, `non-empty artifact`.
- No duplication of CLI03 mechanics or S02 method: the denylist `verify.recipe`, `project.config.json`, `--no-evidence`, `--json`, `--timeout`, `check-NN`, `commands.log`, `visual capture`, `playtest` is absent.
- IDs used are exactly R1, R5, S02, CLI03, E03; each resolves (rule files, `tools/verify.mjs`, staging artifacts), and the SL04 row resolves in `docs/BUILD-PLAN.md`.
- Size is at most 300 tokens and at most 40 lines.

Scalars are read as text because no YAML library is installed; `subtask` is the literal `false`, which YAML parses as a boolean. The check proves the file's shape, strings, and references, not that a model will obey the prompt at runtime.

The check script is not shipped. It is reproduced below so a reviewer can run it from the repository root.

```js
import { readFileSync, existsSync } from 'node:fs';

const root = process.cwd();
const path = 'staging/SL04/artifact/template/.opencode/commands/verify.md';
const src = readFileSync(`${root}/${path}`, 'utf8');
const errors = [];

// frontmatter: exactly three scalar keys, in order
const fmMatch = /^---\n([\s\S]*?)\n---\n/.exec(src);
if (!fmMatch) errors.push('frontmatter: missing or not closed');
const fm = {};
if (fmMatch) {
  for (const line of fmMatch[1].split('\n')) {
    const kv = /^([a-z]+): (.+)$/.exec(line);
    if (!kv) { errors.push(`frontmatter: not a scalar key line: ${JSON.stringify(line)}`); continue; }
    if (kv[1] in fm) errors.push(`frontmatter: duplicate key: ${kv[1]}`);
    fm[kv[1]] = kv[2];
  }
}
const keys = Object.keys(fm).join(',');
if (keys !== 'description,agent,subtask') errors.push(`frontmatter keys: ${keys || '(none)'}`);
if (!fm.description) errors.push('frontmatter: description is empty');
if (fm.agent !== 'partner') errors.push(`frontmatter: agent is ${fm.agent || '(missing)'}, expected partner`);
if (fm.subtask !== 'false') errors.push(`frontmatter: subtask is ${fm.subtask || '(missing)'}, expected false`);
if (src.includes('{{')) errors.push('found a {{ placeholder');
if (src.includes('\\')) errors.push('found a backslash; POSIX paths only');

// one screen: six fixed output labels, once each, in order
const labels = ['claim', 'result', 'command', 'exit', 'artifact', 'next'];
const positions = labels.map((label) => src.search(new RegExp(`^${label}\\b`, 'm')));
labels.forEach((label, i) => {
  const count = (src.match(new RegExp(`^${label}\\b`, 'gm')) || []).length;
  if (count !== 1) errors.push(`label ${label}: appears ${count} times, expected 1`);
  if (positions[i] < 0) errors.push(`label ${label}: missing`);
});
if (positions.some((p, i) => i > 0 && p < positions[i - 1])) errors.push('labels are out of order');

// required behaviour strings
const required = [
  'node tools/verify.mjs --claim',
  'evidence/<date>-<claim>/',
  'REPORT.md',
  'no claim',
  'no verify runner',
  'not done',
  'probably works',
  'Never fix the code',
  'weaken',
  'skip',
  'rewrite',
  'exit 0',
  'non-empty artifact',
];
for (const s of required) if (!src.includes(s)) errors.push(`missing required text: ${s}`);

// no duplication of CLI03 mechanics or S02 method
const denied = ['verify.recipe', 'project.config.json', '--no-evidence', '--json', '--timeout', 'check-NN', 'commands.log', 'visual capture', 'playtest'];
for (const s of denied) if (src.includes(s)) errors.push(`duplicates another part: ${s}`);

// IDs resolve
const hasFile = (p) => existsSync(`${root}/${p}`);
const plan = readFileSync(`${root}/docs/BUILD-PLAN.md`, 'utf8');
const hasRow = (id, statuses) => new RegExp(`^\\| \\d+ \\| ${id} \\|.*\\| (${statuses}) \\|$`, 'm').test(plan);
const ids = {
  R1: hasFile('library/core/rules/R1-build-is-truth.md'),
  R5: hasFile('library/core/rules/R5-code-before-docs.md'),
  S02: hasFile('staging/S02/artifact/library/core/skills/verify/SKILL.md'),
  CLI03: hasFile('tools/verify.mjs'),
  E03: hasFile('staging/E03/artifact/library/core/evals/E03-verify-before-done.md'),
  SL04: hasRow('SL04', 'pending|accepted|assembled|running'),
};
for (const [id, ok] of Object.entries(ids)) if (!ok) errors.push(`ID does not resolve: ${id}`);
const used = [...new Set([...src.matchAll(/\b(R\d{1,2}|S\d{2}|CLI\d{2}|E\d{2}|SL\d{2})\b/g)].map((m) => m[1]))].sort();
const expectedIds = ['CLI03', 'E03', 'R1', 'R5', 'S02'].sort();
if (used.join(',') !== expectedIds.join(',')) errors.push(`IDs used: ${used.join(', ') || '(none)'}, expected ${expectedIds.join(', ')}`);

// size, encoding, format
const chars = [...src].length;
const tokens = chars / 4;
if (tokens > 300) errors.push(`over 300 tokens: ${tokens}`);
const lines = src.trimEnd().split('\n');
if (lines.length > 40) errors.push(`too many lines for one screen: ${lines.length}`);
if (src.charCodeAt(0) === 0xfeff) errors.push('UTF-8 BOM found');
if (src.includes('\r')) errors.push('CR found; LF required');
if (!src.endsWith('\n')) errors.push('no trailing newline');
const nonAscii = [...src].filter((c) => c.charCodeAt(0) > 127).length;
if (nonAscii) errors.push(`non-ASCII characters: ${nonAscii}`);

if (errors.length) {
  console.error(`FAIL (${errors.length})`);
  errors.forEach((e) => console.error(`- ${e}`));
  process.exit(1);
}
console.log(
  JSON.stringify({
    ok: true,
    file: path,
    chars,
    bytes: Buffer.byteLength(src, 'utf8'),
    tokens: Math.round(tokens * 100) / 100,
    lines: lines.length,
    frontmatter: fm,
    labels,
    usedIds: used,
    mappedIds: Object.keys(ids),
    placeholder: false,
    bom: false,
    crlf: 0,
    nonAscii,
  }),
);
```

## Rubric self-check

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | Every unit in `JUSTIFICATION.md` names why it exists and what breaks without it; the command is the trigger for S02/CLI03 and is not a copy of either. The check's denylist proves the method and the runner mechanics are absent. |
| 2 | Function | PASS | Trigger `/verify <claim>`; input the claim plus the printed evidence folder; output six fixed lines; done is one screen; failure is `no claim`, `no verify runner`, or a FAIL verdict with a next action; scope is proof only, no repair. |
| 3 | Evidence | PASS | Thin override: 3 sources, not the 9 default - two external (OpenCode, pre-commit) and S02. `docs/BUILD-PLAN.md` authorizes the thin protocol; both external repositories are active on the verification date and are cited with quotes and borrow/reject. No gamedev analogue was found; padding one would fail necessity. |
| 4 | Blueprint fit | PASS | Target is exactly `template/.opencode/commands/verify.md`; core layer; no engine dependency; uses S02, CLI03, E03, R1, and R5 by ID; distinct from the runner (CLI03) and the method (S02). |
| 5 | Size | PASS | 295.00 estimated tokens, under 300 by 1.7% and under the 400 rubric by 26.3%; 28 lines. |
| 6 | Language and encoding | PASS | English, pure ASCII inside UTF-8, no BOM, LF only, POSIX paths, valid three-key frontmatter. |
| 7 | Security | PASS | No `!` shell block, network, secrets, or writes; one command runs through the permission flow; CLI03 itself blocks push, publish, release, and `rm -rf`; the command has no gate or release authority. |
| 8 | Testability | CONCERNS | The static check verifies shape, required strings, IDs, and encoding, but the prompt's runtime behavior is review-only. E03 is the behavioral fixture, yet it scores the agent, not this file, and was not executed here. The FAIL path can be exercised by running CLI03 against an empty recipe (exit 1), but that is not automated. |
| 9 | Integration | CONCERNS | S02, CLI03, and E03 are installed and resolve; R1 and R5 are assembled; the SL04 row is `running`. The target file is not written yet. `$ARGUMENTS` and `subtask` are OpenCode-specific, and a project with neither CLI03 nor a documented verify command gets FAIL `no verify runner` by design - the command is inert there until one exists. |

Overall: review-ready, not self-accepted. Items 8 and 9 are real gaps for a reviewer to weigh; neither is hidden by the command.

## Known weaknesses

- No runtime test. The part is a prompt; the check proves the file's shape and required strings, not that a model follows every instruction.
- `subtask` is a deprecated alias for `subagent`. The brief requires it; it is accepted today.
- The claim is passed as one quoted argument. A claim containing double quotes needs escaping, or CLI03 receives several arguments and exits 2.
- The `evidence/<date>-<claim>/` pattern omits the `-2` and `-3` suffix CLI03 adds on a repeat claim; the printed path is authoritative.
- "The project's documented verify command" does not name where it is documented. A project with neither CLI03 nor a documented command can only FAIL, by design.
- The `next` line has no defined value on PASS; the command does not say whether to print an action or `none`.

## Open questions

1. What should `next` say on PASS - `none`, the commit step, or nothing? The brief requires the line for FAIL only.
2. Should `/verify` check for a recipe before calling CLI03, or let the runner report "no verify recipe" and pass its exit 1 through unchanged?
3. `subtask: false` is the deprecated spelling. Keep it while the brief requires it, or switch to `subagent: false` now?
4. The claim is passed as a sentence. Should `/verify` require a slug instead, so the evidence folder name is predictable without CLI03's normalization?
5. On a repeat claim, CLI03 prints the newest evidence folder. Is "the folder the run prints" always the right one, or should `/verify` name the run it checked by timestamp?

Review: accepted 2026-11-26
