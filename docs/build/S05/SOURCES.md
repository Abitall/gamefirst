# S05 tool — sources

Nine public repositories were read on 2026-11-25. Star counts are the
`stargazerCount` embedded in each GitHub repository page on that date; licenses
come from the repository `LICENSE`, `Cargo.toml`, `pyproject.toml`, or
`package.json`, whichever the project treats as authoritative. `api.github.com`
returned HTTP 403 for unauthenticated requests, so pages were read as HTML.

No code, text, or asset was copied. The table records what was borrowed as a
method and what was rejected, so the borrow can be checked against the artifact.

## Gamedev (4)

| # | Repository | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 1 | [photonstorm/phaser](https://github.com/photonstorm/phaser) | 40,781 | MIT | `scripts/tsgen/` — `README.md`, `bin/`, `src/`, `test/`; README documents build (`npm run build-tsgen`), run (`npm run tsgen`), test (`npm run test-ts`). | A tool folder inside the product repo with its own README and build/run/test commands; the tool replaces a known generated output. | TypeScript/JSDoc generation, npm script layout, Phaser APIs. |
| 2 | [bevyengine/bevy](https://github.com/bevyengine/bevy) | 49,999 | MIT OR Apache-2.0 | `tools/ci/Cargo.toml` — `name = "ci"`, description "Tool that enables running CI checks locally", `publish = false`, license field; `src/main.rs` is an `argh` entry point; CI invokes it. | A private workspace tool: declared license, `publish = false`, single entry point, run by CI. | Rust, `argh`, Bevy crates, workflow YAML. |
| 3 | [o3de/o3de](https://github.com/o3de/o3de) | 9,919 | Apache-2.0 OR MIT (default Apache-2.0) | `Tools/LyTestTools/` — `README.txt` names Python 3.10.13 64-bit and `pip install -e .`; `setup.py`, `tests/`, `ly_test_tools/`. | README that pins the runtime version and install command; a `tests/` folder beside the package; the tool is a package, not a loose script. | O3DE/Lumberyard test harness, device config, engine paths. |
| 4 | [godotengine/godot](https://github.com/godotengine/godot) | 120,808 | MIT | `misc/scripts/validate_includes.py` — `argparse`, standard library only, aborts unless run from the repository root; sibling single-file scripts are used by CI. | Single-file stdlib tool with `--help`, an explicit working-directory requirement, and CI use. | Godot code, repository-specific header rules, shell scripts with platform assumptions. |

## Software development (3)

| # | Repository | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 5 | [rust-lang/rust-clippy](https://github.com/rust-lang/rust-clippy) | 13,694 | MIT OR Apache-2.0 | `clippy_dev/` — `Cargo.toml`, `src/main.rs` with a `clap` `Parser` and `Subcommand` enum (dogfood, fmt, update_lints, …); invoked as `cargo dev`. | One binary with subcommands, help generated from the CLI definition, dev tool kept beside the product and exercised in CI. | `clap`, Rust internals, lint-specific commands. |
| 6 | [casey/just](https://github.com/casey/just) | 36,840 | CC0-1.0 | `Cargo.toml` — version 1.59.0, `rust-version = "1.89.0"`, `autotests = false`; README install section and examples; `tests/`. | Pinned minimum runtime, semver release history, README with install and examples, a `tests/` directory. | Rust, justfile syntax, CC0 text (nothing copied). |
| 7 | [simonw/sqlite-utils](https://github.com/simonw/sqlite-utils) | 2,235 | Apache-2.0 | `pyproject.toml` — version 4.2.1, `requires-python = ">=3.10"`; `docs/cli.rst` documents `-` as stdin and the full CLI surface; tests included. | A declared runtime floor, the `-` stdin convention, CLI reference as the README's companion, tests as part of the package. | Python packaging, SQLite domain, plugin system. |

## AI-agent workflow (2)

| # | Repository | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 8 | [modelcontextprotocol/servers](https://github.com/modelcontextprotocol/servers) | 92,242 | Mixed: Apache-2.0 for new code, MIT for old contributions, docs CC-BY-4.0; per-package `LICENSE` | `src/filesystem/` — README with install and command-line allowed directories; `package.json` v2.4.0 with `bin`, `engines.node >= 24`, `test: vitest run`; tests beside source. | Folder per tool with its own README and metadata (`bin`, `engines`, `test`, version); tools listed together so one is discoverable from another. | MCP protocol, Node packaging, the ambiguous license as a model. |
| 9 | [github/github-mcp-server](https://github.com/github/github-mcp-server) | 34,747 | MIT | `cmd/github-mcp-server/main.go` — cobra root command with `Use`, `Short`, and `Version` fed by build `ldflags` (`version`, `commit`, `date`); `internal/`, `e2e/`. | A CLI that can print version, commit, and build date from build metadata; one root command with subcommands; end-to-end tests. | Go, cobra, MCP, GitHub API. |

## Dead ends

| Repository | Stars | What was checked | Why it was not used |
|---|---|---|---|
| [libgdx/libgdx](https://github.com/libgdx/libgdx) | 25,558 | `extensions/gdx-tools/` — desktop GUI asset tools under `src/com/badlogic/gdx/tools/`, `assets/`, `build.gradle`. | Tools exist but are GUI applications with no per-tool README or test contract; nothing portable to a CLI folder. |
| [microsoft/vscode](https://github.com/microsoft/vscode) | 195,770 | `scripts/`, `build/`, and the gulp/CI harness. | The scripts are coupled to that repository's build; none stands alone as a documented, versioned tool. |
| [anthropics/skills](https://github.com/anthropics/skills) | 200,364 | Skill folders and their bundled scripts. | The artifacts are skills, not tools; bundled scripts are examples with no version, test, or CLI contract. |

## Coverage and trade-offs

- **Gamedev** covers four placements: inside the product (Phaser), private
  workspace member (Bevy), packaged tool with runtime requirements (O3DE), and
  single-file stdlib script (Godot). This is why the skill allows any installed
  runtime and requires a declared version rather than one language.
- **Software** covers the CLI surface (clippy subcommands, sqlite-utils stdin)
  and the release surface (just's `rust-version` and semver history). These
  supply Steps 4 and 7.
- **AI-agent** covers packaging and discovery (MCP folder per tool with
  metadata, github-mcp-server's build-stamped version). These supply Step 8 and
  the index row in Step 9.
- **Artifact-first, not popularity-first**: sqlite-utils has the fewest stars
  (2,235) but the most exact CLI and stdin documentation, so it is included over
  larger repositories with weaker artifacts.
- **Known gap**: no source has a `toolbox/README.md` index row or a per-tool
  `VERSION` file. Both are synthesized — the index from MCP's server list and
  the per-tool version from package manifests and release tags (just 1.59.0,
  sqlite-utils 4.2.1, MCP filesystem 2.4.0).
- **Known gap**: no source states when a tool is worth building. R6 owns that
  decision; the repositories show only the shape of a finished tool.

## Licensing

Nothing is copied. The borrow column records method only: file layout, README
sections, CLI conventions, versioning, and test placement. MIT, Apache-2.0,
MIT/Apache-2.0 dual, and CC0-1.0 all permit that use without attribution; the
CC0 project (just) requires nothing, and no text from it is reproduced.

`modelcontextprotocol/servers` is recorded as mixed on purpose: its root
`LICENSE` describes a transition from MIT to Apache-2.0, documentation is
CC-BY-4.0, and per-package licenses decide the rest. The skill does not rely on
that ambiguity — the borrowed elements (folder layout, metadata fields) are
facts about packaging, not copyrightable text — but the SOURCES row keeps the
exact position so a later reader does not assume a single license.
