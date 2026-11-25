# Report: P05 narrative pack

## Artifact

Path: `staging/P05/artifact/library/packs/narrative/`

Optional, on-demand narrative pack: a reference for canon, voice, and delivery,
plus checklists and an offline packaging self-test. It is not a story generator
and contains no runtime dialogue code, engine API, or engine-specific format.

## Sizes

Line counts use split-on-newline and include the final newline. Tokens are
`ceil(chars / 4)`.

| File | Bytes | Chars | Lines | Tokens |
|---|---:|---:|---:|---:|
| `PACK.md` | 5,989 | 5,989 | 132 | 1,498 |
| `templates/story-bible.md` | 1,693 | 1,693 | 60 | — |
| `selftest.mjs` | 9,410 | 9,410 | 249 | — |
| `manifest.json` | 537 | 537 | 19 | — |
| `JUSTIFICATION.md` | 12,408 | 12,408 | 117 | — |
| `SOURCES.md` | 5,921 | 5,921 | 138 | — |

PACK.md is 11 characters under the 6,000-character hard cap and two tokens under
the 1,500-token cap. The selftest is one line under its 250-line cap. The template
is well under the 4,000-character cap used by the selftest.

## Checks

Command run in `artifact/library/packs/narrative/`:

```
node selftest.mjs
```

Exact result: **17 passed, 0 failed**.

| # | Check | Result | Evidence |
|---:|---|---|---|
| 1 | Manifest parses | pass | JSON object |
| 2 | Identity | pass | `pack-narrative` 0.1.0 |
| 3 | Keys | pass | exactly 8; no `$schema` |
| 4 | Contract values | pass | `core,game`; `on-demand`; `none` |
| 5 | Files listing | pass | 3 files; recursive listing minus manifest |
| 6 | Hashes | pass | 3 sha256 values match |
| 7 | Encoding | pass | UTF-8, LF, no BOM |
| 8 | Token cap | pass | 5,989 chars / ~1,498 tokens |
| 9 | Template cap | pass | 1,693 chars |
| 10 | Line cap | pass | 249 lines |
| 11 | Required sections | pass | 12 headings |
| 12 | Register separation | pass | canon, voice, delivery separated |
| 13 | No secrets | pass | no key or token pattern |
| 14 | Negative: extra file | pass | `files listing` rejects `extra.txt` |
| 15 | Negative: bad hash | pass | `hashes` rejects a zeroed digest |
| 16 | Negative: string file entry | pass | `files listing` rejects `123` |
| 17 | Negative: missing section | pass | `required sections` rejects `## Held` |

The four negative cases are mutations of a temporary copy. Each is expected to
fail a named check, and each did: extra file and string entry under `files
listing`; bad digest under `hashes`; removed `## Holds` under `required
sections`. Temporary copies are removed after each case.

Encoding scan over all of `staging/P05/` (strict UTF-8, no BOM, no CR, no U+FFFD,
no template placeholder):

```
7 files, 0 failed
```

Final scan is after this report was written. The pack itself was also scanned by
the selftest as one of its 17 checks.

## Rubric (1-9; 9 = strongest)

| # | Criterion | Score | Note |
|---:|---|---:|---|
| 1 | Necessity | 8 | Fills the gap between S11 content and P06 localization without a narrative skill |
| 2 | Function | 8 | Reference and checklists only; no runtime, engine API, or story generation |
| 3 | Evidence | 8 | Nine repositories, exact stars, licenses; two licenses verified via repo page/README because root files were absent |
| 4 | Fit | 9 | Uses D01/D03/D04/D06/D07, S10-S12, G2/G2.5, E01/E06/E09, P01, P06, X02 |
| 5 | Size | 8 | Under all caps, but PACK.md has only 11 characters of headroom |
| 6 | Language and encoding | 9 | English artifacts; UTF-8, LF, no BOM, no U+FFFD, no placeholders |
| 7 | Security | 9 | No secrets, copied expression, publishing, or spending; X02 boundaries |
| 8 | Testability | 9 | Offline selftest with 17 checks, including four negative cases |
| 9 | Integration | 8 | Inherits P01 contract; P06 handoff; project paths for CANON/VOICE are proposals |

Average: 8.4. No criterion is below 8; the weakest are headroom, evidence for two
license claims, and the proposed canon/voice paths.

## Open questions

1. Are `docs/narrative/CANON.md` and `docs/narrative/VOICE.md` the intended
   project paths, or should the pack leave them configurable through D03?
2. The task lists 11 sections; the pack has 12 because `## Three registers` is
   required by the canon/voice/delivery rule. Keep it as a required section or
   fold it into `## Boundaries`?
3. Does P06 own the string-table schema, or should P05 define it? The pack
   currently names the handoff fields and leaves the table to P06.
4. Ren'Py and Weblate licenses were confirmed from the repository README and
   page; their root license files return 404. Is that evidence acceptable, or
   should the entries be marked unverified?
5. Should every pack restate the P01 shape contract, or is inheritance enough?
   This pack inherits it and does not repeat the eight-key manifest rules.
6. Is a 1,498-token PACK.md acceptable, or should the next revision target about
   1,400 tokens for review headroom?

## Limits

No canon, names, plot, or dialogue for a specific game. No parser, compiler, save
format, engine call, network request, or generated prose. The checklists do not
replace playtesting or a writer's judgment. No commit was made.

Review: accepted 2026-11-26
