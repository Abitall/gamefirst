# N00: justification for the engine contract

Artifact: `staging/N00/artifact/library/engines/CONTRACT.md` -> `library/engines/CONTRACT.md`.
Protocol: medium. 5 sources (3 external pack systems, 2 accepted internal parts).
Size: 4,704 chars, 1,176 tokens by chars/4, 708 words, 100 lines; limit 1,200.

Every unit below is load-bearing: it answers a question that, left open, produces
two incompatible engine packs or a tool that cannot read a pack at all. Units are
numbered in the order they appear; `Breaks` names the concrete failure, not a
vague risk.

## U1 Pack shape and the two-layer rule

**Why.** Blueprint `docs/V0.3-BLUEPRINT.md` fixes the engine layer as "manifest,
rules, pitfalls, test recipes, selftest, upgrade" and requires that core and game
never import it. The contract is the single place that shape is written, so
`library/engines/phaser`, `unity`, and `godot` are the same kind of object and
N01-N03 are parallel work rather than three designs.
**Breaks.** Without it each pack invents its own layout, CLI03 cannot validate an
unknown engine, and "time to add an engine: at most one day" (blueprint) is
unreachable because every new engine needs tool changes.
**Source.** Blueprint engine-layer row; `template/AGENTS.md` ("engine pack owns
the pinned version, pitfalls, and test recipes in `docs/engine/`").

## U2 Engine named in project.config.json; swap replaces pack and adapter

**Why.** `template/AGENTS.md` makes `src/game/` the only engine adapter and keeps
`src/systems/` and `src/data/` engine-agnostic. Writing the selection into a data
file is what makes the adapter the only thing a swap touches.
**Breaks.** If the engine is named in code or in the manifest, switching engines
edits game logic, and the "replaceable pack" claim is false.
**Source.** `template/AGENTS.md`; blueprint `project.config.json` note.

## U3 Directory shape: six fixed files plus optional `install/`

**Why.** Each file answers one question a caller asks: `manifest.json` (machine),
`RULES.md` (what the engine forces), `API.md` (what is verified for the pin),
`PITFALLS.md` (failures actually reproduced), `RECIPES.md` (how to prove a build),
`selftest.mjs` (the pack proving itself). `install/` is optional so a docs-only
pack is still legal.
**Breaks.** Merge the files and CLI03/CLI07 cannot check one without reading all;
make `install/` mandatory and every pack ships an empty directory no rule covers.
**Source.** All three external sources: a pack is a directory with one
machine-read manifest and sibling human files.

## U4 `manifest.json` is the only file a tool reads

**Why.** Tools parse JSON, not prose. One machine-readable entry point means a
new tool needs no Markdown parser.
**Breaks.** If roles or sizes are declared inside `RULES.md`, every consumer
implements a Markdown parser and the two drift.
**Source.** VS Code `package.json` (`engines`, `contributes`, `main`);
Godot `plugin.cfg`; Homebrew's formula as the single declarative entry.

## U5 File roles: forced constraints, verified members, reproduced failures only

**Why.** "Reproduced failures only" in `PITFALLS.md` and "verified for the pin" in
`API.md` are quality gates, not labels: they forbid remembered folklore and
unverified members, which is exactly what E02 and E11 test.
**Breaks.** Without "reproduced" a pitfall list becomes hearsay and programmers
add defensive code for bugs that do not exist in the pin; without "verified" an
API row is indistinguishable from a guess.
**Source.** E02 (no invented API), E11 (pin = installed = documented members).

## U6 Size caps: 1,500 tokens per doc, 250 lines for selftest

**Why.** `docs/REVIEW-RUBRIC.md` section 5 caps a pack doc at 1,500 tokens; 250
lines keeps a selftest readable in one screen and discourages an engine-specific
test framework. Both are measured by chars/4 and line count, the arithmetic
`tools/lint-agent-context.mjs` uses for its own budgets.
**Breaks.** Without caps, `API.md` grows into a copy of the vendor docs that goes
stale silently, and the selftest becomes a second CI to maintain.
**Source.** `docs/REVIEW-RUBRIC.md` section 5; `tools/lint-agent-context.mjs:17`.

## U7 `id`

**Why.** The lockfile keys parts by id and `agent.lock.json` is the only record
of what is installed (CLI01 writes it, CLI02 reads it).
**Breaks.** An id that differs from the directory or from the lock entry makes
`remove` and `upgrade` unable to find the installed copy, and doctor reports a
lock part whose path does not exist.
**Source.** `tools/new-project.mjs:192-197` (lock shape), `tools/doctor.mjs`
(lock paths must resolve inside the repo).

## U8 `engine`

**Why.** Install must know which host the pack belongs to before it writes
`project.config.json` `engine.id`; the string is the join key between pack and
project.
**Breaks.** With no declared host, installing a Godot pack into a Phaser project
is undetectable, and `engineRange` has no subject.
**Source.** VS Code `engines.vscode` (the field names its host); E11 (one pin per
project).

## U9 `engineRange`: exact for stable, floor plus ceiling for beta

**Why.** E11 requires "pin = installed version = every `API.md` member". An exact
string is checkable by equality; a beta range is honestly a range. The ceiling
matters: a floor alone (`>=4.2`) silently accepts a major that breaks the pack.
**Breaks.** A range on a `stable` pack makes the equality check impossible, so
"stable" stops meaning anything; a floor with no ceiling lets an untested major
in and `RULES.md` silently becomes wrong.
**Source.** VS Code `engines.vscode` (range, with the typings version required to
match); Cargo's `rust-version` rejected precisely because it is floor-only; npm's
`engines` rejected because it is advisory.

## U10 No member outside the pin; a missing member is a stop

**Why.** This is the operational form of E02: check `API.md` before writing a
call; if the member is absent, stop and report rather than shim it. A shim hides
the mismatch until runtime and defeats the pin.
**Breaks.** Without the rule the natural move is a polyfill, and the game ships
calling something the pinned engine never had.
**Source.** E02 (`library/core/evals/E02-no-invented-api.md:5`); E11 (a missing
member fails the selftest).

## U11 Changing `engineRange` requires a new pack `version`

**Why.** `tools/sync-agent.mjs:9-19` classifies an installed part as `clean`,
`stale`, `modified`, `diverged`, or `unknown` by hash. A range change under the
same version is invisible to that comparison, and X03's upgrade path has nothing
to key on.
**Breaks.** Projects keep a pack that claims one range while its `API.md` answers
for another; the dry run reports "no change" for a semantic change.
**Source.** `tools/sync-agent.mjs:9-19`; X03; `tools/upgrade.mjs` (`--to`, diff,
note file).

## U12 `version` is pack semver, independent of the engine version

**Why.** The pack and the engine change on different clocks: Phaser 4.2.1 with
pack 1.0.3, later pack 1.1.0 still on 4.2.1. Two versions in one number makes
upgrade notes meaningless.
**Breaks.** A pack bumped only when the engine moves cannot ship a corrected
`PITFALLS.md`, which is the most common pack change.
**Source.** Homebrew formula versions (package version separate from build); X03.

## U13 `stability`: `stable` only while the selftest passes

**Why.** It makes "stable" a claim with a test behind it instead of an opinion,
and gives N02/N03 a legal way to ship a Unity pack that is honest about being
beta.
**Breaks.** Without the tie, `stability` is a self-assigned label and doctor has
nothing to verify.
**Source.** Homebrew `stable`/`head` channels (the channel is a claim about what
was tested); E11 (selftest is the proof).

## U14 `parts`: five roles with five merge rules

**Why.** The roles are the merge policy, not a taxonomy: `rule` and `docs` are
replaceable, `seed` must never clobber a local edit, `permission` is a diff the
user applies, `recipe` appends defaults. Naming them in the manifest lets install
apply the right policy per file without guessing from paths.
**Breaks.** One uniform "copy and overwrite" policy destroys the adapter in
`src/game/` on every upgrade, which is the one file a user is expected to edit.
**Source.** VS Code `contributes` (declared parts, each with its own install
semantics); `template/opencode.json` (flat allow/ask/deny permission rows);
D08 (`template/docs/engine/ENGINE.md`) for project-overrides-pack.

## U15 `files` is an allow-list that cannot contain the manifest

**Why.** Install must copy exactly what the pack declares: no stray editor
backup, no vendor dump committed by accident. `manifest.json` is excluded because
`files` carries a hash per entry, and a file cannot hash itself: including the
manifest makes the digest circular, so every write changes the value it should
equal. Equality with the directory listing *minus the manifest* is the check that
catches a file added but not registered, a file removed but still declared, and a
file edited in place.
**Breaks.** Without the exclusion the first install either fails its own hash
check or needs a "skip this file" exception written nowhere; without the listing
check `upgrade` copies whatever sits in the directory, and a pack can ship a file
no rule covers and no hash guards.
**Source.** Homebrew `sha256` per artifact (only listed artifacts exist, and the
formula hashes the artifacts it downloads, not itself); Godot addons rejected
here: no file list, no checksum.

## U16 `hashes`: sha256 per `files` entry, same value as the lock

**Why.** `tools/sync-agent.mjs` stores a 64-hex sha256 per part and classifies by
comparing it; reusing the same value in the manifest means one hash function and
no second format. One hash per entry, no directory digest: a tree hash would make
a single file's removal rewrite every line, and an empty `files` or `hashes`
would then be indistinguishable from a valid empty digest, which is why the
selftest treats empty as a failure.
**Breaks.** A second digest format (or none) makes "unmodified" undecidable, and
`remove` either deletes edited files or never deletes anything.
**Source.** `tools/sync-agent.mjs:9-19`; Homebrew formula `sha256`.

## U17 `selftest` is a command, not a script name

**Why.** A command string lets a pack run `node selftest.mjs`, `npx tsc -p .`, or
an engine CLI without the contract knowing about it.
**Breaks.** A hardcoded filename forces every engine into the Node runtime even
when the pack is checked with a vendor tool.
**Source.** Homebrew `test do` block (a command the tool runs, not a filename).

## U18 `upgrade`: `none` or a note keyed by `from`

**Why.** CLI06 (`tools/upgrade.mjs`) is dry-run by default and writes
`docs/UPGRADE-<from>-to-<to>.md`; the pack has to say whether the step needs
human action and where it is written down.
**Breaks.** Without it a breaking pack change is applied silently, and the user
finds out from a failing build.
**Source.** CLI06 (`tools/upgrade.mjs`); Homebrew `brew upgrade` plus formula
caveats as the human-readable step.

## U19 `apiSource`: kind, uri, version, date

**Why.** E11's selftest must resolve "where did `API.md` come from" offline. A
local typings path exists and declares a version; a URL is recorded with the date
it was read and is not fetched during the test, so the selftest stays offline and
deterministic.
**Breaks.** Without a recorded source, `API.md` is unverifiable and the first
member dispute has no arbiter.
**Source.** E11 (`docs/engine/phaser/VERSION.md` + `API.md`); VS Code `@types`
version must match the `engines` range (source and pin travel together).

## U20 Seed: `project.config.json` is written by CLI01, shaped by N00

**Why.** Blueprint: the file is created by N00's layer, not the skeleton, "so the
bare template stays engine-free". `tools/verify.mjs:90` and
`tools/doctor.mjs:196-204` both hard-fail when it is missing and name N00 as the
creator, so absence is already an accepted state; the contract only has to say
who writes what. The seed is complete on day one (`name`, `engine: null`,
`packs: {}`, `verify.recipe: []`, `budgets: {}`, `default_agent: "partner"`), so
the file is valid before any engine is installed and install only fills values.
**Breaks.** Ship it in the skeleton and every game starts pinned to an engine it
does not use; let install invent the file and the empty state and the seeded state
differ, so doctor cannot distinguish "no engine yet" from "field missing".
**Source.** Blueprint; `tools/new-project.mjs:192-197`;
`tools/verify.mjs:90`; `tools/doctor.mjs:196-204`; `docs/build/BATCH-10-REVIEW.md:58`.

## U21 `engine` is the only pin; `range` copies `engineRange`

**Why.** Two pins (a `VERSION.md` and a config field) drift. One field, one
comparison in the selftest and in doctor.
**Breaks.** E11 currently cites `docs/engine/phaser/VERSION.md` as the pin while
the project config carries a version; if both exist, a project can be pinned to
two versions and doctor cannot say which is authoritative. Resolved here; the
E11 fixture text is flagged in REPORT as needing an update.
**Source.** E11 fixture; `template/docs/engine/ENGINE.md` (D08).

## U22 `verify.recipe` shape and `packs`

**Why.** The recipe array copies `tools/verify.mjs:32-35` (`{ cmd, required,
artifact }`), so the pack's default recipe lands in a schema the runner already
accepts. `packs` maps id to install directory so `upgrade`, `doctor`, and `remove`
resolve a path instead of scanning `docs/engine/`.
**Breaks.** Any other shape fails `verify.mjs:97`; without `packs`, a rename of
`docs/engine/phaser` (allowed, it is a project path) breaks uninstall.
**Source.** `tools/verify.mjs:32-35`, `:97`; `tools/doctor.mjs:196-204`.

## U23 `budgets`: two keys, missing means tool default

**Why.** `verify.mjs` has `DEFAULT_TIMEOUT=300` and a `MAX` of 86400; a project
needs one place to raise the build cap without editing the lockfile or passing
flags. `contextTokens` records the context ceiling the agent respects. "Missing
key means default" keeps the seeded `budgets: {}` valid.
**Breaks.** Without a declared place, each invocation repeats `--timeout` and the
value is lost between sessions.
**Source.** `tools/verify.mjs` (DEFAULT_TIMEOUT 300, MAX 86400);
`tools/new-project.mjs:192-197` (empty `budgets` stub). Neither tool reads these
keys yet: flagged in REPORT.

## U24 `default_agent: partner`

**Why.** `docs/build/BATCH-10-REVIEW.md:56-57`: "`default_agent` remains absent
from the bare template; N00 sets `partner`". One agent owns dialogue (A01), and
the bare template must not prefer one; the seed therefore carries it.
**Breaks.** Without the field the harness picks by name and a project silently
gains a second dialogue owner.
**Source.** `docs/build/BATCH-10-REVIEW.md:56-57`; A01; `template/opencode.json`
(no `default_agent` key today).

## U25 Install: copy `files`, check hashes, write the lock

**Why.** The lock is the only record that survives a fresh clone; CLI05
(`sync-agent`) reclassifies from hashes. Copying only `files` and verifying
before writing makes a partial install impossible.
**Breaks.** Without the hash check, a truncated download installs as valid; the
next `doctor` compares a hash of a corrupted file against the manifest and
reports `modified` instead of a failed install.
**Source.** `tools/sync-agent.mjs:9-19`; Homebrew `sha256`; CLI05.

## U26 Per-role merge rules and removal of only unmodified files

**Why.** `seed` copy-once protects the adapter the user is meant to edit;
`remove` deletes only hashed-and-unmodified files and reports the rest, because
deleting an edited adapter loses work that no other copy exists for. `sync-agent`
already calls only `stale` and `missing` safe to update, so removal uses the same
status language.
**Breaks.** Overwrite `src/game/` and a game loses its adapter on every pack
upgrade; delete blindly and `remove` destroys the only copy of a user's wiring.
**Source.** `tools/sync-agent.mjs:9-19` (EDITS, safe statuses); D08 (project
wins); `template/opencode.json` permission rows.

## U27 Permission rows are a diff, never an edit (security boundary)

**Why.** X02 `library/core/security/SECURITY.md:7` reserves `opencode.json` for
the user: permissions are the last line between an agent and the shell, and a
package that can widen them silently is a privilege-escalation path. So install
prints the rows the build and test commands need and stops; the user applies them.
Remove reports the rows to take back out instead of editing the file.
**Breaks.** If install edits `opencode.json`, a pack can grant itself
unattended `npm publish` or a delete, and neither the user nor X02 can audit the
moment it happened; a compromised or mistaken pack escalates without a prompt.
**Source.** X02 `SECURITY.md:7` (only the user edits `opencode.json`);
`template/opencode.json` (allow/ask/deny rows).

## U28 Selftest contents and `stable` / `beta`

**Why.** Five checks cover the five ways a pack lies: unparsable manifest, a file
nobody declared (or a declared file with a wrong hash, or an empty list that
passes vacuously), an API source nobody can resolve, a recipe that is not true,
and a pin that does not match what is installed. "One line per check, exit 0 or 1"
is what makes it callable from CLI03 (validation) and CLI07 (doctor) without a
parser. `stable` is only the claim that this passed on the pin.
**Breaks.** Without the file-listing check a pack ships undeclared files; without
the empty-list rule an empty `files` passes trivially; without the pin check
`stable` is a label; without the recipe check the default recipe is folklore and
fails on first use.
**Source.** E11 (six assertions reduced to five, since "API.md parses" folds into
the manifest/API-source check); Homebrew `brew test` (mandatory, run by the tool);
`tools/doctor.mjs:14` (placeholder and encoding checks already exist).

## U29 Cross-references instead of restatement

**Why.** N01 builds Phaser to this shape, X03 owns version fields, CLI06 owns
upgrade, CLI07 owns doctor, E11 owns the version proof, X02 owns the permission
policy. Restating any of them creates a second source that goes stale; naming
them keeps one.
**Breaks.** A copied sentence about the lockfile format diverges on the first
change and two docs disagree about the same file.
**Source.** `docs/BUILD-PLAN.md:98` (N00 row) and the part index; medium protocol
at `docs/BUILD-PLAN.md:122-125`.

## Deliberate omissions

- **`remove` does not reset `engine` to null.** Removing a pack from a project
  whose `src/game/` imports it leaves an unbuildable tree anyway; recovery is
  installing another pack. Nothing in CLI07 currently validates the `packs`
  paths (`tools/doctor.mjs:196-204` checks only `verify.recipe`), so a dangling
  `packs` entry would be silent: recorded in REPORT as a follow-up for CLI07, not
  solved here by a sentence the tools do not implement.
- **No "one engine pack at a time" rule.** `engine.id` is singular and `packs` is
  a map, so the invariant is implied; a second installed pack is visible in the
  lock. A rule would cost ~50 tokens of a 1,200 budget for a case no tool can
  currently produce.
- **No directory creation for the rest of the template.** BATCH-10 lists missing
  `toolbox/`, `prototypes/`, `docs/retro/`, `evals/fixtures/`, `runs/*.jsonl`;
  that is template work, outside N00's four files. Flagged in REPORT.
- **No permission removal procedure.** `remove` reports permission rows; how the
  user diffs them out of `opencode.json` is CLI05's business, and X02 forbids the
  installer doing it.
- **No recipe timeout field.** `budgets.verifySeconds` covers it; a per-step
  timeout would duplicate the runner's semantics.
- **No pack signing or trust chain.** Out of scope for a local framework; hashes
  detect corruption and edits, not an adversary.

## Deviations from the draft

- ASCII only: the em dash became a comma or a colon, so the file is byte-stable
  under any codepage.
- The literal two-brace marker cannot appear in the text: `tools/doctor.mjs:14`
  fails any file containing it. The selftest sentence names the "unreplaced
  double-brace placeholder" instead, which keeps the check without tripping the
  checker on the contract itself.
- The `apiSource` row carries `{kind, uri, version, date}` instead of a JSON
  literal: alternative values separated by escaped pipes are fragile in a table
  and read worse than the field list.
- The sentence "Files outside this directory are not part of the pack" was cut:
  `files` being an allow-list already says it, and the line cost 59 chars against
  a hard budget.
- Permission handling changed from "appended" to "printed as a diff" after the
  X02 conflict was found; the artifact now cites X02 and grants the installer no
  write access to `opencode.json`.
- `files` was defined as "every path in the pack" in the first draft, which made
  `manifest.json` hash itself. The field now excludes it explicitly and the
  selftest compares against the listing minus that one file; an empty list is a
  failure rather than a vacuous pass.
