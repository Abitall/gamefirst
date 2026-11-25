---
description: Guide to files, commands, rules, modes
agent: partner
subtask: false
---
Read `AGENTS.md`, `STATE.md`, `DECISIONS.md`, `GAME.md`, `BACKLOG.md`. Write nothing, run nothing, ask nothing; ignore arguments. If a file is missing, print `Missing: <file> - <part>` first; print `missing` for values you cannot read: `STATE` D02, `DECISIONS` D03, `GAME` D04, `BACKLOG` D05; `AGENTS.md` ships.

Print one screen; no invented facts:

`Game:` <one line from GAME.md>
`Phase:` <STATE phase> - where the work stands
`Mode:` <STATE mode> - how the agent works; outranks rules
`Gate:` <STATE gate or `none`> - the human go/no-go
`Next:` <command> - <STATE next action>
`Files:` `AGENTS.md` rules; `STATE.md` phase/mode/gate/next; `DECISIONS.md` why; `GAME.md` feel; `BACKLOG.md` parked; `BRIEF.md` idea; `docs/` systems, playtests, engine, guide; `src/` systems, data, game; `tests/`, `evidence/`, `runs/`; `.opencode/` rules, skills, agents
`Commands:` `/start` choose mode; `/status` snapshot; `/next` pick one action; `/verify` verify a claim; `/retro` stage close; `/help` this map
`Guide:` `docs/guide/` (D09); templates D01-D10

A01 owns the work; R2, R5, R10 apply as written.
