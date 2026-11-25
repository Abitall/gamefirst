# DECISIONS

Append only: a block goes at the end and stays; never edit or delete it. A
correction is a new block whose `Decision:` names the date it replaces, and the
old block stays. One block per real choice: costly to reverse, changes what
ships, or a gate/checkpoint line (G0, G1, G2, G2.5, G3). Routine tuning, a task, and an
open question are not blocks; an idea goes to `BACKLOG.md` (D05, R9), an open
question to `BRIEF.md` or `STATE.md` within R2's budget. A decision may precede
the build (R5); a system doc may not. A01 owns the file and appends; a gate line
is the human's signature, never the agent's. Date the day of the choice, not the
day it was written. Evidence names an artifact a later reader can open; a
decision with no evidence is a plan. A block records the choice, not the work:
no task lists, no estimates, no copied packet.

At most ten lines per block, newest last and newest wins; replace every bracketed slot
and delete its prompt. A G2.5 freeze is one block: In in `Decision:`, Out in
`Consequences:`, Budget by reference in `Evidence:` to the G2 packet.
`STATE.md` (D02) links the newest gate line.

## [date]

- **Decision:** [the choice, in one sentence]
- **Why:** [reason it won]
- **Alternatives:** [one real option]; rejected because [...]
- **Consequences:** [what follows, what is now blocked, what it costs]
- **Owner:** [who decided, not who built it]
- **Evidence:** [test, gate packet path, or `evidence/` path]

---
