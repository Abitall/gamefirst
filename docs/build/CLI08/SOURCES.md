# CLI08 sources

Nine real repositories were read on 2026-11-25; star counts are the GitHub API
values for that date. Four are game-development projects, three are general
software-engineering tools, two are AI-agent runtimes. No source code was
copied; "Borrow" records design ideas only, "Reject" records what did not fit
this 248-line, dependency-free tool.

## Inventory

| # | Repository | Group | Stars | License | Artifact read |
|---|---|---|---|---|---|
| 1 | godotengine/godot | gamedev | 120813 | MIT | `doc/tools/make_rst.py` |
| 2 | KhronosGroup/glTF-Validator | gamedev | 482 | Apache-2.0 | `lib/src/validation_result.dart` |
| 3 | bevyengine/bevy | gamedev | 50003 | Apache-2.0 | `crates/bevy_diagnostic/src/diagnostic.rs` |
| 4 | OpenRA/OpenRA | gamedev | 17834 | GPL-3.0 | `OpenRA.Mods.Common/UtilityCommands/CheckYaml.cs` |
| 5 | pmd/pmd | SWE | 5544 | NOASSERTION (BSD-style header) | `pmd-core/src/main/java/net/sourceforge/pmd/cpd/CpdAnalysis.java` |
| 6 | lycheeverse/lychee | SWE | 4157 | Apache-2.0 | `lychee-bin/src/main.rs` |
| 7 | ai/size-limit | SWE | 7051 | MIT | `packages/size-limit/run.js` |
| 8 | google-gemini/gemini-cli | AI agent | 109103 | Apache-2.0 | `packages/core/src/utils/memoryDiscovery.ts` |
| 9 | openai/codex | AI agent | 136439 | Apache-2.0 | `codex-rs/core/src/agents_md.rs` |

Group totals: 4 gamedev, 3 SWE, 2 AI agent.

## What was borrowed

1. godot - `doc/tools/make_rst.py` reports duplicate properties, constants,
   signals, theme properties and classes by name, keeps `num_errors` and
   `num_warnings`, and exits non-zero when either is non-zero. Borrowed: named
   duplicate diagnostics, separate counters, exit 1 on findings. Rejected: the
   Sphinx/RST generation pipeline and the engine schema.
2. glTF-Validator - the CLI writes a JSON report and the README states the
   shell return code is non-zero only when at least one error is found;
   `validation_result.dart` exposes `numErrors`, `numWarnings`, `numInfos`,
   `numHints`, `messages` and `truncated`. Borrowed: severity buckets, counts
   and a truncation flag in JSON; warnings alone do not fail a normal run.
   Rejected: binary glTF parsing and the full issue taxonomy.
3. bevy - `DiagnosticPath` documents that a unique path is separated by `/`,
   cannot be empty, cannot start or end with `/` and cannot have empty
   components; `DiagnosticsStore` is a `HashMap` keyed by that path, so a
   duplicate replaces. Borrowed: canonical ID shape rules and duplicate-key
   semantics. Rejected: `debug_assert!`-only validation, which disappears in
   release builds.
4. OpenRA - `CheckYaml.cs` counts `errors`, emits `Missing Type: {s}` and
   `Missing field {fieldName}`, has `TREAT_WARNINGS_AS_ERRORS`, and calls
   `Environment.Exit(1)` when `errors > 0`. Borrowed: unresolved-name errors
   that quote the offending token, a warning counter, and a strict-mode analog.
   Rejected: reusing any GPL code; only the behavior was studied.
5. pmd - CPD's `CpdAnalysis` constructs `MatchAlgorithm(tokens,
   configuration.getMinimumTileSize())` and logs `Finished: {} duplicates
   found`. Borrowed: a minimum tile size before reporting (40 chars and 7
   words here) and grouped duplicate output. Rejected: the Java tokenizer, AST
   and language registry.
6. lychee - `lychee-bin/src/main.rs` defines `ExitCode { Success = 0,
   UnexpectedFailure = 1, LinkCheckFailure = 2, ConfigFile = 3 }` and resolves
   local links relative to a root; `.lycheeignore` uses `#` comments. Borrowed:
   a distinct exit path for configuration errors and root-relative path
   resolution. Rejected: async runtime, network checking and the ignore-file
   grammar.
7. size-limit - `run.js` switches on `--json` and exits 1 when a configured
   budget fails or is missed; `package.json` describes the tool with the
   keywords `budget` and `performance budget`. Borrowed: the word "budget" in
   the interface, per-kind budget values and a JSON switch. Rejected: the Node
   ^22.19 engine floor (this tool targets Node 18+) and bundler integration.
8. gemini-cli - `memoryDiscovery.ts` documents that it deduplicates file paths
   by file identity (device plus inode) rather than by string, reads the
   instruction hierarchy root-to-leaf, and concatenates with
   `--- Context from: <path> ---`. Borrowed: duplicate elimination and
   hierarchical discovery. Rejected: JIT subdirectory memory and trusted-root
   machinery.
9. codex - `agents_md.rs` defines `PROJECT_DOC_BUDGET_GUIDANCE` ("Trim your
   project instructions to fit the budget...") and truncates once the byte
   budget is exhausted while pushing a warning; it searches root-to-cwd and
   reads `AGENTS.override.md` before `AGENTS.md`. Borrowed: a hard budget with
   an actionable over-budget message and root-to-cwd ordering. Rejected:
   silent truncation; this tool reports instead of cutting content.

## Dead ends

- `cline/cline` was the intended second AI-agent source, but the guessed path
  `src/core/context/instructions/user-instructions/cline-rules.ts` returned
  404, so it was dropped rather than cited from memory. gemini-cli replaced it.
- Guessed paths `lib/src/errors.h` (glTF-Validator) and
  `packages/size-limit/src/index.js` also returned 404. Lesson: list the
  directory through the GitHub contents API, or read `package.json`, before
  assuming a source path.
- Rejected directions: a full markdown AST (no dependency budget), network
  link checking (read-only, offline requirement), YAML parsing (flat keys are
  enough for the observed frontmatter), and a shared duplicate detector across
  active and library trees (it would flag every installed copy).
