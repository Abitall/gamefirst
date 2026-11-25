---
name: slice
description: Build the nine-point slice after G1 keeps the loop, playtest it with strangers, hand a G2 packet to a human. Not for content, polish, new mechanics.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# slice

S10: the loop is fun (G1); the slice proves it can ship. One path a stranger finishes; R1 evidence, R8 the human, R9 the budget.

## Trigger

- After G1 keeps the loop and it already plays start to finish: add the frame the loop lacks.
- Not for a new mechanic (S09), content (S11), polish (S12), or a second loop. One slice, one ending.

## Inputs

- The kept loop, S09 values in the real config, and a build command (S02).
- The nine-point DoD as a checklist written first, one check per point: title and menu; a goal about 10 minutes out; one progression step; win and loss states; sound; a save that survives a restart; a stranger plays with no hints; production systems (pause, restart, settings, one build); content reused at least twice.
- 3-5 testers who have not seen the game, 20-30 minutes each.

## Steps

1. **Fix the checklist first.** No check, not done; a point that needs a new mechanic goes to S09 or `BACKLOG.md` (R9).
2. **Build the frame, not the world**: title, play, win or lose, restart; the loop stays as G1 left it.
3. **Set the 10-minute goal** and time a clean run; over 12, cut the path, not the loop.
4. **Add one progression step** on the path; a second waits in `BACKLOG.md` (R9).
5. **Wire win and loss to the same restart**, each readable in one screen.
6. **Add sound, save, then pause, restart, settings**; values in data, save data is untrusted input.
7. **Reuse content**: the same enemy, tile or prop appears at least twice; a one-use asset is scope creep.
8. **Playtest 3-5 strangers.** Say what to try, then watch silently; after the first run, ask them to think aloud. No leading questions ("was that clear?"). Log each confusion point with a timestamp and a verbatim quote; a cleaned quote is opinion.
9. **Write the D07 note** at `docs/playtests/<YYYY-MM-DD>-slice.md` (RU, one page): protocol, minutes to goal, per-point result, confusion points, quotes, verdict. Then assemble the G2 packet.

## Output

- The build on a clean machine, the checklist with evidence per point, the D07 note, a capture (CLI10), open questions with two options each (R7).
- G2 packet = checklist, note, build, capture, questions. The agent never decides the gate: the human answers proceed, fix or pivot, one line plus a date.

## Blocked

- No stranger: blocked, not passed; never invent a session (R8).
- Three fixes on one point without gain: stop, escalate (E08); a boring slice is reported as boring (E09).
- Done in chat is not done (R1): the build ran, the note exists, the capture plays.

## Out of scope

Content (S11), polish (S12), a second loop, a new engine, a store page (S13); autonomy uses R10; new ideas go to `BACKLOG.md` (R9).

## Cross-refs

R1 evidence, R7 options, R8 the human, R9 budget, R10 contract; S02 build check, S08 before, S09 mechanics, S11 content after; D07 note format, G2 decision, CLI10 capture.
