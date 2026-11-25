# X03: Versioning

Version covers the framework, its parts, and the game; in a game, one file
answers all three: `agent.lock.json`.

## Semver

`MAJOR.MINOR.PATCH`, prerelease after `-`, precedence per section 11. A released
number is immutable, so a fix ships as a new number (section 3).

- Framework: `VERSION` at the repo root (`0.3.0-dev` while building); the release
  tag `v0.3.0` points at it; a tag is not a version.
- `0.x` may change anything (section 4), so a MINOR bump already owes a MAJOR's
  migration note; `1.0.0` is declared when a game ships on it.
- A part is `0.x` until one game used it through a gate and its check passes: a
  rule or skill test, an eval. Then `1.0.0`. Changing that output is a MAJOR; so
  is merging or replacing a part, which R6 asks of every addition.
- A game repo has no `VERSION`: its own number is `version`, the framework it was
  built from is `core`.

## agent.lock.json

```json
{
  "version": "0.1.0",
  "core": "0.3.0",
  "parts": [
    { "id": "R1", "kind": "rule", "version": "0.3.0",
      "path": ".opencode/rules/R1-build-is-truth.md", "source": "library/core",
      "hash": "<sha256>", "installed": "2026-11-25" }
  ]
}
```

- A part record has `id`, `kind`, `path`, `version`, `source`, `hash`,
  `installed`; an engine pack adds `engineRange` (N00).
- `id` is the blueprint ID and survives a rename. `source` is the tree the file
  came from (`library/core`, `library/packs/…`, a memory repo); `installed` is
  the ISO date of the last copy.
- `hash` is sha256 of the installed bytes. Absent means no sync has checked the
  file: `unknown`, not healthy. Only a sync writes it.
- One source of truth: no second list of installed parts, no `VERSION` copy.

## Upgrade

CLI06. Default is a dry run: one row per part — `same`, `changed`, `missing` or
`removed` — with line deltas, nothing written. `--apply` rewrites changed files,
the lock, and `docs/UPGRADE-<from>-to-<to>.md`.

- A changed or missing part loses `hash` for CLI05 to refill; `same` and
  `removed` keep theirs.
- A removed part stays on disk at its old version, listed under **Left on disk**.
  Deleting it is a separate prune pass, not implemented in v0.3, and never part
  of an apply.
- No write before a diff: the dry run is the diff; `sync-agent pull` refuses
  `modified` or `diverged` without `--force`; a downgrade needs it too.

## Doctor

CLI07 compares lock and disk and never writes: an active file the lock does not
list, a locked part whose file is gone, a lock missing a field a tool needs,
encoding, path and link faults. Bytes and sources are CLI05's: `stale`,
`modified`, `diverged`, `missing-source`. Exit `0` healthy, `1` findings, `2`
usage; `--strict` counts warnings as findings.

## Changelog and migration

- Every breaking change gets a changelog line naming what breaks and what to do
  instead; a silent one is a bug.
- An older lock is read, not rejected; the next write emits the current shape.
- An upgrade changes content, never the path a game already links to.

## Engine packs

A pack declares `engineRange`, installs only when the pinned engine satisfies it,
and E11 re-checks the pair (N00).

- `0.x` is beta: any bump may break, and the game docs say beta.
- `1.0.0` needs a passing `selftest` against the pinned version (N01); until
  then the pack may be installed, never called stable.

## Check

`new-project` a scratch repo; CLI07 exits 0. Delete a locked file: exit 1, naming
it. `upgrade --dry-run`: all `same`, nothing written.

IDs used: CLI05, CLI06, CLI07, N00, N01, E11, R6.
