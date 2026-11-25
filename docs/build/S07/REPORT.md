# S07 engine-choice - report

## Summary

`engine-choice` is a one-page `library/game` skill that turns "which engine?" into a scored, spiked, pinned decision. It separates must-haves from nice-to-haves, scores 3-5 candidates on a visible weighted matrix, checks each finalist's current version and pitfalls, runs a one-day spike on the top two with six fixed probes, records the outcome in `DECISIONS.md`, pins the exact version in `AGENTS.md` and the engine pack, and names the fallback and the revisit triggers. Core stays engine-agnostic: candidates and facts come from the project and its packs, not from the skill.

The artifact is 3,093 characters, 48 lines, **773.2 tokens by chars/4** and **688.5 by words x 1.35**, both under the 800 threshold.

## Design decisions

1. **Eight steps, last one is a revisit trigger.** A decision without a reopen rule is re-litigated by mood or never revisited. The KEP implementation-history pattern (#6) and radar blip movement (#7) both make the reopen event explicit.
2. **Matrix and spike log live in `docs/engine/`, the D03 entry links to them.** D03 is capped at ten lines per decision; the matrix does not fit and should not be compressed into it. One fact, one place (R5).
3. **The fallback is the second spiked engine.** A fallback that was never run is a guess. Because both finalists are spiked, the fallback costs no extra day.
4. **Six probes fixed before the spike.** Input, movement, collision, UI, save, export. Scores are defined before the first engine is touched, so the second run is comparable (lm-eval fixed battery, #8).
5. **Popularity is an input row, never a criterion.** Stars and tutorial counts appear as community evidence; the matrix never weights them directly, and `SOURCES.md` says why.
6. **Pin in three places that must agree:** `AGENTS.md`, the pack's `engineRange`, and the pack selftest. E11 checks the last two; the first is the human-readable truth.
7. **R6 gates a migration.** Per the brief, switching a running project needs the same proof as a new library part: repeated failure in two sessions or a measured gap.
8. **No engine list, no recommendation.** Engine facts belong to the pack (N00); a list in core would age badly and break the layer rule.
9. **One day per finalist, not per candidate.** The budget (R9) buys two spikes; a longer study is a prototype (S08).

## Size

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Bytes | 3,093 | - | - |
| Characters | 3,093 | - | - |
| Words | 510 | - | - |
| chars/4 | 773.2 | <= 800 | PASS, inside 720-780 |
| words x 1.35 | 688.5 | <= 800 | PASS |
| Lines | 48 | one page | PASS |
| Line endings | LF | LF | PASS |
| Encoding | ASCII | UTF-8, no BOM | PASS |
| Tabs / trailing spaces | 0 / 0 | 0 | PASS |

chars/4 is the declared gate; words x 1.35 reads lower because the text is path- and hyphen-heavy.

## Checks run

- Four files exist at the required paths; the artifact was written first.
- Frontmatter: `name`, one-line `description`, `allowed-tools` limited to the eight declared tools.
- Shape matches `verify` / `research`: `# name`, ID-prefixed thesis, Trigger, Inputs, Steps, Output, Boundaries, Cross-refs.
- Encoding: no BOM, LF only, no tabs, no trailing whitespace, ASCII only.
- Cross-refs R1, R3, R6, R9, S01, S02, S08, N00, D03, D08, E11 resolve to blueprint IDs; no rule or skill is restated.
- No engine name, install command, OS path, or editor assumption in the artifact.
- `SOURCES.md`: exactly nine repositories, 4 gamedev / 3 software / 2 AI-agent, stars dated 2026-11-25, licenses recorded, dead ends honest.
- No text copied from any source.

## Interface assumptions

1. **D03 vs. the matrix.** D03 allows ten lines per decision; the weighted matrix and spike log are an annex in `docs/engine/` (D08), linked from the entry. If D03 forbids annexes, the matrix has no legal home and either D03 or S07 must change.
2. **S02 claim type.** The export probe is recorded as a release/build claim. S02 has no `engine` claim type; the skill assumes the release row covers an export check.
3. **R2 staging.** Installing an engine or accepting a license is a question charged to the stage running S07 (prototype or pre-project). The blueprint has no dedicated engine stage.
4. **R6 by analogy.** R6's proofs are written for library parts; the brief applies them to engine switches. The skill does that, but R6 itself does not name engines.
5. **E11 scope.** E11 checks that the pack matches the pin and passes its selftest. The spike evidence has no eval; if one is added, E11 is its natural home.
6. **N00 field name.** Step 7 relies on the pack manifest field `engineRange` exactly as the blueprint names it.

## Cross-reference flags

- **S01** must accept a finalist-facts brief: version, release notes, pitfalls, docs, export target, license, community. Its current scope is sources; vendor docs and release notes are assumed in scope.
- **S02** is used for export only; a full store submission is out of scope.
- **S08** is the escape hatch when the spike is inconclusive: prototype deeper, then return. S07 does not choose an unspiked engine.
- **D08** is created by S07 if absent; its 1-2 page format is the blueprint's, not this skill's.
- **N00** consumes the revisit triggers through the `upgrade` path; S07 only records them.

## Open questions

1. Does D03 permit a linked annex, or must the matrix be inline, which would require raising the ten-line cap?
2. Which stage pays the R2 install question when the project is pre-prototype and no stage exists yet?
3. Who reads the revisit triggers at each gate: the producer, or a scheduled S07 rerun? `STATE.md` is the obvious carrier, but S07 does not own it.
4. Does S02 need an `engine` claim type for spike exports, or is release enough?
5. Is the "pack version equals `AGENTS.md` pin" agreement tested anywhere besides E11's selftest?
6. Is one day enough for a 3D engine, where asset import and shader compile can consume the first hour? The text accepts the risk; the only mitigation is "one probe at a time".

## Known weaknesses

- Star counts are a snapshot and a popularity proxy. The "never a criterion" line limits the damage but does not remove the bias.
- Docs quality and community health are judged, not measured; two reviewers can score them differently.
- The matrix is only as good as the input list. A missed must-have invalidates every score.
- A one-day spike favours engines with familiar tooling; the team-skills input corrects this only partly.
- License reading is manual. A dual-license engine can be misread, as MADR's own sidebar shows ("MIT" only, while the repository ships CC0 and MIT).
- S07 cannot detect that an engine pack is missing or stale; that is N00 and E11.

## Rubric self-check

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | No other skill owns pre-engine selection; trigger is distinct from A03 feature work. |
| 2 | Function | PASS | Trigger, inputs, eight steps, output, boundaries; done = six artifacts; failure = unspiked fallback. |
| 3 | Evidence | PASS | Nine live repositories, 4/3/2, exact artifacts, dead ends named, no copying. The absent public matrix is reported, not invented. |
| 4 | Fit with blueprint | PASS | `library/game` layer, no engine imports, IDs only, no contradiction, priority order respected. |
| 5 | Size | PASS | 773.2 chars/4 and 688.5 words x 1.35, both under 800. |
| 6 | Language / encoding | PASS | English, ASCII, LF, no BOM, no tabs, no trailing spaces. |
| 7 | Security | PASS | No install without permission, no spend, no publish, licenses recorded. |
| 8 | Testability | PASS | Cheap check: the record has a scored matrix, one log per spiked engine, a pin, and a fallback that was spiked. Failure names the missing artifact. |
| 9 | Integration | PASS | Stable names, refs resolve, loads alone, no engine/OS/editor assumption. |

Self-verdict: accept. External review decides.

Review: accepted 2026-11-26
