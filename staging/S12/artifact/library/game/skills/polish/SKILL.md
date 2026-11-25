---
name: polish
description: Polish a frozen build against budgets: profile, fix the biggest gap, check feel, accessibility and saves. Use after G2.5, before G3.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# polish

S12: after G2.5 nothing new enters; quality is the only work. R1 wants artifacts, R10 bounds the round, R9 prices it.

## Trigger

- G2.5 passed and features are frozen; work until G3.
- Not before G2.5, and not for mechanics, content (S11) or release (S13).

## Inputs

- Budgets: FPS, frame time, load time, memory, build size, each a number from `project.config.json` or the engine pack (N00). No number, no target.
- A runnable build, the scene that shows the problem, a save from the previous release, one human for feel.
- Open bugs with severity and steps.
- A contract (R10): goal, `max_files`, `max_minutes`, a checkpoint, and the `runs/AUTONOMY.jsonl` log.

## Steps

1. **Freeze the list.** Record what is closed; a new idea is parked with its cost (R9).
2. **Measure before.** Put FPS, frame time, load time, memory and build size against their budgets in `evidence/<YYYY-MM-DD>-polish/profile.md`: budget column, measured column, raw logs beside it (R1).
3. **Pick one gap.** Rank by measured/budget, take the largest. Park the rest with the number that justifies it: one gap per round beats five small ones.
4. **Fix and re-measure.** Change only what moves that number; same scene, same flags; keep the better result, revert the rest. Three attempts without movement: stop, escalate (E08).
5. **Feel pass.** With a human: input to visible reaction under 100 ms, hitstop length, shake, sound, camera; one pass line per item. Tune values only; a new effect is a feature.
6. **Accessibility.** Text size and readability, contrast to WCAG AA, colour never the only cue, rebinding, pause that works. Fixes only, no new screens.
7. **Saves.** Load a previous release save; if it fails, migrate and test old to new. Save data is untrusted input (X02).
8. **Triage bugs.** Severity, reproducible steps, regression test; fix blockers and regressions, park the rest. Not every bug is this round's.
9. **Prove and document.** Run S02 with a performance claim; update the card and `STATE.md` once green (R5); keep the profile table in the evidence folder, not the context (E10). G3 reads that folder.

## Output

- `evidence/<date>-polish/`: profile table before and after, feel note (D07), a11y checklist, save test, triaged list.
- Deferred gaps in `BACKLOG.md`; no publish, no spend (E12).
- A round report: gap, before and after, kept or reverted, deferred; numbers, not adjectives.

## Blocked

- No budget: FAIL, never profile against a guess.
- No human: feel pass blocked, not skipped.
- No old save: compatibility unproven, say so.

## Out of scope

New features and content, balance changes, refactors without a measured gap, store and release work (S13).

## Cross-refs

G2.5, G3, S02, S10, S11, S13; R1, R5, R9, R10; E08, E10, E12; D07.
