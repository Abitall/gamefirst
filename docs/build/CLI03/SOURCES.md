# CLI03 verify - sources

Nine real repositories, checked on 2026-11-25 through the GitHub API (`stargazers_count`, `license`, `pushed_at`) and raw file reads for every artifact path below. Stars are rounded down. Nothing is copied: only the mechanism named in "Borrowed" informed the design.

## Gamedev (4)

### 1. OpenRA/OpenRA

- URL: https://github.com/OpenRA/OpenRA
- Stars: 17 834 | License: GPL-3.0 | Last push: 2026-11-22 | Branch: `bleed`
- Artifact: `Makefile`
- Verified in source: targets `all:`, `check:`, `test: all`, each mod prints `@echo "Testing ... MiniYAML..."`, then `@dotnet test bin/OpenRA.Test.dll --test-adapter-path:.`.
- Borrowed: a small set of named checks run in a fixed order, each announcing what it tests. Our recipe has the same shape with `cmd` + `required`.
- Rejected: the Make dependency graph. Our order is the array order, visible in one place; Make's implicit rules hide why a target ran.

### 2. bevyengine/bevy

- URL: https://github.com/bevyengine/bevy
- Stars: 50 001 | License: Apache-2.0 | Last push: 2026-11-25 | Branch: `main`
- Artifact: `tools/ci/`
- Verified in source: `tools/ci/src/main.rs` is 160 bytes and only wires modules; `tools/ci/src/commands/mod.rs` is 639 bytes of module declarations, so each check lives in its own file under `tools/ci/src/commands/`.
- Borrowed: verification is its own crate with one entry point and one file per check category, so adding a check is additive.
- Rejected: a compiled per-check command surface. CLI03 must run an arbitrary project's recipe, not a fixed enum of checks.

### 3. godotengine/godot

- URL: https://github.com/godotengine/godot
- Stars: 120 811 | License: MIT | Last push: 2026-11-25 | Branch: `master`
- Artifact: `misc/scripts/validate_includes.py`
- Verified in source: `def validate_includes(path: Path) -> int`; include/import lines are matched by regex; relative includes are only allowed when constrained to the module or platform itself.
- Borrowed: a check returns an integer status and reports the offending path instead of a generic failure. Our artifact rule names the exact missing file.
- Rejected: the include policy itself, which is Godot's own source convention.

### 4. MonoGame/MonoGame

- URL: https://github.com/MonoGame/MonoGame
- Stars: 14 670 | License: NOASSERTION (GitHub cannot classify the `LICENSE.txt` mix) | Last push: 2026-11-25 | Branch: `develop`
- Artifact: `build.sh`
- Verified in source: the whole script is `dotnet run --project ./build/Build.csproj -- "$@"`.
- Borrowed: a thin wrapper that forwards arguments and never re-implements the build. `verify.mjs` likewise owns sequencing and evidence, not the checks.
- Rejected: the Cake build dependency and its MSBuild coupling.

## Software engineering (3)

### 5. pre-commit/pre-commit

- URL: https://github.com/pre-commit/pre-commit
- Stars: 15 713 | License: MIT | Last push: 2026-11-09 | Branch: `main`
- Artifact: `pre_commit/commands/run.py`
- Verified in source: `class Classifier`, `retcode = 0`, `if retcode or files_modified:`, `_subtle_line(f'- exit code: {retcode}', use_color)`.
- Borrowed: classify what to run, run it in order, and print the exit code next to the result. Our report does the same for each check.
- Rejected: hooks that modify files. Verify never writes outside `evidence/`; a check that fixes its own failure is not a check.

### 6. casey/just

- URL: https://github.com/casey/just
- Stars: 36 840 | License: CC0-1.0 | Last push: 2026-11-15 | Branch: `master`
- Artifact: `src/recipe.rs`, `src/run.rs`
- Verified in source: recipes are parsed into `src/recipe.rs`; `src/run.rs` (1 513 bytes) contains only the top-level run/error path, e.g. `err.print().ok();` and `eprintln!("{}", error.color_display(color.stderr()));`.
- Borrowed: recipes as data loaded from the project, not code; a module that only orchestrates. `verify.recipe` is exactly that.
- Rejected: the justfile DSL and its shebang portability rules. JSON is already the project's config format.

### 7. microsoft/playwright

- URL: https://github.com/microsoft/playwright
- Stars: 101 059 | License: Apache-2.0 | Last push: 2026-11-25 | Branch: `main`
- Artifact: `packages/playwright/src/reporters/json.ts`
- Verified in source: `class JSONReporter`, `private _serializeReport(result: FullResult): JSONReport`, `outputDir: toPosixPath(project.outputDir)`.
- Borrowed: one machine report object with per-test status and POSIX paths, plus a first-class JSON mode. That is our `schema: 1` output and `posix()`.
- Rejected: the attachment/trace model. A check log is enough; binary attachments would bloat `evidence/`.

## AI-agent (2)

### 8. google-gemini/gemini-cli

- URL: https://github.com/google-gemini/gemini-cli
- Stars: 109 103 | License: Apache-2.0 | Last push: 2026-11-25 | Branch: `main`
- Artifact: `packages/core/src/tools/shell.ts` (52 104 bytes)
- Verified in source: `trimLiveOutputBuffer`, `LIVE_OUTPUT_MAX_BUFFER_CHARS`, `is_background?: boolean`, `signal?: AbortSignal` in the shell tool.
- Borrowed: keep a bounded tail of command output and plumb abort/timeout through the runner. Our `tail()` and `spawnSync` timeout follow it.
- Rejected: background execution. A verify check must finish before the verdict is written, or the evidence is a guess.

### 9. Aider-AI/aider

- URL: https://github.com/Aider-AI/aider
- Stars: 50 255 | License: Apache-2.0 | Last push: 2026-05-22 | Branch: `main`
- Artifact: `aider/linter.py` (7 996 bytes)
- Verified in source: `from aider.run_cmd import run_cmd_subprocess`, `self.all_lint_cmd = None`, `def set_linter(self, lang, cmd)`, `def run_cmd(self, cmd, rel_fname, code)`.
- Borrowed: per-command registration and a run-then-report loop over those commands. Our recipe is the same list, declared in JSON instead of code.
- Rejected: feeding lint output back for automatic fixes. Verify reports; fixing belongs to the agent, and E03 fails an agent that edits checks to go green.

## Considered and rejected

- **EpicGames/UnrealEngine** - license-gated; cannot be read or cited.
- **Unity engine source** - proprietary; UnityCsReference does not expose the test runner internals.
- **GitHub Actions workflow YAML** (Godot, Bevy and most game repos) - vendor-specific and not runnable from a local CLI; importing its assumptions would contradict "no engine or CI assumption".
- **Docker/Bazel-based test launchers** - they solve sandboxing and caching, problems CLI03 does not have, at the cost of a daemon.

## Dead ends

- `casey/just/src/runner.rs` returned 404 - the module layout changed; `src/run.rs` plus the `src/` listing was used instead.
- Bevy's `tools/ci/src/commands/mod.rs` is 639 bytes of `mod` statements, so no individual command names could be quoted without cloning; the entry stayed at directory level.
- A search for game projects storing verify recipes as JSON found none: recipes are Makefiles, Gradle tasks or CI YAML. The `{ cmd, required, artifact }` schema therefore comes from S02 step 4, not from a precedent.

## License note

No source code was copied, so no license obligation attaches to this artifact. The repositories above are GPL-3.0, MIT, Apache-2.0, CC0-1.0 and NOASSERTION; they were read for design, and the borrowings are described as mechanisms, not code.
