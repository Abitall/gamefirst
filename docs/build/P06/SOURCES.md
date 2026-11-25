# P06 sources

Stars are GitHub counts read on **2026-11-26**. Licenses were read from the
repository license file or the GitHub license field on the same date. Every
entry states what was borrowed into the pack and what was deliberately rejected.

## Gamedev (4)

### 1. Godot Engine

- URL: https://github.com/godotengine/godot
- Stars: 120,821
- License: MIT
- Analog: engine localization layer with translation keys, per-language font
  fallback, RTL layout, and a runtime translation server.
- Borrowed: per-string keys instead of source text, font fallback and glyph
  coverage checks, RTL layout pass, shipping-size rendering checks.
- Rejected: `TranslationServer` and other runtime APIs; the pack must not add
  engine code.
- Note: localization docs describe runtime classes, not a packaging checklist.

### 2. Ren'Py

- URL: https://github.com/renpy/renpy
- Stars: 7,062
- License: MIT
- Analog: dialogue-heavy engine with per-language font mapping, translation
  blocks, and a mature translator workflow.
- Borrowed: stable identifiers for dialogue, per-language font replacement,
  reading-speed and subtitle constraints.
- Rejected: the translation-block runtime and script syntax.
- Note: the workflow assumes a dialogue engine; the pack keeps the checks
  engine-neutral.

### 3. The Battle for Wesnoth

- URL: https://github.com/wesnoth/wesnoth
- Stars: 7,009
- License: GPL-2.0
- Analog: long-lived community translation using gettext, context comments,
  plural forms, and reviewer-maintained terminology.
- Borrowed: `msgctxt`-style context, plural-category testing, glossary as a
  review authority.
- Rejected: GPL code and content reuse; only process practices were studied.
- Note: no reusable pack format, only a working translation process.

### 4. OpenTTD

- URL: https://github.com/OpenTTD/OpenTTD
- Stars: 8,532
- License: GPL-2.0 (GitHub reports NOASSERTION; `COPYING.md` states GPL-2.0)
- Analog: table-driven game strings, per-language font selection, and a
  community translation workflow.
- Borrowed: string-table discipline, per-language font choice, expansion
  testing on fixed UI panels.
- Rejected: source code and string data.
- Note: the repository confirms the practice, not a portable checklist.

## Software (3)

### 5. Weblate

- URL: https://github.com/WeblateOrg/weblate
- Stars: 6,185
- License: GPL-3.0
- Analog: translation platform with glossaries, screenshot context, review
  states, and string checks.
- Borrowed: glossary fields, screenshot attachment to strings, explicit review
  state, placeholder and source-string checks.
- Rejected: hosting, accounts, and service integration.
- Note: the pack treats Weblate as evidence of a workflow, not a dependency.

### 6. Translate Toolkit

- URL: https://github.com/translate/translate
- Stars: 988
- License: GPL-3.0
- Analog: offline translation QA with pseudo-localization, placeholder checks,
  and consistency checks across formats.
- Borrowed: pseudo-locale as a pre-translation gate, check taxonomy for
  placeholders, escapes, and untranslated entries.
- Rejected: the Python toolkit itself and its file-format converters.
- Note: strongest source for the "test before paying" argument.

### 7. Unicode CLDR

- URL: https://github.com/unicode-org/cldr
- Stars: 1,172
- License: Unicode License v3 (GitHub reports NOASSERTION; repository license
  file is the Unicode License v3)
- Analog: locale data for plural categories, gender, calendars, and text
  direction.
- Borrowed: plural category names (zero, one, two, few, many, other) and the
  rule that categories are language data, not arithmetic.
- Rejected: embedding CLDR data in the pack; the project should consume a
  maintained copy.
- Note: a data source, not a workflow.

## AI-agent (2)

### 8. OpenAI Codex

- URL: https://github.com/openai/codex
- Stars: 136,444
- License: Apache-2.0
- Analog: agent harness with explicit approval modes, sandbox boundaries, and
  auditable actions.
- Borrowed: human approval before an action with external effect, least
  privilege, and a visible action target.
- Rejected: the agent runtime and any model integration.
- Note: supports the no-publish/no-spend boundary, not the localization content.

### 9. Argos Translate

- URL: https://github.com/argosopentech/argos-translate
- Stars: 6,695
- License: MIT
- Analog: offline neural machine translation that can draft a target string
  without a service account.
- Borrowed: MT is allowed only as a draft and never enters the shipping build
  without a human review pass.
- Rejected: any automated translation pipeline, model download, or quality
  claim.
- Note: the pack does not require MT; it constrains it.

## Dead ends

- **GitHub API rate limit.** The unauthenticated API quota was exhausted during
  research; counts were captured before the reset and checked against the
  repository pages. A later refresh should re-read all nine counts.
- **No drop-in localization pack found.** Searches did not find a public pack
  with `manifest.json`, hashes, a selftest, and a localization checklist. The
  nine repositories are engines, tools, or data sources; the pack shape was
  borrowed from `library/packs/release/`.
- **Project Fluent (1,696 stars, Apache-2.0).** A strong message format, but it
  is runtime i18n and would violate the no-runtime-code boundary.
- **i18next (8,663 stars, MIT).** A runtime library with its own ecosystem;
  rejected for the same boundary reason.
- **LibreTranslate (17,848 stars, AGPL-3.0).** Rejected on license and on the
  service/network boundary.
- **libGDX, Minetest, and 0 A.D.** Checked as possible game-side references and
  not selected: their localization material is either engine-specific or adds
  no practice not already covered by the four gamedev sources.
- **Vendor documentation pages.** Crowdin, Lokalise, and Phrase pages found in
  search were marketing or product documentation with no reusable artifact;
  they were not used as sources.
- **Godot and Ren'Py docs as how-to sources.** Both explain runtime APIs; the
  pack only uses the workflow practices visible in their repositories.
