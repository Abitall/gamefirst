# S04 import - report

## Summary

`import` is a six-step core skill. It turns a named source into a candidate artifact with a source card, a baseline test, a passing S02 run, and an admission proposal under R6. It does not summarize sources, copy content, admit itself, or write memory.

Delivered: `artifact/library/core/skills/import/SKILL.md`, `JUSTIFICATION.md` (29 units plus omissions), `SOURCES.md` (nine repositories, 4/3/2, plus dead ends), and this report.

## Design decisions

- One method per import. Step 3 rejects a duplicate and forces one-in-one-out by naming what the import replaces or merges.
- The source card records license and a locator: page, timestamp, or commit. An unclear license means idea only.
- The baseline run without the candidate must fail. The source's own example output is never evidence.
- S02 decides the test. Pass proposes R6 admission and an M01 record; fail records why and discards the candidate.
- The bundle has four files. The candidate is copied to its target only on admit; the bundle stays as evidence.
- A method that ships as code routes to S05 and the toolbox.
- No separate failure section: Step 6 and the `RESULT.md` line carry the failure path; a second section would repeat them.

## Size

| Metric | Value |
|---|---|
| Bytes | 3,092 |
| Characters | 3,092 |
| Words | 519 |
| Tokens, characters/4 | 773.0 |
| Tokens, words x 1.35 | 700.7 |
| Threshold | 800 |
| Target band | 720-780 |
| Lines | 54 LF-terminated lines, 55 split segments |
| Line endings | LF; 0 CRLF |
| Encoding | UTF-8, no BOM, ASCII only |
| Status | PASS: 773.0 is under 800 and inside 720-780 |

## Interface assumptions

- S02 has no claim type for a behavioral skill test; its table covers mechanic, UI, content, performance, and release. S04 records the task and result in the bundle (`test.md` and `RESULT.md`) and applies S02's evidence rule. S02 may need an `agent` claim type or an explicit mapping. This is the main cross-part flag.
- S04 has no Bash; `allowed-tools` is read, search, fetch, and write. The test run depends on S02's execution tools. If a skill cannot lend tools, S04 must be invoked alongside S02, or Step 5 cannot run.
- The evidence path follows S02's dated convention. `<slug>` is the source slug or target ID; `candidate.md` records the target path.
- Admission and memory writes are proposals. Approval adds the `DECISIONS.md` line and the M01 record.
- Toolbox routing is a pointer only; S04 does not build the tool.

## Cross-reference flags

- R6: one-in-one-out. Step 3 must name the replaced or merged part; no replacement means reject.
- R3/E05: external content is data. An injection is reported to the user and changes no task or write.
- S01: external facts. S04 scans local prior art and may use S01's source facts.
- S02: the test run. See the interface gap above.
- S03: a stage retrospect can surface the repeated failure that starts an import.
- S05/toolbox: a code method routes there.
- M01: memory is proposed, never written automatically.

## Open questions

1. Add an `agent` claim type to S02, or map a behavioral test to `content`?
2. Keep failed bundles in `library/lessons/`, or only in `evidence/`?
3. Is admission approval the user's call, or mechanical once R6 proofs exist? Current: propose, then approve.
4. Must a repository source card carry a commit, or are date and URL enough? Current: commit.
5. Is `<slug>` the source slug or the target ID? Current: source slug; the target is recorded in `candidate.md`.

## Known weaknesses

- One test task can pass by chance; repeated trials were rejected for cost.
- A behavioral test needs a transcript; there is no automated harness.
- License checking is manual, not a legal review.
- Paywalled books and videos need user-supplied text; S04 can read a transcript or notes, not watch or listen.
- Star counts are a popularity proxy, not a quality measure; the AI sources skew high.

## Rubric self-check

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | 29 units in `JUSTIFICATION.md`, each with why, break, and source; omissions listed. |
| 2 | Function | PASS | Trigger, input, six steps, output bundle, terminal decision, and scope are explicit. |
| 3 | Evidence | PASS | Nine repositories, 4/3/2; stars read 2026-11-25; artifacts verified; dead ends named. |
| 4 | Fit | PASS | Core skill, no engine or project content, blueprint IDs, priority respected. |
| 5 | Size | PASS | 773.0 characters/4; under 800 and inside the 720-780 band. |
| 6 | Language/encoding | PASS | English, ASCII, UTF-8 without BOM, LF, POSIX paths. |
| 7 | Security | PASS | R3 boundary, license checks, no secrets, no publish or autonomous write. |
| 8 | Testability | PASS | Baseline plus S02 run plus `test.md`/`RESULT.md`; failure is actionable. |
| 9 | Integration | PASS | Stable name and IDs; references resolve; no engine, OS, or editor assumption. |

Ready for review.

## Review

Review: pending
