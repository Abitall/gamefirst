# D05 — BACKLOG.md: justification

Status: review-ready
Artifact: `template/BACKLOG.md`
Mirror: `staging/D05/artifact/template/BACKLOG.md`
Scope: one document template. No gate, no state file, no decision log, no bug tracker, no schedule.

## Why this unit exists

R9 sends every mid-stage idea to `BACKLOG.md` in one line: what it is, the value it adds, the cost it carries; the idea waits until a gate can pay for it. E06 tests exactly that move, and G2.5 prices an idea rather than rejecting it. Without a fixed line, each writer invents a shape: one writes prose with no cost, another a checkbox with no value, `/next` cannot tell open from closed, and a fresh project cannot reach its documented empty state.

The file is deliberately not a plan. An idea here is not a promise; the budget lives in `STATE.md` (D02), the spending rule in R9, the freeze record in `DECISIONS.md` (D03). The template fixes five fields and three statuses, ships empty, and leaves selection to `/next`. The cheapest correct action — park the idea in one line — is also the cheapest action to take.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| H1 `# BACKLOG` and the file name | The path every caller opens: `AGENTS.md` names it, `/status` reports it missing, `/next` reads it, A01 may edit it | No file; `/status` prints `Missing: BACKLOG.md — D05`; `/next` stops; R9 has no destination for an idea | `template/AGENTS.md:26,34`; `template/.opencode/commands/status.md:7,9`; `template/.opencode/commands/next.md:9` |
| Opening: ideas outside scope, not promises, one minute, a gate pays | Sets authority before content: the line is cheap, the work is not; a parked line is not a commitment | The file becomes a wish list or a plan; parked lines read as scheduled; E06's park-don't-build move loses its frame | github/roadmap disclaimer (quoted in `SOURCES.md`); R9 "Then it waits"; `docs/V0.3-BLUEPRINT.md:262` |
| Budget and mode in `STATE.md` (D02), spending rule in R9, the file holds ideas only | Prevents a second budget record; the file cannot grant scope | BACKLOG competes with STATE; two budgets; A04 reads the gap as scope that grew without a cut | R9 ("the budget ... sits in `STATE.md`"); A04; `template/AGENTS.md:26` |
| G2.5 paragraph: the freeze prices an idea; new mechanic, system, mode or screen waits for a one-in-one-out trade named in `DECISIONS.md` (D03); a fix restoring frozen behavior is not a feature | States the post-freeze rule where an idea arrives; without it a parked idea looks blocked or forbidden | After G2.5 an agent either builds the idea (breaks the freeze) or deletes it (breaks R9); no path to a priced trade | `library/game/gates/G2.5-feature-freeze.md:14-24`; R9 "cut or park"; E06 |
| "Одна строка — одна идея", duplicate check | One item per line keeps `/next` selectable and the file countable; the check stops the same idea at P1 and P3 | A line bundles two ideas; `/next` picks a bundle; duplicates inflate the page and split the cost | godot-proposals README ("Use one issue per proposal"; "Search existing proposals"); E06 "adds one line" |
| Legend indented inside a fence, labelled "not items" | Shows the exact line without creating one: a column-0 `- [ ]` is parsed by the status tool and picked by `/next`; the template must ship empty | A fresh project's `/next` proposes `[...]` as work; the status tool counts phantom items | `staging/CLI02/artifact/tools/status.mjs:133-144` (`^[-*+]\s+`); `template/.opencode/commands/next.md:20` |
| Three legend rows with `[...]` slots and statuses next, parked, cut | Fixes field order and shows all three statuses without a filled example; the slots are the fill contract, not content | Field order drifts per writer; statuses are forgotten; a filled example invites copying | D01 `[...]` convention; E06 expected line; `docs/V0.3-BLUEPRINT.md:262` |
| **Идея** definition | Says what the line is: a player-visible change, not a technical task | Lines about refactors, tools or "polish"; the file stops being a player-value list | R9 "what it is"; github/roadmap "Every item ... is an issue" (a feature, not a chore) |
| **Ценность**: what the player gets and which `BRIEF.md` promise it serves; «интереснее» is not value | Forces a concrete benefit and ties it to a promise; blocks the "more fun" argument E06 fails | Value becomes taste; E06 fails; G2.5 and G3 cannot compare two ideas | E06 fail "takes 'more fun' as value"; D01 `BRIEF.md`; R9 "the value it adds" |
| **Цена**: days to playable plus what keeps costing — HUD, content, test, upkeep | A number makes the trade possible; the tail names the upkeep R9 charges after ship | Cost is "some work"; one-in-one-out cannot compare; E06 fails "line lacks cost" | E06 expected "cost in days plus HUD and test upkeep"; R9 "time, code, content, tests, and upkeep" |
| **Приоритет**: order, not deadline; P1 before P2; next first; no numeric score | Gives `/next` a readable rank without a formula; keeps the file from becoming a schedule or a score | Priorities become dates or invented coefficients; `/next` does no reprioritisation, so a hidden formula is dead weight | `staging/SL03/JUSTIFICATION.md` (selection shape, not a formula); D05 owns the format |
| **Статус**: next, parked, cut | Three states are the minimum `/next` needs: work now, wait, closed; cut is reversible only by R9's adding rule | No open/closed distinction; `/next` cannot honor "named closed item: `BLOCKING`"; cut lines get silently revived | `template/.opencode/commands/next.md:11-13`; R9 "Moving a line off the cut list is the same act as adding a feature" |
| Checkbox `[ ]` / `[x]`, `/next` takes open, a shipped next leaves | Gives status a marker in the first two characters; the exit rule keeps shipped items from returning as work | Free-text statuses; a shipped item stays open and is picked again | `staging/CLI02/artifact/tools/status.mjs:136-142`; `template/.opencode/commands/next.md:11` |
| H2 `Формат` and `Идеи`, empty-list line naming `/next`, A01 and R2 | Splits the legend from the list and says empty is valid; names the exact phrase and the first writer | A missing file reads as an error; an author adds a fake first item; `/next`'s empty path is never exercised | `template/.opencode/commands/next.md:20`; A01 duties; R2 |
| Russian, one page | A01 puts D05 among the RU documents; one page is readable in a session | English prose in a RU document; the file grows into a second GDD | A01 language rule; `docs/V0.3-BLUEPRINT.md:262`; D01 one-page precedent |

## Deliberately absent (why this is not STATE, DECISIONS, or a bug tracker)

- **State fields** (phase, mode, gate, next action, budget numbers). D02 owns them. `/next` reads both files and STATE wins; copying them here would create a second record that can disagree.
- **Decision records** (the G2.5 In/Out/Budget list, the one-in-one-out text). D03 owns them. D05 points at `DECISIONS.md` and does not restate the record.
- **Bug tracker shape** (severity, steps, regression or known). G2.5 owns triage; a non-blocker arrives as an ordinary line whose idea is the fix. A second schema would break the one-line, one-page format.
- **Deadlines, dates, owners, sprints.** Priority is order, not a schedule. A01 is the writer; a date would age the file and invite a plan.
- **Numeric scoring** (urgency × impact, RICE, WSJF). SL03 borrows Taskwarrior's selection shape, not its formula; a score needs upkeep and hides the trade that R9 wants visible.
- **A `done` status.** A shipped next leaves; completion lives in the build and in STATE's budget. A fourth status would duplicate D02 and give `/next` a closed item it cannot rank.
- **Links, attachments, design detail per idea.** One line, one page. Detail is written after a gate pays, not before.
- **Retention rule for cut lines.** The authoritative cut list is STATE's budget and the G2.5 Out record; a cut row here is a convenience, not the record.
- **A filled example or a sample game.** It invites copying and would create a fake item; the legend uses slots only.
- **`{{...}}` placeholders.** The framework uses `{{...}}` in command templates; a document that borrows the syntax looks executable. D05 uses `[...]`.

## Consistency table of IDs

| ID | Used in D05 as | Resolves to | Status |
|---|---|---|---|
| D01 | `BRIEF.md`: the promise the value serves | `template/BRIEF.md` | accepted (`docs/BUILD-PLAN.md:84`) |
| D02 | `STATE.md`: budget, mode, the named next | `template/STATE.md` | running (`docs/BUILD-PLAN.md:85`) |
| D03 | `DECISIONS.md`: freeze record, one-in-one-out trade | `template/DECISIONS.md` | running (`docs/BUILD-PLAN.md:86`) |
| R9 | Budget rule; idea line; cut return equals adding | `library/core/rules/R9-scope-is-budget.md` | accepted (`docs/BUILD-PLAN.md:31`) |
| G2.5 | Freeze prices; only fixes; one in, one out | `library/game/gates/G2.5-feature-freeze.md` | accepted (`docs/BUILD-PLAN.md:55`) |
| A01 | First writer; RU language; edits BACKLOG | `library/core/agents/partner.md` | accepted (`docs/BUILD-PLAN.md:33`) |
| R2 | Three questions per stage; the first item is asked within that budget | `library/core/rules/R2-ask-within-budget.md` | assembled (`docs/BUILD-PLAN.md:22`) |
| SL03 | `/next`: open item, closed item, empty file | `template/.opencode/commands/next.md` | accepted (`docs/BUILD-PLAN.md:80`) |
| SL02 | `/status`: the file must exist | `template/.opencode/commands/status.md` | accepted (`docs/BUILD-PLAN.md:79`) |
| E06 | The one-line park with cost and priority | `library/core/evals/E06-scope-guard.md` | accepted (`docs/BUILD-PLAN.md:61`) |
| D05 | This part | `template/BACKLOG.md` | running (`docs/BUILD-PLAN.md:88`) |

Every ID in the artifact resolves to a file or a BUILD-PLAN line. The check in `REPORT.md` asserts the seven IDs printed in the artifact, the three statuses, the nine slots, zero parsed items, and the four referenced files.

## Size

| Measure | Value | Target | Verdict |
|---|---|---|---|
| Characters | 1,466 | - | - |
| Tokens (characters / 4) | 366.5 | 350–500 | inside |
| Hard limit | 366.5 | 600 | under by 233.5 (38.9%) |
| Lines | 26 | 70 (proxy) | 44 spare |
| Bytes | 2,402 | - | - |

UTF-8, no BOM, zero CR, LF line endings, trailing newline. Bytes exceed characters by 936 because Russian letters take two bytes and the em dash three; beyond Cyrillic the only non-ASCII are angle brackets and the em dash.

Named cut: if the target floor is enforced and the page must stay under, the three-row legend would go first (with the format moving to one inline line), saving about 180 characters; the artifact then drops near 320 tokens. Not needed at 366.5.

## Risks and limits

- The legend sits inside an indented fence so the status tool does not count it. A writer who copies it may keep the two-space indent, which the tool ignores; the line still parses as intended in review but not as an item. This is the price of shipping an empty file.
- `/next` is an LLM command, not a parser. It can still pick a legend row if it ignores the "not items" label; the empty-list line is the only guard.
- `next` is defined as one item, paid and named in STATE. If a project keeps several promoted items, the rule breaks; no caller currently needs more than one.
- The status tool counts any column-0 `- ` line as an open item. A future field written as a bullet, or a fenced example without indent, silently becomes a backlog item.
- The artifact does not define a bug line. G2.5 routes non-blocker bugs here; they reuse the idea line, so a bug's severity and steps have no field and must live in the triage note or the fix's test.
- Cut lines have no retention rule; if A01 deletes them, the G2.5 Out record is the only trace. That is deliberate, but it makes the `cut` status transient.
- Priority is a hand-written order. Nothing checks that P1 above P2 is honest, and `/next` does not reprioritise.
- The file ships empty, so a reviewer cannot see a filled line in context. E06's fixture is the filled case; the template only shows slots.
- D02 and D03 are running in the same batch; if their file names or authority rules change, the cross-refs here must follow. The check resolves only D01, R9, G2.5 and A01 today.
- One page is a token and 70-line proxy, not a printed page.
