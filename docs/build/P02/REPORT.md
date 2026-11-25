# P02 report - obsidian pack

## What was built

`artifact/library/packs/obsidian/`: an optional, on-demand reference pack for
exporting project knowledge to an Obsidian vault. The vault is a view; the
repository stays the source of truth. The pack defines the vault layout, a
six-key note card, wikilink and map-card rules, a plain-Markdown fallback, a
manual import check, and a packaging selftest. It ships no runtime code, no
game docs, and no publish step.

## Artifact sizes

| File | Bytes | Lines | Tokens (chars/4) | Cap |
|---|---:|---:|---:|---|
| `PACK.md` | 5,739 | 129 | 1,435 | 1,500 tokens / 6,000 chars |
| `manifest.json` | 544 | 21 | 136 | eight keys, no `$schema` |
| `selftest.mjs` | 7,349 | 215 | 1,837 | 250 lines |
| `templates/note-card.md` | 1,273 | 32 | 199 | one page (4,000 chars; 793 chars used) |

## Checks

Command, from `artifact/library/packs/obsidian/`:

```text
node selftest.mjs
```

Output:

```text
ok   manifest parses
ok   identity
ok   keys
ok   selftest command
ok   files listing
ok   hashes
ok   encoding and placeholders
ok   token cap
ok   line budget
ok   required sections
ok   no secrets
ok   upgrade
ok   negative: extra file (files listing failed as expected)
ok   negative: bad hash (hashes failed as expected)
ok   negative: string file entry (files listing failed as expected)
ok   negative: missing section (required sections failed as expected)
all checks ok
```

Result: **12 checks ok, 4 negative cases ok, exit code 0.**

| Check | Method | Result |
|---|---|---|
| Manifest parses | `JSON.parse`, object check | pass |
| Identity | `id`, `version`, `requires`, `loaded` compared to fixed values | pass |
| Keys | sorted `Object.keys` equals the eight contract keys; a `$schema` key would fail | pass |
| Selftest command | regex `^node\s+(\S+)$`, file named `selftest.mjs` | pass |
| Files listing | array of strings, POSIX, relative, not the manifest, exists, non-empty, equal to the sorted disk walk | pass |
| Hashes | key set equals files, 64-hex sha256, value matches the bytes | pass |
| Encoding | no BOM, fatal UTF-8 decode, no CR, no `{{`, no U+FFFD | pass |
| Token cap | `PACK.md` chars and chars/4; every `templates/` page under 4,000 chars | pass |
| Line budget | `selftest.mjs` under 250 lines | pass |
| Required sections | seven headings plus `source of truth`, `[[title]]`, `generated: true`, `personal data` | pass |
| No secrets | private-key header, GitHub token, AWS key patterns over every file | pass |
| Upgrade | value is `none` | pass |
| Negative: extra file | temp copy plus `extra.txt` | `files listing` failed |
| Negative: bad hash | temp copy, `PACK.md` hash replaced by zeros | `hashes` failed |
| Negative: string entry | temp copy, `files` replaced by a string | `files listing` failed |
| Negative: missing section | temp copy, `## Outputs` renamed | `required sections` failed |

The four negative cases run on a `mkdtemp` copy and are removed afterwards. The
selftest uses the local filesystem only: no network, no vault, no Obsidian, no
game repository.

## Contract compliance

- Artifact path matches `docs/BUILD-PLAN.md:103`: `library/packs/obsidian/`.
- Manifest has exactly the eight keys, in the order and with the values from the
  task; there is no `$schema` key because no schema file ships.
- `files` lists every path except `manifest.json`; `hashes` covers each file.
- `loaded` is `on-demand`; `requires` is `["core","game"]`; `upgrade` is `none`.
- No runtime code: `selftest.mjs` is packaging-only; the template is one page.
- No publish, spend, cloud sync, or plugin install appears anywhere.
- The pack restates no rule or skill step. It names the boundary locally and
  cross-references the owner (R4, X02, M01, S03, D03, D07).

## Rubric self-assessment

| # | Section | Note |
|---|---|---|
| 1 | Necessity | `JUSTIFICATION.md` answers why / if removed / source for 18 units. Every checklist line maps to a contract clause. |
| 2 | Function | Trigger: "When to load". Input: repo docs. Output: vault notes, log, card. Done: both checklists green. Failure: six named holds. Scope: no publish, no sync, no plugins, no game docs. |
| 3 | Evidence | Nine sources in the 4 / 3 / 2 split, each with URL, stars, license, analog, borrow, reject; dead ends recorded. No code or license text copied. |
| 4 | Blueprint fit | Pack layer, optional and on demand (`docs/V0.3-BLUEPRINT.md:133`), P02 job cited from `:311`; doc and memory IDs referenced correctly; no engine import; priority respected. |
| 5 | Size | 1,435 tokens against 1,500; template 793 chars; selftest 215 lines. Nothing known to cut without losing a check. |
| 6 | Language and encoding | Pack in English, note card in Russian (D04/D07/D09/D10 are RU); UTF-8 without BOM; LF; POSIX paths; Windows-safe names. |
| 7 | Security | No secret, key, or personal data; playtest people stay P1-P5; export is local; publish and spend stay under R4; AGPL/GPL sources contributed ideas only. |
| 8 | Testability | `node selftest.mjs`, 12 checks plus 4 negative cases, offline, under a second, actionable `FAIL` lines, exit 0 or 1. |
| 9 | Integration | Stable paths and names; cross-references resolve; loads alone; no engine, OS, or editor assumption; plain Markdown fallback keeps it usable without Obsidian. |

Self-check total: 9 of 9 sections pass; no known blocker.

## Open questions

1. Should the person or the installer add the vault path to `.gitignore`? The
   pack allows a vault inside the repo only when ignored; the installer could
   write the line, but that would edit a file outside the pack.
2. Should map cards be generated from frontmatter, or stay hand-written? A
   generator would be runtime code; the pack keeps them hand-written and checked.
3. `links` duplicates the body wikilinks. It is kept because a machine can check
   it without parsing prose; a reviewer may prefer one source.
4. Should a note's `checked` date refresh on re-export when the content did not
   change? The pack refreshes it only after a re-read of the source.

## Review

Review: accepted 2026-11-26
