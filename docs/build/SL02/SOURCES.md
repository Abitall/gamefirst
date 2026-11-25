# SL02 — `/status`: sources

Thin protocol: 3 sources, because this is a command, not a new method. Two external patterns and one accepted internal part.

| # | Repository | Stars (2026-11-25) | License | Analog | Borrowed | Rejected |
|---:|---|---:|---|---|---|---|
| 1 | https://github.com/github/spec-kit | 151,357 | MIT | `templates/commands/status.md`-style one-screen status in a spec workflow | Fixed labels, copy values from state, no summary | Long report, spec IDs, no project lock |
| 2 | https://github.com/bmad-code-org/BMAD-METHOD | 55,731 | MIT | Status/next-step commands in an agent workflow | One screen, explicit missing-file handling, next action | Multi-agent routing, story workflow, gate machinery |
| 3 | `library/core/agents/partner.md` (accepted A01) | — | project | Partner owns state, questions and mode | `agent: partner`, read-only status, no inference | A01's question budget and gate decisions stay in A01 |

## What was rejected

- A dashboard with charts or history: too much for a command that must stay one screen.
- Reading `BACKLOG.md` items: that is `/next`'s job; status only confirms the file exists.
- Inferring a gate result from dates or files: status reports, A01 decides.
- A new state format: `STATE.md` and `agent.lock.json` already exist; the command adds no schema.

## Notes

- `agent.lock.json` is written by CLI01; `created` is its project-start timestamp.
- `STATE.md` is D02; its four fields are the source of Phase, Gate, Next, Blocked.
- `BACKLOG.md` is D05; its existence is checked, its items are not read.
