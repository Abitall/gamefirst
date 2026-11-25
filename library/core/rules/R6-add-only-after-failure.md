# R6 — Add only after failure

A rule, skill, agent, tool, pack, or document joins the library only after the
same failure happened twice or a measured gap was shown. "Just in case" is not a
reason.

## Why

Every part adds a line the agent reads on every task, or a file it must keep
current, plus upkeep that outlives the failure it answered. The framework this
template replaces reached 90 skills and 52 agents for one developer.

## Admission

Two proofs qualify; one is enough.

- **Repeated failure** — the same mistake in two separate sessions, each with the
  evidence path that shows it.
- **Measured gap** — an eval, fixture, or playtest that fails because the
  capability is missing.

A single annoyance goes to `NOTES.md` or `lessons/`, not into a part.

## Not reasons

Symmetry with another part, completeness of a set, a tool you might need next
month. Each is a guess about work not yet done.

## Smallest fix first

Stop at the first rung that works:

1. Clarify an existing rule or skill.
2. Add one checklist line or one eval case.
3. Fix the tool that failed.
4. Add a new part.

A new part is last because it is the most expensive to keep.

## What an addition carries

Name five things in the part itself: trigger, input, output, done check, and the
eval or fixture that proves it (E03). A part with no failing check is a wish.

## One in, one out

A new library enters as one addition: one failure, one proof, many files. Each
later addition deletes or merges one existing part, named in the same change. A
part unused across two projects is removed or moved to `lessons/`; review that
list once a quarter. A removal is one commit with the reason in its message: no
deprecation period, no migration note, no question.

## Record

Append to `DECISIONS.md`: date, part, the two failures or the failing fixture,
what it replaced. Memory (M01) enters on the same gate: a second project or two
failures.

## Check

S03 retrospect proposes an addition; an import (S04) and a new tool (S05) pass
this gate too. S01 checks prior art: an existing part or an outside tool may
already cover the gap. R1 makes the proving run the artifact; E07 scores memory
admission, and parts are judged by the `DECISIONS.md` line and the fixture it
names. External material is read under R3.
