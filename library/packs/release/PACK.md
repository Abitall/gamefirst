# Release pack

Load on demand: before G3, before any build reaches a store, for a hotfix, or on
launch day. Adds the reference layer: platform requirements, store page fields,
build provenance, crash reporting, legal/privacy, launch day, the 72h watch.
S13 runs the release, C03 prepares and never ships, G3 decides ship or hold.
This pack never publishes.

## Boundaries

- Never publish, upload, submit for certification, change a price, or send keys.
  A human issues an explicit command naming the action and the target (R4, E12).
- No credentials, signing keys, store passwords, or tokens in the pack or repo.
- No marketing copy, creative calls, scope cuts, or pricing decisions.
- Store rules change: re-read the holder's current checklist before cert; a
  remembered rule is not evidence.
- The selftest proves the files are consistent, not that the game may ship.

## Pack contract (P02-P07)

```text
library/packs/<name>/
  PACK.md          # this file, at most 1,500 tokens (6,000 chars)
  manifest.json    # read by tools; never lists itself
  selftest.mjs     # at most 250 lines, offline, packaging only
  templates/       # optional; copied per use, never auto-installed
```

Eight manifest keys, plus `$schema` only when the file ships: `id` `pack-<name>`;
`version` semver; `requires` module ids, `["core","game"]`; `loaded`
`"on-demand"`; `files` every path except `manifest.json`, POSIX, relative,
nested allowed; `hashes` sha256 per file; `selftest` `node selftest.mjs`;
`upgrade` `"none"` or `{from,note}`. No other keys. A pack adds reference and
checklists: it never
restates a skill's steps, adds a rule, or ships runtime code. One line per check,
exit 0 or 1.

## Release checklist

### 1. Platform requirements

- PC: target OS/arch, controller support, cloud saves, achievements, DRM, and
  depot/branch layout declared.
- Console: current TRC/TCR/Lotcheck row by row, devkit build, cert slot, age
  rating, day-one patch rules.
- Mobile: permissions, data safety form, target API level, 64-bit, receipt
  validation, store review lead time.
- Web: HTTPS, no mixed content, save persistence, asset budget, browser matrix.
- Each row: pass / fail / N/A, evidence path, owner, date.

### 2. Store pages

- Short and long description, feature list, tags, languages, min/rec specs.
- Screenshots at each store's pixel sizes, capsule/key art, trailer.
- Price and currencies, release time with timezone, demo/branch, press keys.
- EULA, privacy URL, rating certificate, third-party notices.
- Check the live page logged out and in each regional variant.

### 3. Build pipeline

- Build from a tag on a clean checkout with locked dependencies.
- Version `MAJOR.MINOR.PATCH.BUILD`; tag the commit that produced the artifacts.
- One artifact per target: sha256, size, signature, symbols archived.
- Record commit, tag, toolchain versions, build id, artifact hashes.
- A dirty tree or an unsigned target is a hold, not a retry.

### 4. Crash reporting

- SDK starts before gameplay; consent where required; no PII.
- Symbols uploaded and matched to this build id; one test crash from a store
  build visible in the dashboard.
- Target under 0.1% session crash rate; alert route and on-call named.

### 5. Legal and privacy

- EULA and privacy policy live at the shipped URL.
- Third-party notices inside the build: engine, fonts, audio, SDKs.
- Age-rating questionnaires submitted, certificates received per territory.
- Asset and music licences on file; data collection disclosed per store.

### 6. Launch day

- Build live on every target; page renders with the right price and media.
- Fresh install and launch on real hardware per platform.
- Day-one patch deployed, or explicitly none.
- Telemetry and crash reporting receiving; community post out; support briefed.
- Press keys sent; on-call reachable; rollback written and walked once.

### 7. 72h watch

- Hourly: crash rate, install failures, store page, community reports.
- Daily: retention against baseline, reviews, refunds, server health.
- Report at 24h and 72h. Hotfix only from the release tag, minimal, QA
  regression, then backport to development.

### 8. No-publish rule

This pack, its selftest, and any agent reading it never publish or spend. A green
checklist stages the release; a human names the action and the target in an
explicit command (R4, E12) and owns ship or hold (G3).
