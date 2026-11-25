# SL06 — `/help`: report

## Summary

`/help` is a read-only OpenCode command that prints a one-screen map of the project: game, phase, mode, gate, next action, files, commands and guide. It reads `AGENTS.md`, `STATE.md`, `DECISIONS.md`, `GAME.md` and `BACKLOG.md`, labels missing values with their owners, and never writes, runs or asks. It is the discovery surface for the six slash commands and the D01–D10 templates.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters | 1,185 | — | — |
| Tokens (chars / 4) | 296.25 | 300 | 3.75 (1.25%) |
| Lines | 19 | one screen | fits |
| Bytes | 1,185 | — | — |

UTF-8 without BOM, LF only, no `{{`, ASCII-only content, final newline. The artifact was written at `staging/SL06/artifact/template/.opencode/commands/help.md`; the live target `template/.opencode/commands/help.md` is copied on acceptance.

## Check

`node C:\Users\Chirv\AppData\Local\Temp\opencode\sl06-check.mjs` returned `{ ok: true, chars: 1185, tokens: 296.25, lines: 19, frontmatter: {...}, labels: [...], ids: [...], placeholder: false, bom: false, crlf: 0 }`.

Content assertions: frontmatter has `description`, `agent: partner`, `subtask: false`; the six labels `Game/Phase/Mode/Gate/Next/Files/Commands/Guide` are present once; the six command names are present; IDs A01, R2, R5, R10 resolve; no duplicate lines with `start.md`, `status.md`, `next.md`, `verify.md`, `retro.md`, `AGENTS.md` or `README.md`.

## Rubric self-check

| # | Criterion | Self-assessment | Note |
|---:|---|---|---|
| 1 | Necessity | pass | 15 units in `JUSTIFICATION.md`; no rule text, no wizard. |
| 2 | Function | pass | Input: five files; output: one screen; done: all labels; failure: `Missing:` with owner. |
| 3 | Evidence | pass | 3 sources in `SOURCES.md` (2 external + A01). |
| 4 | Blueprint fit | pass | `template/.opencode/commands/help.md`, read-only, no engine. |
| 5 | Size | pass | 296.25 of 300. |
| 6 | Language and encoding | pass | English; UTF-8 no BOM, LF, ASCII. |
| 7 | Security | pass | Read-only, no shell, no network, no secrets. |
| 8 | Testability | pass with caveat | Structural check passes; there is no command runtime harness. |
| 9 | Integration | pass with caveat | D09 guide and D02–D05 files do not exist yet; help labels them `missing`. |

## Open questions

1. There is no command runtime in the repository; the check is structural, not an executed `/help`.
2. `docs/guide/` (D09) and D02–D05 are pending; the screen will show `missing` until Batch 13/14.
3. The command list is hardcoded to six; adding a command requires editing this file (R6).
4. The `Files:` line names `runs/` and `evidence/` even when they are absent; is that map or noise?
5. `Game:` takes one line from `GAME.md`; a long GAME.md first line may wrap.

## Known weaknesses

- The screen is static prose with live values; it cannot know a new file type.
- `Missing:` names owners by part ID; a user without the blueprint must run `/help` twice.

Review: pending
