# SL03 — report

## Summary

`/next` is a read-only OpenCode command that selects one next action from `BACKLOG.md`. It reads `STATE.md` for the phase, gate, named next action, and blockers (D02/A01); `BACKLOG.md` for the queue, cost, and priority (D05/R9); and `agent.lock.json` for installed parts (CLI01). The STATE-named item wins; a named non-item is printed from STATE (R5); a named closed item is a conflict and prints `BLOCKING` with the reason. Otherwise the command takes the top unblocked item within the R9 budget, the gate, and the current mode, and refuses features after G2.5. It never writes, runs, or asks; stray arguments are ignored; the output is one screen with `Next:`, `Why:`, `Blocked:`, and `Mode:`.

`/status` (SL02) mirrors the files; `/next` selects from them. The command does not reprint phase, active parts, or the `Since` anchor.

The review artifact is `staging/SL03/artifact/template/.opencode/commands/next.md` (SHA-256 `CB291EA2143350A574BE5D4B4430C37714698D8B9CF8C37D927C956928E39EB3`). The final target `template/.opencode/commands/next.md` is not written yet: BUILD-PLAN line 80 keeps SL03 at `running`, and the artifact mirrors the target path under `staging/`.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters | 1,190 | - | - |
| Estimated tokens (characters / 4) | 297.5 | 300 (brief) | 2.5 (0.8%) |
| Tokens vs rubric | 297.5 | 400 | 102.5 (25.6%) |
| Lines | 20 | - | - |
| Bytes | 1,200 | - | - |

Encoding: UTF-8, no BOM, 0 CR, LF line endings, trailing newline, POSIX paths. The five non-ASCII characters are em dashes in the missing, blocking, why, and empty-queue templates; all prose is English.

Named cut: if 300 became a hard limit after review, replace the five mode mappings with `Modes: filter the action by the STATE mode`, saving about 60 characters. Not needed at 297.5, but the margin is 2.5 tokens.

## Check

One check was run on 2026-11-25 from the repository root (`C:\Phaser Projects\gamefirst`) with Node v26.13.0. It validates the staged artifact; the final target does not exist yet.

```text
$ node C:\Users\Chirv\AppData\Local\Temp\opencode\sl03-check.mjs
{"ok":true,"file":"staging/SL03/artifact/template/.opencode/commands/next.md","chars":1190,"bytes":1200,"tokens":297.5,"lines":20,"frontmatter":{"description":"Pick one action from BACKLOG by gate, blockers, budget, mode","agent":"partner","subtask":"false"},"labels":["Next","Why","Blocked","Mode"],"usedIds":["D02","D05","CLI01","SL02","R5","R9","R10","A01","R2","G2_5"],"mappedIds":["A01","R2","R5","R9","R10","SL02","CLI01","G2_5","D02","D05","SL03"],"placeholder":false,"bom":false,"crlf":0}
```

What it asserts:

- Frontmatter parses as exactly three scalar keys (`description`, `agent`, `subtask`); `description` is non-empty; `agent` is `partner`; `subtask` is `false`.
- No `{{` placeholder remains.
- Each of the four labels appears exactly once, at the start of a line, in the required order.
- The literals `Missing:`, `BLOCKING — <reason>`, `Next: none — BACKLOG empty`, `A01 owns the choice`, the SL02 boundary line, `Never write, run, or ask`, and `Print one screen` are present.
- Every used ID resolves: A01, R2, R5, R9, R10, SL02, CLI01, and G2.5 to files; D02, D05, and SL03 to `docs/BUILD-PLAN.md` lines. All six required IDs (A01, R2, R5, R9, R10, SL02) are used.
- Size is at most 300 tokens; no BOM, no CR, trailing newline; no backslash.

Scalars are read as text because no YAML library is installed; `subtask` is the literal `false`, which YAML parses as a boolean. The check does not validate YAML semantics beyond the exact three-key shape.

The check script is not shipped. It is reproduced below so a reviewer can run it.

```js
import { readFileSync, existsSync } from 'node:fs';

const root = 'C:/Phaser Projects/gamefirst';
const path = 'staging/SL03/artifact/template/.opencode/commands/next.md';
const src = readFileSync(`${root}/${path}`, 'utf8');
const errors = [];

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

const labels = ['Next', 'Why', 'Blocked', 'Mode'];
const positions = labels.map((label) => src.search(new RegExp(`^${label}:`, 'm')));
labels.forEach((label, i) => {
  const count = (src.match(new RegExp(`^${label}:`, 'gm')) || []).length;
  if (count !== 1) errors.push(`label ${label}: appears ${count} times, expected 1`);
  if (positions[i] < 0) errors.push(`label ${label}: missing`);
});
if (positions.some((p, i) => i > 0 && p < positions[i - 1])) errors.push('labels are out of order');

for (const literal of [
  'Missing:',
  'BLOCKING — <reason>',
  'Next: none — BACKLOG empty',
  'A01 owns the choice',
  'SL02 mirrors files; `/next` selects',
  'Never write, run, or ask',
  'Print one screen',
]) if (!src.includes(literal)) errors.push(`missing literal: ${literal}`);

const hasFile = (p) => existsSync(`${root}/${p}`);
const plan = readFileSync(`${root}/docs/BUILD-PLAN.md`, 'utf8');
const hasRow = (id) => new RegExp(`^\\| \\d+ \\| ${id} \\|.*\\| (pending|accepted|assembled|running) \\|$`, 'm').test(plan);
const ids = {
  A01: hasFile('library/core/agents/partner.md'),
  R2: hasFile('library/core/rules/R2-ask-within-budget.md'),
  R5: hasFile('library/core/rules/R5-code-before-docs.md'),
  R9: hasFile('library/core/rules/R9-scope-is-budget.md'),
  R10: hasFile('library/core/rules/R10-autonomy-is-contract.md'),
  SL02: hasFile('template/.opencode/commands/status.md'),
  CLI01: hasFile('tools/new-project.mjs'),
  G2_5: hasFile('library/game/gates/G2.5-feature-freeze.md'),
  D02: hasRow('D02'), D05: hasRow('D05'), SL03: hasRow('SL03'),
};
for (const [id, ok] of Object.entries(ids)) if (!ok) errors.push(`ID does not resolve: ${id}`);
const used = [...new Set([...src.matchAll(/\b(A\d{2}|R\d{1,2}|D\d{2}|CLI\d{2}|SL\d{2})\b/g)].map((m) => m[1]))];
if (/G2\.5/.test(src)) used.push('G2_5');
const unknown = used.filter((id) => !(id in ids));
if (unknown.length) errors.push(`used but unmapped: ${unknown.join(', ')}`);
const required = ['A01', 'R2', 'R5', 'R9', 'R10', 'SL02'];
for (const id of required) if (!used.includes(id)) errors.push(`required ID missing: ${id}`);

const chars = [...src].length;
const tokens = chars / 4;
if (tokens > 300) errors.push(`over 300 tokens: ${tokens}`);
if (src.charCodeAt(0) === 0xfeff) errors.push('UTF-8 BOM found');
if (src.includes('\r')) errors.push('CR found; LF required');
if (!src.endsWith('\n')) errors.push('no trailing newline');
if (src.includes('\\')) errors.push('backslash found; POSIX paths required');

if (errors.length) { console.error(`FAIL (${errors.length})`); errors.forEach((e) => console.error(`- ${e}`)); process.exit(1); }
console.log(JSON.stringify({ ok: true, file: path, chars, bytes: Buffer.byteLength(src, 'utf8'), tokens: Math.round(tokens * 100) / 100, lines: src.trimEnd().split('\n').length, frontmatter: fm, labels, usedIds: used, mappedIds: Object.keys(ids), placeholder: false, bom: false, crlf: 0 }));
```

## Rubric self-check

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | `/next` is the selection side of A01's STATE duty. It is distinct from SL02, which mirrors six status fields and does not rank BACKLOG items, and from CLI02, which is a terminal/JSON status tool. Every unit in `JUSTIFICATION.md` names why it exists and what breaks without it. |
| 2 | Function | PASS | Trigger `/next`; inputs `STATE.md`, `BACKLOG.md`, `agent.lock.json`; one selected action; output four fixed labels; failure is `Missing:` plus the owning part, `BLOCKING` for a conflict or stop, or an honest empty-queue line; scope is read-only. |
| 3 | Evidence | PASS | Thin override: 3 sources, not the 9 default — OpenCode, Taskwarrior, and accepted SL02. `docs/BUILD-PLAN.md` authorizes the thin protocol. Both external sources are active on 2026-11-25 and are cited with stars, license, quotes, and borrow/reject. No gamedev analogue was found; padding one would fail the evidence test. |
| 4 | Blueprint fit | PASS | Target is exactly `template/.opencode/commands/next.md`; core layer; no engine dependency; uses A01, R2, R5, R9, R10, D02, D05, CLI01, and G2.5; leaves SL02's status labels alone. |
| 5 | Size | PASS | 297.5 estimated tokens, under 300 by 0.8% and under the 400 rubric by 25.6%; 20 lines. The brief limit is met, but headroom is only 2.5 tokens; the named cut is recorded. |
| 6 | Language and format | PASS | English, UTF-8 no BOM, LF only, POSIX paths, valid three-key frontmatter, trailing newline. |
| 7 | Security | PASS | No shell block, network, secrets, execution, or writes; ignores arguments; reads three local files; no gate, commit, or publish authority. |
| 8 | Testability | CONCERNS | The static check verifies structure, labels, literals, IDs, encoding, and size, but the prompt's runtime selection is review-only. No fixture exists because D02 and D05 are pending. |
| 9 | Integration | CONCERNS | A01, R2, R5, R9, R10, SL02, CLI01, and G2.5 resolve; D02 and D05 are pending, the SL03 target is not installed, and D05's item shape is not frozen. The forward references resolve to BUILD-PLAN lines, but the inputs do not exist yet. |

Overall: review-ready, not self-accepted. Items 8 and 9 are real gaps for a reviewer to weigh; neither is hidden by the command, which names the missing parts and does not invent values.

## Known weaknesses

- Size headroom is 2.5 tokens (0.8%). The command is under the brief's 300-token limit but has little room for a wording fix; the named cut can free about 60 characters.
- D02 and D05 are pending, so the main inputs are forward references. Until batch 14, `Missing: STATE.md — D02` and `Missing: BACKLOG.md — D05` are the expected output.
- The final target is not installed: the artifact exists only under `staging/`. BUILD-PLAN line 80 keeps SL03 at `running`.
- The BACKLOG item shape is not frozen. The command assumes one open bullet with a cost and a priority and reads a blocker from the item text; a richer D05 schema may need explicit fields.
- A STATE-named item is honoured even if the item itself is blocked or over budget; `Blocked:` and `Why:` expose the condition rather than silently replacing the human's commitment. This is a chosen behavior, not a D05 rule.
- "Unblocked" has no dependency solver. A blocker expressed outside the item text can be missed.
- The command is a prompt, not a parser. Priority ties, malformed items, and an unusual STATE heading are resolved by the partner's reading.
- `subtask` is a deprecated alias for `subagent`. The brief requires it; the partner is a primary agent, so the default session behavior is unchanged if the alias is later removed.
- No runtime test exists. The check proves the file's shape, not that a model follows every instruction.

## Open questions

1. D05 item shape: should each BACKLOG bullet carry explicit priority, cost, and blocker fields, or stay free text? `/next` reads all three from one bullet; a schema would make the fallback deterministic.
2. STATE-named item that is blocked or over budget: the command honours it and reports the condition. Should it instead print `BLOCKING` and require A01 to update STATE first?
3. Missing `agent.lock.json`: the command prints `Missing:` and skips the installed-part check. Is that acceptable, or should `/next` require CLI01 before selecting anything?
4. Mode source: the command reads the mode from STATE and prints `not recorded` if absent. If D02 does not include mode, should `/next` read it from the phase or ask A01 to record it?
5. After G2.5: how does the command distinguish a fix or polish item from a feature in BACKLOG? The current wording refuses features but does not classify items; D05 may need a type field.
6. Conflict display: `BLOCKING — <reason>` names the reason but not the stale STATE line. Is one line enough, or should the command quote the conflicting entry?

Review: pending
