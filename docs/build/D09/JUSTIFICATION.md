# D09 - guide: justification

Status: review-ready
Artifact: `template/docs/guide/README.md`
Mirror: `staging/D09/artifact/template/docs/guide/README.md`
Scope: one Russian page. Orientation only: install, first game, six commands, modes, file map, `BLOCKING`, gates, next step. No rules text, no command reference, no engine setup. Sources S1-S3 are defined in `SOURCES.md`.

## What this page is for

The template README sells the pipeline; this page tells a Russian-speaking solo developer what to type after `new-project` and where to look when lost. It exists because the six command files are written for the agent, `AGENTS.md` is a contract, and neither answers "what do I do first" in one screen. The page is deliberately smaller than `/help`: it names each file once and links the reader to the owner of the detail (`/help`, `AGENTS.md`), instead of restating rules that would drift.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| H1 `# Руководство` and the file path | The landing page that `template/README.md` and `/help` point to under `docs/guide/` | The docs pointer lands on an empty directory; the game repo has no entry page | S2 (H1 convention); D09 spec |
| One-line thesis and pointers to `AGENTS.md` and `/help` | Sets the order "loop first, documents second" and the page's boundary before any procedure | The page is read as a specification, duplicates rules, or hides the two authoritative files | S2 (one-line statement); S3 (`AGENTS.md`, SL06) |
| `## Установка` and the prerequisite line | Installation is the first failure point; Node and OpenCode are the only hard prerequisites | A missing Node fails deep inside the CLI with an unreadable stack; OpenCode is assumed silently | S1 (numbered setup); S3 (CLI01) |
| Step 1, the `new-project` command | The only supported way to create a project; flags fix name, packs and local git | The user clones the template, edits it in place, or misses `--packs game`, and has no commands or crews | S3 (CLI01: new/empty target, `--name`, `--packs`, `--git`) |
| Step 2, open the project in OpenCode | Loading the folder is what activates `AGENTS.md` and `.opencode/` | The agent runs without the project contract and falls back to generic behaviour | S3 (`AGENTS.md`; template layout) |
| Step 3, `/start` | The first command, and the one that picks a mode and reads state | The user opens `GAME.md` first, writes design documents, or asks an open question with no context | S3 (SL01) |
| Note on `core` and `game` packs | Explains the flag the user just typed; `core` is the floor, `game` is the optional layer | `--packs core,game` is opaque; users drop `game` to "keep it small" and lose skills, crews and gates | S3 (CLI01 pack matrix) |
| `## Первая игра` and the `BRIEF -> prototype -> G1` order | The shortest correct path from an idea to a playable loop; fixes what is written when | `GAME.md` is written before anything is played; the brief becomes a design doc; the prototype has no test | S3 (G0/G1, GAME header) |
| "One session, one step from `STATE.md`" | Keeps a session bounded and resumable | The user attempts the whole backlog in one run, loses state, and blames the pipeline | S3 (STATE; R2) |
| `## Шесть команд` heading and table header | Groups the command surface; a table is the cheapest scannable form at this size | Commands are rediscovered by reading six files; the page grows by a paragraph per command | S2 (usage section); S3 (SL01-SL06) |
| `/start` row | Names onboarding and its inputs | The user does not know that `/start` reads `STATE` and `BRIEF` and proposes a mode | S3 (SL01) |
| `/status` row | The snapshot: phase, parts, gate, next, blockers | The user greps `STATE.md` by hand or asks the agent "where are we" with no anchor | S3 (SL02) |
| `/next` row | One action, chosen from `STATE` and `BACKLOG` | The user picks work by mood, or asks for a plan and gets a list instead of one step | S3 (SL03) |
| `/verify <claim>` row | Proof is a command, not an assertion | "Done" is accepted without build, types, tests or evidence; failures surface at a gate | S3 (SL04) |
| `/retro` row | Closes the loop and writes a dated record | Sessions end without a trace; the same blocker repeats; there is no history to read | S3 (SL05) |
| `/help` row | The read-only map and the escape hatch when this page is not enough | A lost user has no lookup that covers files, commands, rules and modes together | S3 (SL06) |
| `## Режимы` and the **paired** bullet | Names the default: the human stays in the loop across `discuss`, `prototype`, `production`, `review`; R2 caps questions | The agent is assumed to work unattended; the user answers twenty questions or none; gate decisions drift to the agent | S3 (modes; R2) |
| **autonomous** bullet and the R10 fields | Autonomy has a precondition and an audit trail; names the minimum contract and the log | An unattended run starts without goal, stop or budget; there is no record to review; a runaway cannot be stopped cleanly | S3 (R10; `runs/AUTONOMY.jsonl`) |
| Precedence line `mode > rules > skill > pack > docs` | Resolves conflicts in one line, without a chapter on precedence | When a skill and the mode disagree, the user cannot tell which wins; docs silently override behaviour | S3 (precedence rule) |
| `## Где что лежит` and its six bullets | Maps each file to one job, so the reader edits the right source of truth | State is written into `BRIEF.md`; `DECISIONS.md` is rewritten; `BACKLOG.md` is used as a plan; nobody finds playtests | S3 (`AGENTS.md`; file headers) |
| `## BLOCKING` | Tells the human what a stop means and the one correct response | A stop is read as a bug; the user says "try again", the agent loops, and E08 burns three attempts | S3 (SL03; E08; STATE hard stop) |
| Gates intro: a decision is a dated line, the agent does not set it | Separates the human's signature from the agent's recommendation | The agent marks a gate passed; the decision has no date and cannot be audited | S3 (gate protocol) |
| `G1 fun` bullet with four outcomes | The first real keep/kill decision, with a bounded retune | The prototype iterates forever, or is killed without a named alternative | S3 (G1) |
| `G2 slice` bullet | The scope decision before production | The vertical slice expands; "fix" and "pivot" are not on the table | S3 (G2) |
| `G2.5` bullet: not a gate, feature freeze | Prevents a freeze being mistaken for a decision, and names what follows | Features keep entering after freeze, or the team waits for a signature that never comes | S3 (G2.5) |
| `G3 ship` bullet | The release decision, stated as ship or hold | Shipping is implicit; a hold has no name and no next action | S3 (G3) |
| `## Дальше` | A closing action and the template ID range | The page ends without a next step; `D01-D10` references elsewhere are unexplained | S3 (SL01; template roster) |

## Rejected alternatives

- **Full output formats of `/status` and `/help`.** Would add six and seven labelled lines; the command files already own them and the page would exceed one screen.
- **Troubleshooting table.** Install errors are few and already actionable ("target not empty", missing Node); a table would double the install section for rare cases.
- **File tree diagram.** Duplicates the six bullets and the template README; a tree also goes stale faster than a role list.
- **Diataxis split (tutorial/how-to/reference/explanation).** Correct taxonomy, but four pages; the task is one page that points at the owners of each type.
- **Minute-by-minute "first 30 minutes" tutorial.** The route depends on mode and on what the first session finds; a fixed script would be wrong on the second run.
- **Engine pack installation.** No implemented engine pack path in v0.3: `new-project` accepts `core,game` only. Promising it would create a dead command.
- **Glossary of R1-R10 and gate IDs.** `/help` and `AGENTS.md` own the rule list; a glossary here would be a second copy that drifts.
- **Screenshots.** No stable UI to show, and images would break the one-page text budget.
- **A `G0` line in the gates section.** G0 is a brief, not a gate, and does not change the route; `## Первая игра` already sends the reader through `BRIEF` and the prototype.

## Known deviations

- Research budget is 3 sources (2 external + 1 internal), per the task, while `staging/README.md` describes a 9-repository rule. Flagged in `REPORT.md`.
- `paired` is not a literal blueprint mode value. The page uses it as the umbrella for the four human-in-the-loop modes and lists those values in the same bullet; flagged in `REPORT.md`.
