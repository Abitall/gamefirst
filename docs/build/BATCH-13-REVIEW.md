# Batch 13 review — commands SL03–SL06 and BRIEF (D01)

**Verdict: PASS.** All five parts are accepted, copied into the template and
covered by the Batch 13 smoke test.

## Parts

| Part | Role | Artifact | Size (chars / chars÷4) | Sources | Rounds | Status |
|---|---|---|---|---:|---:|---:|---|
| SL03 | producer | `template/.opencode/commands/next.md` | 1,190 / 297.5 | 3 (thin) | 2 | accepted |
| SL04 | producer | `template/.opencode/commands/verify.md` | 1,180 / 295.0 | 3 (thin) | 1 | accepted |
| SL05 | producer | `template/.opencode/commands/retro.md` | 1,152 / 288.0 | 3 (thin) | 1 | accepted |
| SL06 | producer | `template/.opencode/commands/help.md` | 1,185 / 296.25 | 3 (thin) | 1 | accepted |
| D01 | game-designer | `template/BRIEF.md` | 1,821 / 455.25 | 3 (thin) | 1 | accepted |

All five are under their limits: commands ≤300 tokens, BRIEF ≤800.

## Review changes

- **Command location corrected.** Slash commands ship in
  `template/.opencode/commands/`, not `library/core/commands/`; the template is
  copied by `new-project`, so the game has them from the first run. The
  blueprint and build plan were updated.
- **SL03 `/next`** uses one screen and four labels (`Next`, `Why`, `Blocked`,
  `Mode`). It reads `STATE.md`, `BACKLOG.md`, `agent.lock.json`; it does not
  write, run or ask. The gate, blocked item, R9 budget and mode are filtered in
  that order.
- **SL04 `/verify`** runs the project's verify command with the claim, reads the
  evidence, and reports PASS/FAIL. It never edits code, tests or evidence.
- **SL05 `/retro`** writes exactly five lines to `docs/retro/<date>.md` and
  proposes one change; it does not add a second document.
- **SL06 `/help`** is one screen: `Game`, `Phase`, `Mode`, `Gate`, `Next`,
  `Files`, `Commands`, `Guide`. It is read-only and does not ask questions.
- **D01 `BRIEF.md`** has 11 sections in the G0 order and 37 `[...]` slots; a
  second page is a second idea and goes to `BACKLOG.md`.
- **A01 integration.** `library/core/agents/partner.md` is 2,616 chars / 654.0
  tokens / 58 lines and now allows `edit docs/retro/**`; the game template has
  `docs/retro/.gitkeep`. The A01 build docs were updated.
- **SL06 and D01 docs** were completed manually after the subagents hit their
  step limit; the artifacts were already written and unchanged.

## Smoke test

`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b13-smoke.mjs`:

```text
RESULT 366 passed, 0 failed
```

Checked: 10 rules, 4 agents, 13 skills, 3 crews, 5 gates, 12 evals, 10 tools,
6 commands, 32 permissions; `start`/`status`/`next`/`verify`/`retro`/`help`
frontmatter, size and encoding; `BRIEF.md` 11 sections and ≤800; A01
`docs/retro/**` allow and ≤700; all build docs present; tool syntax and
`--help`.

## Open issues

- Command runtime is not tested — the smoke test is structural. A real game
  session is the first end-to-end check.
- D02–D06 (STATE, DECISIONS, GAME/TASTE, BACKLOG, engine card) and D09 (guide)
  are not built.
- CLI08 hardcodes the v0.3 ID/kind lists; template commands need `--root
  template`.
- SL02 assumes lock field names; `agent.lock.json` is written by CLI01 and read
  by SL02/SL03.
- D01's external references are weak (A-Cloud PR/FAQ is 119 stars and 2020);
  the accepted G0 is the stronger source.
- A01 owns the retro file; the `/retro` command writes it only when invoked by
  the partner.

## Next

Batch 14: D02 `STATE.md`, D03 `DECISIONS.md`, D04 `GAME.md` + `TASTE.md`,
D05 `BACKLOG.md`, D06 engine card — all under the thin protocol.
