# A04 — Report

## Summary

`critic` is the blind, read-only reviewer of a closed set: a part, a playtest, a
build, or a gate candidate. It reads the artifact and its evidence first, writes
findings before opening the author's `JUSTIFICATION.md`, then compares. It has
no write, shell, subagent, web, or question access; it reports findings in severity order
with `file:line` and ends with `accept`, `revise`, or `reject`. The role is one
pass after divergence (R7), not a standing council and not a second designer.

Delivered artifact:
`staging/A04/artifact/library/core/agents/critic.md`, mirroring the final path
`library/core/agents/critic.md`.

## Size

| Metric | Value | Limit | Headroom |
|---|---|---|---|
| Characters (with frontmatter) | 2,438 | — | — |
| Words | 385 | — | — |
| Lines | 71 | — | — |
| chars/4 | **609.50** | 700 | 90.50 |
| words×1.35 | **519.75** | 700 | 180.25 |

Both metrics pass. The chars/4 value is the reported one because it is the
stricter of the two for this file.

## Encoding

- UTF-8, no BOM: the file starts with `-`-`-`-`, not `EF BB BF` (2,442 bytes for
  2,438 characters, the difference being multi-byte punctuation).
- LF only: no `CR` byte is present.
- No doubled-brace placeholder syntax.
- POSIX line endings, Windows-safe path.

## Checks

| Check | Result |
|---|---|
| Frontmatter keys | `description`, `mode`, `permissions` only; `mode: subagent`. |
| Permission order | Deny only: `edit`, `shell`, `subagent`, `webfetch`, `websearch`, `question`, each with `resource: "*"`. No `read`/`glob`/`grep` allow rules; the global permissions already grant them, and an agent-level allow after a global `.env` deny would win by the last-match rule. The global `.env` deny therefore remains in force; `question` is denied because the critic reports, it does not interview. |
| Sources | Exactly 9: 4 gamedev (OpenTTD, bevy-website, OpenMW, cocos2d-x), 3 software (node, Linux, TypeScript), 2 AI-agent (superpowers, openai/evals). Each has URL, 2026-11-25 stars, artifact, verbatim quote, borrow, reject. |
| Link resolution | R1, R3, R4, R5, R7 resolve to `library/core/rules/` files; E03 resolves to `library/core/evals/E03-verify-before-done.md`. R8/R9 are blueprint IDs whose rule files are being assembled; E06/E09 are later eval batches. They are cited by ID, so the check records "blueprint ID, part pending", not a failure. |
| Staging mirror | Artifact path matches the target layer and filename; `description` is stable for selection. |
| Placeholder scan | No doubled-brace placeholders, no `TODO`, no unresolved template markers. |

## Open questions

1. R8/R9 rule files and E06/E09 evals do not exist yet; the agent's citations are
   valid blueprint IDs, but a later sweep should confirm the wording matches once
   those parts land.
2. `webfetch` and `websearch` are denied rather than `ask`. The spec allowed
   either; deny was chosen because the critic checks the repo, not the web. If a
   review ever needs an upstream citation, the parent can supply it as evidence.
3. `bevy-website` has 251 stars, not the ~50k of `bevyengine/bevy`; the caveat is
   recorded in `SOURCES.md`. It is the official review artifact, so it is kept.
4. The one allowed review round has not been used; `REPORT.md` still ends
   `Review: accepted 2026-11-26`.

## Rubric (1–9)

| # | Dimension | Score | Note |
|---|---|---|---|
| 1 | Necessity of every unit | 8 | Each unit is sourced in `JUSTIFICATION.md`; the read-only paragraph restates the permission set, but as behavior rather than duplicate policy. |
| 2 | Function (trigger, input, output, done, failure, scope) | 8 | Closed-set trigger, artifact input, severity output, three-word verdict. Failure path is `not verified`; scope is one pass. |
| 3 | Evidence | 7 | Nine real, current repositories, 4/3/2; the bevy star count is a caveat, and two software sources overlap on "review the artifact as it is". |
| 4 | Blueprint fit | 8 | Matches A04's definition and layer; no council, no PASS/CONCERNS/FAIL form, no new design. R8/R9/E06/E09 are pending parts. |
| 5 | Size | 9 | 609.50/700 chars/4, 90.50 headroom, no filler section. |
| 6 | Language and encoding | 9 | Agent artifact in English; UTF-8 no BOM; LF; POSIX; Windows-safe. |
| 7 | Security | 9 | Deny-only permissions keep the global `.env` deny effective (an agent-level `read * allow` would have overridden it); `question` is denied, so the review cannot become an interview; findings must cite a secret's location, never quote it. |
| 8 | Testability | 7 | Structural checks are cheap (keys, order, sources, placeholders); behavioral coverage would need a fixture review, and E03 covers only part of it. |
| 9 | Integration | 8 | Stable name and description, loadable alone, references resolve or are explicitly pending. |

Overall: **8/9**. The two deductions that matter are evidence overlap (3) and
the absence of an automated behavioral fixture (8); neither blocks use.

Review: accepted 2026-11-26
