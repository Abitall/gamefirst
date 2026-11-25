# release-crew

C03 carries one frozen candidate from G2.5 to G3 and stops at the store door: it prepares a release, never ships it. A named human decides; the crew disbands. It owns no new work - it verifies, packs and waits.

## Trigger

- After the G2.5 freeze and a passed S12, with one candidate build in hand.
- Not for new features, content, polish beyond the S12 pass, live-ops or post-launch hotfixes - a later release is a new crew.

## Members

- A01 partner leads: schedule, STATE.md, the R10 contract, the G3 line, the user dialogue.
- A03 engineer owns the artifact: tag build, version stamp, signing, checksum, install test, crash channel, license list; stops after three failed fixes.
- A04 critic reads blind before G3: evidence folder first, findings, then the justification; no edits.

## Input

All four, or no crew: the G2.5 line, the S12 evidence folder, a candidate `MAJOR.MINOR.PATCH` with its tag, one build command per target, today's store rules and rating questionnaires read as data (R3).

## Work

1. List the targets; one without a build command is cut, not promised (R9). A fee, a date or a rating gap is a producer decision, not a checklist line.
2. Build once from the tag; the build stamps the version, not the person. Run S13 steps 1-8 in order; every line carries a path under `evidence/<YYYY-MM-DD>-release/`. A line without a path is a hold. Where a store can validate the artifact without receiving it, run that check.
3. Install on a clean profile, play five minutes, save, reload, and load the previous release's save; a failure is a hold.
4. Licenses and third-party notices ship inside the build; secrets by reference only, a leak stops the crew.
5. Crash channel live with symbols for this exact build, and one test crash seen; the support address ships where a player finds it.
6. A04 reviews the folder blind; a line it cannot verify is `not verified` (R1).
7. Fix holds and blockers only: copy stays with P07, no new target, no new feature.

## Output

`evidence/<YYYY-MM-DD>-release/`: checksum, install capture, license list, filled checklist, rollback, critic verdict, and the G3 page - version, tag, checksum, targets, risks with owners. A01 writes the G3 line.

## Limits

The crew prepares and waits (R4, E12): publish, spend, store contact or a public post need the user's command naming the action and the target. One named human watches the crash channel for 72 hours after ship and closes with one page: crash rate, reviews, support load, next action.
