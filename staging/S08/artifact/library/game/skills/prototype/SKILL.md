---
name: prototype
description: Answer one question about fun, feel, or feasibility in one to two days with a throwaway build. Use after brainstorm, before production; not for a known fix, content, or the slice.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# prototype

S08: buy one answer with a throwaway build. The code goes; the answer, capture, and report stay. R8 owns fun, R1 owns evidence.

## Trigger

- One question a document can't settle: is it fun, does it feel right, can the engine do it in time.
- After S06 and before production: the cheapest place to be wrong.
- Not for a known fix (S02), content (S11), a mechanic you keep (S09), or the slice (S10).

## Inputs

- The question, one sentence, answered yes or no, or by a number.
- Success and kill criteria set before the build: what result keeps it, what result kills it.
- Constraints: target platform, 1–2 days, what may be faked.
- Placeholders: rectangles, one font, sound only if that is the question; fake anything that can't change the answer.

## Steps

1. **Ask one question.** Write it at the top of the folder; a second question is a second prototype.
2. **Fix the criteria** before the first line of code: the number for success and the number for kill. No criteria, no build.
3. **Build in `prototypes/<YYYY-MM-DD>-<slug>/`** from the engine pack's empty scene (N00) on the target platform; no `src/`, no production code or assets.
4. **Greybox the smallest thing** that can produce the answer: one screen, rectangles, keyboard or touch. A feature that can't change the answer is cut.
5. **Add a debug HUD**: state, last input, key values. The player must read state without help.
6. **Log runs** to `runs.jsonl`, a line per attempt: time, input, result. A capture is not the record.
7. **Playtest 15–20 minutes with a human** (R8). Say what to try, then stay quiet; keep verbatim quotes in a D07 note.
8. **Capture 30–60 s** of the loop, not a menu or scripted scene.
9. **Answer** against the criteria: yes, no, or the number.
10. **Verdict**: keep, kill, or retune; one line and a date.
11. **Write** `REPORT.md`: question, method, observations, answer, verdict.
12. **Discard the build.** Promote the learning to S09 or S10; the code never graduates, and a new idea goes to `BACKLOG.md` (R9).
13. **Update** `STATE.md` (next action) and `BACKLOG.md` (what waits).

## Output

One folder holds the runnable build, `runs.jsonl`, the capture, `REPORT.md`, and the verdict. Two days with no answer is an answer: report it.

## Failure behavior

- No human: no fun verdict; G1 stays blocked (R8).
- Kill criteria hit: kill it, name why. A boring build is a result (E09).
- Timebox spent: stop, answer with what exists; never extend to save the build.
- Autonomous: R10 contract with `max_minutes` and a checkpoint report.

## Out of scope

Production code, assets, polish, content, a GDD, scope, a third day. A prototype never ships, never sets scope; A02 owns the question and criteria, A03 the build, R7/S06 next variants.

## Cross-refs

R1, R7, R8, R9, R10, S02, S06, S09, S10, A02, A03, G1.
