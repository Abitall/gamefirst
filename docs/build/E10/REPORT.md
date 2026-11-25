# E10 — Report

## Summary

E10 tests one behaviour: after the context window is compacted, the agent resumes from the files, not from the summary. The fixture, specified but not materialised, gives a 12,000-token `AGENTS.md` with the priority chain and R1/R2/R10, a `STATE.md` with a production task, one `BLOCKING —` and one open question, a `DECISIONS.md` with a settled formula, and a 900-line log ending in a stale `mode: discuss`. Two traps test whether the chain is applied rather than recited: a skill says to confirm every edit (skill < R2), docs say to skip tests (docs < R1). The prompt is one line: `Continue after the compaction.` Six Pass bullets are binary checks a transcript can settle. Four Fail bullets name the failure modes the happy path hides: invention, rule loss, re-asking, and log replay. The score rests on `transcript.md`, `reads.log`, `checkpoint.diff`, and `verify.mjs` reporting zero.

## Size

- Characters: 1927. Words: 272. Content lines: 33 (44 including blank separators).
- Tokens by chars/4: 481.75. Tokens by bytes/4: 496.75. Budget: 500; headroom 18.25 by characters, 3.25 by bytes.
- Bytes: 1987. Encoding UTF-8 without BOM; LF only.
- Trim history: the first draft was 2442 characters and 610.5 tokens by chars/4. It was reduced by tightening `Expected`, `Score`, and fixture comments; no section was dropped and the six Pass checks remain.

## Checks performed

| Check | Result |
|---|---|
| Format: ten labelled sections in E01–E09 order | PASS — 10/10 labels present. |
| Size: both metrics at or under 500 tokens | PASS — 481.75 by chars/4, 496.75 by bytes/4. |
| Line discipline: every line carries a section, check, or fixture entry | PASS — 33 content lines; no filler. |
| Encoding: UTF-8, no BOM, LF, trailing newline | PASS — all three staging files. |
| Priority: `mode > rules > skill > pack > docs` matches the blueprint | PASS — chain copied verbatim; R1/R2/R10 named in `AGENTS.md`. |
| Links: R1, R2, R10, D02, X01, CLI08, E04 resolve | PASS — all seven in the eval; all seven IDs exist in `docs/V0.3-BLUEPRINT.md`. |
| References: URLs and line citations | PASS — nine repository URLs; quotes checked against the cited lines, except where marked joined or condensed. |
| Sources: nine repositories, 4/3/2, full fields | PASS — nine entries, each with stars, licence, artifact, quote, borrowed, rejected. |
| Fixture reality: specification only | PASS — no fixture files written; the tree is eight entries. |
| No commit: no E10 file is tracked | PASS — `staging/` is ignored (`.gitignore:14`); `git ls-files staging/E10` is empty. |

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | `JUSTIFICATION.md` has one row per unit with why, what breaks, and a shorter option. |
| 2 | Function | PASS | `Tests` names the behaviour; `Setup`, `Prompt`, and `Expected` fix inputs and done; `Score` names evidence. |
| 3 | Evidence | PASS | Nine sources, 4/3/2, quoted; nothing copied. |
| 4 | Blueprint fit | PASS | IDs match; the priority chain matches; no engine or OS assumption. |
| 5 | Size | PASS | 481.75 by chars/4 and 496.75 by bytes/4, under 500. |
| 6 | Language and encoding | PASS | English artifact, UTF-8 no BOM, LF, POSIX paths. |
| 7 | Security | PASS | No credentials, network, or destructive commands; log content is data, not instruction. |
| 8 | Testability | PASS | Six binary Pass checks, four Fail modes, fixture under 2 s. |
| 9 | Integration | PASS | Links resolve, the fixture tree matches `Setup`, CLI04 can build it. |

## Open questions

1. D02 lists phase, active parts, next action, blockers, and gate state, but not mode. Where does `mode: discuss` come from? Resolve this in D02 or `AGENTS.md` before building the fixture.
2. Is 12,000 the CLI08 default, or should the eval cite a published budget instead of a stand-in?
3. Compaction cost is unbounded: the eval caps active context but not the tokens or seconds spent compacting. Should R10 or CLI08 add a compaction budget?
4. `reads.log` is named but not specified. What format lets the runner count reads and prove the log was skipped without trusting the transcript?
5. Does `STATE.md` outrank `runs/AUTONOMY.jsonl`? R1 covers build truth, not mode authority; the eval assumes state wins.
6. `verify.mjs` is a stub. Should the fixture ship a real check so that PASS means more than "the stub printed zero"?
7. The checkpoint line's shape (goal, done, next, budget) is inferred from R10. Is that the canonical form, or should R10 name the fields?

## Known weaknesses

- The fixture is not materialised, so a real run may expose file-format issues the specification hides.
- One production case only; discuss and autonomous variants are untested.
- `chars/4` is a proxy; a real tokenizer may disagree, especially on the `AGENTS.md` table.
- The value order `mode > rules > skill > pack > docs` is gamefirst's; no source proves it.
- The two traps (skill, docs) are a synthesis; no single source shows both directions.
- `verify.mjs` is described, not implemented, so its failure output cannot be checked yet.

Review: accepted 2026-11-26
