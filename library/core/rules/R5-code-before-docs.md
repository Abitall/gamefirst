# R5 — Code before docs

Write the smallest code that makes the mechanic work, with the test that proves
it. Write the document after, about what now exists: a doc is a map, not the
territory.

## Why

A document about an unbuilt system is a guess with a deadline attached: it
cannot fail, so nobody notices when the build contradicts it. Code and tests
fail out loud.

## Order

1. One sentence of intent: what the player does, what changes.
2. The smallest working code and one test that fails before it and passes after
   (R1: evidence).
3. Run it, play it; if R8/G1 do not approve, stop — nothing to document.
4. Then the doc, one page (D06 system card).

A doc written at step 1 is a plan. A plan is not a mechanic.

## The doc is a map

- **Behavior** lives in code and tests. Where a doc disagrees, code wins until
  the doc is corrected; never edit the test to match the prose.
- **Intent** — why the mechanic exists, what it should feel like, the decision
  behind it, how to work on it — is what the doc carries.
- **Cite the proof.** Every claim carries `verified by:` naming the test or the
  `evidence/` path from `verify` (S02). No citation, no claim.
- **One page, one fact.** A fact lives in one file; link to it, never restate
  it. Two copies drift and the reader believes the wrong one.
- **Delta, not rewrite.** Change the affected line in the affected doc.
  Rewriting a set to feel current hides what changed.

## Not allowed

- A GDD or design document for a system nobody has built.
- A roadmap, a "we will implement this later", or future tense in a system doc.
- Intended behavior written as if it were current.

## Allowed before the code

- `BRIEF.md` (D01) — one page, before the first prototype.
- `DECISIONS.md` (D03) — one append-only entry after a real choice.
- A system card (D06) — after the mechanic works and someone played it.

## Docs lint

Three checks: page limit, links resolve, `verified by` present. More checks cost
more than the docs they guard.

## Check

E01: a tuning change touches at most two documents. R1 owns the evidence; R6
owns whether a new doc type may exist. Cannot name the test that proves a claim?
Delete the claim.
