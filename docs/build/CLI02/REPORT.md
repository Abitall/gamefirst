# CLI02 - status: report

Status: review-ready
Artifact: `staging/CLI02/artifact/tools/status.mjs`
Scope: one read-only CLI, one test driver and fixtures. No commit.

## Summary

`status` reads `STATE.md`, `BACKLOG.md`, `project.config.json` and
`agent.lock.json` from a game directory and prints one snapshot: phase, mode,
active parts, next action, blockers, open questions, gate state, autonomy,
backlog, project, parts and anything missing. The default view is a fixed-label
human report; `--json` emits one object with `schema: 1` for machines. Exit
codes are 0 (complete), 1 (STATE missing/incomplete or unparsable JSON) and 2
(usage). The tool is read-only: it imports `readFileSync`, `readdirSync`,
`statSync` and `path` helpers only, with no writes, network or dependencies.
It runs on Node 18+ under Windows and POSIX, and a missing optional file is
reported as `missing`, not an error.

The 250-line target was not met: 296 lines. The overrun and why it was not cut
are recorded below.

## Size

| File | Lines | Characters | Words | Tokens (chars / 4) |
|---|---|---|---|---|
| `artifact/tools/status.mjs` | 296 | 11,389 | 1,368 | ~2,847 |
| `test.mjs` | 125 | 6,170 | 620 | ~1,543 |
| `JUSTIFICATION.md` | 94 | 6,063 | 1,020 | ~1,516 |
| `SOURCES.md` | 165 | 7,353 | 1,062 | ~1,838 |

Artifact target: 250 lines. Actual: 296, over by 46 (+18%). Removing 46 lines
would remove the case-insensitive lookup, the inline-key parser fallback, or
one renderer. Those are the parts that make the command work on the repositories
the blueprint describes. The tool was kept as one copyable file with no install
step; splitting it was rejected. The overshoot is a deliberate trade, not an
oversight.

## Checks

All commands were run from the repository root on Windows with Node v26.13.0
(target Node 18+). Forward slashes are shown here for readability.

| Check | Result | How |
|---|---|---|
| Test driver | PASS | `node staging/CLI02/test.mjs` -> 57 passed, 0 failed |
| Syntax | PASS | `node --check staging/CLI02/artifact/tools/status.mjs` -> exit 0 |
| `--help` | PASS | exit 0, usage, options and exit codes printed |
| Full fixture, human view | PASS | exit 0, every row populated |
| Full fixture, `--json` | PASS | one line, `schema: 1`, `ok: true`, exit 0 |
| Empty directory | PASS | exit 1, `STATE.md not found`, three `missing` files |
| Broken JSON | PASS | exit 1, `project.config.json: Unexpected end of JSON input` |
| Autonomous without contract | PASS | exit 1, `R10 requires at least goal, done and stop` |
| Blocked project | PASS | exit 0, `BLOCKING - no API key for the asset pipeline` |
| Lowercase `state.md` | PASS | discovered and parsed on Windows |
| Unknown flag | PASS | exit 2, `unknown option: --nope` |
| Missing game directory | PASS | exit 2, clear message |
| Two positional arguments | PASS | exit 2, clear message |
| Encoding | PASS | 0 BOM, 0 CRLF, LF only in all `staging/CLI02/` files |
| Read-only imports | PASS | only `fs` read calls and `path` helpers |
| Project-specific paths | PASS | no project name or machine-specific path in tool, test or fixtures |

## Reproduction

```sh
node staging/CLI02/test.mjs
node staging/CLI02/artifact/tools/status.mjs staging/CLI02/fixtures/full
node staging/CLI02/artifact/tools/status.mjs staging/CLI02/fixtures/full --json
node staging/CLI02/artifact/tools/status.mjs staging/CLI02/fixtures/empty
node staging/CLI02/artifact/tools/status.mjs staging/CLI02/fixtures/broken
node staging/CLI02/artifact/tools/status.mjs --help
```

Observed full human output (root abbreviated to `<full>`):

```text
gamefirst status  <full>
phase       production
mode        production
active      S03 core loop; S04 save; S05 tools
next        Build the G2 slice: one playable level with the core loop.
blocked     none
questions   2 open
gate        G1 fun: passed 2026-11-20 (evidence/2026-11-20-g1/)
autonomy    contract present
backlog     3 open | top: Add pause menu
project     demo-game | v0.2.0 | phaser 4.2.1 | verify: yes
parts       4 installed | game 0.2.0
            1. Is the jump feel right? Recommend: keep, because playtests accepted it.
            2. Ship on mobile in v0.3? Recommend: defer.
```

Observed empty-directory output (exit 1):

```text
gamefirst status  <empty>
phase       -
mode        -
active      none
next        -
blocked     unknown
questions   0 open
gate        none
autonomy    off
backlog     missing
project     missing
parts       missing
missing     BACKLOG.md, project.config.json, agent.lock.json
status: STATE.md not found. Create STATE.md (D02) with a phase and a next action, or pass the game directory.
```

Observed `--json` for the full fixture (exit 0, root abbreviated):

```json
{"schema":1,"ok":true,"root":"<full>","state":{"file":"STATE.md","status":"ok","phase":"production","mode":"production","active":["S03 core loop","S04 save","S05 tools"],"next":"Build the G2 slice: one playable level with the core loop.","questions":["Is the jump feel right? Recommend: keep, because playtests accepted it.","Ship on mobile in v0.3? Recommend: defer."],"blockers":[],"gates":["G1 fun: passed 2026-11-20 (evidence/2026-11-20-g1/)"],"autonomy":{"present":true}},"backlog":{"file":"BACKLOG.md","status":"ok","open":3,"top":"Add pause menu"},"config":{"file":"project.config.json","status":"ok","name":"demo-game","version":"0.2.0","engine":"phaser 4.2.1","verify":true},"lock":{"file":"agent.lock.json","status":"ok","version":"0.2.0","parts":4},"missing":[],"errors":[]}
```

## Coverage

| Area | Covered | Not covered |
|---|---|---|
| STATE | full headings, inline `Key: value`, aliases, case-insensitive name, absent file, autonomous without contract, blocked line | A full D02 schema validator; duplicate keys |
| BACKLOG | open bullets, `[x]`, `~~struck~~`, top item, absent file | `#done`, `## Done`, nested bullets |
| Config | name, version, engine string/object, verify, absent, invalid JSON | CLI01 final schema and verify recipe execution |
| Lock | version aliases, array/object/number parts, absent | CLI01/X03 final schema |
| CLI | help, human, JSON, unknown flag, missing dir, two positionals | `--version`; combined flags |
| Platform | Windows 11, Node 26, `path` module, case-insensitive lookup | POSIX host run (POSIX paths are produced by `path`) |
| Encoding | BOM/CRLF scan over all staging files | Editor round-trip |

## Open questions

1. D02 may finalize different STATE section names. Should CLI02 be revised once
   D02 lands, or are the current aliases the supported contract?
2. BACKLOG closed markers are not specified. Are `[x]` and `~~struck~~` the
   convention, or should `#done` and a `## Done` section also count?
3. `project.config.json` and `agent.lock.json` are owned by CLI01/X03 and do not
   exist yet. Should their shapes be frozen first, then the tolerant parsers
   narrowed?
4. Optional files currently exit 0 with `missing`. Should CI mode exit 1 when
   `agent.lock.json` is absent, while a local run stays 0?
5. The human view does not show the R2 question budget (`n/3`). Should STATE
   carry a per-stage question count so status can show it?

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | Unit table; each row names what breaks if removed; no duplicate parser exists |
| 2 | Function | PASS | Trigger, input, output, done, failure and scope are stated and tested |
| 3 | Evidence | PASS | 9 repos (4/3/2), stars/dates/license, verified quotes, dead ends, license note |
| 4 | Blueprint fit | PASS | Core CLI, no engine import, no project content, IDs and exit codes match S05/D02 |
| 5 | Size | CONCERNS | 296 vs 250 lines, explained above; JUSTIFICATION/SOURCES exceed one page as reference tables |
| 6 | Language | PASS | English artifact, UTF-8 no BOM, LF, POSIX paths, Windows-safe names |
| 7 | Security | PASS | Read-only, no secrets, no network, no destructive/publish/spend actions |
| 8 | Testability | PASS | `test.mjs` runs 57 assertions with no framework and prints actionable failures |
| 9 | Integration | CONCERNS | Stable `schema: 1` and exit codes; D02/CLI01 shapes still provisional |

## Known weaknesses

- Over the 250-line target by 46 lines; the reason is documented, not hidden.
- Autonomy validation checks presence of `goal`, `done` and `stop` only. Budget,
  checkpoints and log fields are not validated; the full R10 check belongs to
  the runner.
- Human output truncates each question detail at 160 characters. The JSON view
  keeps the full text.
- BACKLOG parses bullet lists, not headings. A `## Done` section would be
  invisible to the count.
- The test driver ran only on Windows. POSIX is handled through `path`, but was
  not exercised on a Linux or macOS host.
- `--json` still prints a full report on a broken config (with `ok: false` and
  an `errors` array) and exits 1. Consumers must check both.

## Review

Review: pending
