# Glossary template

Copy this page into the project and keep one row per concept. The glossary is a
contract: one concept, one word, on every screen, in every language.

## Entry fields

| Field | Meaning |
|---|---|
| Term | Source string, exactly as it appears in the build. |
| ID | Stable string ID for the term, if it has one. |
| Definition | One sentence a translator can act on. |
| Part of speech | Noun, verb, adjective, name, UI label. |
| Do not translate | Yes for brands, code names, protected terms. |
| Translation | Approved target per language, filled by the reviewer. |
| Forbidden | Variants that must not ship. |
| Note | Tone, register, max length, screenshot ID. |

## Example

| Term | ID | Definition | Part of speech | Do not translate | Translation (de) | Forbidden | Note |
|---|---|---|---|---|---|---|---|
| Wordblock | ui.wordblock | A letter tile the player places. | noun | yes | Wordblock | Wortblock, Block | Brand; screenshot 014 |

## Rules

- Add the term before the first string that uses it.
- A translation enters only after a native reviewer accepts it; record the name
  and date in the note.
- When a term changes, search every string table and every screenshot for the
  old form.
- Keep one approved translation per language; variants live in Forbidden.
- Re-check the glossary at G2.5 text freeze and before S13.
