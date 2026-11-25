# G2 - slice: report

## Summary

One gate file for G2, the human's verdict on the nine-point slice. It takes the
S10 packet as input, checks the nine points one line each, and records one dated
line in `DECISIONS.md` and `STATE.md`: `proceed`, `fix` or `pivot`. On `proceed`
it forces the content budget in numbers and an ordered cut list before S11 starts
and before G2.5 freezes. Rule text is not restated; the file carries IDs only.

## Artifact

`artifact/library/game/gates/G2-slice.md` - plain Markdown, no frontmatter.

- Role line: the human decides; the agent brings the packet.
- `Input`: five S10 packet pieces plus system cards (D06); incomplete packet
  means G2 does not start.
- `Check`: nine numbered points, each with its evidence edge (12-minute timed
  run, readable on one screen, 3-5 strangers, a reuse row per unit).
- `Decision`: three outcomes, one line and a date, two files.
- `Out of scope`: content, polish, release, a second loop, a new engine.
- `Cross-refs`: S10, S11, S12, G2.5; R1, R8, R9, R10; D06, D07, CLI10, E03.

## Size

| Metric | Value |
|---|---|
| Characters | 1,801 |
| Tokens at chars/4 | 450.3 |
| Words | 318 |
| Tokens at words x 1.35 | 429.3 |
| Lines | 36 |
| Threshold | 500 (chars/4), target 420-470 |
| Verdict | PASS, both estimates inside the target band |

## Checks

- Encoding: UTF-8, no BOM, LF only, no tabs, zero non-ASCII characters.
- Structure: `#` title, role line, four `##` sections, one `Cross-refs` line;
  no YAML frontmatter, no nested headings.
- Nine points: exactly nine numbered lines, one per S10 DoD point, same order.
- Decision tokens: `proceed`, `fix`, `pivot` each appear once as a bullet.
- Rule restatement: R1, R8, R9, R10 and E03 appear as IDs only; no rule prose.
- Scope: only `staging/G2/` written; no git, no publish, no secrets.

Cheap re-check, run from `staging/G2/`:

```bash
node -e "const t=require('fs').readFileSync('artifact/library/game/gates/G2-slice.md','utf8');const n=(t.match(/^[1-9]\. /gm)||[]).length;if(n!==9)throw new Error('points '+n+'/9');for(const k of ['proceed','fix','pivot'])if(!t.includes(k))throw new Error('missing '+k);const s=t.length/4;if(s>500)throw new Error('size '+s.toFixed(1));console.log('ok '+s.toFixed(1))"
```

Expected: `ok 450.3`. Any other output names the broken check.

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | Every unit is mapped in `JUSTIFICATION.md`; four tempting units are listed as deliberately absent with a reason. |
| 2 | Function | PASS | Trigger (S10 packet), input, output (dated line), done (three outcomes; budget and cut list on proceed), failure (incomplete packet, missing point), scope all present. |
| 3 | Evidence | PASS | Nine repos, 4/3/2 split, stars on 2026-11-25, licenses incl. two honest NOASSERTION cases, one quote each, borrow and reject, eight dead ends. Synthesis, not copying. |
| 4 | Fit | PASS | Game-layer gate path from the build plan; no engine imports; IDs used in the repo; consistent with S10 and S11; the one terminology gap (S11 "G2 record" vs budget plus cut list) is noted and harmless. |
| 5 | Size | PASS | 450.3 at chars/4, 429.3 at words x 1.35; no gate row exists in the rubric, so the 500 part limit was applied. |
| 6 | Language and encoding | PASS | English artifact; UTF-8 no BOM, LF, ASCII only, POSIX paths. |
| 7 | Security and licenses | PASS | No secrets, no copied code or license text; GPL repos cited, not borrowed; unclear licenses moved to dead ends. |
| 8 | Testability | PASS | The Node one-liner above checks point count, three decision tokens and size, and fails with the specific broken item. |
| 9 | Integration | PASS | S10, S11, S12, G2.5, R1, R8, R9, R10, D06, D07, CLI10 and E03 all resolve; the file loads alone. |

## Open questions

1. Gate size threshold: the rubric lists rule, skill, pack, agent, eval and
   command limits but no gate limit. 500 was taken from the part brief. If a
   gate threshold is added later, remeasure.
2. `one build` in point 8 is the DoD wording. If it means one artefact rather
   than a build that runs, S10 should say so; the gate keeps the DoD word.
3. D06 system cards are required by G2 but not produced by S10. The gate now
   adds them explicitly; confirm that a project without system cards still has
   a path to G2.
4. `words` among the budget units assumes text content. If the next game is
   not text-bearing, drop it from S11 examples rather than from the gate.
5. Async gates: the artifact demands a complete packet but says nothing about
   whether the human must be present. Left open on purpose; G2 is a decision,
   not a meeting.

## Boundary

No content production, no polish, no release work was done here; the gate only
defines the checkpoint. Nothing outside `staging/G2/` was written.

Review: accepted 2026-11-26
