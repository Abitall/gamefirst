# P07 report - marketing pack

Date: 2026-11-26. Scope: `staging/P07/` only. No commit; `library/`, `template/`,
and other staging parts untouched.

## Artifact

| Path | Bytes | Lines | Tokens (chars/4) |
|---|---|---|---|
| `artifact/library/packs/marketing/PACK.md` | 5,980 | 137 | 1,495 |
| `artifact/library/packs/marketing/manifest.json` | 517 | 15 | 130 |
| `artifact/library/packs/marketing/selftest.mjs` | 9,299 | 250 | 2,325 |
| `artifact/library/packs/marketing/templates/press-kit.md` | 1,854 | 59 | 464 |
| total | 17,650 | 461 | 4,414 |

`PACK.md` is 5,980 of 6,000 characters (99.7% of the cap), so the token cap has
effectively no headroom. The selftest is exactly 250 lines. No file is empty and
no hash is empty.

## Checks

| Check | Method | Result |
|---|---|---|
| Manifest parses; identity, eight keys, no `$schema`, selftest command | `node selftest.mjs` | pass |
| `files` equals the recursive directory minus `manifest.json` | `node selftest.mjs` | pass, 3 files |
| Hashes match and are 64-hex | `node selftest.mjs` | pass, 3 sha256 |
| Encoding, BOM, CRLF, U+FFFD, invalid UTF-8, double-brace placeholder | `node selftest.mjs` + independent scan of all 4 files | pass, UTF-8, LF, no BOM |
| Token cap | `node selftest.mjs` | pass, 5,980 <= 6,000 chars (1,495 <= 1,500 tokens) |
| Selftest line budget | `node selftest.mjs` | pass, 250 <= 250 |
| Required sections and no-post / no-copy lines | `node selftest.mjs` | pass, 13 needles |
| Secret patterns | `node selftest.mjs` | pass, no key or token pattern |
| Empty file or empty hash | file listing and hash regex | pass |
| Negative: extra file | temp copy with `extra.md` added | fails as intended, exit 1 for that run |
| Negative: bad hash | temp copy with `PACK.md` hash zeroed | fails as intended |
| Negative: non-string `files` entry | temp copy with `files[0] = 42` | fails as intended |
| Negative: missing section | temp copy with `## Holds` renamed | fails as intended |
| Sources | count of `### n.` entries | 9: 4 gamedev, 3 software, 2 AI-agent |
| Network use | imports are `node:crypto`, `node:fs`, `node:os`, `node:path`, `node:url` only | none |
| Publish or spend path | pack text forbids it; no upload, post, or credential field | none |

Full run: 16 checks `ok` (12 main, 4 negative), exit code 0. Exact final line of
stdout:

```text
ok   negative: missing section
```

## Rubric 1-9

| # | Section | Score /9 | Note |
|---|---|---|---|
| 1 | Necessity | 8 | Fills the gap S13 and C03 both point at (P07 owns the words) and gives each blueprint unit an evidence shape. §Store page copy fields overlaps P01 §2 at the field level; the split is P01 presence versus P07 words. |
| 2 | Function | 9 | Trigger, inputs, output shape, done, failure, and scope are stated; a blank row is a hold, and a green run is explicitly not approval to publish. |
| 3 | Evidence | 9 | Nine sources in the required 4/3/2 split with stars, licenses, analog, borrow, reject, and honest dead ends (GitHub 403, three presskit 404s, no in-repo devblog). No copied code or text. |
| 4 | Blueprint fit | 9 | Correct layer and path (`library/packs/marketing/`), `requires` is `core` + `game`, priority mode > rule > skill > pack > docs respected. |
| 5 | Size | 7 | 5,980 of 6,000 characters and 250 of 250 lines: compliant but with zero headroom, so any addition will require a removal and a hash refresh. |
| 6 | Language and encoding | 9 | English artifact, UTF-8 without BOM, LF, POSIX paths, Windows-safe names, ASCII punctuation. |
| 7 | Security | 9 | No secrets or tokens, no network call, no posting, upload, or spend path; fabricated and purchased signals are named as holds. |
| 8 | Testability | 9 | Sixteen offline checks, actionable messages, and four negative fixtures that prove the extra-file, hash, type, and section checks can actually fail. |
| 9 | Integration | 8 | IDs and paths are stable; S13, C03, G3, R4, E12, R9, P01, X03, A04 and S12 resolve as IDs. P03 is a forward reference, and `requires` / `loaded` still have no consumer. |

Self-check total: 77/81. Acceptance is the reviewer's decision; this table only
records the author's evidence.

## Open questions

1. Platform links age. The five holder entry points are domains, not deep links;
   when one moves, who re-validates the pack? A dated check in S13 would close
   this, but it adds a step to a skill that already says "re-read".
2. Claims evidence. The table asks for a pointer per claim but does not fix a
   file. Should every project keep one `store/claims.md` so a reviewer can diff
   it, or is a per-store row enough?
3. Press-kit ownership. The template ships here, but the filled kit is a
   per-release artifact. Does it live under `evidence/<date>-release/` with
   P01's record, or in the marketing folder? The pack says one page, one URL, and
   leaves the path open.
4. P01 versus P07 boundary. P01 §2 lists page fields and P07 repeats some of them
   with rules. Keep the duplication (presence versus words), or move the field
   list entirely into P07 and leave P01 with "copy exists"?
5. No auto-posting. The pack forbids it, but R4 and E12 do not yet name which
   marketing actions (keys, posts, ad spend) need which command shape. Until they
   do, the boundary lives only in this pack.
6. Token headroom. At 99.7% of the cap, should the contract allow a 2,000-token
   marketing pack, or should the calendar and the press-kit section move into the
   template to buy space?

Review: accepted 2026-11-26
