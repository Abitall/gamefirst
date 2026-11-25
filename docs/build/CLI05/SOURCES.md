# CLI05 sources — nine repositories

Evidence was collected on **2026-11-25**. GitHub's REST API returned 403 in this
environment, so stars come from `https://ungh.cc/repos/<owner>/<repo>` and file
evidence from `raw.githubusercontent.com`. Counts are exact as returned that day;
they move by a few stars between reads. Each entry records the license read from
the repository, a real artifact, what was borrowed, and what was rejected.

Distribution: **4 gamedev** (Godot, O3DE, Defold, gdx-liftoff), **3 SWE** (Cargo,
Git, Terraform), **2 AI-agent** (BMAD-METHOD, Gemini CLI).

## 1. godotengine/godot — gamedev — 120,803 stars — MIT

- URL: <https://github.com/godotengine/godot>
- License evidence: `LICENSE.txt` — "Copyright (c) 2014-present Godot Engine
  contributors", followed by the MIT permission text ("Permission is hereby
  granted, free of charge, to any person obtaining a copy...").
- Artifact: `editor/asset_library/editor_asset_installer.cpp:275`
  `item_meta["is_conflict"] = target_exists;`; `:288-291` marks the target red,
  sets the tooltip `vformat(TTR("%s (already exists)"), target_path)` and
  unchecks the file. `:272` counts `num_file_conflicts`.
- Borrow: decide conflict from target existence before writing, and show the
  exact path a user must resolve.
- Reject: the asset-library GUI, archive download and per-file checkboxes.
  `sync-agent` is headless, local-only and reports conflicts as data.

## 2. o3de/o3de — gamedev — 9,919 stars — Apache-2.0 OR MIT

- URL: <https://github.com/o3de/o3de>
- License evidence: `LICENSE.txt:1-4` — "OPEN 3D ENGINE LICENSING"; the default
  is Apache License 2.0, and the reader "may elect at your option to use the Open
  3D Engine under the MIT License".
- Artifact: `scripts/o3de.py:36-39` imports `sha256, download`; `:58-62` registers
  the `enable_gem` and `disable_gem` subcommands next to template and project
  commands.
- Borrow: thin subcommand dispatch, a content digest as identity, and explicit
  enable/disable verbs instead of implicit state changes.
- Reject: coupling the tool to an engine monorepo and downloading gems.
  `sync-agent` knows only `template/`, `library/`, and the lock.

## 3. defold/defold — gamedev — 6,491 stars — Defold License 1.0

- URL: <https://github.com/defold/defold>
- License evidence: `LICENSE.txt:1-2` — "Defold License", "Version 1.0, May
  2020", with the opensource URL on the next line.
- Artifact: `editor/src/clj/editor/library.clj:66-68`
  `(defn directory ... (path/of project-directory Project/LIB_DIR))`;
  `:73-77` `(defn fetch! ... (Library/fetch ...))`. The same namespace maps
  failures to `Missing`, `FetchFailed`, `InvalidArchive` and `InstallFailed`.
- Borrow: a project-local library directory and explicit, named failure classes
  instead of a generic error.
- Reject: fetching libraries over HTTP and installing archives. `sync-agent`
  never downloads; a missing source is reported, not repaired from the network.

## 4. libgdx/gdx-liftoff — gamedev — 696 stars — Apache-2.0

- URL: <https://github.com/libgdx/gdx-liftoff>
- License evidence: `LICENSE:1-2` — "Apache License", "Version 2.0, January
  2004".
- Artifact: `src/main/java/gdx/liftoff/Main.java:634-636` resolves
  `UserData.projectPath` and returns false unless it exists and is a directory;
  `src/main/java/gdx/liftoff/ui/panels/PathsPanel.java:88-92` adds a
  `deleteProjectPathButton` with the comment `//delete folder contents button`.
- Borrow: validate the destination before doing any work, and treat destructive
  folder operations as a separate, explicit act.
- Reject: the GUI, the downloaded `.jar`, and deleting folder contents.
  `sync-agent` validates the game root and never deletes.
- Honesty note: this is the weakest source by popularity (696 stars). It is kept
  because the artifact is current, directly about destination validation, and
  its code was read at the cited lines.

## 5. rust-lang/cargo — SWE — 15,795 stars — MIT OR Apache-2.0

- URL: <https://github.com/rust-lang/cargo>
- License evidence: `Cargo.toml` — `license = "MIT OR Apache-2.0"`.
- Artifact: `src/ops/cargo_vendor.rs:148` builds `let mut checksums =
  HashMap::default();`; `:223` writes `let cksum = dst.join(".cargo-checksum.json");`
  beside each vendored package. `:224-225` explains why versions are not enough:
  `Registries are the only immutable sources, path and git dependencies' versions
  cannot be trusted to mean "no change"`.
- Borrow: content checksums as the base for change detection, and the explicit
  lesson that a version string is not a change detector.
- Reject: vendoring layout, network registry access, and sidecar checksum files.
  `sync-agent` keeps one hash per part in `agent.lock.json`, so a game carries
  its own base.

## 6. git/git — SWE — 64,496 stars — GPL-2.0-only

- URL: <https://github.com/git/git>
- License evidence: `COPYING:2-4` — "the only valid version of the GPL as far as
  this project is concerned is _this_ particular version of the license (ie v2,
  not v2.2 or v3.x or whatever)".
- Artifact: `builtin/push.c:716` registers
  `OPT_BIT('n', "dry-run", ... TRANSPORT_PUSH_DRY_RUN)`; `:718` registers
  `OPT_BIT('f', "force", ... TRANSPORT_PUSH_FORCE)`. Push rejects a
  non-fast-forward update unless force is given.
- Borrow: separate preview and force flags, with refusal as the default for a
  write that could lose history.
- Reject: network transport, refspecs, remotes and publishing. A `push` here is a
  local file copy into the framework checkout; git remains the review tool.
- No code copied; GPL compatibility is therefore not an issue for this idea.

## 7. hashicorp/terraform — SWE — 50,322 stars — BUSL-1.1

- URL: <https://github.com/hashicorp/terraform>
- License evidence: `LICENSE:1-4` — "License text copyright (c) 2020 MariaDB
  Corporation Ab"; "Business Source License" is a trademark of MariaDB.
- Artifact: `internal/command/plan.go:17-18` — "PlanCommand is a Command
  implementation that compares a Terraform configuration to an actual
  infrastructure and shows the differences."; `:145-146` returns the detailed
  exit code 2 when `!op.PlanEmpty`.
- Borrow: a read-only plan/diff verb whose exit status tells CI that differences
  exist.
- Reject: cloud state, providers and network reads. `sync-agent diff` uses exit
  1 for differences because 2 is already reserved for usage errors in this CLI.
- No code copied; BUSL is source-available, and only the command shape was used.

## 8. bmad-code-org/BMAD-METHOD — AI-agent — 55,690 stars — MIT

- URL: <https://github.com/bmad-code-org/BMAD-METHOD>
- License evidence: `LICENSE:1-3` — "MIT License", "Copyright (c) 2025 BMad
  Code, LLC".
- Artifact: `README.md:41` — "Each command installs one module whole and asks
  which coding tools to install to."; `:56` — "Ask for `bmad status` to check
  versions and see what to run next. Ask for `bmad setup` to install updates: it
  runs `npx skills update`, then refreshes the project and cleans up renamed and
  removed skills."
- Borrow: install a module as a unit, record what was installed, and expose
  `status`/`setup` as the vocabulary for update checks.
- Reject: `npx` network execution, interactive coding-tool selection, and
  automatic cleanup of renamed parts. `sync-agent` reads the local lock and never
  deletes.
- Caveat: only `README.md` was retrievable; the installer source paths returned
  404, so no installer code is cited.

## 9. google-gemini/gemini-cli — AI-agent — 109,090 stars — Apache-2.0

- URL: <https://github.com/google-gemini/gemini-cli>
- License evidence: `LICENSE:1-3` — Apache License, Version 2.0.
- Artifact: `packages/cli/src/commands/extensions/install.ts:173` defines
  `command: 'install <source> [--auto-update] [--pre-release]'`; `:162` calls
  `extensionManager.installOrUpdateExtension(installMetadata)`; `:194-197` adds a
  `--consent` flag described as "Acknowledge the security risks of installing an
  extension and skip the confirmation prompt."
- Borrow: install-or-update semantics and an explicit consent flag for a write
  that can replace user files.
- Reject: git URLs, network sources, extension registries and auto-update.
  `sync-agent` accepts only relative paths already recorded in the lock, and its
  consent flag is `--force`.

## Dead ends

- **GitHub REST API** — every request returned 403; stars came from `ungh.cc`,
  files from `raw.githubusercontent.com`.
- **GitHub HTML** — the repository page shows abbreviated stars, not an exact
  count.
- **Large-repo file listings** — ungh tree calls timed out and jsDelivr returned
  403 for several engine repositories; exact files were fetched directly instead.
- **Moved paths** — Godot's old `editor/plugins/asset_library_editor_plugin.cpp`
  is 404 (the installer now lives under `editor/asset_library/`); an engine
  package-manager tree was probed and every guessed path 404ed, so it was dropped.
- **Defold old paths** — `dependencies.clj` and the old Bob tool paths 404; the
  current `editor/src/clj/editor/library.clj` was used instead.
- **Cargo docs paths** — documentation paths for the vendor subsystem 404; the
  implementation file above is the evidence.
- **BMAD installer paths** — only `README.md` was retrievable from the default
  branch; the installer files 404ed.
- **Popularity trade-off** — gdx-liftoff has only 696 stars, below the other
  eight. It is the fourth gamedev source because its destination-validation
  artifact is direct and current; this weakness is recorded rather than hidden.
- The final nine are exactly the repositories above; no source is reused.
