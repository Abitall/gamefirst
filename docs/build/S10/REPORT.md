# S10 slice - report

## Summary

The S10 skill is a vertical-slice protocol that starts after G1 keeps the core loop and ends with a G2 packet the human decides. It fixes the nine-point DoD as one check per point, keeps the slice to a single path one stranger can finish, and spends the playtest on confusion points rather than opinions. No content, polish or second loop is allowed.

## Artifact

`artifact/library/game/skills/slice/SKILL.md`, 52 lines: frontmatter (`name`, `description`, `allowed-tools`), role line, Trigger, Inputs, Steps 1-9, Output, Blocked, Out of scope, Cross-refs.

## Size

| Metric | Value | Target | Result |
|---|---|---|---|
| Characters | 3,102 | - | - |
| chars/4 | 775.50 | <=800, band 720-780 | pass, inside the band |
| Words | 541 | - | - |
| Words x1.35 | 730.35 | band 720-780 | pass, inside the band |
| Lines | 52 | comparable to S08/S09 (52-57) | pass |

Unlike S09, both size metrics sit inside the target band, so no trimming pass is pending.

## Checks

| Check | Result | Note |
|---|---|---|
| Frontmatter parses | pass | exactly `name`, `description`, `allowed-tools`; same set as prototype and gym |
| UTF-8, no BOM | pass | checked on all four files |
| LF only | pass | no CRLF |
| No tabs, no trailing spaces | pass | checked line by line |
| ASCII only | pass | no smart quotes, no dashes above U+007F |
| POSIX paths | pass | `docs/playtests/<YYYY-MM-DD>-slice.md`, `BACKLOG.md` |
| Cross-refs resolve | pass | R1, R7, R8, R9, R10; S02, S08, S09, S11; D07, G2, CLI10 exist in the blueprint |
| Nine DoD points present | pass | semicolon list in Inputs, one check each in step 1 |
| Playtest fields present | pass | 3-5 testers, silent first, think-aloud after, no leading questions, confusion log, D07 note |
| G2 is a human decision | pass | Output names proceed/fix/pivot and one line plus a date; the agent never decides |
| No engine imports | pass | game layer only, no Phaser/engine names |
| No secrets, no network, no publish | pass | the skill reads, writes and runs a local build only |
| Loads alone | pass | every rule and part it names is cited by ID |
| Placeholders | pass | `<YYYY-MM-DD>` is notation, as in S02/S09, not an unfilled slot |

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | every unit is in `JUSTIFICATION.md`; overlaps between trigger exclusions and out-of-scope are disclosed and serve different failure modes |
| 2 | Function | pass | trigger, inputs, nine steps, output, blocked, scope; done is a build plus a note plus a packet |
| 3 | Evidence | pass | nine repos at 4/3/2, URL, stars, license, artifact, quote, borrow and reject; five dead ends; SRC4 repeat disclosed |
| 4 | Fit | pass | game layer, no engine imports, blueprint IDs and paths, priority rules over skill |
| 5 | Size | pass | 775.50 chars/4 and 730.35 words x1.35, both inside the band |
| 6 | Language and encoding | pass | body in English, D07 note in Russian, UTF-8 no BOM, LF, POSIX |
| 7 | Security | pass | external content read as data, no secrets, no side effects, licenses checked |
| 8 | Testability | pass, with a cost note | the check is the checklist plus the D07 note plus the S02 build; no fixture can judge a stranger's confusion, so one human session is irreducible |
| 9 | Integration | pass, with concerns | stable IDs and paths; the slice config path, the dev-scene question and D07's fields are still open |

## Open questions

1. D07 is named by the blueprint but not authored. The note is expected at `docs/playtests/<YYYY-MM-DD>-slice.md` with protocol, minutes to the goal, per-point result, confusion points, quotes and verdict. Confirm the field list before S10 runs.
2. The slice config path is not fixed. Step 3 and the Inputs say "the real config", and S09 values live in `src/data/`, but no blueprint line names a file for the slice. If the slice needs its own table, name it before the build.
3. Dev gym scenes: the same question as S09. Should `src/game/gym/` be excluded from release builds, or is it acceptable for G2? The slice build should answer this once.
4. SRC4 repeats godot-demo-projects from S09 with a different artifact (complete loop instead of one-mechanic isolation). Rubric 3 permits analogous reuse; confirm the repeat is acceptable, or swap in a fresh gamedev source.
5. The nine points are named by the blueprint but not enumerated. The list in Inputs is authored from "vertical slice" practice plus the 10-minute metric (B:380), reuse (B:161) and save-as-untrusted (B:365). Confirm it matches the intended G2 DoD before the first slice.
6. Ownership is not named. C02 gives partner, designer, engineer and critic; the skill does not split the note (A02) from the build (A03), and S09 does in step 8. Naming both costs about 40 characters, which would push chars/4 to roughly 785 - still under 800 but outside the 720-780 band. Decide whether the band or the split matters more.
7. E08 counts attempts and the skill counts fixes on one point. Confirm they are the same counter, or say which one the stop condition reads.

Review: accepted 2026-11-26
