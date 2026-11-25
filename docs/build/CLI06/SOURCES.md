# CLI06 - upgrade: sources

Nine repositories were read on 2026-11-25: four gamedev, three software, two
AI-agent. Stars are rounded shields.io values for that date. A quote marked
"verified" was read from the raw file at the path shown. No source code was
copied; only short quoted text and behavioral ideas are used.

## Gamedev

### 1. bevyengine/bevy - per-change migration notes

- URL: https://github.com/bevyengine/bevy
- Stars: ~50k (2026-11-25)
- Last commit: 2026-11-25
- License: Apache-2.0
- Artifact: `_release-content/migration-guides/` (58 per-change files) and
  `_release-content/migration_guides.md`
- Quote (verified): "When we make breaking changes to Bevy, we need to
  communicate them to users so their libraries and applications can be moved to
  the new Bevy version. To do this, we write and ship a migration guide for
  every major Bevy version."
- Borrowed: one note per breaking change, written next to the change, plus a
  template that keeps notes consistent. CLI06 writes one row per changed part
  in a single version-to-version note.
- Rejected: the ECS, plugin scheduling and engine code. Upgrade is a file
  operation and must not import an engine.

### 2. godotengine/godot-docs - decide before upgrading

- URL: https://github.com/godotengine/godot-docs
- Stars: ~5.9k (2026-11-25)
- Last commit: 2026-11-22
- License: GitHub reports "not identifiable by github" for this repository.
  Only the guide structure and one short quote are used; no text is copied.
- Artifact: `tutorials/migrating/upgrading_to_godot_4.rst`
- Quote (verified): "Before beginning the upgrade process, it's worth thinking
  about the advantages and disadvantages that upgrading would bring to your
  project."
- Borrowed: the upgrade guide opens with whether to upgrade, then gives an
  ordered path. CLI06 makes the dry run the default so the decision comes before
  the write.
- Rejected: the documentation site and engine-specific API list.

### 3. phaserjs/phaser - highest impact first

- URL: https://github.com/phaserjs/phaser
- Stars: ~41k (2026-11-25)
- Last commit: August 2026
- License: MIT
- Artifact: `changelog/v4/4.0/MIGRATION-GUIDE.md` (the root `CHANGELOG.md` is
  an index, not the guide)
- Quote (verified): "This guide covers everything you need to change when
  upgrading a Phaser v3 project to Phaser v4. It is organized from
  highest-impact changes to smaller details, so you can work through it
  top-to-bottom."
- Borrowed: order the report so the largest changes are visible first; a
  reviewer with limited time should see the risky rows before the one-line
  edits.
- Rejected: engine code and version-specific API knowledge. Core CLI stays
  engine-agnostic.

### 4. libgdx/libgdx - name the replacement

- URL: https://github.com/libgdx/libgdx
- Stars: ~26k (2026-11-25)
- Last commit: 2026-11-19
- License: Apache-2.0
- Artifact: `CHANGES`
- Quote (verified): `- [BREAKING CHANGE] Android: Made
  AsynchronousAndroidAudio the default Android Audio backend for better
  performance. To check for error when playing use the new Sound#hasFailed()
  instead of checking for "-1" return values (see #7836).`
- Borrowed: mark a breaking change with the action that replaces the old
  behavior. CLI06's note shows status, added/removed counts and the path, so a
  changed row says what to review, not just that bytes differ.
- Rejected: the Java engine, audio backend and build system.

## Software

### 5. helm/helm - dry run as a strategy

- URL: https://github.com/helm/helm
- Stars: ~30k (2026-11-25)
- Last commit: 2026-11-24
- License: Apache-2.0
- Artifact: `pkg/action/upgrade.go`
- Quote (verified, comment at lines 81-82): "DryRunStrategy can be set to
  prepare, but not execute the operation and whether or not to interact with
  the remote cluster"
- Borrowed: dry run is a first-class mode that prepares and validates the same
  plan as execution, not a second code path with a vague summary.
- Rejected: Kubernetes, releases, revisions and network access. CLI06 has no
  remote cluster and no server.

### 6. Homebrew/brew - `--dry-run` and `--force`

- URL: https://github.com/Homebrew/brew
- Stars: ~50k (2026-11-25)
- Last commit: 2026-11-25
- License: BSD-2-Clause
- Artifact: `Library/Homebrew/cmd/upgrade.rb` and `docs/Manpage.md`
- Quote (verified, upgrade manpage): "`-n`, `--dry-run`: Show what would be
  upgraded, but do not actually upgrade anything."
- Borrowed: a concise dry-run report and an explicit `--force` for the
  otherwise-refused case. CLI06's `--dry-run` names the files that would change
  and the note that would be written.
- Rejected: the package manager, taps, downloads and dependency resolution.

### 7. npm/node-semver - precedence, including prerelease

- URL: https://github.com/npm/node-semver
- Stars: ~5.5k (2026-11-25)
- Last commit: November 2026
- License: ISC
- Artifact: `README.md`
- Quote (verified): "Prints valid versions sorted by SemVer precedence"; from
  "Prerelease Tags": "If a version has a prerelease tag (for example,
  `1.2.3-alpha.3`) then it will only be allowed to satisfy comparator sets if
  at least one comparator with the same `[major, minor, patch]` tuple also has a
  prerelease tag."
- Borrowed: exact SemVer ordering, including the rule that a prerelease sorts
  before its release. This matters because the framework `VERSION` is
  `0.3.0-dev`, not `0.3.0`.
- Rejected: ranges, comparator sets, coercion and the CLI. Upgrade compares two
  concrete versions.

## AI-agent

### 8. microsoft/autogen - one guide for a major jump

- URL: https://github.com/microsoft/autogen
- Stars: ~62k (2026-11-25)
- Last commit: November 2026
- License: CC-BY-4.0 according to GitHub. The metadata is unusual for a code
  repository; only a short quote and the guide structure are used.
- Artifact:
  `python/docs/src/user-guide/agentchat-user-guide/migration-guide.md`
- Quote (verified): "This is a migration guide for users of the `v0.2.*`
  versions of `autogen-agentchat` to the `v0.4` version, which introduces a new
  set of APIs and features. The `v0.4` version contains breaking changes.
  Please read this guide carefully."
- Borrowed: a single guide for a major-version jump, plus a stated support
  window (the older branch is still maintained). CLI06 writes one note per
  from/to pair instead of scattering fragments.
- Rejected: the agent runtime and API migration content.

### 9. continuedev/continue - one-time migration of user config

- URL: https://github.com/continuedev/continue
- Stars: ~37k (2026-11-25)
- Last commit: July 2026
- License: Apache-2.0
- Artifact: `core/config/migrateSharedConfig.ts`
- Quote (verified): "This migration function eliminates deprecated values from
  the json file And writes them to the shared config"; the file header says the
  one-time script is expected to be removed later.
- Borrowed: migrate user-owned files once, merge instead of replacing, and make
  whether anything was affected visible. CLI06 preserves unknown lock keys and
  reports whether the note was written.
- Rejected: the IDE extension, config schema and telemetry.

## Synthesis

The sources agree on four rules that shaped CLI06. First, a dry run must use the
same plan as the real run (Helm, Homebrew), so the tool computes rows once and
only conditionally writes them. Second, a migration record is written next to
the change and names the replacement action (Bevy, libGDX), so the note lists
every non-same part with its path and status. Third, the reader decides before
the write (Godot), so `--dry-run` is the default and the note exists only after
`--apply`. Fourth, version order is SemVer order (node-semver), including
prereleases, because the bundled version is `0.3.0-dev`.

## Dead ends

- `bevyengine/bevy` has no `release-content/` or `RELEASES.md`; the real paths
  are `_release-content/migration-guides/` and `_release-content/migration_guides.md`.
- `Homebrew/brew` returned 404 for `Library/Homebrew/cmd/upgrade.rb` on the
  `master` branch but 200 on `HEAD`; branch names are not stable artifact paths.
- `microsoft/autogen/MIGRATION.md` and
  `continuedev/continue/core/config/migrateConfig.ts` returned 404; the working
  files are the paths listed above.
- jsDelivr directory listings returned zero files for the large repositories
  (bevy, phaser, godot-docs, continue), so they were not used as evidence.
- GitHub's tree HTML did not expose file names without JavaScript. The REST
  `contents` endpoint worked with a `User-Agent` header.

## License note

All nine sources are permissive or readable for reference: Apache-2.0 (four:
bevy, libgdx, helm, continue), MIT (one: phaser), BSD-2-Clause (one: brew), ISC
(one: node-semver), CC-BY-4.0 (one: autogen), and one repository whose license
GitHub could not identify (godot-docs). Only short, attributed quotes and
behavioral ideas were used; no source code, assets, license files or
documentation text were copied. The implementation has no runtime dependency on
any of these repositories.
