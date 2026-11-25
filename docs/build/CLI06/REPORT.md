# CLI06 - upgrade: report

Status: review-ready
Artifact: `staging/CLI06/artifact/tools/upgrade.mjs`
Scope: one dry-run/apply CLI and one black-box test driver. No commit.

## Summary

`upgrade` moves a game project from the version in `agent.lock.json` to the
framework version in `VERSION`. It reads the lock, indexes the bundled
`library/core` and `library/game` parts, and prints a per-part report with
status `same`, `changed`, `missing` or `removed`, plus added/removed line
counts. The default is a dry run; `--apply` writes changed and missing part
files, updates the lock, and writes `docs/UPGRADE-<from>-to-<to>.md` when at
least one part differs. Writes are per-file atomic (temp file plus rename).
`--json` emits one schema-1 object. Changed and missing parts lose an optional
`hash`, so CLI05 refreshes it instead of treating the upgraded file as diverged;
`same` and `removed` parts keep it. A downgrade is refused with exit 2 unless
`--force` is passed. A missing lock is exit 2; corrupt input or an unsafe part
path is exit 1. The tool has no network, git, publish or child-process calls and
writes only inside the game directory.

The artifact is 250 lines, exactly at the 250-line target. The test driver runs
85 black-box checks: 85 passed, 0 failed on Windows 11 with Node v26.13.0
(Node 18+ syntax).

## Size

| File | Lines | Characters | Words | Tokens (chars / 4) |
|---|---|---|---|---|
| `artifact/tools/upgrade.mjs` | 250 | 13,096 | 1,704 | ~3,274 |
| `test/run-checks.mjs` | 231 | 12,847 | 1,396 | ~3,212 |
| `JUSTIFICATION.md` | 111 | 10,069 | 1,680 | ~2,517 |
| `SOURCES.md` | 195 | 9,008 | 1,291 | ~2,252 |
| Total (four files) | 787 | 45,020 | 6,071 | ~11,255 |

`REPORT.md` is excluded from its own table. The 250-line target applies to the
artifact and is met. `SOURCES.md` is a nine-entry reference table, not prose;
its length is evidence, not implementation.

## Checks

All commands were run from the repository root on Windows 11 with Node
v26.13.0, targeting Node 18+. Forward slashes are shown for readability.

| Check | Result | How |
|---|---|---|
| Test driver | PASS | `node staging/CLI06/test/run-checks.mjs` -> 85 passed, 0 failed |
| Syntax | PASS | `node --check staging/CLI06/artifact/tools/upgrade.mjs` -> exit 0 |
| `--help` | PASS | exit 0; usage, all options and exit codes printed |
| Missing lock | PASS | exit 2 in human and JSON modes; lock is named |
| Corrupt lock / absent parts | PASS | exit 1; message names `agent.lock.json` |
| Dry run is the default | PASS | exit 0; part, lock and note unchanged on disk |
| Same version | PASS | exit 0; `already installed`; no note |
| Changed / missing / removed diff | PASS | statuses and summary counts match fixtures |
| Apply | PASS | new content written; lock `core` and part version updated |
| Stale hash invalidation | PASS | 64-hex hash on a changed part is absent after apply; file matches library source |
| Migration note | PASS | only on apply; named `docs/UPGRADE-0.2.0-to-0.3.0-dev.md`; table row matches |
| Second apply | PASS | idempotent no-op; no new note |
| Downgrade refusal and `--force` | PASS | exit 2 without force; forced run writes content, lock and note |
| Unsafe path / malformed part | PASS | exit 1 before any write; lock unchanged |
| JSON mode | PASS | one line, `schema: 1`, correct counts, note and error objects |
| Encoding | PASS | five files: 0 BOM, 0 CRLF, LF only, 0 replacement chars |
| Side effects | PASS | imports only `node:fs`, `node:path`, `node:url`; no network/git/child process |

## Reproduction

```sh
node staging/CLI06/test/run-checks.mjs
node --check staging/CLI06/artifact/tools/upgrade.mjs
node staging/CLI06/artifact/tools/upgrade.mjs --help
```

The test driver creates temporary framework and game trees, copies the artifact
to `<framework>/tools/upgrade.mjs`, writes locks and part files, and spawns the
tool with `process.execPath`. It removes its temporary roots on completion and
does not depend on a real project. Manual runs use the same shape:

```sh
node tools/upgrade.mjs ../my-game --to 0.3.0-dev
node tools/upgrade.mjs ../my-game --apply
node tools/upgrade.mjs ../my-game --json
```

## Coverage

| Area | Covered | Not covered |
|---|---|---|
| CLI | help, unknown option, extra positional, flag conflict, `--to` forms, bad/missing value | `--version`; combined short flags |
| Versions | same, newer, older, forced downgrade, prerelease target accepted, target override warning | Full prerelease precedence matrix; build metadata (`+sha`) |
| Lock | `core` and `version` fallback, array parts, malformed part, absent parts, corrupt JSON | Packs, migrations, schema version field |
| Diff | same, changed, missing, removed, added/removed counts, BOM/CRLF equality | Positional line diff, rename detection |
| Apply | changed and missing writes, lock `core` and part version, stale hash drop on a changed part, removed leaves | `upgraded` timestamp and unknown-key preservation (implemented, not separately asserted); hash retention for same/removed parts; delete/archive, rollback, whole-tree transaction |
| Note | path, title, row table, removed list, all-same suppression | Pipe/control-character escaping, multi-version notes, changelog links |
| Safety | missing lock, unsafe path, malformed part, no write on failure | Symlink traversal, read-only filesystem |
| Platform | Windows 11, Node 26, `path` module, UTF-8 LF files | POSIX host run (paths are built with `path`) |

## Open questions

Resolved in the integration review: `applyUpgrade` drops `hash` for changed and
missing parts, so CLI05 can refill it instead of treating the upgraded file as
diverged. `same` parts keep the hash and `removed` parts are returned untouched.

1. Skills are indexed only at `<dir>/SKILL.md`. A multi-file skill or a different
   entry-point name is invisible. Should the lock record the entry file, or
   should the index accept more names?
2. `--to` can differ from the bundled `VERSION`. Today the command warns and
   still copies the bundled parts. Should a mismatch be refused, or is a future
   release-fetching mode expected?
3. Removed parts stay on disk and keep their old version. Should `--apply`
   delete them, archive them under `docs/`, or continue to require a manual
   decision?
4. The lock does not record installed packs, so upgrade cannot add a part that
   was never installed. Does CLI05 `sync-agent` own additions, or should the
   lock gain a `packs` field before CLI06 is frozen?

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | 33 units in JUSTIFICATION; each names what breaks and a source; no duplicate of `new-project` or `status` |
| 2 | Function | PASS | Trigger, input, output, done, failure and scope are stated and exercised by 85 checks |
| 3 | Evidence | PASS | Exactly 9 repos (4 gamedev, 3 software, 2 AI-agent), stars 2026-11-25, licenses, verified quotes, synthesis, dead ends |
| 4 | Blueprint fit | PASS | CLI06/X03 path and flags; core, no engine import; IDs and exit codes match S05/CLI01 |
| 5 | Size | PASS | 250/250 lines; reference docs exceed one page by design and are noted above |
| 6 | Language | PASS | English artifacts, UTF-8 no BOM, LF, POSIX paths, Windows-safe names |
| 7 | Security | PASS | Local only; no secrets, network, publish, spend or git; writes limited to the game directory; path traversal checked |
| 8 | Testability | PASS | `run-checks.mjs` is self-contained and prints an actionable `FAIL` line with exit 1 |
| 9 | Integration | PASS | Stable `schema: 1`, blueprint paths/IDs, independent load; lock shape and pack gaps are documented |

## Known weaknesses

- Added/removed counts are multiset line differences, not a positional diff.
  A moved block can count as both added and removed.
- The index finds skills only through `SKILL.md`. Other entry names are skipped
  without a warning.
- `--to` is a label for the transition, not a source of files: parts always come
  from the bundled framework, and the warning says so.
- Apply is atomic per file, not across the tree. A failure after some writes
  leaves those files upgraded and the lock unchanged; there is no rollback.
- Removed parts are deliberately not deleted and keep their old version.
- Hash invalidation is asserted only for a changed part; retention for `same`
  and `removed` parts is implemented but not separately tested.
- No backup is made before overwrite. Recovery relies on version control, which
  the tool does not invoke.
- Tests ran on Windows only. POSIX syntax is used, but no Linux/macOS host was
  exercised.
- The lock format is provisional; strict validation was avoided so future fields
  do not break upgrade.

## Review

Review: accepted 2026-11-26
