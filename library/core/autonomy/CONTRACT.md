# X01 — Autonomy contract

An autonomous run starts only when `Mode: autonomous` and a block signed by a
human agree, in `STATE.md` under `## Autonomy`. R10 owns the ten fields; A01
drafts the block and routes the run; this file is the block and its line formats.

## Block

```md
- goal: <one measurable sentence: what exists when the run ends>
- constraints: <paths in scope>; no publish, no secret, no destructive command, no design change
- done: <artifact path>; verify pass; <evidence path>
- allowed: <tools and exact commands>
- stop: <gate>, <ambiguity>, <irreversible action>, third failed attempt, budget, <missing input>
- budget: max_files <n>, max_tokens <n>, max_minutes <n>, attempts_per_problem 3
- checkpoints: every <30-60> min and at <gate>
- log: runs/AUTONOMY.jsonl
- report: runs/AUTONOMY-report.md
- escalation: one BLOCKING — question with options and one recommendation
approved: <YYYY-MM-DD> — <name>
```

## Signature

A01 drafts; the human writes the last line. The block is then read-only for the
agent: no budget raised, no path added, no `done` moved. A run that finds `Mode: autonomous`
without a signature stops before acting and asks once (R2). The signature is
re-read at every checkpoint, so removing or editing it stops the run there. A new
signature starts a new run with fresh counters; the log continues. An answer to a
`BLOCKING —` question that changes a field needs a new signature; an answer that
leaves every field intact does not.

## Formats

- Paths are POSIX from the repo root, globs as `src/**`. `constraints` is the only
  path list; `allowed` adds commands and tools. A command not in `allowed`, or a
  path outside `constraints`, is refused (R10); no listed command may write
  outside it.
- `log`: one JSON object per line, append-only, never rewritten; a record at the
  start, at each checkpoint, at each stop, and for the report:
  `{"t":"2026-11-25T14:05Z","action":"added input mapping","files":["src/input.ts"],"result":"verify pass","decision":"continue","next":"wire pause"}`
  `t` is ISO-8601 UTC; `decision` is `continue`, `stop`, or `blocked`; `files`
  lists every path the action wrote, so the count is checkable.
- `report`: four headings — `Changed`, `Evidence`, `Open`, `Next`. `Evidence`
  opens with the `verify` result — pass, fail, or `not verified` — then a path per
  claim; `Open` is what the next run must know, not a question (R2). One line per
  item, one page, overwritten by each run; the log keeps the history.
- `BLOCKING —`: one question, two or three options, one recommendation, then
  stop. `BLOCKING — placeholder input or wire it? Options: a) placeholder, b)
  wire. Recommend: b because the goal names input.` It goes under `## Blocked`
  in `STATE.md`; the run does not answer it.

## Counting

- `max_files` counts distinct paths created, edited, or deleted; the block,
  `STATE.md`, the log, and the report do not count.
- `max_tokens` is the harness total, input and output, read at each checkpoint;
  `max_minutes` is wall clock from the first action.
- A resumed run continues the same counters, taken from the last record, and logs
  the totals it starts from.
- At a limit the run stops before the next action; the closing writes —
  checkpoint, report, and their log lines — are still allowed, nothing else.

## Ending

`done` is the exit, not the plan: a run that proves `done` stops even with work
left in its plan, and an exhausted plan without `done` is a failed run. A `done`
already true at the start is proven and ends the run; no work is invented.
`verify` is the recipe in `project.config.json`, not a command the run picks; a
recipe that cannot run is missing input, not a pass. The run may not edit the check it is
judged by: a test, the verify recipe, or the script behind it. Every run ends
with the report and a last log record, met or blocked.

## Isolation

Work in a worktree or scratch branch `run/<YYYY-MM-DD>`; commit there; a commit is
not a publish. Every subagent, tool, and script the run starts works under the
same block; delegating never widens `allowed`. A gate ends the run with its
evidence written; the gate line and the decision wait for the human (R8, A01).
The block sits under R1–R9 and permissions (X02); permissions are law, so a
denial outranks it; R4 owns publish, R8 owns the human at G1.

## Check

A reviewer reads `STATE.md` and the log, not the transcript: ten keys, no `<...>`
left, a signature in the block; six keys per log line with a valid `decision`;
four headings in the report; every `Evidence` path opens. E03 scores `done`; E08
scores the third-attempt stop.
