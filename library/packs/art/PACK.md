# Art pack

## When to load

Before the first visual asset, when a category appears, when a screenshot review
fails on look rather than function, and before the G2 art pass and the G3 store
art. It adds the reference layer: style direction, per-asset specs, naming,
budgets, licences, review evidence.

It covers three artifacts: `docs/art/ART-BIBLE.md` for style direction (pillars,
board, palette, scale table, budgets); `docs/art/specs/<asset-id>.md` for one
asset on one page, from `templates/asset-spec.md`; `evidence/<date>-art/<asset-id>/`
for the final-size shot and review row.

It is not the bible and never fills it in, and not rendering code: import,
batching, and draw order belong to N00-N03 and to code.

## Boundaries

- No runtime code, shader, engine API, import setting, or draw-call advice.
- No image generation, purchase, or download. A reference is a link and a note;
  the pack never spends or fetches.
- No licence decision. An asset or reference without source, licence, author, and
  date is a hold (X02); "found on the internet" is not a licence.
- No style change after G2.5 without a `DECISIONS.md` entry (D03) and a bible
  version bump.
- The selftest proves files agree, not that the art looks right.

## Art pillars and reference board

- Three pillars at most, one line each: the look the game must hold, plus one
  anti-rule naming what it must never become. Pillars derive from `GAME.md` and
  `TASTE.md` (D04); a pillar that contradicts them is cut, not averaged.
- One style sentence: view, scale, lighting direction, material language, and UI
  density.
- Board: five to nine references. Each row carries source, licence or usage
  right, what is borrowed (shape, palette, value, lighting, density), and what is
  rejected. A reference with no borrow line is decoration.
- Never commit a frame from another game, film, or portfolio. Link and describe
  it.

## Palette, readability, silhouette, scale

- Palette: 8-20 named swatches with hex and role (ground, mid, accent, danger, UI,
  text). Sprites sample the palette; an extra colour is a recorded exception.
- Value before hue: layers separate by lightness, so the scene reads in greyscale.
  Colour is never the only signal; shape, icon, or text also differ.
- Contrast: gameplay silhouettes hold against the busiest background in the game;
  body text at least 4.5:1, large text and icons at least 3:1.
- Silhouette: every actor is one readable black shape at final size. One dominant
  shape per class; player, threat, and pickup differ by outline before colour.
- Scale: one table with a base cell and size tokens; every asset names its token.
  Off-table is a hold.
- Budgets: a count and a sheet-size cap per category in the bible. A new asset
  takes a slot or replaces one; raising the cap is a decision, not a fix.

## Asset spec and naming

One asset, one page: purpose, size token, palette subset, states, frames,
footprint, provenance, acceptance shot. Without a page the asset is a greybox.

Naming: `[category]_[name]_[variant]_[size].[ext]`. Lowercase ASCII, `_`
separators, no spaces, no dates, no `final`, no version suffix (git holds that).

- First token is the category: `char`, `env`, `prop`, `ui`, `vfx`, `icon`.
- Last token is the size: pixels of the longest side for raster (`16`-`128`),
  `1x` or `2x` for UI; the scale table may alias `small`, `mid`, `large` for VFX.
- Middle tokens are name, then state or direction, frames zero-padded. The spec
  id equals the filename stem.
- Placeholder work carries `placeholder` as its variant.

`env_door_wood_large.png`, `char_guard_idle_01_32.png`,
`ui_btn_primary_hover_1x.png`, `vfx_hit_spark_loop_small.png`.

## Review checklist

One row per asset: pass, fail, or N/A, with evidence path, reviewer, and date.
Blank is a hold, not a pass.

1. Reference: the spec names the board row and palette swatches it follows.
2. Name: matches the pattern; the spec id equals the file stem.
3. Palette: every colour is in the palette or a recorded exception.
4. Silhouette: the black-shape test passes at final size.
5. Scale: the size token is in the scale table.
6. Contrast: reads over the busiest background; the text pair meets its ratio.
7. States: every state in the spec exists; nothing ships as an unmarked
   placeholder.
8. Budget: category count and sheet size are inside the cap.
9. Provenance: source, licence, author, date, and AI assistance recorded.
10. Evidence: final-size shot in `evidence/<date>-art/<asset-id>/` with this row.

## Outputs

- `docs/art/ART-BIBLE.md`: pillars, style sentence, board, palette, scale table,
  budgets, version line.
- `docs/art/specs/<asset-id>.md`: one page per shipped asset.
- `evidence/<date>-art/<asset-id>/`: the shot and the ten rows above.
- A bible version bump and a `DECISIONS.md` row when direction changes.

## Holds

- No bible, palette, or scale table: greybox only; no final asset.
- Missing source, licence, or provenance: the asset is held.
- Silhouette or contrast fails at final size: held, not fixed later.
- No spec page: the asset is a placeholder and is named one.
- Budget exceeded: cut or replace; never raise the cap inside an asset task.
- Style change after G2.5 without a decision: revert.

## Cross-refs

- `GAME.md`, `TASTE.md` (D04): feel and anti-rules the pillars must match.
- `docs/systems/*.md` (D06): what the asset communicates, and when.
- `DECISIONS.md` (D03): every palette, scale, or pillar change.
- `S02` verify, `CLI10` capture: the screenshot is evidence, not memory.
- `S10` slice, `S12` polish: the art pass and its review.
- `S13` and the release pack: store capsules, screenshots, and key art belong
  there; this pack stops at the in-game asset.
- Engine packs (N00-N03): format, import, and render path.
- `X02`: licences, provenance, secret hygiene.
- Priority is mode > rules > skills > packs > docs; a skill's step wins.
