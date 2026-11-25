---
name: release
description: Prepare one ship candidate for G3 - platform rules, store assets, a reproducible signed build, crash and legal checks, launch checklist. Use after polish and feature freeze.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# release

S13: a build that installs on a clean machine is the ship evidence (R1); G3 is a human decision and publishing waits for an explicit command (R4).

## Trigger

- G3 is close: G2.5 froze features, S12 polish is done, one playable candidate build exists.
- Not for store copy and positioning (P07), new features (R9), hotfixes after launch, or a platform the engine pack cannot export.

## Inputs

- Candidate: `MAJOR.MINOR.PATCH`, tag, artifact, and its passing S02 run.
- Targets: each store, OS and architecture with one build command. A target without a command is unsupported: cut it, do not promise it (R9).
- Today's store rules, rating questionnaires, licenses, privacy policy.

## Steps

1. **Rules first.** Per target, read the current submission checklist and record version, deadline, fee, the rating questionnaire's answers, privacy duties. A fee is spend: explicit command only (R4).
2. **Store page.** Caps, screenshots, trailer at the store's pixel sizes; description, tags, price, demo, wishlist timing. P07 owns the words; S13 checks presence, size, and that the page names its build.
3. **Build from the tag.** Clean clone, no local edits; version stamped by the build from the tag, never typed; one commit feeds every target.
4. **Sign and checksum the artifact, not the label.** Verify after upload; a mismatch is a hold, not a retry.
5. **Install test.** On a clean machine or profile: install, launch, play five minutes, save, reload; capture it under `evidence/`.
6. **Crash reporting.** One minimal channel, symbols for this exact build uploaded, a test crash visible in the dashboard. No telemetry by default; any collection needs consent and a policy line. A human watches that channel for 72 hours after launch.
7. **Legal.** Every asset and the engine with license and attribution; third-party notices ship inside the build; EULA and privacy URL live. Secrets by reference only, never in the repo or a log (E12).
8. **Launch checklist**, one line each with a path: smoke run, page live, download works, keys, support FAQ, rollback (previous build, unpublish step).
9. **G3 pack.** One page: version, tag, checksum, targets, checklist, risks. The decision line and date are the human's.

## Output

- `evidence/<YYYY-MM-DD>-release/`: checksum, install capture, store screenshots, license list, filled checklist, G3 page. A line without a path is a hold.
- A G3 line: ship or hold. A green checklist uploads nothing (R4).

## Blocked

- Rules changed mid-prep: re-read and re-record.
- Missing certificate, rating or license: name it, hold.
- Autonomous run: stop at upload, report what is staged (R10).

## Out of scope

Marketing copy (P07), certification negotiation, live-ops, refunds, moving a date by cutting scope (R9).

## Cross-refs

G3, R1, R4, R9, R10, E12; S02 check, S12 before, P01, P03, P07, A04.
