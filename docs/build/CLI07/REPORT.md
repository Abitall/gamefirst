# CLI07 - doctor: report

Status: review-ready
Artifact: `staging/CLI07/artifact/tools/doctor.mjs`
Scope: one read-only CLI, one black-box test driver. No commit.

## Summary

`doctor` reads a game repository and reports health findings without writing
anything: broken relative links in `AGENTS.md`/`README.md`, missing or malformed
`agent.lock.json` parts, missing `.opencode` files and cited paths, BOM/CRLF
encoding faults, Windows backslashes in paths, leftover `{{` placeholders,
`project.config.json` without a verify recipe, and unsupported permission
actions or effects in `opencode.json`. The default view is an aligned human
report; `--json` emits one object with `schema: 1`. Exit codes are 0 (healthy),
1 (findings, or warnings under `--strict`) and 2 (usage). The tool imports only
read-only `node:fs` calls and `node:path`, with no writes, network, dependencies
or fix mode. It runs on Node 18+ on Windows and POSIX; output paths are always
repo-relative POSIX.

The 250-line target was met exactly. The test suite passes 58/58 checks.

## Size

| File | Lines | Characters | Words | Tokens (chars / 4) |
|---|---|---|---|---|
| `artifact/tools/doctor.mjs` | 250 | 14,257 | 1,737 | ~3,564 |
| `test/run-checks.mjs` | 204 | 14,372 | 1,474 | ~3,593 |
| `JUSTIFICATION.md` | 69 | 9,372 | 1,578 | ~2,343 |
| `SOURCES.md` | 179 | 8,348 | 1,231 | ~2,087 |

Artifact target: 250 lines. Actual: 250. The file has no dependencies and is
copied as one unit into `tools/`; no install step is required.

## Checks

All commands were run from the repository root on Windows with Node v26.13.0
(target Node 18+). Forward slashes are shown here for readability.

| Check | Result | How |
|---|---|---|
| Test driver | PASS | `node staging/CLI07/test/run-checks.mjs` -> 58 passed, 0 failed |
| Syntax | PASS | `node --check staging/CLI07/artifact/tools/doctor.mjs` -> exit 0 |
| `--help` | PASS | exit 0, usage, checks, options and exit codes printed |
| Healthy repo, human view | PASS | exit 0, `result: healthy (0 warning(s))` |
| Healthy repo, `--json` | PASS | `schema: 1`, `ok: true`, empty `errors`/`warnings`, exit 0 |
| Broken link | PASS | exit 1, `AGENTS.md:3 docs/missing.md -> not found` |
| Missing `agent.lock.json` | PASS | exit 1, `agent.lock.json not found; CLI01 writes it` |
| Missing lock part | PASS | exit 1, `missing part rule-core: .opencode/rules/core.md` |
| Lock path safety | PASS | backslash, absolute and `..` paths rejected |
| Duplicate lock part | PASS | warning, exit 0; exit 1 with `--strict` |
| Missing `.opencode/` | PASS | exit 1, directory-not-found finding |
| Orphan `.opencode/**/*.md` | PASS | warning; exit 1 with `--strict` |
| Unsupported permission action | PASS | exit 1, `action "write" is unsupported and ignored` |
| Unsupported permission effect | PASS | exit 1, `effect "maybe" is not allow, ask or deny` |
| Missing verify recipe | PASS | exit 1, `verify recipe is missing or empty` |
| BOM / CRLF / placeholder | PASS | each exits 1 with a line-numbered finding |
| Backticked Windows path | PASS | exit 1, backslashes reported under `paths` |
| Unknown flag / missing dir / two dirs | PASS | each exits 2 with a stderr message |
| No writes | PASS | SHA-256 of tree and artifact identical before/after a strict JSON run |
| Read-only imports | PASS | static scan: no write/append/unlink/rm/mkdir/rename/copy APIs, no network APIs |
| Encoding of staging files | PASS | 0 BOM, 0 CRLF, LF only |
| Template integration | PASS | running on `template/` exits 1 with the `{{GAME_NAME}}` finding |

## Reproduction

```sh
node staging/CLI07/test/run-checks.mjs
node staging/CLI07/artifact/tools/doctor.mjs <game-dir>
node staging/CLI07/artifact/tools/doctor.mjs <game-dir> --json
node staging/CLI07/artifact/tools/doctor.mjs <game-dir> --strict
node staging/CLI07/artifact/tools/doctor.mjs --help
```

Observed healthy output (root abbreviated to `<good>`):

```text
gamefirst doctor  <good>
files 6 | errors 0 | warnings 0 | strict off
result: healthy (0 warning(s))
```

Observed broken-link output (exit 1):

```text
gamefirst doctor  <bad-link>
files 6 | errors 1 | warnings 0 | strict off
error   links       AGENTS.md:3                  docs/missing.md -> not found
result: 1 error(s), 0 warning(s)
```

Observed `--json` for the same repo (root abbreviated):

```json
{"schema":1,"ok":false,"strict":false,"root":"<bad-link>","files":6,"errors":[{"level":"error","check":"links","file":"AGENTS.md","line":3,"message":"docs/missing.md -> not found"}],"warnings":[]}
```

## Coverage

| Area | Covered | Not covered |
|---|---|---|
| Links | relative links in `AGENTS.md`/`README.md`, fragments, schemes, query strings, angle targets, backslash targets | links in other Markdown files; HTTP status; image sources |
| Lock | file presence, `version`/`core` semver, parts array and fields, kind allowlist, duplicates, path safety, existence | `created`, `core` compatibility with the tool, install ordering |
| Opencode | `.opencode/` presence, orphan `.md`, `instructions` paths and one-level globs, permission rows in array and object form | full OpenCode schema, non-Markdown assets, `agent`/`model` settings |
| Config | `project.config.json` presence, valid JSON, non-empty `verify.recipe` | `budgets`, `engine` shape, recipe execution |
| Encoding | BOM and any `\r` across 16 text extensions | invalid UTF-8 byte sequences, encoding of binary assets |
| Paths | link targets, backticked path spans, lock paths, instruction patterns | path-like strings in code literals or plain prose |
| Placeholders | any `{{` in scanned text | a known-placeholder list; custom `{{...}}` syntax |
| CLI | help, human, JSON, strict, default cwd, exit codes | `--version`; combined short flags |
| Platform | Windows 11, Node 26, `node:path` output | POSIX host run (paths are produced POSIX-style) |
| Integration | template tree smoke check; CLI01-shaped lock fixture | a fully assembled tree with real CLI01/X03 output |

## Open questions

1. `agent.lock.json` includes `created`, which doctor currently ignores. Should a
   missing or invalid `created` timestamp warn, or is it metadata outside the
   health contract?
2. Orphan detection covers `.opencode/**/*.md` only. Skills and crews may ship
   assets; should any unlocked file under `.opencode/` warn, or only Markdown?
3. The blueprint scopes link checking to `AGENTS.md` and `README.md`. Should
   `docs/**/*.md` be checked too, or does that belong to a later docs linter?
4. A missing `README.md` is a warning because it is advisory onboarding. Should
   it be an error once the template guarantees the file?
5. Permission rows with unknown keys warn. Should they be errors, given the
   template uses only `action`, `resource` and `effect`?
6. Should `--json` carry a tool/core version alongside `schema: 1` so CI can pin
   behavior, or is the schema number enough?

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | Every block and check has why/without/source in `JUSTIFICATION.md`; no duplicate validator exists |
| 2 | Function | PASS | Trigger, input, output, done, failure and scope are stated and covered by black-box checks |
| 3 | Evidence | PASS | 9 repos (4 gamedev / 3 SWE / 2 AI-agent), stars 2026-11-25, licenses, quotes, dead ends |
| 4 | Blueprint fit | PASS | CLI07 scope, read-only, POSIX paths, exit 0/1/2, `schema: 1`; BATCH-10 gaps intentionally not required |
| 5 | Size | PASS | 250/250 lines, zero dependencies, no install step |
| 6 | Language | PASS | English artifacts, UTF-8 no BOM, LF, POSIX output paths, no machine-specific paths |
| 7 | Security | PASS | Read-only, no network, no secrets, no destructive or publishing actions |
| 8 | Testability | PASS | 58 black-box checks, no framework, actionable failures, 0/1/2 exit codes |
| 9 | Integration | CONCERNS | Stable names and schema; `agent.lock.json` and permission shapes are owned by CLI01/OpenCode and still provisional |

## Known weaknesses

- The file cap stops at 5,000 scanned files silently; a very large repo could be
  only partially checked with no notice.
- Invalid UTF-8 bytes decode to replacement characters; only BOM and CRLF are
  detected, not encoding validity.
- `instructions` globs match the last segment in one directory; `**` patterns are
  not expanded.
- Link checking is limited to the two entry documents, as the blueprint scopes.
- The suite ran only on Windows. POSIX output is constructed with `node:path`,
  but no Linux/macOS host exercised it.
- Running on `template/` fails by design (placeholder, missing lock/config);
  that is the expected output before N00 and CLI01 run.

## Review

Review: pending
