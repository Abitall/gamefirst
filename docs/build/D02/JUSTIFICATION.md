# D02 - STATE.md: justification

Status: review-ready, not self-accepted.
Artifact: `staging/D02/artifact/template/STATE.md` - 1,684 characters, 421 estimated tokens, 276 words, 34 lines, 11 fill slots.
Target: `template/STATE.md`, a document template (BUILD-PLAN row 14). Layer: game repo root; no engine import, no runtime code.
Readers: `/status` (SL02) prints Phase, Active, Gate, Next, Blocked, Since; `/next` (SL03) reads Phase, Next, Blocked, Gate, Mode; `tools/status.mjs` (CLI02) parses the same headings.
Scope: the current state of one game. History is D03, ideas are D05; both are deliberate omissions below.

## Why this unit exists

`STATE.md` answers one question - where is the game now - and it is the only file that answers it. The game holds five state-bearing documents and they are not interchangeable: `BRIEF.md` holds the idea (D01), `DECISIONS.md` holds the record (D03), `BACKLOG.md` holds work not started (D05), `agent.lock.json` holds what is installed (CLI01), and `STATE.md` holds what is true at this moment. Merging any two produces a file that grows without bound and cannot be read on one screen.

The page is rewritten in place, never appended. That is what keeps it one page, and it is also why the page may stay short: a fact that would need a date to be understood belongs to D03.

A01 owns the file and may edit it without asking (`library/core/agents/partner.md:12`); its stated duty is "phase, active parts, next action, blockers, gate state" (`:46`), and "STATE.md is the truth; the chat is not" (`:43`). R5 needs the phase to know whether a document is allowed yet, R9 needs the stage budget to refuse scope, R10 needs the last checkpoint to resume. All three read this page first, so a stale line here is a wrong decision downstream, not a cosmetic defect.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Title and header line 1 | States the rules of the page: one page, English, rewrite in place, one fact per line, never append. | Without "rewrite in place" the page becomes a log; it outgrows one screen and `/status` has to guess which entry is current. | Blueprint `:259`; D01 header precedent |
| Header line 2: fill rule | "Replace every `[...]` and delete its prompt"; an empty field reads as `not recorded`. A filler must know the bracket is not content and that blank survives to `/status`. | A leftover prompt is a fake value, printed as fact. Blank would read as a missing file instead of an empty answer (SL02 distinguishes `not recorded` from `unknown`). | SL02 fallbacks; `template/BRIEF.md` fill rule |
| Header line 2: boundary and readers | Names D03, D05 and both readers, so a dated fact or an idea is routed at the moment it appears. | History and ideas drift into STATE and the single-source property fails; the readers are not discoverable from the file itself. | R5 "one fact, one file"; R9:20; R10:28 |
| `## Phase` | One stage word from the closed list G0 ... G3, moving only when a gate line says so. `/next` and R5 use it to decide what is allowed. | CLI02 exits 1: `STATE.md has no phase. Add "## Phase" with a value, or "Phase: production".` `/next` cannot tell a prototype from a frozen feature set. | CLI02 `status.mjs:217`; blueprint stages |
| `## Mode` | One of five modes, recorded here because AGENTS.md delegates it: "The active mode is recorded in `STATE.md`". Mode outranks rules, so it is read before any rule is applied. | `/next` prints `Mode: not recorded`; an autonomous run cannot be detected, so the R10 check has no trigger. | `template/AGENTS.md:9-11`; SL03; CLI02 `:123` |
| `## Active` | Part IDs in play now, one per line; a part not listed is not in play. Answers "what is being worked on", which the lock does not. | The page says what is installed but not what is in flight; a specialist sent to a finished part has nothing to notice it. | `partner.md:46`; blueprint `:259`; CLI02 `:124` |
| `## Next` | Exactly one action, verb first, finishable in this session, not a plan. `/next` may take it as given instead of selecting. | CLI02 exits 1: `STATE.md has no next action. Add "## Next action" with one line.` SL02 prints `Next: not recorded - /next (not built yet)`. | CLI02 `:218`; R5 "a plan is not a mechanic"; SL03 |
| `## Blocked` | `none`, or what stops work; a hard stop is a `BLOCKING -` question and then a wait. Makes "stopped" a visible state instead of silence. | `/next` prints `none` while work is stopped and a run resumes on a guess; R10's stop condition loses its file. | R2 "Blocked"; R10:36; SL03 |
| `## Gate` | One line per gate or checkpoint: id, outcome word, ISO date, evidence path. A01 writes the line; the human decides. | Gate history lives only in chat; `/next` cannot apply the G2.5 freeze and R1's evidence claim has no pointer. | `partner.md:49`; R1; CLI02 fixture line |
| `## Budget` | The stage budget copied from the gate that set it: features in play, content in numbers, cut list in order. | R9's check has nothing to read; a stage grows without a cut and nobody can name what leaves first. | R9:11, R9 "Check"; A04 |
| `## Questions` | Open questions in R2 shape, at most 3 per stage, logged to `runs/questions.jsonl`. It is the pre-read for R2's no-repeat rule. | "A repeated question is a bug" cannot be enforced; `/start` prints `Questions: 0/3` while a blocker is unanswered. | R2 "No repeats", "Log"; SL01 |
| `## Autonomy` | Holds the R10 block when mode is `autonomous`; the ten field names are the checklist. `none` means no contract. | CLI02 exits 1 on autonomous mode; the R10 reviewer reads STATE and finds nothing to review. | R10:9; CLI02 `:219-221` |
| `## Since` | Date the page last changed, so staleness is visible. SL02 prints project start under the same word, from the lock. | A resumed run cannot tell a page written today from one written three weeks ago, and the two dates stay confused. | R10:28; SL02 |
| Section order | The five required fields first in reading order, Mode second because it outranks rules, Budget after Gate, Questions and Autonomy last, Since as footer. | The required fields scatter; a reader scans the page to find the action and the file stops being readable top-down. | Blueprint `:259`; SL02 label order; `AGENTS.md:11` |
| Bullets vs bare line | Single-value sections take a bare line (CLI02 `pick` reads the first value); list sections take bullets, so a second gate or part is a line, not a comma. | A repeated label inside its own section becomes the value (`phase: production`); a comma splits one gate into two entries. | CLI02 `pick` / `list` `:106-115` |
| Prompts inside the slot | Every instruction sits inside `[...]`, so no prose line can be read as a value; deleting the prompt is part of filling the slot. | A prose prompt under a heading is parsed as the field value, and `/status` prints advice where a phase belongs. | CLI02 `values` `:99-101`; D01 fill rule |

## Deliberately absent (why this is not a log or a plan)

- **History, dated entries, "previously".** D03 `DECISIONS.md` keeps the record; git keeps the rest. The only date here is the page's own freshness (`Since`).
- **Ideas and parked work.** D05 `BACKLOG.md`, one line each with a cost (R9). An idea written here would be read as current work.
- **Vision, pillars, audience.** D01 `BRIEF.md` and D04 `GAME.md`. STATE names a stage, not a reason for it.
- **Mechanics and system cards.** D06 `docs/systems/`; a mechanic described here would have two sources that drift (R5).
- **A plan, a sprint table, estimates.** The framework runs on stages, not sprints; `/next` picks one action and A01 routes the rest. An estimate here would be read as a commitment.
- **Owners and assignees.** One partner owns the page; a specialist is named in the task, not in state.
- **The ten autonomy field definitions.** X01 `library/core/autonomy/CONTRACT.md` owns them ("X01 owns the template", R10); STATE keeps only the filled block.
- **Evidence content and run logs.** `evidence/` and `runs/AUTONOMY.jsonl`; STATE holds the path and the date, never the proof itself.
- **Installed parts and versions.** `agent.lock.json` (CLI01). STATE lists what is in play, which is a different question from what is installed.
- **Answers to questions.** R2 sends a "you decide" answer to `DECISIONS.md`; only open questions stay here, and only until answered.
- **Roadmap past the current stage.** `BACKLOG.md`. A stage list here would compete with `Phase` and win by being longer.

## Consistency table of IDs

| ID | Used in D02 as | Resolves to | Status |
|---|---|---|---|
| D01 | Boundary: the idea lives in BRIEF.md; header style | `template/BRIEF.md` | accepted |
| D02 | This part | `template/STATE.md` | this review |
| D03 | Boundary: history lives there; header line 2 | `template/DECISIONS.md` | pending (batch 14) |
| D05 | Boundary: ideas live there; header line 2 | `template/BACKLOG.md` | pending (batch 14) |
| X01 | Owner of the ten autonomy fields; not restated here | `library/core/autonomy/CONTRACT.md` | pending (batch 16) |
| A01 | Writer of gate lines; owner of the page | `library/core/agents/partner.md` | accepted |
| SL01 | Recommends the mode; reads the page | `template/.opencode/commands/start.md` | accepted |
| SL02 | Reader: six labels, `not recorded`, `unknown` | `template/.opencode/commands/status.md` | accepted |
| SL03 | Reader: next, blocked, mode, gate | `template/.opencode/commands/next.md` | accepted |
| CLI01 | Writes the lock whose parts `/status` counts | `tools/new-project.mjs` | accepted |
| CLI02 | Parser of these headings; error strings quoted above | `tools/status.mjs` | accepted |
| R1 | Gate lines carry evidence; build is truth | `library/core/rules/R1-build-is-truth.md` | accepted |
| R2 | Questions: cap, shape, log, blocking | `library/core/rules/R2-ask-within-budget.md` | accepted |
| R5 | No plan in state; one fact, one file | `library/core/rules/R5-code-before-docs.md` | accepted |
| R9 | Budget section, cut rule, G2.5 freeze | `library/core/rules/R9-scope-is-budget.md` | accepted |
| R10 | Autonomy block, checkpoints, resume | `library/core/rules/R10-autonomy-is-contract.md` | accepted |

## Size

| Measure | Value |
|---|---|
| Characters | 1,684 |
| Bytes | 1,684 (ASCII only, one byte per character) |
| Estimated tokens (characters / 4) | 421.0 |
| Limit for a document template | 600 |
| Headroom | 179 (29.8%) |
| Words | 276 |
| Lines | 34 |
| Fill slots | 11 |
| Non-ASCII characters, BOM, CRLF | 0, none, none |

## Risks and limits

- **Two date meanings.** `Since` is the page's last change here, while SL02 prints project start under the same label. The slot text says so, but a reader who skips it will still conflate them; open question 1 asks whether SL02 should relabel.
- **Budget is an added section.** The blueprint lists five fields and R9 needs a sixth. Folding it into `## Gate` was rejected because CLI02 shows two gates and the budget would compete with them; if A04 expects another home, this is a one-line move.
- **Empty slots parse green.** An unfilled page returns the prompt as the phase with no warning; the template cannot prevent that, and CLI02 has no `[...]` guard.
- **Convention, not schema.** The gate line is a fixed shape by convention only; CLI02 keeps the first two gate lines in human output, so a long gate list is truncated on screen but complete in `--json`.
- **Autonomy is checked at three keys.** CLI02 requires `goal`, `done` and `stop`; the other seven fields are unchecked, so a half-filled contract passes the gate.
- **`Active` can disagree with the lock.** STATE lists parts in play and `/status` counts installed parts; a mismatch is visible only to a human reading both numbers.
- **ASCII template, UTF-8 game.** The template is ASCII so bytes equal characters; a filled page may contain non-ASCII text, which `doctor` accepts as long as it is valid UTF-8 without BOM.
- **Not yet in place.** The artifact sits in `staging/D02/`; `template/STATE.md` is written only after acceptance, and CLI02's fixtures use other heading shapes, so the shipped file is the first real subject of the parser.
- **Untested with SL02 and SL03 prompts.** The check proves CLI02 parsing, not what the two command prompts print; those are markdown instructions executed by an agent, and no run has exercised them against this page.
