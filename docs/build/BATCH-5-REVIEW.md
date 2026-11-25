# Batch 5 Review

Date: 2026-11-25
Verdict: **PASS**

Batch 5 adds the tool skill S05 (tool), and the game skills S06
(brainstorm), S07 (engine-choice), S08 (prototype), and S09 (gym). All five
parts were built from nine sources each and reviewed against
`docs/REVIEW-RUBRIC.md`.

## Parts

| Part | Agent | Size chars/4 | Size words×1.35 | Limit | Sources | Rounds |
|---|---|---:|---:|---:|---:|---:|
| S05 tool | lead-programmer | 777.50 | 706.05 | 800 | 9 (4/3/2) | 1 |
| S06 brainstorm | game-designer | 762.75 | 756.00 | 800 | 9 (4/3/2) | 2 |
| S07 engine-choice | technical-director | 773.25 | 688.50 | 800 | 9 (4/3/2) | 1 |
| S08 prototype | game-designer | 772.50 | 714.15 | 800 | 9 (4/3/2) | 1 |
| S09 gym | game-designer | 776.25 | 704.70 | 800 | 9 (4/3/2) | 2 |

## Review changes

- **S05**: accepted at 3,110 chars / 777.5 chars/4. Added `toolbox/` to the
  game blueprint tree; the library source is `library/toolbox/`. The report
  keeps two open questions: `VERSION` vs `agent.lock.json`, and the missing
  S02 claim type for a tool.
- **S06**: accepted at 3,051 chars / 762.75 chars/4. The `When` / `Blocked`
  header variant is deliberate and matches S01; a separate cross-refs section
  would duplicate inline IDs. The report was written after the follow-up.
  Nine sources, with two reused from R7 for different artifacts and disclosed.
- **S07**: accepted at 3,093 chars / 773.25 chars/4. The weighted matrix has
  no single public repository to copy; the matrix was synthesized and the
  report says so. D03 is the decision, D08 the annex; version pin and pitfalls
  are part of the engine pack gate.
- **S08**: accepted at 3,090 chars / 772.5 chars/4. Added `prototypes/` to the
  game blueprint tree. The skill keeps one question, a 1-2 day timebox,
  greybox, HUD, telemetry, capture, and a verdict; the build itself is
  disposable.
- **S09**: accepted after one revision at 3,105 chars / 776.25 chars/4.
  `kill` is now explicitly advice only: G1 owns keep/kill/retune (R8). Step 8
  names the owners: A02 writes the `docs/playtests/` note, A03 builds and runs
  the scene. The trim removed duplicated budget and path wording.

## Smoke test

Disposable game:
`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-smoke-b5\smoke-game`

Result: **179 checks, 0 failures**.

Covered: 10 plain-text rules <=600 chars/4; 4 agents (partner primary;
critic/designer/engineer subagents); 9 skills (5 core: verify, research,
retrospect, import, tool; 4 game: brainstorm, engine-choice, prototype, gym);
31 V2 permissions; `.env` and publish denies; Windows recursive-delete denies;
agent permission counts; skill sizes 700-800 chars/4; no BOM/CRLF; no
placeholders; all ten build doc sets present; blueprint has `toolbox/` and
`prototypes/`.

The bare template deliberately has no `default_agent`. N00 must set
`default_agent: partner` after copying the agent.

## Integration decisions

- `library/core/skills/` now holds `verify`, `research`, `retrospect`,
  `import`, `tool`.
- `library/game/skills/` now holds `brainstorm`, `engine-choice`, `prototype`,
  `gym`. The game library is no longer empty.
- S05's `toolbox/` and S08's `prototypes/` are in the game tree.
- S09's gym scene lives under `src/game/gym/<mechanic>/`; its live values live
  under `src/data/gym/<mechanic>.json`. Both are subfolders of existing
  top-level paths, not new roots.
- S06 writes `BRIEF.md`; S07 records D03/D08; S08 writes the prototype verdict;
  S09 writes the playtest note through A02.

## Open issues carried forward

- S05: `VERSION` vs `agent.lock.json`; S02 has no claim type for a tool.
- S06: header variant; source reuse with R7; two repositories without a
  detected license; BMAD counted as an AI-agent source; `spark` has no own ID
  (it is defined in R7).
- S07: no public weighted-matrix repository; D03/D08 annex; engine pin and
  pitfalls depend on the engine pack.
- S08: the one-question and 1-2 day timebox are defaults; greybox and capture
  are evidence, not a product build.
- S09: D07 is not authored yet; S10 is absent; the release fate of
  `src/game/gym/` is open; 3-5 gym runs vs E08's 3 attempts are different
  axes; the word metric is below 720 because paths and IDs are dense.
- Global: N00 must set `default_agent: partner`; S02 needs claim types for
  behavioral skill tests and tools.

## Next

Batch 6: S10 slice, S11 content, S12 polish, S13 release, C01 prototype-crew.
