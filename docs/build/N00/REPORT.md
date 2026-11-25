# N00: report

## Summary

`library/engines/CONTRACT.md` defines the one pack shape Phaser (N01), Unity
(N02), and Godot (N03) must follow, so an engine is replaceable data plus a test
that core and game never import. It fixes the six pack files and their size caps,
the eleven `manifest.json` fields, `engineRange` (exact pin for `stable`, floor
and ceiling for `beta`), the `project.config.json` schema N00 owns while CLI01
writes the seed, the install/remove/upgrade rules per role, and the five
assertions a selftest must prove before a pack may call itself `stable`.

Two integration decisions were revised after conflicts were found:

- **Permissions are a diff, never an edit.** X02
  (`library/core/security/SECURITY.md:7`) says only the user edits
  `opencode.json`. The installer prints the rows the build and test commands need
  and the user applies them; `remove` reports the rows to take back out. The
  contract cites X02 and grants the installer no write access to that file.
- **The seed is complete on day one.** CLI01 writes `name`, `engine: null`,
  `packs: {}`, an empty `verify.recipe`, `budgets: {}`, and
  `default_agent: "partner"`; the file is valid before any engine exists and the
  first install only fills values. `tools/new-project.mjs:192-194` now writes
  exactly this set.

Cross-references: N01 (Phaser), X02 (permissions), X03 (versioning), CLI06
(upgrade), CLI07 (doctor), E11 (engine version). Their text is not restated.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| Characters | 4,704 | n/a | n/a |
| Tokens by chars/4 | **1,176.0** | 1,200 (band 1,050-1,180) | 24.0 (2.0%) |
| Words | 708 | n/a | n/a |
| Tokens by words x 1.35 | 955.8 | n/a | n/a |
| Lines | 100 | n/a | n/a |
| Non-ASCII characters | 0 | 0 | 0 |
| Bytes vs chars | 4,704 = 4,704 | equal | UTF-8, no BOM |

The artifact also states limits that are not measurements of itself: 1,500 tokens
per pack doc (RULES, API, PITFALLS, RECIPES) and 250 lines for `selftest.mjs`.
This file is 2.0% under the hard cap, 4 tokens under the band top; prose was
trimmed three times to keep it there.

## Checks

| Check | Result |
|---|---|
| UTF-8, no BOM | pass: 4,704 bytes, first byte not EF BB BF |
| LF only | pass: no CR in file |
| No placeholders | pass: no double-brace marker anywhere |
| No YAML frontmatter | pass: starts with `# N00: Engine contract` |
| No trailing whitespace | pass: 0 lines |
| ASCII only | pass: 0 chars above U+007E, so no smart quotes, dashes, or NBSP |
| POSIX paths | pass: 0 backslashes outside the code block; no Windows paths |
| Manifest fields | pass: exactly 11 table rows, no missing, no extra (scripted) |
| Self-hash rule | pass: `files` excludes `manifest.json`, the selftest compares against the listing minus it, and empty `files` fails |
| Pack paths named | pass: all of `manifest.json`, `RULES.md`, `API.md`, `PITFALLS.md`, `RECIPES.md`, `selftest.mjs`, `install/` present |
| Cross-references | pass: N01 x1, X02 x1, X03 x2, CLI06 x3, CLI07 x3, E11 x2 |
| Sources | pass: 3 external + 2 internal, live stars, license per source |
| Engine-specific content | pass: none; no Phaser, Unity or Godot API, flag, or command |
| Duplication | pass: no section repeats another; N01-X03-CLI06-CLI07-E11 are named, not quoted |
| Seed agreement | pass: `tools/new-project.mjs:192-194` writes the same keys the contract names |
| Permission boundary | pass: no sentence lets an installer write `opencode.json`; X02 cited |

Checks were run by a small Node script over the file (byte and char counts, regex
scans for the marker, backslashes, non-ASCII, table rows, cross-reference counts)
plus manual re-reads. The script is not part of the artifact.

## Resolved during this pass

- **Permission conflict with X02.** The artifact said pack `permission` rows were
  appended to `opencode.json`; it now says they are printed as a diff for the
  user, and that `remove` reports rows instead of editing the file.
- **Seed mismatch with CLI01.** The artifact now names the full seed; CLI01's
  writer matches it at `tools/new-project.mjs:192-194`.

## Rubric

| # | Section | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | Every section answers a question an existing tool already asks (verify.mjs, doctor.mjs, sync-agent.mjs, upgrade.mjs); no section exists for style |
| 2 | Function | PASS | A pack built strictly to it installs, is verifiable, upgrades by diff, and is removable only where unmodified |
| 3 | Evidence | PASS | 3 external systems with live star counts on 2026-11-26 plus 2 accepted internal parts; no invented number |
| 4 | Blueprint fit | PASS | Matches the engine-layer row and the "at most one day" goal; engine-free skeleton preserved; pack lives in `docs/engine/` as the blueprint says |
| 5 | Size | PASS | 1,176.0 of 1,200 (2.0% under); per-doc caps stated but not measured here |
| 6 | Language and encoding | PASS | English, ASCII, UTF-8 no BOM, LF, no placeholders, no frontmatter |
| 7 | Security | PASS | Permission handling defers to X02, so install cannot escalate; hashes detect corruption and edits, not an adversary (no signing, deliberate) |
| 8 | Testability | PASS | The selftest is a command with five assertions and an exit code; the pin assertion is E11's; caps are countable |
| 9 | Integration | CONCERNS | Seed and permission now agree with CLI01 and X02; three smaller gaps remain (budgets unread, E11 pin path, CLI07 does not validate `packs`) |

Self-verdict: **accept**, with the three follow-ups below owned outside N00.

## Open questions

1. **`budgets` keys are not read yet.** `tools/verify.mjs` uses
   `DEFAULT_TIMEOUT=300` and ignores `budgets.verifySeconds`;
   `tools/lint-agent-context.mjs:17` has its own BUDGETS table and ignores
   `budgets.contextTokens`. Either teach both tools to read the file, or reword
   the artifact from "the caps the tools read" to "the caps tools must read". The
   field is worth keeping because a project needs a declared place for the build
   cap.
2. **Two pins.** E11's fixture still cites `docs/engine/phaser/VERSION.md` as the
   pin, while the contract makes `engine` in `project.config.json` the only pin.
   Recommended: the pack keeps a `VERSION.md` that echoes the pack's
   `apiSource.version`, and the selftest asserts all three are equal; E11 needs
   one sentence pointing at the config as the source of that equality.
3. **`docs/engine/<engine>.md` versus `docs/engine/<engine>/`.** D08
   (`template/docs/engine/ENGINE.md`) is a single page per engine, while `packs`
   maps to a directory. Recommended: the page becomes
   `docs/engine/<engine>/ENGINE.md` inside the installed pack, so one directory
   holds everything and `packs` has one meaning.
4. **CLI07 does not check `packs`.** `tools/doctor.mjs:196-204` validates only
   `verify.recipe`, so a `packs` entry pointing at a deleted directory is silent
   after `remove`. The contract deliberately does not reset `engine`; the cheap
   fix is a path check in CLI07, not a sentence here.
5. **Template gaps from BATCH-10** (`toolbox/`, `prototypes/`, `docs/retro/`,
   `evals/fixtures/`, `runs/*.jsonl`) are listed as "N00 must create" in
   `docs/build/BATCH-10-REVIEW.md:68`. They are outside N00's four files; assign
   them to the template part so the gap is not double-owned or forgotten.

## Known weaknesses

- The inline JSON example shows the filled state only; the seeded state is
  described in prose one line above, so a reader who skims sees `packs` already
  populated. Keeping the example short was the trade for 1,200 tokens.
- Permission rows remain a manual step by design. A user who skips the diff gets
  a `verify` run that stalls on an approval prompt; the contract cannot detect
  the skip, and the selftest does not read `opencode.json`.
- The `beta` example range `">=3.80 <5"` is illustrative (Godot 4), not a claim
  about N03's actual range.
- No hash covers this contract itself; it is a framework doc, replaced by the
  framework version, not by a pack hash.

## Next action

N01 builds `library/engines/phaser` to this shape; then a small integration pass
teaches `tools/doctor.mjs` to resolve `packs` paths, teaches `tools/verify.mjs`
(or the lint) to read `budgets`, and updates E11's pin sentence. N02 and N03 can
start in parallel once N01 shows the shape survives one real engine.

Review: pending
