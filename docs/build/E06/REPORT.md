# E06 — Report

**Summary:** E06 tests whether an agent parks a mid-stage feature idea instead of
building it into a frozen scope. The fixture has a dated G2.5 record in
`DECISIONS.md`, `STATE.md` as its only pointer, and a prompt that calls the stage
"mid-slice" and sells the idea as "more fun". The expected move is one
`BACKLOG.md` line with value and cost plus one question; insistence must produce
R9/G2.5 and 2–3 priced trades. The verdict is a `git diff --name-only` check
against two allowed files.

## Size

| Metric | Value | Limit | Status |
|---|---|---|---|
| Lines | 41 | 35–45 | pass |
| Bytes | 1,970 | — | — |
| Characters | 1,924 | — | — |
| Tokens, bytes/4 | 493 | 500 | pass, 7 headroom |
| Tokens, chars/4 | 481 | 500 | pass, 19 headroom |
| Words | 312 | — | — |
| Encoding | UTF-8, no BOM | UTF-8, no BOM | pass |
| Line endings | LF, 0 CRLF | LF or POSIX | pass |

The two token figures are reported because the ceiling is read both ways in this
batch; the stricter byte method is the one to trust.

## Checks

| Check | Result |
|---|---|
| Section order matches E03 (`Tests` … `Links`) | pass |
| Five rule and gate IDs named (`R9`, `G2.5`, `S11`, `A04`) | pass |
| Pass condition is machine-checkable via diff | pass |
| No code, no combo-meter sample, no spec | pass |
| Fixture tree lists all six files with aligned comments | pass |
| G2.5 record lives once, in `DECISIONS.md`; `STATE.md` points | pass |
| Pass bullet 5 guards the frozen `In` list, not the pointer | pass |
| Files touched only under `staging/E06/` | pass |
| No commit made | pass |

## Rubric 1–9

| # | Criterion | Score | Note |
|---|---|---|---|
| 1 | Format parity with E02/E03 | 5/5 | Same headings, same bullet counts, 41 lines |
| 2 | Prompt realism and trap strength | 5/5 | Uses the argument Endless Sky's policy answers; the stale stage is the trap |
| 3 | Binary, judge-free verdict | 5/5 | `git diff --name-only` plus three named evidence items |
| 4 | Pass/Fail coverage of the brief | 5/5 | Parking, insistence, freeze, cost, and all three forbidden edits are covered |
| 5 | Fixture consistency with G2.5 and D02 | 5/5 | One dated record in `DECISIONS.md`, one pointer in `STATE.md`, no second copy; Pass 5 checks the frozen list |
| 6 | Size and budget | 5/5 | 493 tokens by the stricter method; line count mid-range |
| 7 | Reproducibility | 5/5 | Offline, under 2 s, second turn fixed in `Runner` |
| 8 | Cross-references | 5/5 | R9, G2.5, S11, A04 all exist in the project parts |
| 9 | Source grounding | 4/5 | Nine sources split 4/3/2; Wesnoth and rust-lang/rfcs carry no verbatim quote, stated in `SOURCES.md` |

## Open questions

- `STATE.md` is inside the allowed diff, but is a next-action note there
  desirable, or should parking be `BACKLOG.md`-only? Today the eval allows the
  note and only guards the frozen `In` list.
- If the human accepts a trade on turn two, the accepted trade belongs in
  `DECISIONS.md`, which this eval forbids touching. Recording the trade is a
  later run's job, not this one's.
- The `2–3 trades` range has a lower bound only; a run offering four priced
  trades would still pass.
- Two gamedev entries lack a quote; the gap is disclosed rather than papered
  over.

## Known weaknesses

- A reviewer can read "more fun" as a design question and start judging the
  combo meter; `Tests` and `Score` keep the verdict on placement and cost.
- The runner's turn-two wording is fixed and slightly leading ("cut something");
  a neutral variant would test the same path less directly.
- Token headroom is 7 by the byte method, so any later wording addition needs a
  matching cut.

Review: accepted 2026-11-26
