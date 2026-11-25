# A01 partner — report

## What this is

`artifact/library/core/agents/partner.md`: the OpenCode V2 Markdown agent for part A01 (producer and dialogue owner). Body only duties, handoffs and boundaries; no workflow engine, no rule text, no gate criteria — those keep their single home in the blueprint, R1–R10 and the gate skills.

| File | Status |
|---|---|
| `artifact/library/core/agents/partner.md` | written, 58 lines |
| `JUSTIFICATION.md` | 31 units + 6 omissions + brief coverage |
| `SOURCES.md` | 9 repositories (4 gamedev / 3 software / 2 AI), 6 dead ends |
| `REPORT.md` | this file |

## Size

Measured on the artifact after the last edit (bytes = chars, ASCII):

| Metric | Value | Limit / target |
|---|---|---|
| Characters | 2616 | — |
| Tokens by chars/4 | **654.0** | ≤700, target 600–660 |
| Words | 407 | — |
| Tokens by words×1.35 | 540.0 | reported for comparison |
| Lines | 58 | — |

Both metrics are under 700; chars/4 sits inside the 600–660 target, 46 tokens under the ceiling. The first draft was 2584 chars / 646 tokens (chars/4); the factual fix to the language line removed the surplus.

## Encoding and format

UTF-8 without BOM (first bytes `2D 2D 2D`), LF only (0 CR), ASCII-only content, final newline, 0 tab characters, 0 trailing whitespace, no template placeholder braces, no CRLF. POSIX separators in every path; file name `partner.md` is Windows-safe.

## Checks run

- Frontmatter parses as the V2 shape: `description` (string), `mode: primary`, `permissions` as an ordered list of `{action, resource, effect}`; no deprecated V1 keys (`tools`, `permission`, `maxSteps`, `prompt`).
- Permission order is meaningful: broad `edit: * ask` before the six allows, `src/** deny` last of the edit rules; no `shell` rule, so the global `ask` and the template's publish denies stay the last match.
- Every referenced ID exists: A01–A04, S01, C01–C03, G0–G3, G2.5, R1, R2, R4, R5, R7, R9, R10, D02, D04–D07, D09, D10, `/next`.
- R9 and R10 are `pending` in BUILD-PLAN: referenced by ID once each, never restated.
- No verbatim borrowing: 16 sentences over 45 characters checked against the six written rules and the blueprint — 0 matches. Nothing was copied from the nine source repositories either (`SOURCES.md`).
- No duplicated duty: each of the seven `Duties` lines maps to a different mechanism (state, dialogue, routing, gates, claims, autonomy, publish); `## Boundaries` adds only ownership and absence.

## Factual fix during the pass

The language line listed three Russian document types and implied that was the set. The blueprint marks five as Russian (D04, D05, D07, D09, D10). Changed to "Russian to the user and in the RU documents (D04, D05, D07, D09, D10); English elsewhere." — correct and 37 characters shorter.

## Questions

Closed during review against the official OpenCode documentation:

1. **Permission inheritance — resolved.** Global rules are appended before agent rules; an agent does not replace the global array, and the last matching rule wins. Omitting `shell` is therefore correct: the global `shell * ask` and the publish denies stay in force.
2. **Resource base path — resolved.** Resources are Location-relative; the game repository root is the base, so `STATE.md`, `docs/playtests/**`, `runs/**` and the `src/**` deny match as written.
3. **`edit` vs `write` — resolved.** `edit` covers edit, write and patch; there is no separate `write` action to mirror.

Kept:

4. **G0 and G2.5 lines — intended.** They are auditable checkpoints, not gates; the line stays.
5. **No dedicated eval — open.** E04, E06, E12 exercise the partner indirectly; no eval names A01 as its subject. Acceptable for a role file, but it is the weakest evidence link.

## Self-assessment against the rubric

| § | Section | Score /9 | Honest note |
|---|---|---|---|
| 1 | Necessity | 8 | Every line maps to a mechanism; the two weakest are the `docs/playtests/**` allow (could be a broad ask) and the `D09` in the language list (rarely written by A01). |
| 2 | Function | 7 | Trigger (session start / handoff), inputs (state, brief, request), output (state update, route, gate line, report) and failure (absent user, blocked) are present. The "done" condition is implied by the report slots, not stated as one sentence. |
| 3 | Evidence | 8 | 31 justification units with breaks-if-removed, 9 verifiable sources with stars and quotes, 6 dead ends. Weak point: no eval tie-in. |
| 4 | Fit | 9 | Matches blueprint A01 verbatim in scope; uses existing IDs only; defers every decision to A02/A03/A04/human. |
| 5 | Size | 9 | 654.0 of 700 by the rubric metric; inside target band; no filler lines found on re-read. |
| 6 | Language and encoding | 9 | Bilingual rule explicit and complete; UTF-8 no BOM, LF, ASCII body, POSIX paths. |
| 7 | Security | 9 | No shell widening, no publish path, `src/**` deny, secrets untouched; inheritance and resource base confirmed, so the omitted `shell` rule holds the global deny on publish. |
| 8 | Testability | 5 | Behaviours are observable (one message with ≤3 questions, a gate line, an evidence path), but no eval targets A01. |
| 9 | Integration | 8 | Routes to all four other parts and reads the six documents in order; `/next` consumes STATE. Depends on A02/A03/A04 existing before the crew evals can run. |

Self-verdict: **accept**; the permission semantics are confirmed against the documentation, so the only remaining condition is the later A01 eval that exercises the role end to end.

Review: pending

## Post-review integration

SL05 writes docs/retro/<date>.md; A01 needed an explicit allow so the write does not become an sk on the critical path. Added edit docs/retro/** allow; artifact is now 2,616 chars / 654.0 tokens, 58 lines.
