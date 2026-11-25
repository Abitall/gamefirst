---
description: Stage close: S03's five lines and one dated retro file
agent: partner
subtask: false
---

Read `STATE.md`, `DECISIONS.md` (settled changes), `BACKLOG.md`, `evidence/`, `docs/playtests/`. Run S03 as written; this adds the inputs, file, and print. An argument names the stage or gate, otherwise `STATE.md`.

Count distinct evidence paths in `evidence/` and `docs/playtests/`; no claim without one (R5). Fewer than three: `Failed:` states the count and the gap; `Change:` is the missing check, never a guess. A fact only the user holds: one R2 question. A stop under R10 is named in `Why:`.

Print one screen: five lines, then the path:

Worked: <observation — evidence path>
Failed: <failure or gap — evidence path>
Why: <one root cause>
Change: <smallest change, owner; a rule or skill added or deleted, via R6>
Next: <check, date, next action>

Write them to `docs/retro/<YYYY-MM-DD>.md` (create the folder); a same-day repeat takes `-2`. Never rewrite a past retro. One change only: a second goes to `BACKLOG.md` with its cost (R9). One pointer line in `STATE.md`. A01 owns the file. No praise, no invented conclusion, no "all good".
