# {{GAME_NAME}}

This repo holds one game, built with gamefirst v0.3: a playable-first workflow
where documents describe what already works, never what might.

## Start

1. Open the repo in {{HOST_NAME}}. `AGENTS.md` is the project contract.
2. Read `STATE.md` for the mode, phase, and next action, and `BRIEF.md` for the
   idea and its success test.
3. Run `/start` when you do not know where to begin, or `/next` for the next
   action. On a skill-based host invoke `$start` and `$next` instead.

## Verify

`/verify` runs build, types, tests, and evidence checks, and reports pass or
fail with the artifact it produced. Done means it passed. The commands come from
the engine pack in `docs/engine/`; the core has no engine.

## Where things are

- `docs/systems/` - one card per mechanic: inputs, outputs, config keys, tests.
- `docs/playtests/` - what players did and said.
- `docs/engine/` - the pinned engine version, pitfalls, and test recipes.
- `docs/guide/` - how to install and use this template.
- `src/systems/`, `src/data/` - game logic and data, engine-free.
- `src/game/` - the engine adapter, the only place that imports the engine.
- `evidence/`, `runs/` - proof of done and the autonomy log.

`BRIEF.md`, `STATE.md`, `DECISIONS.md`, `GAME.md`, `TASTE.md`, `BACKLOG.md`, and
`decisions.ru.md` sit at the repo root.
