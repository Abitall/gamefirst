# STATE

One page, English. The only page that says where the game is now: rewrite it in place, one fact per line, never append.
Replace every `[...]` and delete its prompt; an empty field reads as `not recorded`. History goes to `DECISIONS.md` (D03), ideas to `BACKLOG.md` (D05); `/status` (SL02) and `/next` (SL03) read these headings.

## Phase
[stage: G0, prototype, G1, core loop, G2a, vertical slice, G2, G2.5, content, polish, or G3; it moves when a gate line says so]

## Mode
[discuss, prototype, production, autonomous, or review; `/start` recommends one (SL01)]

## Active
- [part ID and short name in play now; one per line; a part not listed is not in play; `/status` counts the parts in `agent.lock.json` (CLI01)]

## Next
[one action, verb first, finishable in this session, not a plan (R5); `/next` takes this line as given (SL03)]

## Blocked
[none; or what stops work; a hard stop is a `BLOCKING —` question and then you wait (R2)]

## Gate
- [one line per gate or checkpoint: `G1 fun: passed 2026-11-20 (evidence/2026-11-20-g1/)`; outcome is passed, revised, or failed; A01 writes it and the human decides]

## Budget
- [copied from the gate that set it: features in play; content in numbers; cut list in order; over budget means cut; after G2.5 no new feature (R9)]

## Questions
- [at most 3 per stage; log each in `runs/questions.jsonl`; Q1/3 - question? Recommend: answer because reason. Or: you decide.]

## Autonomy
[none; autonomous mode needs ten bullet lines: goal, constraints, done, allowed, stop, budget, checkpoints, log, report, escalation (R10)]

## Since
[YYYY-MM-DD; last change to this page; `/status` prints project start from `agent.lock.json`]
