# R10 — Autonomy is contract

Autonomy is a written agreement, not a mood or a longer prompt. Without one on
disk, the agent asks (R2) or stops; it does not grant itself a scope, a budget,
or a definition of done.

## Contract

Write it to `STATE.md` before the first autonomous action. The agent that will
run it does not approve it; the user does. X01 owns the template; the ten fields
it must fill are:

| Field | Meaning |
|---|---|
| goal | one sentence, measurable: what exists when the run ends |
| constraints | files and paths in scope; no publish, no secret, no destructive command, no design change |
| done | an artifact, a `verify` pass, and an evidence path (R1) — never "code written" |
| allowed | tools, commands, paths; default deny, and anything unlisted is refused, not negotiated |
| stop | a gate, ambiguity, an irreversible action, a third failed attempt, budget, or missing user input |
| budget | `max_files`, `max_tokens`, `max_minutes`, `attempts_per_problem` (max 3) |
| checkpoints | every 30–60 minutes or at a gate |
| log | `runs/AUTONOMY.jsonl`, append-only: time, action, files, result, decision, next |
| report | changed, evidence, open questions, next |
| escalation | one `BLOCKING —` question with options and a recommendation, then stop |

## Checkpoints

Every checkpoint writes `STATE.md` — done, next, blocked — and one log line, so
a resumed run starts from `STATE.md`, not from memory. Work in a worktree or a
scratch branch: a scratch commit is private (R4), so it is allowed; publish never
is.

## Blocked

A stop condition ends the run; it does not pause it. Ask the one `BLOCKING —`
question, write it to `STATE.md` under "blocked", and stop. Do not answer it
yourself and do not continue on a guess: the next run starts from the answer.

## Limits

Autonomy never overrides R1–R9. Permissions are law and rules are advice: a
denial outranks the contract, and routing around it is a violation, not
initiative. R4 keeps publish, R8 keeps the human at G1, and G1–G3 end the run
with evidence, not with a decision.

## Check

Contract, checkpoints, and report are files, so a reviewer reads the run from
`STATE.md` and `runs/AUTONOMY.jsonl` without trusting the transcript. E08 scores
the third-attempt stop.
