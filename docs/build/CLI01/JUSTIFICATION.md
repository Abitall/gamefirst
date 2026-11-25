# CLI01 justification — `new-project`

Artifact: `staging/CLI01/artifact/tools/new-project.mjs`
Measured: 250 lines, 11,317 characters (chars/4 = 2,829.25).
Target: Node 18+ ESM, no dependencies, Windows and POSIX.

The tool creates one game repository from `template/` plus selected packs. It
never overwrites a non-empty target and never runs `git init` unless `--git` is
present. Every block below is justified by the failure it prevents.

## 1. Header, imports, constants (`new-project.mjs:1-16`)

- **Does:** states the invocation; imports only `node:fs`, `node:child_process`,
  `node:path`, `node:url`; defines the placeholder, semver check, game version,
  implemented and reserved packs, script location, and lock ordering.
- **Why:** a single portable ESM file is the S05 contract. The constants make
  pack support and placeholder handling explicit instead of scattered.
- **Without it:** the tool would depend on a package manager, drift silently
  when a pack is renamed, and accept an invalid lock version.
- **Source:** S05 tool skill (portable, `--help`, exit codes); cargo `new`
  positional path; o3de subcommand dispatch.

## 2. `CliError`, `fail` (`new-project.mjs:18-22`)

- **Does:** carries a message, an exit code (1 failure, 2 misuse), and an
  optional hint.
- **Why:** callers and CI need to distinguish "bad command line" from "the
  filesystem or a library is broken".
- **Without it:** every error would be an uncaught stack trace with exit 1, and
  automation could not tell a typo from a failed install.
- **Source:** S05 exit-code contract; cargo/clap error conventions.

## 3. `usage()` (`new-project.mjs:24-34`)

- **Does:** prints the synopsis, options, defaults, target rule, and exit codes.
- **Why:** the command is run by people and by agents; the defaults (`core`,
  no git) must be discoverable without reading source.
- **Without it:** `--help` would fail, and users would guess whether `--git` is
  automatic or whether the target may exist.
- **Source:** S05 `--help` requirement; cargo `new --help`; spec-kit `init --help`.

## 4. `parseArgs()` (`new-project.mjs:36-53`)

- **Does:** accepts one positional target, `--name`, `--packs`, `--git`, `-h`,
  `--help`, and `--flag=value` forms; rejects unknown flags before any write.
- **Why:** typos must not be ignored when the next step creates directories.
  The target is a positional argument, matching cargo and spec-kit.
- **Without it:** `--packs core --nmae X` would create an unnamed project, and a
  mistyped `--packs` could select the wrong library set.
- **Source:** cargo `subcommand("new")` with a positional path; o3de
  `engine_template.add_args(subparsers)`; spec-kit `--here`/`--force`.

## 5. `readName()` (`new-project.mjs:55-62`)

- **Does:** requires `--name`, trims it, limits it to 80 characters, and rejects
  control characters and `{{`/`}}`.
- **Why:** the name is substituted into `AGENTS.md` and `README.md` and stored
  in JSON. Control characters break terminals and manifests; template markers
  break the placeholder check.
- **Without it:** a name could inject a newline into a heading or leave a
  half-rendered `{{GAME_NAME}}` that later tools cannot detect.
- **Source:** cookiecutter's prompt validation and template rendering;
  create-next-app's app-name validation; S05 input validation.

## 6. `readPacks()` (`new-project.mjs:64-73`)

- **Does:** always prepends `core`, accepts `core` and `game`, and rejects
  reserved packs (`release`, `obsidian`, `art`, `audio`, `narrative`,
  `localization`, `marketing`) as "not implemented" with exit 2.
- **Why:** `template/opencode.json` loads `.opencode/rules/*.md`, so a project
  without core rules is broken. A pack that is declared in the blueprint but
  has no library must fail loudly, not produce an empty install.
- **Without it:** `--packs game` would leave no rules; a typo would be treated
  as a successful empty pack; the lockfile would claim parts that do not exist.
- **Source:** BMAD's "installs one module whole"; blueprint packs P01-P07;
  `docs/build/BATCH-1-REVIEW.md`.

## 7. `isDir()`, `findRoot()` (`new-project.mjs:75-85`)

- **Does:** walks up from `import.meta.url` until it finds `template/`,
  `library/`, and `docs/V0.3-BLUEPRINT.md`.
- **Why:** the same file must run from `gamefirst/tools/` after assembly and
  from `gamefirst/staging/CLI01/artifact/tools/` during review. Neither the
  current directory nor a hardcoded framework path is reliable.
- **Without it:** running from a game directory or another drive would fail, or
  worse, pick up an unrelated `template/`.
- **Source:** this repository's staged build layout; cargo's ancestor workspace
  discovery; the requirement "no Wordblocks paths".

## 8. `readCoreVersion()`, `blueprintIds()` (`new-project.mjs:87-98`)

- **Does:** reads the framework `VERSION` and validates semver; parses the
  blueprint tables into a slug → `Sxx`/`Axx`/`Cxx` map.
- **Why:** the lock must record the real core version, and agent, skill, and crew
  IDs must follow the blueprint instead of being invented from filenames. Gate
  IDs come from filenames because the blueprint's `G2 = slice` row collides with
  the skill `S10 = slice`; a slug map would assign `G2` to both.
- **Without it:** `agent.lock.json` could claim an arbitrary core version, and a
  renamed agent, skill, or crew would get a fabricated ID that `status` cannot
  reconcile; including gate slugs would produce a duplicate `G2`.
- **Source:** X03 semver/lockfile; blueprint ID tables; BMAD module manifest.

## 9. `inside()`, `checkTarget()` (`new-project.mjs:100-112`)

- **Does:** rejects the framework root, anything inside `template/` or
  `library/`, an existing file, and any non-empty directory.
- **Why:** the template and library are inputs, not output directories. The
  non-empty check is the last line of defence against data loss.
- **Without it:** `new-project template --name X` could overwrite the source
  skeleton, and an existing project could be partially replaced.
- **Source:** create-next-app `isFolderEmpty` (`create-app.ts:153-155`);
  cookiecutter's no-overwrite default; spec-kit's explicit `--force`.

## 10. `copyTree()` (`new-project.mjs:114-129`)

- **Does:** refuses symlinks and unusual file types, copies binary files
  byte-for-byte, substitutes `{{GAME_NAME}}` in UTF-8 text, rejects leftover
  `{{`, and refuses to overwrite an existing destination.
- **Why:** a template may contain images or fonts later; decoding them as text
  would corrupt them. Placeholder substitution must be complete or absent.
- **Without it:** binary assets would be mangled, a missed placeholder would
  ship `{{GAME_NAME}}` into the game, and a symlink could escape the target.
- **Source:** cookiecutter template rendering; create-next-app copy without
  overwrite; Phaser's template-selection idea.

## 11. `partId()`, `addFlat()` (`new-project.mjs:131-155`)

- **Does:** derives rule, eval, and gate IDs from filename prefixes (`R1`,
  `E01`, `G2.5`), maps agents, skills, and crews through the blueprint, rejects
  duplicate IDs, copies the file, and records a POSIX-relative lock entry.
- **Why:** the lockfile is the only durable record of what was installed. IDs
  must be stable, unique, and comparable with the blueprint and with `status`.
- **Without it:** the lock could contain duplicate or missing IDs (for example
  two `G2` entries), Windows backslashes, or paths that do not resolve after the
  staging rename.
- **Source:** blueprint R/S/A/C tables and library gate filenames; X03 lockfile;
  BMAD module list.

## 12. `addSkill()`, `addSkills()` (`new-project.mjs:157-172`)

- **Does:** copies each skill directory whole, requires `SKILL.md`, resolves the
  ID from the blueprint or falls back to the directory name, and rejects
  duplicates.
- **Why:** OpenCode discovers skills by directory and expects `SKILL.md`; a
  half-copied skill is invisible or broken.
- **Without it:** game skills would be copied without their entrypoint, and a
  skill shared by two packs would overwrite the first.
- **Source:** library layout `skills/<id>/SKILL.md`; BMAD module install;
  OpenCode skill discovery in the template.

## 13. `installPack()` (`new-project.mjs:174-187`)

- **Does:** maps core to `.opencode/rules`, `.opencode/agents`,
  `.opencode/skills`, and `evals/`; maps game to `.opencode/skills`,
  `.opencode/crews`, and `.opencode/gates`.
- **Why:** this is the join between the template's `opencode.json` and the
  library. The mapping must be one-to-one with what the rules, skills, crews, and
  gates expect; the game pack is not complete without `C01` and `G0`.
- **Without it:** `opencode.json` would point at an empty rules directory, and
  the game pack would lack its skills, crews, and gates even though the lockfile
  claims them.
- **Source:** blueprint game tree; `template/opencode.json` instructions;
  `docs/build/BATCH-1-REVIEW.md`; BMAD pack installation.

## 14. `writeJson()`, `writeManifests()` (`new-project.mjs:189-197`)

- **Does:** writes two-space JSON with a trailing newline. `project.config.json`
  gets `{name, engine: null, verify: {recipe: []}, budgets: {}}`;
  `agent.lock.json` gets `{version: "0.1.0", core, parts, created}`.
- **Why:** N00 needs a project-level recipe slot, and `status`/`doctor` need a
  machine-readable inventory. An empty recipe is deliberately a FAIL per S02,
  so N00 must fill it rather than inherit a fake command.
- **Without it:** there would be no place for the engine recipe, no lockfile,
  and no way to tell which packs were installed.
- **Source:** S02 recipe entries `{cmd, required, artifact}`; blueprint
  `project.config.json` and `agent.lock.json` descriptions; BATCH-1 review.

## 15. `initGit()` (`new-project.mjs:199-209`)

- **Does:** runs `git init` only when `--git` is present; on failure it prints a
  warning, keeps the created project, and sets exit code 1.
- **Why:** a new project must not silently acquire a repository, and a missing
  git binary must not destroy an otherwise valid project.
- **Without it:** every run would create `.git` by default, or a failed git
  invocation would leave the user without the files.
- **Source:** create-next-app `--disable-git` (`index.ts:122`); cargo's explicit
  VCS options; the task's "no git init without `--git`".

## 16. `main()` (`new-project.mjs:211-238`)

- **Does:** orchestrates parse → validate → locate root → read version → check
  target → build in a sibling `mkdtemp` → copy template → install packs → sort
  parts → write manifests → remove an empty target → rename into place, with
  cleanup on any error.
- **Why:** a failed run must leave no half-project. Building beside the target
  and renaming makes the final step a single filesystem operation.
- **Without it:** a mid-copy failure would leave a partial repository that the
  non-empty guard then refuses to repair.
- **Source:** cargo `new` creation flow; spec-kit init; cookiecutter's
  output-directory handling.

## 17. Top-level error handler (`new-project.mjs:240-250`)

- **Does:** prints `CliError` messages and hints without a stack trace, maps
  them to exit codes, and reserves stack traces for unexpected bugs.
- **Why:** the tool is used by agents and humans; a clean message is actionable,
  while a stack trace obscures the cause.
- **Without it:** misuse errors would look like crashes and CI logs would be
  noisy.
- **Source:** S05 exit codes; cargo/clap error style.
