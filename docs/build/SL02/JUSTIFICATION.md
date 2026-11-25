# SL02 — /status: justification

Status: review-ready
Artifact: `template/.opencode/commands/status.md`
Mirror: `staging/SL02/artifact/template/.opencode/commands/status.md`
Scope: one read-only OpenCode command. No runtime code, no additional templates, no engine pack.

## Why this unit exists

`STATE.md` is the project truth (A01), but reading it by hand at the start of every session costs context and lets chat drift from the files. `/status` gives the partner, the human, and a fresh session the same one-screen snapshot: phase, installed parts, gate, next action, blockers, and project start. It is the read side of A01's STATE duty and the command after `/start` (SL01). `/next` (SL03) selects the next action; `/status` only reports.

Without it, every session re-reads three files, a missing source goes unnoticed, and an agent can act on a stale next action. CLI02 already serves a terminal and JSON consumer; the slash command serves the agent session and adds `Since`, which CLI02 does not print.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Frontmatter `description`, `agent: partner`, `subtask: false` | The command is discoverable, runs as the partner in the current session, and does not pay for a child session that would re-read the same files | The command is unnamed in discovery, runs under the default agent, or runs in a background child and adds a handoff hop | OpenCode commands reference (frontmatter, `subagent`/`subtask`); SL01 frontmatter; SL02 brief |
| Read list: `STATE.md`, `BACKLOG.md`, `agent.lock.json` | STATE supplies phase/gate/next/blocked (D02); the lock supplies installed parts and `created` (CLI01); BACKLOG is checked because `/next` needs it | Values come from chat or memory; the report drifts; the user is sent to `/next` when its second input is absent | A01 L43; D02; D05; CLI01; SL02 brief |
| Read-only rule: no write, no code, no question, ignore arguments, no new facts | Keeps `/status` separate from A01's STATE updates and gate decisions, safe in every mode, and deterministic when invoked with stray arguments | A second writer races A01; status becomes a plan, a question, or a gate verdict; an argument changes the report | A01 L43 and L55; R5; SL02 brief; `template/opencode.json` read-only tools |
| `Missing: <file> — <part>` lines before the six labels | An `unknown` value needs a cause and a fix; naming D02, D05, or CLI01 tells the user which part writes the file | The user sees `unknown` with no action, or edits the wrong file; a missing STATE is buried under the dashboard | SL01 L7 pattern; D02/D05 rows in `docs/BUILD-PLAN.md`; CLI01; SL02 brief |
| Six labels, fixed order, one line each, values joined with `; ` | A stable scan order for a human and an agent; one screen means no scrolling; joining keeps one line per label when STATE uses a section or a list | The order changes per run; a multi-line field wraps the screen; two status runs cannot be compared | `gh status` fixed sections; A01 "One screen"; SL02 brief |
| `Phase:` | The first context for every later decision: mode, gate, and next action | Work is recommended for the wrong stage; `/start` and the gates lose their anchor | D02; A01 L43; CLI02 `phase` row |
| `Active:`: count, first 5 IDs from the lock, `+N more` | Shows what is installed, which predicts the available commands and rules; the cap keeps one screen; the lock is the machine record of installed parts | The user runs a command that is not installed; upgrade/doctor confusion; a 30-part list wraps the screen | CLI01 `agent.lock.json` schema; CLI02 `parts` row; SL02 brief "(installed parts)" |
| `Gate:` from STATE | The gate is the stop/go line; status must surface it without judging it | The user misses G1/G2 state and starts the next stage, or reads status as a gate pass | A01 gate duty; D02; R1 |
| `Next:` from STATE; exact `Next: not recorded — /next (not built yet)` fallback | Names the one action; when absent, the literal and the pointer tell the user where the action will come from | The agent invents a next action or silently stops; `/next` is not discoverable | D02; A01 L43; SL03; SL02 brief |
| `Blocked:` from STATE | Blockers stop work (R10); status must show them before any action is proposed | Work continues while blocked; R10's stop rule is invisible | A01 L43; R10; D02 |
| `Since:` = project start from `agent.lock.json.created` | The only timestamp in the read set; answers "how old is this install" and gives the screen a freshness anchor; D02 has no updated date yet | No age or freshness, or an invented timestamp from a file mtime or chat | CLI01 `created`; D02; SL02 brief |
| Fallbacks: missing file `unknown`; empty field or absent value `not recorded`; explicit `none` passes through | Absence of a file is not evidence of "none"; the three states stay distinguishable | A missing STATE looks clean (`Blocked: none`), the worst failure; blanks break the label format | CLI02 missing/error handling; R1; SL02 brief |
| No summarize, no rank, no inferred gate pass | Status is a mirror, not a judgment; a gate pass needs evidence and a human (R1) | The command becomes a second gate authority or a plan, contradicting A01 and R1 | R1; A01 gate duty; SL02 brief |
| Cross-reference `A01`; `R1, R5, R10 apply as written` | Names the owner and the applicable rules without copying them, so the command stays small and the rules cannot drift inside it | The rule text is duplicated and diverges; authority is unclear | SL01 L21 precedent; A01; R1; R5; R10; SL02 brief |

## Deliberate omissions

- No `Mode:` or `Questions:` line. The six-label contract excludes them; `/start` recommends mode and CLI02 reports open questions.
- No `Backlog:` count. `/next` (SL03) owns item selection; printing items would create a second plan and break R5's one-fact rule.
- No `project.config.json` read. Project name, engine, and verify presence belong to CLI02 and `/verify`; a fourth source would exceed the brief's read set.
- No gate verdict. A01 and the human decide at the gate; R1 requires an artifact, not a status line.
- No STATE write. A01 owns STATE; `/status` must not race it.
- No shell block, network, or `!` execution. The command reads local files and nothing else; OpenCode shell blocks run outside the permission flow.
- No `$ARGUMENTS` or positional placeholders. `/status` takes no arguments; stray arguments are ignored by the first paragraph.
- No full D02 schema validation. The partner reads headings or `Key:` lines; a parser would belong to D02 or CLI02.
- No duplication of CLI02. CLI02 is a terminal tool with JSON, questions, project, and backlog rows; `/status` is a six-line in-session view and adds `Since`.

## Consistency table of IDs

| ID | Used in SL02 as | Resolves to | Status |
|---|---|---|---|
| A01 | Owner of STATE and the report; last-line cross-reference | `library/core/agents/partner.md`; accepted artifact at `staging/A01/artifact/library/core/agents/partner.md` | accepted (`docs/BUILD-PLAN.md` row 33) |
| R1 | Last-line cross-reference; no inferred gate pass | `library/core/rules/R1-build-is-truth.md` | assembled (row 21) |
| R5 | Last-line cross-reference; no plan or restatement | `library/core/rules/R5-code-before-docs.md` | assembled (row 27) |
| R10 | Last-line cross-reference; blockers stop work | `library/core/rules/R10-autonomy-is-contract.md` | accepted (row 32) |
| D02 | Creator named for a missing `STATE.md` | `template/STATE.md` | pending (row 85); target not written yet |
| D05 | Creator named for a missing `BACKLOG.md` | `template/BACKLOG.md` | pending (row 88); target not written yet |
| CLI01 | Creator named for a missing `agent.lock.json` | `tools/new-project.mjs` | accepted (row 68) |
| SL01 | Precedent for command shape, missing-source line, and A01/R cross-reference | `template/.opencode/commands/start.md`; artifact at `staging/SL01/artifact/template/.opencode/commands/start.md` | running (row 78); target exists |
| SL02 | This part | `template/.opencode/commands/status.md`; artifact at `staging/SL02/artifact/template/.opencode/commands/status.md` | running (row 79); target exists |
| SL03 | `/next` pointer in the `Next:` fallback | `template/.opencode/commands/next.md` | pending (row 80); target not written yet |
| CLI02 | Sibling checked for overlap; not invoked | `tools/status.mjs`; accepted artifact at `staging/CLI02/artifact/tools/status.mjs` | accepted (row 69) |

Every ID used in the command resolves to a file or to a BUILD-PLAN row; D02, D05, and SL03 are forward references whose rows define the target and batch. The one check in `REPORT.md` asserts this resolution.

## Size

| Measure | Value | Target | Verdict |
|---|---|---|---|
| Characters | 1,169 | - | - |
| Tokens (characters / 4) | 292.25 | 300 (brief) | under by 7.75 (2.6%) |
| Rubric threshold | 292.25 | 400 | under by 107.75 (26.9%) |
| Lines | 23 | - | - |
| Bytes | 1,175 | - | - |

UTF-8, no BOM, zero CR, LF line endings, trailing newline. The three non-ASCII characters are em dashes in the output format and fallback; no non-English text.

Named cut: if 300 were a hard limit after review, replace the `Active` cap clause with `Active: <n> parts` and drop the ID list, saving about 50 characters. It is not needed at 292.25.

## Risks and limits

- D02, D05, and SL03 are pending. Until batch 14 and batch 13, a new project will legitimately report `Missing: STATE.md — D02`, `Missing: BACKLOG.md — D05`, and `Next: not recorded — /next (not built yet)`. The command names the correct parts; the order is the blueprint's, not a defect in SL02.
- `subtask` is a deprecated alias for `subagent`. The brief requires `subtask: false`; the OpenCode reference still accepts it and says `subagent: false` forces the current session. If the alias is removed, the partner is a primary agent, so the default remains the current session, but the frontmatter should be renamed after the brief's constraint is lifted.
- `Since` means project start, not last STATE change. D02 has no updated date; using a file mtime or inventing one would violate the no-new-facts rule. If D02 later defines `Updated:`, revisit the meaning.
- `Active` hides IDs after the fifth. The count and `+N more` preserve the total; a full list would wrap the one screen.
- The command trusts the partner to read Markdown. D02's final heading shape is not frozen; an unusual heading can produce `not recorded`. A parser is deliberately out of scope.
- There is no runtime test. The part is a prompt; the one check verifies structure, IDs, labels, encoding, and size. Behavior is review-only.
- Stray arguments are ignored by instruction, not by a placeholder. OpenCode appends non-empty arguments when no placeholder exists; the first paragraph tells the partner to ignore them.
