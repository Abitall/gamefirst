# P06 report — localization pack

## Artifact

Location: `staging/P06/artifact/library/packs/localization/`

| File | Bytes | Chars | Lines | Limit | Result |
|---|---:|---:|---:|---|---|
| `PACK.md` | 5,897 | 5,897 | 98 | 6,000 chars / 1,500 tokens | pass (1,474 est. tokens) |
| `manifest.json` | 546 | 546 | 22 | 8 keys, no `$schema` | pass |
| `selftest.mjs` | 8,856 | 8,856 | 247 | 250 lines | pass |
| `templates/glossary.md` | 1,361 | 1,361 | 34 | 4,000 chars | pass |

Supporting docs: `staging/P06/JUSTIFICATION.md`, `staging/P06/SOURCES.md`,
`staging/P06/REPORT.md`.

## Selftest result

Command: `node selftest.mjs` (working directory: the pack directory).

```text
ok   manifest parses: manifest.json
ok   identity: pack-localization 0.1.0 on-demand
ok   keys: 8 keys
ok   $schema: absent
ok   selftest command: node selftest.mjs
ok   files listing: 3 files
ok   files on disk: 3 files
ok   hashes: 3 sha256
ok   encoding and placeholders: 4 text files
ok   token cap: PACK.md 5897 chars, 1 template(s)
ok   line budget: 247 lines
ok   required sections: 14 needles
ok   no secrets: no key or token patterns
ok   upgrade: none
ok   negative: extra file: extra file
ok   negative: bad hash: bad hash
ok   negative: string file entry: string file entry
ok   negative: missing section: missing section
```

**18 checks passed, 0 failed, exit code 0.** All four negative fixtures were
rejected as intended.

## Checks

| Check | What it proves | Result |
|---|---|---|
| Manifest parses | `manifest.json` is valid JSON and an object. | pass |
| Identity | `id`, semver, `requires`, `loaded` match the contract. | pass |
| Keys | Exactly the eight allowed keys, no extras. | pass |
| `$schema` | Explicitly absent. | pass |
| Selftest command | `node selftest.mjs` and the file exists. | pass |
| Files listing | Every entry is a relative POSIX string, non-empty, not the manifest. | pass |
| Files on disk | Directory listing equals `files` exactly. | pass |
| Hashes | One sha256 per file, no missing or extra keys, values match bytes. | pass |
| Encoding and placeholders | UTF-8, no BOM, LF only, no U+FFFD, no doubled braces. | pass |
| Token cap | `PACK.md` at most 6,000 chars; templates at most 4,000. | pass |
| Line budget | `selftest.mjs` at most 250 lines. | pass |
| Required sections | All 13 headings plus the no-publish/no-spend needle. | pass |
| No secrets | No private-key, GitHub-token, or AWS-key patterns. | pass |
| Upgrade | `upgrade` is `"none"`. | pass |
| Negative: extra file | A disk file missing from `files` is rejected. | pass |
| Negative: bad hash | A wrong sha256 is rejected. | pass |
| Negative: string file entry | A non-string `files` entry is rejected. | pass |
| Negative: missing section | A missing `## QA checklist` is rejected. | pass |

## Encoding scan

An independent scan of all four packaged text files confirmed: valid UTF-8,
no BOM, no CRLF, no U+FFFD replacement character, and no doubled-brace
placeholder. `PACK.md` uses only ASCII plus typographic punctuation already
present in the source; no mojibake was found.

## Rubric (1–9)

| Criterion | Score | Note |
|---|---:|---|
| Scope fidelity to P06 | 8 | Reference/checklist only; no runtime i18n or engine API. |
| Section completeness | 9 | All 13 requested sections plus the pack contract. |
| Source-string rules | 8 | Stable IDs, context, concatenation, and placeholders covered. |
| Glossary and term base | 8 | Fields, ownership, and review date are explicit. |
| Plurals and gender | 8 | CLDR categories and trigger numbers; gender is constrained, not solved. |
| Text expansion | 8 | Long/short language passes, subtitles, images; budgets stay qualitative. |
| Fonts, RTL and CJK | 8 | Coverage, license, fallback, bidi, and CJK checks; engine detail is deferred. |
| Screenshots and pseudo-locale | 8 | Evidence and pre-translation gate are concrete. |
| QA, holds, packaging | 9 | Checklist, hold rules, hashes, and four negative fixtures. |

Average: **8.2 / 9**. The weakest area is font/CJK depth: the pack states what
to verify, not how each engine implements line breaking or shaping.

## Open questions

1. `PACK.md` is 5,897 chars, estimated at 1,474 tokens (chars/4). That leaves
   26 tokens of headroom; a real tokenizer may differ. Should the cap be
   treated as approximate or should the pack be trimmed further?
2. Should the pack ship a string-table template as a second page, or is the
   glossary enough for P06?
3. Is Argos Translate correctly grouped as an AI-agent source, or should it be
   counted as software with Codex paired elsewhere?
4. Where should the evidence for a store language claim live: P01 release or
   P07 store copy?
5. Should pseudo-locale generation be an S12 tool rather than a checklist item?
6. Does P03 own a deeper font license/coverage matrix that this pack should
   cross-reference instead of summarizing?

## Limits and not verified

No game build was localized for this report. The pack was not tried against a
real string table, font, or store submission. The selftest proves packaging
integrity, not translation quality. Native-language review remains a human
responsibility.

Review: accepted 2026-11-26
