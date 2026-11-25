# Batch 7 — review

**Verdict: PASS.** Five parts accepted: two crews, three gates. The assembled tree has 10 rules, 4 agents, 13 skills, 3 crews, and 3 gates.

## Parts

| ID | Artifact | chars/4 | Lines | Sources | Rounds |
|---|---|---|---|---|---|
| C02 | `library/game/crews/slice-crew.md` | 636.25 | 35 | 9 (4/3/2) | 2 |
| C03 | `library/game/crews/release-crew.md` | 628.00 | 37 | 9 (4/3/2) | 2 |
| G0 | `library/game/gates/G0-concept-brief.md` | 466.00 | 43 | 9 (4/3/2) | 1 |
| G1 | `library/game/gates/G1-fun.md` | 429.50 | 43 | 9 (4/3/2) | 2 |
| G2 | `library/game/gates/G2-slice.md` | 450.30 | 36 | 9 (4/3/2) | 2 |

## Review changes

- **C02.** Artifact accepted unchanged. The subagent hit the step limit twice with only the artifact written; `JUSTIFICATION.md`, `SOURCES.md`, and `REPORT.md` were completed in the repair and later replaced with the subagent's full versions, including quotes. The justification has 34 units and 11 omissions; sources are 4/3/2. Evidence is 8/9: Veloren has 21 stars, the polygons repo is stale, and Unity open-project-1 is archived; the report records these instead of hiding them.
- **C03.** Accepted with notes. `butler` (1,012★) and `kubernetes/sig-release` (644★) are below the 1k comfort line; both are justified for artifact shape, not popularity. “All four, or no crew” is read as four input groups, not four items. The 72-hour watch is assigned to a named human after the crew disbands.
- **G0.** Accepted. It is explicitly not a gate; it turns S06 into one page and a go/revise decision. One-page limit and D01 routing stay open.
- **G1.** Accepted after three semantic fixes: `Four artifacts:` (success criteria are written before the build, not in the same session), `The human decides` (not the developer), and `keep — proceed to the slice (S10)` (the old line sent the project back to the core loop it had just judged). Final 429.5.
- **G2.** Accepted after the Input fix: the S10 packet is five parts, and the project's system cards (D06) are separate. “Incomplete packet, G2 does not start” kept.

## Smoke test

- Script: `C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b7-smoke.mjs`
- Game: `C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-smoke-b7\smoke-game`
- **119 checks, 0 failures.**
- Counts: 10 rules, 4 agents, 13 skills, 3 crews, 3 gates.
- Permissions: 31, V2 array; shell ask, `git push` deny, Windows recursive-delete deny, `.env` deny.
- Encoding: UTF-8 without BOM, LF only; no placeholders; `default_agent` still absent (N00 sets `partner`).

## Integration decisions

- Gates live in `library/game/gates/`; crews in `library/game/crews/`. Both are loaded by the partner, not by the runtime as skills.
- C02 owns the G2 packet; C03 owns the release crew and the 72-hour human watch after disband.
- G1 judges the loop, G2 judges the nine-point slice; neither reopens the other's question.
- C02's `settings` is a menu sub-item, not a tenth DoD point.

## Open issues

1. C02 evidence quality: Veloren has 21 stars, the polygons repo is stale, and Unity open-project-1 is archived; quotes are present but the source pool is weaker than C03's.
2. C03 “All four, or no crew” is editorial; four input groups are intended.
3. G1 leaves open who signs when an external tester, not the user, gives the verdict.
4. D07 is still a blueprint ID; S09/S10/C02 cite it. Batch 8 does not create it.
5. G2.5 and G3 are next; they must not add a tenth point to G2.

## Next

Batch 8: G2.5 feature freeze, G3 ship, E01 small change, E02 no invented API, E04 question budget.
