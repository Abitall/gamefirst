# G0 report

## Summary

`artifact/library/game/gates/G0-concept-brief.md` turns S06's closed set into one
page and one dated decision: build a prototype or revise the brief. It names the
input S06 must hand over, the eight fields the page adds to S06's draft, four
checks (loop testable, scope small, no clone, next step is a prototype), the two
allowed decision lines, and the route to S08. Fun is explicitly left to G1. No
gate language, no PASS/CONCERNS/FAIL, no GDD, architecture or backlog.

## Size

| Measure | Value | Limit |
|---|---|---|
| bytes | 1,870 | - |
| characters | 1,864 | - |
| chars/4 (token estimate) | 466.0 | 500 max, 420-470 target |
| words x 1.35 (second estimate) | 463.1 | 500 max |
| lines | 43 | one page |
| non-ASCII characters | 1 (`·`, twice) | - |

Both estimates agree and sit inside the target band, 34 tokens below the cap.

## Checks

| Check | Method | Result |
|---|---|---|
| Encoding | byte scan for BOM, CRLF, tabs | UTF-8 without BOM, LF only, no tabs |
| Frontmatter | first line inspected | plain Markdown, no YAML |
| Size | character and word counts | 466.0 / 463.1, inside 420-470 |
| Identifiers resolve | grep of `docs/V0.3-BLUEPRINT.md` | G0, S06, S07, S08, G1, R2, R7, R9, E01, A01, D01, D03 all present |
| No rule text restated | manual compare with R2, R7, R9 | rules referenced by ID only |
| No gate paperwork | text scan | no verdict labels used; the only mention is the Limits line that forbids them |
| Scope of writes | directory listing | only `staging/G0/` touched |
| Secrets | pattern scan | none |

## Open questions

1. Does `DECISIONS.md` already exist, and is A01 its only writer? The page assumes
   A01 appends the line; confirm the name in the A01 artifact.
2. D01's `BRIEF.md` has a `success` field and G0 asks for a next prototype
   question. Same field under two names, or two fields? Recommendation: keep both
   only if D01 says so; otherwise the question absorbs success.
3. How is "one page" enforced? The artifact sets no word count. Recommendation: an
   editorial cap near 500 words, checked by the reviewer, not a meter in the file.
4. Is the visual/audio line mandatory when the first build is a greybox? Current
   answer: yes, as stated intent, not as an asset promise.
5. Should the first G0 run create the `STATE.md` entry itself or leave routing to
   A01? The page says A01 updates it; confirm at integration.

## Rubric

Verdicts follow `docs/REVIEW-RUBRIC.md` (accept, revise, reject).

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | accept | Each of the 20 units has a named failure mode; U3 and U20 were checked for overlap and differ (what arrives vs what is forbidden here). |
| 2 | Function | accept | Trigger, input, output, done, failure and scope are stated; failure writes no decision line, so a gap cannot read as a go. |
| 3 | Evidence | accept | Nine repositories, 4/3/2, stars on 2026-11-25, licenses including two NOASSERTION cases explained, verbatim quotes, borrow and reject per source, five reuses disclosed, six dead ends. |
| 4 | Blueprint fit | accept | Not a gate, one page, go or revise, fun deferred to G1; verdict labels appear only in the Limits sentence that forbids them; no GDD or backlog. |
| 5 | Size | accept | 466.0 chars/4 and 463.1 words x 1.35, both inside 420-470. |
| 6 | Language, encoding | accept | English; UTF-8 without BOM; LF; POSIX paths; one repeated non-ASCII separator. |
| 7 | Security | accept | No secrets, no credentials, no runtime network; sources read through the API, never cloned. |
| 8 | Testability | accept | Each check is yes/no or a number; the decision line is greppable as a `G0 <date>` line carrying `go:` or `revise:`. |
| 9 | Integration | accept | S06 is consumed, S08 and S07 are routed, E01 bounds revision, A01 owns the record; the page loads alone without S06 present. |

Overall self-verdict: accept, pending external review.

Review: pending
