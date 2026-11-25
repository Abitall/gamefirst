# SL03 — /next: justification

Status: review-ready
Artifact: `template/.opencode/commands/next.md`
Mirror: `staging/SL03/artifact/template/.opencode/commands/next.md`
Scope: one read-only OpenCode command. No runtime code, no agent change, no rule change, no template change.

## Why this unit exists

`STATE.md` records the committed next action (A01/D02), and `BACKLOG.md` holds the queue of ideas outside scope with cost and priority (D05/R9). `/next` turns those two inputs into one concrete action for the current session, filtered by the gate, blockers, the R9 budget, and the current mode. `/status` (SL02) reports the files; `/next` chooses from them.

Without it, the partner re-derives the next action from chat at every session, silently prioritises the wrong item, or proposes work that the gate, the budget, or the mode forbids. A01 tells the user that `/next` reads STATE, so the command is also the documented consumer of that field.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Frontmatter `description`, `agent: partner`, `subtask: false` | The command is discoverable, runs as the partner, and stays in the current session where STATE and BACKLOG are already in context | The command is unnamed in discovery, runs under the default agent, or pays for a child session that must re-read the same files | OpenCode commands reference (frontmatter, `subtask`/`subagent`, `subagent: false`); SL01/SL02 frontmatter; SL03 brief |
| Read list: `STATE.md`, `BACKLOG.md`, `agent.lock.json` | STATE supplies phase, gate, named next action, and blockers (D02); BACKLOG supplies the queue (D05); the lock supplies installed parts (CLI01) | Selection comes from chat or memory; an action for an uninstalled part is proposed; the named next action is ignored | A01 L43; D02; D05; CLI01; SL03 brief |
| Read-only rule: no write, no run, no question, ignore arguments | `/next` must not race A01's STATE writes, make gate decisions, execute work, or spend the R2 question budget; stray arguments must not change the pick | A second writer races A01; a read command becomes a plan or an executor; `/next foo` selects an arbitrary item | A01 permissions and L43; R2; R5; SL03 brief; `template/opencode.json` edit/shell ask |
| `Print one screen` | The result is a decision, not a report or a roadmap; one screen keeps the action, reason, blockers, and mode together | The command buries the action in analysis and the user still has to choose | A01 "One screen"; SL02 precedent; SL03 brief |
| `Missing: <file> — <part>` with owners D02, D05, CLI01 | Every absent input has a cause and a named creator, so the user edits the right file instead of guessing | The user sees an empty or invented selection and does not know whether STATE, BACKLOG, or the lock is at fault | SL01 missing-source pattern; D02/D05/CLI01 rows in `docs/BUILD-PLAN.md`; SL03 brief |
| Missing STATE or BACKLOG stops with `Next: none`; missing lock only skips the installed-part check | A queue and a gate state are required to choose; the lock only narrows what can run, so its absence degrades rather than blocks | A missing queue produces a fabricated action; a missing lock blocks all work even when the queue is readable | D02; D05; CLI01; R10 stop discipline; SL03 brief |
| `SL02 mirrors files; /next selects` | States the boundary with the accepted `/status` command so the two commands do not grow into each other | `/next` starts reprinting status fields, or `/status` starts ranking backlog items; R5's one-fact rule is broken | SL02 artifact and justification; R5; SL03 brief |
| Pick one open BACKLOG item; the item STATE names wins | STATE is the committed plan (A01); honouring the named item prevents a second, competing plan | `/next` overrides the human's committed next action with its own ranking; chat and STATE diverge | A01 L43; D02; D05; R5 |
| A named non-item comes from STATE (R5) | STATE may name work outside the BACKLOG (a gate review, a decision); that action is still the next action | The command forces a Backlog item, drops the real next action, or invents a substitute | A01; R5; R9 |
| A named closed item is `BLOCKING — <reason>` | A reference to a closed item is a real conflict between STATE and BACKLOG; it must be surfaced, not silently replaced | The command picks a different item, hides the stale STATE pointer, and the user cannot tell why the named action vanished | R5; R10 blocking pattern; SL03 brief |
| Else the top unblocked item within the R9 budget, gate, and mode | The fallback needs a deterministic, explainable ranking; blocked, over-budget, and wrong-mode items must be excluded before priority decides | The command picks an item that cannot start, exceeds the stage budget, or contradicts the mode; priority alone overrides hard constraints | R9; R10; v0.3 blueprint modes; Taskwarrior `next` report (weighted factors, blocked term) |
| `after G2.5 no feature` | Feature freeze makes new features ineligible regardless of backlog priority; after the freeze only fixes and polish are in scope | A popular backlog idea becomes a feature after freeze, reopening scope and breaking one-in-one-out | `library/game/gates/G2.5-feature-freeze.md`; R9; D05 |
| Mode filters: `review` read, `discuss` ask, `prototype` prototype, `production` build, `autonomous` in-contract | The current mode decides what kind of action is legal; autonomous work is additionally confined to its R10 contract | A build action is proposed in review, a prototype in production, or an autonomous run exceeds its contract | v0.3 blueprint modes; R10; SL01 mode selection |
| `BLOCKING — <reason>, Next: none` on a stop (R10), with four causes | R10 stops must end with one question and no action; a STATE blocker, autonomy without a contract, a feature after G2.5, or a queue of only blocked/over-budget items are the stops this command can detect | The command pushes through a blocker, starts unconstrained autonomy, or picks a forbidden item to avoid an empty screen | R10; G2.5; R9; SL03 brief |
| Four labels `Next:`, `Why:`, `Blocked:`, `Mode:` in fixed order | A stable scan order for the human and the next agent; `Why` carries the evidence (source, gate, mode, budget) without a second report | The output order changes per run; the reason is lost; the user must ask why this action was chosen | A01 one-screen report; SL02 label precedent; SL03 brief |
| Empty `BACKLOG.md`: `Next: none — BACKLOG empty`; `Why: A01 writes the first item (R2)`; A01 owns the choice | An empty queue is not a reason to invent work; A01 owns the first item and may ask within R2 | The command fabricates an action, or stops without telling the user who can unblock the queue | A01; R2; D05; SL03 brief |

## Deliberate omissions

- No STATE write, no BACKLOG write, no DECISIONS write. A01 owns those files; `/next` only reads and recommends.
- No execution of the chosen action. The command stops at the choice; the partner or the user runs it.
- No gate verdict or gate advance. A01 and the human decide gates (R1); `/next` only filters by the recorded gate.
- No status mirroring. Phase, active parts, gate, and blockers belong to SL02 `/status`; `/next` prints only what the choice needs.
- No item authoring or reprioritisation. D05 owns the BACKLOG format; R9 owns the cost rule; `/next` does not rewrite the queue.
- No questions. The R2 budget belongs to A01; a read command that asks would consume it silently.
- No shell block, network, or `!` execution. OpenCode shell blocks run outside the permission flow.
- No `$ARGUMENTS`, `$1`, or positional placeholders. The command takes no arguments; stray arguments are ignored by the first paragraph.
- No urgency arithmetic, coefficients, or a numeric score. Taskwarrior's approach is borrowed as a selection shape, not as a formula; R9's budget and D05's priority stay human-readable.
- No multi-action plan or roadmap. One run returns one action; a plan would duplicate STATE and the sprint process.
- No installed-part listing. The lock filters eligibility; reporting parts is SL02's job.
- No automatic fallback to a lower item when the named item conflicts. The conflict is surfaced as `BLOCKING` so the stale STATE pointer is fixed.

## Consistency table of IDs

| ID | Used in SL03 as | Resolves to | Status |
|---|---|---|---|
| A01 | Owner of the BACKLOG choice; writes the first item when the queue is empty; last-line owner | `library/core/agents/partner.md`; accepted artifact at `staging/A01/artifact/library/core/agents/partner.md` | accepted (BUILD-PLAN line 33) |
| R2 | A01 may ask within budget before writing the first item | `library/core/rules/R2-ask-within-budget.md` | assembled (line 22) |
| R5 | A STATE-named non-item is printed, not replaced; one fact one place; SL02 boundary | `library/core/rules/R5-code-before-docs.md` | assembled (line 27) |
| R9 | Budget filter for the fallback; over-budget items are not eligible | `library/core/rules/R9-scope-is-budget.md` | accepted (line 31) |
| R10 | Autonomy only inside its contract; stop becomes `BLOCKING` and `Next: none` | `library/core/rules/R10-autonomy-is-contract.md` | accepted (line 32) |
| SL02 | Boundary: `/status` mirrors files, `/next` selects | `template/.opencode/commands/status.md`; artifact at `staging/SL02/artifact/template/.opencode/commands/status.md` | accepted (line 79) |
| D02 | Owner named for a missing `STATE.md`; supplies phase, gate, named next action, blockers | `template/STATE.md` | pending (line 85); target not written yet |
| D05 | Owner named for a missing `BACKLOG.md`; supplies queue, cost, priority | `template/BACKLOG.md` | pending (line 88); target not written yet |
| CLI01 | Owner named for a missing `agent.lock.json`; supplies installed parts | `tools/new-project.mjs` | accepted (line 68) |
| G2.5 | Feature freeze: after it no feature is eligible | `library/game/gates/G2.5-feature-freeze.md` | accepted (line 55) |
| SL03 | This part; `/next` target | `template/.opencode/commands/next.md` | running (line 80); target not written yet |

Every ID used in the command resolves to a file or to a BUILD-PLAN line; D02, D05, and the installed SL03 target are forward references whose lines define the target and batch. The check in `REPORT.md` asserts this resolution.

## Size

| Measure | Value | Target | Verdict |
|---|---|---|---|
| Characters | 1,190 | - | - |
| Tokens (characters / 4) | 297.5 | 300 (brief) | under by 2.5 (0.8%) |
| Tokens vs rubric | 297.5 | 400 | under by 102.5 (25.6%) |
| Lines | 20 | - | - |
| Bytes | 1,200 | - | - |

UTF-8, no BOM, zero CR, LF line endings, trailing newline, POSIX paths. The five non-ASCII characters are em dashes in the missing, blocking, why, and empty-queue templates; all prose is English.

Named cut: if 300 became a hard limit after review, replace the five mode mappings with `Modes: filter the action by the STATE mode`, saving about 60 characters. Not needed at 297.5.

## Risks and limits

- D02 and D05 are pending. A generated project will legitimately print `Missing: STATE.md — D02` or `Missing: BACKLOG.md — D05` until batch 14; the command names the correct part.
- The BACKLOG item shape is not frozen. The command assumes one open bullet with a cost and a priority, and reads a blocker from the item text; a richer D05 schema may need an explicit field.
- `agent.lock.json` is used only to check that a part is installed. If CLI01 changes the lock shape, the check degrades to skipping installed-part eligibility rather than inventing a list.
- "Unblocked" is read from the item and STATE; there is no dependency solver. A blocker expressed elsewhere can be missed.
- The command is a prompt, not a parser. Priority ties, malformed items, and an unusual STATE heading are resolved by the partner's reading, not by code.
- `subtask` is a deprecated alias for `subagent`; the brief requires it. The partner is a primary agent, so the current-session default is unchanged if the alias is later removed.
- `/next` never performs the action. It removes the choice burden, not the execution step.
- No runtime test exists. The check verifies structure, labels, IDs, encoding, and size; behavior is review-only.
