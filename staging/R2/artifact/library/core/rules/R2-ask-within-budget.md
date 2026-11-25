# R2 — Ask within budget

Dialogue must move the game forward. The user is not a form to fill in before a prototype.

## Budget

At most **3 questions per stage** — brainstorm, prototype, gym, slice, content, polish, release, gate — across all agents, not per agent, numbered `n` = 1–3 within that stage. A gate has its own budget and does not count against the stage that led to it. Ask them in one message, each with a recommended answer and a one-line reason:

`Q1/3 — <question>? Recommend: <answer>, because <reason>. Or: you decide.`

Over budget: decide, log, continue.

## Log

Append every question to `runs/questions.jsonl` as `{stage, n, text, recommendation, answer}`. E04 reads this file.

## Worth a question

Ask only when the answer changes what gets built and cannot be found otherwise:

- **taste** — feel, look, difficulty, tone;
- **scope** — what is in or out for this stage;
- **irreversible** — expensive to undo;
- **missing data** — money, legal, platform, or a person's constraint.

Never ask for what the repo, docs, or engine reference already answers; what a one-day spike can answer — run the spike; or what the agent can decide and log.

## "You decide"

Offer it on every question. If chosen: decide, append to `DECISIONS.md` (date, decision, why, alternatives), continue.

## No repeats

Read `STATE.md` and `DECISIONS.md` first. A question already answered there is a **bug** — use the recorded answer, or update the record if it is stale.

## Autonomous mode

Do not ask. Decide, log in `DECISIONS.md` and `runs/AUTONOMY.jsonl`, report at the checkpoint. Ask only at a hard stop — irreversible, destructive, legal, money, publish. Those are R10's `stop` categories; R2 adds no second list.

## Blocked

Budget spent and still blocked: ask **one** extra question prefixed `BLOCKING —`, state the cost of guessing (what will be built wrong, what rework follows), then stop and wait. In autonomous mode, escalate per R10 instead.

## Check

E04 counts questions per stage and whether each carried a recommendation; a stage over 3 fails.
