# SL05 `/retro` — report

## Summary

One command file, 19 lines, 1152 characters, 288 tokens by the `chars/4` rule — 12 under the 300 cap.
It triggers S03's retrospect and adds only the three things the skill does not own: the five input
reads, the dated file under `docs/retro/`, and the one-screen print. The evidence floor is arithmetic
(distinct paths in `evidence/` and `docs/playtests/`); below three, the command writes the shortfall
into `Failed:` rather than a guess. One change per retro, with an R6 route for adding or deleting a
rule or skill, and an R9 route for the second change that does not fit.

Deliverables:

- `staging/SL05/artifact/template/.opencode/commands/retro.md` — the command
- `staging/SL05/JUSTIFICATION.md` — 24 units, 4 fit decisions, omissions
- `staging/SL05/SOURCES.md` — 2 external repositories + S03
- `staging/SL05/REPORT.md` — this file

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters | 1152 | — | — |
| Tokens (`chars/4`) | 288 | 300 | 12 (4.0%) |
| Lines | 19 | one screen | fits a terminal page |
| Bytes | 1156 | — | 4 bytes for 2 multi-byte characters |
| Non-ASCII characters | 2 (em dash) | — | no smart quotes, no CJK |
| Longest line | 289 chars | — | the "Write them to" paragraph |

Against the sibling commands: `/status` is 1169 chars / 292.25 tokens, `/start` is longer. `/retro`
sits just under `/status` while doing more (it writes a file). Against the 400-token comparison used in
the SL01/SL02 reports it has 112 tokens of headroom, so a reviewer who wants one more sentence can add
one.

## Encoding and shape

- UTF-8, no BOM; LF only; POSIX paths; trailing newline present; no tabs, no trailing spaces.
- No template placeholders of any kind; the only angle brackets are the slots in the five output lines,
  which are the format S03 defines, not a substitution mechanism.
- Frontmatter carries exactly three keys, in this order: `description`, `agent: partner`,
  `subtask: false`. No `model`, no `template`, no deprecated `subtask: true`.

## Check

The artifact was checked mechanically on 2026-11-25. Output of the run:

```json
{"ok":true,"file":"staging/SL05/artifact/template/.opencode/commands/retro.md","chars":1152,"bytes":1156,"tokens":288,"lines":19,"frontmatter":{"description":"Stage close: S03's five lines and one dated retro file","agent":"partner","subtask":"false"},"labels":["Worked","Failed","Why","Change","Next"],"usedIds":["R5","R2","R10","R6","R9","A01"],"nonAsciiChars":2}
```

The same assertions, as a re-runnable script:

```js
import { readFileSync } from 'node:fs';
const path = 'staging/SL05/artifact/template/.opencode/commands/retro.md';
const buf = readFileSync(path);
const src = buf.toString('utf8');
const fail = [];
const blank = '{' + '{';
if (src.includes(blank)) fail.push('placeholder');
if (buf.subarray(0, 3).equals(Buffer.from([0xef, 0xbb, 0xbf]))) fail.push('bom');
if (src.includes('\r')) fail.push('crlf');
if (!src.endsWith('\n')) fail.push('no trailing newline');
const fm = src.match(/^---\n([\s\S]*?)\n---\n/);
const keys = fm ? fm[1].split('\n').map(l => l.split(':')[0]) : [];
if (keys.join() !== 'description,agent,subtask') fail.push('frontmatter: ' + keys.join());
if (!src.includes('agent: partner')) fail.push('agent');
if (!src.includes('subtask: false')) fail.push('subtask');
const order = ['Worked', 'Failed', 'Why', 'Change', 'Next'];
const at = order.map(l => src.search(new RegExp('^' + l + ':', 'm')));
if (at.includes(-1) || at.some((v, i) => i && v < at[i - 1])) fail.push('labels/order');
for (const t of order) if ((src.match(new RegExp('^' + t + ':', 'gm')) || []).length !== 1) fail.push('count ' + t);
for (const t of ['STATE.md', 'DECISIONS.md', 'BACKLOG.md', 'evidence/', 'docs/playtests/', 'docs/retro/<YYYY-MM-DD>.md', 'A01']) if (!src.includes(t)) fail.push('missing ' + t);
for (const t of ['S03', 'R2', 'R5', 'R6', 'R9', 'R10']) if (!src.includes(t)) fail.push('missing ' + t);
if (src.length / 4 > 300) fail.push('over cap');
console.log(JSON.stringify({ ok: !fail.length, chars: src.length, bytes: buf.length, tokens: src.length / 4, lines: src.split('\n').length - 1, labels: order, nonAscii: [...src].filter(c => c.charCodeAt(0) > 127).length, fail }));
```

| Assertion | Result |
|---|---|
| Exactly `description`, `agent: partner`, `subtask: false` | PASS |
| No placeholder braces, no BOM, no CR, trailing newline | PASS |
| Five labels, each once, in S03's order | PASS |
| Inputs named: `STATE.md`, `DECISIONS.md`, `BACKLOG.md`, `evidence/`, `docs/playtests/` | PASS |
| Output file `docs/retro/<YYYY-MM-DD>.md` and owner `A01` | PASS |
| IDs cited: S03, R2, R5, R6, R9, R10 | PASS |
| Tokens `≤ 300` | PASS, 288 |

## Rubric (REVIEW-RUBRIC §1–9)

| § | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | S03 is accepted and unreachable without a trigger; `docs/V0.3-BLUEPRINT.md:251` lists `/retro`. It earns its place by writing a file, which no sibling command does |
| 2 | Function | PASS | Inputs, five lines, path, evidence floor, one change, R6 route, R9 overflow, R2 question, R10 stop, A01 ownership: each is one clause and each maps to a justification unit |
| 3 | Evidence | PASS | Three sources: `anomalyco/opencode` (229,153 stars, MIT), `npryce/adr-tools` (5,786, GPL-3.0-or-later), and S03 as the accepted internal part. Every external claim was read, not recalled; quotes are line-level |
| 4 | Fit with the blueprint | PASS | `docs/V0.3-BLUEPRINT.md:98` has `docs/retro/` in the tree, `:152` defines the five lines, `:251` names the command. No new concept is introduced: the command only supplies the missing trigger |
| 5 | Size | PASS | 288 / 300 tokens (96%), 19 lines, one screen. Lighter than `/status` |
| 6 | Language and encoding | PASS | English, telegraphic, imperative; UTF-8, LF, no BOM, POSIX. No praise vocabulary, no hedges ("maybe", "consider") |
| 7 | Security | PASS | No shell block, no network, no secrets, no absolute paths. The writes are confined to `docs/retro/` and one `STATE.md` pointer, and the file owner is named so the permission check has a subject |
| 8 | Testability | CONCERNS | Structure is checked; behaviour is not. A command has no runtime in this repository, so "does the five-line print appear" and "does `-2` land on a second same-day run" are unproven until an eval case drives a fixture stage |
| 9 | Integration | CONCERNS | Three assembly gaps, none in the artifact: `docs/retro/` is absent from `template/`; A01's permission list has no `docs/retro/**` allow, so the write will prompt; S03 itself is staged but not yet assembled into `template/library` |

## Known weaknesses

- **Three is a brief number, not a measured one.** It may be too strict for a one-day stage and too
  lenient for a gate that ran a full eval sweep. The number is isolated in one clause, so it can move
  without touching the rest.
- **The count is not enforced.** Nothing stops the agent from counting a path that exists and is empty.
  R5's citation rule is the only guard, and it is a rule, not a mechanism.
- **`(settled changes)` is a cue.** It tells the reader why `DECISIONS.md` is in the list but does not
  mechanically prevent a settled change from being proposed again.
- **The argument rule rides on the loader fallback.** If a future OpenCode version stops appending
  stray arguments, the sentence describes nothing. It is one sentence, so the cost of removing it later
  is low.
- **No `Missing:` line.** `/start` and `/status` report absent template docs by ID; `/retro` does not.
  Deliberate — a retro can turn a missing input into a `Failed:` line and still produce the record —
  but it is a departure from its two siblings.
- **`-2` is inherited, not defended.** A third retro on the same day would need `-3`, and the command
  does not say so. S03 has the same limit.

## Open questions

1. Does A01's permission list gain `docs/retro/**` as an allow, or is the prompt the intended review
   point? Removing the prompt means the R6 failure trail is written without a human glance.
2. Should N00 add `docs/retro/.gitkeep` (batch 4), or is "create the folder" the only mechanism we
   want? Two mechanisms for one fact is exactly what R5 warns against.
3. Should the evidence floor count `runs/*.jsonl` the way S03's inputs do? Currently only the two
   stores named in the brief.
4. Should `/retro` name missing template docs by ID (`D02`, `D03`, `D05`) for consistency with
   `/start` and `/status`?
5. Same-day naming: keep S03's `-2`, or key the file by stage (`2026-11-25-G2.md`)? S03's open
   question 1 is still open and this command inherits it.
6. Which `STATE.md` section holds the pointer line? The command says "one pointer line" and leaves the
   section to A01.

Review: pending
