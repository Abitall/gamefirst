# CLI06 - upgrade: justification

Status: review-ready
Artifact: `staging/CLI06/artifact/tools/upgrade.mjs`
Scope: one dry-run/apply CLI, one black-box test driver. No framework code,
template, engine pack or game runtime is modified.

## Why this unit exists

A game created by `new-project` has an `agent.lock.json` but no `VERSION`; the
framework version lives in the lock's `core` field. Without an upgrade command,
the only way to move a project to a newer framework is to copy files by hand,
which loses the record of what changed, silently overwrites local edits, and
leaves the lock lying. CLI06 is the X03 upgrade path: compare the locked version
with the bundled `VERSION`, show a per-part diff, and only write when asked.

The default is a dry run, matching the blueprint's "dry-run, diff, and apply"
order. The command refuses to guess: a missing lock is a usage error, not an
empty project to initialize. The migration note is written only on `--apply`,
so a dry run cannot leave documentation that claims a change happened.

## Unit-by-unit justification

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| CLI entry, `--help`, usage block, exit codes | One documented entry point; scripts need stable 0/1/2 results | Users guess flags; a refusal is indistinguishable from success | blueprint CLI06/X03; S05 exit-code convention; `eslint` CLI docs |
| Positional game directory, default `.` | Upgrade targets an existing game, not the framework checkout | The command would upgrade its own framework or require a config file | CLI01 `new-project` call shape; CLI02 `status` |
| `--to <version>` and `--to=<version>` | An operator may prepare a target different from the bundled files | Only the bundled version could ever be named; notes and lock could not be staged | Helm `pkg/action/upgrade.go`; Homebrew upgrade manpage |
| `--dry-run` as the default | X03 asks for a dry run before writes; the safe action should not need a flag | A bare invocation would modify files; review becomes impossible | Helm `DryRunStrategy`; Homebrew `--dry-run` |
| `--apply` and the mutual-exclusion check | The only path that writes parts, lock and note; contradictory flags must fail | Writes happen by accident, or intent is ambiguous | Helm prepare/execute split; rubric 7 |
| `--force` for downgrades | Downgrades are legal only after an explicit decision | A typo in `--to` silently reverses a project | Homebrew `--force`; semver precedence |
| `--json` (schema 1) | CI and other CLIs need one machine-readable object, not a parsed table | Consumers scrape spacing; errors have no stable shape | `node-semver` precedence output; rubric 9 |
| Missing lock exits 2 before root discovery | A game directory without a lock is misuse, not an upgrade target | An empty directory looks like a successful no-op or creates stray files | CLI01 lock contract; BLUEPRINT CLI06 |
| Framework root walk-up and `VERSION` read | Parts must come from the framework the tool ships with | A synced copy cannot find `library/`; a wrong root copies unrelated files | CLI01 `findRoot`; blueprint X03 |
| Semver parse and compare, including prerelease | `VERSION` is `0.3.0-dev`; string comparison would put it before `0.3.0` | Upgrade/downgrade decisions and note names are wrong | `npm/node-semver` README; blueprint X03 |
| Same-version no-op | Re-running an upgrade after apply must be harmless | A second apply rewrites files and invents a note | Homebrew idempotent upgrade; rubric 2 |
| Downgrade refusal unless `--force` | Protects a project from an accidental older target | Data loss and a lock that claims an older framework | `node-semver` precedence; blueprint X03 |
| Warning when `--to` differs from bundled `VERSION` | Parts always come from the bundled framework, so the discrepancy must be visible | The lock could claim a version whose files were never shipped | Helm target revision warning; rubric 2 |
| Lock read, `core` fallback to `version`, parts array check | The lock is the only record of the installed version and part paths | Upgrade has no starting point or silently skips all parts | CLI01 lock writer; CLI02 lock reader |
| Part shape and path safety checks | A hand-edited lock must not write outside the game directory | A crafted `../../` path overwrites arbitrary files | rubric 7; CLI01 `inside()` |
| Library index over seven sources | Parts live in `library/core` and `library/game`; IDs are not all in filenames | Upgrade cannot find a source and reports every part removed | blueprint layers/IDs; library layout |
| Blueprint name-to-ID map and `SKILL.md` lookup | Agents, skills and crews use names in the blueprint, directories on disk | `partner` or `verify` would never match `A01` or `S02` | CLI01 `blueprintIds`/`partId`; blueprint tables |
| Statuses `same`, `changed`, `missing`, `removed` | The four cases need different actions: keep, write, restore, review | All non-equal cases collapse into one vague "diff" | Helm diff/upgrade report; Bevy migration notes |
| Added/removed line counts | A reviewer needs the size of a change before applying it | A one-line and a full rewrite look identical | `git diff --stat` behavior; Phaser impact ordering |
| Per-file atomic write | A failed write must not truncate a working part or the lock | A crash leaves a half-written skill and an unusable project | CLI01 atomic writer; rubric 7 |
| Lock update: `core`, part versions, `upgraded`, unknown keys kept | The lock must describe what is now installed without losing future fields | The next run repeats the upgrade; custom lock data disappears | CLI01 lock shape; X03 |
| Drop `hash` for changed or missing parts | CLI05 uses the hash to separate stale from diverged; after a rewrite the old hash is false | CLI05 reports a freshly upgraded file as diverged, or never records the new hash | CLI05 integration review; lock shape |
| Migration note `docs/UPGRADE-<from>-to-<to>.md` | X03 requires a record of the upgrade, written only when something changed | Users cannot review what was touched after the terminal scrolls | Bevy migration guides; Godot upgrade path; blueprint CLI06 |
| Removed parts stay on disk | A part gone from the framework may still be referenced by the game | Silent deletion destroys local work | Bevy per-change notes; rubric 7 |
| BOM and CRLF normalization before compare | Windows editors add both; a byte compare would report false changes | Every file looks changed on a Windows checkout | CLI01/CLI02 `readText`; rubric 6 |
| Human error line plus hint; JSON error object | Failures must name the file and the next action | Users see a stack trace; scripts cannot branch on the error | Helm/Homebrew CLI behavior; rubric 8 |
| No network, git, child process, publish or framework writes | Upgrade is a local, reviewable file operation | Runs become non-reproducible and can push or publish without consent | blueprint non-goals; rubric 7 |
| `test/run-checks.mjs` with 85 checks | Behavior on Windows must be evidence, not a claim | Regressions in dry-run, lock, note or hash handling go unnoticed | rubric 8; CLI01/CLI02 test pattern |

The tool does not duplicate `new-project` (which installs parts) or `status`
(which reports state). It reads the same lock and library, but its job is the
transition between two versions. A shorter script that only rewrote the lock
was rejected: it would claim an upgrade without touching any part file.

## Deliberate omissions

- No pack installation. The lock does not record installed packs, so upgrade
  cannot know which optional parts a project wants. Adding them belongs to a
  future sync command, not to a version transition.
- No deletion of removed parts. They are listed in the note under "Left on
  disk"; deletion needs a human decision and a backup.
- No rollback or tree-wide transaction. Each file is atomic; a failure midway
  leaves earlier files upgraded and the lock untouched, which the error message
  exposes. A journal was rejected as too much state for one command.
- No network, changelog fetch, git commit, package publish or framework write.
  The tool only reads the bundled library and writes inside the game directory.
- No full lock schema validation beyond `parts`, `id`, `kind` and `path`. X03's
  shape is still provisional; strict validation would reject legal future
  fields.

## Size

| Measure | Value | Target | Verdict |
|---|---|---|---|
| Lines | 250 | 250 | at target |
| Characters | 13,096 | - | - |
| Words | 1,704 | - | - |
| Tokens (chars / 4) | ~3,274 | - | - |

## Consistency check

- Exit codes follow S05/CLI01: 0 success or no-op, 1 failure, 2 misuse/refusal.
- A changed or missing part loses `hash`; same and removed parts keep it, so
  CLI05 can refresh only the hashes whose files changed.
- Paths and IDs come from the blueprint (`library/core`, `library/game`,
  `agent.lock.json`, `docs/UPGRADE-*`); no project-specific content is present.
- Core stays engine-agnostic: no engine import and no engine version check.
- The note is English, like other generated artifacts; user-facing chat remains
  Russian by project rule.
- `--dry-run` writes nothing, including the note; only `--apply` writes.

## Risks and limits

- Line counts are multiset differences, not a positional diff. They are
  order-insensitive; the note labels them Added/Removed without claiming a
  positional diff, and the limitation is stated here and in REPORT.
- Hash invalidation is tested for a changed part only. Retention for `same` and
  `removed` parts is implemented but not separately asserted.
- Skills are found only at `<dir>/SKILL.md`. A multi-file skill or another entry
  name is invisible until the index learns it.
- `--to` can differ from the bundled `VERSION`; the command warns and still
  copies the bundled parts. It cannot fetch the requested release.
- The lock format is provisional and does not track packs; additions are out of
  scope.
- Tests ran on Windows with Node 26 against Node 18+ syntax. POSIX paths are
  produced by `path`, but no Linux/macOS host was exercised.
