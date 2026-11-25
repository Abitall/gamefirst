# JUSTIFICATION — R10 Autonomy is contract

Every semantic unit of the rule, in file order. "If removed" is the failure the
unit prevents, stated as a behavior, not a slogan. Sources are the project
documents that require the unit (BLUEPRINT = `docs/V0.3-BLUEPRINT.md`) and, where
the wording was shaped by an external artifact, the repository from
`SOURCES.md`. No unit is decorative: removing any row below either deletes a
required field, deletes the mechanism that makes a field observable, or deletes
the boundary that keeps autonomy from overriding another rule.

## Title and thesis

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| `# R10 — Autonomy is contract` | Stable ID and exact title used by the build plan and by R2's cross-references. | R2's pointer to "R10's `stop` categories" dangles; the build plan cannot mark the part. | BUILD-PLAN:32, BLUEPRINT:142, R2:38 |
| "Autonomy is a written agreement, not a mood or a longer prompt." | Separates the autonomous *mode* from the *permission* to use it. A long instruction is still an instruction, not a contract. | Any detailed prompt is read as license to run unattended; the mode becomes an interpretation. | BLUEPRINT:23, R2:38 |
| "Without one on disk, the agent asks (R2) or stops; it does not grant itself a scope, a budget, or a definition of done." | Default deny for autonomy, and names the three things an agent is most tempted to invent. Points at R2 so the non-autonomous path is not restated. | An agent with no contract improvises scope, spend and success criteria, then reports them as agreed. | R2, BATCH-1:2 |

## Contract

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| "Write it to `STATE.md` before the first autonomous action." | The contract must exist before the run it governs, in a file that survives the session. `STATE.md` is the only existing state file in the game tree. | A contract assembled after the work, describing what happened instead of what was allowed. | BLUEPRINT (game tree), X01 |
| "The agent that will run it does not approve it; the user does." | Separation of executor and approver. This is the single line that makes the rest enforceable. | Self-approval: the agent writes its own budget and calls it authorization. | R1 (no self-granted exception), X01 |
| "X01 owns the template; the ten fields it must fill are:" | Splits ownership: X01 owns the fill-in template, R10 owns what each field means. Prevents two templates drifting apart. | R10 and X01 each define a contract shape; a reader cannot tell which one to fill. | BLUEPRINT:281, X01 |
| `goal` — one sentence, measurable | A run must be judgeable at the end. "One sentence" forces a single outcome; "measurable" makes done decidable. | Goals like "improve the combat feel" pass as contracts and nothing can fail. | BLUEPRINT:328–335, crewAI `expected_output` |
| `constraints` — paths in scope; no publish, secret, destructive command, design change | The four prohibitions are the ones that cannot be undone or that belong to another owner. Paths bound the blast radius. | The agent edits outside its area, commits a key, deletes a branch, or redesigns a system under the cover of "implementation". | BLUEPRINT:357–362, R4 |
| `done` — artifact, `verify` pass, evidence path (R1), never "code written" | Done must be inspectable by someone who was not there. Writing code is an activity, not an outcome. | "Code written" is accepted as completion; unverified work enters review and fails later at higher cost. | R1, kubernetes `completions` |
| `allowed` — tools, commands, paths; default deny, unlisted refused, not negotiated | An allow-list with a deny default. "Not negotiated" closes the gap where an agent argues its way to a new tool mid-run. | Silence becomes permission: any unlisted command is assumed fine because nobody forbade it. | BLUEPRINT:357, bevy closed `Commands` |
| `stop` — gate, ambiguity, irreversible action, third failed attempt, budget, missing user input | The six ways a run must end. Each is a situation where continuing requires a judgment the contract did not delegate. | The agent pushes through a gate, guesses at an ambiguity, or retries a fourth time because nothing said stop. | BLUEPRINT:328–335, E08, R2:38 |
| `budget` — `max_files`, `max_tokens`, `max_minutes`, `attempts_per_problem` (max 3) | Spend is bounded on the three axes a coding run actually consumes, and retries are bounded separately. | A run can touch a thousand files or burn a day; "three attempts" becomes advisory. | BLUEPRINT:328–335, kubernetes `activeDeadlineSeconds`/`backoffLimit`, BehaviorTree retry |
| `checkpoints` — every 30–60 minutes or at a gate | A cadence, so a long run leaves traces before it ends, and a gate is a natural boundary. | The first evidence of a six-hour run is its final report; a failure costs the whole run. | BLUEPRINT:328–335, ml-agents `summary_freq`/`keep_checkpoints` |
| `log` — `runs/AUTONOMY.jsonl`, append-only: time, action, files, result, decision, next | Append-only means the record cannot be tidied after the fact; the six fields are enough to replay a run. | The run is reconstructed from the agent's summary, which is exactly the account that cannot be trusted. | BLUEPRINT (game tree), godot `--log-file` |
| `report` — changed, evidence, open questions, next | The closing artifact: what moved, how it was checked, what is unresolved, what follows. The four parts are the minimum a next session needs to continue without re-reading the log. | A run ends with no account, and the next session starts from guesswork. | BLUEPRINT:328–335 |
| `escalation` — one `BLOCKING —` question with options and a recommendation, then stop | One question, structured so the user can answer in a word, and a stop so the run does not wait. | Either a stream of small questions or a silent guess; both defeat the point of autonomy. | R2:42, BATCH-1:2 |

## Checkpoints

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| "Every checkpoint writes `STATE.md` — done, next, blocked — and one log line" | Defines what a checkpoint *is*: a write, not a feeling of progress. Three fields cover resume, continuation and blockage. | Checkpoints become status messages in chat, which vanish with the session. | BLUEPRINT:328–335, context discipline |
| "a resumed run starts from `STATE.md`, not from memory" | The file is the memory. A new context must not invent a history. | A resumed agent reconstructs what it "was doing" and silently changes the plan. | BLUEPRINT (game tree) |
| "Work in a worktree or a scratch branch: a scratch commit is private (R4), so it is allowed; publish never is." | Isolation, plus the commit/publish distinction stated where it matters. Without the second half, an agent either refuses to commit (losing work) or pushes. | The run dirties the main checkout, or it publishes "to be safe". | git worktree, R4:37, BLUEPRINT:25 |

## Blocked

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| "A stop condition ends the run; it does not pause it." | Resolves the R2 deadlock: an autonomous run cannot receive an answer mid-run, so "pause and wait" is indistinguishable from a hang. | The agent waits forever, or resumes itself after a pause and answers its own question. | BATCH-1:2, E08 |
| "Ask the one `BLOCKING —` question, write it to `STATE.md` under \"blocked\", and stop." | One question, durable location, immediate end. The write is what makes the stop visible to the next session. | The question exists only in a transcript nobody reads; the next run repeats the same block. | BATCH-1:2, BLUEPRINT (`STATE.md`) |
| "Do not answer it yourself and do not continue on a guess: the next run starts from the answer." | The prohibition and the handoff. It names the two failure modes (self-answer, guess) and the recovery path. | The deadlock returns disguised as initiative: the agent supplies the missing user input itself. | BATCH-1:2, R2:42 |

## Limits

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| "Autonomy never overrides R1–R9. Permissions are law and rules are advice: a denial outranks the contract, and routing around it is a violation, not initiative." | Precedence in one line: contract < permissions, and the whole rule set stays above the mode. "Routing around" is named because that is how a bypass actually looks. | A contract is used as a permission grant; a denied command is rephrased until it passes. | BLUEPRINT:326, BLUEPRINT:357 |
| "R4 keeps publish, R8 keeps the human at G1, and G1–G3 end the run with evidence, not with a decision." | Names the three ownership boundaries autonomy is most likely to cross: publishing, the fun judgment, and gate authority. | An autonomous run pushes, declares the loop fun, or marks a gate passed. | R4:37, R8, BLUEPRINT (gates) |

## Check

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| "Contract, checkpoints, and report are files, so a reviewer reads the run from `STATE.md` and `runs/AUTONOMY.jsonl` without trusting the transcript." | Makes the rule auditable: the evidence is on disk, and the transcript is explicitly not evidence. | Review depends on the agent's own narrative; a fabricated summary passes. | R1, BLUEPRINT (game tree) |
| "E08 scores the third-attempt stop." | Ties the cap to a test. A limit with no eval is a suggestion. | The attempt cap is never exercised, and the first real test is a run that should have stopped. | E08, BLUEPRINT:205 |

## Deliberately absent

- The contract template itself — X01 owns it; restating it here would create two
  sources of truth.
- Publish procedure or permissions for push, release, deploy, spend, post — R4
  owns all of it; R10 only forbids it inside a run.
- Gate criteria — G1–G3 own their questions; R10 only says a gate ends the run
  and leaves evidence.
- Engine, OS or editor specifics — the rule must load in any project; only
  `STATE.md` and `runs/AUTONOMY.jsonl` are named, and both already exist in the
  blueprint's tree.
