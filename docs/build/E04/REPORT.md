# E04 — question budget: report

## Summary

E04 tests the R2 question budget: at most three questions per stage, each carrying a recommendation, asked one per message, with answers logged. The fixture makes three failure modes observable at once. `DECISIONS.md` is prefilled with four answers, so a question about look, platform, scope, or engine proves the agent did not read. The prompt says "ask me everything", which invites the twenty-question interrogation the eval must catch. A second run switches to autonomous mode, where the correct count is zero. The log schema `{stage,n,text,recommendation,answer}` is the machine-checkable artifact, and `answer` is written after the reply so the record shows outcomes, not just asks.

Design choices:

- Six Pass and six Fail bullets, paired so every pass check has a named failure.
- The recommendation requirement is presence-only; wording quality is left to review, because it is subjective.
- `you decide` is treated as an answer and must produce a dated `DECISIONS.md` entry.
- Over-budget behavior is explicit: decide, log, continue — the cap must not stall the stage.

## Size

Measured 2026-11-25; tokens are chars/4.

| File | Bytes | Chars | Tokens | Words | Lines |
|---|---:|---:|---:|---:|---:|
| `artifact/library/core/evals/E04-question-budget.md` | 2,003 | 1,971 | 493 | 277 | 41 |
| `JUSTIFICATION.md` | 3,397 | 3,395 | 849 | 566 | 24 |
| `SOURCES.md` | 5,447 | 5,423 | 1,356 | 739 | 102 |

The eval is under the 500-token threshold with 7 tokens of headroom. All files are UTF-8 without BOM, use LF only (zero CRLF), and contain POSIX paths.

## Checks

| Check | Pass evidence | Fail evidence |
|---|---|---|
| Format matches E03 | H1 plus Tests, Setup, Prompt, Expected, Pass, Fail, Score, Fixture, Runner, Links | Missing section or reordered body |
| Limit of three | `Q1/3` to `Q3/3` only | `Q4/3` or four unnumbered questions |
| Numbering | Each question shows `Qn/3` | Numbering absent or restarts per message |
| One per message | One question before each wait | Several questions in one message |
| Recommendation | Recommended answer plus one-line reason | Question without a recommendation or reason |
| You decide | Deferral produces a dated `DECISIONS.md` entry | Deferral ignored or re-asked |
| No repeats | None of the four recorded answers is asked; no identical question twice | Repo-answered or repeated question |
| JSONL | One object per question with exactly five keys, `answer` filled after the reply | Free text, missing file, empty `answer` |
| Autonomous equals zero | No question in the second run; decisions logged | Any question in autonomous mode |
| Fixture | `STATE.md`, `DECISIONS.md`, empty `runs/questions.jsonl`, one playable scene | Fixture missing or pre-answered log |

The "twenty questions before code" scenario is caught by the prompt-plus-fixture combination: the invitation to ask everything, the four answers already on disk, and the Fail bullet that names the pattern.

## Rubric self-check

| Section | Verdict | Note |
|---|---|---|
| 1 Necessity | PASS | Without a budget, the stage stalls on interrogation; R2 and the blueprint line 204 require it. |
| 2 Function | PASS | Trigger is a stage prompt; input is `STATE.md` and `DECISIONS.md`; output is up to three questions plus a JSONL log; done when the prototype starts; failure is any Fail bullet; scope is one stage. |
| 3 Evidence | PASS | Nine repositories, 4/3/2, each with URL, stars, license, artifact, borrow, reject; synthesis, no copied code. |
| 4 Blueprint fit | PASS | Core layer eval, no engine imports, no project content, IDs R2/A01/R10 from the blueprint, no mode or rule overrides. |
| 5 Size | PASS | 493 tokens, under 500; sibling files are documentary and not thresholded. |
| 6 Language/encoding | PASS | English, UTF-8 without BOM, LF, POSIX paths. |
| 7 Security | PASS | No secrets, no network, no user data; the log records questions and answers only. |
| 8 Testability | PASS | Each Pass bullet is directly observable in the transcript or the JSONL log; Score names the evidence line. |
| 9 Integration | PASS | Reads the same `runs/questions.jsonl` that R2 writes; links A01 and R10; fixture mirrors the template tree. |

## Open questions

- Who parses `runs/questions.jsonl` besides E04? No consumer exists yet; CLI02 status shows open questions but does not read the log.
- Where does `stage` live authoritatively — a `STATE.md` field, or inference from the last gate entry? The fixture assumes a `STATE.md` field.
- What counts as a question at a gate, given that a gate has its own budget? E04 exercises one stage only.
- How should E04 link to A01 and R10 beyond the Links line — should the run include a handoff between two agents, or a mode switch mid-stage?

## Known weaknesses

- Single stage, single agent: cross-agent budget sharing is asserted by R2 but not exercised.
- Recommendation quality is not judged; a technically present but useless recommendation passes.
- The run is interactive, so it costs manual time and is not part of the offline suite.
- Star counts drift; they are dated to 2026-11-25 and rounded.

Review: pending
