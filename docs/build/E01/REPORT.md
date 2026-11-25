# E01 — Report

## Summary

`E01-small-change.md` is one eval case in the shared blueprint format. It
measures blast radius: a single tuning value moves from 10 to 15, and the
correct run touches the data file, the test, and exactly one system card. The
`src/score.mjs` reader and every intent document stay byte-identical.

Design choices:

- **The value lives in `data/balance.json`, not in code.** The prompt names the
  file, so the eval measures diff discipline rather than search. A hardcoded
  constant would have made the task a code edit and contradicted the project
  rule that gameplay values are data-driven.
- **The test carries the proof.** It asserts both the config value (10 → 15)
  and the score (`score(10, 3)` 12 → 13), so a config change without a test
  update fails. Weakening the assertion is an explicit Fail bullet.
- **Exactly one doc may move.** `docs/systems/score.md` states 15% once and
  cites `verified by: tests/score.test.mjs`. `GAME.md` (intent) and
  `DECISIONS.md` (append-only decisions) are the tempting targets and are
  named in Fail.
- **The check is executable.** `npm run check` runs `node --test` and
  `verify-docs.mjs` (page limit, links, `verified by`); a green log after the
  last edit is required.
- The fixture is dependency-free Node, offline, under 2 s. The tree is
  described but not built in this staging part.

## Size

- Characters: 1977. Words: 288. Estimated tokens: 494.25 (characters / 4).
- Threshold: 500 tokens for an eval. Status: within, 5.75 tokens of headroom.
- Lines: 43 (target 35–45).
- Encoding: UTF-8 without BOM, 2037 bytes, LF only, zero CRLF, POSIX paths.
- The first draft was 2531 bytes (~620 tokens); Setup, Expected, several
  Pass/Fail bullets and the fixture comments were tightened, and the config
  move added a tree line without adding prose.

## Checks

| # | Check | Method | Result |
|---|---|---|---|
| 1 | Size under 500 tokens | `wc`-style count, characters / 4 | PASS - 1977 chars, ~494.25 |
| 2 | Line count 35–45 | split on LF | PASS — 43 |
| 3 | Format matches E03/E02 | section-by-section read | PASS — title, Tests, Setup, Prompt, Expected, Pass, Fail, Score, Fixture, Runner, Links |
| 4 | Pass names the three files and one doc | read | PASS — `data/balance.json`, `tests/score.test.mjs`, `docs/systems/score.md` |
| 5 | Fail covers GAME/DECISIONS, new doc, weak test, skipped check | read | PASS — four bullets |
| 6 | Value is data-driven, not hardcoded | read | PASS — config row; `src/score.mjs` "reads config" |
| 7 | `verified by` present and resolves | read | PASS — card cites `tests/score.test.mjs` |
| 8 | Cross-references exist | checked against rules and Blueprint | PASS — R5, R6, D03, D06, CLI03 |
| 9 | Sources are 9 repositories, 4/3/2 | count in `SOURCES.md` | PASS — 4 gamedev, 3 software, 2 AI-agent |
| 10 | Encoding and write scope | Node byte check; `Get-ChildItem` | PASS — no BOM, LF, only `staging/E01/` |

## Rubric self-check

| Section | Verdict | Note |
|---|---|---|
| 1 Necessity | PASS | Every unit is in `JUSTIFICATION.md` with a removal consequence. |
| 2 Function | PASS | Trigger: a tuning request arrives. Input: the fixture and one prompt. Output: a diff, a test line, a check log. Done: every Pass bullet. Failure: any Fail bullet; a blocked run is a FAIL with the log quoted. Scope: change locality, not code quality. |
| 3 Evidence | PASS | Nine sources, 4/3/2, each with URL, stars as read on 2026-11-25, license, artifact, borrow, reject; dead ends listed. |
| 4 Blueprint fit | PASS | Core layer, engine-agnostic, no project content, uses R5/R6/D03/D06/CLI03; matches E01 "A tuning change touches at most two documents." |
| 5 Size | PASS | ~494.25 tokens against the 500 threshold; 5.75 tokens of headroom. |
| 6 Language and encoding | PASS | English, UTF-8 no BOM, LF, POSIX paths, Windows-safe names. |
| 7 Security | PASS | No secrets, no network, no publish; the fixture is local and read-only outside its scratch copy. |
| 8 Testability | PASS | One binary verdict; the diff stat, test line and exit code are the evidence; failure names the file. |
| 9 Integration | PASS | Stable ID `E01`, links resolve to blueprint IDs, no engine or OS assumption. |

## Open questions

1. **The fixture is not built.** The tree in the eval is a specification. A
   reviewer must create `evals/fixtures/E01/` and confirm that
   `score(10, 3) === 12` with `comboStepPct: 10`, and 13 with 15. Until then
   this review scores the description only.
2. **How the test sees the config.** The eval requires the test to assert both
   15 and 13. The fixture can either export `comboStepPct` from `src/score.mjs`
   or read `data/balance.json` directly in the test. Recommendation: export the
   loaded constant from `src/score.mjs`, so the test does not duplicate the
   loader and the "reads config" row stays true.
3. **Hash and CI.** No fixture hash or CI job is pinned yet; CLI04 does not
   exist. Once it does, hash the fixture tree and run `npm run check` in the
   job, not only by hand.
4. **`GAME.md` language.** The fixture is English; D04 says Russian. The eval
   does not read the prose, but a future fixture should either mirror the
   Russian brief or state that the fixture is language-neutral.

## Known weaknesses

- The blueprint ceiling is "at most two documents"; the eval requires exactly
  one. This is stricter by design: a tuning value has one home, and the prompt
  does not change intent. A reviewer may still call it over-strict.
- E01 and E03 both use `src/score.mjs` and combo scoring. E03 uses
  `comboBonus(base, combo)` with a hardcoded step; E01 uses `score(base, combo)`
  with a config. The fixtures must be built separately and not merged.
- Phaser (40,779) was last pushed 2026-08-21, the least current source. It was
  kept because JSDoc-in-source is the model closest to this TypeScript project.
- The ADR repository is non-commercial licensed; only its one-sentence
  definition was read and quoted, with no template reuse.
- Star counts are the values served on 2026-11-25 and will drift.

## Review

Review: pending
