# P07 justification - marketing pack

## Why the pack exists

`docs/V0.3-BLUEPRINT.md:311` defines P07 as "Positioning, capsule, trailer,
wishlist, demo, press kit, launch calendar". S13 already names the gap from the
other side: it refuses store copy and positioning and says "P07 owns the words"
(`library/game/skills/release/SKILL.md:25`), while C03 repeats the boundary
"copy stays with P07" (`library/game/crews/release-crew.md:28`). P01 lists the
store page fields a release must have (`library/packs/release/PACK.md:51-57`) but
does not say what makes the words true, what a capsule or trailer brief contains,
how a wishlist or demo beat is timed, or which claim may be printed. The result
today is a hole: copy exists nowhere, a release check can only see that a field
is filled, and the highest-risk failure - a true build behind a false claim - is
invisible to every existing unit.

The pack fills that hole on demand. It adds reference and checklists only: no
procedure, no rule, no runtime code, no posting, no upload, no spend.

## Unit-by-unit necessity

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| When-to-load paragraph | Names the trigger and the four owners (S13, C03, G3, a human), and states that the pack writes no final copy | The pack is loaded as a process, or copy is treated as the pack's output | Blueprint P07; `S13:3,25`; `C03:28`; `G3:24` |
| Boundaries | Six hard lines: no post/upload/spend, no fake signal, evidence per claim, human writes, rules change, green selftest is not approval | The pack becomes permission to post, or a fabricated wishlist looks like initiative | `R4`, `E12`, `S13:37,43` |
| Holder entry points | One line pointing at the live Steam, itch, Apple, Google, Xbox, PlayStation, Nintendo pages, read on the day | A remembered capsule size or fee is quoted as fact; the pack ages into wrong advice | `S13:24` ("read the current checklist") |
| Audience and positioning | Seven questions in order, each answerable with a build or a person, ending in a recall test | Positioning collapses into adjectives; nobody can tell whether the promise is understood | Blueprint P07; `R7` (diverge before converge) |
| Store page copy fields | Eleven fields with one rule each, ending in "a human fills price/demo/time" | "Page exists" passes; a subtitle, tag or requirement the build cannot support ships | `P01:51-57` (presence only); `S13:25` |
| Capsule, screenshots, trailer | The brief shape (purpose, visual, crop-safe subject, text-safe zone, build id, owner, date) and three asset rules | Assets are ordered as "make it pop"; a screenshot from an older build becomes a claim | Blueprint P07; `R1` (build is truth) |
| Wishlist, demo, press kit | One paragraph per artifact: what it is, what it must record, what is forbidden | Wishlists get bought, demos drift from the build, press kits become a folder of files | Blueprint P07; `R4` (no spend/seed) |
| Community and launch calendar | Seven beats from T-8w to T+72h, each with "done means", plus cadence over bursts | Launch is a single day; the page, kit, demo, keys and patch compete in the last week | Blueprint P07; `S13:31`; `C03:32` |
| Claims and evidence | Five claim classes, an evidence column, and three rules (superlative, coming soon, cut feature) | A claim cannot be checked, so the only honest default is to cut all copy | `R1`, `G3:19`; `S13:25` (checkable part) |
| Review checklist | Nine pass/fail/N/A rows with a path; blank is a hold | Review is a conversation; the same page passes twice with different evidence | `S13:36` (evidence folder); `A04` (blind read) |
| Holds | Seven named stop conditions | A hold is discovered at G3 instead of at the desk where it can be fixed | `C03:23` ("a line without a path is a hold") |
| Cross-refs | One locator line, IDs only, no rule text repeated | The reader reconstructs which rule governs which row | `S13:49-51`; `G3:37` |
| `templates/press-kit.md` | A one-page fill-in kit: fact sheet, media, description, company, approval | Every release invents a kit, and the approval rows disappear first | Blueprint P07; `P01` template pattern |
| `selftest.mjs` | Proves manifest, files, hashes, encoding, placeholders, caps, sections, plus four negative fixtures | A pack drifts, ships an empty file, keeps a secret pattern, or carries a check that never fires | N00/P01 selftest shape; task contract |
| Eight manifest keys | The smallest set a tool needs to install, verify and locate the pack, with no `$schema` | Installers guess; the pack cannot be verified uniformly with P01-P06 | `P01:29-36`; task contract |

Shorter without loss? The alignment table and the review checklist are the two
places where a row could be merged, but they answer different questions (what is
allowed versus what is proven). Per-store pixel tables were cut on purpose: they
change and would consume the whole cap. The pack is 1,495 tokens against the
1,500 cap (5,980 of 6,000 chars); the template is 464 tokens; the selftest is 250
lines against 250.

## Why a pack, not a rule or a skill

Priority is mode > rules > skill > pack > docs. A rule would bind every task to
marketing constraints that exist only near a store page. A skill would need a
procedure and would fork S13, which already owns the release sequence and already
defers the words here. A pack is loaded on demand, adds reference data, and
disappears from context when unloaded. The procedure stays in S13, the decision
stays in G3, and this pack is the checklist and the evidence shape those two
point at.

## Design decisions

- **Fields, not copy.** The pack cannot write a promise for a game it has not
  played, and a pack that writes copy would be judged on taste. It names the
  fields, the order, and the proof each answer needs.
- **Offsets, not dates.** A calendar with absolute dates is wrong the first time
  a milestone moves. Offsets survive a slip and leave the date to a human.
- **No pixel sizes.** Capsule, screenshot and trailer specs differ per store and
  change without notice. The brief carries the row shape; the holder's live page
  carries the numbers, and the reader records the date it was read.
- **Every claim has a pointer.** The claims table is the mechanical guard: a row
  without a build id, screenshot path or measurement is a hold. This is the one
  rule the pack cannot relax, because it is the only defence against a true build
  behind a false claim.
- **Build id on every asset row.** The most common accidental lie is a beautiful
  screenshot from a cut feature. Naming the build makes that visible at a glance.
- **Negative fixtures in the selftest.** A check that has never failed is a
  decoration. Four temporary copies prove that an extra file, a bad hash, a
  non-string file entry, and a missing section each turn the run red.
- **Twelve months of store links, not store text.** The pack names the holder's
  entry point and forbids snapshotting; the alternative is a table that is wrong
  by the next patch.
- **One page per template.** A press kit is the only artifact copied per
  release; a second template would become a manual.
- **ASCII-only artifacts, UTF-8, LF, POSIX paths.** The pack must survive
  Windows, CI and a diff; smart quotes and em dashes are the usual source of
  mojibake in this repo.

## Rejected alternatives

- **Snapshot the Steam or console checklists.** Rules change, the text is not
  ours to redistribute, and a full TRC would exceed the cap many times. The pack
  links and forbids the snapshot.
- **A social scheduler or store upload helper.** It would need credentials,
  network writes, and an approval path the pack must not own; R4 and E12 forbid
  the action, not just the tool.
- **A wishlist or review seeding playbook.** Explicitly forbidden. A purchased
  signal is the one marketing action that cannot be undone by a patch.
- **A copy generator with genre templates.** Genre templates produce the same
  paragraph for every game; positioning is a creative decision.
- **Per-store copy files under `templates/`.** Eleven fields fit one table; four
  store variants would quadruple maintenance and drift.
- **Marketing analytics SDK or tracking plan.** P01 owns the crash channel and
  telemetry consent; a marketing pack that ships tracking would bypass it.
- **A JSON schema file or `$schema` key.** No consumer ships; a remote schema is
  a network dependency and a stale claim.
- **Copying `presskit()` text.** The canonical repository returns 404 (see
  `SOURCES.md`); the fields were authored, not copied.

## Limits and risks

- The pack cannot verify that a claim is true. It can only make a missing pointer
  visible, which is why the claims table and the holds exist.
- Store links rot and store specs move. The reader must re-read; the pack says so
  twice and refuses to store numbers.
- Wishlist and demo timing is platform-specific and often tied to festival
  deadlines the pack does not know. The calendar is a shape, not a schedule.
- The pack is not legal advice and does not decide ratings, prices, or dates.
- `requires` and `loaded` are descriptive until an installer reads them; P01
  records the same open question.
- The pack is at 99.7% of its character cap and 100% of the selftest line cap.
  Any addition must remove something first; the headroom is effectively zero.

## Size

| File | Bytes | Lines | Tokens (chars/4) |
|---|---|---|---|
| PACK.md | 5,980 | 137 | 1,495 |
| manifest.json | 517 | 15 | 130 |
| selftest.mjs | 9,299 | 250 | 2,325 |
| templates/press-kit.md | 1,854 | 59 | 464 |

PACK.md is 99.7% of the 6,000-character cap. The selftest is 100% of the 250-line
budget. The template is 464 of 1,000 tokens. No file is empty and no hash is
empty.

## Integration

Installed under `library/packs/marketing/`. `project.config.json` maps the pack
to its directory; `agent.lock.json` records version and hashes (CLI01/CLI05).
The pack requires only `core` and `game`, loads on demand, and has no runtime
hook, no network call, and no credential field. Unloading is deleting the
directory. The forward reference to P03 (licences) resolves as an ID today and as
a path when the art pack lands.
