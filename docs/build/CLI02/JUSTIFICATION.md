# CLI02 - status: justification

Status: review-ready
Artifact: `staging/CLI02/artifact/tools/status.mjs`
Scope: one read-only CLI. No runtime code, no templates, no engine pack.

## Why this unit exists

`STATE.md` is the source of truth for a game project, but reading it by hand
costs a context switch and invites drift between chat and files. `status` gives
the partner, a human, and a script the same snapshot: phase, mode, active
parts, next action, open questions, gate state, blockers and autonomy. It is the
read side of D02 and the cheap check behind R1: no "done" claim without an
artifact, no next action without a line in STATE.

Without it, every session starts by re-reading Markdown, and an autonomous run
can start without a visible R10 contract. That is the failure the command
prevents.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Argument parsing, `--help`, `--json` | One documented entry point for humans and machines | Users guess flags; no stable machine format | `cli/cli` status; `eslint` CLI; S05 exit-code convention |
| Case-insensitive file discovery | Windows checkouts routinely differ in case; POSIX stays exact | `state.md` is reported missing on Windows | Windows compatibility rule; rubric 6 |
| STATE parser: headings plus `Key: value` | D02 is not frozen; both bullet and section styles exist | Status is empty on a valid STATE that uses inline keys | partner STATE duties; D02 |
| BACKLOG parser | Next work must be visible in the same snapshot | Backlog counts disappear; R9 has no read side | partner "new idea -> BACKLOG"; `cli/cli` sections |
| `project.config.json` parser | Project name, version, engine and verify presence | Project row is blank; no hint that verify is configured | blueprint N00/CLI01; verify skill |
| `agent.lock.json` parser | Game version and installed part count live here, not in `VERSION` | Parts and game version are unknown | blueprint X03/CLI01; BATCH-1 review |
| Autonomy presence check | R10 requires a contract before unattended work | Autonomous mode can look ready without goal/done/stop | R10; partner escalation |
| Report model and JSON schema 1 | One stable object for future CLIs and tests | Every consumer re-parses human text | `eslint --format json`; `ripgrep --json` |
| Human renderer | One screen, fixed labels, no scrolling for the common case | Users read raw JSON or grep Markdown | `imgui` metrics window; `ebiten` DebugPrint; `codex` status row; `gemini-cli` footer |
| Exit codes 0/1/2 | Shells and agents can gate on the result | A broken STATE looks like a healthy one | S05 convention; `eslint` exit codes; `ripgrep` exit-code contract |
| Missing optional files as `missing` | CLI01 may not have run yet; absence is data, not a crash | First run fails because the lock is not installed | blueprint bootstrap order; rubric 2 |
| Fixtures and `test.mjs` | Proves the contract on Windows without a framework | Behavior is a claim, not evidence | R1; rubric 8 |

There is no duplication: the repository has no `tools/` parser, and CLI01 does
not exist yet. A shorter script was considered: JSON-only output, exact `##`
headings, and no config/lock parsing. Each cut was rejected because it removes
a fact the partner needs or makes the tool fail on a legal repository.

## Deliberate omissions

- `runs/questions.jsonl` is not read. E04 states that no consumer exists and
  that CLI02 shows open questions from STATE. Reading the log would create a
  second source of truth and bypass R2's budget.
- `runs/AUTONOMY.jsonl` is not read. Status reports whether a contract exists,
  not how much budget was spent; no log parser exists yet.
- No gate verdict. Status shows the recorded gate line; the human decides and
  A01 records it. A CLI must not turn evidence into a PASS.
- No writes, network, package installs or publishing. The tool is read-only by
  construction: only `readFileSync`, `readdirSync` and `statSync` are imported.
- No engine detection or version comparison. Core and game code stay
  engine-agnostic; an engine pack owns that knowledge.
- No full D02 schema validation. Status checks phase, next action and the
  autonomous contract, then reports the rest as authored. A validator belongs
  to D02/CLI01, not to a snapshot command.

## Size

| Measure | Value | Target | Verdict |
|---|---|---|---|
| Lines | 296 | 250 | over by 46 (+18%) |
| Characters | 11,388 | - | - |
| Tokens (chars / 4) | ~2,847 | - | - |
| Words | 1,367 | - | - |

The target was kept as a goal, not met. Cutting 46 lines would mean removing
the case-insensitive lookup, the inline-key fallback, or one of the two
renderers. Those are the parts that make the tool work on the repositories the
blueprint actually describes. Splitting into a local module was rejected: the
artifact must be copyable as one `tools/status.mjs` with no install step. The
overshoot is recorded in `REPORT.md` and in the rubric self-check.

## Consistency check

- Phase and mode names come from D02/CLI02; this tool never invents a stage.
- Exit codes follow the S05 CLI convention (0 ok, 1 failure, 2 misuse).
- Open questions come from STATE, matching E04's explicit note about CLI02.
- No engine import, no project-specific path, no project-specific content.
- Fixtures use a neutral `demo-game` project and generic part IDs.

## Risks and limits

- D02's final STATE shape may rename sections. Aliases cover the common forms,
  but a rename still needs a parser update.
- BACKLOG closed markers are not fully specified. The parser accepts `[x]` and
  `~~struck~~`; `#done` or a `## Done` section would be counted as open.
- `project.config.json` and `agent.lock.json` shapes are not final while CLI01
  is pending. Parsing is deliberately tolerant; alignment is an open question.
- Autonomy presence requires `goal`, `done` and `stop` labels. A contract with
  those three but no budget passes. Full R10 field validation is left to the
  runner.
- Human output does not wrap long questions; it truncates each at 160 chars.
