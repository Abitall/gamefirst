# G1 — Fun

## Trigger

After 3–5 core-loop iterations, a loop day, and a playtest (S08, S09). G1 judges a playable loop, not the game, and answers one question: does this loop hold?

## Input

Four artifacts:

- a build that runs and reaches the loop;
- a playtest note (D07) with the human's verbatim quotes;
- a capture of that build being played;
- success criteria written before the build.

A document, trailer, agent opinion, or feature list does not open G1 (R8). If any one artifact is missing, G1 does not run.

## Checks

- The loop runs end to end: input → action → feedback → challenge → reward → repeat; no step is a placeholder.
- At least one human played for 15–20 minutes; the note quotes them instead of summarising.
- Fun was observed or honestly absent; boring and broken are findings (E09).
- Note, capture, and build are the same session; the capture shows the loop, not a menu or a scripted scene.
- One question is answered; claims cite an artifact (R1), and a promise is not a result.
- Questions stay inside the gate budget, each with a recommendation (R2).

## Decision

The human decides; A01 records one dated line in `STATE.md` and the D03 entry in `DECISIONS.md`.

- **keep** — the loop holds; proceed to the slice (S10).
- **kill** — nothing is there; stop, or return to G0 with the evidence. A kill is a result (R7).
- **retune** — the loop works, its tuning does not; change and re-run G1 inside the budget (R9).
- **extend once** — something is there but illegible; one dated extension (R7), then keep or kill.

## Out of scope

G1 does not judge the slice, content counts, polish, or release: those belong to G2, S10–S13, G3.

## Cross-refs

S08, S09, R1, R2, R7, R8, R9, E09, G2.
