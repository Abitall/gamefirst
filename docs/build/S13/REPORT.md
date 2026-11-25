# S13 release - report

## Summary

`release` is the part of the pipeline where a playable candidate becomes a shippable one. It reads each store's current rules before touching a build, fixes a countable target list with one build command per target, builds from the tag so the version cannot be typed, signs and checksums the artifact rather than its label, proves the build on a clean machine, opens one crash channel with symbols for that exact build, clears licensing and secret handling, and leaves a launch checklist in which every line has a path and the rollback is written down. The verdict belongs to the human at G3: the skill produces one page and a ship-or-hold line, and a green checklist uploads nothing (R4). Crew split follows C03: the partner owns dates and store contact, the engineer owns build, signing and crash channel, the critic checks the state of every step.

## Artifact

`artifact/library/game/skills/release/SKILL.md` - 51 lines, sections Trigger / Inputs / Steps 1-9 / Output / Blocked / Out of scope / Cross-refs.

## Size

| Metric | Value | Threshold | Result |
|---|---|---|---|
| Characters | 3,110 | - | - |
| chars/4 | 777.50 | <= 800 (target band 720-780) | pass, 2.50 under the top of the band |
| Words | 498 | - | - |
| words x 1.35 | 672.30 | target band 720-780 | 47.70 under the band |

Both metrics are reported as required. chars/4 is the binding proxy and lands inside the band with 90 characters of headroom against the 800 ceiling, so no content was cut to fit. The word estimate is under the band for the same structural reason as S09: a large share of tokens are backticked identifiers (`MAJOR.MINOR.PATCH`, `evidence/<YYYY-MM-DD>-release/`, `library/core/rules/R4-...`), which count as one word each and several characters each. Nothing was padded to close the gap.

## Checks

| Check | Result |
|---|---|
| Frontmatter parses; exactly `name`, `description`, `allowed-tools`; every tool in the allowed set | pass |
| UTF-8 without BOM, LF only, no tabs, no trailing spaces, final newline present | pass |
| ASCII only, so no mojibake risk on any platform | pass |
| POSIX paths; `<YYYY-MM-DD>` is the date notation S02:31 already uses | pass |
| Cross-references that resolve to files: R1, R4, R9, R10 in `library/core/rules/`; S02, S12, A03, A04 present under `staging/` | pass |
| Cross-references without files yet: G3 (blueprint 193, `library/game/gates/` empty), E12 (blueprint 212, only E03 exists), P01/P03/P07 (blueprint 303/305/309, no pack directory), C03 (183, `library/game/crews/` empty) | open, see questions |
| Reciprocal links: S12 already points back to S13 | pass |
| Target directory `library/game/skills/release/` does not exist yet; the part is staged | expected, merge step |
| Owners named where the work splits: a human watches the crash channel, P07 owns copy, the human owns the gate line | pass |
| Five nearest misuses excluded once (Trigger) instead of repeated in prose | pass |
| No code, no tool invocation, no store API, no engine call; signing and checksums are stated as principles | pass |
| No secrets, hosts, network calls, commit, publish or destructive command; secrets are allowed only by reference | pass |
| No rule text restated: role line and step 9 carry R1/R4 as executable procedure, attributed, not quoted | pass, noted |
| Loads alone: valid YAML, no external file required | pass |
| One page: 51 lines against the blueprint's one-page rule | pass |

## Rubric

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | pass | Every unit is mapped in `JUSTIFICATION.md`. The three units that remove a concrete misreading are the clean-machine evidence rule, "a green checklist uploads nothing", and the unsupported-target cut. |
| 2 | Function | pass | Trigger, inputs, nine steps, output, blocked, scope. Done is a directory of evidence plus a ship-or-hold line, not a claim. |
| 3 | Evidence | pass | Nine repositories, 4/3/2, stars and licences read on 2026-11-25, artifact, borrow and reject per row; three dead ends explained; no code copied; the absence of store-metadata practice stated as a finding. |
| 4 | Fit | pass | Game layer, no engine imports; platform, store, legal and crash items are exactly the S13 row; copy deferred to P07; rules keep their authority (priority line respected). |
| 5 | Size | pass, flagged | 777.50 chars/4 against 800 and inside the band; words x 1.35 at 672.30 is under. |
| 6 | Language and encoding | pass | Body English, ASCII only, UTF-8 without BOM, LF, POSIX paths. |
| 7 | Security | pass | Spend, upload and secrets each gated by a named rule; no credential, token or host appears; sources treated as data. |
| 8 | Testability | pass with cost note | The check is mechanical for file presence (one line, one path; a line without a path is a hold) and a five-minute clean install for behaviour. No automated fixture can judge whether a store page is compliant; the failure message is explicit instead. |
| 9 | Integration | pass with concerns | IDs and paths are stable; S12 links back; six forward references (G3, E12, P01, P03, P07, C03) resolve as blueprint ids only until those parts land. |

## Open questions

1. **Where do rating questionnaire answers live?** `template/docs/` holds `engine/`, `guide/`, `playtests/`, `systems/` and nothing for store or legal paperwork. Step 1 says "record" without a path. A `docs/store/` directory or a template would close it.
2. **Does any post-launch work belong in S13?** The owner question is now closed: step 6 names a human, because a sub-agent session cannot hold 72 wall-clock hours. What remains is the boundary. The blueprint lists live-ops as a non-goal (`B:409`), and step 6 is the only post-launch line in S13 - one channel, no dashboard, no telemetry. The ruling should say whether that line stays.
3. **Do packs P01, P03 and P07 own what S13 expects?** S13 defers copy and calendar to P07 and licences to P03. If the packs draw the boundary elsewhere, steps 2 and 7 move.
4. **E12 is cited but not a file.** Only E03 exists under `library/core/evals/`; E12 is an eval name at blueprint 212. Same forward-reference pattern S09 had with E08/E09.
5. **What shape will G3 take?** Step 9 authors a one-page pack, and the gate is defined only as "one line plus a date". If G3 ships its own template, S13's page may duplicate it.
6. **Console certification is out of scope, silently.** The step list assumes store rules that can be read and answered by one person. A console TRC/TCR submission is a negotiation, which Out of scope excludes; confirm the framework does not target consoles in v0.3.
7. **Word metric.** For identifier-heavy skills, words x 1.35 understates length. If both metrics must sit in 720-780, the ruling needs to say which one binds.

Closed in this revision: the 72-hour watch now names a human, not A03 - a sub-agent session cannot hold three wall-clock days, and naming one would either be a promise nobody keeps or a scheduled automation holding a support channel, which R10 does not cover. Also closed earlier: questionnaire wording, the uploads-nothing line, the P07 copy boundary. Size was re-measured after every edit, not estimated.

Review: accepted 2026-11-26
