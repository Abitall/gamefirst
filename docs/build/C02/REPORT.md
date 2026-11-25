# C02 Report — slice-crew

## Summary

`slice-crew.md` defines the temporary crew that turns a G1 keep into a G2
decision. It is a plain-Markdown game-layer crew: partner (A01) leads,
designer (A02) owns the slice question and the nine-point DoD, engineer (A03)
builds and verifies, critic (A04) reviews blind after the build and note are
closed. The crew reuses content, runs three to five stranger sessions, and
hands the human a self-contained packet with proceed/fix/pivot options. It
disbands after the line is written to `DECISIONS.md` and `STATE.md`. Content,
polish, release, and new systems are excluded and redirected.

Structure: Trigger, Members, Input (five-input gate), Work (six steps), Output
(packet and decision), Limits. The artifact is frozen at the version below.

## Size

| Measure | Value |
|---------|-------|
| Characters | 2,545 |
| chars/4 (token estimate) | 636.3 |
| Words | 460 |
| Lines | 35 |
| Limit | 700 (task limit; crews have no rubric threshold) |
| Headroom | 63.7 chars/4 (9.1%) |
| SHA-256 | `22162dbd89a62022ecc27799ff2a6fc0e285bc055e85ea5d1ad62afcb527c009` |

The 700 limit is the task's; the rubric lists thresholds for rules, skills,
packs, agents, evals, commands, and templates, not crews. At 636.3 the artifact
sits in the 620-680 target band.

## Checks

| Check | Result |
|-------|--------|
| Plain Markdown, no YAML frontmatter | pass |
| UTF-8 without BOM (first bytes are `# s`, not `EF BB BF`) | pass |
| LF only; no CR or CRLF | pass |
| Trailing newline; 35 lines | pass |
| ASCII only; no mojibake | pass |
| All 14 cross-references resolve: S10, A01, A02, A03, A04, G1, G2, R1, R7, R8, R9, R10, E03, D07 | 14/14 |
| 34 semantic units, each mapped in `JUSTIFICATION.md` | 34/34 |
| 11 deliberate omissions recorded | 11/11 |
| Nine sources, 4 gamedev / 3 software / 2 AI-agent | 9 (4/3/2) |
| Every source has URL, stars, license, artifact, quote, borrow, reject | 9/9 |
| No copied code, license text, or asset | pass |
| No secrets, tokens, personal data, URLs, or commands in the artifact | pass |
| No engine, OS, or editor assumption | pass |
| No writes outside `staging/C02/` | pass |
| Artifact hash unchanged after freeze | pass (above) |

## Rubric self-check (9/9)

| # | Section | Verdict | Note |
|---|---------|---------|------|
| 1 | Necessity | pass | 34 units; each has why, what breaks, a "shorter?" answer, and a source. Eleven omissions are named. |
| 2 | Function | pass | Trigger (G1 keep + playable loop), input (five or no crew), output (packet + decision), done (line in `DECISIONS.md`, crew disbands), failure (no stranger no packet; R10 or stop), scope (four exclusions). |
| 3 | Evidence | concerns | Nine repos and the 4/3/2 split are correct, but `veloren/book` has 21 stars and `polygons`/`open-project-1` are not current (2022 / archived). The set is the one specified for this part; every weakness is disclosed in `SOURCES.md`. |
| 4 | Fit with the blueprint | pass | Game layer; no engine imports; IDs and paths from the blueprint; no contradiction found with S10, A01-A04, G1/G2, R1, R7-R10, E03, D07. |
| 5 | Size | pass | 636.3 chars/4 against a 700 task limit; 63.7 headroom. |
| 6 | Language and encoding | pass | English artifact; UTF-8 no BOM; LF; ASCII; no file paths inside the artifact, so POSIX path rules do not bite. |
| 7 | Security | pass | External content treated as data; licenses checked; no code copied; no publish, spend, or network write. |
| 8 | Testability | pass | S10 checklist, R8 playtest, E03 verify, and the packet's evidence-per-point are the checks; a failed point is reported as failed. |
| 9 | Integration | pass | File name and IDs stable; 14/14 refs; loads alone; no engine/OS/editor assumption. |

Result: 9/9 sections checked; 8 pass, 1 concern. The concern is disclosed, not
silent; the reviewer decides whether it is acceptable.

## Open questions

1. **Evidence bar.** `veloren/book` (21 stars) and the stale `polygons` /
   archived `open-project-1` are below "popular and current". They are the
   specified set and each supplies an artifact the others do not. Replace them
   with current repos, or keep the set with the disclosure?
2. **Fix round bound.** "One round" has no time limit; A01's clock is the only
   bound. Should R9 add a date to the fix round?
3. **No separate report.** C01 ships a crew `REPORT.md`; C02 says the packet is
   the record. Confirm that a packet-only record is intended for this part.
4. **Who runs the sessions.** A01 runs the stranger sessions and owns the gate
   line. This reads as compatible with R8 (A01 is not the builder), but it puts
   collection and reporting in one role.
5. **Pivot exit.** A pivot ends the crew. If the human wants a different slice
   after a pivot, that is a new crew and a new five-input gate; confirm.
6. **Nine-point coverage in Work 2.** Work 2 lists the frame A03 builds; the
   stranger check and reuse sit in Work 4 and Work 3, and pause/restart sit
   under "title and menu". The checklist (Work 1) binds to S10, so the DoD is
   complete. Confirm that pause/restart need no separate build line.

## Promotion note

`docs/build/C02/` still holds earlier copies (the 7,511-byte
`JUSTIFICATION.md`, a 2,918-byte `REPORT.md`, and an older `SOURCES.md`); the
staging files are authoritative. Overwrite the build copies at promotion or the
versions will diverge.

## Review

Review: accepted 2026-11-26