# P01 justification - release pack

## Why the pack exists

`docs/BUILD-PLAN.md:102` assigns P01 to `library/packs/release/`; the directory
was empty and the installer fails loudly on an unimplemented pack
(`docs/build/BATCH-10-REVIEW.md:60-62`). The release procedure already exists in
S13 (`library/game/skills/release/SKILL.md`), the preparation boundary in C03
(`library/game/crews/release-crew.md`), and the decision in G3
(`library/game/gates/G3-ship.md`). What none of them carries is the reference
layer a release is checked against: the per-platform requirement rows, the store
page field inventory, the build record fields, crash thresholds, legal inventory,
and the timed watch after launch. S13 says "read the current checklist" without
saying what a complete one contains; G3 checks eight points without naming the
evidence fields behind them. The pack fills that gap on demand and adds no rule,
no procedure, and no authority.

## Unit-by-unit necessity

| Unit | Why it exists | If removed | Duplicated elsewhere? |
|---|---|---|---|
| Load line and hand-off to S13/C03/G3 | Names the trigger and prevents the pack from becoming a second procedure | An agent may load it as a process and skip S13 | No; S13, C03, G3 each state their own scope |
| Five boundaries | Stops publishing, secrets, marketing copy, stale rules, and a false "approved" reading of a green selftest | The pack could be read as permission to upload or as certification advice | R4/E12 own the rule; the pack only restates the boundary for this layer |
| Pack contract block | One shape for P02-P07, so the next six packs do not invent schemas | Each pack invents keys, caps, and hash rules; tools cannot read them uniformly | N00 owns the engine pack shape, not the game pack shape; no overlap |
| §1 Platform requirements | A complete row set per platform family, with evidence and owner | "Check platform rules" stays unmeasurable; a missing row is invisible | S13 step 1 says read the checklist; this names the rows |
| §2 Store pages | The field inventory a page needs before it can be called ready | Store checks collapse to "page exists" | S13 step 2 checks presence; this lists the fields and the logged-out check |
| §3 Build pipeline | The record fields behind "build from the tag" and provenance | A build can be tagged but not reproducible or attributable | S13 step 3-4 owns the actions; this owns the record shape |
| §4 Crash reporting | Symbols, build-id match, a real test crash, a threshold, and an owner | "Crash reporting on" passes without a symbol match or a test crash | S13 step 6 names the channel; this adds the measurable bar |
| §5 Legal and privacy | The licence, notice, rating, and disclosure inventory | Legal is checked once and forgotten on the next store | S13 step 7 names the duty; this lists the evidence |
| §6 Launch day | The minimum live-state checks, including rollback and keys | Launch becomes "build is up" and misses media, patch, support | S13 step 8 names a checklist; this fixes its lines |
| §7 72h watch | A timed watch with hourly, daily, and report points | The watch is promised but not scheduled; hotfixes skip the tag | C03 names 72h; this turns it into rows |
| §8 No-publish rule | One explicit statement that the pack, selftest, and reader never publish or spend | A green run could be mistaken for a ship decision | R4/E12/G3 own the rule; this is the pack's local boundary |
| `templates/release-record.md` | A fill-in evidence page; blank rows are holds, and the 24h/72h rows cannot be skipped | Every release re-invents the G3 page; timed rows get dropped | S13 step 9 names a one-page output; this is its reusable form |
| `selftest.mjs` | Proves manifest, files, hashes, encoding, placeholders, caps, and extras | A pack can drift, ship an empty file, or keep a secret pattern | N00's selftest is the format model, not a duplicate pack check |
| Eight manifest keys | The smallest set a tool needs to install, verify, and locate a pack | Installers guess; packs become unverifiable | N00 has engine-specific keys (`engine`, `parts`); these are the game-pack subset |

Shorter without loss? The eight checklist sections are already one screen each;
the platform families share one row shape. Per-store text was cut: it changes
without notice and would blow the cap. The pack is 1,094 tokens against the
1,500 cap; the template is 365 tokens; the selftest is 220 lines against 250.

## Why a pack, not a rule or a skill

Priority is mode > rules > skill > pack > docs. A rule would bind every task to
release constraints that matter only near a ship. A second skill would fork S13's
nine steps and create two sources of truth. A pack is loaded on demand, adds
reference data, and disappears from context when unloaded. The procedure stays in
S13; the decision stays in G3; the pack is the checklist those two point at.

## Design decisions

- **Eight required keys, optional `$schema` only with a shipped file.** Tools need
  identity, dependencies, load mode, a file list, hashes, a selftest command, and
  an upgrade path. `$schema` is omitted because no schema file ships; a remote
  schema would be a network dependency and a stale claim.
- **`files` is the recursive directory listing minus `manifest.json`.** This is
  the N00 rule, extended to nested `templates/`. Extra files fail, so a stray
  secret or draft cannot ride along.
- **Token cap measured as chars/4.** Same convention as the rest of the project;
  the selftest reports the measured value.
- **The selftest is packaging-only.** It checks structure and evidence presence,
  not store behaviour. Claiming more would need a network and a store account,
  which the pack must never hold.
- **One template, not a folder of forms.** The release record is the only artifact
  copied per release; per-store forms would duplicate store pages and age.
- **English, UTF-8 without BOM, LF, POSIX paths.** Matches the artifact rules and
  keeps the pack portable across Windows and CI.

## Rejected alternatives

- **Copy a Steam or console checklist verbatim.** Store rules change without
  notice, the text is not ours to redistribute, and a full TRC would exceed the
  pack cap many times. The pack names the row categories and sends the reader to
  the current holder document.
- **Restate S13's nine steps.** Duplication; two procedures drift. The pack
  instead supplies the fields S13 checks.
- **Ship butler/goreleaser/semantic-release configs.** Tool lock-in, network
  writes, and a Node/Go dependency for a documentation pack.
- **Per-store files under `templates/`.** Eight sections already fit in 1,094
  tokens; splitting by store multiplies maintenance and busts the cap.
- **A JSON schema file.** No consumer exists yet, and the task forbids a
  `$schema` that points at nothing.
- **A publish helper.** The pack is read by an agent that must stop before any
  upload; a helper would invite exactly the action R4 forbids.

## Limits and risks

- Store requirements drift; the pack can only say "re-read the current checklist".
- The pack is not legal or certification advice; certificates and approvals are
  human evidence.
- `requires` and `loaded` are descriptive until an installer reads them; this is
  recorded as an open question in `REPORT.md`.
- The selftest cannot prove a store accepts a build, only that the pack is
  internally consistent.

## Size

| File | Bytes | Lines | Tokens (chars/4) |
|---|---|---|---|
| PACK.md | 4,375 | 100 | 1,094 |
| manifest.json | 525 | 15 | 132 |
| selftest.mjs | 7,908 | 220 | 1,977 |
| templates/release-record.md | 1,460 | 73 | 365 |

PACK.md is 73% of its cap. The selftest is 88% of its line budget. No file is
empty, and no hash is empty.

## Integration

Installed under `library/packs/release/`; `project.config.json` maps the pack to
its directory; `agent.lock.json` records version and hashes (CLI01/CLI05). The
pack needs only `core` and `game`. Unloading is deleting the directory; there is
no runtime hook and no network call.
