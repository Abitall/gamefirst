# REPORT — S08 `prototype`

## Summary

Written: `artifact/library/game/skills/prototype/SKILL.md`, a one-page skill that
spends one to two days on one question about fun, feel, or feasibility and returns
an answer with evidence. The artifact was written first, then `JUSTIFICATION.md` and
`SOURCES.md`. Layer `game`; no engine imports. Every cross-reference resolves
against `docs/V0.3-BLUEPRINT.md`. The body follows the section order of
`library/core/skills/verify/SKILL.md` (Trigger, Inputs, Steps, Output, Failure
behavior, Out of scope) and closes with the cross-ref line used by
`library/core/skills/import/SKILL.md`.

The method is: one question, success and kill criteria before the first line of
code, a greybox built in `prototypes/<YYYY-MM-DD>-<slug>/` from the engine pack's
empty scene, a debug HUD, a run log, a 15–20 minute human playtest, a 30–60 second
capture, a verdict of keep/kill/retune, a five-field report, then discard the code
and promote the learning. R8 owns fun, R1 owns evidence, R10 owns the autonomous
variant; the skill cites them instead of restating them.

## Size

Measured on the artifact after the final edit:

| Metric | Value | Threshold | Status |
|---|---|---|---|
| Characters | 3090 | — | — |
| chars/4 (tokens) | 772.5 | 800 | pass, inside the 720–780 target |
| words | 529 | — | — |
| words × 1.35 | 714.2 | 800 | pass, 5.8 below the 720 target floor |
| Lines | 58 | one page | pass |

Why the two metrics diverge: the text contains nine identifier and path spans
(`prototypes/<YYYY-MM-DD>-<slug>/`, `runs.jsonl`, `REPORT.md`, `STATE.md`,
`BACKLOG.md`, `max_minutes`, `src/`, `N00`, the cross-ref line). Each counts as one
word in the word metric but as five to eight tokens in the character metric, so the
word metric reads lower. Both are under the rubric's 800-token threshold; chars/4,
the metric in the task brief, is inside its band.

No content was cut to chase the word figure. The obvious way to raise it is one
extra clause of about five words; that costs roughly 20 characters and leaves the
artifact at 777 chars/4 with less headroom for review edits. Left as an open
question rather than spent unilaterally.

## Checks

| Check | Method | Result |
|---|---|---|
| Encoding | byte scan: BOM, CR, TAB | no BOM, no CR, no TAB; UTF-8 |
| Trailing whitespace | regex `(?m)[ \t]+$` | none |
| Non-ASCII | count of `[^\x00-\x7F]` | 3, all en dashes in ranges (`1–2`, `15–20`, `30–60`) |
| Engine imports | search for Phaser, Unity, Godot, Unreal | 0 matches |
| Cross-references | each ID counted in `docs/V0.3-BLUEPRINT.md` | S02, S06, S09, S10, A02, A03, G1, E09, C01, D07, N00 each present; R1–R10 present in `library/core/rules/` |
| Layer | blueprint S08 says `game`; skill imports no engine and names no engine API | consistent |
| POSIX paths | all paths use `/`; no drive letters, no backslashes | pass |
| Windows-safe names | letters, digits, dash, dot, underscore only | pass |
| Secrets and network | scan for tokens, keys, URLs that write | none; no network action in the skill |
| Source licenses | recorded per repository in `SOURCES.md` | MIT, Apache-2.0, CC0-1.0; no code or text imported |

Functional check available to a reviewer, cheap enough to run per edit: rerun the
byte scan and the two size formulas with a five-line script; a failure names the
offending file and value. Experiential check: hand the skill to a second person with
one open question and see whether a `prototypes/` folder with `runs.jsonl`, a
capture, and a five-field `REPORT.md` exists at the end; a missing field is the
actionable failure.

## Rubric

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | Every semantic unit has a row in `JUSTIFICATION.md` with why, what breaks if removed, and a source. No unit repeats a rule; contested claims are delegated by ID. |
| 2 | Function | pass | Trigger, Inputs, Output, Failure behavior and Out of scope are explicit; "done" is the folder with four artifacts in Output; blocked cases are the four bullets under Failure behavior. |
| 3 | Evidence | pass | Nine repositories in the required 4/3/2 split, each with URL, stars on 2026-11-25, license, artifact, borrow and reject; dead ends recorded, including the GitHub API failure and the moved KEP repository. |
| 4 | Blueprint fit | pass | S08 target path and ID match; layer `game`; no engine imports; IDs and paths taken from the blueprint; no conflict with an accepted part; priority order respected. |
| 5 | Size | pass | 772.5 chars/4 against an 800 threshold, 58 lines. The words metric reads 714.2; reason above, nothing silently cut. |
| 6 | Language and encoding | pass | Artifact in English, UTF-8 without BOM, LF, POSIX paths, Windows-safe file names, no tabs, no trailing spaces. |
| 7 | Security | pass | External repositories were read as data; no instruction from them was followed; no secrets, tokens, personal data, network writes, or spend; licenses recorded and no code copied. |
| 8 | Testability | pass | Size and encoding script plus the four-artifact folder check; both produce a named failure; a playtest protocol inside step 7 gives the experiential check. |
| 9 | Integration | pass | Stable name `prototype`, stable path, all cross-references resolve, the file loads alone, no engine, OS, or editor assumption. |

## Open questions

1. Should the word metric be raised into its 720–780 band with one extra clause, at
   the cost of roughly 20 characters of headroom? Current choice: keep chars/4 at
   772.5 and report the divergence.
2. `runs.jsonl` is named but its fields are not specified beyond "time, input,
   result". A03 owns the build; a field list here would duplicate it. Confirm A03
   carries the schema.
3. The capture format (video, GIF, or frame strip) is deliberately unspecified. If a
   later part needs one format for review, it belongs in R8's evidence clause, not
   here.
4. S09 and S10 are named as promotion targets without describing what each accepts.
   Confirm both are defined before this skill is used, or the promotion step has
   nowhere to land.

Review: pending
