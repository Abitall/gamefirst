# N00: sources

Five sources, as the medium protocol requires: three external pack or manifest
systems that already answer "what is a package the tools can verify", and two
accepted internal parts that already own adjacent semantics.

Stars and licenses are live values from shields.io on 2026-11-26; no number here
is estimated. No text was copied: each row records the structural idea borrowed
and the part deliberately rejected.

## Sources

| # | Repository | Stars | License | Analog | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| S1 | `microsoft/vscode` | 196k | MIT | Extension `package.json`: `engines.vscode` declares the host range, `contributes` declares the parts the host installs, `@types/vscode` must match the range, and `vsce` refuses a mismatch | A machine-read manifest as the only contract (`manifest.json`), `engineRange` as the pin, `parts` as declared install roles, and a version source (`apiSource`) tied to the same range | The full `contributes` taxonomy (commands, menus, keybindings) and activation events: a game engine pack has five roles, not forty |
| S2 | `Homebrew/brew` | 50k | BSD-2-Clause | Formula: one declarative file per package, `sha256` per artifact, stable and head channels, a mandatory `test do` block that `brew test` runs, `brew upgrade` with caveats for manual steps | sha256 per declared artifact (`files` + `hashes`), `selftest` as a command the tool runs (mirror of `test do`), `stability` as a tested claim, `upgrade.note` for the manual step | Bottles and tap layering: no binary distribution, no third-party pack registry |
| S3 | `godotengine/godot` | 121k | MIT | Addon: `addons/<name>/plugin.cfg` (name, description, version, script), enabled per project, the addon is a directory copied whole into the project | Pack as a self-contained directory with exactly one manifest at its root, installed into the project rather than referenced from outside | No checksums, no file list, no version enforcement: an addon can drift from the engine silently. Rejected; S2's hashes and S1's range cover those gaps |
| S4 | internal: `library/core/evals/E11-engine-version.md` | n/a | project | Eval: the pin is the installed version and every `API.md` member; `shakeCamera` absent in 4.2.1 is the worked failure | `engineRange` semantics (exact for stable), the selftest assertion "installed version equals the pin", `apiSource` as the authority behind `API.md`, missing member means stop | Its `docs/engine/phaser/VERSION.md` as a second pin: this contract makes `project.config.json` the only pin (flagged in REPORT; the E11 fixture text still cites the old path) |
| S5 | internal: `tools/upgrade.mjs` (CLI06) | n/a | project | Upgrade tool: `--dry-run` by default, `--apply`, `--to <version>`, diff, `docs/UPGRADE-<from>-to-<to>.md`, `hash` stripped on changed parts | The `upgrade` manifest field (`none` or `{from, note}`), the dry-run-before-apply rule, and the note file as the human step; the contract cites CLI06 instead of describing its algorithm | No restatement of CLI06's flags or its note template; they stay in the tool and in X03 |

## Considered and rejected

- `rust-lang/cargo` (16k, Apache-2.0): `rust-version` is a floor with no ceiling,
  so it cannot express "tested up to". Rejected as a source, kept as the reason
  the beta form has a ceiling.
- `npm/cli` (10k): `engines` is advisory and ignored unless a flag is set; its
  license is not identifiable from GitHub. Rejected.
- `obsidianmd/obsidian-releases` (24k): a real community-plugin manifest with a
  `minAppVersion` field, but no declared license. Rejected on license grounds.
- Unity Package Manager: the `unity` field is a floor, and the manifest spec lives
  in vendor docs with no auditable repository. Rejected; Unity appears in N02, not
  here.
- Sublime Package Control and VS Code's `vsce` CLI: both are subsets of S1 and S2
  (one channel, one hash form) and added no unit the contract lacks.

## Dead ends

- Searching for a pack system with a *mandatory* self-test found only Homebrew's
  `test do`; the other candidates treat tests as optional. That is why `selftest`
  is a required pack file and why `stable` depends on it.
- A manifest with per-file roles and a merge policy (not just a file list) does
  not exist in any of the three sources; the `parts` role set is derived from the
  project's own layers (rule, docs, seed, permission, recipe) and from D08's
  "project overrides pack" rule.
- Checksums and a version ceiling never appear together in the same source
  (Homebrew has hashes, no engine range; VS Code has a range, no hashes). The
  contract combines them because a pack is both distributed and pinned.

## License note

MIT and BSD-2-Clause texts are permissive and compatible with a project that
copies nothing: only interface shapes are borrowed, and interface shapes are not
copyrightable in this use. No sentence, schema or code fragment was reproduced,
so no attribution block is required or included. Internal sources are the
project's own files; the contract cites them by path and does not restate them.
