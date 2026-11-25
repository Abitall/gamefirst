# R1 — Build is truth

A claim of "done" is accepted only with an artifact produced by running the
thing; if it cannot run, the answer is "not done" plus the blocker.

## Why

Documents cannot fail, so they cannot prove. The previous project produced
87k words and a game full of contradictions: all checkable in prose, none in a
build.

## Evidence

Store each artifact or its run log under `evidence/`; cite the path. Minimum per
claim:

| Claim | Artifact |
|---|---|
| Mechanic works | a test that fails before the change and passes after, or a capture in the running build with the steps listed |
| UI works | a screenshot or a 10–30 s capture of the running build |
| Content exists | a count read from the running build (levels, items, lines) plus one opened sample |
| Performance | a profile trace with frame time, against the budget it is compared to |
| Release ready | a build artifact installed and launched from a clean OS profile or container; a second machine is not required |

A test that was weakened, skipped, or never executed is not evidence. A suite
that ran zero tests is not a pass.

## Modes

- **discuss** — make no done claim; label proposals as unverified.
- **prototype** — a throwaway build may be discarded after it runs; keep its
  capture and run log in `evidence/`. Production gets no such discount.
- **production** — `verify` (S02) before any done claim; the artifact path goes in
  the system card's `verified by`.
- **autonomous** — every checkpoint in `runs/AUTONOMY.jsonl` carries an artifact
  path, or it says `blocked`.
- **review** — judge the artifact, not the description; a missing artifact is a
  finding, not a benefit of the doubt.

## Not evidence

A design doc, a TODO, an agent's opinion, a code review without a run, a test
edited to pass, a plan for how it will work.

## When it cannot run

Say "not done". Report the exact command, the error, and what would unblock it.
Do not substitute prose, a mock, or a narrower claim that happens to be true.

## Check

`verify` (S02) is the default gate. Skipping it needs an exception from the user
or the partner agent, never self-granted, with a named reason and a date next to
the claim. E03 scores whether this rule was followed. R5 governs what you write
first; this rule governs what you may claim.
