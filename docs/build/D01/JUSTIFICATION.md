# D01 — BRIEF.md: justification

Status: review-ready
Artifact: `template/BRIEF.md`
Mirror: `staging/D01/artifact/template/BRIEF.md`
Scope: one document template. No GDD, no system design, no architecture, no schedule.

## Why this unit exists

`/start` reads `BRIEF.md` before anything else; without it, a new project opens in `discuss` mode. S06 produces the raw material and a draft; G0 turns that draft into one decision: build a prototype or revise. The template is the contract for the page between them. It fixes the order, the questions, and the stops, so a concept cannot arrive as a GDD, a feature list, or a mood. It is deliberately smaller than S06's output and much smaller than a GDD; the missing parts are named below.

The template is also a scope device. Each section is a sentence or a short list; constraints and non-goals put a ceiling on the first prototype; kill criteria and the next question give G0 and C01 something to decide before code. R9 sends a second idea to `BACKLOG.md` instead of letting it lengthen the page. The result is one page that can be read in a session and tested in a prototype, not a plan for a game.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| H1 `# BRIEF` and the file name | Names the artifact that `/start` and G0 look for; the file is the project's front page | A generated project has no brief; `/start` falls into `discuss`; G0 has nothing to decide | `template/AGENTS.md:32`; `docs/BUILD-PLAN.md` row 13; `template/.opencode/commands/start.md` |
| Protocol line: S06 drafts, G0 decides, one page, replace slots, second page to BACKLOG | States provenance and authority before any content; makes the one-page rule and the fill contract explicit | The author treats the brief as a GDD, asks G0 to draft, leaves `[...]` in place, or adds a second page; ownership and scope blur | G0 lines 3, 11, 35; S06 step 7; R9; D01 brief |
| `## Working title` | A stable handle for the file, the decision line, and the prototype; explicitly allowed to change | Notes, DECISIONS lines, and builds refer to different names; the title becomes a branding decision before the idea is tested | D01 brief; `template/AGENTS.md:32`; S06 step 1 |
| `## Hook` | One sentence in player terms; S06's one-sentence goal test; prevents "X but with Y" | Two ideas in one brief, a genre label instead of a hook, or a clone pitch; a reader cannot say what the game is | S06 step 1; G0 check 3 |
| `## Player fantasy` | The feeling the loop must deliver, in one sentence; anchors the aesthetic before mechanics | The brief lists mechanics or a mood; no one can tell what the player gets to be; playtest feedback has no target | G0 line 13; S06 step 7 |
| `## Core loop` | Three steps, act/feedback/next act; each must name an action and a build-visible result | The loop is a feature list or a theme; the prototype has nothing to test; G0 check 1 fails | G0 lines 14, 24; S06 step 7 |
| `## Audience` | Who they are and what they already play; gives a reference point and a reason to care | "Everyone" is the audience; choices have no player to satisfy; S06's blocked rule (no audience, no done) is violated | G0 line 15; S06 blocked rule |
| `## References` | Three other works; each names a borrowed verb or feeling and why it fits; separates inspiration from skin | The brief becomes a clone or a mood board; "X but with Y" survives; G0 check 3 fails | G0 line 26; S06 step 4; R7 |
| `## Constraints` | Time, scope, skills: the ceiling the brief must fit; scope is a budget, not a wish | The prototype expands past the available time or skills; the brief promises what cannot be built; R9 has no number to spend | G0 line 16; R9; D01 brief |
| `## Non-goals` | Two or three explicit exclusions; sends a second idea to `BACKLOG.md` | Scope creep; the brief becomes a feature list; the second idea is smuggled into the first | G0 line 18 and check 2; R9 |
| `## Kill criteria` | One observable condition that ends the prototype; not a player fail state; written before the build | The prototype runs on sunk cost; there is no decision point; C01's kill criterion is missing | G0 line 19; C01 |
| `## Next prototype question` | One yes/no or numeric question a greybox can answer; routes to a prototype, not a GDD | The next step becomes a GDD or architecture; the prototype has no test; G0 check 4 fails | G0 line 20, checks 1 and 4 |
| `## Open questions` | At most three unresolved questions, each with a recommendation; R2's budget and format | Hidden assumptions; false certainty; question sprawl; the author asks ten things or none | R2; S06 step 2 |
| `[...]` slots, no `{{...}}` | Marks every place that needs a decision; a bracket cannot be mistaken for a value; `{{...}}` is the framework's command syntax, not a document token | The template ships with invented values or ambiguous braces; a filler cannot tell text from placeholder; D01's explicit format fails | D01 brief; Best-README `BLANK_README.md` |
| One page, English | The brief is read before the prototype and must fit one page; English is the framework artifact language | The brief grows into a GDD; reading it costs a session; language splits the team; G0 check 2 fails | G0 line 11 and check 2; `template/AGENTS.md:32` |

## Deliberately absent (why this is not a GDD)

- **Pillars.** G0 says S06's pillars stay in the S06 output; the D01 section list omits them. The brief inherits the pillars by reference, not by copying them. Adding them would make a second list that can drift.
- **Risks.** Same rule: S06's risks stay in its package; the brief has kill criteria and open questions, which are the only risks it can act on before a prototype.
- **Visual and audio direction.** G0 asks for one line; D01 omits it. Look and sound belong to the art bible and the prototype's presentation pass. The brief keeps references, not a style guide.
- **Pass criterion.** C01 asks for one pass criterion and one kill criterion before the build. D01 has only kill criteria. The next prototype question is the de facto pass test (yes/no or a number), but it is not labelled as a pass criterion. This is flagged in `REPORT.md`.
- **Surprise line.** R7 puts the surprising result in the S06 brief, not in D01. The S06 package carries it; duplicating it here would create a second record.
- **Feature list and content plan.** G0 check 2 forbids a feature list; R9 sends extras to `BACKLOG.md`. A feature list is the first symptom of a GDD.
- **Systems, formulas, balance, economy.** These are GDD work, not a one-page concept brief. The brief has no numbers to tune and no interaction budget.
- **Architecture, engine, and tech stack.** Architecture follows the GDD and the prototype question; the brief is engine-agnostic and must not lock a technology choice.
- **Schedule, milestones, budget.** These belong to the producer's plan. The brief has a time constraint, but no dates, costs, or deliverables.
- **Art and audio assets.** The art bible and asset specs own them; three references are inspirations, not production orders.
- **Success metrics and KPIs.** The kill test and the next question are the decision tests. Analytics and targets arrive after there is a loop to measure.
- **`{{...}}` placeholders.** The framework uses `{{...}}` in command templates; a document that borrows that syntax looks executable. D01 requires `[...]`.
- **Filled examples.** A sample game would smuggle in decisions and invite copying. The template ships with empty slots only.

## Consistency table of IDs

| ID | Used in D01 as | Resolves to | Status |
|---|---|---|---|
| G0 | Decision step named in the protocol line | `library/game/gates/G0-concept-brief.md` | accepted (`docs/BUILD-PLAN.md` row 7) |
| S06 | Drafting step named in the protocol line | `library/game/skills/brainstorm/SKILL.md` | accepted (row 5) |
| R2 | Open-question budget and recommended-answer format | `library/core/rules/R2-ask-within-budget.md` | assembled (row 1) |
| R7 | References: borrowed verb or feeling, distant works | `library/core/rules/R7-diverge-before-converge.md` | assembled (row 2) |
| R9 | Second page and second idea go to `BACKLOG.md` | `library/core/rules/R9-scope-is-budget.md` | accepted (row 3) |
| C01 | Kill criterion written before the build | `library/game/crews/prototype-crew.md` | accepted (row 6) |
| D01 | This part | `template/BRIEF.md`; review copy at `staging/D01/artifact/template/BRIEF.md` | running (row 13) |

Every ID used in the artifact resolves to a file or to a BUILD-PLAN row. `BACKLOG.md` is a path reference, not a D05 claim; D05 is pending (row 14). The one check in `REPORT.md` asserts the five required IDs and the heading order.

## Size

| Measure | Value | Target | Verdict |
|---|---|---|---|
| Characters | 1,821 | - | - |
| Tokens (characters / 4) | 455.25 | 800 | under by 344.75 (43.1%) |
| Lines | 55 | - | - |
| Bytes | 1,831 | - | - |

UTF-8, no BOM, zero CR, LF line endings, trailing newline. The five non-ASCII characters are em dashes in the references and constraints; all prose is English.

Named cut: if 800 became a hard limit, remove the third open-question slot and the `Skills` tail, saving about 120 characters. Not needed at 455.25.

## Risks and limits

- G0's brief spec includes pillars, risks, and visual/audio direction; the D01 section list omits them. The S06 output carries them, but a reviewer reading G0 alone may see a gap. If G0 is enforced literally, D01 needs three fields and will exceed the current section count.
- There is no pass criterion, although C01 asks for one. The next prototype question is the de facto pass test but is not labelled. A reviewer should decide whether that is enough for v0.3.
- The prompts remain in a filled brief unless the author deletes them. The header says to delete them; no check enforces deletion.
- `[...]` slots can be left unfilled. The check proves the template's shape, not that a filled brief is complete or good.
- One page is measured by tokens and a 70-line proxy, not by a printed page. At large type, 55 lines may run to two pages.
- The PR/FAQ source is from 2020 and has 119 stars; it is an exact analogue but weak on the rubric's popularity and currency tests. This is stated in `SOURCES.md`, not hidden.
- The live `template/BRIEF.md` is not written by this part; only the staging review copy exists. `/start` reads the live target, so installation is a separate step.
- There is no runtime test. The part is a document; the static check verifies structure, IDs, encoding, and size, and review covers quality.
- The `Q1/3` format can imply exactly three open questions; the text says at most three. A filler who writes one question may leave `Q2/3` and `Q3/3` behind.
- The hook's "No genre label" is a strong prompt, not a hard check. A genre label can be part of a legitimate hook; the author may ignore it.
