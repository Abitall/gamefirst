# R1 — Sources

Nine repositories with an artifact analogous to "a claim is only as good as the
run that backs it": four gamedev, three software, two AI-agent.

Star counts were read from the GitHub API on 2026-11-25. Quotes are verbatim from
the linked artifact, shortened with `…` where needed. Nothing was copied: no
code, no license text, no paragraph transplanted.

## Gamedev (4)

### 1. bevyengine/bevy — ~50k stars

- URL: https://github.com/bevyengine/bevy
- Artifact: contribution guide, "Opening Pull Requests" —
  https://bevy.org/learn/contribute/helping-out/opening-pull-requests/
- Quote: "Once they're content with the pull request (design, code quality,
  documentation, tests), individual reviewers leave 'Approved' reviews. After
  consensus has been reached … and CI passes, the `S-Ready-For-Final-Review`
  label is added."
- Analogous to: a merge gate that cannot be talked past — tests and CI are
  preconditions, not review notes.
- Borrowed: the ordering "review consensus, then CI, then merge"; the idea that a
  reviewer signs off on tests as one of four named criteria.
- Rejected: the label workflow (`S-*` labels, final-review queue). It is
  maintainer logistics for a 50k-star project, not a rule for a solo developer.

### 2. godotengine/godot — ~121k stars

- URL: https://github.com/godotengine/godot
- Artifact: bug report issue form, `.github/ISSUE_TEMPLATE/bug_report.yml`.
- Quote: "Having an MRP is very important for contributors to be able to
  reproduce the bug in the same way that you are experiencing it. When testing a
  potential fix for the issue, contributors will use the MRP to validate that the
  fix is working as intended." The `Tested versions` field is `required: true`.
- Analogous to: an unfalsifiable report is not accepted; the reporter must ship
  the artifact that reproduces the problem, and the fix is validated against that
  same artifact.
- Borrowed: "the artifact is the shared object between claim and check" — the
  same file proves the bug and proves the fix.
- Rejected: the MRP archive format and the regression-hunting instructions
  (bisecting dev snapshots). Too heavy for a solo project.

### 3. Anuken/Mindustry — ~30k stars

- URL: https://github.com/Anuken/Mindustry
- Artifact: `CONTRIBUTING.md` (repo root).
- Quote: "**Always test your changes.** Do not submit something without at least
  running the game to see if it compiles. If you are submitting a new block, make
  sure it has a name and description, and that it works correctly in-game."
- Analogous to: the closest thing in gamedev to R1's literal sentence — running
  the game is the floor, not the ceiling.
- Borrowed: "at least running the game" as the minimum bar, and the
  content-specific clause (a new block must be checked in-game, not in data).
- Rejected: the single-maintainer merge policy and the AI-contribution policy;
  both are project governance, out of scope for a rule.

### 4. raysan5/raylib — ~36k stars

- URL: https://github.com/raysan5/raylib
- Artifact: `examples/README.md` — "EXAMPLES COLLECTION [TOTAL: 223]", each entry
  linking a `.c` file and a screenshot; `zig build [example]` "compile _and run_
  a particular example".
- Analogous to: a feature is proven by a small program that runs, is listed, and
  can be run by anyone; the index is the inventory of what actually works.
- Borrowed: the artifact-per-feature habit and the counted index ("223") as a
  content-count pattern.
- Rejected: the two-toolchain build matrix and the per-example metadata table
  (difficulty, version created) — documentation cost with no verification value.

## Software (3)

### 5. django/django — ~92k stars

- URL: https://github.com/django/django
- Artifact:
  `docs/internals/contributing/writing-code/submitting-patches.txt`,
  "Contribution style".
- Quote: "A good fix should also include a regression test … to validate the
  behavior that has been fixed and to prevent the problem from arising again."
  A feature or behavior change "should also contain documentation".
- Analogous to: a definition of done expressed as a list of required attachments
  to the change, with the test named first.
- Borrowed: the regression-test requirement as the default artifact for a code
  claim, and the pairing of test-then-docs.
- Rejected: the ticket-claiming process and the Trac `.diff` attachment rules —
  process archaeology, not a proof standard.

### 6. ossf/scorecard — ~5.9k stars

- URL: https://github.com/ossf/scorecard
- Artifact: `docs/checks.md`, check `CI-Tests`.
- Quote: "This check tries to determine if the project runs tests before pull
  requests are merged. … This check only considers tests which run successfully."
- Analogous to: verification automated into a score, where "tests exist" is not
  the signal — "tests ran and passed" is.
- Borrowed: the distinction between the presence of a check and a successful run;
  this is the mechanism behind R1's "zero tests is not a pass".
- Rejected: the 0–10 risk scoring and the supply-chain threat model. Different
  question, and a score invites gaming.

### 7. kubernetes/community — ~13k stars

- URL: https://github.com/kubernetes/community
- Artifact: `contributors/guide/pull-requests.md`, "Run Local Verifications".
- Quote: "You can run these local verifications before you submit your pull
  request to predict the pass or fail of continuous integration. * Run and pass
  `make verify`".
- Analogous to: one named command that reproduces the remote gate locally, so the
  author learns the verdict before asking anyone to look.
- Borrowed: `verify` as a single default entry point, and the framing "predict
  the gate" rather than "hope the gate passes".
- Rejected: OWNERS files, `/lgtm` and `/approve` labels, e2e cluster
  requirements. Multi-team machinery.

## AI-agent workflow (2)

### 8. Aider-AI/aider — ~50k stars

- URL: https://github.com/Aider-AI/aider
- Artifact: "Linting and testing" — https://aider.chat/docs/usage/lint-test.html
- Quote: "You can configure aider to run your test suite after each time the AI
  edits your code using the `--test-cmd test-command` and `--auto-test` switch."
  "Aider will try and fix any errors if the command returns a non-zero exit code."
- Analogous to: the agent's own output is not the verdict; an external command's
  exit code is. Failure is fed back as input instead of being reported as success.
- Borrowed: the exit-code-as-verdict pattern and the retry-with-error-text loop
  (bounded elsewhere by E08).
- Rejected: per-edit automatic invocation. Running the full suite after every
  edit is too slow for a game loop; R1 asks for a run at the claim, not per edit.

### 9. princeton-nlp/SWE-bench — ~6.2k stars

- URL: https://github.com/princeton-nlp/SWE-bench
- Artifact: `swebench/harness/grading.py`, `get_resolution_status` and the
  `SUITE_RAN` guard.
- Quote: `get_resolution_status` returns FULL only when "fail-to-pass
  (Resolution) = 1 and pass-to-pass (Maintenance) = 1". The guard exists as
  "Evidence that a test runner actually executed, used to tell 'ran with no
  failures' apart from 'never ran'", because "a zero count read as evidence turns
  a suite that never ran into a resolved instance".
- Analogous to: a task is done only if the new check passes **and** the old checks
  still pass — and the harness separately proves the suite ran at all.
- Borrowed: the two-sided artifact (new behavior proven, old behavior intact) and,
  most importantly, the zero-test guard that R1 states as "a suite that ran zero
  tests is not a pass".
- Rejected: the benchmark instance format, the Docker harness, and the
  leaderboard framing. It measures models, not a developer's work.

## Considered, not counted

| Repository | Stars | Why not counted |
|---|---|---|
| google/eng-practices | ~23k | Good artifact ("review the code, not the description"), but last pushed 2024-09; the 2025–2026 currency preference and Bevy already cover the review gate. |
| SWE-agent/SWE-agent | ~21k | Runs the SWE-bench harness; the definition of "resolved" lives in SWE-bench, so counting both would double-count one idea. |
| OpenRA/OpenRA | ~18k | Strong playtest-channel discipline, but it verifies fun, which R8 owns; counting it would pull R1 into R8's territory. |
| openai/codex | ~136k | Largest agent repo, but no verification-rule artifact to cite — its docs describe usage, not a done standard. |
| actions/starter-workflows | ~12k | CI templates without rule text; the gate is implicit in YAML, not stated. |

## Dead ends encountered

- `bevyengine/bevy/CONTRIBUTING.md` is now a 261-character stub pointing to
  `bevy.org`; the substantive guide was read on the site instead.
- `Anuken/Mindustry/.github/CONTRIBUTING.md` returns HTTP 404; the file is at the
  repo root.
- `raysan5/raylib/.github/workflows/cmake.yml` returns HTTP 404, so raylib is
  cited for its examples index only — no claim is made about its CI.
- The GitHub REST API returned HTTP 403 (rate limit) partway through; the
  remaining artifacts were read from `raw.githubusercontent.com`.
