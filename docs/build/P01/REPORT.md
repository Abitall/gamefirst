# P01 report - release pack

Date: 2026-11-26. Scope: `staging/P01/` only. No commit, no files outside this
part, `library/`, `template/`, and other staging parts untouched.

## Artifact

| Path | Bytes | Lines | Tokens (chars/4) |
|---|---|---|---|
| `artifact/library/packs/release/PACK.md` | 4,375 | 100 | 1,094 |
| `artifact/library/packs/release/manifest.json` | 525 | 15 | 132 |
| `artifact/library/packs/release/selftest.mjs` | 7,908 | 220 | 1,977 |
| `artifact/library/packs/release/templates/release-record.md` | 1,460 | 73 | 365 |
| total | 14,268 | 408 | 3,568 |

`PACK.md` is under the 1,500-token cap (73%). No file is empty, no hash is empty,
and `manifest.json` lists all three other files.

## Checks

| Check | Method | Result |
|---|---|---|
| Manifest, identity, keys, `$schema`, selftest command | `node selftest.mjs` | pass |
| Files equal the recursive directory minus manifest | `node selftest.mjs` | pass, 3 files |
| Hashes match and are 64-hex | `node selftest.mjs` | pass, 3 sha256 |
| Encoding, BOM, CRLF, U+FFFD, invalid UTF-8, double-brace placeholder | `node selftest.mjs` + independent scan of all 7 files | pass |
| Token cap | `node selftest.mjs` | pass, 1,094 <= 1,500 |
| Selftest line budget | `node selftest.mjs` | pass, 220 <= 250 |
| Required sections and no-publish line | `node selftest.mjs` | pass, 10 needles |
| Secret patterns | `node selftest.mjs` | pass |
| Empty file or hash | covered by file listing and hash regex | pass |
| Extra file | negative test on a temp copy: added `extra.txt` | fails as intended, exit 1 |
| CRLF | negative test on a temp copy: converted `PACK.md` | fails as intended, exit 1 |
| Sources | count of `### n.` entries | 9: 4 gamedev, 3 software, 2 AI-agent |
| Network use | imports are `node:crypto`, `node:fs`, `node:path`, `node:url` only | none |
| Publish or spend | pack text forbids it; no upload script or store credential field | none |

Full selftest output: 13 checks `ok`, exit code 0.

## Rubric 1-9

| # | Section | Score /9 | Note |
|---|---|---|---|
| 1 | Necessity | 8 | Every section answers an evidence field S13 or G3 leaves open; the shared contract prevents six more schemas. §2 overlaps S13 step 2 at the level of intent. |
| 2 | Function | 9 | Trigger, input, output, done, failure, and scope are stated; a missing row is a hold, and a green run is explicitly not approval. |
| 3 | Evidence | 9 | Nine sources in the required 4/3/2 split, with stars, licenses, analog, borrow, reject, and honest dead ends. No copied code or text. |
| 4 | Blueprint fit | 9 | Correct layer and path (`library/packs/release/`), `requires` is `core` + `game`, priority mode > rule > skill > pack > docs respected. |
| 5 | Size | 9 | 1,094 of 1,500 tokens; selftest 220 of 250 lines; template one page. |
| 6 | Language and encoding | 9 | English artifact, UTF-8 without BOM, LF, POSIX paths, Windows-safe names. |
| 7 | Security | 9 | No secrets or tokens, no network call, no publish or spend path; imported ideas only, licenses recorded. |
| 8 | Testability | 8 | Thirteen offline packaging checks, cheap to run, actionable messages, plus two negative tests. It cannot test store behaviour by design. |
| 9 | Integration | 8 | IDs and paths stable, cross-refs resolve, load/unload is a directory copy/delete. `requires` and `loaded` have no consumer yet. |

Self-check total: 80/81. Acceptance is the reviewer's decision; this table only
records the author's evidence.

## Open questions

1. Should the pack contract live in one shared `library/packs/CONTRACT.md` once
   P02 lands, instead of being repeated in each `PACK.md`? Repetition is the cost
   of a self-contained pack.
2. Do CLI01/CLI05 read `requires` and `loaded`, or are they documentation until a
   consumer ships? The manifest follows the task contract either way.
3. Where should a filled `templates/release-record.md` live: S13's
   `evidence/<date>-release/` or the project root? S13 implies the evidence folder.
4. Store requirement rows: keep them as categories with a link to the current
   holder document, or add dated snapshots? Snapshots go stale; links can move.
5. Is checklist-level coverage enough for mobile and web, or does the blueprint
   expect per-store detail that would exceed the cap?
6. Should the contract cap `templates/` at one page per file, and at how many
   files, so P02-P07 cannot grow a second manual?

Review: accepted 2026-11-26
