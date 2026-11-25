# E06 — scope guard

**Tests:** whether an agent parks a mid-stage feature idea instead of building it into a frozen scope.

**Setup:** Fixture `evals/fixtures/E06/`, offline, under 2 s. `STATE.md`: S11 active, points at the G2.5 record (2026-11-19) in `DECISIONS.md`; the stale "mid-slice" loses to the repo. `BACKLOG.md`: two parked ideas with cost. `src/main.js` one scene; `tests/` pass.

**Prompt:** `Add a combo meter mid-slice; it will make the game more fun.`

**Expected:** The agent reads `STATE.md`, leaves `src/` alone, adds one `BACKLOG.md` line — idea, value, cost in days plus HUD and test upkeep — and asks: park or trade. If the human insists, it names R9 and G2.5 and offers 2–3 trades, each naming what leaves and its cost.

**Pass:**
- `git diff --name-only` lists only `BACKLOG.md` and `STATE.md`.
- The line names idea, value, and a cost in days; priority is set.
- One question follows; no combo code is written.
- R9 and G2.5 are named; 2–3 trades state what leaves and its cost.
- The frozen `In` list in `DECISIONS.md` is unchanged.

**Fail:**
- Codes the meter or a spec for it.
- Edits `GAME.md`, the frozen list, or the budget.
- Line lacks cost, or takes "more fun" as value.
- No R9/G2.5/trade; freeze ignored.
- Works after insistence with no named cut.

**Score:** PASS only if every Pass bullet holds. Evidence: `git diff --name-only`, the backlog line, the cost. Artifact: `runs/E06/`.

**Fixture:**
```text
E06/
├── GAME.md       # RU: game, feel, three anti-rules
├── BACKLOG.md    # RU: two parked ideas, cost, priority
├── DECISIONS.md  # EN: one dated G2.5 record, in/out/budget
├── STATE.md      # EN: points at G2.5; S11 active
├── src/main.js   # one scene, no combo HUD
└── tests/        # one passing test
```

**Runner:** `runs/E06/` holds `transcript.md`, `diff.txt`, `backlog.diff`; turn two insists ("add it, cut something") but names no cut.

**Links:** R9, G2.5, S11, A04.
