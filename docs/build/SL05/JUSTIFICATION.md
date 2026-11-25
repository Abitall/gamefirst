# SL05 /retro — justification

Every semantic unit of `artifact/template/.opencode/commands/retro.md`: why it exists, what breaks if
it is removed, and where it came from. Source column values: `brief` = the SL05 task boundary,
`BP` = `docs/V0.3-BLUEPRINT.md`, `RB` = `docs/REVIEW-RUBRIC.md`, `S03` =
`staging/S03/artifact/library/core/skills/retrospect/SKILL.md` (accepted, `docs/BUILD-PLAN.md` row 38),
`R1`–`R10` = `library/core/rules/`, `A01` = `library/core/agents/partner.md`, `S1`/`S2` = numbered
source in `SOURCES.md`.

The command is a trigger, not a second method. It adds three things S03 does not own — the input reads,
the write to a dated file, and the screen — and it names the evidence floor. Every step of the method
stays in S03.

| # | Unit | Why it exists | Breaks if removed | Source |
|---|---|---|---|---|
| 1 | `description: Stage close: five S03 lines and one dated retro file` | One line that separates `/retro` from `/status` and `/verify` in the command list; all three print, only one writes a lesson | The list shows two adjacent commands that read as "report on the stage"; the user picks the wrong one | brief; S1 "Text shown in command lists and discovery"; RB §9 |
| 2 | `agent: partner` | The retro runs in A01: A01 owns the stage, the gate line, `STATE.md`, and the decision that a stage is closed | The command inherits whichever agent is active; a coding agent writes a lesson and edits the wrong files | brief; A01 duties; BP line 251 |
| 3 | `subtask: false` | Pins the run to the current session, so the five lines land in the conversation the user is in and in the same workspace | OpenCode runs a background child whenever the selected agent is a subagent; the retro prints in a child and the file appears with no context in the parent | brief; S1 `subagent: false` "Always use the current session" |
| 4 | Read `STATE.md`, `DECISIONS.md`, `BACKLOG.md`, `evidence/`, `docs/playtests/` | The admissible material, named so the retro does not argue from chat. `STATE.md` gives the stage, budget and gate; `BACKLOG.md` receives the overflow; `evidence/` and `docs/playtests/` carry the proofs | Step 1 of S03 has nothing to verify against; the retro quotes the transcript, and the transcript is what compaction deletes | brief; S03 inputs; R1 |
| 5 | `(settled changes)` after `DECISIONS.md` | States why the file is read: a change already recorded there must not be proposed again, and R2's "no repeats" applies to changes as much as to questions | The same change is proposed in two consecutive retros; the record contradicts the retro and nobody reconciles them | R2 "No repeats"; R6 "Record"; A01 |
| 6 | `Run S03 as written; this adds the inputs, file, and print` | Declares the split: the method lives once, in S03. The command is the entry point | Two copies of the method drift; the command grows into a second skill and blows the screen and the token cap | brief "без дублей S03"; R5 "One page, one fact"; S03 locating line |
| 7 | "An argument names the stage or gate, otherwise `STATE.md`" | OpenCode appends unmatched arguments after a blank line, so `/retro G2` would leave a bare token in the prompt; the rule says what it means. It also closes S03's open question 2, which assumed a stage or gate is passed | A stray argument is read as evidence, or the stage is guessed from the last heading in `STATE.md` | S1 "Fallback"; S03 open question 2; BP gates |
| 8 | `Count distinct evidence paths` | Turns the floor into arithmetic. "Distinct" matters: the same screenshot counted twice is one proof | "Fewer than three" has no unit, so the threshold is a feeling and every retro passes | brief; S03 step 1 |
| 9 | `no claim without one (R5)` | The citation rule in six words: a claim carries its artifact or it is not a claim | A sentence survives on emphasis; the reader cannot tell a verified line from an opinion | R5 "Cite the proof. No citation, no claim"; R1 |
| 10 | `Fewer than three:` | The honesty rule the brief requires, made checkable at a number | A thin stage produces a confident retro built on one screenshot and a memory | brief |
| 11 | "`Failed:` states the count and the gap" | Puts the absence of evidence where S03 puts it: `Failed` is the finding, not a blank | Missing evidence reads as "nothing to report", which is the one answer the retro must never give | S03 "Failure behavior", first bullet |
| 12 | "`Change:` is the missing check, never a guess" | Converts a thin stage into the one actionable change instead of a wish | The retro closes with a plausible cause and a vague intention; the next stage repeats the failure with no check to catch it | S03 step 5; R6 "a part with no failing check is a wish" |
| 13 | `A fact only the user holds: one R2 question` | The single permitted question, at R2's budget and in R2's shape; it keeps the retro from becoming an interview | Either the command asks five questions, or it invents the answer and calls it a cause | R2; A01 "Questions (R2)" |
| 14 | "A stop under R10 is named in `Why:`" | When the stage ran unattended, the stop reason is the cause. Reading it from the contract log replaces a guess about "a hard stage" | A burnt attempt budget or a missing input is explained as a personal failure, and the next run repeats it | R10 "stop"; S03 step 3 |
| 15 | `Print one screen: five lines, then the path` | Fixes the output shape and gives A01 the locator for the file | The retro becomes a narrative; the reader cannot find the record without a search | brief; BP line 152; RB §5 |
| 16 | The five labels, in this order | The contract: `Worked / Failed / Why / Change / Next`, identical to S03's output block | Length becomes a style question, and "why" is dropped because it is the hardest line to write | brief; S03 "Output"; BP line 152 |
| 17 | "Write them to `docs/retro/<YYYY-MM-DD>.md`" | The durable record; a dated file is the only trace that survives the session | The retro lives in chat and evaporates at the next compaction; nothing for R6's repeat test to read | brief; S03 step 6; BP tree line 98 |
| 18 | `(create the folder)` | `docs/retro/` is in the blueprint tree but absent from the shipped template, so the first run has nowhere to write | The first retro on a fresh project fails or writes at the repository root | BP line 98 vs `template/docs/`; S2 `mkdir -p $dstdir` |
| 19 | `a same-day repeat takes -2` | The date-only path collides twice in one day; the second retro needs a legal name | The second retro overwrites the first, which contradicts unit 20 | brief path; S03 step 6; S03 unit 18 |
| 20 | `Never rewrite a past retro` | Countability: R6's two-failure proof needs two records that still say what they said | A fixed failure disappears from history, so the same mistake can never be shown twice | S03 step 6; R6 "Repeated failure" |
| 21 | "One change only: a second goes to `BACKLOG.md` with its cost (R9)" | Caps the change budget at one and parks the overflow where an idea keeps its value | The retro turns into a feature list with no owner and no room to build it | S03 failure behavior, second bullet; R9 "A new idea" |
| 22 | "One pointer line in `STATE.md`" | A01 reads `STATE.md` first; the pointer is how the record is found without a search | The file exists and no one reads it; the next stage starts from a clean slate | S03 step 6; A01 "STATE.md is the truth" |
| 23 | `A01 owns the file` | Names the writer, so the write has an owner and a permission boundary | The write belongs to no one: the skill assumes the command writes, the command assumes the skill does, and neither does | brief; A01 permissions |
| 24 | `No praise, no invented conclusion, no "all good"` | Three bans, because the default failure of a retro is a pleasant summary | The retro becomes a status report; a stage that failed ships with a positive note and the failure is discovered at the next gate | brief; S03 "Out of scope" (fun is R8) |

## Fit decisions

| Question | Decision | Why this wins | Compensating change outside the artifact |
|---|---|---|---|
| Three proofs, while R6 admits a part after two failures | Keep three for closing a retro; leave two where R6 has it | The two numbers govern different acts. R6 asks "may this part exist?" and its proof is two failures *of the same kind*. The retro asks "was this stage good enough to learn from?" and three independent paths is the cheapest bar that survives a bad week. Collapsing them would make the retro's floor weaker than the rule it feeds | None needed. A retro holding two proofs may still propose an R6 part; it writes `Failed:` about the third and lets the part carry its own two-failure case |
| `docs/retro/` is in the blueprint but not in the shipped template | The command creates the folder on first write instead of printing a `Missing:` line the way `/status` does | `/status` reports, so a missing file is its finding; `/retro` produces a file, so a missing folder is an obstacle it can remove in one step. A `Missing: docs/retro/ — batch 4` line would cost a round trip and leave the user to run `mkdir` | N00 should still add `docs/retro/.gitkeep` (batch 4); until then unit 18 carries it. Flagged in `REPORT.md` as an integration gap |
| S03 admits `runs/*.jsonl` and build output as evidence; the command counts only `evidence/` and `docs/playtests/` | Count the two stores the brief names; a run that leaves no path in `evidence/` is not a proof | A count that accepts "I ran the tests" is not a count. R1 already says the artifact is the proof; the command only names where proofs live so the number is stable | S03 still reads `runs/` under an R10 contract, and unit 14 keeps that visible. Widen the count only if a stage routinely proves work with logs alone |
| `DECISIONS.md` purpose is one cue, not a rule | `(settled changes)` rather than a full sentence plus a check | The command has 12 tokens of headroom; a sentence would cost 60 characters that the five-line shape needs more. The cue plus R2's "no repeats" is enough for a reader who knows the rules | Documented as an open question in `REPORT.md`; if a reviewer wants teeth, the line becomes `Change: ... not one already in DECISIONS.md` and another clause goes |

## Deliberate omissions

- **No `$ARGUMENTS`, `$1`, or `!` shell block.** The command takes no template arguments (unit 7 reads a
  bare argument from the fallback), and a shell block runs outside the permission flow (S1). A retro that
  can run shell can regenerate evidence instead of reading it.
- **No `model` override.** The retro runs with A01's model and permissions; an override would let the
  command borrow a model A01 was not configured to use (S1 model precedence).
- **No `template` key.** Markdown commands take the body as the template; a `template` key in frontmatter
  is the JSON form (S1).
- **No restatement of S03's seven steps, failure list, or out-of-scope list.** Unit 6 sends the reader to
  S03 once. A copy would drift and double the size.
- **No second file template.** The five lines are the format; a separate retro template would be a second
  place to change and a second thing to keep in sync.
- **No score, praise line, severity, or timeline.** All four are report furniture: they let a thin stage
  look complete. Unit 24 bans the outcome, not the vocabulary.
- **No gate verdict and no fun judgement.** A01 runs the gates and R8 owns fun; the retro records and
  feeds the next stage (S03 out-of-scope).
