# Codex host

`AGENTS.md` is the project contract. Codex loads it automatically.

Project parts:

- rules: `.agents/rules/`
- skills: `.agents/skills/`
- roles: `.agents/roles/` (reference notes, read when a task names one)
- crews: `.agents/crews/`
- gates: `.agents/gates/`

The six command skills are in `.agents/skills/`: `start`, `status`, `next`,
`verify`, `retro`, `help`. Invoke one as `$start`, `$status`, `$next`,
`$verify`, `$retro` or `$help`.

Codex has no custom subagent files. A04 critic is a separate read-only review
pass. Keep the outputs and evidence in the same files used by the other hosts.

`status`, `verify` and `doctor` work in a generated Codex project. `sync-agent`
and `upgrade` are OpenCode-first in v0.3.
