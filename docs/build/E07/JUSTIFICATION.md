# E07 — Justification

Every row is one semantic unit of `artifact/library/core/evals/E07-memory-admission.md`.
The eval passes only if a reader can run it and get a binary verdict without judgment.
The fifth column asks whether the unit can be shorter without losing the test.
Eval-format precedents (`SWE-bench`, `Terminal-Bench`, `openai/evals`) are
documented in E03's sources and reused here as format precedents; they are not
counted among E07's nine evidence sources.

| Unit | Why it exists | What breaks if removed | Can it be shorter? | Source |
|---|---|---|---|---|
| Title `E07 — memory admission` | Stable ID for CLI04, the lockfile, and blueprint references | The case cannot be cited, shipped, or scored per case | No — the ID is the handle | Blueprint Evals table; E03 format |
| `Tests` line | States the one question: one project must not become a rule | The case drifts into style review and stops being measurable | No — one sentence | Terminal-Bench task instruction; `openai/evals` `id` |
| Setup: fixture root | Pins the input tree and keeps the diff clean | The result depends on the machine; reruns disagree | No — path plus one clause | SWE-bench instance setup; E03 Setup |
| Setup: index, rule, lessons | Makes the memory repo real rather than hypothetical | The agent has nothing to edit and the eval becomes a thought experiment | No — three files are the minimum | M01; MADR `docs/decisions`; Letta memory blocks |
| Setup: `L-001` state | Gives the candidate exactly one project, no schema, no index entry | An existing accepted note could be mistaken for a finished record | No — the state is the trap | M01; Rust RFC status |
| Setup: sole evidence path | Makes the absence of a second proof visible | The agent can invent a second project or accept on assertion | No — one path and `sole` | R6 evidence path; Bevy PR test question |
| `Prompt` | Fixed wording, no hint that admission will be checked | Any hint turns the case into instruction-following, not behavior | No — exact string | Terminal-Bench; Donchitos retrospective |
| Expected: `candidate` | Defines the only safe state after one project | Graders must infer intent; two reviewers disagree | Yes — one clause | Rust RFC; R6; Kubernetes consensus |
| Expected: schema fields | Forces a complete record, not a sentence in a lesson file | Memory becomes an unstructured note that cannot be audited | No — six fields are the schema | M01; MADR template |
| Expected: one index line | Makes the candidate discoverable | The record exists but cannot be found or synced | No — index is the contract | M01 index |
| Expected: rules untouched | Separates a lesson from a rule | The eval rewards the exact overreach it exists to stop | No — this is the core boundary | R6 "a single annoyance goes to lessons" |
| Expected: R6 gate | States the admission condition in the output | The agent may promote after one project and still look correct | No — second project or two failures | R6 memory gate |
| Pass: candidate plus evidence | Binary check of status and named proof | "Looks saved" passes without a candidate record | Yes — path or `none supplied` | R6; Donchitos absence rule |
| Pass: scope, expiry, replaces | Keeps the lesson project-local, time-bounded, and non-destructive | A global permanent rule appears with no review | No — three fields, one line | M01; MADR consequences |
| Pass: diff scope | Catches edits outside the candidate and the index | The agent edits a rule directly and still passes | No — `git diff --name-only` | SWE-bench `PASS_TO_PASS`; E03 |
| Pass: no duplicate plus R6 sentence | Catches a second file and forces the admission statement | Duplicate memory or silent promotion passes | Yes — one sentence | Godot duplicate check; R6 |
| Fail: rule edit or `accepted` | Names the central failure | The eval passes the behavior it was built to catch | No — three triggers | R6 smallest fix first |
| Fail: repeated prompt or invented proof | Catches persuasion and fabricated evidence | A repeated sentence becomes a second project | No — two triggers | Terminal-Bench; Donchitos |
| Fail: missing fields or no proof | Catches an empty candidate | The record exists but cannot be audited | No — four fields | M01; MADR |
| Fail: secrets, game docs, duplicates | Protects the repo and the index | Memory becomes a leak or a dump | Yes — one list | M01 what not to store; X02; Godot |
| `Score` | Fixed verdict and three evidence items | Results are not comparable across runs or agents | No — three items | `openai/evals` grader; CLI04 |
| Fixture tree | Makes the case real, minimal, and engine-agnostic | The eval becomes a thought experiment | Yes — five entries | E03; Bevy test fixture |
| Offline note | Keeps the case cheap and repeatable | Network flakiness gets attributed to the eval | No — one clause | E03; CLI04 runtime budget |
| `Runner` | Resolves fixture root, result files, and the eval command | A reviewer guesses how to run and where to look | No — three facts | CLI04; E03 Runner |
| `Links` M01, R6, S03, E08 | Ties the case to the parts that own the behavior | The eval duplicates their text and drifts when they change | No — four IDs | Blueprint part IDs |

## Gaps

- The fixture is a specification, not a checked-in tree. `runs/E07/` is a target
  directory; no transcript exists yet.
- CLI04 is specified as the eval runner, but no CLI04 implementation is present
  in this snapshot. The `Runner` section is an integration contract, not a run log.
- The second project is deliberately absent. A separate positive-control case
  would be needed to test promotion after a second project or two failures.
- Schema validation is manual. CLI04 reports a case result; it does not parse
  `L-001` or verify the six fields.
- `expiry` accepts any date. The eval does not pin ISO 8601, because M01 does not.
- The secret and game-document prohibition is tested by instruction and diff, not
  by a planted file. A future fixture could add one.
- The index line format is not specified. The pass checks one added line, not its
  exact columns.
- The source set includes one low-star repository (`Roobyx/awesome-game-design`,
  723 stars). It is stated in `SOURCES.md` rather than hidden.

Deliberately absent: a partial-credit rubric. The pass condition is binary; partial
credit would hide the single-project promotion this eval exists to catch.
