# prototype-crew

C01 buys one answer about the core loop with a throwaway build. It forms on a G0 brief, works one to two days, and disbands on its verdict; it never becomes a standing council.

## Trigger

The question is about fun, feel, or feasibility and no document settles it; the subject is the core loop, not content or polish. One crew per question, formed after G0 and before G1; G1 decides after three to five core-loop iterations and counts this one. A second question is a second crew.

## Members

- A01 partner leads: owns the clock, STATE.md, the gate line, the report; routes work, asks within budget (R2), keeps the crew on one question.
- A02 designer writes the question, the pass and kill criteria, and two or three alternatives before one is built (R7). No code.
- A03 engineer builds the scene, HUD, log, and capture; implements, never redesigns.
- A04 critic stays out: this stage diverges, and review comes after divergence closes (R7).

## Input

All five or no crew: a G0 brief; one question answered yes/no or by a number; one pass criterion and one kill criterion written before the build; a timebox of one to two days; a disposable build, no production code. The timebox is the R10 contract: goal, done, budget, stop, report.

## Work

1. A02 picks the cheapest way to decide the question from its alternatives and writes the knobs that could change the answer.
2. A03 builds the smallest playable scene (S08): greybox, debug HUD, `prototypes/<YYYY-MM-DD>-<slug>/runs.jsonl`, nothing that cannot change the answer. End of day one: something playable or the crew stops (R10).
3. A human plays 15-20 minutes; the crew watches silently, asks after (R8). No human, no verdict.
4. Capture 30-60 s and one log line per run; a claim without capture or log is not evidence (R1).
5. Verdict as a recommendation in one line with a date: keep, kill, or retune, with G1 owning the final call. Retune stays inside the timebox; a new question is a new crew.
6. Keep sends the mechanic to S09 gym: live knobs, 3-5 runs, then `lock` or `kill`. A kill is the recommendation the crew hands to G1 with its evidence.

## Output

`prototypes/<YYYY-MM-DD>-<slug>/REPORT.md`: question, criteria, alternatives, runs, capture path, verdict, next step. Only the report, log, and capture survive; the build is discarded. A01 updates STATE.md and BACKLOG.md; the crew disbands.

## Limits

No publish, push, or release (R4). No scope growth: anything that is not the question goes to BACKLOG. Time out means a verdict from what exists, not an extension (R9). A killed question returns only with new evidence (R1). Three runs blocked by one cause: stop and report (E08).
