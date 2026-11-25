# CLI02 - status: sources

Nine repositories were read on 2026-11-25: four gamedev, three software, two
AI-agent. Stars and last-commit are shields.io badges because the GitHub REST
API returned 403 (rate limit); star counts are rounded. A quote marked
"verified in source" was read from the raw file at the path shown. No source
code was copied.

## Gamedev

### 1. bevyengine/bevy - diagnostics registry

- URL: https://github.com/bevyengine/bevy
- Stars: ~50k (badge, 2026-11-25)
- Last commit: today (2026-11-25)
- License: Apache-2.0
- Artifact: `crates/bevy_diagnostic/src/lib.rs`
- Quote (verified in source): "This crate provides a straightforward solution
  for integrating diagnostics in the Bevy game engine."
- Borrowed: a central registry of named diagnostics that several consumers read;
  status facts are named, not one free-form paragraph.
- Rejected: the ECS, plugin scheduling and frame-time collection. The CLI is not
  a game engine and must not import one.

### 2. ocornut/imgui - overlay and metrics window

- URL: https://github.com/ocornut/imgui
- Stars: ~77k (badge, 2026-11-25)
- Last commit: yesterday (2026-11-24)
- License: MIT
- Artifact: `imgui_demo.cpp`
- Quote (verified in source): "You can use ShowMetricsWindow() to inspect the
  draw data that are being passed to your renderer."
- Borrowed: one compact overlay (`ShowExampleAppSimpleOverlay`) plus an
  on-demand metrics view; label/value rows rather than prose.
- Rejected: immediate-mode GUI, C++ and rendering. The CLI prints text.

### 3. KilledByAPixel/LittleJS - debug overlay off by default

- URL: https://github.com/KilledByAPixel/LittleJS
- Stars: ~4.4k (badge, 2026-11-25)
- Last commit: last monday (2026-11-23)
- License: MIT
- Artifact: `src/engineDebug.js`
- Quote (verified in source): "Open or close the debug overlay from code, as the
  debug key does; does nothing in release builds"
- Borrowed: diagnostics are opt-in and inert unless requested. Running
  `status` is the request; importing it has no side effects.
- Rejected: the canvas game loop and engine. No debug rendering belongs here.

### 4. hajimehoshi/ebiten - fixed debug text block

- URL: https://github.com/hajimehoshi/ebiten
- Stars: ~14k (badge, 2026-11-25)
- Last commit: yesterday (2026-11-24)
- License: Apache-2.0
- Artifact: `ebitenutil/debugprint.go`
- Quote (verified in source): "DebugPrint draws the string str on the image at
  (0, 0) position (the upper-left corner in most cases)."
- Borrowed: a fixed-position, compact text block with a small character set
  (U+0000-U+00FF); a status should fit on one screen and avoid decorative glyphs.
- Rejected: Go, image rendering and the engine. The terminal is the surface.

## Software

### 5. cli/cli - one status over several sources

- URL: https://github.com/cli/cli
- Stars: ~47k (badge, 2026-11-25)
- Last commit: yesterday (2026-11-24)
- License: MIT
- Artifact: `pkg/cmd/status/status.go`
- Quote (verified in source): "Print information about relevant issues, pull
  requests, and notifications across repositories"
- Borrowed: a single read-only `status` command that aggregates several sources
  into named sections, instead of making the user run four commands.
- Rejected: authentication and network calls. Project status must work offline
  and read only local files.

### 6. eslint/eslint - human default, JSON, three exit codes

- URL: https://github.com/eslint/eslint
- Stars: ~28k (badge, 2026-11-25)
- Last commit: today (2026-11-25)
- License: MIT
- Artifact: `docs/src/use/command-line-interface.md`
- Quote (verified in source): "Exit with exit code 2 in case of fatal error";
  the same page has an "Exit Codes" section.
- Borrowed: a human-readable default, an explicit machine format (`--format
  json` there, `--json` here), and distinct exit codes for result versus
  misuse. `--max-warnings` informed the "warning does not fail" split.
- Rejected: the lint engine, rule configuration and file traversal.

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
  is explicit rather than scraped from the human view. CLI02 uses 0 complete,
  1 incomplete/invalid, 2 misuse.
- Rejected: the search engine, regex and parallelism.

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
- Borrowed: a footer that shows a few named facts with a known width, not a
  transcript. CLI02's label column is fixed at 11 characters and question detail
  is capped.
- Rejected: React, the TUI and the agent runtime. A terminal report needs no
  component tree.

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
- Borrowed: one status row, details optional and capped (three questions in the
  human view), so status does not become a second STATE document.
- Rejected: the agent loop, TUI and event stream.

## Considered and rejected

- `jesseduffield/lazygit` (~84k, MIT) - an interactive TUI. Rejected: status
  must be non-interactive and pipeable; a screen the user operates is a
  different tool.
- `starship/starship` (~61k, ISC) - prompt segments. Rejected: it runs per
  prompt and renders shell state, not a project report.
- `ClementTsang/bottom` (~14k, MIT) - a continuous system monitor. Rejected:
  status is a snapshot; a live dashboard adds a render loop and no extra truth.
- `mapeditor/tiled` (~13k) - the status bar was a useful visual reference, but
  GitHub could not identify a single license at read time. Dropped to avoid
  license ambiguity.
- `sst/opencode` - the repository now points to `anomalyco/opencode` and the TUI
  path is not stable. Dropped rather than cite a moving target.

## License note

All nine sources are permissive: Apache-2.0 (four), MIT (four), Unlicense
(one). Only short, attributed quotes and behavioral ideas were used; no source
code, assets or license files were copied. The implementation is original and
has no runtime dependency on any of these repositories.
