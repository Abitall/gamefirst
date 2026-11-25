# S02 verify — Justification

Every semantic unit of `artifact/library/core/skills/verify/SKILL.md` is listed
below. Sources are the nine repositories in `SOURCES.md` or a blueprint ID.
"Breaks if removed" means the observable failure, not a style preference.

| # | Unit | Why it exists | Breaks if removed | Source |
|---|---|---|---|---|
| 1 | Frontmatter `name: verify` | Stable ID for `/verify`, CLI03 and lockfile references | The skill cannot be addressed by SL04 or `sync-agent` | Blueprint S02, SL04 |
| 2 | Frontmatter `description` | The only text the harness uses to decide when to load the skill | The agent does not load `verify` before claiming done; E03 fails silently | Blueprint S02 |
| 3 | Frontmatter `allowed-tools` | Verification must not edit code or publish | The agent "fixes" a failing check mid-run or pushes | R4, X02 |
| 4 | Intro line (CLI03, `/verify`, R1/E03) | Locates the procedure and names the owner of the obligation without restating it | The skill duplicates R1/E03 text and drifts from them | R1, E03, CLI03 |
| 5 | Trigger: about to say done/fixed/works | The highest-risk moment for an unverified claim | "Done" is claimed from memory; E03 becomes decorative | E03, SWE-bench |
| 6 | Trigger: gate or freeze, behavior-changing commit | Gates and commits are irreversible checkpoints | A gate decision or a commit rests on an unverified build | G1–G3, pre-commit |
| 7 | Trigger: after a fix, same claim | A fix is a new claim and needs its own evidence | A fix is declared without showing the failure is gone | E08, SWE-bench |
| 8 | Input: project root | Commands and artifact paths are relative to it | Checks run in the wrong directory; artifacts scatter | pre-commit |
| 9 | Input: one typed claim | The claim type selects the required checks | A UI change passes on unit tests alone; coverage looks complete | Task brief, G2 DoD |
| 10 | Input: changed files | Scope of the run; ties evidence to the diff | Checks unrelated to the change pass while the change is untested | Danger |
| 11 | Input: `verify` recipe from pack or `project.config.json`; never invent a command | This is what keeps the skill engine-agnostic | Commands get hardcoded per engine; core violates the layer rule | N00, godot-ci, unity-builder |
| 12 | Step 1: resolve recipe, FAIL when missing | Converts a missing capability into a named, fixable failure | The agent guesses commands or silently skips checks | pre-commit |
| 13 | Step 2: open `evidence/<date>-<claim>/` | Gives every artifact one address and one owner | Evidence is unfindable; the report cannot link it | SWE-bench `log_dir`, Gut |
| 14 | Step 3: select checks, never drop `required` | Prevents a partial run from looking complete | Required checks are skipped when they are slow or red | golangci-lint config |
| 15 | Step 4: run, capture log, PASS = exit 0 + non-empty artifact | Removes judgement from the pass condition | A green log with no artifact, or an artifact from a stale run, counts as proof | unity-builder, golangci-lint, Gut |
| 16 | Step 5: visual claim needs a capture, wrong screen = FAIL | Visual claims cannot be proven by prose | "The animation looks right" is accepted without an image | OpenHands, CLI10 |
| 17 | Step 6: fun claim needs a playtest note | Fun is the one claim tests cannot settle | A chat impression is filed as playtest evidence | R8, G1, D07 |
| 18 | Step 7: write `REPORT.md`, print the table | Makes the verdict auditable after the session ends | The next agent or reviewer cannot reconstruct what ran | SWE-bench report |
| 19 | Claim table (5 rows) | Fixes the minimum check set per claim type | Check sets are invented per run; "content" and "release" claims under-test | G2 DoD, S11, S13, wesnoth |
| 20 | Recipe entry `{ cmd, required, artifact }` | The interface between CLI03, the pack and this skill | Tool and skill disagree on field names; the recipe cannot be implemented | N00 |
| 21 | Output table + overall verdict + smallest next action | One shape for humans and tools; FAIL must be actionable | Verdicts vary in form; a failure leaves no next step | SWE-bench report, golangci-lint |
| 22 | Failure: 3 attempts, then escalate with error, tried, reproduction | Stops retry loops and preserves the evidence trail | The agent burns the budget looping on the same error | E08 |
| 23 | Failure: never weaken, skip, re-run green, or pass without artifact | Closes the cheap routes to a fake PASS | Tests are deleted or muted to reach "done" | pre-commit (`files_modified` fails), R1 |
| 24 | Failure: missing tool or credential = FAIL, named | Distinguishes "not verified" from "verified" | A missing dependency is recorded as a pass | pre-commit |
| 25 | Out of scope: fixing, tests, publishing, fun | Keeps `verify` a reporting step | The verifier edits code to make its own check pass | A03, R4 |

## Deliberate omissions

- No command examples from a real engine: any concrete command would hardcode an
  engine into core.
- No rule text from R1/E03: IDs only, per the "one fact in one place" rule.
- No CI YAML: the skill describes the procedure; the pipeline is CLI03's job.
