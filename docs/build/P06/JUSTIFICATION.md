# P06 justification — localization pack

## Purpose

P06 adds the reference layer for shipping a game in more than one language. It
turns localization into a QA problem: stable string IDs, context, screenshots,
pseudo-localization, and a human review pass. It is not runtime i18n and it does
not translate anything.

## Unit map

| Unit | Why it exists | If removed | Source |
|---|---|---|---|
| `When to load` | Tells the agent when this pack is cheaper than guessing. | The pack is loaded for unrelated work or missed before text freeze. | S12, S13, blueprint P06 |
| `Boundaries` | Keeps the pack reference-only and keeps publish/spend with a human. | The agent may propose uploads, keys, or MT as if they were in scope. | R4, E12, X02 |
| `Pack contract` | Makes P02-P07 predictable for tooling and review. | Sibling packs drift in key names and caps. | Release pack shape |
| `Source-string rules` | Stable IDs and context prevent the most expensive translation defects. | Renamed keys, concatenated grammar, and ambiguous strings reach translators. | Godot, Ren'Py, Wesnoth, OpenTTD, Weblate |
| `Glossary and term base` | One concept, one word, across every screen and language. | Names and UI verbs diverge; review has no authority to point at. | Weblate glossary |
| `Plurals and gender` | English one/other hides grammar that other languages require. | Broken plurals, masculine defaults, and untranslatable templates ship. | CLDR, Wesnoth gettext |
| `Text expansion` | German, Finnish, and Russian break fixed layouts. | Clipped buttons, overflowing tabs, and unreadable subtitles. | Godot, Ren'Py, OpenTTD |
| `Fonts, RTL and CJK` | Coverage, licenses, bidi, and line breaking decide whether text renders. | Tofu, missing glyphs, and unlicensed fonts reach the build. | Godot, Ren'Py, OpenTTD |
| `Screenshots for translators` | A string without context is a guess. | Translators guess tone, speaker, and length; guesses become bugs. | Weblate screenshots |
| `Pseudo-localization` | Finds hardcoded strings and layout faults before translation spend. | Expensive translation is bought before the UI can hold it. | Translate Toolkit |
| `QA checklist` | Gives the release gate concrete pass/fail checks. | Sign-off relies on memory and the same defect is missed twice. | Weblate, Translate Toolkit, S02 |
| `Holds` | Names what blocks a language claim and who clears it. | A failing locale is silently accepted or silently falls back to English. | Release gates, S02 |
| `Cross-refs` | Prevents restating rules that already live elsewhere. | The pack duplicates or contradicts S12, S13, P01, P03, P05, P07. | Framework docs |
| `manifest.json` | Machine-readable identity, file list, hashes, and load mode. | The pack cannot be discovered, verified, or upgraded. | Release pack manifest |
| `selftest.mjs` | Proves the pack is intact and rejects the four packaging regressions. | Bad hashes, extra files, and missing sections ship unnoticed. | Release pack selftest |
| `templates/glossary.md` | Makes the glossary section usable without inventing fields. | Every project reinvents the term base and loses columns. | Weblate glossary |

## Design decisions

1. **Reference and checklists, not runtime i18n.** The project already owns its
   string table and engine. Shipping a runtime library here would duplicate
   S12/S13 and cross the pack boundary.
2. **Translation is treated as QA.** Stable IDs, screenshot evidence, pseudo-
   locales, and a named human reviewer are the core controls, not translation
   vendor advice.
3. **The pack contract is copied from `pack-release`.** Eight keys, no
   `$schema`, one line per selftest check. Copying the shape is cheaper than
   inventing a second convention.
4. **The selftest has four negative fixtures.** A validator that only passes on
   good input proves nothing. Extra file, bad hash, string file entry, and
   missing section are checked in-process, without writing fixtures to disk.
5. **One template only.** A glossary is the unit that most often gets rebuilt
   badly. String-table and screenshot-log templates would add pages without a
   clear owner in this pack.
6. **No vendor names as requirements.** Weblate and Translate Toolkit inform
   the checklist; the project may use any tool that produces the same evidence.

## Rejected alternatives

| Alternative | Why rejected |
|---|---|
| Runtime i18n library | Out of scope; the pack must not add engine API or code. |
| Embedded CLDR plural data | Duplicates a maintained data source and dates quickly. |
| Machine-translation pipeline | Violates the human-review rule and the no-spend boundary. |
| Per-language packs | Multiplies maintenance and hides the cross-language checks. |
| A full font license matrix | Licenses are project-specific; the pack points at the evidence instead. |
| A pseudo-locale generator script | Useful, but belongs to the project's S12 tooling, not a reference pack. |
| Store-certification rules | Owned by S13/P01/P07; repeating them would drift. |

## Limits

- The pack does not prove a locale is good; it defines what evidence a human
  reviewer must see.
- It does not include font files, translation memories, or vendor accounts.
- It does not replace engine documentation for text rendering or input.
- It does not make legal conclusions about font licenses or store claims.

## Size

| Artifact | Bytes | Chars | Lines | Limit |
|---|---:|---:|---:|---|
| `PACK.md` | 5,897 | 5,897 | 98 | 6,000 chars / 1,500 tokens |
| `manifest.json` | 546 | 546 | 22 | 8 keys |
| `selftest.mjs` | 8,856 | 8,856 | 247 | 250 lines |
| `templates/glossary.md` | 1,361 | 1,361 | 34 | 4,000 chars |

## Integration

S12 uses the pseudo-locale and expansion checks during polish. S13 uses the
store-language and font-license evidence before release. G2.5 freezes strings
and the glossary; G3 decides ship. P01 owns the release checklist, P03 owns art
and fonts, P05 owns dialogue and narrative strings, P07 owns store copy. S02
supplies the evidence format; X02 covers secrets and licensing.

## Maintenance

Changing any packaged file requires recomputing `hashes` in `manifest.json` and
rerunning `node selftest.mjs`. Bump `version` when the contract or a section
changes. Removing a section is a breaking change for sibling packs and should
be reviewed as such.
