# X03 - versioning: sources

Three sources: two external, one accepted internal. Thin part rule: two external,
one internal, a consistency table of the IDs called, and one check that the
document resolves.

### 1. Semantic Versioning 2.0.0 - version grammar and the 0.x rule - not a repo

- URL: https://semver.org/ (read 2026-11-25)
- Stars: not a repo
- Last commit: not a repo; the page is the frozen 2.0.0 text by Tom Preston-Werner
- License: CC BY 3.0 ("Creative Commons - CC BY 3.0"), attribution to the author
- Artifact: `VERSIONING.md`, `## Semver`
- Quote (verified, section 4): "Major version zero (0.y.z) is for initial
  development. Anything MAY change at any time. The public API SHOULD NOT be
  considered stable."
- Quote (verified, section 3): "Once a versioned package has been released, the
  contents of that version MUST NOT be modified."
- Quote (verified, FAQ): "prefixing a semantic version with a 'v' is a common way
  ... in which case 'v1.2.3' is a tag name and the semantic version is '1.2.3'."
- Borrowed: the three-part grammar and precedence by section number instead of a
  copied table; immutability of a released number (a fix is a new number); 0.x
  latitude, turned into "a MINOR owes a MAJOR's migration note"; tag is not a
  version; 1.0.0 declared when a game ships on it, from the FAQ's production test.
- Rejected: the MUST/SHOULD normative voice (X03 states the consequence instead);
  the full precedence table (one link, section 11); identifiers and build metadata
  (no tool reads them); "1.0.0 defines the public API" as a definition, since the
  artifact needs the trigger, not the definition.

### 2. npm - package-lock.json reference - the lock as one generated record - not a repo

- URL: https://docs.npmjs.com/cli/v11/configuring-npm/package-lock-json (read
  2026-11-25; page states npm 11.21.3, "Last edited Oct 4, 2025")
- Stars: not a repo
- Last commit: not a repo (documentation page)
- License: no license stated on the page; the npm CLI itself is Artistic-2.0. One
  sentence is quoted as evidence, nothing is copied.
- Artifact: `VERSIONING.md`, `## agent.lock.json` and `## Changelog and migration`
- Quote (verified): "It describes the exact tree that was generated, such that
  subsequent installs are able to generate identical trees, regardless of
  intermediate dependency updates."
- Quote (verified): "npm will always attempt to get whatever data it can out of a
  lockfile, even if it is not a version that it was designed to support."
- Quote (verified, "Handling Old Lockfiles"): "When npm detects a lockfile from
  npm v6 or before ... it is automatically updated"
- Borrowed: the lock is committed and is the record of what is actually installed;
  a per-entry integrity digest as the anti-drift check; an older lock is read, not
  rejected, and the next write emits the current shape ("read old, write current").
- Rejected: integrity as an SRI `sha512-<base64>` string (CLI05 fixes plain sha256
  hex); the `lockfileVersion` integer (top-level `version` already belongs to the
  game, and CLI06 spreads unknown fields, so a second schema number would be carried
  and never validated); the dependency-tree model (parts have no dependencies).

### 3. `tools/upgrade.mjs` - CLI06, accepted in batch 11 - internal

- URL: `tools/upgrade.mjs` in this repo (no remote)
- Stars: not a repo
- Last commit: accepted with batch 11, case recorded in `staging/CLI06/REPORT.md`
- License: same as this repository
- Artifact: `VERSIONING.md`, `## Upgrade`, and the "Left on disk" rule that mirrors
  the tool's migration note
- Quote (verified): `const { hash, ...rest } = part;` followed by
  `return status === 'same' ? { ...part, version: to } : { ...rest, version: to };`
- Borrowed: the four statuses `same`, `changed`, `missing`, `removed`; dry run as
  the default; hash dropped on changed and missing; removed parts left in place;
  `docs/UPGRADE-<from>-to-<to>.md`.
- Rejected: restating its flag help and exit codes (CLI06 keeps that); the
  `upgraded` timestamp (a fact of one run, not a rule); its per-file atomic write,
  which is an implementation detail X03 must not fix.

## Synthesis

| ID | X03 calls it for | Resolves to | Status |
|---|---|---|---|
| CLI05 | refilling a dropped `hash`; byte and source status | `tools/sync-agent.mjs` | accepted |
| CLI06 | dry run, apply, Left on disk, downgrade refusal | `tools/upgrade.mjs` | accepted |
| CLI07 | lock vs disk, exit codes, `--strict` | `tools/doctor.mjs` | accepted |
| N00 | `engineRange`, pack manifest fields | `library/engines/CONTRACT.md` | present; `staging/N00` delivered, not assembled |
| N01 | pack `selftest` | `library/engines/phaser` | dir present; `staging/N01` not started |
| E11 | pinned pack plus selftest at verify | `docs/V0.3-BLUEPRINT.md:211` | in blueprint |
| R6 | replacement or merge as the shape of addition | `docs/V0.3-BLUEPRINT.md:141` | in blueprint |

Every ID in the artifact is in this table; nothing else is cited by number.

## Dead ends

- **Keep a Changelog** (keepachangelog.com): the duty is one line per breaking
  change plus a migration note, and CLI06 already writes the note beside the change.
  A second document format would be a template X03 does not own, and a fourth source
  would push a thin part toward padding. Not counted as a source.
- **Commit pins or submodules**: blueprint non-goal. A commit field would need a
  fetch at install, and no tool reads it.
- **`lockfileVersion` as a field**: see source 2, rejected. It illustrates the very
  problem the artifact forbids: a value that is carried but never checked.

## License note

semver.org text is CC BY 3.0: three short quotations with attribution, no
reproduction. npm docs: no license stated on the page, so one sentence is quoted
as evidence and nothing is copied. The internal source is under this repository's
license.
