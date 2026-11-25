# R6 — Sources

Nine repositories, four from game development, three from software development
and two from AI-agent workflow. Star counts were read on 2026-11-25; the GitHub
REST API was rate-limited (HTTP 403), so counts come from the shields.io stars
endpoint and the `"stargazerCount"` field in GitHub's HTML. Figures with a `k`
are rounded by the badge; the two large exact figures are the integer from the
HTML. Quotes are verbatim from the file named. Nothing was copied: each borrowed
idea is restated in R6's own wording, and the rule's structure comes from the
blueprint, not from any of these projects.

## Game development

### 1. godotengine/godot-proposals

- URL: https://github.com/godotengine/godot-proposals
- Stars (2026-11-25): 1.5k
- Artifact: `README.md` (master)
- Quote: "Search existing proposals and ideas for potential duplicates. And search the internet and asset library for addons that can solve your problem without an engine change." / "If you do not provide a well-founded motivation, your proposal will be closed." / "Use one issue per proposal. Do not cram multiple feature requests into a single proposal"
- Analogous to: R6's admission gate — a proposal needs a reason, and the first move is to look for something that already exists.
- Borrowed: prior art before a new part (rung 1 and S01); motivation as the admission ticket; one part per concern.
- Rejected: the ban on AI-written proposals, and the community evaluation queue. Both assume a public contribution process; R6 governs a private library with one reader.

### 2. SFML/SFML

- URL: https://github.com/SFML/SFML
- Stars (2026-11-25): 12k
- Artifact: https://www.sfml-dev.org/contribute.php (linked from `CONTRIBUTING.md`)
- Quote: "Contributions must fit into one of the following SFML modules: System Window Graphics Audio Network" / "The API should be focused and of high quality. Instead of implementing a lot of features that are possible and sometimes even simple to implement, we consider it important that people have a clear view of what this library provides." / "Many features can be added as an extension."
- Analogous to: the "smallest fix first" ladder — the core stays small, and most wishes belong outside it.
- Borrowed: scope as a filter for every addition; "extension over core" as the model for a fix that lives in a project file instead of the library.
- Rejected: the fixed module list, which is engine-specific, and the detailed API rules.

### 3. raysan5/raylib

- URL: https://github.com/raysan5/raylib
- Stars (2026-11-25): 36k
- Artifact: `CONTRIBUTING.md` (master)
- Quote: "raylib is **SIMPLE** and **EASY-TO-USE**, I tried to keep it compact with a small set of functions, if a function is too complex, better not including it."
- Analogous to: R6's cost argument — compactness is stated as a quality, and complexity is a reason to refuse.
- Borrowed: small size treated as a feature in its own right; "too complex" as a legitimate reason to reject rather than to simplify forever.
- Rejected: the coding-style rules and the note on AI-generated code, which belong to other parts.

### 4. defold/defold

- URL: https://github.com/defold/defold
- Stars (2026-11-25): 6.5k
- Artifact: `CONTRIBUTING.md` (dev)
- Quote: "New functionality must be well designed and useful to not only your own project." / "there is always the option to create a native extension and share it via the Asset Portal if the functionality is specific to a certain type of project or in other ways not suitable for inclusion in the engine" / "We will not be able to consider a new Feature Request until all required fields are filled in." / "Never submit more than one Feature Request in a single GitHub issue." / "The Feature Design should discuss the pros and cons of different solutions and it should document why a decision is made"
- Analogous to: the five required items and the "fix it outside the library" rung.
- Borrowed: required fields as a precondition, not a formality; extension instead of core change; a written comparison of solutions before choosing.
- Rejected: the CI and DCO requirements, which do not apply to a document library.

## Software development

### 5. kubernetes/enhancements

- URL: https://github.com/kubernetes/enhancements
- Stars (2026-11-25): 4k
- Artifact: `README.md` (master)
- Quote: "It is unlikely an enhancement if it is: implemented using a CustomResourceDefinition; fixing a flaky test; refactoring code; performance improvements...; adding error messages or events" / "Once users adopt an enhancement, they expect to use it for an extended period of time. Therefore, we hold new enhancements to a high standard"
- Analogous to: R6's "a single annoyance is a note, not a part", and the permanence argument.
- Borrowed: the explicit list of things that are not enhancements; the idea that admission is expensive because the result stays.
- Rejected: the alpha/beta/GA maturity ladder and the SIG review process. Both need a large organisation to be worth their cost.

### 6. rust-lang/rfcs

- URL: https://github.com/rust-lang/rfcs
- Stars (2026-11-25): 6.6k
- Artifact: `0000-template.md` (master)
- Quote: "Any changes to Rust should focus on solving a problem that users of Rust are having." / "## Drawbacks ... Why should we *not* do this?" / "What is the impact of not doing this?" / "If this is a language proposal, could this be done in a library or macro instead?"
- Analogous to: R6's proof requirement and its smallest-alternative question.
- Borrowed: the motivation must be a real problem; the section on what goes wrong if the change is made; the question of whether something smaller already does the job.
- Rejected: the full RFC section set (guide-level explanation, reference-level explanation, prior art essay). R6 is a gate, not a proposal form.

### 7. django/django

- URL: https://github.com/django/django
- Stars (2026-11-25): 92k
- Artifact: `docs/internals/release-process.txt` (main)
- Quote: "A feature release may deprecate certain features from previous releases... Deprecated features will be removed in the ``B.0`` release, or ``B.1`` for features deprecated in the last ``A.x`` feature release to ensure deprecations are done over at least 2 feature releases."
- Analogous to: R6's removal path — unused parts leave on a schedule, not on a mood.
- Borrowed: removal is planned, not accidental; a stated window between deciding and deleting.
- Rejected: the two-release deprecation window itself and the `RemovedInDjangoXXWarning` machinery. R6 removes in one commit because a copied file has no outside users, and a window would only postpone the decision.

## AI-agent workflow

### 8. obra/superpowers

- URL: https://github.com/obra/superpowers
- Stars (2026-11-25): 326,368
- Artifact: `skills/writing-skills/SKILL.md` (main)
- Quote: "**Core principle:** If you didn't watch an agent fail without the skill, you don't know if the skill teaches the right thing." / "**Skills are NOT:** Narratives about how you solved a problem once" / "Write test cases (pressure scenarios with subagents), watch them fail (baseline behavior), write the skill"
- Analogous to: R6's admission rule — a skill is written after an observed failure, never before.
- Borrowed: watch it fail first; a failing check is the evidence that the part is needed; a narrative about one success is not a part.
- Rejected: the subagent pressure-scenario harness and the full test-first ceremony. Both need infrastructure that a document library does not have, and a project fixture gives the same proof for less.

### 9. humanlayer/12-factor-agents

- URL: https://github.com/humanlayer/12-factor-agents
- Stars (2026-11-25): 27,419
- Artifact: `content/factor-10-small-focused-agents.md` (main)
- Quote: "Rather than building monolithic agents that try to do everything, build small, focused agents that do one thing well." / "**Manageable Context**: Smaller context windows mean better LLM performance"
- Analogous to: R6's cost-per-task argument and its "one part, one concern" rule.
- Borrowed: small focused units over one large one; context as a budget that every part spends.
- Rejected: the orchestration and DAG advice, which is about running many agents, not about what enters a library.

## Considered, not counted

| Repository | Stars (2026-11-25) | Why it is not one of the nine |
|---|---|---|
| anthropics/skills | 200,337 | Repeats superpowers' lesson (a skill is a tested procedure). Counting both would give the AI-agent group two sources for one idea. |
| python/peps | 5k | A real process, but its admission text is thin next to rust-lang/rfcs. One language-process source is enough for the group. |
| bevyengine/bevy | 50k | Popular, but `CONTRIBUTING.md` is a 261-character stub that points elsewhere; there is no admission artifact to read. |
| bevyengine/rfcs | 116 | Has the right artifact, but 116 stars does not meet the "current and used" bar set for the other eight. |

## Dead ends encountered

- The GitHub REST API returned HTTP 403 (rate limit) for every repository. Counts were taken from the shields.io stars endpoint and the `stargazerCount` field in the HTML instead, which agree with each other where both were read.
- `photonstorm/phaser` `CONTRIBUTING.md` returned 404 on both `master` and `main`.
- `libgdx/libgdx`, `4ian/GDevelop`, `cocos/cocos-engine` and `pixijs/pixijs` (`dev/CONTRIBUTING.md`) all returned 404 for their contribution files.
- `Anuken/Mindustry` has no admission artifact; its contribution notes only ask that you run the game before reporting.
- `OpenRA/OpenRA` `CONTRIBUTING.md` describes workflow but contains no rule about when a feature is accepted.
- `o3de/o3de` `CONTRIBUTING.md` is an 890-character pointer to a separate organisation repository.
- One SFML sentence about a "rule of thumb" was truncated mid-line by the page extraction, so it is not quoted here; only the complete sentences above are used.
