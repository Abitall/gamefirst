# Batch 4 Review

Date: 2026-11-25
Verdict: **PASS**

Batch 4 adds agents A02 (designer) and A03 (engineer), and skills S01
(research), S03 (retrospect), and S04 (import). All five parts were built from
nine sources each and reviewed against `docs/REVIEW-RUBRIC.md`.

## Parts

| Part | Agent | Size chars/4 | Size words×1.35 | Limit | Sources | Rounds |
|---|---|---:|---:|---:|---:|---:|
| A02 designer | game-designer | 677.75 | 540.00 | 700 | 9 (4/3/2) | 2 |
| A03 engineer | lead-programmer | 679.25 | 535.95 | 700 | 9 (4/3/2) | 2 |
| S01 research | general | 779.00 | 683.1 | 800 | 9 (4/3/2) | 1 |
| S03 retrospect | producer | 778.5 | 727.7 | 800 | 9 (4/3/2) | 2 |
| S04 import | technical-director | 773.0 | 700.7 | 800 | 9 (4/3/2) | 2 |

## Review changes

- **A02**: final measurement after the last edit is 677.75. Four files present;
  the report table and Size check were synced. No content change was needed.
- **A03**: evidence path aligned to `evidence/<date>-<claim>/`, matching S02
  and CLI10. The six open questions were closed: 18 permissions are correct,
  last-match-wins is confirmed, the global shell default is `ask`, `verified
  by` belongs in `docs/systems/<system>.md`, the evidence path is aligned, and
  S02 needs no separate skill load.
- **S01**: no revision. The skill is read-only, labels `know/think/guess`, and
  returns a one-page brief. The report's open questions are notes, not gaps.
- **S03**: two fit decisions recorded. `docs/retro/` was added to the blueprint
  tree; the five lines became `Worked / Failed / Why / Change / Next`, with
  add/delete inside `Change`, and the blueprint line was updated to match.
- **S04**: size table and rubric row were synced to 3,092 bytes / 519 words /
  773.0 chars/4. The source scan and license notes were verified.

## Smoke test

Disposable game:
`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-smoke-b4\smoke-game`

Result: **113 checks, 0 failures**.

Covered: 10 plain-text rules ≤600 chars/4; 4 agents (partner primary;
critic/designer/engineer subagents); 4 skills (verify, research, retrospect,
import); 31 V2 permissions; `.env` and publish denies; Windows recursive-delete
denies; agent permission counts; no BOM/CRLF; no placeholders; all five build
doc sets present.

The bare template deliberately has no `default_agent`. N00 must set
`default_agent: partner` after copying the agent.

## Integration decisions

- `library/core/agents/` now holds `partner.md`, `critic.md`, `designer.md`,
  `engineer.md`. Partner is the only primary; the other three are subagents.
- `library/core/skills/` now holds `verify`, `research`, `retrospect`,
  `import`. All four use the `SKILL.md` frontmatter shape.
- A02 and A03 permissions rely on last-match-wins. Neither adds a broad `read`
  allow, so the global `.env` deny survives. A03's shell rules are an allow
  list plus three publish denies; the global `shell * ask` covers the rest.
- A02 may ask the user directly through the question tool; A01 still owns the
  process and the stage budget.
- `docs/retro/` and the S03 five-line definition are now in the blueprint.

## Open issues carried forward

- S01: `allowed-tools` enforcement is harness-dependent; 15 minutes is a
  default, not a hard limit; "cross-check each fact" means "when a second
  source exists"; one page is a target, not a hard cap.
- S03: the `/retro` command (SL05) is not built yet; the `-2` suffix and the
  `library/lessons/` format owner still need a home.
- S04: S02 has no claim type for a behavioral skill test; this is the main
  integration gap. Failed bundles go to `library/lessons/`; admission is R6;
  `<slug>` is the source slug, the target ID is separate.
- A02: direct questions through the question tool, not through A01 relay;
  `docs/playtests/` permission is for protocol/questions, not invented notes.
- A03: `git commit` is covered by the global `shell * ask`; no allow rule.
- N00 must set `default_agent: partner`.

## Next

Batch 5: S05 tool, S06 brainstorm, S07 engine-choice, S08 prototype, S09 gym.
Do not start Batch 6 until Batch 5 is accepted and the four agents plus four
skills load together in a disposable game.
