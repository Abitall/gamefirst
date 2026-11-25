# X03 - versioning: build report

Status: complete, pending review
Artifact: `staging/X03/artifact/library/core/versioning/VERSIONING.md` -> target
`library/core/versioning/VERSIONING.md`
Scope: thin protocol. Three sources (two external, one accepted internal). Limit
900 tokens by `chars/4`; target 800-880. No tool was modified; nothing was
committed.

## Summary

- The artifact fixes what a version means in three places: the framework (`VERSION`
  at its root, tag `v0.3.0`, never a lock value), a part (`0.x` until a game used
  it through a gate and its check passed, then `1.0.0`, and any later change or
  merge is a MAJOR), and a game (no `VERSION`; `version` is the game, `core` is the
  framework).
- `agent.lock.json` is defined as the single record: `version`, `core`, and `parts`
  with `id`, `kind`, `path`, `version`, `source`, `hash`, `installed`, plus
  `engineRange` for an engine pack. `id` survives a rename; an absent hash is
  `unknown`, not healthy.
- The upgrade, doctor, changelog, migration and engine-pack sections state what the
  tools owe, not how they are built: dry run is the default and the diff; changed
  and missing parts drop `hash` for CLI05; removed parts stay on disk and the prune
  pass is marked not implemented in v0.3; nothing is overwritten without a diff; an
  old lock is read and rewritten in the current shape; a pack installs only inside
  `engineRange` and is 1.0.0 only with a passing selftest.
- Written against the accepted tools line by line: CLI06 statuses and its
  `{ hash, ...rest }` apply, CLI05 hash and status vocabulary, CLI07 exit codes and
  `--strict`, N00's `engineRange` and `hashes`, blueprint E11 and R6. When a claim
  was not true of the code (doctor does not hash; CLI06 has no prune pass; CLI01
  writes four part fields), the text names the owner or the absence instead of
  inventing behaviour, and the gap is listed below.
- One correction during the build: R6 was first cited for "deleting or merging a
  part is a MAJOR". Blueprint line 141 says the opposite shape -- "every addition
  replaces or merges something" -- so the sentence now makes replacement and merge
  the MAJOR-triggering event, which is what R6 actually requires.

## Size

| File | Lines | Characters | Tokens (`chars/4`) | Words | Tokens (`words*1.35`) |
|---|---|---|---|---|---|
| `VERSIONING.md` | 87 | 3,553 | 888.3 | 585 | 789.8 |
| `JUSTIFICATION.md` | 209 | 13,059 | 3,264.8 | 2,124 | 2,867.4 |
| `SOURCES.md` | 101 | 5,875 | 1,468.8 | 947 | 1,278.5 |
| `REPORT.md` | this file | - | - | - | - |

The artifact is 11.7 tokens under the 900 cap and 8.3 over the top of the 800-880
band. Both increases from the first draft were deliberate: +21 characters for the R6
correction above, and +32 to mark the prune pass as not implemented in v0.3 instead
of naming a flag CLI06 does not have. Not trimmed further because every remaining
token is a rule somebody enforces; if review wants the band respected exactly, the
cheapest cut is `encoding, path and link faults` in `## Doctor` (37 characters),
which CLI07's own part covers. A cut of 100 characters would need a rule removed.

## Checks

| Check | Result |
|---|---|
| UTF-8, no BOM | yes (first bytes checked) |
| LF only, no CRLF | yes (`\r` absent) |
| No double-brace placeholders | yes (0 matches) |
| No YAML frontmatter | yes; line 1 is `# X03: Versioning` |
| JSON example parses | yes (`JSON.parse` on the fenced block) |
| POSIX paths only, no backslash or drive letter | yes (0 matches) |
| Line width | max 81 characters |
| Sections | 7 `##` sections plus intro line and ID line |
| IDs called | CLI05, CLI06, CLI07, N00, N01, E11, R6 -- all in `SOURCES.md` synthesis table |
| CLI05, CLI06, CLI07 exist | `tools/sync-agent.mjs`, `tools/upgrade.mjs`, `tools/doctor.mjs` |
| E11 and R6 exist | `docs/V0.3-BLUEPRINT.md:211` and `:141` |
| N00 | `staging/N00/artifact/library/engines/CONTRACT.md` present, not assembled |
| N01 | `library/engines/phaser` present; `staging/N01` not started |
| `--prune` flag in CLI06 | none; the artifact no longer names one (says "not implemented in v0.3") |

Not run: no linter covers `staging/`, and the four-file shape is checked by hand
above. The `## Check` block in the artifact is a manual recipe, three commands on a
scratch repo, not an automated eval.

## Rubric

| # | Area | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | Every unit in `JUSTIFICATION.md` carries why, what breaks without it, and a source; no unit survived without a failure it prevents. |
| 2 | Function | PASS | Trigger (any version question or upgrade), input (lock plus trees), output (the contract), done (`## Check` passes), failure (exit codes named), scope (thin protocol, no tool internals). |
| 3 | Evidence | PASS | Two external sources with URL, date, licence, verified quotes, borrow and reject; one internal accepted tool quoted from source; synthesis, not copying. |
| 4 | Fit with blueprint | PASS* | Core layer, no engine imports; every ID and path is the blueprint's; no contradiction with an accepted tool. Gaps are tool-side, not text: CLI06 has no prune pass, CLI01 writes four fields. See Known gaps. |
| 5 | Size | PASS* | 888.3 by `chars/4` against a 900 cap; 8.3 over the band top, disclosed with the exact cuts available. |
| 6 | Language and encoding | PASS | English artifact, UTF-8 without BOM, LF, POSIX paths, no placeholders. |
| 7 | Security | PASS | No network, no secrets, no execution; it forbids silent overwrite and silent deletion, which protects a game's local edits. |
| 8 | Testability | PASS | `## Check` is three commands with expected exits; the JSON block is a ready fixture; CLI07's exits make the recipe CI-able. |
| 9 | Integration | PASS | Stable IDs, cross-references resolve against real files, loadable alone, no engine, OS, or editor assumption. |

Verdict: accept, with the gaps below recorded rather than hidden.

## Known gaps

- **No prune pass in v0.3.** `upgrade --help` offers `--apply`, `--dry-run`,
  `--force` and `--json`; removal today is "review and delete by hand" in the
  generated note. The artifact says exactly that: the deletion step is named, marked
  as not implemented in v0.3, and kept out of an apply. No line promises a flag.
- **CLI01 writes `{id, kind, path, version}` only.** The lock section states the
  target schema with `source`, `hash`, `installed`, and `engineRange` for packs. It
  is additive and safe: CLI06 spreads `{...part}`, CLI05 grades an absent hash as
  `unknown`, CLI07 requires only the four fields it reads. A fresh game therefore
  has a valid but thin lock until its first upgrade and sync.
- **Doctor has no hash or source check.** The text gives those to CLI05 by name, so
  no claim is false and no fact lives twice. If doctor should print them itself, that
  is a CLI07 change, not an X03 change.
- **Removed parts keep their old `version`** in the lock until deleted. Inherited
  from CLI06; the artifact does not promise otherwise.
- **Size band.** 888.3 versus 880.0; cut available and named in the size section.

## Open questions

1. **A prune pass in v0.4?** The contract is written and marked unimplemented; the
   tool side is a new CLI06 flag that deletes only parts listed as `removed`, behind
   an explicit confirmation. That touches an accepted tool, so it needs approval.
2. **Should CLI01 write `source` and `installed` at creation?** It knows both (the
   source tree and the date) and one line closes the schema gap, including
   `engineRange` for a pack created with `--engine`. It is a change to an accepted
   tool, so it needs approval.
3. **Pack stability versus 0.x.** N00 has a `stability` field (`stable` or `beta`)
   while X03 ties 1.0.0 to a passing selftest. If a 1.0.0 pack fails its selftest on
   a new pin, does its `version` fall back to `0.x` or does only `stability` flip?
   N00 owns the answer; X03 currently reads consistently either way.
4. **Does the game's own `version` ever follow the framework?** The artifact says no
   by construction (`version` versus `core`). A game that wants "framework 0.4,
   game 0.2" is fine; a game that wants one number for both is not covered by
   design.

## Review

Review: pending
