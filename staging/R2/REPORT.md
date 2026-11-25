# R2 — Report

## Summary

R2 is a core rule that bounds dialogue: at most three questions per stage
(numbered 1–3), batched in one message, each with a recommended answer and a
one-line reason, plus a standing "you decide" option. It defines what deserves
a question (taste, scope, irreversible choices, missing data), forbids questions
the repo or a one-day spike can answer, treats a repeated question as a bug, and
makes autonomous mode ask nothing — it inherits R10's stop list rather than
defining a second one. Every question is logged to `runs/questions.jsonl`, which
is what E04 reads.

The rule ships as plain text with no YAML frontmatter: it loads through
`.opencode/rules/` and `instructions` as written. The title carries the ID;
versioning lives in `agent.lock.json`. This matches R1.

## Deliverables

| File | State |
|---|---|
| `staging/R2/artifact/library/core/rules/R2-ask-within-budget.md` | written, 2069 chars, no frontmatter |
| `staging/R2/JUSTIFICATION.md` | written, 17 units + deliberate omissions |
| `staging/R2/SOURCES.md` | written, 9 repositories (4/3/2) + dead ends |
| `staging/R2/REPORT.md` | this file |

## Size

| Measure | Value |
|---|---|
| Characters (code points) | 2069 |
| Tokens by chars/4 | 517.25 (~517) |
| Bytes (UTF-8) | 2095 |
| Words | 343 |
| Lines | 46 |
| Cap | 600 tokens |
| Headroom | ~83 tokens (13.8%) |

The count covers the whole file as loaded, title and format line included. If
bytes/4 is used instead, the figure is 524 — still under the cap.

## Design decisions

- **No frontmatter.** Rules are read as context, so metadata would become text;
  the ID is in the title and versioning is the lockfile's job.
- **Batch of three, not one at a time.** spec-kit's one-at-a-time delivery and
  Donchitos' eight-question round were both rejected; three in one message costs
  the user one interruption and can be answered in three words.
- **Three, not five or eight.** The blueprint fixes the number. The rule spends
  its text on the filter, not on the count.
- **`n` is 1–3 inside each stage**, so every log row is checkable against the cap
  without knowing global history.
- **A gate's budget is its own.** A gate reviews a stage that may have spent all
  three; counting gate questions against that stage would either silence the gate
  or fail a compliant stage.
- **"Across all agents."** A01, A02, and A03 can each reach the user; without
  this clause the real budget is nine.
- **A log file, not a self-report.** E04 needs an input. The path reuses the
  blueprint's `runs/` directory, so no new location is invented.
- **No second stop list.** Autonomous hard stops are R10's `stop` categories by
  reference. R2 adds behaviour, not policy.
- **No per-stage question templates.** S06, S08, and S10 own their content; R2
  owns the budget and the filter.

## Rubric self-check

| Section | Verdict | Note |
|---|---|---|
| 1. Necessity | PASS | 17 units, each traced to a blueprint line or an observed failure mode; no unit repeats another rule. |
| 2. Function | PASS | Budget, filter, you-decide, no-repeat, autonomous, blocking, and check are all present and in the order a conversation meets them. |
| 3. Evidence | PASS (concern) | Exactly 9 repos, 4/3/2, artifacts read directly, stars dated 2026-11-25. Concern: gamedev sources 3 and 4 are small (723 and 64 stars) because questionnaire artifacts are rarely published as repos. |
| 4. Fit | PASS | Uses `STATE.md`, `DECISIONS.md`, `runs/`, R10, E04 as defined; does not restate R10's stop list or any phase name. |
| 5. Size | PASS | 517 tokens by chars/4, 13.8% under the 600 cap. |
| 6. Language / encoding | PASS | English, engine-agnostic, UTF-8 without BOM, LF only. |
| 7. Security | PASS | No secrets, no network, no executable content; paths are repo-relative. |
| 8. Testability | PASS | E04 reads `runs/questions.jsonl`; over three questions in a stage, an `n` outside 1–3, or a missing recommendation fails mechanically. |
| 9. Integration | PASS | Plain text, first line `# R2 — Ask within budget`, no frontmatter; loads through `instructions` beside R1; no files outside `staging/R2` were touched. |

Overall: **PASS**, with the evidence-breadth concern recorded above and the two
open questions below.

## Encoding

All four files checked with a Node script: first bytes are not `EF BB BF`
(no BOM), the CRLF count is zero, every line ends in LF, and no replacement
characters are present. Files are saved as UTF-8.

## Open questions

1. **No reader exists yet.** `runs/questions.jsonl` is a contract without a
   parser or a schema; E04/CLI04 need to own one, including how quotes and
   newlines in `text` and `answer` are escaped.
2. **Autonomous + blocking.** R2 routes a blocked autonomous run to R10
   escalation. If R10 does not permit a question at a hard stop, the run can
   deadlock; this should be stated in R10 or waived here.
