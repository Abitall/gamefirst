# G2 - slice

The human's verdict on the nine-point slice; the agent brings the packet, never the decision.

## Input

The S10 packet, complete: build, checklist with evidence per point, D07 note from 3-5 strangers, capture (CLI10), open questions with two options each (R7). Plus the project's system cards (D06). Incomplete packet, G2 does not start.

## Check

One line per point; no artifact, no pass; a missing point is a failed point.

1. Title and menu.
2. A goal ten minutes out; a clean run at 12 minutes or less, timed in D07.
3. One progression step on the path.
4. Win and loss, each reachable and readable on one screen.
5. Sound in the build.
6. A save that survives a restart.
7. A stranger plays with no hints; the D07 note records 3-5 testers.
8. Pause, restart, settings, and one build.
9. Content reused at least twice, a reuse row per unit.

## Decision

One line and a date, in `DECISIONS.md` and `STATE.md`: `proceed`, `fix`, or `pivot`.

- `proceed` - all nine. Write the content budget in numbers: units per type (levels, enemies, items, words, minutes), what each count includes and excludes, iterations allowed; then the ordered cut list, each cut with its cost and what the build loses. S11 freezes these numbers in `STATE.md`; G2.5 freezes features.
- `fix` - name the failed point and the missing evidence; S10 repairs, G2 re-checks that point only. A repair needing a new mechanic goes to S09 or `BACKLOG.md` (R9).
- `pivot` - the slice is boring or broken (E09). Keep the build, capture and D07 note; return to the G1 loop or the G0 brief with them.

## Out of scope

Content before `proceed` (S11), polish (S12), release (S13), a second loop, a new engine. No dated decision line, no next stage.

Cross-refs: S10, S11, S12, G2.5; R1, R8, R9, R10; D06, D07, CLI10, E03.
