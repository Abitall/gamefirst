# S11 content - report

## Summary

`content` is the stage after the slice: the systems are proven (S10) and G2 has set a number. The skill freezes that number in `STATE.md`, fills a reuse matrix before producing, then adds one unit at a time, safest first, as data under `src/data/`. Each unit is checked against the budget and the `content` claim in S02; each batch gets one sample played end to end and one D07 note. When time or count runs short, the skill cuts in the pre-agreed order and never expands the budget. A unit that would need a new system is parked in `BACKLOG.md` (R9, E06). Imported assets carry a license line, and an old save must still load.

## Artifact

`artifact/library/game/skills/content/SKILL.md` - 55 lines, sections Trigger / Inputs / Steps 1-10 / Output / Failure behavior / Out of scope / Cross-refs. Review round 1 of at most 3.

## Size

| Metric | Value | Threshold | Result |
|---|---|---|---|
| Characters | 3,070 | - | - |
| chars/4 | 767.50 | <= 800 (target band 720-780) | pass, 12.50 under the band edge |
| Words | 547 | - | - |
| words x 1.35 | 738.45 | target band 720-780 | pass, inside the band |

chars/4 is the binding proxy: 32.50 under the 800 ceiling and 12.50 under the 780 band edge. The last edits traded wording for accuracy: R6 was removed from the role, trigger, out-of-scope and cross-refs; D07 moved from per unit to per batch; the unit check now names S02. Nothing was cut to reach 720.

## Checks

| Check | Result |
|---|---|
| Frontmatter parses; exactly `name`, `description`, `allowed-tools`; every tool in the allowed set | pass |
| UTF-8 without BOM; LF only; no tabs; no trailing spaces; file ends with LF | pass |
| Non-ASCII characters: none (ASCII only) | pass |
| POSIX paths only; no backslashes, no drive letters | pass |
| Cross-references resolve by ID: G2, G2.5, E06, E08, D06, D07, X02, P03, S09-S13, R1, R2, R9, R10, S02 | pass, with forward references noted below |
| Budget fields: units per type, includes/excludes, iterations | pass |
| Cut list: order, cost, what the build loses | pass |
| Reuse matrix: per-unit row, no row = new scope | pass |
| Validation per unit: count vs budget plus S02 `content`; per batch: one sample and one D07 note | pass |
| No new mechanics or systems: trigger, step 2, failure behavior, out of scope | pass |
| Data, not code: `src/data/`, a literal in a system is a bug | pass |
| Licenses: one line per imported asset (X02, P03) | pass |
| Saves: an old save loads, or the unit does not ship (X02) | pass, path undefined |
| No rule text restated: R9's "cut or park, never expand" is quoted and attributed | pass, noted |
| No engine imports, engine API calls, asset formats, or shader assumptions | pass |
| No secrets, hosts, network writes, commit, publish, or destructive command | pass |
| Loads alone: valid YAML, no external file needed to understand the procedure | pass |
| Windows-safe name `content/SKILL.md`; placeholders avoided | pass |

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | Every unit is mapped in `JUSTIFICATION.md`; the trigger exclusions and the D07 batch note are disclosed as overlaps. Each of the ten steps removes a specific failure. |
| 2 | Function | pass | Trigger, four inputs, ten ordered steps, output, failure behavior, scope. Done is a count, a sample, a note and a green S02, not a claim. |
| 3 | Evidence | pass | Nine repositories, 4/3/2, with URL, stars on 2026-11-25, license, artifact, verbatim quote, borrow and reject; four dead ends explained; no code copied; the GPL sources are idea-only. |
| 4 | Fit | pass | Game layer, no engine imports; `src/data/` follows the blueprint tree (B:105); IDs follow the blueprint; no contradiction with R1 or R9; G2.5 owns the freeze; priority respected (rules own their text). |
| 5 | Size | pass, flagged | 767.50 chars/4 against 800; 12.50 headroom inside the band; words x 1.35 at 738.45. Explained above. |
| 6 | Language and encoding | pass | Body English, ASCII only, UTF-8 without BOM, LF, POSIX paths, no placeholders. |
| 7 | Security | pass | External material is data under R3; no secrets or hosts; no side effects; licenses checked per asset; saves treated as untrusted under X02. |
| 8 | Testability | pass, with cost note | The check is count + S02 `content` per unit, plus one sample and one D07 note per batch. Failure messages are explicit ("data alone is not done"; "a red check stops production"). |
| 9 | Integration | pass, with concerns | Stable path and ID; cross-references resolve; eight forward references (G2, G2.5, E06, E08, D06, D07, X02, P03); save compatibility has no file or owner yet. |

## Open questions

1. **G2 and G2.5 are not authored yet.** S11 cites their behavior (proceed, numbers, freeze), not their record fields; if a gate record names the budget differently, step 1 freezes whatever exists.
2. **X02, P03, D06 and D07 are forward references.** The license line format and the playtest note fields are pending; step 5 and step 6 will need a matching shape.
3. **Save compatibility is behavioral only.** No save file, format, version, or migration owner exists in the blueprint; step 8 says an old save must load, but not which file or who migrates it.
4. **"Iterations" is undefined.** Does the G2 record count production loops or playtest sessions? Step 1 freezes the number without defining its unit; the two readings differ by an order of magnitude.
5. **D07 is per batch, not per unit.** The batch note is cheaper, but a batch can hide which unit failed; the sample is still played end to end, so the failure is visible in play.
6. **Which size metric binds?** chars/4 has 12.50 headroom and words x 1.35 has 41.55; chars/4 is the binding proxy. Any later edit reopens the budget.
7. **Owners are split.** A02 can write `docs/playtests/**` but not `src/**`; A03 can write `src/**` and needs approval for `docs/playtests/**`. S11 is the producer's procedure, so the partner routes A02 for the note and A03 for the build; a single subagent cannot run it end to end.

Review: pending
