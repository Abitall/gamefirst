---
description: Pick one action from BACKLOG by gate, blockers, budget, mode
agent: partner
subtask: false
---

Read `STATE.md`, `BACKLOG.md`, `agent.lock.json`. Never write, run, or ask; ignore args. Print one screen.

Missing: `<file> — <part>`; owners: D02 `STATE.md`, D05 `BACKLOG.md`, CLI01 `agent.lock.json`. STATE/BACKLOG missing: `Next: none`, stop; missing lock skips the installed-part check. SL02 mirrors files; `/next` selects.

Pick one open `BACKLOG.md` item: the one STATE names wins; a named non-item comes from STATE (R5); a named closed item: `BLOCKING — <reason>`. Else the top unblocked item within the R9 budget, gate, and mode; after G2.5 no feature. Modes: `review` read, `discuss` ask, `prototype` prototype, `production` build, `autonomous` in-contract.

`BLOCKING — <reason>`, `Next: none` on a stop (R10): STATE blocker, autonomy without contract, feature after G2.5, or only blocked/over-budget items.

Next: <one action, or none>
Why: <source, gate, mode, R9 budget — one line>
Blocked: <STATE blockers, or none>
Mode: <STATE mode, or not recorded>

Empty `BACKLOG.md`: `Next: none — BACKLOG empty`; `Why: A01 writes the first item (R2)`; A01 owns the choice.
