# R7 — Report

## Summary

R7 makes divergence a precondition for judgment on any creative choice. It sets a floor of twenty written variants, three of them deliberately bad, forbids critique until the set closes, orders references from distant domains before games, and adds a ten-variant `spark` pass. Two budgets carry the principle past the brainstorm: a 10–15% tinker block that produces an artifact and one "what surprised me" line, and an interaction budget at G2 that counts links rather than systems. At G1 a concept may be "alive but illegible" and take one dated extension. The rule states the principle and the budgets; S06 runs the procedure, A04 checks that judgment began after closure, and G1 and G2 apply the budgets.

## Size

Measured on `library/core/rules/R7-diverge-before-converge.md` with PowerShell `[IO.File]::ReadAllText` and a whitespace split.

| Metric | Value | Target / limit | Verdict |
|---|---|---|---|
| Words | 405 | — | — |
| Characters | 2,288 | — | — |
| chars ÷ 4 | **572.00** | 520–580, hard max 600 | pass |
| words × 1.35 | 546.75 | hard max 600 | pass |
| Lines | 37 | — | — |

## Encoding

UTF-8 without BOM; LF only (no CR bytes); only non-ASCII characters are the em dash and the en dash; no control characters other than LF; no YAML frontmatter and no `---` rule; starts with the H1.

## Checks run

| Check | Method | Result |
|---|---|---|
| Size | `[IO.File]::ReadAllText`, `Length`, whitespace split | 2,288 chars, 405 words, 572.00 chars/4 |
| BOM | first three bytes compared with EF BB BF | absent |
| Line endings | regex search for CR | none |
| Plain text | first character, `---` lines, frontmatter markers | H1 first, no `---`, no frontmatter |
| Cross-references | regex count per ID | R2 ×1, S06 ×2, S08 ×1, A04 ×2, G1 ×2, G2 ×2 |
| Engine/OS/editor specifics | regex for engine, OS, editor and YAML terms | 0 matches |
| Non-ASCII | per-character scan | em dash, en dash only |
| Duplication | manual comparison with the blueprint's S06 summary and R2's sections | no procedure steps repeated; the number 20 appears as a principle threshold, not as S06's procedure |

## Open questions

1. Is twenty the right floor for a solo developer, or would twelve plus a mandatory impossible variant produce the same range with less fatigue? Twenty matches S06, so the rule keeps it; a playtest of the rule itself would settle it.
2. "Unclean in 48 hours" is the only wall-clock clause. Does it mean 48 wall-clock hours or two working days? Gate cadence will decide.
3. Resolved in review: the surprise line lives in the S06 brief, and the rule now says so. Still open: whether the brief also carries all twenty variants, or the set lives in a separate log that A04 reads.
4. Is the one-line definition of a link enough at G2, or does the gate need a worked counting example?
5. Resolved in review: the trigger now reads "player-facing name", so code identifiers are out of scope.

## Known weaknesses

- The tinker budget is the least enforceable clause. A developer can produce the artifact and still not protect the time; the calendar line is a nudge, not a check.
- Twenty is a defended floor, not a measured optimum.
- The 48-hour clause is the only time-based rule in the file and will age if the gate cadence changes.
- The interaction budget needs a counting habit at G2; without one, "ten links" becomes an estimate.

## Rubric self-check

| # | Criterion | Evidence | Verdict |
|---|---|---|---|
| 1 | Necessity | Every section maps to a unit in `JUSTIFICATION.md`; no line restates the blueprint or repeats S06's procedure. | pass |
| 2 | Function | Trigger (any creative choice), output (set, spark pass, surprise line), done (set closed, surprise recorded), failure (empty line is a result), scope (creative choices only, tuning excluded). | pass |
| 3 | Evidence | Nine repositories in the required 4/3/2 split, each with URL, stars on 2026-11-25, artifact, quote, borrowed and rejected material; dead ends recorded. | pass |
| 4 | Blueprint fit | Cross-references R2, S06, S08, A04, G1 and G2; adds no gate vocabulary, no new eval, no engine content. | pass |
| 5 | Size | 572 chars/4, inside 520–580 and under the 600 hard limit. | pass |
| 6 | Language and encoding | English, UTF-8 no BOM, LF, ASCII punctuation plus two dashes, POSIX paths in docs. | pass |
| 7 | Security | No executable content, no inputs, no network, no secrets; the only external references are documentation URLs in `SOURCES.md`. | pass |
| 8 | Testability | Check section names the producer, the reviewer and the evidence; A04 can apply a manual checklist without interpreting intent. | pass |
| 9 | Integration | S06 produces the set, A04 checks closure, G1 applies the extension, G2 applies the interaction budget; no overlap with R2's question budget. | pass |

Review: pending
