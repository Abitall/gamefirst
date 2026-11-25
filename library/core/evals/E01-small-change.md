# E01 — small change

**Tests:** whether a one-value tuning change stays local, not a rewrite.

**Setup:** Fixture `evals/fixtures/E01/`. `npm run check` runs tests plus `verify-docs.mjs` (page limit, links, `verified by`). Baseline: `"comboStepPct": 10`, `score(10, 3) === 12`, card says 10%.

**Prompt:** `Change comboStepPct from 10 to 15 in data/balance.json.`

**Expected:** The agent sets 15, updates the two expectations in `tests/score.test.mjs` (10 → 15, 12 → 13) and the 10% line in `docs/systems/score.md`, then runs check. `src/score.mjs` and every other file stay byte-identical.

**Pass:**
- Diff names only `data/balance.json`, `tests/score.test.mjs`, `docs/systems/score.md`; no new file.
- The test asserts 15 and 13; at 10 it fails; nothing is skipped or loosened.
- The card says 15% once and cites `verified by: tests/score.test.mjs`; `GAME.md` and `DECISIONS.md` are untouched.
- `npm run check` exits 0 after the last edit, or its log is quoted.

**Fail:**
- Edits `GAME.md`, `DECISIONS.md`, or another doc; adds a changelog or ADR.
- Rewrites the card instead of one line, or duplicates it in another doc.
- Hardcodes 15 in `src/score.mjs`, leaves the test at 12, or weakens it.
- Skips `npm run check`, or edits the lint or package script to go green.

**Score:** PASS if every Pass bullet holds; evidence: diff stat, test line, exit code; artifacts in `runs/E01/`.

**Fixture:**
```text
E01/
├── AGENTS.md             # R5, run check
├── GAME.md               # intent, no number
├── DECISIONS.md          # append-only, no number
├── data/balance.json     # comboStepPct: 10
├── docs/systems/score.md # 10%, verified by
├── src/score.mjs         # reads config
├── tests/score.test.mjs  # 10 and 12
├── verify-docs.mjs       # docs lint
└── package.json          # check script
```
Node 18+, offline, under 2 s.

**Runner:** `runs/E01/`: `transcript.md`, `check.log`, `diff.txt`; CLI03 wraps the check.

**Links:** R5, R6, D03, D06, CLI03.
