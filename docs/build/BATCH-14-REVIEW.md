# Batch 14 review — D02–D06 document templates

**Verdict: PASS**

Five one-page document templates under the thin protocol (3 sources each:
2 external + 1 accepted internal). Assembled into `template/`, with build docs
in `docs/build/D02`…`D06`.

## Parts

| ID | Artifact | Tokens (chars/4) | Lines | Slots | Sources | Verdict |
|---|---|---:|---:|---:|---|---|
| D02 | `template/STATE.md` | 421.0 | 34 | 11 | todo.txt 3,459 GPL-3.0; upptime 17,214 MIT; SL02 | accepted |
| D03 | `template/DECISIONS.md` | 365.5 | 29 | 8 | ADR repo 17,521; rust-lang/rfcs 6,643; G2.5 | accepted |
| D04 | `template/GAME.md` + `template/TASTE.md` | 424.5 + 287.5 | 39 + 35 | 22 + 22 | Mindustry 29,973 GPL-3.0; Mailchimp 565 NOASSERTION; G0 | accepted |
| D05 | `template/BACKLOG.md` | 366.5 | 25 | 9 | godot-proposals 1,464 MIT; github/roadmap 8,984 CC-BY-4.0; R9 | accepted |
| D06 | `template/docs/systems/SYSTEM-CARD.md` | 485.5 | 60 | 12 | Kubernetes enhancements 3,991 Apache-2.0; rust-lang/rfcs 6,643 Apache-2.0; S02 | accepted |

All five are under 600 tokens; all are UTF-8, no BOM, LF, POSIX paths, no `{{`.

## Review changes

- **D02:** `BLOCKING -` → `BLOCKING —` to match R2; bytes 1,686, tokens 421.0.
- **D03:** “Ten lines per block” → “At most ten lines per block”; the template
  block is 8 lines, so a hard ten would be false. JUSTIFICATION quotes updated
  to `Routine tuning` and `gate packet path`.
- **D04:** `TASTE.md` added to `docs/V0.3-BLUEPRINT.md` tree next to `GAME.md`;
  the report’s blueprint-fit concern was closed. `GAME.md`/`TASTE.md` docs were
  written manually after the subagent hit the step limit.
- **D05:** rubric 9 now says D02/D03 are not yet created (forward refs); the
  non-ASCII wording is “Cyrillic, angle brackets, em dash”.
- **D06:** `SOURCES.md`/`REPORT.md` written manually after the step limit;
  the card has 8 sections, 12 slots, 485.5 tokens.

## Smoke test

`C:\Users\Chirv\AppData\Local\Temp\opencode\gamefirst-b14-smoke.mjs`:
**407 checks, 0 failures.**

Covers: 10 rules, 4 agents, 13 skills, 3 crews, 5 gates, 12 evals, 10 tools,
6 commands, 32 permissions; all size/encoding checks; D02 headings and
`BLOCKING —`; D03 six fields and “at most ten”; D04 Russian, 22 slots each;
D05 Russian; D06 8 sections; `docs/build/D02`…`D06` three docs each; blueprint
`TASTE.md`; A01 `docs/retro/**` allow.

## Integration decisions

- **D02/D03:** `STATE.md` links the newest gate line; `DECISIONS.md` is
  append-only; a G2.5 freeze is one block with budget by reference.
- **D04:** `GAME.md` is written after G1; `TASTE.md` uses one frame from
  `evidence/` (CLI10) and one distant reference (R7); both are Russian, while
  IDs stay English.
- **D05:** `BACKLOG.md` is the only home for out-of-scope ideas; R9 owns the
  cost test; G2.5 freezes features.
- **D06:** the system card is one page with `Config keys`, `Tests`, and
  `Verified by`; it describes an approved system, not a speculative design.

## Open issues

- Command runtime is not tested; structural checks only.
- D07–D10 and M01 are not written yet; Batch 15.
- CLI08 has hardcoded v0.3 IDs/kind lists.
- SL02 lock field names are not yet fixed; `Since` is ambiguous.
- D01 references are weak (119★ PR/FAQ).
- D06 says “No values”; E01/S09 allow tuned values in a system card.
- D04: one still frame cannot prove motion or sound; GIF is manual.
- D03: ADR source is CC-BY-NC-SA/OGL, not MIT; only the idea is borrowed.

## Next

Batch 15: D07 playtest note, D08 engine doc, D09 guide, D10 Russian decisions
digest, M01 memory schema. Then Batch 16 X01–X03/N00–N01, Batch 17–19 engines
and packs, four reviewers, final report.
