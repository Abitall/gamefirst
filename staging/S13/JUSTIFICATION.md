# S13 release - justification

Source codes: `B:<line>` = `docs/V0.3-BLUEPRINT.md` line; `R<n>` = `library/core/rules/R<n>-*.md`; `SRCn` = entry in `SOURCES.md`; `S02:40` = the release row of the S02 claim table; `authored` = this part fixes the unit itself, with no upstream equivalent in the sample.

## Frontmatter

| Unit | Why | If removed | Source |
|---|---|---|---|
| `name: release` | Matches the S13 row id, so the skill is addressable as `release` everywhere. | The router cannot resolve S13 to a file; cross-refs in S12 and S02 dangle. | `B:163`, house shape |
| `description` | One sentence: input (a ship candidate), procedure, position (after polish, after feature freeze). The router picks by this line alone. | The skill is found for "release notes", "launch tweet" and "hotfix", which belong elsewhere. | `B:163`, `B:192`, `B:309` |
| `allowed-tools: Read, Write, Edit, Glob, Grep, Bash` | Bash is needed to build and checksum; nothing else is. The list is the capability ceiling. | No build, so the artifact under test is a claim; or unrestricted tools, so an unattended run can push. | `authored`, `R4`, `R10` |

## Role line

| Unit | Why | If removed | Source |
|---|---|---|---|
| Install on a clean machine is the ship evidence | Names the only fact that overrides a green checklist: the build ran somewhere that is not the dev box. | A candidate can be called ship-ready because the checklist is green while the store build is broken. | `R1`, `S02:40`, `SRC8` |
| G3 is a human decision; publishing waits for an explicit command | Splits authority: the skill prepares, the human decides, the command publishes. | The skill is read as the decision maker, or the gate as an approval to upload. | `B:193`, `R4` |

## Trigger

| Unit | Why | If removed | Source |
|---|---|---|---|
| G3 close: G2.5 done, S12 done, one playable candidate | Three checkable preconditions; "playable" keeps an unbuilt branch out of release prep. | The skill starts on a branch with no build, and every step becomes a promise. | `B:192`, `B:193`, `S02:40` |
| Not for copy/positioning, new features, hotfixes, unexportable platforms | Four nearest misuses, stated once instead of in prose. | The skill absorbs P07 marketing work and post-launch hotfixes, and its size doubles. | `B:309`, `B:144`, `B:409` |

## Inputs

| Unit | Why | If removed | Source |
|---|---|---|---|
| Candidate: semver, tag, artifact, passing S02 | The four identifiers every later line cites; without them evidence cannot be matched to a build. | Checksums and screenshots float free of a version, and G3 cannot name what it ships. | `S02:40`, `B:163` |
| Targets: store, OS, architecture, one build command each; unsupported is cut | Turns "platform requirements" into a countable list and makes an unsupported target a scope cut, not a wish. | Targets appear during certification; the build matrix is discovered after the date is set. | `B:144`, `B:163`, `SRC1`, `SRC3` |
| Today's store rules, rating questionnaires, licenses, privacy policy | The inputs that expire: store requirements change, so the skill reads them per run instead of caching them. | Last year's checklist is applied; the submission is rejected on a metadata change. | `B:163`, `B:362` |

## Steps

| Unit | Why | If removed | Source |
|---|---|---|---|
| 1. Rules first: version, deadline, fee, questionnaire answers, privacy duties; fee = spend | Puts the expiry-prone facts before any build work, and marks money as a spend action. | A fee is paid or a deadline missed without a command; the questionnaire is answered by memory. | `B:163`, `B:212`, `R4`, `E12` |
| 2. Store page: caps, screenshots, trailer at store pixel sizes; description, tags, price, demo, wishlist; P07 owns words; page names its build | The only step that is pure asset compliance, and the only place the copy boundary is drawn. | Screenshots arrive at the wrong resolution, or S13 starts writing positioning text. | `B:309`, `B:163`, `authored` |
| 3. Build from the tag: clean clone, no local edits, version stamped from tag, one commit feeds every target | Reproducibility in the form a solo repo can actually check: the artifact must be derivable from the tag. | The shipped binary was built from an uncommitted working tree and cannot be rebuilt or audited. | `SRC1`, `SRC3`, `R1` |
| 4. Sign and checksum the artifact, not the label; verify after upload; mismatch is a hold | Names the failure that signing cannot catch: signing a name that later points elsewhere. | A correct signature on the wrong bytes, or a checksum recorded before the upload finished. | `SRC6`, `SRC5`, `R4` |
| 5. Install test on a clean machine or profile: install, launch, play five minutes, save, reload; capture | The step that produces the evidence R1 and S02 both accept; "play five minutes" is the cheapest playable check. | A build that installs but crashes on first save passes, because nobody launched it. | `S02:40`, `SRC8`, `SRC7` |
| 6. Crash reporting: one channel, symbols for this build, a test crash seen; no telemetry by default; a human watches 72 hours | Distinguishes crash capture from analytics, gives the post-launch watch an owner who can keep wall-clock time, and bounds it at 72 hours. A sub-agent session cannot watch a channel for three days: naming A03 would either be a promise nobody keeps or a scheduled automation holding a support channel, which R10 does not cover. | Crashes are invisible for the first days, or the watch is assigned to an agent that cannot hold it, or telemetry ships by default against the blueprint. | `SRC3`, `SRC7`, `B:407`, `R10`, `authored` |
| 7. Legal: license and attribution per asset and engine, notices inside the build, EULA and privacy URL live, secrets by reference | Makes licensing a build content item, not a docs page; keeps credentials out of the repo. | A GPL or OFL asset ships unattributed; a token lands in a log or a diff. | `SRC2`, `B:305`, `B:362`, `E12`, `R4` |
| 8. Launch checklist, one line each with a path: smoke, page live, download, keys, support FAQ, rollback | The rollback line is the one nobody writes; the path per line is what stops a verbal checklist. | Launch day is improvised, and the rollback plan exists only in someone's head. | `SRC5`, `SRC8`, `SRC1`, `R4` |
| 9. G3 pack: one page with version, tag, checksum, targets, checklist, risks; decision line and date are the human's | Matches the gate's stated form (one line plus a date) and keeps the decision out of the skill. | G3 is decided from chat scrollback; the gate has no artifact and no date. | `B:193`, `B:342`, `B:183` |

## Output

| Unit | Why | If removed | Source |
|---|---|---|---|
| `evidence/<YYYY-MM-DD>-release/` with checksum, install capture, screenshots, license list, checklist, G3 page; line without a path is a hold | One directory G3 can open without asking questions; the hold rule makes an empty line visible. | Evidence is scattered across chat and desktop, and "done" means someone said so. | `R1`, `R4`, `template/evidence/` |
| A G3 line: ship or hold; a green checklist uploads nothing | Separates the verdict from the upload, in one sentence. | The gate reads as an upload trigger; a clean run publishes itself. | `B:193`, `R4`, `SRC5`, `SRC8` |

## Blocked

| Unit | Why | If removed | Source |
|---|---|---|---|
| Rules changed mid-prep: re-read and re-record | Store rules move while a release is being prepared; a stale record is the common failure. | The checklist cites a version of the rules the store no longer serves. | `B:329`, `B:163` |
| Missing certificate, rating or license: name it, hold | Three blockers that are cheap to name and expensive to discover late; "name it" produces the next action. | Release prep continues around a missing rating and the block is found at submission. | `B:163`, `authored` |
| Autonomous run: stop at upload, report what is staged | R10 runs must not reach the publish boundary; the report is what the human resumes from. | An unattended run uploads, or silently stops without saying how far it got. | `R10`, `R4`, `E12` |

## Out of scope

| Unit | Why | If removed | Source |
|---|---|---|---|
| Marketing copy, certification negotiation, live-ops, refunds, cutting scope to move a date | Five adjacent jobs that each have an owner or a rule; naming them stops scope creep into the skill. | S13 becomes launch management; the sibling parts lose their boundary. | `B:309`, `B:409`, `B:144` |

## Cross-refs

| Unit | Why | If removed | Source |
|---|---|---|---|
| `G3, R1, R4, R9, R10, E12; S02 check, S12 before, P01, P03, P07, A04.` | One locator line, IDs only, no rule text repeated; S12 already points back to S13. | The reader has to reconstruct which rules govern the skill and which parts neighbour it. | `B:193`, `B:212`, `B:303`, `B:305`, `B:309`, `R1`, `R4`, `R9`, `R10` |

## Design decisions and rejected alternatives

- **Checklist with paths, not a generated report.** No repository in the nine-source sample ships store metadata, rating questionnaires or wishlist assets (see `SOURCES.md`, Finding). A generated store template would be invented, and store field lists change yearly. The skill instead demands one line per item with a path, so the checklist is verified by opening files (`R1`).
- **Draft by default, taken literally.** goreleaser's comment (`release.go:213-214`) and OpenRA's `--draft` flag are the same idea: the pipeline may create a release object but must not make it public. Encoded as "a green checklist uploads nothing", not as a tool flag (`SRC5`, `SRC1`).
- **Sign the digest, not the tag.** cosign's warning is the exact failure mode of a store upload by channel name, so the step is worded as a principle with no tool named; the framework stays tool-agnostic (`SRC6`).
- **Version from the tag, not typed.** Both OpenRA (`Makefile:55`) and OpenMW (`windows.yml:182`) derive the version from git and record the commit in the artifact; the skill forbids typing it into a config (`SRC1`, `SRC3`).
- **Rejected: bit-identical rebuild verification.** The blueprint asks for a build that installs, and a solo Phaser repo has no toolchain to prove byte equality. Clean clone plus tag-stamped version is the checkable substitute; the gap is disclosed under Known tensions.
- **Rejected: butler channel vocabulary.** Channels are an itch.io concept; the skill generalizes to "one build command per target" so a Steam or console target fits the same sentence (`SRC4`).
- **Rejected: electron's CVE/backport table.** It is release engineering for a product with an LTS branch; only "get sign-off before continuing" survives, and R4 already owns it (`SRC7`).
- **Rejected: positioning and copy in S13.** P07 owns capsule, trailer, wishlist and calendar (`B:309`); S13 checks presence, size and that the page names its build, which is the part that can be verified.

## Deliberate omissions

- No pixel-size table, fee amounts or rating question lists: they differ per store and change without notice, and a stale table is worse than a pointer to the store's own checklist.
- No signing-key or certificate handling procedure: only "secrets by reference" is stated, because the storage location is environment-specific and `B:362` plus R4 already forbid the leak.
- No hotfix procedure: it starts after launch, which the Trigger excludes; R4 owns the publish boundary it would reuse.
- No store account setup, legal entity naming, refund policy or tax handling.
- No EULA or privacy policy text, and no third-party notice template: the skill requires the files to exist and ship, it does not author them.
- No accessibility or controller certification matrix: the blueprint defines none, and inventing one would make S13 a platform compliance oracle it cannot keep current.

## Known tensions

1. **72-hour watch vs the "Live-ops" non-goal (`B:409`).** One sentence adds post-launch work. Resolution: it is one human watching one channel, no dashboard and no telemetry, scoped to crashes only; if the blueprint wants zero post-launch work in S13, deleting the sentence leaves the step intact.
2. **"Reproducible" is claimed more strongly than it is checked.** Clean clone and tag stamping are verifiable; byte-identical rebuilds are not, and the skill does not claim them.
3. **Rating questionnaire answers have no home path.** `template/docs/` holds `engine/`, `guide/`, `playtests/`, `systems/` and nothing for store paperwork; step 1 says "record" without naming a file, deliberately, because no template exists. If one lands, the step gains a path.
4. **Size is carried by backticked identifiers.** `words x 1.35` sits below the 720 band for the same structural reason as S09: paths and IDs count as one word each.
5. **Five cross-refs are not files yet.** `G3`, `E12`, `P01`, `P03`, `P07` exist as blueprint lines and empty directories; they resolve as IDs today and as paths after those parts land.
