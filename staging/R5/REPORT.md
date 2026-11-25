# R5 — Report

## Summary

`R5-code-before-docs.md` fixes the order of work: the smallest working code and
its test come first, the document comes after and describes what exists. It
gives a four-step order, five properties of a document (behavior lives in code,
intent lives in the doc, every claim cites its proof, one page and one fact,
delta not rewrite), three forbidden document kinds, three pre-code exceptions
(BRIEF, DECISIONS, system card), a three-check docs lint, and one cheap check
(E01).

The design choice that shaped the rest: the rule is written as an *order plus a
list of illegal artifacts*, not as a documentation principle. "Document what
matters" cannot be audited; "no design document for an unbuilt system" can.

Two boundaries are stated rather than repeated: R1 owns what counts as evidence,
R6 owns whether a new document type may exist. R5 neither re-lists evidence
kinds nor restates the addition test.

## Size

| Metric | Value | Threshold |
|---|---|---|
| Characters | 2,181 | — |
| Tokens, chars ÷ 4 | **545.25** | 600 |
| Words | 404 | — |
| Tokens, words × 1.35 | 545.40 | 600 |
| Bytes | 2,195 | — |
| Lines | 58 | — |

Inside the 520–580 target band on both estimates, with 54 tokens of headroom on
the stricter metric.

## Checks run

- Encoding: UTF-8 without BOM, LF only, no CRLF, no replacement characters. One
  non-ASCII character in the artifact (the em dash).
- Size: measured by characters ÷ 4 and by words × 1.35; both agree within 3
  tokens.
- Cross-references: R1, R6, S02, D01, D03, D06, E01, R8, R9, X03, G1, CLI07 and
  N00 all exist in `docs/V0.3-BLUEPRINT.md`; no invented ID or path.
- Duplication: no sentence of R1 or R2 is restated; R1's evidence table and R6's
  addition test are pointed at, never paraphrased.
- Abstraction: no engine, OS, editor, or tool name appears; no command is given.
- Loadability: plain text, no YAML frontmatter, self-contained from the filename
  alone.
- Filename: `R5-code-before-docs.md`, ASCII, Windows-safe, POSIX path in the
  staging tree.

## Open questions

1. **Three Godot repositories in the gamedev set.** Disclosed in `SOURCES.md`;
   the artifacts differ in kind (generated reference, ideas repo, runnable
   demos). If the reviewer requires engine diversity, the swap is entry 3 →
   `hajimehoshi/ebiten` (13,647 stars), at the cost of a weaker "play it first"
   borrowing.
2. **"Approved" is borrowed, not defined.** Step 3 says a human played it and
   R8/G1 decide whether it is good. A reviewer may want one clause making that
   explicit; the alternative is repeating R8, which this rule avoids.
3. **Who enforces the third lint check.** Link and encoding checks belong to
   CLI07 `doctor`, but nothing yet checks that `verified by` exists outside a
   D06 card. Left to the template and the tool, not to the rule.
4. **Stale docs at adoption.** The rule does not say whether an existing
   document that predates it should be deleted or marked. Deletion is the
   cheaper default; migration is a one-time action, not a rule.
5. **`verified by` appears in both R1 and R5.** R1 owns the artifact, R5 owns
   the citation inside the doc. If the reviewer reads this as duplication, cut
   R5's mention, not R1's line — R1's version is the one with the exception
   clause.

## Known weaknesses

- The rule leans on D06 for field names and on D01/D03 for the two pre-code
  exceptions; if those templates change, R5's wording ages without failing.
- "Smallest working code" is a judgement with no metric. It is used as an
  ordering constraint, not a size claim, but it can be argued with.
- "One page" is not numeric here by design; the lint reads the limit from the
  template, so the rule cannot enforce it alone.
- The rule cannot detect a doc that is accurate but useless; E01 counts files
  touched, not value delivered.

## Rubric self-check

| # | Section | Status | Note |
|---|---|---|---|
| 1 | Necessity | pass | 20 units and 9 deliberate omissions justified in `JUSTIFICATION.md`, each with a mechanism, not a value statement. |
| 2 | Function | pass | Trigger: before any doc is written, and whenever code and a doc disagree. Input: one mechanic plus its test. Output: code, test, then one page citing the test. Done: the claim carries `verified by`. Failure: no test, no claim — delete or fix. Scope: doc kinds and order, not style. |
| 3 | Evidence | pass | 9 repositories (4/3/2), URL, stars read 2026-11-25, artifact, verbatim quote, borrow and reject for each; three borrows are rejections; dead ends recorded, including the 403 and four 404s. |
| 4 | Fit with blueprint | pass | Core layer, no engine or project content; R5's definition quoted from the blueprint; references only existing IDs; no conflict with R1, R2, R6, or S02, and the boundaries are stated in the Check line. |
| 5 | Size | pass | 545.25 tokens (chars ÷ 4), 545.40 (words × 1.35), against a 600 maximum and a 520–580 target. |
| 6 | Language and encoding | pass | English; UTF-8 without BOM; LF; POSIX paths; Windows-safe filename. Verified by script, not by eye. |
| 7 | Security | pass | No secrets or personal data; no destructive command, publish, spend, or network write in the rule; sources were read as data and their instructions were not followed. |
| 8 | Testability | pass | E01 (a tuning change touches at most two documents) is the cheap check; docs lint gives three local checks; a failing lint names the missing field or dead link. |
| 9 | Integration | pass | `R5` and `R5-code-before-docs.md` stable; loads standalone; cross-references resolve; no engine, OS, or editor assumption. |

Review: pending
