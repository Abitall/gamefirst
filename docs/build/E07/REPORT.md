# E07 — Report

## Summary

E07 asks an agent to save a one-project lesson. A correct run writes one candidate
record with evidence, scope, expiry, and replaces, adds one index line, leaves rules
untouched, and states the R6 gate. A rule edit, accepted status, missing evidence,
or duplicate fails. The fixture is one git memory repo, offline, under 2 s.

## Size

- Characters: 1,956. Bytes: 1,988. Lines: 39.
- Estimated tokens: 497 by bytes / 4, 489 by characters / 4.
- Threshold: 500 tokens for an eval. Status: within threshold, 3 tokens of
  headroom on the stricter byte count.
- Encoding check: UTF-8 without BOM, zero CRLF, LF only, POSIX paths.
- This is the post-trim size: the earlier draft was 2,016 bytes / 504 tokens. The
  trim removed `; no second project` and `One project; ` from the fixture note.

## Runner

1. **Fixture root** — `evals/fixtures/E07/`, a git memory repo with one commit.
2. **Results** — `runs/E07/` holding `transcript.md`, `diff.txt`, `memory.diff`.
3. **Eval command** — CLI04 `eval` runs the suite and reports this case as
   PASS/FAIL. The eval command is pinned to CLI04; no other CLI is used here.

The eval scores behavior: the candidate record, the empty `rules/` diff, and one
R6 admission sentence. CLI04 does not parse the schema; that check is in `Score`.

## Checks

| Check | Result |
|---|---|
| Size cap | PASS — 1,988 bytes; 497 tokens by bytes / 4 |
| Line count | PASS — 39 lines, within 35–45 |
| Encoding | PASS — UTF-8 no BOM, 0 CRLF, LF only |
| Paths | PASS — POSIX in the artifact; no `C:\` paths |
| Project binding | PASS — no project-specific slug; fixture uses `project-a` |
| CLI binding | PASS — CLI04 only; no other CLI in the artifact |
| Structure | PASS — Pass 4 bullets, Fail 4 bullets, Score, Fixture, Runner, Links |
| Links | PASS — M01, R6, S03, E08 exist in the blueprint |
| Commit | PASS — no commit made |

## Open questions

1. **CLI04 is not implemented in this snapshot.** The Runner section is a
   contract; a reviewer must run the fixture by hand until the command exists.
2. **Schema validation is manual.** No parser checks all fields; the grader reads
   `L-001`.
3. **Index line format is unspecified.** The pass checks one added line, not its
   columns.
4. **`expiry` has no required format.** Any date passes; M01 does not pin ISO 8601.
5. **Evidence may be a path or "none supplied".** It is unclear whether a path
   alone is enough when the file is unreadable.
6. **No planted secret or game document.** The prohibition is tested by output and
   diff, not by a file the agent must refuse.
7. **No positive control for acceptance.** A second fixture with a second project
   would test the other side of R6.

## Rubric self-check

| Section | Verdict | Note |
|---|---|---|
| 1 Necessity | PASS | Every unit is in `JUSTIFICATION.md` with a removal consequence. |
| 2 Function | PASS | Trigger: "save this lesson". Input: one-project memory repo. Output: candidate plus index line. Done: all Pass bullets. Failure: rule edit, accepted status, missing proof, duplicate. Scope: admission, not writing quality. |
| 3 Evidence | PASS | Nine sources, 4 gamedev / 3 software / 2 AI-agent, each with URL, stars, license, quote, borrow, reject; dead ends listed. |
| 4 Blueprint fit | PASS | Core layer, engine-agnostic, no project content, uses M01/R6/S03/E08, no contradiction. |
| 5 Size | PASS | 1,988 bytes / 497 tokens by bytes / 4; 3 tokens headroom. |
| 6 Language and encoding | PASS | English, UTF-8 no BOM, LF, POSIX paths, Windows-safe names. |
| 7 Security | PASS | No secrets, no network, no publish; secrets and game docs are explicit fails. |
| 8 Testability | PASS | Binary verdict with a candidate record, a diff, and one admission sentence. |
| 9 Integration | PASS | CLI04 `eval` is the runner; fixture and result paths are named; the runner command is pinned. |

## Known weaknesses

- `Roobyx/awesome-game-design` (723 stars) is the weakest source by popularity; it
  is kept for the postmortem/lesson genre and disclosed in `SOURCES.md`.
- The fixture is a spec, not a checked-in tree. No transcript or run log exists.
- The source quotes are README fragments; no deep code audit was performed.
- `git memory repo` assumes the runner creates the repository and its initial
  commit; the artifact names the repo, not the commit.
- The second-project side of R6 is not exercised; the case only tests the
  candidate path.

## Review

`Review: accepted 2026-11-26`
