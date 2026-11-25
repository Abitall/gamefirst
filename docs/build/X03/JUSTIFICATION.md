# X03 - versioning: justification

Artifact: `staging/X03/artifact/library/core/versioning/VERSIONING.md` (87 lines,
3,553 characters, 888.3 tokens by `chars/4`, 585 words).

The job: one small file that says what a version number means for the framework,
for an installed part, and for a game, and what CLI06 and CLI07 owe that meaning.
It is a protocol, not a tutorial: every line is either a rule somebody enforces or
a pointer to the part that owns a rule.

## Semantic units

Each row is one unit of meaning in the artifact. `why` is the decision; `without`
is the failure the line prevents; `source` is where the claim comes from.

### Intro (L3-4)

- **Three subjects, one file.** Why: a reader arriving from the framework repo
  looks for a `VERSION` in the game; this line kills that search in one sentence.
  Without: a game invents a `VERSION` file that no tool reads, and the number on it
  drifts from the lock on the first upgrade. Source: blueprint game tree (line 88),
  BUILD-PLAN 110-112 (no `VERSION` in a game).

### Semver (L8-19)

- **L8-9 grammar, precedence, immutability.** Why: one grammar for the framework,
  the packs, and a game's own number, so CLI01's `0.1.0`, CLI06's regex, CLI07's
  semver check, and a git tag can all be compared without a dialect question.
  Without: `v1.2` and `1.0.0-beta` compare by accident, and two different `0.3.0`
  trees exist with no rule saying which one is allowed to change. Source:
  semver.org sections 3 and 11.
- **L11-12 `VERSION` at the root, tag is not the version.** Why: the framework is
  not installed from itself, so its number lives in its own repo; consumers see it
  as `core`. The `v`-prefixed tag is a git handle, not a value in a lock. Without:
  `v0.3.0` gets stored in `agent.lock.json`, fails CLI06's semver regex
  (`/^(\d+)\.(\d+)\.(\d+)/` prefix and optional `-suffix`), and every upgrade stops
  with a usage error. Source: semver.org FAQ
  ("'v1.2.3' is a tag name"), `VERSION` = `0.3.0-dev` at the repo root.
- **L13-14 a `0.x` MINOR owes a MAJOR's migration note.** Why: section 4 lets a
  pre-1.0 release break anything, but a game that upgraded still has to be told, so
  the duty is moved down one level instead of being waived. Without: `0.3.0` ->
  `0.4.0` renames a rule, every installed game breaks, and no note exists because
  the grammar said a MINOR could. Source: semver.org section 4.
- **L15-17 a part reaches 1.0.0 on use plus a passing check; R6 shape.** Why: a
  number has to mean "this output was installed by a game and checked", otherwise
  1.0.0 is an author's opinion. R6 makes replacement or merge the normal shape of
  every addition, so the absorbing part's output changes and its number goes MAJOR.
  Without: all 30-odd parts are declared 1.0.0 on day one and the number stops
  carrying information. Source: semver.org sections 1 and 5 (declare a public API),
  blueprint lines 141 (R6) and 288 (X03).
- **L18-19 no game `VERSION`; `version` is the game, `core` is the framework.**
  Why: two numbers, two names, so nobody bumps the game to `0.3.0` because the
  framework is there. Without: a single `version` field serves both and the game's
  release number lies after the first framework upgrade. Source: blueprint line 88
  ("installed parts and versions; CLI01 writes it"), CLI01 `GAME_VERSION = '0.1.0'`.

### `agent.lock.json` (L23-42)

- **L23-33 the JSON example.** Why: a field list does not show that top-level
  `version` is the game while a part's `version` is the part, nor that `core` is a
  sibling of both. The block parses as JSON and doubles as the fixture for the
  Check. Without: implementers add a nested `framework` object that no tool reads
  (CLI06 writes `{...lock, core: to}`), or drop `parts` and hit CLI06's
  "missing lock" exit 2. Source: CLI06 write shape, CLI01 output, CLI05 part fields,
  N00 `hashes`.
- **L35-36 seven fields plus `engineRange` (N00).** Why: exactly the fields the
  brief requires (id, version, source, hash, engine range, installed date) plus the
  two the tools already use (`kind`, `path`); naming N00 as the owner keeps the
  range grammar out of X03. Without: a second dialect of `engineRange` appears here
  and the two drift. Source: brief; N00 CONTRACT.md lines 30, 35.
- **L37-39 `id` survives a rename; `source`; `installed`.** Why: `id` is the join
  key between blueprint, lock, and docs, and a rename must not fork identity;
  `source` is what CLI05 needs to refill a dropped hash and what CLI06 resolves a
  path against; `installed` dates the copy for a reader offline. Without: a renamed
  file becomes a second part with the same content, a dropped hash cannot be
  refilled, and nobody can tell a fresh install from a three-month-old one. Source:
  CLI05 path map and `missing-source` status, CLI06 `{...rest}`.
- **L40-41 absent hash is `unknown`, not healthy.** Why: the cheapest failure is a
  missing hash read as "fine"; CLI05 already grades absence as `unknown` and only a
  sync writes a value. Without: a half-copied tree passes review and CLI05 is never
  asked to refill. Source: `tools/sync-agent.mjs` statuses.
- **L42 one source of truth.** Why: the anti-second-list rule, in the form the
  project already uses ("One fact in one place"). Without: a generated parts index
  or a copied `VERSION` drifts on the first manual edit and CLI07 goes green over
  files the game does not run. Source: blueprint non-negotiables.

### Upgrade (L46-55)

- **L46-48 dry run is the default.** Why: the safe direction is "show", and statuses
  are CLI06's own vocabulary, so the doc and the tool cannot disagree about what
  "changed" means. Without: an upgrade writes on first command, and there is no
  record of what moved. Source: CLI06 (default dry run, exit 0/1/2).
- **L50-51 changed and missing drop `hash`.** Why: a hash that nobody recomputed is
  worse than no hash; dropping routes the file back through CLI05. Without: every
  upgraded file reports `modified` forever, i.e. every game looks locally edited and
  `pull` refuses. Source: CLI06 apply line (`const { hash, ...rest } = part`).
- **L52-53 left on disk, deletion is separate.** Why: deletion is irreversible, so
  it must be a second decision; listing is what the tool already does. Without:
  an upgrade deletes a rule a game had edited, silently. Source: CLI06 migration
  note ("Left on disk", "review and delete by hand"). Deviation: the prune pass is
  named and marked as not implemented in v0.3, so no line promises a flag that
  CLI06 does not have; the workaround is the note's "delete by hand".
- **L54-55 no write before a diff.** Why: both write paths need an explicit
  acknowledgement; a local edit is overwritten only on request, and a downgrade
  needs the same opt-in because it would leave newer files behind a lower `core`.
  Without: `pull` clobbers an edited rule and a downgrade makes lock and disk
  disagree in the opposite direction. Source: CLI05 `pull` refusal, CLI06 exit 2.

### Doctor (L59-63)

- **L59-63 classes, owners, exit codes.** Why: doctor answers "does the lock match
  the disk"; bytes and sources belong to CLI05, which already has the vocabulary
  (`stale`, `modified`, `diverged`, `missing-source`). Naming the owner prevents two
  tools from claiming the same fact, and exit codes let CI gate on it. Without: a
  green doctor is read as "files intact", and CI has no exit code to test. Source:
  `tools/doctor.mjs`, `tools/sync-agent.mjs`. Deviation: doctor.mjs computes no
  hashes and no source check, so the document gives those to CLI05 rather than
  claiming them for doctor; see Known gaps.

### Changelog and migration (L67-70)

- **L67-68 one line per break, silence is a bug.** Why: the upgrade note describes
  this move; the changelog line survives for a reader who is not upgrading today.
  Without: a break reaches a game only through a note nobody reads, and the
  framework's own history has no reason recorded. Source: brief; semver.org
  section 3 in spirit.
- **L69 older lock is read, next write is current.** Why: a game may sit on an old
  lock for months; rejecting it strands the project, and the alternative (a strict
  schema) is what CLI06 deliberately avoided. Without: every added field is a hard
  break for every existing game. Source: npm "Handling Old Lockfiles"; CLI06 report
  ("the lock format is provisional").
- **L70 content, never the path.** Why: `.opencode/` paths are referenced by
  `opencode.json` instructions and by docs, so a move breaks references the version
  number never mentions. Without: an upgrade renames a directory and every link in
  `AGENTS.md` dies (CLI07 would then flag the links it broke). Source: CLI05 path
  map; rubric 9.

### Engine packs (L74-79)

- **L74-75 `engineRange` gates install, E11 re-checks.** Why: a pack is only
  meaningful against one engine, and the pin decides both installability and the
  later verdict. Without: a Phaser 4 pack is installed on 3.80 and fails in ways its
  own docs cannot explain. Source: N00 CONTRACT.md lines 40-46; blueprint line 211
  (E11).
- **L77 `0.x` is beta, and says so.** Why: section 4 latitude has to be visible to
  the game author, not only to the number. Without: a game pins a pre-1.0 pack and
  expects `API.md` rows to hold. Source: semver.org section 4; N00 `stability`.
- **L78-79 1.0.0 needs a passing selftest.** Why: the selftest is the only
  mechanical proof that a pack matches the pin; without it "stable" is an opinion.
  Without: a stable label ships with a pack that never ran against the pinned
  engine. Source: blueprint line 295 ("stable when selftest passes"), N00 line 32.

### Check and IDs (L83-86)

- **L83-84 three commands, three answers.** Why: it proves the protocol without a
  new harness: create, break, dry-run. Without: the document is untested prose, and
  the first real user finds the divergence. Source: rubric 8.
- **L86 the ID line.** Why: it is the reader's index of what this file delegates,
  and the spine of the consistency table in `SOURCES.md`. Without: a reader
  re-derives which tool owns which sentence. Source: BUILD-PLAN thin-part rule.

## Deliberate omissions

1. **No commit field in the lock.** Nothing reads one: CLI01 writes `core` from the
   framework `VERSION`, CLI06 writes `core` from the target, CLI05 never looks at
   it. A commit pin would need a fetch at install, and submodules are a blueprint
   non-goal. The tag is the human handle, `core` is the machine value.
2. **The prune pass is not implemented in v0.3.** The sentence states the contract
   (deletion is a separate explicit step) and says so about the tool, instead of
   naming a `--prune` flag CLI06 does not have; today the tool lists leftovers and
   its migration note says "review and delete by hand". The contract stays visible
   without becoming a false claim about behaviour, and the flag remains an open
   question for v0.4.
3. **CLI01 writes only `{id, kind, path, version}` per part.** The lock section
   states the target schema, which is additive: CLI06 spreads `{...part}`, CLI05
   grades a missing hash as `unknown` (a rule the document already states), CLI07
   requires only the four fields it reads. An old game is valid and adopts the
   fuller shape on its next upgrade and sync. Making CLI01 write `source` and
   `installed` immediately is the cleaner fix; it is a one-line change in an
   accepted tool, so it is an open question, not a silent edit.
4. **Doctor does not hash and does not check library sources.** Not restated twice:
   the line names CLI05 as the owner, so each fact has one home and doctor cannot
   go green over a modified file.
5. **Keep a Changelog rejected.** The duty is one line per break plus a migration
   note, and CLI06 already generates the note beside the change. A second document
   format would be a template X03 does not own. Recorded in `SOURCES.md` dead ends,
   not counted as a source.
6. **`engineRange` grammar, `stability`, `files`, `hashes`, `selftest`, `upgrade`
   manifest fields: N00's.** Referenced by name only.
7. **No prerelease or `+build` policy for parts, no per-part version matrix, no
   game-level changelog.** Nothing enforces them yet, and a rule with no check is
   padding (R5, R6).
8. **No CLI flag tables.** Only the three flags a contract line turns on:
   `--apply`, `--force`, `--strict`.
9. **No hash algorithm negotiation.** sha256 hex is CLI05's fixed choice.
10. **No release or publish procedure.** SL and CLI parts own it; X03 only fixes
    what a tag means.

## Size

| File | Lines | Characters | Tokens (`chars/4`) | Words | Tokens (`words*1.35`) |
|---|---|---|---|---|---|
| `VERSIONING.md` | 87 | 3,553 | 888.3 | 585 | 789.8 |

Limit 900 by `chars/4`: 11.7 under it, 8.3 above the 800-880 band. Both increases
from the first draft were deliberate: +21 characters for the R6 correction
(blueprint line 141 is "every addition replaces or merges something", not "deleting
a part"), and +32 to mark the prune pass as not implemented in v0.3 rather than
name a flag CLI06 does not have.
