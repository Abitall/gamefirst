# SL04 - /verify: justification

Status: review-ready
Artifact: `staging/SL04/artifact/template/.opencode/commands/verify.md`
Target: `template/.opencode/commands/verify.md` - not written yet; copied on accept (rubric verdict)
Scope: one OpenCode command. No runtime code, no additional template, no engine pack.

## Why this unit exists

R1 makes an artifact the only proof of done: a claim is accepted only when something was run and its output survives. S02 owns the method, CLI03 the runner, E03 scores whether an agent follows them. `/verify` is the session-side trigger that ties the three together - one claim in, one verdict out, no repair. Without it the partner can still report from memory, hand-run a command with no fixed output, and leave the evidence folder unnamed, and E03 has no command to score.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Frontmatter `description` | Names the command's job in discovery: one claim, PASS or FAIL, evidence | `/verify` is listed with no purpose and is confused with the `tools/verify.mjs` runner | OpenCode commands reference (frontmatter); SL02 precedent |
| `agent: partner` | Runs the command under the agent that owns the done claim and that E03 scores | A different agent answers, with different rules, and E03's target behavior is not the one that ran | OpenCode frontmatter `agent`; E03 |
| `subtask: false` | Keeps the verdict in the session that made the claim; the next action lands where the claim was | A child session returns a summary and the main session can still report done from memory | OpenCode `subtask`/`subagent`; brief |
| `$ARGUMENTS` is one claim | CLI03 takes one claim and names the evidence folder after it | A run covers several claims; the verdict and the folder cannot be tied to one claim | CLI03 usage (`--claim`); S02 claim scoping |
| Empty claim: FAIL `no claim` + usage | An empty invocation must not fall through to a default recipe run that proves nothing | The user gets a PASS or FAIL for a claim nobody made, with no hint of the syntax | R1 (blocked means say so); E03 |
| Run `node tools/verify.mjs --claim "<claim>"` (CLI03) | One accepted runner, one evidence layout, one judge | Each session invents a command, the artifact path varies, and reports stop being comparable | CLI03 usage line |
| Fallback to the project's documented verify command | A project may ship another runner; the word "documented" forbids invention | `/verify` is inert wherever CLI03 is not installed, and the user is pushed to improvise | Brief ("or the project verify command"); R1 |
| Never invent a command or drop evidence; FAIL `no verify runner` | A flag or a skip that removes the artifact makes PASS unfalsifiable; CLI03 itself says a `--no-evidence` run cannot support done | A green verdict with nothing to inspect, or a made-up command that proves a different thing | CLI03 help for `--no-evidence`; pre-commit `SKIP` rejected |
| Read `evidence/<date>-<claim>/` and `REPORT.md` | The run prints the folder; `REPORT.md` holds the verdict line and the per-check table | The agent trusts an exit code or memory and never opens the artifact R1 asks for | CLI03 output (`evidence  <path>`); R1 |
| Missing or empty: FAIL, not "probably works" | Absence of an artifact is not evidence; E03's fixture has no `data/` and must end in "not done" | A missing folder reads as success, the exact failure E03 is built to catch | R1; E03 |
| `claim` line in the block | Anchors the screen to the claim that was checked | A pasted verdict cannot be matched to what was asked | pre-commit names the hook per result (`black....Passed`); SL02 fixed labels |
| `result PASS \| FAIL` line | One word carries the verdict | The reader interprets prose and can soften a failure | CLI03 judge; E03 expects PASS/FAIL |
| `command` line | Makes the run reproducible and reviewable | The reader cannot tell which runner produced the verdict | pre-commit runs the configured command; CLI03 `commands.log` |
| `exit` line | The machine verdict; a FAIL needs a cause | "FAIL" with no code cannot be diagnosed or rechecked | pre-commit exit codes 1/3/130; CLI03 exit codes |
| `artifact` line | R1's evidence, addressable in the next session | The claim is unverifiable once the chat is gone | R1; CLI03 evidence path |
| `next` line | Every verdict ends with one move | FAIL is a dead end and PASS has no follow-up | S02 (smallest next action) |
| PASS requires exit 0, every required check passed, a non-empty artifact (R1) | Stops PASS on a partial run or a lost artifact; mirrors CLI03's judge | An optional check fails or the folder is empty and the command still says PASS | CLI03 judge; R1 |
| On FAIL say `not done` | The exact phrase R1 and E03 expect | "FAIL" gets retold as "almost done" | R1; E03 |
| Name the failing check, its command and exit code | The smallest diagnosable unit | The user re-runs everything and still does not know which check broke | pre-commit per-hook output and `--show-diff-on-failure`; CLI03 table |
| Smallest next action that supplies the missing input | E03's expected output includes the missing `data/balance.json` and a next step | The agent guesses, or edits the code instead of supplying the input | S02; E03 |
| Never fix the code | The command proves; a repair inside a verify run hides the original failure | The evidence shows a different tree from the one that failed | R1; S02 line 9; E03 |
| Never edit, weaken, skip, or rewrite a check, test, or runner | Red-to-green by editing is not evidence; E03 fails this explicitly | The suite passes because it was changed, not because the game works | R1 ("a weakened, skipped, or unexecuted test is not evidence"); S02; E03 |
| Never re-run until green or report a pass from memory | A retry loop hides flakiness; a remembered PASS has no artifact | Intermittent failures disappear and a stale green is reported | S02 |
| `S02 owns the checks, CLI03 the runner, E03 scores this` | Names the three owners without copying any of them | Authority is unclear and the method, runner, or scoring text drifts inside the command | S02 line 9; SL02 cross-reference style |
| `R1 and R5 apply as written` | Binds the command to the rules without restating them | The rule text is duplicated and diverges from the rule file | R1; R5; SL02 precedent |

## Deliberately absent

- No recipe schema, exit-code table, evidence repeat suffix (`-2`, `-3`), `--json`, `--timeout`, or `--no-evidence`. CLI03 owns them; a copy would drift from the runner.
- No seven-step procedure, claim table, visual capture, playtest note, or `REPORT.md` authoring. S02 owns the method and CLI03 writes the report.
- No eval fixture, scoring, or expected-output text. E03 owns them.
- No repair instruction that edits code or tests. R1, S02, and E03 forbid it; the next action supplies input, it does not patch.
- No commit, publish, release, or gate verdict. The command proves one claim; release authority stays elsewhere.
- No `!` shell block, network call, or write. The body is a prompt; the agent runs one command through the permission flow.
- No `model` or `subagent` key. The brief fixes three fields; `subtask` is the required key even though it is the deprecated alias of `subagent`.
- No batch or multi-claim mode. One claim per run keeps the folder and the verdict unambiguous.

## Consistency table of IDs

| ID | Used in SL04 as | Resolves to | Status |
|---|---|---|---|
| R1 | PASS rule; `not done`; refusal to weaken or skip | `library/core/rules/R1-build-is-truth.md` | assembled (row 21) |
| R5 | Last-line cross-reference | `library/core/rules/R5-code-before-docs.md` | assembled (row 27) |
| S02 | Owner of the checks; internal source | `library/core/skills/verify/SKILL.md`; artifact at `staging/S02/artifact/library/core/skills/verify/SKILL.md` | assembled (row 23); target exists |
| CLI03 | The runner invoked by the command | `tools/verify.mjs` | accepted (row 70) |
| E03 | Scores the behavior; owns the fixture | `library/core/evals/E03-verify-before-done.md`; artifact at `staging/E03/artifact/library/core/evals/E03-verify-before-done.md` | assembled (row 24); target exists |
| SL04 | This part | `template/.opencode/commands/verify.md`; artifact at `staging/SL04/artifact/template/.opencode/commands/verify.md` | running (row 81); target not written yet |
