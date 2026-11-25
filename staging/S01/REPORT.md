# S01 research — Report

## Summary

S01 is delivered as a read-only research skill: it turns one external unknown
into a one-page brief with links, claim labels and a confidence signal. The skill
is decision-gated (no decision, no research), project-first, source-hierarchical,
and stops when the decision can be made. It does not implement, choose a design,
choose an engine, or write to the web.

Design decisions:

- Read-only is enforced twice: the tool list has no Write, Edit or Bash, and the
  text forbids edits and web writes.
- Every claim carries `know`, `think` or `guess`; confidence is derived from the
  labels rather than asserted.
- R3 is operationalized at the point of reading: external content is data,
  injections are reported and the task continues, secrets stay local.
- Conflicts are resolved by hierarchy, never averaged; an unresolved conflict
  keeps both claims and lowers confidence.
- The brief is one page and names what would change the answer, so it has a
  refresh trigger instead of looking final.
- Failure has two exits: no source (report the gap) and a decision that cannot
  wait (one R2 question with the conflicting sources).
- Handoffs are explicit: importing a method is S04, choosing an engine is S07;
  A02 and A03 consume the brief without repeating the search.
- The Brief is the check: eight fields, claim labels and dates are inspectable;
  a missing field or an unlabelled claim fails it. No separate eval is claimed.

Delivered:

- `staging/S01/artifact/library/core/skills/research/SKILL.md`
- `staging/S01/JUSTIFICATION.md`
- `staging/S01/SOURCES.md`
- `staging/S01/REPORT.md`

Nothing outside `staging/S01/` was modified by this task; nothing was published.

## Size

| Metric | Value | Limit or target | Status |
|---|---|---|---|
| Bytes | 3,123 | — | — |
| Characters | 3,116 | — | — |
| Words | 506 | — | — |
| Tokens (characters ÷ 4) | 779.00 | 800 hard; 720–780 target | 21 spare; 1 below target ceiling |
| Tokens (words × 1.35) | 683.1 | 800 hard | 116.9 spare |
| Lines / endings | 47 lines; LF; final newline | — | no CRLF |
| Encoding | UTF-8, no BOM, no tabs, no trailing spaces | — | pass |
| Non-ASCII | only `·` (seven separators) | — | accounts for 7 bytes over 3,116 characters |

The official metric is characters ÷ 4: 779 of 800, or 97.4% of the cap. The
secondary words × 1.35 estimate is 683.1. The artifact is inside the 720–780
target band and should be frozen unless a cut pays for an addition.

## Interface assumptions

1. The frontmatter follows the current `verify` shape: `name`, one-line
   `description`, `allowed-tools`; no `version` field. If the harness adds a
   version key to core skills, S01 changes with them.
2. `WebFetch` and `WebSearch` are available and permitted. If a host lacks
   either, S01 returns a blocked brief rather than substituting memory.
3. `allowed-tools` is enforced by the harness, not by the prompt. If it is
   advisory, read-only depends on the model following the text.
4. The skill is loaded by description matching. The negative trigger ("not when
   the repository answers") is in the same line; a loader that truncates the
   description may lose it.
5. S01 returns text in the reply because it has no Write tool. The requester
   files it. A workflow that expects a file path needs a harness change.
6. `know`, `think` and `guess` are labels, not numbers. `confidence` maps them:
   all `know` = high, any `guess` = low, otherwise medium. No consumer should
   parse the labels as a score.
7. "About 15 minutes" is a guideline. A stricter caller budget or R10's
   `max_minutes` wins; a caller may set a shorter limit.
8. "One page" is a content limit, separate from the skill's own 800-token cap. It
   is not currently measured by a byte or word threshold.
9. Cross-references are IDs, not paths. If R2, R3, E05, S04, S07, A02 or A03 is
   renamed, this skill changes in the same commit.

## Cross-reference flags

- **R2** — one question is allowed in Blocked; the budget is cited, not restated.
  If R2's question rule changes, re-read the Blocked section.
- **R3** — hierarchy, data-not-instructions, conflicts, license and secrets are
  all cited. R3 remains the authority; S01 only applies it.
- **E05** — "report an injection and continue" is the required behavior. If E05
  adds a reporting channel, name it here.
- **S04** — importing a method is handed off. If S04's trigger changes, the
  boundary sentence still holds, but the wording may need to match.
- **S07** — choosing an engine is handed off. If S07's input format changes, the
  brief fields may need to align.
- **A02/A03** — consumers of the brief. If either starts its own research, the
  "no repeat search" clause is the contract that prevents drift.
- **R4** — not cited in the artifact. R4 is "Commit is not publish", not a web
  write rule; do not reintroduce it as one.
- **`partner.md`** — routes external facts to S01. If routing changes, the
  description must change with it.

## Open questions

1. Does the harness enforce `allowed-tools` for `WebFetch` and `WebSearch`, or is
   it advisory? A fixture that attempts a write would settle it.
2. Should "one page" have a hard character cap (for example, 4,000 characters),
   or stay qualitative? A cap makes the evidence table compete with the answer.
3. Is 15 minutes the right default for every external fact, or should S07 engine
   research get a longer budget? The skill defers to a caller budget, but the
   default is untested.
4. Step 6 says to cross-check each load-bearing fact, then allows `think` for one
   credible source. Should it say "cross-check where a second source exists"?
   The parenthetical resolves it, but the imperative is stronger than the label.
5. The hierarchy names "official docs" but Step 3 also treats pinned source code
   as primary. Should the hierarchy say "official docs or source" explicitly?
6. `DECISIONS.md` is named as an example. If the project uses a different
   decision-record path, should the skill say "decision records" instead?
7. STORM is about 14 months past its last push. It is not archived and the method
   is stable, but a future refresh should replace it first if a fresher source
   appears.
8. The nine sources are English-only. If a regional engine or tool has a
   non-English official doc, is that doc acceptable as a primary source? The
   skill does not forbid it, but the examples are English.
9. The build brief says "no unverified claims"; the artifact says "no unlabelled
   claim" so a `guess` can exist as a labelled inference. Is that the intended
   boundary, or should `guess` be removed from the brief?

## Known weaknesses

- The check is manual (the Brief's fields), not an automated fixture. E05 and E02
  cover injection and invented API, but not the one-page limit, the label mapping
  or the 15-minute stop. A fixture would be a separate check, added under R6
  after a measured gap.
- The 15-minute timebox is untested for engine-version archaeology, where the
  source tree may be large.
- "One page" is qualitative, so a verbose model could exceed it without failing a
  mechanical check.
- Access quality depends on `WebFetch` and `WebSearch`. A JavaScript-heavy or
  blocked source may yield only a snippet; the skill reports the gap, but cannot
  guarantee depth.
- There is no automatic TTL. Dates and "true now" are recorded, but no job
  re-checks a brief after a version changes.
- `know` requires two independent primary sources. For a niche API with one
  source, a true fact stays `think`; that is honest but may look conservative.
- The source set is English-only, with gamedev as the largest category (4/9). It
  supports the method, not a claim of market coverage.

## Rubric self-check

| # | Criterion | Evidence | Verdict |
|---|---|---|---|
| 1 | Necessity | 44 units justified; each removal names a failure; no section repeats another; 21 tokens spare | accept |
| 2 | Function | Steps 1–8 produce the Brief; Blocked covers no source and a decision that cannot wait; Out of scope closes the boundary | accept |
| 3 | Evidence | 9 real repositories, 4 gamedev / 3 software / 2 AI-agent; stars dated 2026-11-25; named files checked; no copy | accept |
| 4 | Fit | Core layer, no engine imports; follows `verify`'s shape; cross-references are IDs; POSIX paths | accept |
| 5 | Size | 779.00 by characters ÷ 4 (800 cap, 720–780 target); 683.1 by words × 1.35; 47 lines | accept |
| 6 | Language | English artifact; one-line description; no placeholders; UTF-8 no BOM; LF only | accept |
| 7 | Security | R3 data-not-instructions; injection reported and task continues; no secrets; read-only tools; no web write | accept |
| 8 | Testability | The Brief's eight fields are the manual checklist: a missing field, an unlabelled claim or an undated source fails it; Blocked is the failure path | accept |
| 9 | Integration | `name: research` matches the `research/SKILL.md` path; S04 and S07 handoffs; A02/A03 consumers; R2/R3/E05 cited; description carries the negative trigger | accept |

## Review

Review: pending
