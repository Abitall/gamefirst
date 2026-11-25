# Host adapters

gamefirst keeps one source of rules, skills, gates and documents. The host
adapter only changes where the host expects to find them.

| Host | Command | Part root | Instructions | Native commands |
|---|---|---|---|---|
| OpenCode | `--host opencode` (default) | `.opencode/` | `AGENTS.md` + `opencode.json` | `.opencode/commands/` |
| Codex | `--host codex` | `.agents/` | `AGENTS.md` | skills `$start`, `$status`, `$next`, `$verify`, `$retro`, `$help` |
| Claude Code | `--host claude` | `.claude/` | `CLAUDE.md`, `AGENTS.md` | `.claude/commands/` |

## What is shared

`library/` remains the single source. `new-project` copies the active parts into
the host directory, so a game never depends on the gamefirst checkout at
runtime.

## What differs

- OpenCode has a V2 `permissions` array and `default_agent` in `opencode.json`.
- Codex reads `AGENTS.md`; project skills live in `.agents/skills/` and are
  invoked as `$skill-name`. Codex has no custom subagent files, so `A04` is a
  separate review pass rather than a spawned agent.
- Claude Code reads `CLAUDE.md` (and `AGENTS.md` in place), skills live in
  `.claude/skills/`, subagents in `.claude/agents/`, settings in
  `.claude/settings.json`.

## Scope of the adapter

`new-project` writes a working layout for all three hosts. `status`, `verify`
and `doctor` read the generated project. `sync-agent` and `upgrade` are still
OpenCode-first in v0.3; use them on OpenCode projects until the host-aware
upgrade lands.

The adapter does not promise feature parity. It promises that the rules,
skills, evidence discipline and documents are the same, and that the host can
find them without guessing.
