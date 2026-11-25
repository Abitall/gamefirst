# Batch 19 review — P07 marketing pack

**Verdict:** PASS  
**Date:** 2026-11-26  
**Scope:** `library/packs/marketing/`

## Part

| Field | Value |
|---|---|
| PACK.md | 5,980 chars / 1,495 tokens / 137 lines |
| manifest.json | 517 B, exactly 8 keys |
| selftest.mjs | 9,299 B / 250 lines |
| template | `press-kit.md`, 1,854 chars |
| Sources | 9 (4 gamedev, 3 software, 2 AI-agent) |
| Checks | 12 main + 4 negative = 16; all pass |
| Report | 77/81 |
| Review | accepted 2026-11-26 |

## Checks run

- `node selftest.mjs` exits 0, including four negative cases;
- manifest `files` equals the recursive directory minus `manifest.json`;
- SHA-256 hashes match;
- UTF-8 without BOM, LF only, no U+FFFD, no `{{`;
- no publish, spend, auto-post, or account action;
- `PACK.md` fits the 6,000-character cap with 20 characters of margin.

## Open issues

1. 5,980/6,000 chars and 250/250 lines leave no room for later edits; any change
   needs a re-measure and a trim.
2. Platform links and store rules age quickly; the pack says to re-check them.
3. No part consumes the press-kit template yet; P01 only defines the pack shape.
4. The pack deliberately stops at materials; publishing remains R4 and a human
   decision.

## Next

The last three packs close the library. Remaining work is the install/use
description and the four external reviews.
