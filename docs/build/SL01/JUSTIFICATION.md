# SL01 — `/start`: justification

Every unit of the command is listed once. Sources are the three in `SOURCES.md`, the accepted A01 artifact, or the blueprint rows that define the IDs. The command is a prompt, so "unit" means a sentence, a block, or a frontmatter key.

## Units

| # | Unit | Why it exists | What breaks if removed | Source |
|---:|---|---|---|---|
| 1 | `description:` | The command must be distinguishable in the `/` list; the description is the only hint before it runs | Two onboarding commands look alike and the user cannot tell which one reads state | OpenCode command schema; `BRIEF.md` |
| 2 | `agent: partner` | A01 owns onboarding, STATE, questions, routing, and the gate line; `/start` must run as that agent | The command runs under a coding or design agent that may write `src/` and skip the question budget | A01 |
| 3 | `subtask: false` | Questions need the main session: the user's answers, `DECISIONS.md`, and the next command stay in one place | A subtask returns a summary, the dialogue ends, and a `you decide` answer has nowhere to land | OpenCode command schema; A01 |
| 4 | Read `AGENTS.md`, `BRIEF.md`, `STATE.md`, `DECISIONS.md`, `BACKLOG.md` | Onboarding starts from the recorded truth, not from the chat; `STATE.md` is the truth (A01) | The mode, phase, next action, and blockers are guessed; questions repeat what the files already answer (R2 bug) | A01; R2 |
| 5 | Missing-file mapping to D01, D02, D03, D05, template | A gap is useful only if it names the fix; each ID points at the template that creates the file | The user is told "STATE.md is missing" with no path to the fix, or the agent scaffolds a stub | `docs/V0.3-BLUEPRINT.md:257-261`; `docs/BUILD-PLAN.md:84-88`; `template/AGENTS.md:30-36` |
| 6 | "Create no file; a missing source leaves its field `missing`." | `/start` is read-only: a stub would hide the gap and make the next command trust a false state | Onboarding fabricates `STATE.md`, `BRIEF.md`, or `BACKLOG.md`; the real work is hidden behind an empty file | R5 (no doc before code); `BRIEF.md` constraint "no code, no edits, no new facts" |
| 7 | Five modes: `discuss`, `prototype`, `production`, `autonomous`, `review` | The mode vocabulary is fixed by the blueprint and recorded in `STATE.md`; a synonym would split the record | The agent invents a mode name; `/status`, `/next`, and the gate record disagree on what "production" means | `docs/V0.3-BLUEPRINT.md:327`; `template/AGENTS.md:9` |
| 8 | Recommendation rule (no BRIEF -> discuss; before G1 -> prototype; after G1 -> production; at a gate -> review; R10 contract -> autonomous; otherwise discuss) | One recommendation moves work; a menu of five modes asks the user to design the process. The rule reads the phase, not taste, and the last case covers an unreadable phase | `/start` becomes a questionnaire; two runs on the same state recommend different modes; autonomous starts without a contract; a missing `STATE.md` leaves the mode undefined | BMAD "right-sized process" and `bmad-help`; spec-kit "independent entry points"; R10 |
| 9 | "A mode named in `$ARGUMENTS` wins." | A returning user can write `/start production` and skip one exchange; the argument is already the user's decision | The command recommends against an explicit instruction; the user repeats the mode in chat | Brief: `$ARGUMENTS` only if useful; A01 |
| 10 | "Ask at most 3 questions for the stage (R2), one message, each with a recommendation, a reason, and `you decide`" | R2's budget is per stage, not per command; one message keeps the questions comparable; a recommendation keeps the dialogue moving. The one-line summary has the same shape as `template/AGENTS.md:25`; R2 owns the detail | Four or more questions, split across messages; E04 fails; the user answers a form instead of a decision | R2; `template/AGENTS.md:25`; spec-kit `clarify` (capped questions, recommended option) |
| 11 | "record a `you decide` answer in `DECISIONS.md`" | A delegated decision is still a decision; R2 requires it on disk, not in the transcript | The choice disappears on the next resume; the same question is asked again; `DECISIONS.md` is incomplete | R2 |
| 12 | "Output one screen; no code, no new facts. Write nothing except the R2 entry:" | `/start` reports; it does not build, document, or create. One screen is the A01 report shape and leaves `/status` owning detail | `/start` turns into a design session or a second status report; the next action is buried; a guessed fact becomes state | A01 ("One screen"); R1 (build is truth) |
| 13 | Five fields: `Mode:`, `Phase:`, `Next:`, `Blocked:`, `Questions:` | The minimum a user needs to resume: what process, what stage, what action, what stops it, what is still open | The user cannot tell where the project is; `Next` and `Blocked` blur; the question budget is invisible | A01; D02 `STATE.md`; R2 |
| 14 | `Mode: <mode> — <one-line reason>` | The reason makes the recommendation contestable in one line; it is not a second question | The user sees a mode with no basis and either accepts blindly or asks why | BMAD `bmad-help`; spec-kit recommended option |
| 15 | `Phase/Next/Blocked` read from `STATE.md`, not produced here | D02 owns those facts; one fact in one place (R5); `/next` reads the same file | Two writers produce two truths; a resume starts from the command instead of `STATE.md` | A01; D02; R5 |
| 16 | "A01 owns the work; R2, R5, R9, R10 apply as written." | The command must cross-reference the duties and rules without copying their text; a copy drifts | The command grows a second copy of A01 and the rules, and the next edit updates one copy only | A01; R5 ("one fact, one file"); R6 |

## ID consistency

| ID | Kind | Resolves to | Used in unit |
|---|---|---|---|
| A01 | accepted agent | `staging/A01/artifact/library/core/agents/partner.md`; target `library/core/agents/partner.md` (`docs/BUILD-PLAN.md:33`) | 2, 4, 9, 12, 15, 16 |
| R2 | accepted rule | `library/core/rules/R2-ask-within-budget.md` | 4, 10, 11, 13, 16 |
| R5 | accepted rule | `library/core/rules/R5-code-before-docs.md` | 6, 15, 16 |
| R9 | accepted rule | `library/core/rules/R9-scope-is-budget.md` | 16 |
| R10 | accepted rule | `library/core/rules/R10-autonomy-is-contract.md` | 8, 16 |
| D01 | document template (pending) | `BRIEF.md`; `docs/V0.3-BLUEPRINT.md:257`, `docs/BUILD-PLAN.md:84` | 5 |
| D02 | document template (pending) | `STATE.md`; `docs/V0.3-BLUEPRINT.md:258`, `docs/BUILD-PLAN.md:85` | 5, 13, 15 |
| D03 | document template (pending) | `DECISIONS.md`; `docs/V0.3-BLUEPRINT.md:259`, `docs/BUILD-PLAN.md:86` | 5 |
| D05 | document template (pending) | `BACKLOG.md`; `docs/V0.3-BLUEPRINT.md:261`, `docs/BUILD-PLAN.md:88` | 5 |
| G1 | gate | `library/game/gates/G1-fun.md` (accepted) | 8 |
| SL01 | command | this part; `docs/BUILD-PLAN.md:78` | — |

## Deliberate omissions

- No `GAME.md`/`TASTE.md` read. A01 reads them for design work; `/start` needs the five files that decide the mode and the next action. Adding two more reads makes onboarding slower without changing the screen.
- No question about the mode when the phase decides it. The recommendation is the proposal; the user can still name another mode, including through `$ARGUMENTS`.
- No copy of R2's wording, A01's duties, or the gate definitions. The IDs are the link; the command states only what changes the run.
- No write to `STATE.md`. The mode is recorded when it changes, by A01, not by the onboarding read.
