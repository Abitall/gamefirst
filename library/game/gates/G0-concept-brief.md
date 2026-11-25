# G0 - concept brief

G0 is not a gate. It runs after S06, before prototype code: the closed set becomes one page and one decision - build a prototype or revise it. Fun waits for G1, on a running loop.

## Input

From S06 (R7): 20 variants, 3 bad · at most 3 questions answered (R2) · 3 candidates with cost · a recommendation · one surprise line · draft `BRIEF.md`. Anything missing: back to S06.

## The brief

One page, English. S06's pillars, references and risks stay; add, in this order:

- player fantasy - what the player gets to be or do, one sentence;
- core loop - 3 sentences: act, feedback, next act;
- audience - who, and what they already play;
- constraints - time, money, platform, skill;
- visual and audio direction - one line;
- non-goals - 2-3 things this is not;
- kill criteria - when the prototype is dropped, not how the player loses;
- next prototype question - one a greybox answers in a day.

## Checks

1. Loop testable: each sentence names an action and a result the build can show; the question is yes/no or a number.
2. Scope small: one page, constraints and non-goals present, no feature list; anything extra goes to `BACKLOG.md` (R9).
3. No clone: S06's references name the borrowed verb or feeling, not a skin; "X but with Y" is not the core.
4. Next step is a prototype: route to S08 - not a GDD, a system card or architecture.

## Decision

The user decides; A01 writes one line in `DECISIONS.md`:

`G0 <YYYY-MM-DD> - go: <one line>` · `G0 <YYYY-MM-DD> - revise: <the one change>`

Revise returns to S06; it edits `BRIEF.md` and that line only (E01). A second page means a new idea, not a longer brief.

## Route

Go: A01 updates `STATE.md`; S08 builds the answer; S07 only if the question turns on engine facts.

## Limits

No questions of its own: a gap is a revise. No GDD, architecture, art, backlog or PASS/CONCERNS/FAIL.
