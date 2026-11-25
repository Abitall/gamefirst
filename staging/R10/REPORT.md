# REPORT — R10 Autonomy is contract

## Summary

R10 turns autonomy from a mode the agent can adopt into a contract the user
approves. The rule is 50 lines: a two-sentence thesis, the ten contract fields
(one line each), checkpoints, the blocked path, the precedence limits, and the
audit check. It resolves the R2 deadlock explicitly: a stop condition *ends* the
run, writes the single `BLOCKING —` question to `STATE.md`, and the agent does
not answer it itself. It also draws the boundary with X01: X01 owns the template,
R10 owns what each field means, so the contract is not restated twice.

The artifact is `artifact/library/core/rules/R10-autonomy-is-contract.md`, plain
text, no frontmatter, opening line `# R10 — Autonomy is contract`.

## Size

Measured on the file as written (UTF-8 bytes read through `[IO.File]::ReadAllText`,
whitespace tokenized on `\s+`):

| Metric | Value | Limit | Target | Result |
|---|---|---|---|---|
| Characters | 2,255 | — | — | — |
| Tokens, chars/4 | **563.75** | 600 | 520–580 | pass, 16.25 under the target ceiling |
| Words | 391 | — | — | — |
| Tokens, words×1.35 | **527.85** | 600 | 520–580 | pass |
| Lines | 50 | — | — | — |

The two metrics diverge by 36 because the field table is dense in short cells:
many words, few characters per word. Both are inside the band, so the rule does
not depend on which metric a reviewer applies.

## Encoding

- UTF-8, no BOM: first bytes are `23 20 52 31 30` (`# R10`), not `EF BB BF`.
- LF only: 50 `\n`, zero `\r\n`; the file ends with a newline.
- 9 non-ASCII characters, all em/en dashes (`—`, `–`), each a valid 3-byte UTF-8
  sequence. Consoles that render them as `-` are a display issue only; the bytes
  and the read-back are correct.
- ASCII punctuation otherwise; no smart quotes, no non-breaking spaces, no tabs.

## Checks

- Heading and shape: starts with `# R10 — Autonomy is contract`; no YAML
  frontmatter; sections `Contract`, `Checkpoints`, `Blocked`, `Limits`, `Check`.
- Fields: the table has exactly ten data rows, one per required field, each one
  line.
- Cross-references: R1, R2, R4, R8, E08, X01, G1–G3 all appear and all exist in
  the blueprint; no other ID is referenced.
- Paths: `STATE.md` and `runs/AUTONOMY.jsonl` are the two names in the rule, both
  present in the blueprint's game tree. No invented path.
- Precedence: "never overrides R1–R9" present; publish assigned to R4; the human
  at G1 assigned to R8; gates end the run.
- No duplication: the "budget spent is a stop" line and the "user discovers the
  result" clause were cut for this reason; the stop row already covers the first,
  and the justification document carries the second. Review also cut the
  `; no publish` tail of the report row, which repeated R4 and `Limits`.
- No double-brace template token appears in any of the four files.
- Sources: nine repositories, 4/3/2 split, stars and licenses read from the GitHub
  API on 2026-11-25, quotes copied from the named files, dead ends recorded.

## Open questions

1. **Contract location.** R10 puts the contract in `STATE.md`, the only state file
   in the blueprint's tree. If X01 later defines a separate `CONTRACT.md`, this
   line and the checkpoint line must move together, or the run has two state
   files. Nothing in the blueprint forbids the move; nothing requires it either.
2. **`runs/questions.jsonl`.** The blueprint's tree lists it, but the accepted
   boundary for R10 routes the `BLOCKING —` question to `STATE.md`. The two are
   compatible (STATE holds the open question, the jsonl can hold the history),
   but the rule does not say who writes the jsonl line. Left to X01 rather than
   guessed here.
3. **The 30–60 minute range.** It is a range because run length varies; an eval
   that checks checkpointing will have to pick a number or accept any value in
   the band. Not pinned in the rule on purpose.
4. **`report` and publish — resolved.** The row ended with `; no publish`, which
   repeated both R4 and `## Limits`; review removed it. The row now names only
   its four parts, and the ban lives in `constraints` and `Limits` alone.

## Rubric self-check

| Section | Score | Note |
|---|---|---|
| 1 Necessity | 9 | Every unit has a stated failure if removed; the one overlap (report/publish) was removed in review rather than argued away. |
| 2 Function | 8 | Trigger (autonomous mode, no contract), output (contract, log, report), failure (BLOCKING, stop), scope (one run) are all explicit. |
| 3 Evidence | 9 | Nine repositories, exact stars and licenses, verbatim quotes, borrow/reject per entry, dead ends honest. |
| 4 Fit | 9 | Layer is `library/core/rules`; no engine imports; only blueprint IDs; precedence line matches `mode > rules > skill > pack > docs`. |
| 5 Size | 8 | 563.75 chars/4, inside 520–580 with 16 tokens of headroom; a stricter reviewer could still ask for 550. |
| 6 Language/encoding | 8 | Valid UTF-8, LF, no BOM, POSIX text; em dashes are the only non-ASCII and they are intentional. |
| 7 Security | 8 | Permissions outrank the contract, secrets forbidden, destructive commands forbidden, publish stays with R4. |
| 8 Testability | 8 | E08 covers the third-attempt stop; the contract, log and report are files a checker can open. |
| 9 Integration | 9 | All references resolve, the rule loads alone, and it names no engine, OS or editor. |

Overall: **8/9**. The weak spots are the two words of overlap with R4 and a size
that sits near the top of the band, not a missing mechanism.

Review: pending
