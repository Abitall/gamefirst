# R9 — Scope is budget

Every feature you accept is paid for in time, code, content, tests, and upkeep that outlives it. Scope is a number you spend, not a list you lengthen.

## Why

A game stops shipping when each idea looks cheap alone. A word list, an extra enemy, a mode: each is days of work, and each keeps charging after release — a bug fixed in three places, a save format to migrate, a test that must be updated twice. Nothing is refused here for lack of ambition. It is refused for lack of room.

## The budget

A stage opens with a written budget: the features in play, the content in numbers (levels, items, enemies, words, minutes), and a cut list — what leaves first if the stage runs long. It sits in `STATE.md`, copied from the gate that set it.

Over budget means cut or park. It never means expand. Moving a line off the cut list is the same act as adding a feature.

## A new idea

An idea that arrives mid-stage goes to `BACKLOG.md` in one line: what it is, the value it adds, the cost it carries. Then it waits. Nothing is rejected — the backlog is where a good idea keeps its value until a gate can pay for it.

Writing the line takes a minute. Building the idea takes the stage.

## Gates

- **G2** sets the content budget in numbers, from what the slice proved.
- **G2.5** freezes features. After it, content and polish only: no new mechanic, system, or mode.
- **One in, one out**: a feature added after G2.5 removes a feature of comparable cost, named in the same decision. R6 applies the same trade to the library.

A fix that restores intended behavior is not a feature; a fix that changes a system is.

## Not scope

R7's tinker budget is protected time for exploration and is not product scope; R7 owns it. R9 prices what enters the product, never what you try in private.

S10 builds the slice; S11 produces content against these numbers, and owns the cut list, its order, and the reuse matrix. Scope questions go through R2 and its question budget, not into a debate.

## Check

E06: a new idea lands in `BACKLOG.md` and the stage's written scope is unchanged. A04 reads `STATE.md` against `BACKLOG.md` and fails a stage whose scope grew without a cut. At G2 and G2.5 the budget is the numbers written in the gate record.
