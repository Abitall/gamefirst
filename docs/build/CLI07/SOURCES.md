# CLI07 - doctor: sources

Nine repositories were read on 2026-11-25: four gamedev, three software, two
AI-agent. Stars and last-commit are shields.io badges because the GitHub REST
API returned 403 (rate limit); star counts are rounded. Every quote marked
"verified in source" was read from the raw file at the path shown. No source
code was copied, and doctor has no runtime dependency on any of these projects.

## Gamedev

### 1. bevyengine/bevy - diagnostics registry

- URL: https://github.com/bevyengine/bevy
- Stars: ~50k (badge, 2026-11-25)
- Last commit: today (2026-11-25)
- License: Apache-2.0
- Artifact: `crates/bevy_diagnostic/src/lib.rs`
- Quote (verified in source): "This crate provides a straightforward solution
  for integrating diagnostics in the Bevy game engine."
- Borrowed: a central registry of named diagnostics that several consumers read.
  Doctor findings are records with `level`, `check`, `file`, `line`, `message`;
  the human and JSON views read the same list, so they cannot disagree.
- Rejected: the ECS, plugin scheduling and frame-time collection. Doctor is a
  one-shot CLI and must not import an engine runtime.

### 2. ocornut/imgui - overlay and metrics window

- URL: https://github.com/ocornut/imgui
- Stars: ~77k (badge, 2026-11-25)
- Last commit: yesterday (2026-11-24)
- License: MIT
- Artifact: `imgui_demo.cpp`
- Quote (verified in source): "You can use ShowMetricsWindow() to inspect the
  draw data that are being passed to your renderer."
- Borrowed: one compact on-demand view with label/value rows. Doctor's human
  report is a header line, counters and one aligned row per finding; it is not
  a second STATE document.
- Rejected: immediate-mode GUI, C++ and rendering. The terminal is the surface.

### 3. KilledByAPixel/LittleJS - debug overlay off by default

- URL: https://github.com/KilledByAPixel/LittleJS
- Stars: ~4.4k (badge, 2026-11-25)
- Last commit: last monday (2026-11-23)
- License: MIT
- Artifact: `src/engineDebug.js`
- Quote (verified in source): "Open or close the debug overlay from code, as the
  debug key does; does nothing in release builds"
- Borrowed: diagnostics are inert until explicitly requested. Running doctor
  changes nothing: it has no fix mode and no writes, so a game repo cannot be
  altered by a health check. The read-only import list enforces the same idea.
- Rejected: the canvas game loop and engine. No debug rendering belongs here.

### 4. hajimehoshi/ebiten - fixed debug text block

- URL: https://github.com/hajimehoshi/ebiten
- Stars: ~14k (badge, 2026-11-25)
- Last commit: yesterday (2026-11-24)
- License: Apache-2.0
- Artifact: `ebitenutil/debugprint.go`
- Quote (verified in source): "DebugPrint draws the string str on the image at
  (0, 0) position (the upper-left corner in most cases)."
- Borrowed: a fixed-position text block with a small character set
  (U+0000-U+00FF). Doctor prints plain ASCII, one finding per line, and keeps
  the whole result readable on one screen rather than decorating it.
- Rejected: Go, image rendering and the engine. Doctor must also run in CI logs.

## Software

### 5. cli/cli - one status over several sources

- URL: https://github.com/cli/cli
- Stars: ~47k (badge, 2026-11-25)
- Last commit: yesterday (2026-11-24)
- License: MIT
- Artifact: `pkg/cmd/status/status.go`
- Quote (verified in source): "Print information about relevant issues, pull
  requests, and notifications across repositories"
- Borrowed: a single read-only command aggregates several independent sources
  (links, lock, `.opencode`, config, encoding, paths, placeholders) into one
  report, instead of asking the user to run six scripts and reconcile them.
- Rejected: authentication and network calls. A game repo must be checkable
  offline, including on a plane and in a sandbox.

### 6. eslint/eslint - human default, JSON, three exit codes

- URL: https://github.com/eslint/eslint
- Stars: ~28k (badge, 2026-11-25)
- Last commit: today (2026-11-25)
- License: MIT
- Artifact: `docs/src/use/command-line-interface.md`
- Quote (verified in source): "Exit with exit code 2 in case of fatal error";
  the same page has an "Exit Codes" section.
- Borrowed: a human-readable default, an explicit machine format (`--format
  json` there, `--json` here), exit 2 for misuse distinct from findings, and the
  warning/error split. `--max-warnings` is the direct ancestor of `--strict`:
  warnings are advisory unless the caller opts into zero tolerance.
- Rejected: the lint engine, rule configuration and general file traversal.
  Doctor walks a bounded set of text extensions and validates only the
  contracts the template and CLI01 define.

### 7. BurntSushi/ripgrep - exit code as the result

- URL: https://github.com/BurntSushi/ripgrep
- Stars: ~70k (badge, 2026-11-25)
- Last commit: yesterday (2026-11-24)
- License: Unlicense
- Artifact: `crates/core/flags/defs.rs`
- Quote (verified in source): "Do not print anything to stdout. If a match is
  found in a file, then ripgrep will stop searching. This is useful when
  ripgrep is used only for its exit code (which will be an error code if no
  matches are found)." The `--json` flag is documented as "Show search results
  in a JSON Lines format."
- Borrowed: the exit code carries the answer for scripts, and the machine format
  is explicit rather than scraped. Doctor exits 0 healthy, 1 findings (or
  warnings under `--strict`), 2 bad invocation, so assembly step 2 can gate on
  the code alone.
- Rejected: the search engine, regex and parallelism. Doctor's regexes are two
  narrow patterns, not a search product.

## AI-agent

### 8. google-gemini/gemini-cli - bounded footer fields

- URL: https://github.com/google-gemini/gemini-cli
- Stars: ~109k (badge, 2026-11-25)
- Last commit: today (2026-11-25)
- License: Apache-2.0
- Artifact: `packages/cli/src/ui/components/Footer.tsx`
- Quote (verified in source): the `context-used` case renders
  `<ContextUsageDisplay promptTokenCount={promptTokenCount} model={model}
  terminalWidth={terminalWidth} />`; a comment budgets the column with
  `// "100% used" is 9 chars`.
- Borrowed: a few named facts with a known width. Doctor's label column is
  fixed at 11 characters and the file/location column at 28, so a long path
  cannot push the message off the screen.
- Rejected: React, the TUI and the agent runtime. A terminal report needs no
  render tree.

### 9. openai/codex - one status row with capped details

- URL: https://github.com/openai/codex
- Stars: ~136k (badge, 2026-11-25)
- Last commit: today (2026-11-25)
- License: Apache-2.0
- Artifact: `codex-rs/tui/src/status_indicator_widget.rs`
- Quote (verified in source): "A live task status row rendered above the
  composer while the agent is busy." The widget "Displays a single-line
  in-progress status with optional wrapped details", with
  `STATUS_DETAILS_DEFAULT_MAX_LINES: usize = 3`.
- Borrowed: one line per finding with the detail capped to what is actionable;
  findings are ordered by discovery, and counts live in the header. This keeps
  doctor from turning into an essay about the repo.
- Rejected: the agent loop, TUI and event stream.

## Considered and rejected

These are not part of the nine: they were read or evaluated and dropped.

- `jesseduffield/lazygit` (~84k, MIT) - an interactive TUI. Rejected: doctor
  must be non-interactive and pipeable; a screen the user operates is a
  different tool.
- `starship/starship` (~61k, ISC) - prompt segments. Rejected: it renders shell
  state per prompt, not a project health report.
- `ClementTsang/bottom` (~14k, MIT) - a continuous system monitor. Rejected:
  doctor is a snapshot; a live dashboard adds a render loop and no extra truth.
- `mapeditor/tiled` (~13k) - a useful visual reference for compact status bars,
  but GitHub could not identify a single license at read time. Dropped to avoid
  license ambiguity.
- `sst/opencode` - the repository now points to `anomalyco/opencode` and the
  config paths used by the template are not stable. Dropped rather than cite a
  moving target.

## License note

All nine sources are permissive: Apache-2.0 (four), MIT (four), Unlicense (one).
Only short, attributed quotes and behavioral ideas were used; no source code,
assets or license files were copied. Doctor is original code with no runtime
dependency on these repositories.
