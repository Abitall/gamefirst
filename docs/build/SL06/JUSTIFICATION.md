# SL06 - /help: justification

Status: review-ready

Artifact: `staging/SL06/artifact/template/.opencode/commands/help.md`
Target after accept: `template/.opencode/commands/help.md`
Scope: one read-only command, one screen, no writes, no runs, no questions.

## Why this unit exists

`/help` is the only command that explains the workspace instead of acting on it. A new user sees six command names and five root files but no statement of which file is authoritative, what a mode changes, or who owns a missing file. `/start` chooses a mode and asks questions; `/status` copies values from `STATE.md`; neither explains the map or the command set. Without `/help`, the user must read `AGENTS.md` and the template source to answer "where am I, what does this mode mean, what can I run next?".

The command is defined by `docs/V0.3-BLUEPRINT.md:252` ("Explain commands, rules, and modes") and ships only in `template/.opencode/commands/` (`docs/V0.3-BLUEPRINT.md:243`). It follows the thin-part protocol in `docs/BUILD-PLAN.md:126-129`: two external sources plus one accepted internal artifact, no padded bibliography, no copied code.

## Unit-by-unit justification

| # | Unit | Why it exists | What breaks if removed | Source |
|---|------|---------------|------------------------|--------|
| 1 | `description: Guide to files, commands, rules, modes` | One catalog line that tells the user what `/help` does before it runs. | The command list shows a bare name; users cannot distinguish `/help` from `/status`. | Sibling commands `template/.opencode/commands/start.md:2`, `status.md:2`; Gemini CLI `helpCommand.ts` one-line description. |
| 2 | `agent: partner` | Routes the command to A01, the dialogue owner with read access to project files. | A different agent may answer with different voice, permissions, or no project knowledge. | `library/core/agents/partner.md:34`; SL01 and SL02 frontmatter. |
| 3 | `subtask: false` | Keeps the command in the main session, where `STATE.md`, `DECISIONS.md`, and `GAME.md` are already the working context. | A fresh subtask starts without the session context and can only print a generic map. | SL01 and SL02 frontmatter; A01 dialogue-owner role. |
| 4 | Read `AGENTS.md` | Supplies the five modes, the priority order, and the part IDs that the screen explains. | The mode gloss can contradict the project's own priority rule; "outranks rules" becomes an invention. | `template/AGENTS.md`; A01 read-first list `library/core/agents/partner.md:40`. |
| 5 | Read `STATE.md` | Supplies phase, mode, gate, and next action, the four values the screen must not guess. | `Phase:`, `Mode:`, `Gate:`, and `Next:` are empty or fabricated. | D02 `docs/BUILD-PLAN.md:85`; A01 `library/core/agents/partner.md:43`. |
| 6 | Read `DECISIONS.md` | Explains why the current mode or gate changed; the screen can state a decision without re-deriving it. | The mode is reported as a bare value with no reason, and a `you decide` answer is invisible. | D03 `docs/BUILD-PLAN.md:86`; A01 read-first list `:40`. |
| 7 | Read `GAME.md` | Supplies the one-line game description for the `Game:` label. | The first line of the screen is empty, so the map has no subject. | D04 `docs/BUILD-PLAN.md:87`; template map `template/README.md`. |
| 8 | Read `BACKLOG.md` | Supplies parked items and their IDs when `Next:` points at backlog work. | `Next:` can name only a STATE action and cannot refer to a parked item. | D05 `docs/BUILD-PLAN.md:88`; `/next` reads the same file. |
| 9 | `Write nothing, run nothing, ask nothing; ignore arguments` | Makes `/help` a pure read: no mutation, no command execution, no R2 question spent, no argument-dependent behavior. | `/help` can write `STATE.md`, run a tool, ask a question, or produce a different screen for every argument; it stops being safe to run at any time. | A01 permissions `library/core/agents/partner.md:4-31`; R2; SL02 "Never write, run code, or ask anything"; BMAD "Change nothing on your own initiative." |
| 10 | `Missing: <file> - <part>` | Names the absent file and its owner before the labels, so the user can repair the template instead of reading blanks. | The screen prints `missing` values with no repair path; the user cannot tell which template creates the file. | SL02 missing-line convention; D02-D05. |
| 11 | `missing` for values that cannot be read | Separates an absent or empty source from a real value of `none` or `unknown`. | A blank phase or gate looks like a legitimate state; the user may act on a value that was never recorded. | SL02 `unknown`/`not recorded` fallback; BMAD "say so rather than guess." |
| 12 | Owners `STATE` D02, `DECISIONS` D03, `GAME` D04, `BACKLOG` D05; `AGENTS.md` ships | Makes the missing-file line actionable and records which template must land. | The user knows a file is missing but not which part to run or whether the file should exist at all. | `docs/BUILD-PLAN.md:85-88`; `docs/V0.3-BLUEPRINT.md:258-267`. |
| 13 | `Print one screen; no invented facts` | Bounds the output and forbids filling gaps with plausible text. | The command can dump several screens or invent a gate pass, which is worse than a short honest screen. | A01 one-screen report `library/core/agents/partner.md:54-55`; BMAD "say so rather than guess." |
| 14 | `Game:` one line from `GAME.md` | Orients the reader before the state labels. | The screen starts with phase and mode but never says what the game is. | D04; `template/README.md` root map. |
| 15 | `Phase:` + "where the work stands" | States the current stage and gives the value a meaning. | The user sees a phase word with no explanation; a gate and a phase are easy to confuse. | D02; `docs/V0.3-BLUEPRINT.md:258-267`. |
| 16 | `Mode:` + "how the agent works; outranks rules" | Explains why the agent behaves differently in `discuss`, `prototype`, `production`, `autonomous`, or `review`. | The priority order `mode > rules > skill > pack > docs` is invisible; the user cannot predict agent behavior. | `template/AGENTS.md` mode list and priority; D02. |
| 17 | `Gate:` + "the human go/no-go" | Marks a gate as a human decision, not an agent state or a passed check. | Users read a gate as something the agent can clear; a gate pass can be inferred from a green build. | A01 gate duty `library/core/agents/partner.md:46`; `docs/V0.3-BLUEPRINT.md` G0-G3. |
| 18 | `Next:` command + STATE next action | Turns the map into one actionable step while keeping the action's source visible. | `/help` is descriptive only; the user still does not know which command to run or what the current action is. | `docs/V0.3-BLUEPRINT.md:252` ("next command" is part of the explainer); A01 next-action duty. |
| 19 | `Files:` map | Groups the root files, `docs/`, `src/`, `tests/`, `evidence/`, `runs/`, and `.opencode/` by purpose. | The user searches the tree or edits the wrong copy; the template map stays unread. | `template/README.md` "Where things are"; `docs/V0.3-BLUEPRINT.md:258-267`. |
| 20 | `Commands:` six one-liners | Lists every shipped command with its distinct job, including `/help` itself. | The user cannot choose between `/next` and `/verify`, or does not discover `/retro` and `/help`. | `docs/V0.3-BLUEPRINT.md:247-252`; sibling command descriptions in `template/.opencode/commands/`. |
| 21 | `Guide:` `docs/guide/` (D09); templates D01-D10 | Points to the human guide and the document templates that fill the root files. | The Russian guide and the template set are invisible; the user reads agent rules instead of the guide. | D09 `docs/BUILD-PLAN.md:92`; D01-D10 `docs/V0.3-BLUEPRINT.md:258-267`; `docs/guide/` exists in the template. |
| 22 | Final line `A01 owns the work; R2, R5, R10 apply as written.` | Names the owner and the three rules that bound a read-only answer: question budget, code-before-docs, and autonomy contract. | The command can be read as authorizing design or code, or as an invitation to ask unlimited questions. | A01; `library/core/rules/R2-ask-within-budget.md`, `R5-code-before-docs.md`, `R10-autonomy-is-contract.md`. |

## Consistency table of IDs

| ID | Used in SL06 as | Resolves to | Status |
|----|-----------------|-------------|--------|
| A01 | Owner in the final line | `library/core/agents/partner.md` | Accepted (A01) |
| R2 | Question budget in the final line | `library/core/rules/R2-ask-within-budget.md` | Accepted |
| R5 | Code-before-docs in the final line | `library/core/rules/R5-code-before-docs.md` | Accepted |
| R10 | Autonomy contract in the final line | `library/core/rules/R10-autonomy-is-contract.md` | Accepted |
| D01 | Range `templates D01-D10`; `BRIEF.md` in the file map | `docs/BUILD-PLAN.md:84` | Running |
| D02 | Missing owner and read source for `STATE.md` | `docs/BUILD-PLAN.md:85` | Pending |
| D03 | Missing owner and read source for `DECISIONS.md` | `docs/BUILD-PLAN.md:86` | Pending |
| D04 | Missing owner and read source for `GAME.md` | `docs/BUILD-PLAN.md:87` | Pending |
| D05 | Missing owner and read source for `BACKLOG.md` | `docs/BUILD-PLAN.md:88` | Pending |
| D06 | Range `templates D01-D10` | `docs/BUILD-PLAN.md:89` | Pending |
| D07 | Range `templates D01-D10` | `docs/BUILD-PLAN.md:90` | Pending |
| D08 | Range `templates D01-D10` | `docs/BUILD-PLAN.md:91` | Pending |
| D09 | `docs/guide/` in the Guide line | `docs/BUILD-PLAN.md:92` | Pending |
| D10 | Range `templates D01-D10` | `docs/BUILD-PLAN.md:93` | Pending |

## Deliberate omissions

- No restatement of R1-R10 or the five mode definitions. `AGENTS.md` owns them; `/help` gives one-line glosses and points to the source. Copying the rules would blow the command budget and create a second authority.
- No mode selection, no questions, no recommendation. `/start` owns onboarding and the R2 budget; `/help` reports the mode already in `STATE.md`.
- No ranking, summarising, or gate inference. `/status` owns the value snapshot; `/help` explains the labels.
- No backlog selection. `/next` owns the choice and its `Why:` line; `/help` only names the command.
- No verification run. `/verify` owns the runner and the PASS/FAIL evidence; `/help` never executes anything.
- No retro file. `/retro` owns the five lines and the dated file; `/help` only points to it.
- No `BRIEF.md` or `TASTE.md` read. The map does not need the idea or the taste; `/start` reads `BRIEF.md`, and D04 covers `GAME.md` + `TASTE.md`. `BRIEF.md` still appears in the file map.
- No `agent.lock.json` read. Installed-part status belongs to `/status` (CLI01); `/help` maps static locations, not the lock.
- No `docs/retro/`, `evals/`, or `prototypes/` in the Files line. The one-line map keeps the main destinations; see the weaknesses below.
- No command implementation detail. Each sibling command's own file is the authority; `/help` gives only the job in one phrase.
- No writes, runs, questions, or network access.

## Size

| Measure | Value |
|---------|-------|
| Characters | 1,185 |
| Tokens (chars/4) | 296.25 raw; 297 integer ceiling |
| Command budget | 300 |
| Headroom | 3 tokens |
| Lines | 18 |
| Bytes | 1,185 |
| Encoding | UTF-8, no BOM |
| Line endings | LF (0 CR) |
| Trailing newline | None, to hold the measured 1,185 characters |

## Risks and limits

- The 3-token headroom is thin. Any added sentence requires a cut elsewhere; the next editor should re-run the linter, not just count characters.
- `Next:` uses `<command>` as a placeholder. The command itself does not prescribe a deterministic mapping from state to command; the agent chooses among the six and must keep the choice consistent with the gate, blockers, and mode.
- A fresh v0.3 template will show four `Missing:` lines until D02-D05 land in batch 14. That is the intended degradation, but the first-run experience is incomplete.
- `GAME.md` is summarised to one line. If the file grows, the agent must pick the line that describes the game, not the current milestone.
- `docs/retro/` is absent from the Files line. `/retro` names it, but a user reading only `/help` may not find past retros.
- The command reads `DECISIONS.md` in addition to the four files named in the brief. This is deliberate: D03 is a required missing-file owner and the file explains the mode and gate. The extra read is recorded as an open question.
- No trailing newline deviates from the usual POSIX text convention. It is deliberate to preserve the measured 1,185 characters; `tools/lint-agent-context.mjs` does not require one.
- The command is English, like the other agent artifacts; the human guide it points to (`docs/guide/`, D09) is Russian. The split is intentional and follows A01's language rule.
