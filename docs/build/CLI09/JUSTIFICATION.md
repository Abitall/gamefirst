# CLI09 - trigger-check: justification

This file answers the necessity questions from `docs/REVIEW-RUBRIC.md` for
every unit of the part. Line numbers refer to
`artifact/tools/trigger-check.mjs` (245 lines) and `test/run-checks.mjs`
(336 lines).

## Contract

`docs/V0.3-BLUEPRINT.md:239` defines CLI09 as "Run trigger fixtures and report
false positives and negatives." The part is a read-only lexical smoke check:
it answers "would a prompt select the part its fixture expects?" It does not
call a model, does not touch the network, writes nothing, and does not claim to
be semantic routing. Semantic cases belong to CLI04.

A fixture case is `{ id, prompt, expect, forbid }`. `expect` lists part IDs
that must match; `forbid` lists part IDs that must not match. A case passes
only when both hold. The run exits 0 when every case passes, 1 when any case
fails, and 2 when the invocation or the configuration is wrong.

## Artifact units

| Unit | Lines | Why it exists | If removed |
|---|---|---|---|
| Header comment | 1-5 | One place that states purpose, usage and the read-only contract. | A reader has to run `--help` to learn the scope; the file loses its license-free provenance note. |
| `node:fs` / `node:path` imports | 6-7 | The tool reads files and prints paths; nothing else is needed. | No input. |
| `DEFAULT_THRESHOLD` | 9 | The single tuning number, named once. | The default is duplicated in `parseArgs` and `USAGE`, and drifts. |
| `ID_LIKE` | 10 | Recognizes ID tokens (`R1`, `G2.5`, `E12`) in prompts and in part keys. | An ID in a prompt is scored as a rare word and can beat the owning part; or the exact-ID shortcut cannot exist. |
| `SECTION` | 11 | Matches exactly the three accepted trigger headings, case-insensitively. | Extraction would accept `## Triggered by` or miss `## When`; the contract would be undefined. |
| `KINDS` | 12 | Maps directory names to the seven part kinds reported per part. | The report cannot say which layer a false positive belongs to, and `kindOf` has no data. |
| `STOP` | 13-17 | Removes function words that appear in every description; without them every prompt matches every part. | Scores collapse toward 1 for broad prompts, so `forbid` becomes useless. |
| `USAGE` | 18-34 | The `--help` text: flags, defaults, extraction rule, scope, exit codes. | Users guess the fixture schema and the exit codes; support questions move into chat. |
| `isDir` | 35 | One safe directory test used by `discover` and `main`. | `statSync` throws on a missing root; the tool would exit 2 with a stack trace instead of a message. |
| `readText` | 36 | Reads UTF-8, strips a BOM, normalizes CRLF to LF. | Windows files with CRLF would keep `\r` in tokens and frontmatter; a BOM would hide the first `---`. Both break extraction silently. |
| `posix` | 37 | Converts separators for display and JSON. | Windows output contains `\`, which breaks fixtures that compare paths and looks wrong in cross-platform docs. |
| `fail` | 38 | Prints one `trigger-check:` line and returns the config-error code. | Every error path repeats the prefix and the return code; messages drift. |
| `parseArgs` | 40-61 | Parses five flags, supports `--x=y`, rejects unknown flags, validates the threshold. | No CLI contract; the tool cannot be scripted safely. |
| `frontmatter` | 62-71 | Reads the first `---` block into `data` and returns the body. First key wins. | Skill descriptions are invisible; every skill would fall back to prose and lose its curated trigger text. |
| `plain` | 72 | Removes heading, quote and table markers and list bullets. | Extracted text keeps `#`, `-` and `|`, which survive tokenization as noise and lower scores for no reason. |
| `firstParagraph` | 73-76 | Returns the first non-heading block; the fallback for parts without `description` or a trigger section. | Rules and gates G0/G2/G3 have no `description` in frontmatter and no trigger heading, so they would have no terms at all. |
| `sectionText` | 77-88 | Returns the first block under `## Trigger`, `## When` or `## Use when`, stopping at the next heading. Commands return empty. | The explicit "when to use" text is ignored, which is the highest-signal text in a skill; commands would also pick up unrelated `## When` prose, which the test pins as wrong. |
| `tokenize` | 89-93 | Lowercase, split on non `[a-z0-9.]`, trim edge dots, drop one-character tokens and stopwords. Dots are kept so `G2.5` stays one token. | Scoring becomes case-sensitive and punctuation-sensitive; `G2.5` splits into `g2` and `5`. |
| `kindOf` | 94-97 | Finds the nearest known directory name in the relative path. | `loadPart` cannot choose the inline-ID prefix or skip command sections. |
| `slug` | 98 | Stable fallback ID from a name. | Parts without any declared ID collide on `''` and the duplicate check fires on a valid library. |
| `declaredId` | 99-105 | Priority: frontmatter `id`, filename prefix, kind-restricted first-paragraph ID, else empty. The kind restriction prevents `CLI03:` in a skill body from being read as the skill's ID. | The real library loses R/E/G/S/C IDs; `verify` would be named `cli03`, and fixtures would reference a command that does not exist. |
| `headingOf` | 106-109 | Extracts the H1 and strips a leading ID prefix (`# R1 - Build is truth` -> `Build is truth`). | Names in the report contain IDs and dashes, and aliases gain a redundant noisy key. |
| `loadPart` | 110-122 | Builds the part record: frontmatter, kind, name, ID, terms, file, parent. `SKILL.md` uses its directory name. | Every consumer would repeat the same six-line extraction and disagree on fallbacks. |
| `discover` | 124-135 | Walks `library/` and `.opencode/`, skips `README.md`, returns Markdown files. | The tool cannot find parts; scanning only one tree would miss the assembled layout. |
| `buildModel` | 136-147 | Computes document frequency, the IDF weight function, the alias map and the set of known IDs. | Scoring has no rarity signal; fixture references cannot be resolved before cases run. |
| `score` | 148-161 | Exact known ID in the prompt returns 1 for the owning part; otherwise IDF-weighted prompt coverage, rounded to 3 decimals. | No number to threshold; or IDs in prompt text cause cross-part false positives. |
| `resolveRefs` | 162-172 | Resolves a fixture reference through id/stem/name/parent/slug aliases; rejects unknown and ambiguous references. | A typo in a fixture silently passes as an empty expectation, which is the worst failure mode for a check. |
| `loadFixtures` | 173-195 | Reads JSON (array or `{cases}`), validates every case, rejects empty lists, duplicate IDs (via the case list) and expect/forbid overlap. | Config errors surface later as confusing mismatches; overlapping lists make a case impossible to pass. |
| `runCase` | 196-203 | Scores every part, filters by threshold, sorts, computes false positives, false negatives and forbidden hits. | The report cannot answer the blueprint's question. |
| `render` | 204-215 | Human report: root, fixtures, part count, threshold, one line per case, summary. | The tool only has JSON; reviewers cannot scan a failing run. |
| `main` | 217-241 | Orders the run: args, help, root, parts, duplicate IDs, model, fixtures, cases, summary, output, exit code. | The CLI has no single control flow and `process.exitCode` handling is duplicated. |
| Tail `try/catch` | 242-245 | Converts an unexpected exception into exit 2 with a one-line message. | A stack trace escapes, and a crash can be mistaken for a fixture mismatch (exit 1). |

### Why these choices

- **Threshold 0.3.** Calibrated on the real library: a full-coverage prompt
  scores 1.0, a two-term overlap scores about 0.45, a single incidental shared
  word scores about 0.32. 0.3 keeps incidental overlaps and drops unrelated
  prompts. A lower value turns every broad prompt into a false positive. See
  `REPORT.md` for the calibration table; the E06 example at 0.297 is the known
  miss and is listed as an open question, not hidden.
- **IDF weighting.** A term in ten parts says little; a term in one part says a
  lot. The formula `(1 + log(count)) * (log(1 + n/(df+1)) + 1)` is monotonic in
  both term frequency and rarity, so no tuning constants are needed.
- **Exact-ID shortcut.** "R1" must select R1 and nothing else. Scoring it as a
  rare token could still rank E03 above R1 because descriptions mention rules
  by ID. The shortcut is narrower than it looks: only IDs present in the
  library and only for the owning part.
- **Description fallback.** Rules, gates and some agents have no trigger
  section. Falling back to the first body paragraph is the only option that
  keeps the whole library scorable without editing 47 files.
- **Commands skip sections.** The blueprint says commands use `description`.
  Honoring that costs three lines and makes the command rule testable; a
  `## When` section in a command must not affect matching.
- **Strict config errors (exit 2).** A checker that silently accepts an empty
  or misspelled fixture is worse than no checker. Unknown IDs, overlaps,
  duplicate IDs and bad thresholds stop the run before any score is printed.

## Test units

`test/run-checks.mjs` is black-box: it spawns the artifact with
`spawnSync(process.execPath, [TOOL, ...])` and never imports it.

| Unit | Lines (approx.) | Why |
|---|---|---|
| `root(label)` | 20-24 | One temp root per check, tracked for cleanup. |
| `FILES` mini-library | 26-60 | Six parts, one per kind, each with a distinct trigger shape: rule (no section), eval (`**Tests:**`), skill (frontmatter + `S01:` + `## When`), crew (`C01` + `## Trigger`), agent (description only), command (description + a `## When` that must be ignored). |
| `fixtures(dir, cases, raw)` | 62-66 | Writes `evals/trigger-fixtures.json`; `raw` covers malformed JSON and BOM/CRLF. |
| `run(root, args)` | 68-72 | One place that captures status, stdout and stderr. |
| `check`, `eq`, `has`, `match` | 74-88 | Assertions that throw with the actual text; no test framework, no dependency. |
| `hashTree(dir)` | 90-96 | Hashes every file before and after a run to prove the tool is read-only. |
| 31 checks | 98-336 | Contract coverage: CLI surface, exit codes, expect/forbid, threshold, extraction, JSON, config errors, isolation. |

The 31 checks map to the task's required list: pass/fail (clean, FN, FP),
expect/forbid (allowed, forbidden, overlap), threshold (filter, equals form),
missing fixture, malformed JSON, JSON output (schema, arrays, one line),
exit codes (0, 1, 2 in ten variants). The harness cleans every temp root with
`rmSync` in a `finally` block, so a failing check does not leave files behind.

## Deviations and open questions

- The blueprint mentions false positives and negatives; the tool also fails a
  case on a `forbid` hit and reports it separately. This is a deliberate
  tightening: "must not match" is part of the fixture contract.
- Agent files do not carry `A01`-`A04`, and `verify` does not carry `S02` in
  prose. IDs therefore fall back to names (`critic`, `verify`, ...). If the
  reviewer wants blueprint IDs in fixtures, assembly must add `id:`
  frontmatter; see `REPORT.md`.
- The `.opencode` scan exists for assembled repos. In a tree that contains both
  `library/` and `.opencode/` with the same parts, the duplicate-ID check exits
  2. That is honest but may be inconvenient; the open question asks whether
  `.opencode` should win when present.
- No `evals/trigger-fixtures.json` exists in the repository yet. The tool is
  ready before its data; the first fixture set is a separate authoring task.
- Lexical scoring is English-only by construction. Russian prompts would
  tokenize to nothing and match nothing. This is stated in `--help`, not
  discovered in production.
