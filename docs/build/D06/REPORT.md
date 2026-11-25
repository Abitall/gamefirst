# D06 — system card: report

## Summary

`SYSTEM-CARD.md` is a one-page English template for one implemented system, at
`template/docs/systems/SYSTEM-CARD.md`. It has eight sections: system name and
status, player fantasy, inputs, outputs, config keys, tests, `verified by`, open
questions. A `draft` is the approved plan, not proof; the card becomes exact only
after the build runs, someone plays, and `verify` passes.

The card carries keys, not values: every number belongs to `src/data/`, and the
card names the file and key path. Tests are exact names, not counts. `verified
by` is a date plus the evidence folder, empty in `draft` and `working`.

## Size

| Measure | Value | Limit | Headroom |
|---|---:|---:|---:|
| Characters | 1,942 | - | - |
| Tokens (chars / 4) | 485.5 | 800 | 314.5 (39.3%) |
| Lines | 60 | one page | fits |
| Bytes | 1,942 | - | - |
| Fill slots | 12 | - | - |

UTF-8, no BOM, zero CR, LF, trailing newline. All prose is English; the only
non-ASCII is the em dash in the status legend.

## Check

Structural check run on the artifact:

```json
{"ok":true,"chars":1942,"bytes":1942,"tokens":485.5,"lines":60,"headings":8,"slots":12,"bom":false,"crlf":0,"trailingLf":true}
```

Assertions: eight `##` headings; one status legend; all IDs resolve (`A02`,
`A03`, `R1`, `R2`, `R5`, `S02`, `D02`, `D03`, `D04`, `E01`, `S09`); no `{{`;
no future tense; no numeric gameplay values; `tests/` paths are POSIX.

## Rubric

| # | Criterion | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | PASS | Every section answers a question a programmer or reviewer asks before touching the system. |
| 2 | Function | PASS | Trigger: a system is approved or verified. Input: the system's design and evidence. Output: one card. Done: a reader can find the config keys, tests and proof. |
| 3 | Evidence | CONCERNS | Thin protocol: 3 sources. Kubernetes and Rust RFC are strong; S02 is internal. The card is a synthesis, not a copy. |
| 4 | Blueprint fit | PASS | Target matches blueprint row 263 and build plan row 88; one page, English, system layer. |
| 5 | Consistency | PASS | IDs resolve; `draft`/`working`/`verified`/`cut` match D02 and S02; no duplicated rules. |
| 6 | Language and encoding | PASS | English, UTF-8 no BOM, LF, POSIX, no `{{`. |
| 7 | Testability | PASS | Status, tests and `verified by` are checkable; a card without evidence cannot claim `verified`. |
| 8 | Size and density | PASS | 485.5 tokens, well under 800; 60 lines, one page. |
| 9 | Integration | CONCERNS | D02/D03 are forward references until their parts land; E01/S09 wording about values needs alignment. |

Overall: 7 PASS, 2 CONCERNS. Review-ready.

## Open questions

1. **Values vs keys.** E01:5/9/14 and S09:13/33/38 assume a value can appear in
   the card; the card says keys only. Recommendation: keep keys only; tests and
   data own values. Clarify the two evals in Batch 15.
2. **`draft` status.** A02 writes the card before code; A03 implements; R5 says
   document only working mechanics. Recommendation: `draft` is allowed as the
   approved plan, but it must not claim `working` or `verified`.
3. **`verified by` lint.** No tool checks that the date/path resolves.
   Recommendation: CLI08 adds a soft check for `docs/systems/*.md` in v0.3.1.
4. **Build plan header.** `docs/BUILD-PLAN.md:1` had mojibake; fixed to
   `# gamefirst v0.3 — Build Plan` during review.

## Known weaknesses

- The card is a template; an empty card is valid but says nothing.
- `verified by` depends on the evidence folder naming (CLI03/S02).
- The status vocabulary is four words; a system that is partly implemented has
  to choose `working` and explain in open questions.

## Next action

Review D02/D03/D04/D05 for the same field names, then assemble Batch 14.
