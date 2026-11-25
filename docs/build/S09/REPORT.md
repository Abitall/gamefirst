# S09 gym — report

## Summary

`gym` is the part of the pipeline where game feel is found by playing, not by writing. The skill isolates one mechanic in a runnable scene, puts every knob on a live control with a declared range, fixes one question and one observable pass line, then runs 3-5 short iterations with a human watching silently. Each run ends in `lock`, `iterate` or `kill`; `kill` is advice to G1, which owns keep/kill/retune (R8). A lock is promoted into the real config and re-checked by S02. The session leaves a D07 playtest note at `docs/playtests/<YYYY-MM-DD>-<mechanic>.md`; `STATE.md` and `BACKLOG.md` carry the verdict and the parked knobs. The skill is a crew procedure: A02 owns the mechanic, question and note, A03 owns the scene, config and run.

## Revision

Round 2 of review. Two semantic changes and no structural change:

- Step 6 now marks `kill` as advice only and names G1 as the owner of keep/kill/retune (R8).
- Step 8 names both owners: A02 writes the note, A03 builds and runs the scene.

Both additions were funded by cuts, not by widening the file: 84 characters added, 98 removed, net -14.

## Artifact

`artifact/library/game/skills/gym/SKILL.md` — 52 lines, sections Trigger / Inputs / Steps 1-9 / Output / Blocked / Out of scope / Cross-refs.

## Size

| Metric | Value | Threshold | Result |
|---|---|---|---|
| Characters | 3,105 | — | — |
| chars/4 | 776.25 | <= 800 (target band 720-780) | pass, inside the band |
| Words | 522 | — | — |
| words x 1.35 | 704.70 | target band 720-780 | 15.30 under the band |

Both metrics are reported as required. chars/4 is the binding token proxy and lands inside the band with 25 characters of headroom. The word estimate is under, and the cause is structural rather than padding: a large share of tokens are backticked paths and IDs (`src/game/gym/<mechanic>/`, `src/data/gym/<mechanic>.json`, `docs/playtests/...`, `STATE.md`, `BACKLOG.md`), which count as one word each but several characters each. No required content was cut to reach the number; nothing was padded to fake it either.

## Checks

| Check | Result |
|---|---|
| Frontmatter parses; exactly `name`, `description`, `allowed-tools`; every tool in the allowed set | pass |
| UTF-8 without BOM, LF only, no tabs, no trailing spaces | pass |
| Non-ASCII characters limited to em dash and ± | pass |
| POSIX paths only; no backslashes or drive letters | pass |
| Cross-references resolve: R1, R7, R8, R9 exist; S02, S08, A02, A03 present in `staging/` | pass |
| Owners named where the work splits: A02 writes the note, A03 builds and runs (step 8) | pass |
| `kill` is marked as advice; no keep/kill/retune decision is claimed by gym | pass |
| Forward references: E08, E09 defined at blueprint lines 206-207 but not yet files; D07 format pending; S10 absent | open, see questions |
| Target directories exist: `template/docs/playtests/`, `template/src/game/`, `template/src/data/`, `library/game/skills/` | pass |
| No code, imports, engine API calls or shader/asset assumptions; `F1` is a key name, `slider, key, console` are generic | pass |
| No secrets, hosts, network calls, commit, publish or destructive command | pass |
| No rule text restated: the only repeated content is R8's 3-5 runs and 15-20 minutes, carried as the executable procedure and attributed to R8 | pass, noted |
| Loads alone: valid YAML, no external files needed | pass |
| Windows-safe names: hyphens only; `<YYYY-MM-DD>` is placeholder notation, same as `S02:31` | pass |

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | Every unit is mapped in `JUSTIFICATION.md`. Two overlaps are disclosed there (trigger exclusions vs out of scope; R8's numbers repeated as procedure). The `kill` clause and the two owners each remove a concrete misreading. |
| 2 | Function | pass | Trigger, inputs, nine steps, output, blocked, scope. Done is a note plus a green S02, not a claim. |
| 3 | Evidence | pass | Nine repositories, 4/3/2, with URL, stars on 2026-11-25, license, artifact, borrow and reject; four dead ends explained; no code copied; the GPL source is idea-only. |
| 4 | Fit | pass | Game layer, no engine imports; paths and IDs follow the blueprint; no contradiction with R1/R7/R8/R9; priority respected (rules own their content). |
| 5 | Size | pass, flagged | 776.25 chars/4 against 800; words x 1.35 at 704.70 is under the 720 band, explained above. |
| 6 | Language and encoding | pass | Body English, user-facing note RU per D07, UTF-8 without BOM, LF, POSIX paths. |
| 7 | Security | pass | External material treated as data, no secrets, no side effects, licenses checked and recorded. |
| 8 | Testability | pass with cost note | The check is the D07 note with a pass line per run plus S02 step 6; no automated fixture can judge feel, and the failure message is explicit ("no criterion, no result"; "done in chat is not done"). |
| 9 | Integration | pass with concerns | Stable IDs and paths; three forward references (D07, S10, E08/E09 as files). |

## Open questions

1. **D07 is not authored yet.** Gym fixes the note fields S02 will cite: build, scene, minutes, question, values per run, observations, quotes, confusion points, verdict. If D07 lands with a different field list, S02 and gym disagree.
2. **S10 is absent.** "Before the slice" and "copy to the real config" are forward references until the slice part names its config path.
3. **Does `src/game/gym/` ship?** Nothing says whether gym scenes are stripped from release builds; a dev-only entry point would answer it.
4. **3-5 runs per session vs E08's three attempts.** Session length and failed attempts are different axes, but the two numbers sit close enough to read as one rule. Confirm they are independent counters.
5. **Word metric.** For path- and ID-heavy skills, words x 1.35 understates length. If 720-780 must hold on both metrics, the ruling needs to say which one binds.

Closed in this revision: `kill` vs G1 (step 6: gym recommends, G1 decides); the A02/A03 split (step 8 names both owners, so the crew requirement is explicit rather than discovered).

Review: accepted 2026-11-26
