# G3 - ship

The last gate. A human decides whether the build leaves the building; the agent prepares the packet and never decides. G3 does not build, test or fix - it reads evidence and signs.

## Input

- S13 release evidence: build from the release tag, checksum, install log, store page.
- C03 release crew: verified pack, waiting at the store door.
- E12 release safety: publish and spend need an explicit command (R4).
- G2.5 freeze: scope is closed, no feature enters after it (R9).
- Known bugs and regressions, each with a severity and an owner.

## Check

One line per point; a missing artifact is a failed point.

1. The build artifact exists, matches the release tag, and its checksum is recorded.
2. It installs and launches on a clean OS profile: five minutes; save, reload, and load a previous-release save when saves exist.
3. Store metadata and platform requirements are complete for every storefront.
4. A rollback path is written and walked once (R4).
5. A crash channel is live and receiving from the test install.
6. A post-launch owner is named for the first 72 hours.
7. No open blocker and no open regression; serious known bugs are accepted in writing.
8. Publish is a separate, explicit command under R4; G3 never publishes.

## Decision

One line, dated: `ship <version> <date>` or `hold <version> <blocker>`.

- `ship` - all eight points pass. A01 appends the line to DECISIONS.md; STATE.md points at it; C03 disbands.
- `hold` - name exactly one blocker and one next action. Everything else waits.

## Out of scope

G3 does not re-open G2 or G2.5, does not add a feature (R9), does not publish (R4) and does not add another check.

Cross-refs: R1, R4, R9, S13, C03, E12, G2.5.
