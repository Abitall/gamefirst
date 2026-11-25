# S06 - Report

## Summary

S06 `brainstorm` turns a rough idea — a new game, feature or mechanic, or a project stuck on "it is not fun" — into a one-page `BRIEF.md` without freezing it. It restates the goal in the user's words, asks at most three questions in the R2 format, writes twenty variations (three deliberately bad) with no critique, brings in distant references before any game, clusters and picks three candidates with a cost, and drafts the brief with a kill rule and one next prototype question. A flat set triggers one `spark` pass; a surprise line records what diverged.

The method is one page because the artifact is a draft that must stay arguable: a longer document would be a GDD (R5), and the skill's own cost has to be visible to the caller — three questions, twenty variants, one page.

Deliberate structural variant: the skill uses `## When` and `## Blocked` rather than `## Trigger` and `## Failure behavior`, and carries cross-references inline instead of a separate `## Cross-refs` list. This is not a defect. The variant follows S01 and S03, which use the same two headings, and every trigger, failure and integration fact is present in the body: the anti-trigger (bug or approved fix) appears in the description, in `## When` and again in `## Blocked`; handoffs to A01, A02, S07, S08, R8, R9 and G0 appear where the decision they govern is made. A separate ID list would restate IDs that already sit next to their use, which the project forbids as duplication. If a reviewer nevertheless requires literal heading names, the minimal fix is two renames (`## When` -> `## Trigger`, `## Blocked` -> `## Failure behavior`) with no other change; a `## Cross-refs` section is still not needed.

## Size

| Metric | Value | Threshold | Headroom |
|---|---|---|---|
| Characters | 3,051 | - | - |
| Words | 560 | - | - |
| Lines | 43 | one page | - |
| chars/4 (rubric metric) | 762.75 | <= 800 | 37.25 |
| words x 1.35 | 756.0 | <= 800 | 44.0 |

Both metrics are inside the 720-780 target band.

## Checks

| Check | Result |
|---|---|
| Frontmatter: `name: brainstorm`, one-line description, seven allowed tools | pass |
| Sections: When, Inputs, Steps, Output, Blocked, Out of scope | pass |
| Steps | 8 |
| Variations: 20 written, 3 bad or absurd, no critique during generation | pass (step 3) |
| Questions: at most 3, one message, R2 format, "you decide" | pass (step 2, and "No question four") |
| Distant references: film, music, architecture, nature, before games | pass (step 4) |
| `BRIEF.md` fields: fantasy, loop in 3 sentences, 3 pillars, 2-3 references, risks, kill criteria, next question | pass (step 7) |
| Kill criteria read as "drop the prototype", not a fail state | pass (step 7) |
| Cross-refs resolve: R2, R7, R8, R9 (rules), S07, S08 (blueprint 155-156), A01, A02 (170-171), G0 (187) | pass |
| Encoding: UTF-8 no BOM, LF, no tabs, no trailing spaces | pass (byte-checked) |
| Only non-ASCII character is `·` (U+00B7, 14 occurrences) | pass |
| No engine, platform or game names in the body | pass |
| Sources: 9 repos, 4 / 3 / 2, stars on 2026-11-25, licence per entry | pass (`SOURCES.md`) |
| Encoding of `JUSTIFICATION.md` and `SOURCES.md` | not byte-checked this pass (step limit); both written as UTF-8 LF and contain no tabs |

## Open questions

1. Heading variant: `## When` / `## Blocked` with inline cross-references is justified above and matches S01 and S03. Confirm the board accepts it, or rule the two renames as required.
2. Two sources (`godotengine/godot-proposals`, `BMAD-METHOD`) are also cited in R7 for other artifacts; the reuse and the narrower borrow are disclosed in `SOURCES.md`. Confirm cross-part reuse is acceptable, or replace one entry.
3. `python/peps` and `tc39/proposals` expose no licence the GitHub API recognises; both are read for structure with no text reused. Confirm that is sufficient, or swap in a licensed software source.
4. `BMAD-METHOD` is counted as AI-agent workflow, not gamedev, although it is used for game work. Confirm the classification, or move it and find a fourth gamedev repo.
5. The `spark` pass is cited as a pass defined by R7, not as an ID. Confirm that a rule-defined pass needs no own ID before S06 may reference it.

## Rubric

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | 9 | 36 units justified, 9 omissions explained; no unit survives "remove it"; the double statement of the anti-trigger is deliberate and named. |
| 2 | Function | 9 | Trigger, inputs, eight steps, output, blocked path and scope boundary are each present and checkable. |
| 3 | Evidence | 8 | Nine repos, 4/3/2, quotes where the fetch survived; two reuses disclosed, two sources without a detectable licence. |
| 4 | Blueprint fit | 9 | Game layer, no engine imports, S06 line 154 covered field by field, IDs resolve. |
| 5 | Size | 9 | 762.75 chars/4 and 756.0 words x 1.35, both within band. |
| 6 | Encoding | 9 | UTF-8, LF, no BOM, no tabs, one repeated non-ASCII glyph. |
| 7 | Security | 9 | R3 line present, no network write, no secrets, no executable step, licences stated per source. |
| 8 | Testability | 8 | Every step names an artifact a reviewer can count; the surprise line allows "none", which is intentional but softer than a count. |
| 9 | Integration | 8 | Loads alone, stable IDs, no OS or editor assumption; depends on R7 for the set rules and on a `spark` pass that has no ID of its own. |

Mean: 8.67. Self-verdict: accept.

Review: pending
