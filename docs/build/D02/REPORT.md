# D02 — STATE: report

## Summary

`STATE.md` is a one-page English template for the only file that says where the
game is now. It is rewritten in place, one fact per line, never appended.
History goes to `DECISIONS.md` (D03), ideas to `BACKLOG.md` (D05).

Ten sections: `Phase`, `Mode`, `Active`, `Next`, `Blocked`, `Gate`, `Budget`,
`Questions`, `Autonomy`, `Since`. `/status` (SL02) and `/next` (SL03) read the
headings; an empty field reads as `not recorded`. The template has 11 `[...]`
slots and no `{{`.

## Size

| Measure | Value | Limit | Headroom |
|---|---:|---:|---:|
| Characters | 1,684 | - | - |
| Tokens (chars / 4) | 421.0 | 600 | 179.0 (29.8%) |
| Lines | 34 | one page | fits |
| Bytes | 1,686 | - | - |
| Fill slots | 11 | - | - |

UTF-8, no BOM, zero CR, LF, trailing newline. All prose is English; the only
non-ASCII is the em dash.

## Check

`d02-check.mjs`:

```json
{"ok":true,"chars":1684,"bytes":1686,"tokens":421.0,"lines":34,"slots":11,"bom":false,"crlf":0,"parseState":{"ok":true}}
```

Assertions: CLI02 parses the empty template; a filled example yields
`ok:true`, `active ["S03 core loop","S04 save"]`, one gate, one question;
`autonomous` without a contract returns the exact R10 error; with all ten
fields it returns `autonomy:true`; headings match SL02/SL03; no `{{`.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | Every section answers a question `/status`, `/next` or a new session asks. |
| 2 | Function | PASS | Trigger: any state change. Input: the current phase, active parts, next action. Output: one rewritten page. Done: a new session can act without chat history. |
| 3 | Evidence | CONCERNS | Thin protocol: 3 sources. `todo.txt` is 3,459★ and GPL-3.0; `upptime` is 17,214★ and MIT; SL02 is accepted. The borrow is structural, not textual. |
| 4 | Blueprint fit | PASS | Target matches blueprint row 259 and build plan row 85; one page, English, project layer. |
| 5 | Consistency | PASS | `Phase` values match the seven-step pipeline; `Mode` matches SL01; `Gate` names G0–G3; `Autonomy` matches R10; `Since` is read by SL02. |
| 6 | Language and encoding | PASS | English, UTF-8 no BOM, LF, POSIX, no `{{`. |
| 7 | Testability | PASS | CLI02 parses it; an empty slot is `not recorded`; an autonomous block without ten fields fails. |
| 8 | Size and density | PASS | 421 tokens of 600; 34 lines; no prose beyond the header. |
| 9 | Integration | CONCERNS | `Since` means both "last change" and "start date" in SL02's wording; `Budget` duplicates a slice of R9 by design; `Active` can disagree with `agent.lock.json` and nothing reconciles them. |

Overall: 7 PASS, 2 CONCERNS. Review-ready.

## Open questions

1. **`Since`.** Does it mean the last change to this page, or the project start?
   Recommendation: last change here; the start date is in `agent.lock.json`
   (CLI01), and SL02 prints both.
2. **R2 comma vs CLI02 split.** R2 puts a comma inside a question; CLI02 splits
   the `Questions` entries on commas. Recommendation: keep one question per
   line, no comma in the question text; add a parser test in CLI02.
3. **`Budget`.** Is it a duplicate of R9 or the per-stage number? Recommendation:
   the number and cut order belong here; R9 owns the rule, not the values.
4. **Empty slots.** An empty template parses green; only a filled example proves
   the contract. Recommendation: keep the green empty state (new projects need
   it); CLI02 should also test a filled page.
5. **`Active` vs lock.** `Active` is prose, `agent.lock.json` is the install
   record. Recommendation: `Active` names what is in play now; the lock is the
   source of installed parts; A01 reconciles on `/status`.
6. **R5 reference in SL03.** SL03 cites R5 for "one action"; R5 is about code
   before docs. Recommendation: replace the citation with R9 or remove it.

## Known weaknesses

- The page is only as good as the last writer; a stale `STATE.md` is worse than
  no page.
- `Autonomy` is a copy of the ten contract fields; R10 remains the source.
- A long `Active` list can exceed one line and lose the one-fact-per-line rule.

## Next action

Review with D03/D04/D05/D06, then assemble Batch 14.
