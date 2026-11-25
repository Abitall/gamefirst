# D09 - report

## Summary

`docs/guide/README.md` is the Russian one-page user guide for a project created with `new-project`: install, first game, the six commands, modes, file map, `BLOCKING`, gates, and the next step. It is orientation, not a rulebook - each section names the owner of the detail (`AGENTS.md`, `/help`, the command files) instead of restating it. The review copy is `staging/D09/artifact/template/docs/guide/README.md`; the live `template/docs/guide/README.md` is not written by this part.

Structure: title and one-line thesis; `## Установка` (Node 18+, OpenCode, three steps, `core`/`game` note); `## Первая игра` (`BRIEF` -> prototype -> G1, `GAME.md` after play, one step per session); `## Шесть команд` table; `## Режимы` (paired vs autonomous, R10 fields, precedence); `## Где что лежит` (six bullets); `## BLOCKING`; `## Гейты` (G1, G2, G2.5, G3); `## Дальше`.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters (code points) | 2,372 | - | - |
| Estimated tokens (characters / 4) | 593.00 | 600 | 7.00 (1.2%) |
| Lines | 63 | one page | - |
| Bytes (UTF-8) | 3,530 | - | - |

UTF-8, no BOM, zero CR, LF, trailing newline, no template placeholders. The byte/character gap is Cyrillic (two bytes per letter); 1,141 of 2,372 characters are non-ASCII.

The page is at 98.5% of the token budget: any further edit must cut before it adds. The first candidate is the `/retro` row plus the `docs/*` bullet, about 130 characters.

## Check

Measurement (Node, UTF-8):

```json
{"bytes":3530,"chars":2365,"est":593.00,"lines":63,"bom":false,"cr":false,"braces":false,"backslash":false,"trailingNL":true}
```

Referenced paths exist in `template/` (all true): `STATE.md`, `BRIEF.md`, `DECISIONS.md`, `BACKLOG.md`, `GAME.md`, `TASTE.md`, `AGENTS.md`, `docs/retro`, `docs/systems`, `docs/playtests`, `docs/engine`, `runs`, and the six files under `.opencode/commands/`. `tools/new-project.mjs` exists at the gamefirst root, not in the game template; the guide says "Из корня gamefirst" so the relative command resolves only there.

Install check, run from `C:\Phaser Projects\gamefirst` into a fresh temp target:

```text
node tools/new-project.mjs <temp> --name "D09 Check" --packs core,game --git
```

Exit 0; output `core 0.3.0-dev; packs: core, game; parts: 47; crews: 3; gates: 5`; git initialized; the generated root contains the six files above plus `AGENTS.md` and `agent.lock.json`; `docs/guide/` contains only `.gitkeep`, so the guide is the only new content in that directory once installed.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | Every section answers a question the first session asks: what to type, where a file lives, what a stop means, who signs a gate. `JUSTIFICATION.md` maps each unit. |
| 2 | Function | PASS | Trigger: after `new-project`, or when lost. Input: the repo and six commands. Output: orientation, no writes. Done: the reader knows the next command. Failure: a missing file is named by the command that reads it. Scope: no rules, no engine setup. |
| 3 | Evidence | CONCERNS | Thin budget: 2 external + 1 internal, as the task requires, against the 9-repository rule in `staging/README.md`. Both externals are high-star (1,759 and 16,501) and permissively licensed; the internal bundle is the shipped interface. The borrow is structural, not textual. |
| 4 | Blueprint fit | PASS | Matches D09: Russian, one page, project layer, install + first game + six commands + modes + files + `BLOCKING` + gates + pointers. Uses only implemented v0.3 paths. |
| 5 | Consistency | CONCERNS | Command names, `BLOCKING`, R2, R10, E08 and gate outcomes match the blueprint. `paired` is not a literal blueprint mode value: it is the umbrella over `discuss`, `prototype`, `production`, `review`, which the same bullet lists. Flagged below. |
| 6 | Language and encoding | PASS | Russian prose; identifiers, commands and paths stay English. UTF-8 no BOM, LF, POSIX paths, no placeholders. |
| 7 | Testability | PASS | Install command executed; six command files present. Manual checks: `/start` proposes a mode, `/status` prints the six labels, `/help` maps the files, a closed `BACKLOG` item yields `BLOCKING -`. First `/verify` in a fresh core+game repo fails by design (empty recipe). |
| 8 | Size and density | PASS | 593.00 of 600 tokens; 63 lines; no paragraph survives without a unit in `JUSTIFICATION.md`. Headroom is 7.00 tokens, so the page is effectively closed to additions. |
| 9 | Integration | CONCERNS | The page ships in every game at `docs/guide/`, but its install step needs the gamefirst checkout (`tools/new-project.mjs` is not copied into a game). The page states the working directory, so it resolves in context; a reader who only has a game repo cannot run step 1. Also, no engine pack path exists in v0.3 and the page correctly stays silent. |

Overall: 6 PASS, 3 CONCERNS. Review-ready.

## Known weaknesses

- No troubleshooting table; install errors are left to the CLI's own messages.
- No engine instructions; v0.3 implements `core,game` only.
- The 8.75-token headroom means the next correction must be a swap, not an addition.
- Cyrillic inflates bytes and often inflates real tokenizer counts; the 593.00 figure follows the task's `characters / 4` rule, not a tokenizer measurement.

## Open questions

1. **`paired` naming.** The blueprint has no `paired` mode value. Options: keep the umbrella and list the four real modes (current), or drop the bold label and title the section "Как работает агент". Recommendation: keep the umbrella - the user asked for paired/autonomous, and the bullet names the actual values.
2. **First `/verify`.** A fresh `core,game` project has an empty `verify.recipe` and no `tools/verify.mjs`, so the first `/verify` returns FAIL `no verify runner`. Recommendation: D08/CLI should ship a default recipe or the guide should say the first verify needs a command; D09 cannot fix it without contradicting the tool.
3. **Engine packs.** `new-project` accepts `core,game` only; there is no engine install path in v0.3. Recommendation: add the path before any engine guide promises it.
4. **Installer availability.** `tools/new-project.mjs` lives in the gamefirst checkout, so the install step in a shipped game guide depends on that checkout still existing. Recommendation: either keep the guide as a "next project" reference (current wording) or ship the installer as a separate tool.
5. **Source budget.** The task caps research at 3 sources while `staging/README.md` describes 9 repositories. Recommendation: treat the task budget as authoritative for D09 and record the deviation (done here).

Review: accepted 2026-11-26
