---
description: One-screen status from STATE, agent.lock.json, and BACKLOG
agent: partner
subtask: false
---

Read `STATE.md`, `BACKLOG.md`, `agent.lock.json`. Never write, run code, or ask anything. Ignore any argument; add no fact not in the files. Open `BACKLOG.md` only to confirm it exists; its items belong to `/next`.

If a file is missing, print one line per file before the six labels: `Missing: <file> — <part>`. The part is D02 for `STATE.md`, D05 for `BACKLOG.md`, CLI01 `new-project` for `agent.lock.json`.

Print one screen, these labels in order, one line each, values copied and joined with `; `:

Phase: <STATE phase>
Active: <n> parts — <first 5 ids from agent.lock.json, +N more if any>
Gate: <STATE gate state>
Next: <STATE next action>
Blocked: <STATE blockers>
Since: <project start: agent.lock.json created, date only>

If `STATE.md` or `agent.lock.json` is missing, the fields it feeds are `unknown`. An empty STATE field or absent lock value is `not recorded`. If `STATE.md` has no next action, print `Next: not recorded — /next (not built yet)`.

Do not summarize, rank, or infer a gate pass. A01 owns the work; R1, R5, R10 apply as written.
