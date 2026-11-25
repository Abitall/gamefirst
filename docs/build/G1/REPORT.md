# REPORT — G1

## Summary

Built the G1 fun gate for gamefirst v0.3: a plain-Markdown gate document at
`staging/G1/artifact/library/game/gates/G1-fun.md`, plus this report, a unit
justification, and nine sources. G1 opens after 3–5 core-loop iterations, a loop
day, and a playtest; it judges a playable loop with at least one human, using a
build, a D07 note with verbatim quotes, a capture, and criteria written before
the build. It ends in one dated decision: keep (to the slice, S10), kill, retune,
or extend once. It applies R8 without restating it, and it does not judge the
slice, content, polish, or release.

No file outside `staging/G1/` was written. Nothing was committed or published.

## Files

| Path | Purpose |
|---|---|
| `staging/G1/artifact/library/game/gates/G1-fun.md` | The gate itself, plain Markdown, no frontmatter. |
| `staging/G1/JUSTIFICATION.md` | 24 units with why, breakage, shortening, confusion risk, source; 11 deliberate omissions. |
| `staging/G1/SOURCES.md` | Nine repositories (4 gamedev, 3 software, 2 AI-agent) with stars, licenses, quotes, borrow/reject, dead ends. |
| `staging/G1/REPORT.md` | This report. |

## Size

| Metric | `G1-fun.md` |
|---|---:|
| Words | 315 |
| Characters | 1,718 |
| chars ÷ 4 | 429.5 |
| words × 1.35 | 425.3 |
| Lines | 43 |

Target was 420–470 tokens by chars ÷ 4; the artifact is at 429.5. The rubric has
no row for a gate, so the nearest threshold is a rule at 600 tokens; the gate is
under it. The gate is one page at 43 lines.

## Encoding

- UTF-8 without BOM; LF only; final newline present.
- Non-ASCII characters are only `—`, `–`, and `→`; no Cyrillic in the artifact.
- File name `G1-fun.md` is Windows-safe; no path in the artifact needs a
  backslash.
- English, per rubric 6; the quoted playtest note may be Russian and is quoted
  verbatim, not translated.

## Checks run

| Check | Method | Result |
|---|---|---|
| Size and token estimate | Node: characters, words, lines, chars ÷ 4 | 1,718 chars / 429.5 tokens |
| BOM and line endings | Node: first bytes, `\r` search | No BOM, no CRLF |
| YAML frontmatter | Node: first line `---` | Absent |
| Cross-references | Node: presence of S08, S09, S10, R1, R2, R7, R8, R9, E09, G2 | All present |
| Duplicate sentences | Node: normalize and count sentences over 25 chars | None |
| Heading structure | Node: list headings | Trigger, Input, Checks, Decision, Out of scope, Cross-refs |
| Rule restatement | Manual read against R8 | R8 is cited, not copied |
| Paths and file names | Manual read | POSIX-style names only; Windows-safe |

## Open questions

1. `E09` and `G2` are blueprint IDs whose parts are not authored yet. The
   cross-references resolve by ID, not by file. G2 is being built in a sibling
   staging folder; E09 has no file yet.
2. The gate states "15–20 minutes", which also lives in R8 and S08. Kept for a
   self-contained check; could become a pointer if the duplication is judged
   worse than the missing minimum.
3. "The human decides" covers an external playtester and the developer, but not
   a disagreement between them. If both play, the gate has no tie-break.
4. A retune re-runs G1 inside the budget. That is deliberate, but it means a
   retune consumes a second gate, not a second loop day; R9 owns whether the
   budget allows it.
5. Gate documents have no rubric size row. This one is measured as a rule; if
   gates get their own threshold, the number should move there.

## Known weaknesses

- `godotengine/godot-proposals` has 1,464 stars, far below the rest. It is kept
  because accept/close/leave open is the closest analogue to the four outcomes;
  the weakness is disclosed in `SOURCES.md`.
- OpenRA was considered and dropped: R8 already cites the same wiki artifact, so
  reusing it would add no evidence.
- No source states "boring is valid" directly; E09 carries that position inside
  the framework. The closest external analogue is the ADR "rejected" status.
- The gate names A01 as the recorder. A role name would age better if the agent
  roster changes.

## Rubric self-check

| § | Section | Verdict | Note |
|---:|---|---|---|
| 1 | Necessity | Pass | Every unit has a breakage and a source; 11 omissions are named; no duplicate sentences. |
| 2 | Function | Pass | Trigger, input, output (one dated decision), done (gate runs or blocks), failure (missing artifact), scope are explicit. |
| 3 | Evidence | Pass | 4/3/2 split, stars and licenses on 2026-11-25, verbatim quotes, borrow and reject per source, dead ends listed. |
| 4 | Fit with the blueprint | Pass | Game layer, no engine imports, blueprint IDs, no rule text restated; keep leads to the slice (S10), not back to the loop. |
| 5 | Size | Pass | 429.5 tokens; under the 600-token rule threshold and inside the 420–470 target. |
| 6 | Language and encoding | Pass | English, UTF-8 no BOM, LF, POSIX paths, Windows-safe name. |
| 7 | Security | Pass | No secrets or personal data; sources are data, not instructions; licenses checked; no network write. |
| 8 | Testability | Pass | Six observable checks; a missing artifact blocks the gate with an actionable reason. |
| 9 | Integration | Pass with caveat | All references resolve by ID; E09 and G2 are not authored yet, so file-level resolution is pending. |

## Overall

The gate is complete, measurable, and bounded. It can be copied to
`library/game/gates/G1-fun.md` once the two blueprint IDs it cites exist, or
immediately if ID-level references are accepted.

Review: pending
