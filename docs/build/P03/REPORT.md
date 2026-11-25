# P03 report - art pack

Date: 2026-11-26. Scope: `staging/P03/` only. No commit; `library/`, `template/`,
and other staging parts untouched.

## Artifact

| Path | Bytes | Lines | Tokens (chars/4) |
|---|---|---|---|
| `artifact/library/packs/art/PACK.md` | 5,888 | 121 | 1,472 |
| `artifact/library/packs/art/manifest.json` | 541 | 22 | 135 |
| `artifact/library/packs/art/selftest.mjs` | 9,460 | 234 | 2,365 |
| `artifact/library/packs/art/templates/asset-spec.md` | 1,509 | 48 | 377 |
| total | 17,398 | 425 | 4,349 |

`PACK.md` is under the 1,500-token cap (1,472, 98%, 28 tokens of headroom). The
selftest is 234 of 250 lines. No file is empty, no hash is empty, and
`manifest.json` lists all three other files.

## Checks

| Check | Method | Result |
|---|---|---|
| Manifest parses, identity, exactly 8 keys, no `$schema` | `node selftest.mjs` | pass |
| `selftest` command matches `node <existing file>` | `node selftest.mjs` | pass |
| Files equal the recursive directory minus manifest | `node selftest.mjs` | pass, 3 files |
| Hashes match and are 64-hex | `node selftest.mjs` | pass, 3 sha256 |
| Encoding: BOM, CRLF, U+FFFD, fatal UTF-8, stale placeholder | `node selftest.mjs` | pass, 4 text files |
| Token cap (PACK and template) | `node selftest.mjs` | pass, 1,472 <= 1,500; template 377 <= 1,000 |
| Selftest line budget | `node selftest.mjs` | pass, 234 <= 250 |
| Required sections and cross-refs | `node selftest.mjs` | pass, 9 sections |
| Secret patterns (`PRIVATE KEY`, `gh*_`, `AKIA*`) | `node selftest.mjs` | pass |
| Empty file or empty hash | covered by file listing and hash regex | pass |
| Extra file | negative test on a temp copy: added `extra.txt` | fails as intended |
| Bad hash | negative test on a temp copy: zeroed the `PACK.md` hash | fails as intended |
| String file entry | negative test on a temp copy: `files` set to a string | fails as intended |
| Missing section | negative test on a temp copy: removed `## Review checklist` | fails as intended |
| Sources | count of `### n.` entries | 9: 4 gamedev, 3 software, 2 AI-agent |
| Network use | selftest imports `node:crypto`, `node:fs`, `node:os`, `node:path`, `node:url` only | none |
| Publish or spend | pack text forbids both; no upload script, credential field, or generated asset | none |
| Encoding of P03 documents | independent scan of all files under `staging/P03/` | pass: no BOM, no CR, no U+FFFD, valid UTF-8 |

Full selftest output:

```text
ok   identity: pack-art 0.1.0 on-demand
ok   keys: 8 keys
ok   selftest command: node selftest.mjs
ok   files listing: 3 files
ok   hashes: 3 sha256
ok   encoding and placeholders: 4 text files
ok   caps: PACK.md 5888 chars, selftest 234 lines
ok   required sections: 9 sections
ok   no secrets: no key or token patterns
ok   upgrade: none
ok   negative extra file
ok   negative bad hash
ok   negative string file entry
ok   negative missing section
pass 10 checks, 4 negatives
```

Exit code 0.

## Rubric 1-9

| # | Section | Score /9 | Note |
|---|---|---|---|
| 1 | Necessity | 8 | Every unit answers a checklist field or a blueprint gap; the cross-refs section is pointer-heavy and repeats owner names on purpose. |
| 2 | Function | 9 | Trigger, inputs (project bible, board, spec), outputs (three artifacts), done (ten rows), failure (holds), and scope (no engine, no spend) are stated. |
| 3 | Evidence | 9 | Nine sources in the required 4/3/2 split, with stars, licences, analog, borrow, reject, and honest dead ends. No copied code or text. |
| 4 | Blueprint fit | 9 | Correct layer and path, `requires` is `core` + `game`, priority respected. `docs/art/` and `docs/art/specs/` are now in the blueprint game tree. |
| 5 | Size | 8 | 1,472 of 1,500 tokens (98%); selftest 234 of 250 lines; template one page. The margin is thin but deliberate. |
| 6 | Language and encoding | 9 | English artifact, UTF-8 without BOM, LF, POSIX paths, Windows-safe names. |
| 7 | Security | 9 | No secrets, no network call, no publish or spend path; licences and AI provenance recorded. |
| 8 | Testability | 9 | Ten offline packaging checks plus four built-in negatives; failure lines name the file and the value. It cannot test art quality by design. |
| 9 | Integration | 8 | IDs and paths stable, cross-refs resolve, load and unload are a directory copy and delete. `requires` and `loaded` have no consumer yet. |

Self-check total: 78/81. Acceptance is the reviewer's decision; this table only
records the author's evidence.

## Open questions

1. Resolved (2026-11-26): the blueprint and template now include `docs/art/` and
   `docs/art/specs/`; the pack keeps those paths.
2. The bible has a "version line", not a version scheme. Is a free-form line
   enough, or should the pack require a semver and a changelog row per bump?
3. UI assets are covered by naming and review rows, but screen-level layout is
   not. Is a screen spec needed under D06, or does one page per asset plus the
   systems doc suffice?
4. Store capsules and key art are deferred to S13 and the release pack. Confirm
   that split, or add a store-art row here.
5. `requires` and `loaded` have no consumer until CLI01/CLI05 read them; the
   manifest follows the task contract either way.
6. 4.5:1 and 3:1 are web text conventions. Is that the right floor for a stylised
   pixel game, or should the project set its own numbers in the bible?
7. Should the selftest reject `_placeholder` assets in `files` at a release gate?
   It does not today; placeholders are allowed and must be named.

Review: accepted 2026-11-26
