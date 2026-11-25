# D01 — report

## Summary

`BRIEF.md` is a one-page fill-in template for the concept brief that S06 drafts and G0 decides. It fixes 11 sections in order: working title, hook, player fantasy, core loop (3 steps), audience, references (3), constraints (time/scope/skills), non-goals, kill criteria, next prototype question, open questions (at most 3). Every answer is a `[...]` slot; the header says to replace the slot and delete the prompt; a second page is a second idea and goes to `BACKLOG.md` (R9).

The review copy is `staging/D01/artifact/template/BRIEF.md`: 1,821 characters, 1,831 bytes, 455.25 estimated tokens, 55 lines, 37 fill slots. The target path in the template is `template/BRIEF.md`; the live copy is not written by this part.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters (Unicode code points) | 1,821 | - | - |
| Estimated tokens (characters / 4) | 455.25 | 800 | 344.75 (43.1%) |
| Lines | 55 | 70 (proxy) | 15 |
| Bytes | 1,831 | - | - |

UTF-8, no BOM, zero CR, LF line endings, trailing newline. The five em dashes account for the 10-byte gap between characters and bytes; all prose is English.

Named cut: if 800 became a hard limit, remove the third open-question slot and the `Skills` tail, saving about 120 characters. Not needed at 455.25.

## Check

Command, run from `C:\Phaser Projects\gamefirst`:

```text
node C:\Users\Chirv\AppData\Local\Temp\opencode\d01-check.mjs
```

Output:

```json
{"ok":true,"file":"staging/D01/artifact/template/BRIEF.md","chars":1821,"bytes":1831,"tokens":455.25,"lines":55,"headings":["Working title","Hook","Player fantasy","Core loop","Audience","References","Constraints","Non-goals","Kill criteria","Next prototype question","Open questions"],"fillSlots":37,"loopSteps":3,"references":3,"openQuestions":3,"ids":["G0","S06","R2","R7","R9"],"bom":false,"crlf":0}
```

Assertions:

- Exactly 11 H2 headings, in the required order, each once.
- No `{{` or `}}`, no TODO, TBD, or lorem ipsum.
- Every one of the 11 sections contains at least one `[...]` slot; brackets are balanced (37 open, 37 close).
- Core loop has exactly 3 numbered steps; references exactly 3 entries; open questions no more than 3.
- The IDs G0, S06, R2, R7, and R9 are present.
- 455.25 estimated tokens, under 800; 55 lines, under the 70-line one-page proxy.
- UTF-8, no BOM, 0 CR, trailing newline.

Script reproduced:

```js
import { readFileSync } from 'node:fs';

const root = process.cwd();
const path = 'staging/D01/artifact/template/BRIEF.md';
const src = readFileSync(`${root}/${path}`, 'utf8');
const errors = [];

const headings = [...src.matchAll(/^## (.+)$/gm)].map((m) => m[1]);
const required = ['Working title', 'Hook', 'Player fantasy', 'Core loop', 'Audience', 'References', 'Constraints', 'Non-goals', 'Kill criteria', 'Next prototype question', 'Open questions'];
if (headings.join('|') !== required.join('|')) errors.push(`headings: ${headings.join(', ')}`);

if (src.includes('{{') || src.includes('}}')) errors.push('found a {{ }} placeholder');
if (/\b(TODO|TBD|lorem ipsum)\b/i.test(src)) errors.push('found TODO/TBD/lorem');

const sections = {};
for (const name of required) {
  const start = src.indexOf(`## ${name}\n`);
  const next = src.indexOf('\n## ', start + 1);
  sections[name] = src.slice(start + name.length + 4, next < 0 ? src.length : next).trim();
}

const bracketSections = ['Working title', 'Hook', 'Player fantasy', 'Core loop', 'Audience', 'References', 'Constraints', 'Non-goals', 'Kill criteria', 'Next prototype question', 'Open questions'];
for (const name of bracketSections) {
  if (!sections[name].includes('[...]')) errors.push(`section ${name}: no [...] fill slot`);
}

const loopLines = sections['Core loop'].split('\n').filter((l) => /^\d\. /.test(l));
if (loopLines.length !== 3) errors.push(`core loop: ${loopLines.length} numbered steps, expected 3`);
const refLines = sections['References'].split('\n').filter((l) => /^\d\. /.test(l));
if (refLines.length !== 3) errors.push(`references: ${refLines.length} entries, expected 3`);
const oqLines = sections['Open questions'].split('\n').filter((l) => /^\d\. /.test(l));
if (oqLines.length > 3) errors.push(`open questions: ${oqLines.length} entries, max 3`);

for (const id of ['G0', 'S06', 'R2', 'R7', 'R9']) {
  if (!new RegExp(`\\b${id}\\b`).test(src)) errors.push(`missing ID ${id}`);
}

const open = (src.match(/\[/g) || []).length;
const close = (src.match(/\]/g) || []).length;
if (open !== close) errors.push(`brackets unbalanced: ${open} open, ${close} close`);

const chars = [...src].length;
const tokens = chars / 4;
if (tokens > 800) errors.push(`over 800 tokens: ${tokens}`);
if (src.charCodeAt(0) === 0xfeff) errors.push('UTF-8 BOM found');
if (src.includes('\r')) errors.push('CR found; LF required');
if (!src.endsWith('\n')) errors.push('no trailing newline');
if (src.split('\n').length > 70) errors.push(`too many lines: ${src.split('\n').length}`);

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
  lines: src.trimEnd().split('\n').length,
  headings,
  fillSlots: open,
  loopSteps: loopLines.length,
  references: refLines.length,
  openQuestions: oqLines.length,
  ids: ['G0', 'S06', 'R2', 'R7', 'R9'],
  bom: false,
  crlf: 0,
}));
```

## Rubric self-check

| # | Section | Verdict | Why |
|---|---|---|---|
| 1 | Necessity | PASS | `JUSTIFICATION.md` has 15 unit rows; each names why it exists, what breaks without it, and a source. `Deliberately absent` explains why the template is not a GDD. No unit duplicates S06 or G0. |
| 2 | Function | PASS | Trigger: S06 step 7 drafts, G0 decides. Input: S06's package. Output: one page. Done: G0 go or revise. Failure: no audience or no kill criterion. Scope: one file, 11 sections. |
| 3 | Evidence | CONCERNS | Thin protocol: 3 sources. Best-README-Template is 16,501 stars, Unlicense, pushed 2026-04-18. A-Cloud PR/FAQ is 119 stars, MIT, pushed 2020-06-24; it is an exact analogue but old and not popular. G0 is accepted. The weakness is named. No code copied. |
| 4 | Blueprint fit | PASS | Target `template/BRIEF.md` (D01, row 13); layer is a template document; IDs resolve; no engine, OS, or path assumptions. The G0 omissions are flagged, not silently contradicted. |
| 5 | Size | PASS | 455.25 of 800 estimated tokens (43.1% headroom); 55 lines; 1,831 bytes. |
| 6 | Language and encoding | PASS | English; UTF-8, no BOM; LF only; POSIX paths; five em dashes, no other non-ASCII. |
| 7 | Security | PASS | Document only; no code, secrets, network calls, writes, or publish. External text is quoted as data, not executed. |
| 8 | Testability | CONCERNS | The static check proves shape, IDs, encoding, and size. There is no fixture with a filled brief, so content quality is review-only. |
| 9 | Integration | CONCERNS | G0, S06, R2, R7, R9, and C01 resolve. D05 (`BACKLOG.md`) is pending. The live `template/BRIEF.md` is not written, so a generated project needs the install step before `/start` finds the brief. |

Overall: items 3, 8, and 9 are CONCERNS; the rest PASS. The part is review-ready, not self-accepted.

## Known weaknesses

- G0's brief spec includes pillars, risks, and visual/audio direction; D01 omits them because the caller's section list does. The S06 output carries them, but a reviewer reading G0 alone may see a gap.
- There is no pass criterion, although C01 asks for one pass and one kill. The next prototype question is the de facto pass test, but it is not labelled.
- The prompts remain in a filled brief unless the author deletes them. The header says to delete them; no check enforces it.
- `[...]` slots can be left unfilled. The check proves the template's shape, not that a filled brief is complete or good.
- One page is measured by tokens and a 70-line proxy, not by a printed page. At large type, 55 lines may run to two pages.
- The PR/FAQ source is from 2020 and has 119 stars. It is an exact analogue but weak on the rubric's popularity and currency tests; `SOURCES.md` states this.
- The live `template/BRIEF.md` is not written by this part. Only the staging review copy exists; installation is a separate step.
- There is no runtime test. The part is a document; the check verifies structure and the `JUSTIFICATION.md` review covers quality.
- The `Q1/3` format can imply exactly three open questions; the text says at most three. A filler who writes one question may leave `Q2/3` and `Q3/3` behind.
- The hook's "No genre label" is a strong prompt, not a hard check. A genre label can be part of a legitimate hook.

## Open questions

1. **G0 fields.** Should D01 add pillars, risks, and visual/audio direction, or keep them in the S06 package? Recommendation: keep them in S06 for v0.3; add fields only if G0's check is enforced literally.
2. **Pass criterion.** C01 asks for one pass and one kill. Should the template add a `Pass criterion` line, or rename `Next prototype question` to make the pass test explicit? Recommendation: add one line in the next revision; C01 needs both.
3. **800-token scope.** Does the limit apply to the blank template or to a filled brief? Recommendation: state in D01 that the limit is the blank template; a filled brief should be one page by construction.
4. **Live copy.** Does the batch installer own `template/BRIEF.md`, or should the reviewer copy the staging artifact before acceptance? Recommendation: the installer owns it; this report records the forward reference.
5. **Prompt handling.** Should the prompts stay visible with a delete instruction, or move to HTML comments so a filled brief renders clean? Recommendation: keep them visible for raw-text agents; revisit if humans print the brief.

Review: accepted 2026-11-26
