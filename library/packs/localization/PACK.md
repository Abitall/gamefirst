# Localization pack

Load when a second language, font change, or language claim enters the build.
Reference and checklists only: no runtime i18n, no engine API, no translation
service. S12 polishes, S13 releases, G2.5 freezes text, G3 ships.

## When to load

- A second language is planned or claimed in a store, settings, subtitles, or voice.
- Before G2.5 text freeze, while hardcoded strings and layout are cheap to fix.
- During S12 for pseudo-locale, long-language, font, RTL, and CJK passes.
- Before S13, when claimed store languages must match the build.
- After a font, layout, or dialogue change.

## Boundaries

- Reference only: no runtime code, engine API, translation service, or network call.
- Never machine-translate into a shipping build without human review; MT is a draft.
- This pack can never publish or spend: no upload, keys, or purchase; a human names action and target (R4, E12).
- No credentials, keys, or personal data in strings or screenshots.
- Native reviewers own language and culture; the agent checks mechanics and evidence.

## Pack contract (P02-P07)

`PACK.md` max 1,500 tokens (6,000 chars), `manifest.json` never lists itself,
`selftest.mjs` max 250 lines, offline. Eight keys, no `$schema`; exit 0 or 1.

## Source-string rules

- One stable ID per string, independent of the words: `menu.play`, not `"Play"`; the ID is the contract.
- One string, one meaning: no concatenation, no `prefix + value`, no grammar in code; ship a full sentence with named placeholders.
- Context travels with the string: screen, speaker, listener, tone, max length; "Back", "Charge", "Mine" need a note.
- Placeholders are named and typed (`{player}`, `{count}`); keep every token exact.

## Glossary and term base

- One entry per concept: source term, definition, part of speech, do-not-translate flag, approved translation, forbidden variants.
- Cover names, UI verbs, genre terms, currencies, units, rating labels, house style.
- Build it before the first string; check later term changes across the whole table.
- Translators propose, a human reviewer accepts, the glossary records decision and date; one concept, one word.

## Plurals and gender

- Plural categories are language data: CLDR zero, one, two, few, many, other; English one/other does not generalize.
- Never `count + " items"` or a ternary in code; supply every category and let the format choose.
- Test 0, 1, 2, 5, 11, 21, 101; Russian, Polish, and Arabic switch at different counts.
- Gender applies to player, addressee, nouns, adjectives; provide a switch or write neutral, never default masculine.
- A missing category is a hold, not a fallback.

## Text expansion

- German, Finnish, and Russian often run 30-40% longer; labels can double. CJK may contract: never assume it.
- Budget the longest language: buttons, tabs, tooltips, subtitles, achievements, store copy.
- Prefer auto-size or wrap; truncation needs a full-text path, never a fixed-width button clipping text.
- Subtitles have a reading-speed budget: characters per second, line count, safe area at every aspect ratio.
- Test a long and a short language before art and UI lock; text in images is a translation bug.

## Fonts, RTL and CJK

- Check glyph coverage per claimed language: Latin, Cyrillic, Greek, CJK, Arabic, Hebrew, Devanagari; English coverage proves nothing.
- License must allow embedding and subsetting and cover every claimed language; bitmap fonts need per-language atlases, runtime fonts a fallback chain.
- A missing glyph is a hold.
- RTL: mirror layout, not every icon (clocks, media, logos); apply bidi; keep numbers and Latin runs directional.
- CJK: line breaking, punctuation, full-width forms, line height, synthetic bold; test in-game at shipping size.

## Screenshots for translators

- One screenshot per context-bearing screen, named by stable ID, at shipping resolution and ratio.
- Show the state, call out the string, mark dynamic values and max length; record speaker, listener, tone, scene.
- A translator without context guesses, and a guess is a bug.
- Store with the string-table version, refresh when the UI changes; no personal data, spoilers, or credentials.

## Pseudo-localization

- Generate a pseudo-locale before paying for translation: accented or elongated text (+30-40%), clipping brackets, preserved placeholders.
- Run every screen: it finds hardcoded strings, concatenation, truncation, missing glyphs, and layout assumptions.
- Add a CJK pseudo-font and an RTL mirror when those languages are claimed.
- Test build only: never ship it or count it as translation-quality evidence; a failing screen is a hold.

## QA checklist

- String table: unique IDs, no empty targets, matching placeholders, no source text in targets, no unreviewed MT.
- Glossary: all terms present, no forbidden variant, consistent across screens.
- UI: pseudo-locale, longest-language, and RTL passes; every claimed language boots and is selectable.
- Fonts: coverage, license, fallback, no tofu; plurals: all categories reachable, trigger numbers tested.
- Build: language choice survives save and load; a missing table fails loudly, not silently to English.
- Evidence: screenshot per changed screen, table version, reviewer and date; store languages match the build (P01, P07).

## Holds

- A claimed language with no reviewed strings, missing glyphs, a failing pseudo-locale, a placeholder mismatch, an untranslated string, or unreviewed MT.
- A font without an embedding license, a glossary conflict, or a store language claim absent from the build.
- A hold names path or string ID, owner, and evidence; the selftest never clears it, a human reviewer does.

## Cross-refs

S12 polish (text, fonts, a11y); S13 release (store languages, licenses); G2.5 freeze; G3 ship; R4/E12 (no publish or spend); X02 (secrets, licenses); P01 release; P03 art and fonts; P05 narrative; P07 store copy; S02 evidence.
