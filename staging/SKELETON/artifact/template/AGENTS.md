# {{GAME_NAME}}

One game, one repo, built with gamefirst v0.3. Playable first: a mechanic is
real when it runs, not when it is described. One page per document, one fact in
one place.

## Modes

`discuss`, `prototype`, `production`, `autonomous`, `review`. The active mode is
recorded in `STATE.md`; state it when it changes. On conflict:
**mode > rules > skill > pack > docs**.

## Parts

Rules `R1-R10` live in `.opencode/rules/`, skills `S01-S13` in
`.opencode/skills/`, agents `A01-A04` in `.opencode/agents/`. Open the part a
task names; never restate it here. Load only the parts in use.

## Non-negotiables

- Build is truth (R1): no runnable artifact, not done. Proof goes to `evidence/`;
  autonomy logs to `runs/`.
- Code before docs (R5): document only approved, working mechanics.
- Run `verify` (S02) before saying done; report pass or fail with the artifact.
- Ask at most three questions per stage, each with a recommendation (R2).
- A new idea goes to `BACKLOG.md`, never into the current scope (R9).
- Commit is not publish (R4): no push, release, or spend without an explicit
  command. No secrets in the repo.

## Documents

`BRIEF.md` idea, loop, success. `STATE.md` phase, next action, blockers.
`DECISIONS.md` append-only decisions. `GAME.md` feel and anti-rules.
`BACKLOG.md` out-of-scope ideas. `docs/systems/` one card per mechanic.
`docs/playtests/` sessions and verdicts. `docs/engine/` pinned engine facts.
`docs/guide/` user help.

## Code

`src/systems/` and `src/data/` are engine-agnostic. `src/game/` is the only
engine adapter. The engine pack owns the pinned version, pitfalls, and test
recipes in `docs/engine/`; changing engines replaces the adapter and the pack,
not the game logic.
