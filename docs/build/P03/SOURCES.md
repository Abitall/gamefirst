# P03 sources

Nine repositories, read on 2026-11-26. Star counts were read the same day from
`https://ungh.cc/repos/OWNER/REPO`, a GitHub data mirror, because
`api.github.com` answered 403 for every request; they are recorded GitHub values,
not estimates. No code, text, or license was copied; each entry names the idea
borrowed and the part rejected.

## Gamedev (4)

### 1. CleverRaven/Cataclysm-DDA

- URL: https://github.com/CleverRaven/Cataclysm-DDA
- Stars: 13,576
- License: GPL-3.0 for code; art is CC-BY-SA 3.0 as stated in `doc/TILESET.md`.
- Artifact type: open-source survival roguelike with a community tileset pipeline.
- Analog: asset naming, tileset manifests, and the art licence gate in
  `doc/TILESET.md`.
- Borrow: the filename stem is the entity id (the "root name"); variants are
  suffixes (`_season_winter`, `_var_<variant>`); tilesheet folders carry the sheet
  size in the name; filler sheets let rough art be replaced as better sprites
  land; art must be CC-BY-SA 3.0 or compatible, and unclear provenance excludes
  it.
- Reject: the JSON tile schema, `compose.py`, and 8bpp quantization. The pack
  borrows the naming and the gate, not the pipeline.

### 2. OpenRA/OpenRA

- URL: https://github.com/OpenRA/OpenRA
- Stars: 17,833
- License: GPL-3.0.
- Artifact type: open-source real-time strategy engine with per-actor sequence
  definitions.
- Analog: the per-asset state list in `mods/ra/sequences/structures.yaml`
  (`idle`, `damaged-idle`, `dead`, `make`, `icon`, `bib`) with frames, offset,
  and layer fields.
- Borrow: one asset page lists every visual state with its frames and offsets; a
  state that does not exist is written down as missing, not inferred at runtime.
- Reject: the engine YAML, `.shp` sprite format, and facings model.

### 3. veloren/veloren

- URL: https://github.com/veloren/veloren
- Stars: 7,715
- License: GPL-3.0. The GitHub repository is a read-only mirror; development
  happens on GitLab.
- Artifact type: open-source voxel RPG with a contribution licence policy.
- Analog: the provenance gate in `CONTRIBUTING.md`: "Do not commit tainted
  content"; generated texture, voxel, model, sound, and music content is presumed
  tainted and must not be committed; the licence must permit redistribution.
- Borrow: provenance is a gate, and unclear origin is held rather than argued.
- Reject: the blanket ban on AI-assisted art. This project does not forbid the
  tool, so the pack records tool, prompt, and seed instead of excluding the asset.

### 4. Anuken/Mindustry

- URL: https://github.com/Anuken/Mindustry
- Stars: 29,962
- License: GPL-3.0.
- Artifact type: open-source factory tower-defense game with data-driven content.
- Analog: the content id is the sprite lookup key; category folders and prefixes
  separate blocks, units, items, and effects.
- Borrow: id-first naming and per-category grouping, so a rename is a content
  change that fails loudly rather than a silent art swap.
- Reject: Java content classes and the atlas format.

## Software (3)

### 5. google/material-design-icons

- URL: https://github.com/google/material-design-icons
- Stars: 54,364
- License: Apache-2.0.
- Artifact type: icon set with metadata across categories, styles, and sizes.
- Analog: how an asset is addressed by category, name, style, and size.
- Borrow: four-part addressing where size and variant are tokens, not prose in
  the name; the same idea becomes `[category]_[name]_[variant]_[size]`.
- Reject: the SVG icon grid, font build, and codepoint pipeline.

### 6. storybookjs/storybook

- URL: https://github.com/storybookjs/storybook
- Stars: 91,723
- License: MIT.
- Artifact type: UI component workshop with one page per component and isolated
  visual review.
- Analog: one page per asset, states enumerated, reviewed alone before
  integration.
- Borrow: the page is the spec (title, component, args), every state is listed,
  and a review row is attached to the page rather than to a meeting.
- Reject: the JavaScript runtime, the CSF format, and every addon.

### 7. material-foundation/material-color-utilities

- URL: https://github.com/material-foundation/material-color-utilities
- Stars: 2,309
- License: Apache-2.0.
- Artifact type: colour science library for tonal palettes and contrast.
- Analog: role-based colour (surface, primary, error) and contrast-ratio checks.
- Borrow: named swatches carry roles, and text contrast is measured against
  4.5:1 (body) and 3:1 (large text and marks), not eyeballed.
- Reject: the HCT algorithm, the tonal-palette generator, and all code. The pack
  names the roles and the thresholds; it computes nothing.

## AI-agent (2)

### 8. anthropics/skills

- URL: https://github.com/anthropics/skills
- Stars: 200,243
- License: Apache-2.0 for the skill files; the repository root has no `LICENSE`,
  and `skills/canvas-design/LICENSE.txt` was read instead.
- Artifact type: agent skill collection, including `canvas-design` for visual
  work.
- Analog: direction before asset, originality, and a restrained palette in
  `skills/canvas-design/SKILL.md`.
- Borrow: write the design direction first and the visual expression second; do
  not copy an existing artist's work; keep the palette limited and intentional;
  keep text minimal; do a final polish pass at the output size.
- Reject: the manifesto length, font downloads (network and spend), the
  "masterpiece" rhetoric, and runtime instructions. Only the sequence and the
  originality gate are reused.

### 9. Comfy-Org/ComfyUI

- URL: https://github.com/Comfy-Org/ComfyUI
- Stars: 148,522
- License: GPL-3.0.
- Artifact type: node-based image generation runtime.
- Analog: a generation recipe is data (model, prompt, seed, steps), and output
  metadata records the recipe that made the image.
- Borrow: an AI-assisted asset carries its tool, prompt, and seed in the spec's
  provenance block, so the asset can be explained later.
- Reject: the graph runtime, model downloads, GPU spend, and any generated image
  in the repository.

## Dead ends

- `api.github.com` returned 403 for every repository request on 2026-11-26. Star
  counts came from `https://ungh.cc/repos/OWNER/REPO` the same day; no count was
  estimated or remembered.
- The `anthropics/skills` repository root `LICENSE` is a 404, and a file listing
  through ungh timed out. The README and the per-skill
  `skills/canvas-design/LICENSE.txt` were used instead.
- Cataclysm-DDA's style guide lives in the separate `I-am-Erk/CDDA-Tilesets`
  repository. It was not read; only `doc/TILESET.md` in the main repository was
  used.
- OpenRA's pixel-art guide is on the project wiki, not in the repository; no wiki
  page was fetched.
- `veloren/veloren` on GitHub is a mirror. Contribution rules were read from the
  mirror's `CONTRIBUTING.md`; pull requests and review happen on GitLab.
- No public art pack with a manifest and selftest was found to copy. The shape
  follows the project's own N00 engine contract and the P01 release pack.
