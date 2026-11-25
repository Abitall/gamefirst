# D10 — report

Status: review-ready.
Artifact: `template/decisions.ru.md` (staging copy: `staging/D10/artifact/template/decisions.ru.md`).
Date: 2026-11-25.

## Summary

D10 is a Russian one-page digest of key decisions for the human. It is a view over the append-only `DECISIONS.md` (D03), not a translation and not a second journal: newest first, at most seven rows, each row dated and linked to its block, with the choice, the reason it won, and what changed. A fresh project ships it empty; the first row arrives with the first block.

The artifact is 357.5 tokens (1,430 characters, 2,435 bytes, 28 lines), under the 600-token limit with 40.4% headroom. The design borrows the "view over immutable records" idea from log4brains and the human-first, latest-first, dated, linkable, no-rewrite discipline from Keep a Changelog; the admission test, date rule, and authority model come from the accepted D03. No source text is copied.

All static checks pass. Evidence is thin by protocol: two external analogs plus one accepted internal part. The main open issues are the seven-row cap (editorial, not enforced), the date-as-link anchor (renderer-dependent), and the absence of a parser or command that reads D10.

## Size

| Metric | Value | Budget | Headroom |
|--------|-------|--------|----------|
| Characters (UTF-16 code units) | 1,430 | — | — |
| Tokens (chars / 4) | 357.5 | 600 | 242.5 (40.4%) |
| Bytes (UTF-8) | 2,435 | — | — |
| Lines | 28 | one page | ~35 visual lines at 90 chars |
| H2 sections | 3 | — | `Формат`, `Отбор`, `Ключевые решения` |
| Decision rows | 0 (empty by design) | 7 visible | First row arrives with the first block |
| Format sample | 1, indented code | not a row | Cannot be read as a decision |
| Cyrillic ratio | 0.955 | ≥ 0.6 | 0.355 |
| SHA-256 | `5a413e3811903c19d3c5dd3fb6a4e472ebdb29e01b89b046ef48dae3236f594b` | — | — |

## Checks

Command (run from `C:\Phaser Projects\gamefirst`):

```
node "C:\Users\Chirv\AppData\Local\Temp\opencode\d10-check.mjs"
```

Result: `"all": true`. The check maps the artifact's relative links to the staging copies of D02, D03, D05, R9, and the five gates (G0, G1, G2, G2.5, G3); in the final template these become siblings.

```json
{
  "artifact": "C:/Phaser Projects/gamefirst/staging/D10/artifact/template/decisions.ru.md",
  "bytes": 2435,
  "chars": 1430,
  "tokens": 357.5,
  "lines": 28,
  "h1": "# Решения",
  "h2": [
    "Формат",
    "Отбор",
    "Ключевые решения"
  ],
  "cyrRatio": 0.955,
  "sha256": "5a413e3811903c19d3c5dd3fb6a4e472ebdb29e01b89b046ef48dae3236f594b",
  "paths": {
    "template/DECISIONS.md": true,
    "template/BACKLOG.md": true,
    "template/STATE.md": true,
    "library/core/rules/R9-scope-is-budget.md": true,
    "library/game/gates/G0-concept-brief.md": true,
    "library/game/gates/G1-fun.md": true,
    "library/game/gates/G2-slice.md": true,
    "library/game/gates/G2.5-feature-freeze.md": true,
    "library/game/gates/G3-ship.md": true
  },
  "checks": {
    "utf8NoBom": true,
    "noCR": true,
    "trailingNewline": true,
    "noPlaceholders": true,
    "noTodo": true,
    "h1": true,
    "h2": true,
    "noColumn0Bullets": true,
    "noFakeRows": true,
    "sampleIndented": true,
    "sampleFields": true,
    "ids": true,
    "paths": true,
    "cyrRatio": true,
    "size": true,
    "onePage": true
  },
  "all": true
}
```

The check asserts:

- UTF-8 without BOM; no `\r`; one trailing newline; no double-brace placeholders; no TODO/TBD/lorem.
- H1 exactly `# Решения`; H2 exactly `Формат`, `Отбор`, `Ключевые решения` in that order.
- No column-0 bullets; no row starting `[2026-` outside the indented format sample; the sample is indented and carries `Решено:`, `Почему:`, `Меняет:`.
- Every printed ID resolves: `DECISIONS.md`, `BACKLOG.md`, `STATE.md`, `D02`, `D05`, `R9`, `G0`, `G1`, `G2`, `G2.5`, `G3`.
- The referenced staging paths exist; Cyrillic ratio is 0.955; 357.5 tokens ≤ 600; 28 lines ≤ 40.

The check script is a staging tool, not a template part. It reads the artifact and the staging copies; it is not shipped.

## Rubric

| # | Section | Verdict | Evidence and concern |
|---|---------|---------|----------------------|
| 1 | Necessity | PASS | Every unit has a row in `JUSTIFICATION.md` with a reason and a failure mode; eight structural alternatives are rejected with a condition under which each would win. The file solves a real cost: re-reading D03 to find the current choice. No unit is decorative. |
| 2 | Function | PASS | Trigger: after a block is appended to D03. Input: the block. Output: one row with a date link, a name, and three fields. Done when the link opens the block. Failure: no block, no row. Scope: one page, seven visible rows. The empty state and the indented sample are tested by the check. |
| 3 | Evidence | CONCERNS | Thin protocol: exactly three sources (log4brains, Keep a Changelog, D03). log4brains has 1,613 stars but its last push is 2024-12-17; the borrow is conceptual, not a dependency. Keep a Changelog is active (6,763 stars, last push 2026-11-10). D03 is accepted. No user test; the seven-row number is a local design choice, not a sourced constant. |
| 4 | Blueprint fit | PASS | `docs/V0.3-BLUEPRINT.md` row D10 names `decisions.ru.md` and "RU digest of key decisions". `docs/BUILD-PLAN.md` batch 15, row 15 is D10. The target is `template/decisions.ru.md`; no engine, no command, no parser. It ships empty, like D05. |
| 5 | Size | PASS | 1,430 characters, 357.5 tokens, 2,435 bytes, 28 lines; limit 600 tokens; headroom 242.5 (40.4%). One page at 90 characters per line (~35 visual lines). The seven-row cap is the budget for a filled digest; the template has zero rows by design. |
| 6 | Language/encoding | PASS | Russian user document; UTF-8 without BOM; LF only; POSIX relative link; no double-brace placeholders; ISO dates; Cyrillic ratio 0.955. The agent-facing JUSTIFICATION, SOURCES, and REPORT are English, per the framework rule. |
| 7 | Security | PASS | Document only: no code, secrets, network calls, user data, or executable content. The only link is the relative `DECISIONS.md#date`; the artifact has no external URL. Licenses: Apache-2.0, MIT, project text; no copied text. The residual risk is a misleading row, which the D03 link and the no-rewrite rule bound. |
| 8 | Testability | CONCERNS | The static check passes, but it tests structure, not truth. No parser or command reads D10; `/status` and `/next` ignore it. The anchor is a convention, not tested across GitHub, VS Code, and Obsidian. A missed block is not detected; only a human can confirm the first real row. |
| 9 | Integration | CONCERNS | All printed IDs resolve to accepted staging parts; D02, D03, D05, R9, and the five gates exist. `template/README.md:30` now lists `TASTE.md` and `decisions.ru.md`. No command reads D10; the anchor assumes D03 keeps the `## date` heading. The final `template/` copy is made in this task. |

Overall: 6 PASS, 3 CONCERNS, 0 FAIL. The concerns are evidence depth, automatic testability, and integration surface; none blocks the artifact's use as a human digest.

## Known weaknesses

- No filled example in the artifact, so the density of a real seven-row page is unproven. A worked example is in `JUSTIFICATION.md` only, marked as an illustration.
- The seven-row cap is editorial. Nothing prevents an eighth row; the journal keeps the displaced row, but the page can grow.
- A missed block makes the digest false. There is no automatic cross-check; the block-first and no-rewrite rules reduce the risk but do not remove it.
- The date is the link. Copying a row as plain text loses the URL; a separate arrow would be more visible but repeats the date.
- The anchor depends on the renderer. GitHub slugs `## 2026-11-25` to `#2026-11-25`; a duplicate date gets `-1`. A renderer that ignores fragments opens the journal at the top.
- D03's heading is a placeholder (`## [date]`) until the writer replaces it; the digest assumes the replacement.
- Russian prose is longer than English. Seven rows can exceed one screen if the fields are not terse.
- The 600-token limit is for the template. A filled digest will exceed it; the row cap is the real budget.
- "Key" is a judgment. The three tests reduce disagreement; they do not remove it.
- log4brains is less active (last push 2024-12-17); the borrow is conceptual, so this is a low risk.

## Open questions

1. Seven rows or five? Five gates would fill a five-row window; seven leaves room for two non-gate choices. Recommendation: seven.
2. Date-as-link or a separate `→ блок`? One occurrence and one edit wins; a separate arrow is more visible but repeats the date. Recommendation: date-as-link.
3. Remove a superseded row or mark it? Removal prevents stale advice; a mark preserves the chain in place. The journal keeps history, so removal wins.
4. Auto-generate in a later version? Only if D03 gains a strict schema and every block is key; v0.3 stays curated.
5. Who writes D10? The same hand that appends the block (A01 or the human); a gate line is the human's signature. The digest has no signature.
6. First row after G0 or after the first block? A decision may precede the build (R5), so the first block, not G0, starts the digest.
7. Should `template/README.md` line 30 add `decisions.ru.md` when D10 is copied? Resolved: it now lists `TASTE.md` and `decisions.ru.md`.
8. Should D10 be linked from a docs index as well? The root README is enough for v0.3; a second index adds a file to keep in sync.
9. Should a filled example be added as a separate fixture, outside the template? It would prove density without putting a fake decision in the shipped file; it would also add a fifth file to this part.

Review: pending
