# R9 — Report

## Summary

`R9-scope-is-budget.md` states that every feature is paid for in time, code, content, tests, and upkeep; that a stage opens with a written budget (features, content in numbers, cut list, kept in `STATE.md`); that a new idea goes to `BACKLOG.md` as one line of value and cost and waits there; and that exceeding the budget means cut or park, never expand. It names the two gate points (G2 sets the numeric content budget, G2.5 freezes features), the one-in-one-out trade after freeze, and the line that keeps the freeze from leaking (a fix restores intended behavior; a change to a system is a feature). It delegates the cut list, its order, the reuse matrix, the slice and content work to S10 and S11 rather than restating them, routes scope questions through R2, and ends with E06 and A04 as the observable check.

## Size

| Metric | Value | Limit | Verdict |
|---|---|---|---|
| Characters | 2,255 | — | — |
| **chars / 4** | **563.75** | ≤ 600, target 520–580 | within target |
| Words | 420 | — | — |
| **words × 1.35** | **567.00** | ≤ 600 | pass |
| Bytes | 2,263 | — | 8 bytes over characters = four U+2014 |

Both metrics land in the 520–580 band, so the rule is neither padded to reach the floor nor trimmed below the ceiling. The gap between the two metrics is 3.25 tokens, which means the text is not unusually long-worded (a large gap would flag compound vocabulary that tokenizers split).

## Encoding

- UTF-8 without BOM — verified: first bytes are `23 20 52` (`# R`), no `EF BB BF`.
- LF only — verified: zero `CR` bytes in all four files.
- No template placeholders; no YAML frontmatter; first line is `# R9 — Scope is budget`.
- Non-ASCII inventory: U+2014 (em dash) ×4 in the rule. No smart quotes, no non-breaking spaces, no arrows.
- Windows-safe names: no reserved characters, no trailing spaces, all paths relative and POSIX-style inside the staging tree.
- Nothing executable: the rule contains no code fences, no shell commands, no URLs that could be mistaken for instructions.

## Checks

| Check | Result |
|---|---|
| Starts with the exact required heading | pass |
| Plain text, no frontmatter | pass |
| Length ≤ 600 by chars/4 | pass (563.75) |
| Length ≤ 600 by words × 1.35 | pass (567.00) |
| Every referenced ID exists in the blueprint | pass — R2, R6, R7, G2, G2.5, S10, S11, E06, A04 |
| Documents referenced exist | pass — `STATE.md` (D02), `BACKLOG.md` (D05) |
| No restatement of S10/S11 content | pass — one sentence each, ownership only, cut order included |
| No sprint plan or feature list | pass — the rule states principle and gate points |
| Post-freeze fix clause | pass — exactly one sentence in `## Gates`; restoring behavior is not a feature, changing a system is |
| R7 boundary explicit | pass — tinker budget excluded by name, R7 named as owner |
| R2 applied to scope dialogue | pass — three questions, recommendation per question |
| One fact in one place | pass — one-in-one-out stated for features, R6 cited for the library |
| No engine, OS, or tool specifics | pass |
| No copied sentence from any source | pass — mechanisms borrowed, wording original |
| Reads as a sibling of R1/R2/R6/R7 | pass — H1, one-sentence claim, `## Why`, short sections, `## Check` |

## Open questions

Numbers kept from the round-1 list so the review trail stays readable.

1. **Where the budget lives.** The rule says `STATE.md`. D02 defines that file as phase / active parts / next action / blockers / gate state — the budget fits "gate state" only if D02 says so. The alternative is a budget block inside the gate record, with `STATE.md` linking to it. Decide before D02 is written, or adjust R9's one clause.
4. **"Comparable cost".** The phrase blocks trading a mode for a label but has no unit. A one-line cost estimate in the same decision would make it checkable; adding that may push the rule over budget, so it is left as a judgement.
5. **Language of the backlog line.** English rules, Russian documents (D05). "One line" does not say which language; assumed the document's language, which is Russian.
6. **Backlog review cadence.** "Then it waits" has no review point. The gate is the natural one, but the rule does not say it, and a backlog read only at gates can hide a cheap win.

## Resolved in round 1

2. **Who orders the cut list** — closed by adding "its order" to the S11 sentence: S11 owns the cut list and the order in which things leave it; R9 requires only that both exist.
3. **Bug fixes after G2.5** — closed by the one-sentence test in `## Gates`: a fix that restores intended behavior is not a feature, and a fix that changes a system is.

## Rubric (1–9)

| # | Criterion | Score | Note |
|---|---|---|---|
| 1 | Necessity — does the framework fail without it | 8 | Without R9, G2.5 freezes nothing that was not already a numbered list; scope grows by unrecorded increments |
| 2 | Clarity and voice | 8 | One claim per section; the "minute vs stage" line carries the whole argument |
| 3 | Evidence | 4 | Nine real artifacts, all four quote-bearing gamedev sources primary policy files; dead ends recorded |
| 4 | Size discipline | 9 | 538.50 / 541.35, inside the target band with no filler |
| 5 | Encoding and portability | 9 | No BOM, LF, four em dashes and nothing else non-ASCII |
| 6 | Safety | 9 | Read-only rule; no commands, no paths outside the project, no executable content |
| 7 | Testability | 7 | E06 and A04 are observable, but "the scope did not change" is a diff a solo developer can fail to run |
| 8 | Integration | 8 | All IDs resolve; tension with D02 over `STATE.md` is the one seam |
| 9 | Independence | 8 | Does not restate S10/S11/R6/R7; the reuse matrix and cut order stay with their owners |

Weighted impression: **8 / 9** — a rule that holds its boundary and its size, with one document-ownership question to settle against D02 and one loophole (post-freeze fixes) left open on purpose.

Review: accepted 2026-11-26
