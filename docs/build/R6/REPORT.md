# R6 — Report

## Summary

R6 makes admission to the library a gate: a rule, skill, agent, tool, pack, or
document enters only after the same failure happened twice in separate sessions
with an evidence path, or after an eval, fixture, or playtest shows a capability
is missing. A single annoyance goes to `NOTES.md` or `lessons/` instead. Before a
new part is allowed, the rule walks four rungs: clarify an existing part, add one
checklist line or eval case, fix the tool that failed, and only then add a part.
Every addition must name a trigger, input, output, done check, and the eval or
fixture that proves it, and must delete or merge one existing part in the same
change. Removal is one commit with no deprecation period, and the record lives in
`DECISIONS.md`; memory follows the same gate.

## Size

| Metric | Value | Threshold |
|---|---|---|
| Words | 412 | — |
| Characters | 2291 | — |
| Lines | 65 | — |
| Tokens (chars / 4) | 572.75 | 600 |
| Tokens (words × 1.35) | 556.2 | 600 |

Both estimates agree and are inside the 520–580 target band, with 27 tokens of
headroom under the hard limit by the chars/4 method.

## Encoding

- UTF-8 without BOM (first three bytes checked: `23 20 52`, not `EF BB BF`).
- LF only: 65 line feeds, zero CRLF.
- No tabs, no trailing spaces, final newline present.
- The only non-ASCII character is U+2014 (em dash) in the title line; no
  mojibake sequences.
- POSIX separators in prose paths; file name `R6-add-only-after-failure.md` is
  Windows-safe.

## Checks run

| Check | Result |
|---|---|
| Size, both methods | 572.75 tok (chars/4), 556.2 tok (words×1.35); under 600 |
| Encoding | UTF-8 no BOM, LF only, no tabs or trailing whitespace |
| Path safety | Artifact under `staging/R6/artifact/library/core/rules/`; nothing written outside `staging/R6/`; POSIX paths in text |
| Frontmatter | None; file opens with `# R6 — Add only after failure`, loads via `.opencode/rules/*.md` |
| Cross-references | R1 ×1, R3 ×1, E03 ×1, E07 ×1, S01 ×1, S03 ×1, S04 ×1, S05 ×1, M01 ×1, `DECISIONS.md` ×2, `NOTES.md` ×1, `lessons/` ×2 |
| Duplication | No restatement of R2's question budget or R3's sourcing rules; R3 is referenced, R2 is not named and appears zero times |
| Scope | No engine, OS, or editor specifics; core layer, project-agnostic |

## Open questions

1. **"New library enters as one addition"** — the carve-out assumes the initial
   library is one admitted decision. A reviewer could ask where "new" ends; the
   current answer is the second addition, which must delete or merge something.
2. **"No question" on removal vs R2** — the line is scoped to deletion, and a
   deletion is reversible in git, which R2 does not require asking about. It is
   still the closest R6 comes to R2's subject.
3. **SFML quote source** — three quotes come from `sfml-dev.org/contribute.php`,
   linked from `CONTRIBUTING.md`, not from a file inside the repository. This is
   disclosed in `SOURCES.md`; the counts and the other eight quotes are from repo
   files.

## Known weaknesses

- The carve-out could be read as a licence for bulk additions; "one failure, one
  proof, many files" is the only guard against that reading.
- The rule cannot mechanically stop a CI process or a generator from releasing
  new parts; it governs the agent's decision, not the pipeline. R1's check is the
  closest automated pressure.
- The quarterly review depends on a human remembering it. Nothing in the library
  schedules it, so an unused part can survive past two projects.
- "Unused across two projects" is unmeasurable until a second project exists; in
  a single-project template the fallback is `DECISIONS.md` and review.

## Rubric self-check

| # | Section | Status | Note |
|---|---|---|---|
| 1 | Necessity | PASS | 30 units in `JUSTIFICATION.md`, each with a named cost if removed; no line restates another part. |
| 2 | Function | PASS | Trigger: about to add a part. Input: failure evidence or a failing fixture. Output: a part with five named items plus a `DECISIONS.md` line. Done: the fixture passes. Failure: addition refused. Scope: library parts only. |
| 3 | Evidence | PASS | 9 repos, 4/3/2, stars on 2026-11-25, verbatim quotes, borrow and reject for each; synthesis, no copied text or code. Two counts are rounded by the badge, disclosed. |
| 4 | Fit | CONCERNS | Core layer and blueprint IDs are used, and no rule is contradicted. The "new library" carve-out is a judgement call, not a blueprint sentence. |
| 5 | Size | PASS | 572.75 tok by chars/4, 556.2 by words×1.35; under 600 and inside the 520–580 target. |
| 6 | Language / encoding | PASS | English, plain text, UTF-8 no BOM, LF, POSIX paths, Windows-safe name, one non-ASCII character. |
| 7 | Security | PASS | No secrets, no commands executed by the rule, no network use. It reduces surface by shrinking what the agent loads. |
| 8 | Testability | CONCERNS | Admission is checkable (fixture + `DECISIONS.md` line), but the rule's own effect — fewer unused parts — is measured by the quarterly review, not by an automated check. |
| 9 | Integration | PASS | References resolve to blueprint parts (R1, R3, E03, E07, S01, S03, S04, S05, M01) and to `DECISIONS.md` (D03), `NOTES.md`, `lessons/`; the file loads standalone with no frontmatter. |

Review: pending
