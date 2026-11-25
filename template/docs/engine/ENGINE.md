# ENGINE DOC

`docs/engine/<engine>.md`: one file for the one engine this repo runs; the
template ships it as `ENGINE.md`, renamed to the engine id when the engine is
chosen. Version, verified calls, reproduced failures, and runnable commands
only. The choice is a `DECISIONS.md` entry (S07); its matrix and spike log sit
beside this page, linked not copied (R5).

## Pin
- Engine: `[...]`
- Exact version: `[...]` in `[...]`; one machine-readable authority (E11).
- Range: `[...]` (`engineRange`, N00); the exact version sits inside it.
- In force: `project.config.json` selects the engine; where it and the pack
  differ, the project wins (A03, N00).
- Change: a `DECISIONS.md` entry first; never a silent bump or downgrade (E11).
- No pin: `blocked`; ask, never fill from memory.

## API source
The installed engine's own metadata (typings, class reference, source) is the
first authority; the official docs for the exact version come second (E02, E11).
`latest` docs, blog posts, and another version are not sources. A member not
verified for the pin is a spike, not a guess: stop and ask (E02). Members used:

| Member | Source | Date |
|---|---|---|
| `[...]` | `[...]` | `[...]` |

## Pitfalls
One entry per reproduced failure: what breaks, how to check it, the fix, the
version. No reproduction, no entry (R5).

- `[symptom]` -> check `[command]` -> fix `[change]`; `[version]`.
- Example: `shakeCamera` is absent in Phaser 4.2.1 -> check the typings -> use
  `this.cameras.main.shake(...)` or ask; never shim it (E11).

## Recipes
`project.config.json` -> `verify.recipe` overrides the pack's default recipe
(S02, N00); the table records the commands in force, copied from the docs for
this version, never invented. Change the config and this table in one edit.
`verify` adds the claim-specific checks (S02).

| Step | Command | Proves | Pass |
|---|---|---|---|
| Build | `[...]` | the game compiles and bundles | exit 0, artifact non-empty |
| Test | `[...]` | the rules and flows hold | every named test passes |
| Smoke | `[...]` | the game boots and the loop runs | playable frame, no error |

## Pack
- Pack: `engine-[name]` @ `[version]`; installed parts in `agent.lock.json`.
- Selftest: `[...]`; checks pin = installed version = every verified member
  (E11). `stable` only when it passes against the pin; otherwise `beta` (N01-N03).
- Upgrade: `CLI06` dry-run; a failing selftest is a blocker (R1).

## Verified
`[YYYY-MM-DD]`, `[evidence path]` (S02). Re-run the selftest and recipes when
the pin or pack changes; a stale page is a blocker (R1).
