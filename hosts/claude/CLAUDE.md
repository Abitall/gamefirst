# {{GAME_NAME}}

Read `AGENTS.md` first; it is the project contract. This file is the Claude Code
entry point, not a second source of truth.

Project parts: rules in `.claude/rules/`, skills in `.claude/skills/`, subagents
in `.claude/agents/`, commands in `.claude/commands/`. The same rules R1-R10 and
skills S01-S13 apply; the paths are the only host-specific change.

Use `/start`, `/status`, `/next`, `/verify`, `/retro`, `/help`.

Host note: the main assistant acts as A01 partner. `designer`, `engineer` and
`critic` are subagents with narrower tools. When a subagent cannot be spawned,
run the same review as a separate pass and keep it read-only.
