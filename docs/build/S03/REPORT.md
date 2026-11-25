# S03 retrospect — report

## Summary

`retrospect` closes a stage or gate with one lesson and one change. It takes only claims an artifact
proves, separates observation from interpretation, names one root cause by a removal test, picks the
smallest change, and attaches a check and a date. The result is five lines in `docs/retro/<date>.md`
plus one pointer line in `STATE.md`. A repeated failure escalates to R6 with a full proposal; a single
annoyance stays in `NOTES.md` or `lessons/`. The skill never blocks a stage and never edits a past
retro.

## Size

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Bytes | 3,116 | — | — |
| Characters | 3,114 | — | — |
| Tokens (chars / 4) | 778.5 | ≤ 800 | pass |
| Tokens (words × 1.35) | 727.7 | ≤ 800 | pass |
| Words | 539 | — | — |
| Lines | 65 | — | — |

Measured on `artifact/library/core/skills/retrospect/SKILL.md`. Both estimation methods stay under the
cap, so the size verdict does not depend on which one the reviewer uses. For scale: S02 `verify` is
3,082 bytes / 771 tokens chars/4.

## Encoding and format checks

| Check | Result |
|---|---|
| Encoding | UTF-8, no BOM (first bytes are `---`) |
| Line endings | LF only, 0 CRLF pairs, file ends with LF |
| Tabs | none |
| Trailing whitespace | none on any line |
| Longest line | 172 characters |
| Non-ASCII | 1 character, an em dash `—` |
| Placeholders | none: no TODO, TBD, FIXME, lorem. The `<...>` slots in the output block are the template fields the skill tells you to fill |
| Paths | POSIX only; no drive letters, no backslashes |
| Secrets | none: no tokens, keys, emails, or local paths |
| Copying | no sentence from any source; behaviours only (see `SOURCES.md`) |

## Interface assumptions

- Frontmatter keys `name`, `description`, `allowed-tools` follow `library/core/skills/verify/SKILL.md`.
  `allowed-tools: Read, Glob, Grep, Write` — no Bash, because the skill reads evidence rather than
  regenerating it, and no Edit, so a past retro cannot be rewritten in place.
- Reads: `evidence/`, `runs/*.jsonl`, `docs/playtests/*.md`, `STATE.md`, `BACKLOG.md`.
- Writes: `docs/retro/<YYYY-MM-DD>.md` and one pointer line in `STATE.md`. It never writes `src/**`,
  so it stays inside A01's permission boundary.
- Invoked by the `/retro` command (SL05) and by A01 partner before a stage opens.

## Cross-reference status

| Ref | Meaning here | State on 2026-11-25 |
|---|---|---|
| R6 | smallest-fix ladder, five-field proposal, one in / one out | exists, `library/core/rules/R6-add-only-after-failure.md` |
| R8 | fun is verified on a running loop, not in a retro | exists |
| R9 | scope is a budget; overflow parks in `BACKLOG.md` | exists |
| R10 | autonomy contract and its stop reason | exists |
| E03 | verify before done | exists in blueprint |
| E07 / M01 | memory admission and promotion | exists; M01 is a spec, not yet a file |
| E08 | stop after three | exists |
| S02 | verify; supplies the claims retro consumes | exists, `library/core/skills/verify/SKILL.md` |
| S04 | import of external practice | planned, not built |
| S05 | tool creation | planned, not built |
| SL05 `/retro` | the command that runs this skill | planned in blueprint line 247; `library/core/commands/` is empty |
| A01 | partner; keeps `STATE.md`, runs gates | exists, `library/core/agents/partner.md` |
| `lessons/` | home for a single annoyance | directory exists, empty, no owner skill |

## Fit decisions

Two places where the artifact deliberately departs from the current blueprint. Both are decided here,
with the compensating change named, rather than left as an open question.

### A. Record path — keep `docs/retro/`, add it to the blueprint tree

Decision: the skill writes `docs/retro/<YYYY-MM-DD>.md`, and Batch 4 adds one line for `docs/retro/`
to the game tree at blueprint lines 96–100, so N00 creates it like the other `docs/` folders.

- Why not `docs/playtests/`: a D07 playtest note is a different document — one page, protocol,
  observations, quotes, verdict, read by R8 at G1. A retro is a dated, append-only, one-per-stage
  record that the next stage and R6 read. Mixing them breaks "one fact in one place" and forces the
  repeat test in step 7 to grep playtest notes for lessons.
- Why not `STATE.md` only: `STATE.md` is a rolling snapshot, overwritten every stage; an append-only
  record cannot live in it. The brief allows "docs/retro/<date>.md or STATE"; the skill does both —
  the file holds the record, `STATE.md` holds one pointer line so A01 finds it.
- Cost if the tree is not amended: only the `STATE.md` pointer survives, and the history that step 7
  counts on is lost. That is strictly worse, so the tree edit is part of this batch, not optional.

### B. Five lines — keep `Why`, keep add/delete inside `Change`

Decision: `Worked / Failed / Why / Change / Next`, with `Change:` reading `<smallest change, owner,
one thing added or deleted>`.

- The S03 brief lists "why" as a line and merges add/delete into the change.
- One change per retro: a separate add/delete slot is a second change slot, and the skill would then
  allow two edits per stage, contradicting its own boundary "no more than one change".
- `Why` is what step 7 compares. The repeat test matches causes, not symptoms; without a cause line,
  "the same failure twice" can only be matched by wording.
- Add/delete is not dropped: it is the content of `Change:`, and R6 requires any addition to name the
  part it replaces, so the deletion keeps a home beyond the retro.
- Compensating change: blueprint line 150 becomes "worked, failed, why, change (what it adds or
  deletes), next". Keeping the literal blueprint line instead would make the skill six lines or bury
  the cause in prose; both are worse than one edited blueprint line.

## Open questions

1. **Same-day retros.** The path is `<YYYY-MM-DD>.md` per the brief; a second retro on the same day
   adds `-2`. If the reviewer prefers a stage discriminator (`<date>-<stage>.md`), it is a one-line
   change to the skill and the `-2` rule disappears.
2. **No command yet.** `/retro` does not exist as a file. The skill assumes the command passes a stage
   or gate ID plus the evidence path; if the command will only pass the stage, step 1 has to find the
   evidence itself, which it already does.
3. **`library/lessons/` has no writer.** Step 7 sends a single annoyance there, but nothing defines the
   entry format. Either R6 or M01 should own it, or the step should point at `NOTES.md` only.

## Known weaknesses

- The removal test in step 3 fails when two causes are genuinely independent. The skill then fixes one
  and parks the other, which is correct for scope but can leave a known defect unfixed for a stage.
- "One page" is a judgement call; the size cap applies to this skill, not to the retro files it writes.
- On stages with no runnable command, "artifact" loosens to a screenshot or a note, so step 1 is only
  as strong as the project's evidence habit.

## Rubric self-check

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | 31 units justified in `JUSTIFICATION.md`, plus 6 deliberate omissions and 2 fit decisions |
| 2 | Function | pass | Trigger (3), inputs (4), steps (7), output block, failure behaviour (5), out of scope |
| 3 | Evidence | pass | 9 repositories, 4 gamedev / 3 software / 2 AI agent, stars dated, borrow and reject per source, dead ends listed |
| 4 | Fit | pass | Core layer, no engine or OS imports, IDs from the blueprint, mode priority untouched |
| 5 | Size | pass | 778.5 tokens chars/4 and 727.7 words×1.35, both under 800 |
| 6 | Language and encoding | pass | English, UTF-8 no BOM, LF, POSIX paths, no placeholders |
| 7 | Security | pass | Evidence is data, no secrets, no publish, no spend, no network |
| 8 | Testability | pass | A retro can be failed cheaply: missing evidence, two changes, an unchecked change, blame, an edited past retro |
| 9 | Integration | pass | Names match `S02`, `R6`, `R8`–`R10`, `E03`, `E07`, `E08`, `M01`, `A01`; loads standalone |

## Review

Review: pending
