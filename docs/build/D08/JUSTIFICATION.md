# D08 - engine doc: justification

The page answers four questions without guessing: which engine version runs,
which members are proven on it, what already broke, and how to check a build.
`REVIEW-RUBRIC.md` section 1 asks for this table; every row below is one
semantic unit of `artifact/template/docs/engine/ENGINE.md`.

## Frame and scope

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| `# ENGINE DOC` + intro, L1-7 | Names the file, the `ENGINE.md` -> `docs/engine/<engine>.md` rename, the facts-only scope, and the decision link. | A project keeps the template name or invents a path; the page grows into a second design document. | Task brief; build plan row 91; E02 |
| "one file for the one engine", L3-4 | A repo switches engines by replacing the adapter and pack, not by listing two. | Two pins share one page; recipes and members mix engines; no authority wins. | `template/AGENTS.md:40-41` |
| "choice is a `DECISIONS.md` entry" and "linked not copied", L5-7 | The choice has one home; the page records its result and points at the matrix and spike log. | Two decision records drift; the page argues the choice instead of stating the outcome. | S07 step 6; R5 |

## Pin

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| `Engine`, L10 | Keeps the page self-contained when linked or printed; the selftest can compare a string. | A reader must infer the engine from the filename or the pack section. | E11 |
| `Exact version` + authority, L11 | A version number alone is memory; the named file is checkable by the selftest. | The pin becomes whatever the last editor remembered; three-dot versus exact versions go unnoticed. | E11 |
| `Range` + `engineRange`, L12 | States the supported window; the exact version must sit inside it. | A major upgrade looks supported; a downgrade passes review. | N00 |
| `In force` and project override, L13-14 | The repo, not a shared pack, decides which engine runs; the pack supplies defaults. | A pack update changes the engine silently; two projects on one pack cannot pin differently. | A03; N00; `library/core/agents/engineer.md:66-74` |
| `Change` through a decision, L15 | An engine or version change is an architectural choice, not a maintenance edit. | Silent bumps and downgrades; the pack, adapters, and recipes fall out of step. | E11; R1 |
| `No pin` -> `blocked`, L16 | The anti-guess rule: an unknown version is a question, not a plausible number. | A fabricated version produces invented API and a page that cannot be verified. | Task brief; E02 |

## API source

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| Authority order, L19-20 | Installed metadata is exact for the pin; official docs for the same version are the fallback. | Blog posts and `latest` pages become facts; member signatures drift from the installed engine. | E02; E11 |
| Banned sources and the spike rule, L21-22 | A member that is not proven on the pin is an experiment, and the page must stop and ask. | Guessed API ships; a spike is recorded as a verified member. | E02; E11 |
| Members table, L24-26 | Gives the selftest a concrete list and gives a reviewer a dated source per member. | "Verified calls" stays a claim; the selftest has nothing to check. | E11 |

## Pitfalls

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| One entry per reproduced failure, L29-30 | A pitfall is evidence of a failure, not folklore or a prediction. | The section fills with rumors; readers cannot tell a real break from a preference. | R5; bevy migration notes |
| Symptom -> check -> fix -> version, L32 | Makes each entry actionable and attributable to a release. | An anecdote without a reproduction or a fix wastes the reader's time. | bevy migration notes |
| Phaser `shakeCamera` example, L33-34 | Shows the format with the real E11 case, including the no-shim rule; labeled "Example". | The format stays abstract; authors invent a shape for the first entry. | E11 |

## Recipes

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| Config overrides the pack recipe, L37-38 | One effective recipe per repo; the pack default is a starting point, not a second truth. | The page and `project.config.json` give different commands; neither is authoritative. | S02; N00 |
| Commands copied, never invented; one edit, L38-39 | The page records what runs; changing the config without the table (or the reverse) is the failure mode. | A reader runs a command that never existed, or a stale command that no longer passes. | S02; TypeScript `CONTRIBUTING.md` |
| `verify` adds claim checks, L40 | The engine page is not the whole verification stack; a mechanic still needs its claim-specific checks. | A green engine build is mistaken for proof that a mechanic works. | S02 |
| Build row, L44 | Proves the game compiles and bundles; pass is exit 0 plus a non-empty artifact. | No artifact to test; a compile error hides behind a green script. | S02 |
| Test row, L45 | Proves the named rules and flows hold. | The page has no behavioral evidence; "it builds" is the only claim. | S02 |
| Smoke row, L46 | Proves the game boots and the loop runs in a playable frame. | Green tests on a game that cannot start; the first playtest finds it. | S02; D08 blueprint ("smoke") |

## Pack

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| Pack id and `agent.lock.json`, L49 | Names the exact pack version and where its installed parts are recorded. | A reader cannot reproduce the engine setup; a half-installed pack looks complete. | N01-N03; `tools/new-project.mjs:192-197` |
| Selftest equation, L50-51 | Pin = installed version = every verified member; this is the drift check. | A page can claim 4.2.1 while 4.1 is installed; members disappear unnoticed. | E11 |
| `stable` only on a passing selftest, L51 | Pack status must reflect the pin it was tested against, not its label. | A beta or broken pack is presented as stable; the project trusts it. | N01-N03; D08 blueprint |
| Upgrade via `CLI06` dry-run, L52 | An upgrade is checked before it lands; a failing selftest blocks it. | The project upgrades into an untested pack and discovers it at runtime. | R1; E11 |

## Verified

| Unit | Why | Breaks if removed | Source |
|---|---|---|---|
| Date and evidence path, L55 | Turns the page from an assertion into a dated record with a place to look. | A stale page looks current; no one can find the run that proved it. | S02 |
| Re-run and stale blocker, L55-56 | Defines when the proof expires: a pin or pack change invalidates it. | A page verified once is trusted forever, across upgrades. | R1; S02 |

## Rejected alternatives

- **Split `VERSION.md` + `API.md`** (E11 fixture layout). Rejected: two files and
  two places to drift; one page can hold the pin, the members, the pitfalls, and
  the recipes. E11's fixture stays a check, not the document shape.
- **A status field (`draft`, `working`, `stable`)**. Rejected: the date plus the
  evidence path is stronger for a document; pack status belongs to the pack, not
  to the engine page. D06's status vocabulary is for system cards.
- **Copying the full CI recipe or YAML into the page.** Rejected: the config and
  CI are executable; the page records the effective commands. A second full copy
  would drift, and the one-edit rule already covers the table.
- **Inlining the engine matrix and spike log.** Rejected: S07 owns them, and a
  copy would drift. The page links; it does not restate the comparison.
- **`latest` docs as the first authority.** Rejected: the page is pinned; docs
  that move under the pin are not evidence. E02 and E11 both require the exact
  version.
- **The nine-source deep protocol.** Rejected for this part: the task sets a
  medium budget (3 external + 2 internal). The five sources cover the three
  borrowed mechanisms and the two internal vocabularies.
- **Engine-specific snippets beyond the one example.** Rejected: the template
  must fit any engine. The single Phaser line is labeled and replaceable.
- **A pin-only page (version + commands).** Rejected: without pitfalls and the
  selftest, the page cannot explain a failure or detect drift; it becomes a
  bookmark.
