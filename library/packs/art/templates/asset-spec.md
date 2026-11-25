# Asset spec

One asset, one page. Copy to `docs/art/specs/<asset-id>.md`; the id equals the
file stem. The spec is a plan until the asset exists and the review row is
filled. Values live in the asset and the bible, not in this page.

## Identity

ID: `<asset-id>` - filename stem, no extension.
Category: `char | env | prop | ui | vfx | icon`.
Purpose: `[one sentence]`; system card: `docs/systems/<system>.md` (D06).
Status: `planned | placeholder | review | accepted | cut`.

## Look

Bible row: `[board row and palette swatches, by name]`.
Size token: `[32]`, from the scale table.
Palette: `[swatch names]`; exceptions: `[colour, reason]`.
Silhouette: `[one sentence: the dominant shape]`.
Contrast: `[the background this asset must read over]`.

## States

| State | Frames | Loop | Notes |
|---|---|---|---|
| `idle` | 1 | no | `[...]` |

Animation: `[frames, fps]` or `none`; frames are named `<state>_<nn>`.

## Use

Footprint: `[w x h cells]`; anchor: `[centre | feet | top-left]`.
Layer: `[background | ground | actor | fx | ui]`.
Input: `[mouse | touch | keyboard | none]`, for UI only.

## Provenance

Source: `[drawn | commissioned | generated | licensed]`.
Author or tool: `[...]`; date: `[...]`.
Licence: `[...]`; AI assistance: `[none | tool, prompt id]`.
Reference rows: `[board rows used, or none]`.

## Acceptance

Shot: `evidence/<date>-art/<asset-id>/shot.png` at final size.
Review: `[date, reviewer]` - rows 1-10 of the pack checklist.
Verdict: `[pass | fail | hold]`; notes: `[...]`.
