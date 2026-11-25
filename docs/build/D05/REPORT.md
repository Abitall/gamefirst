# D05 — report

## Summary

`BACKLOG.md` is the one-page Russian list of ideas that are outside the current scope. A line carries five fields: idea, value, cost, priority, status. Value is what the player gets and which `BRIEF.md` promise it serves; cost is days to playable plus the upkeep that follows; priority is an order, not a date; status is `next`, `parked`, or `cut`. The header says an idea is not a promise, R9 owns the budget, and G2.5 freezes: after the freeze the file still accepts ideas, but each one carries a price and waits for a one-in-one-out trade named in `DECISIONS.md`. The template ships empty, because `/next` treats an empty file as a working state.

The review copy is `staging/D05/artifact/template/BACKLOG.md`: 1,466 characters, 2,402 bytes, 366.5 estimated tokens, 26 lines, 9 fill slots, 3 legend rows. The target path in the template is `template/BACKLOG.md`; the live copy is not written by this part.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters (Unicode code points) | 1,466 | - | - |
| Estimated tokens (characters / 4) | 366.5 | 500 target / 600 hard | 133.5 (26.7%) / 233.5 |
| Lines | 26 | 70 (proxy) | 44 |
| Bytes | 2,402 | - | - |

UTF-8, no BOM, zero CR, LF line endings, trailing newline. Bytes exceed characters by 936: Russian letters take two bytes and the em dash three. The Cyrillic ratio is 0.88; the non-Cyrillic letters are the English IDs.

Named cut: the file sits 16.5 tokens above the rubric's 350 floor. Dropping the `cut` legend row and the sentence that returns a cut idea would fall under 350, so the legend stays.

## Check

Command, run from `C:\Phaser Projects\gamefirst`:

```text
node C:\Users\Chirv\AppData\Local\Temp\opencode\d05-check.mjs
```

Output:

```json
{"ok":true,"file":"staging/D05/artifact/template/BACKLOG.md","chars":1466,"bytes":2402,"tokens":366.5,"lines":26,"headings":["Формат","Идеи"],"legendRows":3,"slots":9,"parseBacklog":{"open":0,"top":""},"ids":["BRIEF.md (D01)","STATE.md (D02)","DECISIONS.md (D03)","R9","G2.5","A01","R2"],"cyrillicRatio":0.88,"bom":false,"crlf":0}
```

Assertions:

- H1 is `# BACKLOG`; H2 are exactly `Формат` and `Идеи`, in that order.
- No `{{` or `}}`, no TODO, TBD, or lorem ipsum.
- Zero unindented bullets: the file is born empty for `/next`.
- Three legend rows with the exact shape `P1 next` (`[ ]`), `P2 parked` (`[ ]`), `P3 cut` (`[x]`).
- A local copy of `parseBacklog` (`staging/CLI02/artifact/tools/status.mjs:133-144`) sees 0 open items and an empty top.
- 366.5 estimated tokens: inside the 350–500 target and under the 600 hard limit; 26 lines, under the 70-line proxy.
- The IDs `BRIEF.md (D01)`, `STATE.md (D02)`, `DECISIONS.md (D03)`, `R9`, `G2.5`, `A01`, `R2` are present; `/next` is named.
- `template/BRIEF.md`, `library/core/rules/R9-scope-is-budget.md`, `library/game/gates/G2.5-feature-freeze.md`, and `library/core/agents/partner.md` resolve.
- Cyrillic ratio at least 0.6; UTF-8, no BOM, 0 CR, trailing newline, no extra blank line at the end.

Script reproduced:

```js
import { readFileSync, existsSync } from 'node:fs';

const root = process.cwd();
const path = 'staging/D05/artifact/template/BACKLOG.md';
const src = readFileSync(`${root}/${path}`, 'utf8');
const errors = [];

const chars = [...src].length;
const tokens = chars / 4;
const lines = src.split('\n').length;

// Shape
if (!src.startsWith('# BACKLOG\n')) errors.push('missing H1 # BACKLOG');
if (src.includes('{{') || src.includes('}}')) errors.push('found a {{ }} placeholder');
if (/\b(TODO|TBD|lorem ipsum)\b/i.test(src)) errors.push('found TODO/TBD/lorem');

const h2 = [...src.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
if (h2.join('|') !== 'Формат|Идеи') errors.push(`headings: ${h2.join(', ')}`);

// The legend must not be readable as items: no bullet at column 0.
const items = src.match(/^[-*+] /gm) || [];
if (items.length !== 0) errors.push(`unindented bullets: ${items.length}; a fresh BACKLOG must be empty for /next`);

const legend = ['P1 next', 'P2 parked', 'P3 cut'];
for (const row of legend) {
  if (!new RegExp(`^  - \\[[ x]\\] ${row} — \\[\\.\\.\\.\\]: ценность — \\[\\.\\.\\.\\]; цена — \\[\\.\\.\\.\\]$`, 'm').test(src)) {
    errors.push(`legend row missing or malformed: ${row}`);
  }
}
if (!src.includes('- [x] P3 cut')) errors.push('cut row is not [x] (closed for /status)');
if (!src.includes('- [ ] P2 parked')) errors.push('parked row is not [ ] (open for /status)');

// Parse the way status.mjs parseBacklog does.
let open = 0;
let top = '';
for (const line of src.split('\n')) {
  const match = /^[-*+]\s+(.*)$/.exec(line);
  if (!match) continue;
  let value = match[1].trim();
  if (/^\[[xX]\]\s*/.test(value) || /^~~/.test(value)) continue;
  value = value.replace(/^\[ \]\s*/, '').trim();
  if (value) { open += 1; if (!top) top = value; }
}
if (open !== 0 || top !== '') errors.push(`parseBacklog sees ${open} open, top "${top}"; expected 0/empty`);

// Size
if (tokens < 350) errors.push(`under target floor 350: ${tokens}`);
if (tokens > 500) errors.push(`over target 500: ${tokens}`);
if (tokens > 600) errors.push(`over hard limit 600: ${tokens}`);
if (lines > 70) errors.push(`over one-page proxy 70 lines: ${lines}`);

// IDs and commands
const ids = ['BRIEF.md (D01)', 'STATE.md (D02)', 'DECISIONS.md (D03)', 'R9', 'G2.5', 'A01', 'R2'];
for (const id of ids) if (!src.includes(id)) errors.push(`missing ID: ${id}`);
for (const command of ['/next']) if (!src.includes(command)) errors.push(`missing command: ${command}`);

// Referenced artifacts resolve
const resolve = [
  'template/BRIEF.md',
  'library/core/rules/R9-scope-is-budget.md',
  'library/game/gates/G2.5-feature-freeze.md',
  'library/core/agents/partner.md',
];
for (const file of resolve) if (!existsSync(`${root}/${file}`)) errors.push(`unresolved path: ${file}`);

// Language: Russian prose, English IDs.
const letters = src.match(/\p{L}/gu) || [];
const cyrillic = letters.filter((c) => /\p{Script=Cyrillic}/u.test(c)).length;
const ratio = cyrillic / letters.length;
if (ratio < 0.6) errors.push(`Cyrillic ratio ${ratio.toFixed(2)}; expected Russian prose`);

// Encoding
if (src.charCodeAt(0) === 0xfeff) errors.push('UTF-8 BOM found');
if (src.includes('\r')) errors.push('CR found; LF required');
if (!src.endsWith('\n')) errors.push('no trailing newline');
if (src.endsWith('\n\n')) errors.push('extra trailing blank line');

if (errors.length) {
  console.error(`FAIL (${errors.length})`);
  errors.forEach((e) => console.error(`- ${e}`));
  process.exit(1);
}
console.log(JSON.stringify({
  ok: true,
  file: path,
  chars,
  bytes: Buffer.byteLength(src, 'utf8'),
  tokens: Math.round(tokens * 100) / 100,
  lines,
  headings: h2,
  legendRows: legend.length,
  slots: (src.match(/\[\.\.\.\]/g) || []).length,
  parseBacklog: { open, top },
  ids,
  cyrillicRatio: Math.round(ratio * 100) / 100,
  bom: false,
  crlf: 0,
}));
```

## Rubric self-check

| # | Section | Verdict | Why |
|---|---|---|---|
| 1 | Necessity | PASS | `JUSTIFICATION.md` has 15 unit rows; each names why it exists, what breaks without it, and a source. `Deliberately absent` explains what the file is not. It does not restate R9's budget arithmetic or `/next`'s selection; it names both. |
| 2 | Function | PASS | Trigger: an idea arrives mid-stage, or a gate cannot pay for it. Input: one line with idea, value, cost, priority, status. Output: a line in `BACKLOG.md`. Done: the idea is parked with a price and waits for a gate. Failure: no cost or no priority, so the line is not a backlog line and is not paid. Scope: one file, five fields. |
| 3 | Evidence | CONCERNS | Thin protocol: 3 sources. `godot-proposals` is current (pushed 2026-09-15) but 1,464 stars; `github/roadmap` is 8,984 stars but last pushed 2024-10-15. R9 is accepted. The analogue and the borrow/reject split are stated; both weaknesses are named, not hidden. |
| 4 | Blueprint fit | PASS | Target `template/BACKLOG.md` (blueprint row 262, build plan row 88); the layer is a template document; Russian, one page, ideas with cost and priority. No engine or OS assumption. IDs resolve. The accepted SL02 and SL03 behavior is honored: empty file, open and closed lines, a top item. |
| 5 | Size | PASS | 366.5 of 500 target tokens; 233.5 under the 600 hard limit; 26 lines; 2,402 bytes. The 350 floor is met by 16.5 tokens. |
| 6 | Language and encoding | PASS | Russian prose (Cyrillic ratio 0.88), English IDs; UTF-8, no BOM; LF only; POSIX paths; beyond Cyrillic the only non-ASCII are angle brackets and the em dash. |
| 7 | Security | PASS | A document only: no code, secrets, network calls, writes, or publish. External text is quoted as data. Licenses are checked: MIT, CC-BY-4.0, project-internal. |
| 8 | Testability | CONCERNS | The static check proves shape, emptiness, status markers, IDs, encoding, and size, and replays `parseBacklog`. No `/next` or E06 run is executed against this exact file; E06 has its own fixture with two parked ideas. |
| 9 | Integration | CONCERNS | `BRIEF.md` (D01), R9, G2.5, and A01 resolve; SL02 and SL03 are compatible. D02 and D03 are running in the same batch; `STATE.md` and `DECISIONS.md` are not yet created, so their IDs are forward references. The live `template/BACKLOG.md` is not written by this part. The indented fence is an inference about a generated command, not a runtime guarantee. |

Overall: items 3, 8, and 9 are CONCERNS; the rest PASS. The part is review-ready, not self-accepted.

## Known weaknesses

- The legend is a fenced block indented two spaces so `parseBacklog` does not count it. A generated `/next` reads Markdown as text and may still propose a legend row; the check can only prove the mechanical parser skips it.
- `/next`'s item shape is not frozen (SL03's own known weakness). It assumes one open bullet with a cost and a priority; the five fields here are richer, and a blocker must be readable from the line text, not a separate field.
- `next` is one item by design. A stage that wants to promote two ideas has to edit the file; the format does not stop it.
- `staging/CLI02/artifact/tools/status.mjs:133-144` counts any column-0 bullet as an item. A hand-written note in that shape would become a phantom backlog item.
- G2.5 routes non-blocking bugs to `BACKLOG.md`, but D05 has no bug field; the text tells the author to reuse the idea line. A bug may lose severity and repro steps when it lands here.
- The `cut` row is a convenience, not the record: the budget's cut list lives in `STATE.md` (R9). Two places can disagree.
- Priority is a human order, and nothing validates it. `/next` does no reprioritisation, so a wrong P1 stays wrong until someone edits it.
- The template ships empty, so a new project has no filled example. The legend is the only model, and it sits in a fence.
- One page is measured by tokens and a 70-line proxy, not by a printed page.
- `github/roadmap` is two years stale and read-only; `godot-proposals` has 1,464 stars. The thin protocol accepts both, but the evidence is weaker than a deep part's nine repositories.
- The file is 16.5 tokens above the 350 floor; a translator's longer synonym could cross 500 while staying under 600.

## Open questions

1. **Empty or seeded.** Should the template ship empty (current) or with one filled sample that the first author deletes? Recommendation: keep it empty; `/next` would otherwise pick the sample, and E06's fixture already covers the filled shape.
2. **Bug lines.** Should D05 add a bug shape (severity, steps, regression or known), or keep G2.5's triage line outside the file? Recommendation: keep one shape for v0.3; a non-blocker bug is an idea whose value is the restored behavior, and G2.5's record stays in `DECISIONS.md`.
3. **`next` exit.** Does a shipped `next` leave the file (current) or become `[x]`? Recommendation: delete it; a `done` status would duplicate `STATE.md` and give `/next` a closed item it cannot rank. Confirm with D02.
4. **Legend mechanics.** Is the indented fence acceptable, or should the five definitions move inline and drop the sample rows? Recommendation: keep the fence; a check asserts zero items, and the sample is the only place the line shape is shown.
5. **Priority vocabulary.** Is `P1`–`P3` the right scale, or should it be `сейчас` / `потом`? Recommendation: keep `P1`–`P3`; it is language-neutral, matches the English IDs, and a gate can extend it without changing the parser.

Review: accepted 2026-11-26
