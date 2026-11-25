# D04 — GAME + TASTE: justification

Unit-by-unit rationale for both artifacts. Thin protocol: two external sources
and one accepted internal part.

## GAME.md

| # | Unit | Why it exists | If removed | Source |
|---:|---|---|---|---|
| 1 | First line one sentence for `/help` | `/help` (SL06) needs one line that works without the rest. | Help prints a heading and no game. | SL06; A01 |
| 2 | "Orientation, not specification" | The file is for the human, not a contract for code. | The page becomes a second GDD and drifts. | R5; G0 |
| 3 | Written only after G1 and a played loop | A description before the build is a guess. | The page describes a game nobody played. | R5, R8; G0/G1 |
| 4 | `BRIEF.md` owns the pre-G1 description | One fact in one place. | D01 and D04 disagree. | D01; R5 |
| 5 | One page, `[...]` slots, second page to BACKLOG | Keeps the page short and stops scope creep. | The page grows; R9 loses the idea. | R9; D01 |
| 6 | Player fantasy in one sentence | It is the emotional promise the loop must keep. | The page lists features without a feeling. | S06; R7 |
| 7 | Loop has exactly three steps, as built | A loop longer than three steps cannot be checked at a glance. | The page becomes a feature list. | R8; S08 |
| 8 | "Build is right" line | The running game wins over the text. | The doc contradicts the build and nobody knows which is true. | R1, R5 |
| 9 | Feel in two or three sentences; frame in TASTE | Prose for movement, image for look; no duplicate. | The two files repeat each other. | R7; TASTE |
| 10 | Audience from BRIEF, checked in D07 | It is a claim to test, not a demographic guess. | "Everyone" returns. | D01, D07 |
| 11 | Three anti-rules with a replacement | A prohibition without an alternative is a dead end. | The rule is ignored in play. | R7; TASTE |
| 12 | `Verified by` line: G1, D07, evidence, build | The page is written only when there is proof. | The page becomes an unverified plan. | R1, R5, R8 |

## TASTE.md

| # | Unit | Why it exists | If removed | Source |
|---:|---|---|---|---|
| 13 | One frame from the running build | Taste needs an artifact, not an adjective. | "Beautiful" has no referent. | CLI10; R8 |
| 14 | Five feeling words, each tied to the frame | A word that fits any game is not a taste. | The list becomes marketing. | R7 |
| 15 | Three anti-rules separate from GAME | Look/motion prohibitions differ from behavior prohibitions. | The two lists merge and contradict. | R7; GAME |

## Deliberately absent

- No feature list, no spec, no numbers: GDD and `docs/systems/` own them.
- No concept art: the frame must come from the build (CLI10).
- No second reference: one distant reference is enough at this stage (R7).
- No gate decision: G1 is in `DECISIONS.md`; this file links it.

## Encoding

GAME: 1,698 chars / 424.5 tokens / 39 lines / 22 slots, UTF-8 no BOM, LF,
trailing newline. TASTE: 1,150 chars / 287.5 tokens / 35 lines / 22 slots, same
encoding. Russian prose, English IDs; the only non-ASCII beyond Cyrillic are
angle brackets and the em dash.
