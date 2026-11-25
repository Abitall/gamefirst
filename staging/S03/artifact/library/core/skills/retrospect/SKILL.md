---
name: retrospect
description: Turn stage evidence into one lesson and one change, recorded once.
allowed-tools: Read, Glob, Grep, Write
---

# retrospect

S03 and `/retro`: close a stage with one lesson and one change, not a narrative. R6 owns what happens to a rule.

## Trigger

- A gate decides (G1, G2, G3), pass or fail.
- Three attempts are spent on one failure (E08), or a playtest surprises you (R8).
- Before the next stage opens.

## Inputs

- Evidence behind every claim: `evidence/`, build output, `runs/*.jsonl`.
- The diff or artifact the stage touched.
- `docs/playtests/*.md` when a human played (D07).
- `STATE.md`: stage budget, gate state, active parts; `runs/AUTONOMY.jsonl` when the stage ran under a contract (R10).

## Steps

1. Take only claims an artifact proves, verified by S02 when a command exists. A claim with no artifact is "failed".
2. Split the list into observation (what a file, log, or person showed) and interpretation (what you think it means). Delete interpretations with no observation under them.
3. Name one root cause: the cause whose removal makes the other symptoms disappear.
4. Pick the smallest change that addresses it — clarify an existing rule or skill before adding a part (R6 ladder).
5. Write the check and the date that prove the change worked. A change with no check is a wish.
6. Write the five lines to `docs/retro/<YYYY-MM-DD>.md` and one pointer line to `STATE.md`.
   That file and that pointer are the done check. A second retro on the same day adds `-2`.
   A failed attempt stays in the file after the fix lands; a later entry points back to it
   instead of rewriting it.
7. Same failure in two retros: propose a rule, skill, or eval through R6 with trigger, input,
   output, and done check. Otherwise stop at the lesson; a single annoyance goes to `NOTES.md`
   or `lessons/`, not into the five lines.

## Output

```
Worked:  <observation - evidence path>
Failed:  <observation - evidence path>
Why:     <one root cause>
Change:  <smallest change, owner, one thing added or deleted>
Next:    <check, date, next action>
```

One owner per change, one page. A retro that needs two pages is two retros. A lesson that must
outlive the project goes to M01 as a memory item; a result that must be re-checked goes back to S02.

## Failure behavior

- No evidence for a claim: write `Failed: no evidence for <claim>` and treat it as the finding.
- Two changes look necessary: keep the one with a check, park the other in `BACKLOG.md` (R9).
- A change you cannot check ("communicate better", "be careful") is not a change: name the artifact it leaves, or drop it.
- A person or model is named as the cause: restate it as the decision or the missing check that let it happen.
- The stage passed: still write all five lines; "Worked" names what to protect, and the change is the check that keeps it.

## Out of scope

Deciding whether the game is fun (R8), admitting memory (E07/M01), changing a rule (R6), adding a
tool (R6, then S05), importing an external practice (S04), running the gate (A01). A retro never
blocks a stage; it feeds the next one.
