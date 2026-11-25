# X01 — Justification

`CONTRACT.md` is the block a human signs before an autonomous run, plus the line
formats that make it checkable. Every row below is one semantic unit: why it
exists, what breaks without it, and where the fact comes from. A source that is
not another part means the unit is this part's decision.

## Lead

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| Mode and signature must agree | Approval is the pair; `Mode` is a setting, a block is a draft. | An agent flips `Mode: autonomous`, finds an empty template, and runs. | R10:9-11; D02 `Mode` |
| Block lives in `STATE.md` under `## Autonomy` | One page that the human and `/status` both read. | The contract sits in another file, drifts from state, and is invisible to the CLI. | R10:9; CLI02:116-120 |
| R10 owns the fields, X01 the template | One definition per fact. | Two texts define `done`; the run satisfies one and fails the other. | R10:10-11; D02 JUSTIFICATION:46 |
| A01 drafts and routes | One writer for `STATE.md`; the runner is not the author. | Any agent writes its own block, including the one that benefits. | A01 (STATE duty, autonomy checklist) |
| Scope sentence | Tells the reader this is a template, not a rule. | Readers look for policy here and edit the wrong file. | X01 |

## Block

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| `goal` | A terminal state the run can test. | The run ends when the agent feels finished. | R10:15 |
| `constraints` | The boundary: paths plus four prohibitions. | A run publishes, touches a secret, deletes, or redesigns as a side effect. | R10:16 |
| `done` | Artifact, `verify`, evidence — a checkable exit. | "Code written" passes as done. | R10:17; E03:9 |
| `allowed` | The envelope: tools and exact commands. | The run improvises a command and calls it initiative. | R10:18 (narrowed, see omissions) |
| `stop` | Six conditions the run may end on without asking. | The run pauses and waits, or continues on a guess. | R10:19,35-37; E08 |
| `budget` | Three counters plus the attempt cap. | A loop spends the session; no number ends it. | R10:20; OpenAI Agents SDK `max_turns` |
| `checkpoints` | The longest silence the human tolerates. | An eight-hour run with no resume point. | R10:21,28-29 |
| `log` | One trace for all runs, at a fixed path. | Per-run logs nobody finds; no audit trail. | R10:22; blueprint tree |
| `report` | The artifact the human reads first. | The outcome lives only in a transcript nobody kept. | R10:23; name is X01's |
| `escalation` | A blocked run hands back a decision, not a paragraph. | The run asks an open question and stalls. | R10:24 |
| `approved:` line | Approval has a date and a name. | "The user approved" is unverifiable; a stale block looks current. | R10:9-10 |

## Signature

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| Human writes the last line; A01 drafts | Separates executor from approver. | The agent approves its own scope. | R10:9-10; A01 |
| Read-only for the agent | The block cannot grow while it is being spent. | Budget raised mid-run, path added to reach a file, `done` moved to what was achieved. | R10:3-5,10 |
| No signature means stop and one question | The entry gate. | `Mode: autonomous` with a blank template runs. | R10:3-5; R2 |
| Signature re-read at each checkpoint | Revocation works while the run is unattended. | The contract is checked once at minute zero; a changed mind needs a process kill. | X01 (checkpoints are the only lookups) |
| New signature means new run, fresh counters, same log | A re-scoped run gets a fresh budget; the old trace stays. | A one-field edit silently inherits a half-spent budget, or wipes the history. | X01 |
| An answer that changes a field needs a new signature | An answer is not a scope grant. | A `BLOCKING —` answer quietly widens the contract under the old signature. | R10:37 |

## Formats

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| POSIX paths from the root, `src/**` globs | One syntax for tools and humans. | Mixed separators and globs that cannot be tested. | Blueprint (POSIX paths) |
| Only `constraints` lists paths | R10 names paths in two fields; one list removes the conflict. | Two lists drift; a path is allowed but out of scope, or the reverse. | R10:16,18; X01 |
| Unlisted command or path is refused | Default deny is not a negotiation. | The run argues its way into a command. | R10:18 |
| A listed command may not write outside `constraints` | Closes the shell loophole. | `allowed: sed` reaches every file in the repo. | X01 (R10's constraints intent) |
| Log is JSONL, append-only | Machine-readable and never rewritten. | Prose logs; a history edited after the fact. | R10:22 |
| A record at start, checkpoint, stop, report | Every change of state leaves a line. | Gaps exactly where a reviewer looks: opening totals, final outcome. | R10:28; X01 |
| Six keys, no more | R10's schema, not a new one. | Each part invents a key and the reader learns five dialects. | R10:22 |
| `t` UTC, `decision` enum, `files` | Times compare; the outcome is greppable; the file count is auditable. | Local times, free-text outcomes, a `max_files` nobody can check. | R10:22; E08 (`blocked`) |
| Report has four fixed headings | The human reads four answers in a fixed order. | The report is a narrative; "done" and "tried" look alike. | R10:23 |
| `Evidence` opens with the `verify` result | The first line is the verdict, and missing proof is named. | Polished prose over a check that never ran; silent gaps. | E03:9; A04 (`not verified`) |
| `Open` is not a question | R2 caps questions; a report is not a channel. | A run turns its report into three questions and stalls the human. | R2; A01 (3 per stage) |
| One line per item, one page, overwritten | The report is a summary, not an archive. | A report that grows every run until nobody reads it. | X01 |
| `BLOCKING —` shape with options and a recommendation | The question arrives decision-ready. | "What should I do?" with no options, and a stalled human. | R10:24,35-36 |
| `BLOCKING —` under `## Blocked`, run does not answer | Visible where the human looks next; the agent is the wrong authority. | The question dies in the transcript and the run guesses. | R10:36-37; D02 heading |

## Counting

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| `max_files` counts paths; block, state, log, report exempt | Count work, not bookkeeping. | The contract taxes its own audit trail; a run refuses to log to stay under budget. | R10:20; X01 |
| `max_tokens` is the harness total; `max_minutes` is wall clock | One measurable definition each. | Output-only counting; per-step minutes. | R10:20; X01 |
| Resume continues counters from the last record | A crash cannot reset the budget. | Restart is a free budget; crashing becomes a strategy. | LangGraph persisted state; X01 |
| At a limit, stop before the next action; closing writes allowed | The report must exist at the limit. | Every capped run ends before it can report, so every capped run is silent. | OpenAI Agents SDK `MaxTurnsExceeded`; R10:48-49 |

## Ending

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| `done` is the exit, not the plan | A plan is a route; `done` is the destination. | The run continues past done to fill the plan, or stops when the plan empties without done. | R10:3-5,17 |
| A `done` already true is proven and ends the run | No invented work. | A run sent to fix a fixed bug refactors something to justify itself. | X01; E03:14-15 |
| `verify` is the `project.config.json` recipe | One project-wide check, not one the run picks. | The run invents a weaker check that passes. | Blueprint (`project.config.json`) |
| A verify that cannot run is missing input, not a pass | A broken check is a stop, not a green. | E03's failure: `build:pack` fails and the agent says done. | E03:5,18 |
| The run may not edit its own check | The check is the judge. | Tests weakened to pass (E08:19); `verify` script edited (E03:20). | R1; E03:20; E08:19 |
| Every run ends with the report and a last record | No silent stops. | A run just stops, leaving a dirty tree and no summary. | R10:48-49; blueprint |

## Isolation

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| Worktree or scratch branch | The main tree stays clean. | Autonomous edits land in the working tree mid-review. | R10:29-30 |
| A commit is not a publish | The release boundary. | "Committed" is read as shipped; a scratch commit triggers release. | R4; R10:30-31 |
| Every subagent, tool, script works under the same block | Delegation is the easiest way around a permission. | A subagent with wider permissions performs the forbidden step. | R10:41-43; X01 |
| A gate ends the run with evidence written; the line waits for the human | The gate is a human decision point. | The run writes the gate line and proceeds. | R8; A01; R10:43 |
| Ladder: R1–R9, permissions law, R4 publish, R8 G1 | Says what outranks the contract, once. | The block is treated as top authority and a denial is routed around. | R10:41-44; X02 |

## Check

| Unit | Why it exists | Breaks without it | Source |
|---|---|---|---|
| Reviewer reads `STATE.md` and the log, not the transcript | The audit must be file-based. | The only evidence is a conversation nobody kept. | R10:48-49 |
| Ten keys, no `<...>`, a signature | Completeness is checkable at a glance. | A half-filled contract passes because three keys exist. | CLI02:118-120; X01 |
| Six keys and a valid `decision` per line; four headings; every `Evidence` path opens | The formats are the check. | A log line without `next`, a missing heading, a dead evidence path — all invisible. | R10:22-23; X01 |
| E03 and E08 score the behavior | Scoring is defined once, in the evals. | Two definitions of "verified" and "three attempts". | E03; E08:12; R10:50 |

## Deliberate omissions

- **R10's field definitions.** R10:13-24 owns the meaning of each field. X01
  shows the fill line only; a second definition would need a second sync.
- **A01's routing table.** A01 owns who goes where; X01 names A01 once, as the
  drafter and router.
- **The unit of an attempt.** E08:9 defines it ("a new hypothesis, change,
  command, result"). X01 keeps `third failed attempt` as a stop condition only.
- **The permissions deny-list.** X02 owns denials; X01 carries only the
  consequence ("permissions are law").
- **Gate definitions G1–G3.** R8 owns them; X01 only says a gate ends the run.
- **R2's question budget.** R2 owns the cap; X01 only says `Open` is not a
  question.
- **Secrets, injection, supply chain.** X02.
- **A fixture.** X01 is a template with no runtime; the behavior it describes is
  scored by E03 and E08. A fixture here would test the agent, not the block.
- **Mechanical enforcement in `doctor` and `lint`.** Neither has an autonomy
  check today; claiming it would be false. The check stays a reviewer checklist.
- **Per-run log files and rotation.** R10:22 fixes one append-only log.
- **Parallel runs.** One block, one `STATE.md`; concurrency is out of scope for a
  solo template, and the worktree isolates the files anyway.
- **Token forecasting.** X01 defines the counter, not a way to predict spend.

## Rejected formats

- **YAML frontmatter for the block.** Protocol forbids it, and `STATE.md` is
  rewritten by A01 in place; a frontmatter block would be a second document.
- **Double-brace placeholders.** Forbidden by the protocol and collides with
  templating; `<...>` is visibly unfilled and survives a code fence.
- **A separate `APPROVAL.md`.** A second file can drift from the block it
  approves; the signature line cannot.
- **Log as a Markdown table.** Append-only JSONL is R10's format and greppable
  per key.
- **An appended report instead of an overwritten one.** History belongs in the
  log; the report is the current summary.

## Size

| Measure | Value | Limit | Note |
|---|---|---|---|
| Characters | 4,615 | — | UTF-8, no BOM |
| Tokens (chars/4) | 1,153.8 | 1,200 | 46.2 headroom; target 1,050–1,180 met |
| Words × 1.35 | 1,026.0 | — | 760 words |
| Lines | 89 | — | max line 150 (the JSON example) |

No unit was cut for size. The three additions that used the headroom are the
verify recipe, the do-not-edit-the-check rule, and the already-true `done` case;
each closes a failure the rest of the document would otherwise permit.
