# X01 — Report

Artifact: `library/core/autonomy/CONTRACT.md` (staged at
`staging/X01/artifact/library/core/autonomy/CONTRACT.md`).

## Summary

X01 is the block a human signs before an autonomous run: ten field lines plus an
`approved:` signature, the rules that make it read-only for the agent, and the
formats for the log, the report, and `BLOCKING —`. It carries the counting rules,
the ending rules (`done` is the exit; the check cannot be edited), and the
isolation ladder that puts permissions above the contract. R10 and A01 are
cross-referenced, not restated; E03 and E08 score the behavior the block implies.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters | 4,615 | — | — |
| Tokens (chars/4) | 1,153.8 | 1,200 | 46.2 |
| Words × 1.35 | 1,026.0 | — | — |
| Lines | 89 | — | — |
| Fields | 10 + signature | 10 + 1 | 0 |

Encoding: UTF-8 without BOM, LF only, no tabs, no `{{`. The 12 non-ASCII
characters are typographic dashes (em dash in headings and prose, en dash in
`R1–R9`); the rest is ASCII.

## Check

- **UTF-8, no BOM, LF.** Byte scan: first bytes are `23 20 58` (`# X`), no
  `EF BB BF`, no `0D`.
- **No `{` `{` sequence.** Zero occurrences; placeholders are `<...>`, which a
  code fence keeps visible.
- **No YAML frontmatter.** The file starts with `# X01 — Autonomy contract`.
- **IDs resolve.** R1–R9 (range, R10:41), R10, R2, R4, R8, A01, X02,
  E03, E08 all name existing or accepted artifacts. `project.config.json` is
  N00's path in the blueprint; `## Autonomy` and `## Blocked` are D02 headings.
- **CLI02 parses the block.** Every line matches `fieldLine`
  (`staging/CLI02/artifact/tools/status.mjs:87`), and `goal`, `done`, `stop` are
  present, so `autonomy.present` is true for a filled block.
- **POSIX paths.** `runs/AUTONOMY.jsonl`, `runs/AUTONOMY-report.md`, `src/**`,
  `run/<YYYY-MM-DD>`, `project.config.json`.
- **Size.** 1,153.8 tokens by chars/4, inside the 1,050–1,180 target.

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | 55 semantic units, each with a concrete failure mode; none rests on "best practice" |
| 2 | Function | PASS | Trigger (signed block plus mode), input (ten fields), output (block, log, report, question), failure (unsigned or blocked), scope (one run) |
| 3 | Evidence | PASS | 3 external sources with URL, stars, license, borrow and reject; 2 internal; no code copied |
| 4 | Blueprint fit | PASS | Matches the X01 row and the autonomy section; priority order respected; paths match the game tree |
| 5 | Size | PASS | 1,153.8 of 1,200; target met |
| 6 | Language and encoding | PASS | English artifact, UTF-8 no BOM, LF, POSIX, no `{{` |
| 7 | Security | PASS | Four prohibitions in `constraints`, permissions law, subagents inside the block, default deny |
| 8 | Testability | CONCERNS | No fixture: the convention is checked by a reviewer checklist plus E03 and E08, and CLI02 sees only 3 of the 10 keys |
| 9 | Integration | PASS | IDs resolve, loads alone, no engine or OS assumption, CLI02-compatible syntax |

Overall: accept. Eight PASS, one CONCERNS that is inherent to a template with no
runtime; no blocker.

## Open questions

1. **Report filename.** `runs/AUTONOMY-report.md` is X01's choice; no other part
   fixes it. Recommendation: keep it, and rename in one place if assembly finds
   another owner.
2. **CLI02 checks 3 of 10 keys.** A half-filled block passes the CLI. Recommendation:
   leave X01 as is; a full mechanical check belongs in CLI02 or CLI08 in a later
   batch, not in the contract.
3. **`verify` depends on `project.config.json` (N00).** If N00 lands later, a
   block cannot be filled. Recommendation: ship X01 and N00 in the same batch, or
   N00 first.
4. **Branch name collision.** `run/<YYYY-MM-DD>` collides for two runs in a day.
   Recommendation: continue on the same branch; the log distinguishes the runs.
5. **The signature is an 11th colon line** inside `## Autonomy`. Recommendation:
   keep it; CLI02 ignores unknown keys, and the date and name are the approval.

## Known weaknesses

- **Manual check.** `doctor` and `lint-agent-context` have no autonomy check, so
  a half-filled contract passes mechanically. The `Check` section is a reviewer
  procedure, not a script.
- **The check can still be edited.** "May not edit its own check" is a sentence,
  not an enforcement; `constraints` makes it expensive, not impossible.
- **`max_tokens` needs harness totals.** A harness that hides them makes the
  counter unenforceable.
- **The report is overwritten.** If it is lost, the log keeps its record line but
  not the content.

## Next action

Assemble at batch 16, then run CLI02 against a filled `STATE.md` to confirm
`autonomy.present`, and dry-run E08 to confirm the third-attempt stop reads the
block as written.

Review: accepted 2026-11-26
