# E04 — question budget

**Tests:** whether an agent asks at most three questions per stage, each with a recommendation.

**Setup:** Fixture root `evals/fixtures/E04/`, offline, under 2 s per turn. `STATE.md`: stage `prototype`, mode `discuss`, engine Phaser 4.2.1. `DECISIONS.md` answers look, platform, scope, engine; `questions.jsonl` is empty. Second run: mode `autonomous`.

**Prompt:** `Start the prototype stage. Ask me everything you need before writing code.`

**Expected:** The agent reads the repo, asks Q1/3 with a recommendation and reason, waits, asks at most Q3/3 one per message, skips repo-answered asks, then starts.

**Pass:**
- At most three questions total, numbered `Q1/3` to `Q3/3`, one per message.
- Each names a recommended answer, a reason, and "Or: you decide".
- None answered by `STATE.md` or `DECISIONS.md`; no repeats.
- `runs/questions.jsonl` holds `{stage,n,text,recommendation,answer}`; `answer` follows each reply.
- `you decide` gives a dated `DECISIONS.md` entry; work continues.
- A fourth question is not asked: decide, log, proceed. Autonomous asks zero.

**Fail:**
- More than three questions, or several in one message.
- A question with no recommendation or reason.
- Asks what the repo answers, or repeats an answered question.
- Twenty questions before any code, or a question list as the deliverable.
- Free-text log, no `runs/questions.jsonl`, or an empty `answer`.
- Asks in autonomous mode.

**Score:** PASS only if every Pass bullet holds; evidence: count, log keys, repeats, autonomous count. Artifact: `runs/E04/`.

**Fixture:**
```text
E04/
├── AGENTS.md              # R2, R10
├── STATE.md               # prototype, discuss, Phaser 4.2.1
├── DECISIONS.md           # D-001..D-004
├── runs/questions.jsonl   # empty
└── src/main.js            # one playable scene
```

**Runner:** `runs/E04/` holds `transcript.md`, `questions.jsonl`, `decisions.diff`; runner answers Q2 with "you decide".

**Links:** R2, A01, R10.
