---
description: Onboard from project files, recommend a mode, ask at most three questions
agent: partner
subtask: false
---

Read `AGENTS.md`, `BRIEF.md`, `STATE.md`, `DECISIONS.md`, `BACKLOG.md`. If one is missing, name it and its template — `BRIEF` D01, `STATE` D02, `DECISIONS` D03, `BACKLOG` D05; `AGENTS.md` ships in the template. Create no file; a missing source leaves its field `missing`.

Choose one mode: `discuss`, `prototype`, `production`, `autonomous`, `review`. Recommend one with a one-line reason: no `BRIEF` -> `discuss`; before G1 -> `prototype`; after G1 -> `production`; at a gate -> `review`; unattended only with an R10 contract in `STATE.md` -> `autonomous`; otherwise `discuss`. A mode named in `$ARGUMENTS` wins.

Ask at most 3 questions for the stage (R2), one message, each with a recommendation, a reason, and `you decide`; record a `you decide` answer in `DECISIONS.md`.

Output one screen; no code, no new facts. Write nothing except the R2 entry:

Mode: <mode> — <one-line reason>
Phase: <from STATE.md>
Next: <one action from STATE.md>
Blocked: <from STATE.md, or none>
Questions: <n>/3

A01 owns the work; R2, R5, R9, R10 apply as written.
