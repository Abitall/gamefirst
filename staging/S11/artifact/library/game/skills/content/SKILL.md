---
name: content
description: Fill approved systems to the G2 content budget - one unit at a time, reuse first, cut list ready, each unit validated in the running build. Use after G2 proceed; not for new mechanics, systems, or polish.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# content

S11: the slice proved the systems (S10); content fills them to the count G2 wrote, and not one past it. R9 owns the budget, G2.5 freezes features, R1 wants a count and a sample.

## Trigger

- G2 says proceed and the slice is accepted: systems and data paths exist.
- Not for a mechanic or system (G2.5), tuning (S09), polish (S12), or content with no G2 number.
- G2.5 freezes features: content and polish only.

## Inputs

- The G2 record: units per type (levels, enemies, items, words, minutes), what the count includes and excludes, and iterations allowed.
- The cut list in order: what leaves first, its cost, and what the build loses.
- The reuse matrix: each unit, its approved system, the existing asset or config entry it reuses; a unit with no row is new scope.
- Running build, system cards (D06), asset license rules (X02, P03).

## Steps

1. **Freeze the numbers** in `STATE.md`: counts, iterations, cut order. A number not written is not a budget (R9).
2. **Fill the reuse matrix first**: each unit names its system, reused asset or entry, one delta. A unit that reuses nothing is new scope: park it (R9, E06).
3. **Take one unit at a time**, safest first: the cut list's last, so a cut costs one unit.
4. **Add data, not code**: values go to `src/data/`; a number hardcoded in a system is a bug, not content.
5. **Record a license** for every imported asset (X02, P03); none ships without one.
6. **Validate in the running build**: count matches, one sample per batch played end to end, one D07 note per batch; data alone is not done (R1).
7. **Run S02** with the `content` claim per unit or small batch; a red check stops production, not the budget.
8. **Keep saves loadable**: an old save loads with the new content, or the unit does not ship (X02).
9. **Cut before extending**: when time or count runs out, cut in list order; over budget means cut or park, never expand (R9).
10. **Report** produced against budgeted counts, cuts, reuse share, open questions; update `STATE.md` and `BACKLOG.md`.

## Output

- Content at the G2 count inside approved systems, each unit by a count and S02 check; each batch by one sample and one D07 note.
- A cut record and a reuse matrix checked line by line.

## Failure behavior

- No budget at G2: stop, ask for the number (R2); content with no number cannot be cut.
- A unit needs a new system: park it (E06), cut it.
- Three units fail validation: stop and escalate (E08); the system, not the content, is broken.
- Autonomous: R10 contract, a checkpoint per unit batch.

## Out of scope

New mechanics, systems, modes (G2.5); tuning (S09); polish (S12); release (S13); marketing (P07). Ideas go to `BACKLOG.md` (R9).

## Cross-refs

G2, G2.5, S02, S09, S10, S12, R1, R2, R9, R10, E06, E08; D06, D07, X02, P03.
