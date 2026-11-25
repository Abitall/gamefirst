# C01 report

Part C01: the prototype crew. Artifact:
`staging/C01/artifact/library/game/crews/prototype-crew.md`.

## Size

| Measure | Value | Limit |
|---|---|---|
| Characters | 2673 | 2800 (700 x 4) |
| Tokens (characters / 4) | 668 | 700 |
| Lines | 36 | none |

Crew files are not in the rubric's size table, so 700 is a ceiling rather than a
target; 668 sits inside the 600-680 working band and needs no explanation. The
limit counts the whole file, including the title and blank lines.

## Checks

- Encoding: UTF-8 without BOM. ASCII only, so the file cannot be mis-decoded.
- Format: LF line endings, no tabs, no trailing spaces, no unfinished markers.
- Paths inside the file are POSIX; no Windows separator and no absolute path.
- Evidence path: the runs log is `prototypes/<YYYY-MM-DD>-<slug>/runs.jsonl`, in
  the same folder as the report, and it survives with it; the build does not.
  This closes the earlier question of where the log lives.
- References resolve: G0 and G1 (blueprint gates), S08 and S09 (skills), A01-A03
  (agents, A04 named as absent), R1, R2, R4, R7, R8, R9, R10 (rules from
  `docs/V0.3-BLUEPRINT.md`), E08 (line 208, stop after three).
- Layer: game layer only. No engine import, no engine API, no OS or editor
  assumption, no code block, and no shell command.
- Standalone: the crew loads without the blueprint, naming the IDs it needs and
  repeating none of the rules in full.

## Rubric

1. Necessity - pass. Each unit is argued in `JUSTIFICATION.md` with the failure
   it prevents; nothing duplicates S08, S09, or the rules, which are cited by ID.
2. Function - pass. Trigger, five inputs, six steps, one output path, a stop
   rule, and a disband condition; the failure mode is an entry check, not a
   paragraph of advice.
3. Evidence - pass. Nine repositories, four gamedev, three software, two
   AI-agent; every one popular and current at the date of reading, with URL,
   stars, license, a verbatim quote, and what was borrowed or rejected. Two were
   already cited in S08 and the reuse is disclosed in `SOURCES.md`; dead ends are
   listed rather than hidden.
4. Blueprint fit - pass. The part is the C01 row, the layer is game, the members
   are A01-A03, the gates are G0 and G1, the skills are S08 and S09, and the
   rules cited are the six the task names. Nothing contradicts the blueprint's
   non-goals: no standing council, no PASS/CONCERNS/FAIL form, no publish, no
   telemetry, no engine rules.
5. Size - pass. 668 of 700 tokens, inside the 600-680 working band; the path fix
   added 33 characters and stayed under the ceiling.
6. Language and encoding - pass. English artifact, UTF-8 without BOM, LF, POSIX.
7. Security - pass. The crew takes no credentials, runs no shell, and closes the
   publish path (R4) explicitly; the only external action is a human playtest.
8. Testability - pass. An entry checklist ("all five or no crew"), a pass and a
   kill criterion per question, a dated one-line verdict, a runs log under the
   prototype folder, a capture, and a stop rule after three blocked runs. A
   reviewer can check the report against the log without replaying the build.
9. Integration - pass. Names and paths match the blueprint; the crew cites the
   skills it calls and the agents it seats; no dependency on C02 or C03.

## Open questions

1. On a keep verdict the crew hands the mechanic to S09. Should S09 wait for G1,
   which owns keep/kill/retune, or start on the crew's recommendation? The file
   currently starts S09 on keep and leaves the gate line to the partner.
2. Is the day-one stop a checkpoint or a gate line? Today it is a stop with no
   report; a report at the stop would make the second day cheaper to cancel.
3. The playtest is one human and a silent crew. Is a second observer needed to
   timestamp events, or does the runs log cover it?
4. Two of the nine sources repeat S08 (godot-demo-projects, ncase/trust). They
   are used for different properties and disclosed, but a reviewer may ask for
   two fresh repositories.

Review: pending
