# Batch 6 Review

Date: 2026-11-25
Verdict: **PASS**

Batch 6 adds the game skills S10 (slice), S11 (content), S12 (polish),
S13 (release), and the first crew C01 (prototype-crew). All five parts were
built from nine sources each and reviewed against `docs/REVIEW-RUBRIC.md`.

## Parts

| Part | Agent | Size chars/4 | Size words×1.35 | Limit | Sources | Rounds |
|---|---|---:|---:|---:|---:|---:|
| S10 slice | game-designer | 775.50 | 730.35 | 800 | 9 (4/3/2) | 1 |
| S11 content | producer | 767.50 | 738.45 | 800 | 9 (4/3/2) | 2 |
| S12 polish | technical-artist | 745.25 | 657.45 | 800 | 9 (4/3/2) | 1 |
| S13 release | release-manager | 777.50 | 672.30 | 800 | 9 (4/3/2) | 3 |
| C01 prototype-crew | producer | 668.25 | 614.25 | 700 | 9 (4/3/2) | 2 |

## Review changes

- **S10**: accepted at 3,102 chars / 775.50 chars/4. The nine-point slice DoD
  is explicit, the playtest uses 3-5 strangers, and the G2 packet carries the
  evidence. The slice note is D07; `/next` is named but not built yet.
- **S11**: accepted after two revisions at 3,070 chars / 767.50 chars/4. R6 was
  removed: it governs the library, not game systems. G2.5 owns the feature
  freeze. D07 moved from per unit to per batch; S02 still checks the `content`
  claim per unit or small batch. Owners are named: A02 writes the playtest
  note, A03 builds and runs. `REPORT.md` and `JUSTIFICATION.md` were rewritten
  to match the final artifact.
- **S12**: accepted at 2,981 chars / 745.25 chars/4. The profile budgets,
  one-gap-per-round rule, feel pass, accessibility pass, save compatibility,
  and bug triage are all present. The profile budget numbers are game-specific
  and belong in `project.config.json`.
- **S13**: accepted after three revisions at 3,110 chars / 777.50 chars/4. The
  rating questionnaire, the 72-hour human watch, the no-publish output, and the
  P07 wording are fixed. The line is now `A human watches that channel for 72
  hours after launch`; an agent session cannot hold a 72-hour wall-clock shift.
- **C01**: accepted after one revision at 2,673 chars / 668.25 chars/4.
  `runs.jsonl` now lives under `prototypes/<YYYY-MM-DD>-<slug>/`; survivors are
  reported as report + log + capture. The crew is a temporary composition, not
  a permanent council.

## Smoke test

Disposable game:
`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-smoke-b6\smoke-game`

Result: **225 checks, 0 failures**.

Covered: 10 plain-text rules <=600 chars/4; 4 agents; 5 core skills + 8 game
skills + 1 crew; agent permission counts and deny rules; 31 V2 permissions;
`.env` and publish denies; Windows recursive-delete denies; skill sizes
700-800 chars/4; crew <=700 chars/4; docs/build S10-S13 and C01; no BOM/CRLF;
no placeholders; blueprint has `toolbox/` and `prototypes/`.

The bare template deliberately has no `default_agent`. N00 must set
`default_agent: partner` after copying the agent.

## Integration decisions

- `library/game/skills/` now holds `brainstorm`, `engine-choice`, `prototype`,
  `gym`, `slice`, `content`, `polish`, `release`.
- `library/game/crews/` now holds `prototype-crew.md`; slice and release crews
  are Batch 7.
- The game pipeline is complete end to end: brainstorm -> engine -> prototype
  -> gym -> slice -> content -> polish -> release.
- S11's R6 removal is deliberate: R6 is a library admission rule, not a game
  scope rule; R9 owns the budget and G2.5 owns the freeze.
- S13's 72-hour watch is a human duty, not an agent duty; the release report
  names the channel and the person.
- C01's `runs.jsonl` sits with the prototype, so a killed prototype keeps its
  log and capture in one folder.

## Open issues carried forward

- S10: `/next` command; D07 slice note format; G2 packet fields.
- S11: G2/G2.5 not authored; X02/P03/D06/D07 forward; save compatibility has no
  owner; "iterations" is undefined; chars/4 is the binding metric.
- S12: profile budget numbers; accessibility scope; save migration owner.
- S13: live-ops boundary; rating questionnaire storage; store assets and
  wishlist timing; no-publish output format.
- C01: `/prototype` command; `runs.jsonl` reader/owner; crew loading.
- General: N00 sets `default_agent`; `runs/questions.jsonl` parser (E04/CLI04);
  R10 `BLOCKING` deadlock resolved in light of R2.

## Next

Batch 7: C02 slice-crew, C03 release-crew, G0 concept brief, G1 fun, G2 slice.
Batch 8: G2.5 feature freeze, G3 ship, E01, E02, E04.
