# P03 justification - art pack

## Why the pack exists

`docs/BUILD-PLAN.md:104` assigns P03 to `library/packs/art/`; the directory exists
and is empty. `docs/V0.3-BLUEPRINT.md:307` states the job in one line: "Style
references, asset specs, naming, budgets, licenses." The blueprint lists the pack
in the library tree (L65) and calls packs optional and loaded on demand (L128);
the game tree now includes `docs/art/` and `docs/art/specs/`, so the pack's paths
resolve. S12 owns the polish pass; D04 records taste in `GAME.md` and
`TASTE.md`; D03 records decisions. None of them carries a palette, a scale table,
a silhouette test, a per-asset spec page, or a review evidence row. The pack
supplies that reference layer on demand and adds no procedure, no rule, and no
authority.

## Unit-by-unit necessity

| Unit | Why it exists | If removed | Source / duplicated |
|---|---|---|---|
| Load line and the three-artifact split | Names the trigger and separates style direction, per-asset spec, and evidence | The pack loads for every task, or direction and per-asset pages merge into one document | Blueprint L307; P01 intro shape; the separation is this pack's decision |
| "Not the bible, not rendering code" | Draws the scope: reference only | The pack becomes a second bible or an engine document | N00-N03 own engine format and import; D04 owns taste |
| Boundary: no runtime, shader, or engine API | Keeps engine advice out of a reference pack | Agents copy import settings and draw order from a pack that cannot test them | Blueprint layer rule; N00-N03 |
| Boundary: no generation, purchase, or download | No spend and no network from a documentation pack | A reference request turns into a bill or an unlicensed download | R4/E12 approval boundary; selftest imports no network module |
| Boundary: licence and provenance hold | An asset with unclear origin is held, not shipped | "Found on the internet" enters the build | X02; CDDA licence gate; Veloren tainted-content rule |
| Boundary: no style change after G2.5 | Freeze means freeze; a change needs a decision and a version bump | The palette drifts during polish and the review baseline moves | D03; G2.5 feature freeze |
| Boundary: a green selftest is not approval | The selftest proves files agree, not that art looks right | A passing script is read as a visual sign-off | P01 limit; this pack's own test |
| Pillars and one style sentence | Three lines that the look must hold, one anti-rule, one sentence on view, scale, lighting, materials, UI density | Every asset is judged by taste of the moment; no shared bar | D04 (`GAME.md`, `TASTE.md`); anthropics/skills direction-first |
| Reference board with borrow and reject columns | Five to nine references, each with a right to use and an explicit borrowed property | Mood boards become decoration and copied frames | anthropics/skills originality gate; CDDA provenance |
| Never commit third-party frames | Separates a link from an asset | Copyrighted frames ship inside the repo | Veloren licence rule; X02 |
| Palette with named roles | 8-20 swatches with hex and role, so colour is chosen by function | Sprites invent colours; UI and world drift apart | material-color-utilities role palettes |
| Value before hue, colour not the only signal | The scene reads in greyscale; shape, icon, or text also differ | Readability depends on hue alone and fails for colour-blind players | material-color-utilities contrast; accessibility practice |
| Contrast 4.5:1 and 3:1 | A measurable floor for text and large marks | "Readable enough" stays an opinion | material-color-utilities contrast utilities |
| Black-shape silhouette test at final size | One shape per class, tested where the player sees it | Assets read at 4x and blur at 1x | Storybook isolated review; game UI practice |
| Scale table with size tokens | One base cell, every asset names its token | Sizes are guessed per asset; a door is taller than a house | Mindustry category discipline; material-design-icons size token |
| Category budgets | A count and a sheet cap; a new asset takes a slot or replaces one | Asset count grows silently until the sheet and the frame budget break | CDDA filler policy; project budgets in `project.config.json` |
| One asset, one page | Purpose, size token, palette subset, states, frames, footprint, provenance, acceptance shot | State gaps hide until integration; the reviewer has no spec to fail | Storybook one page per component; OpenRA state table |
| Naming pattern and token rules | Four tokens, lowercase ASCII, size last, spec id equals file stem | Renames break references; two files claim one id | material-design-icons four-part address; CDDA root name; Mindustry content id |
| Four examples | One per category family, showing the token order | The pattern stays abstract and gets bent on the first asset | CDDA `_var` suffixes; pack authoring |
| Review checklist, ten rows | One row per asset with pass, fail, or N/A, evidence path, reviewer, date | Review becomes "looks fine"; a blank row is not a hold | Storybook review row; P01 checklist shape |
| Outputs list | Names the three artifacts and the version bump | Nobody knows where the bible, specs, and shots live | Blueprint paths; D03 |
| Holds list | Says what stops an asset: no bible, unclear provenance, failed silhouette, no spec, over budget, unfrozen change | Every exception becomes a verbal agreement | G2.5; X02; CDDA filler policy |
| Cross-refs and priority line | Points at the owners: D03, D04, D06, S02, S10, S12, S13, CLI10, N00-N03, X02 | The pack restates rules it does not own, or is read as a higher authority | Blueprint priority: mode > rules > skills > packs > docs |
| `templates/asset-spec.md` | One fill-in page that makes the spec row actionable | Every project invents a different page and drops the provenance block | `template/docs/systems/SYSTEM-CARD.md` one-page form; OpenRA state list |
| `selftest.mjs` | Proves manifest, listing, hashes, encoding, placeholders, caps, sections, and secrets, with four built-in negatives | A pack can drift, ship an empty file, or keep a secret pattern and still look complete | N00/P01 selftest shape; negatives are new |
| Eight manifest keys | The smallest set a tool needs to install, verify, and locate a pack | Installers guess; packs become unverifiable | N00 engine keys `engine`/`parts`; this is the game-pack subset |

Shorter without loss? The checklist rows are one line each; the holds repeat the
checklist in the negative, which is deliberate because a hold is read at a
different moment. Palette and scale numbers are project data, not pack content,
so the pack stays under its cap while still naming what a complete bible holds.
The pack is 1,472 tokens against 1,500; the template is 377 tokens; the selftest
is 234 lines against 250.

## Why a pack, not a rule or a skill

Priority is mode > rules > skill > pack > docs. A rule would bind every task to
art constraints that matter only when an asset is made. A second skill would fork
the procedures that already own the pass (S10 slice, S12 polish) and create two
sources of truth. A pack is loaded on demand, adds reference data, and disappears
from context when unloaded. The procedure stays with the skill; the direction
stays with the project; the pack is the checklist those two point at.

## Design decisions

- **Three artifacts, one owner each.** The bible is direction, a spec is one
  asset, evidence is a proof. Merging them would either exceed the cap or let a
  single asset redefine the style.
- **The pack defines shape, not values.** No sample palette, no scale numbers, no
  category counts: those are the project's, in `docs/art/ART-BIBLE.md`. A sample
  would become the default and quietly homogenise every game.
- **Naming is four tokens with size last.** Borrowed from material-design-icons
  addressing (category, name, style, size) and from CDDA, where the filename stem
  is the entity id. The spec id equals the stem, so a rename is a content change,
  not a cosmetic one.
- **States live on the asset page.** OpenRA lists every animation state per
  actor; here a missing state is visible in the spec before integration.
- **Provenance is a gate, and AI assistance is recorded, not banned.** Veloren
  treats generated content as tainted; this project does not forbid it, so the
  spec records tool, prompt, and seed the way ComfyUI output metadata does.
- **The selftest is packaging-only and has built-in negatives.** Four negative
  cases run on a temp copy, so the check proves it can fail, not only that it
  passes today.
- **Caps follow the project convention.** Tokens are chars/4; the selftest
  reports the measured value.
- **English, UTF-8 without BOM, LF, POSIX paths.** Matches the artifact rules.

## Rejected alternatives

- **Copy a published art bible or a studio style guide.** Not ours to
  redistribute, ages quickly, and a full guide exceeds the pack cap many times.
  The pack names the fields and sends the reader to the project's own bible.
- **Ship a sample palette and scale values.** They would be read as the default;
  a project would keep them instead of deciding.
- **Include shader, import, or draw-order snippets.** N00-N03 and the technical
  artist own that layer, and a pack cannot test what it ships.
- **Generate or download reference images.** Spend and network in a documentation
  pack; references stay links with a licence note.
- **One combined review form for all assets.** Hides per-asset state gaps and
  turns ten rows into a single verdict.
- **A blanket ban on AI-assisted art.** Veloren's rule fits Veloren; this project
  records provenance instead of forbidding the tool.
- **Port the HCT palette algorithm.** Code, not reference; the pack takes the
  role-and-contrast idea only.
- **Store capsules and key art here.** S13 and the release pack own them; this
  pack stops at the in-game asset.
- **A `$schema` key.** No schema file ships, and a remote one is a stale network
  dependency.
- **A second art skill.** It would duplicate S12 and drift.

## Limits and risks

- Taste is not testable. The checklist proves evidence exists, not that the art
  is good; the human reviewer remains the judge.
- Contrast ratios are measurable; palette harmony and silhouette quality are
  judgement calls made against the board.
- `docs/art/` and `docs/art/specs/` are now in the blueprint game tree and the
  template; the report records this as resolved, not an open question.
- Budget numbers are project-set. The pack supplies the shape of a budget, not a
  number that fits every game.
- Licences are recorded, not legally verified. X02 and the human reviewer own the
  final check.
- The selftest cannot validate markdown links, image contents, or whether a
  screenshot was taken at final size.

## Size

| File | Bytes | Lines | Tokens (chars/4) |
|---|---|---|---|
| PACK.md | 5,888 | 121 | 1,472 |
| manifest.json | 541 | 22 | 135 |
| selftest.mjs | 9,460 | 234 | 2,365 |
| templates/asset-spec.md | 1,509 | 48 | 377 |
| total | 17,398 | 425 | 4,349 |

PACK.md is 98% of its cap (1,472 of 1,500), leaving 28 tokens of headroom. The
selftest is 94% of its line budget. No file is empty and no hash is empty.

## Integration

Installed under `library/packs/art/`; `project.config.json` maps the pack to its
directory; `agent.lock.json` records version and hashes (CLI01/CLI05). The pack
needs only `core` and `game`. Unloading is deleting the directory; there is no
runtime hook, no network call, and no generated asset.
