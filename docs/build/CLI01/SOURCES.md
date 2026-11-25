# CLI01 sources — nine repositories

Evidence was collected on **2026-11-25**. GitHub's REST API returned 403 in this
environment, so stars come from `https://ungh.cc/repos/<owner>/<repo>` and file
evidence from `raw.githubusercontent.com`. Each entry records the exact star
count, the license read from the repository, a quote from the artifact, what was
borrowed, and what was rejected.

Distribution: **4 gamedev** (Phaser, libGDX, gdx-liftoff, O3DE), **3 SWE**
(cookiecutter, Cargo, create-next-app), **2 AI** (spec-kit, BMAD-METHOD).

## 1. phaserjs/phaser — gamedev — 40,779 stars — MIT

- License evidence: `LICENSE.md` — "The MIT License (MIT)".
- Quote, `README.md:53`: "The easiest way to get started quickly with Phaser is
  our `create-phaser-game` app. This CLI tool presents an interactive selection
  of official project templates and demo games. Issue the command, answer some
  questions and the app will download and configure the right package for you."
- Borrow: the idea of choosing a project template at creation time.
- Reject: interactive question flow and downloading packages from the network.
  CLI01 is deterministic, offline, and reads only the local `template/`.

## 2. libgdx/libgdx — gamedev — 25,557 stars — Apache-2.0

- License evidence: `LICENSE:2` — "Apache License Version 2.0".
- Quote, `README.md:23`: "Additionally, we offer a convenient setup tool that
  automates project creation and downloads all the necessary components."
- Borrow: keeping the runtime library separate from the setup tool.
- Reject: a setup path that downloads components. The game repository must be
  reproducible from the framework checkout.

## 3. libgdx/gdx-liftoff — gamedev — 696 stars — Apache-2.0

- License evidence: `LICENSE:1` — "Apache License".
- Quotes, `README.md:5`: "A setup tool for [libGDX](https://libgdx.com/) Gradle
  projects."; `README.md:15`: "To generate a project, download the latest
  application `jar`."; `README.md:121`: "**Project templates.** You can choose
  one of many project skeletons highlighting various libGDX features."
- Borrow: named template choices instead of one fixed skeleton.
- Reject: GUI and downloadable `.jar`. CLI01 stays a single ESM file.

## 4. o3de/o3de — gamedev — 9,919 stars — Apache-2.0 OR MIT

- License evidence: `LICENSE.txt:2` — "default license ... Apache License,
  Version 2.0"; lines 3-4 offer MIT; `scripts/o3de.py:6-7` carries the SPDX
  header "Apache-2.0 OR MIT".
- Quotes, `scripts/o3de.py:46-47`: "# engine template";
  "engine_template.add_args(subparsers)".
- Borrow: subcommand-oriented CLI structure with thin argument parsing.
- Reject: coupling a project creator to an engine monorepo. CLI01 knows only
  `template/`, `library/`, and the blueprint.

## 5. cookiecutter/cookiecutter — SWE — 25,184 stars — BSD-3-Clause

- License evidence: `LICENSE` — BSD 3-Clause text, copyright 2013-2026 Audrey
  M. Roy Greenfeld.
- Quote, `cookiecutter/cli.py:125-127`: `'--overwrite-if-exists'` with the help
  "Overwrite the contents of the output directory if it already exists".
- Borrow: refusing to overwrite by default; overwrite is an explicit choice.
- Reject: the overwrite flag itself. A half-overwritten game repository is worse
  than a failed command, so CLI01 has no overwrite mode.

## 6. rust-lang/cargo — SWE — 15,788 stars — MIT OR Apache-2.0

- License evidence: `Cargo.toml:16` — `license = "MIT OR Apache-2.0"`.
- Quotes, `src/bin/cargo/commands/new.rs:6-14`: `subcommand("new")`,
  `.about("Create a new cargo package at <path>")`, `.arg_new_opts()`.
- Borrow: a positional target path plus explicit VCS options.
- Reject: creating a repository by default. CLI01 requires `--git`; the default
  is a plain directory.

## 7. vercel/next.js (create-next-app) — SWE — 143,687 stars — MIT

- License evidence: `license.md` — "The MIT License (MIT)", copyright 2025
  Vercel, Inc. (the file is lowercase `license.md`, not `LICENSE`).
- Quote, `packages/create-next-app/create-app.ts:153-155`:
  `if (!isFolderEmpty(root, appName)) { process.exit(1) }`.
- Quote, `packages/create-next-app/index.ts:122`: `.option('--disable-git',
  'Skip initializing a git repository.')`.
- Borrow: the empty-directory guard and an explicit git switch.
- Reject: initializing git by default and fetching a remote template. CLI01
  copies only the local skeleton and makes `--git` opt-in.

## 8. github/spec-kit — AI — 151,341 stars — MIT

- License evidence: `LICENSE` — "MIT License Copyright GitHub, Inc."
- Quotes, `src/specify_cli/command_init.py:273-291`: the help "Name for your
  new project directory (optional if using --here ...)"; `"--here"`;
  `"--force"`; "Force merge/overwrite when using --here (skip confirmation)".
- Borrow: a named target directory and an explicit force-style escape hatch.
- Reject: merging into a non-empty directory by default. CLI01 refuses that
  case and has no merge mode.

## 9. bmad-code-org/BMAD-METHOD — AI — 55,690 stars — MIT

- License evidence: `LICENSE` — MIT.
- Quotes, `README.md:25`: "npx bmad-method install"; `README.md:41`: "Each
  command installs one module whole and asks which coding tools to install to."
- Borrow: installing a named pack as a unit and recording what was installed.
- Reject: interactive tool selection and remote `npx` execution. CLI01 reads
  local packs and writes the exact list into `agent.lock.json`.

## Dead ends

- **GitHub REST API** — every request returned 403; stars had to come from
  `ungh.cc`, files from `raw.githubusercontent.com`.
- **GitHub HTML** — the repository page only shows abbreviated stars, not an
  exact count.
- **Moved or removed paths** — raw 404 for libGDX's old `extensions/gdx-setup`
  (the setup tool is no longer there), Cocos2d-x's
  `tools/cocos2d-console/bin/cocos.py` on branch `v4`, Cargo's old
  `src/cargo/ops/cargo_new.rs`, and O3DE's `scripts/o3de/engine_template.py`.
- **ungh file listings** — the tree endpoint timed out for O3DE and Cargo;
  exact files were fetched directly instead.
- **jsDelivr file listing** — worked for Cargo and BMAD, returned 403 for O3DE.
- **Cocos2d-x and Yeoman** — probed as initial gamedev/SWE candidates (19,255
  and 1,265 stars respectively), but no runnable creation artifact could be
  verified. They were replaced by gdx-liftoff and create-next-app, whose CLI
  evidence is quoted above. They are **not** part of the final nine.
