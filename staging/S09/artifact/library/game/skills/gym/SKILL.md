---
name: gym
description: Tune one mechanic with a human in an isolated scene: live knobs, 3-5 runs, lock or kill. Use after a prototype says keep.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# gym

S09: feel is found in a scene with a human (R8); R9 prices the scope.

## Trigger

- One mechanic needs tuning or feel after S08 says keep, before the slice, or where a system card guesses values.
- Not for a whole game, content (S11), polish (S12); no human: blocked (R8).

## Inputs

- One mechanic, its one question, and a hypothesis with expected effect and range, written first. Two mechanics are two gyms.
- Every knob with unit, range, default; a knob without a range is a guess.
- A gym scene: playable within 10 s, no menus.
- A human with 15-20 minutes, present or on the build.

## Steps

1. **Isolate.** Put the mechanic in `src/game/gym/<mechanic>/`: one scene, the real code path, nothing else; a copy that lies tunes nothing.
2. **Expose.** Move every knob to `src/data/gym/<mechanic>.json`, bound to a live control — slider, key, console; change shows next frame, no rebuild. Show values and state on screen (`F1`).
3. **Fix the question and the pass line** before the first run: one sentence ("dash feels floaty"), one observable criterion ("reaches the ledge in 0.4-0.6 s"), one knob. No criterion, no result.
4. **Build the minimum.** A box, the mechanic, the readout: no art, audio, score, menu.
5. **Run 3-5 iterations per session, 15-20 min each.** One change; the human plays, you watch silently, then ask. Record values, what happened, verbatim words; a cleaned-up quote is your opinion.
6. **Decide after each run** in one line: `lock`, `iterate` (one knob, one direction), or `kill` (advice only; G1 owns keep/kill/retune, R8). 3 alternatives before the next value, not ±5% (R7). Boring is a result: name it and `kill` (E09). Three runs without gain: stop, escalate (E08).
7. **Lock, then promote:** record values and the criterion met, copy to the real config, delete gym-only controls, run S02 in the real build. No promotion before lock.
8. **Write** the note (A02) at `docs/playtests/<YYYY-MM-DD>-<mechanic>.md` per D07 (RU, one page): protocol (build, scene, minutes, question), values per run, observations, quotes, confusion points, verdict; A03 builds and runs; S02 cites the note.
9. **Update** `STATE.md` (verdict, next step) and `BACKLOG.md` (parked knobs, ideas, R9); a locked value updates the card.

## Output

- The mechanic plays alone, knobs live; a D07 note with values, quotes, verdict, next step.
- On lock: values in the real config, S02 green, state and card updated.

## Blocked

- No human: blocked, not passed; never invent a session (R8).
- A knob needing a rebuild: fix the harness before the runs.
- Done in chat is not done (R1): the build ran, the note exists.

## Out of scope

Content, many mechanics (S11), polish (S12), the G1 loop (R8), the slice (S10); new ideas go to `BACKLOG.md` (R9).

## Cross-refs

R1 artifacts, R7 alternatives, R8 the human, R9 the budget; S02 check, S08 before, S10 after, A02 note, A03 build, D07 format.
