# SOURCES — S08 `prototype`

Nine public repositories, read on 2026-11-25. Stars are the figure shown on the
GitHub repository page that day (GitHub rounds to one decimal above 1k). Licenses
are the repository's declared license. "Borrow" entries are structural ideas
rewritten for gamefirst; no text, code, or template is copied.

Split: 4 gamedev, 3 software-development, 2 AI-agent workflow.

## Table

| # | Kind | Repository | URL | Stars | License | Analogous artifact |
|---|---|---|---|---|---|---|
| 1 | gamedev | godotengine/godot-demo-projects | https://github.com/godotengine/godot-demo-projects | 9.8k | MIT | `2d/dodge_the_creeps/`: the smallest complete playable loop, one self-contained project per demo |
| 2 | gamedev | phaserjs/examples | https://github.com/phaserjs/examples | 1.7k | MIT | One small scene per API question, browsable and disposable |
| 3 | gamedev | increpare/PuzzleScript | https://github.com/increpare/PuzzleScript | 1.1k | MIT | A rule set as the whole prototype; play and rewrite rules immediately |
| 4 | gamedev | ncase/trust | https://github.com/ncase/trust | 6.4k | CC0-1.0 | A playable piece built to answer one question about behaviour, with observation inside it |
| 5 | software | github/scientist | https://github.com/github/scientist | 7.8k | MIT | A controlled experiment: declared control and candidate, measured comparison, mismatch signal |
| 6 | software | kubernetes/enhancements | https://github.com/kubernetes/enhancements | 4.0k | Apache-2.0 | KEP template: goals, non-goals, graduation criteria, drawbacks, alternatives, implementation history |
| 7 | software | rust-lang/rfcs | https://github.com/rust-lang/rfcs | 6.6k | MIT OR Apache-2.0 | `0000-template.md`, with an explicit "Unresolved questions" section before acceptance |
| 8 | AI-agent | openai/evals | https://github.com/openai/evals | 19.8k | MIT | One eval = one behaviour, with the metric declared in the registry entry before any run |
| 9 | AI-agent | Aider-AI/aider | https://github.com/Aider-AI/aider | 50.3k | Apache-2.0 | `benchmark/`: fixed harness, dated run folder per attempt, generated stats report, tests as pass/fail |

## Borrow and reject, per source

### 1. godotengine/godot-demo-projects (gamedev, 9.8k, MIT)

The `2d/dodge_the_creeps/README.md` describes "a simple game where your character
must move and avoid the enemies for as long as possible" and marks the project as
the finished version of the "Your first 2D game" tutorial. Each demo is a folder
that runs on its own; assets carry their own licenses (CC-BY, CC0, font licenses)
separately from the code.

- **Borrow**: one self-contained project per question; the smallest complete loop
  as the unit of proof; runnable without the rest of the repository.
- **Reject**: the curated demo catalogue as a model for production structure, the
  finished art and audio, and the tutorial framing. A prototype's folder count is
  one, and its art is rectangles.
- **Dead end**: treating demo quality as the bar. These are showcase builds; a
  prototype that looks like one has already spent its timebox on the wrong thing.

### 2. phaserjs/examples (gamedev, 1.7k, MIT)

The repository is "Phaser 4 Examples", browsable at labs.phaser.io; a local clone
runs with `npm start`. Examples are small and each answers one API question.

- **Borrow**: one scene answers one question, and the scene is disposable once the
  question is settled; a single build command for the whole set.
- **Reject**: engine-specific code as the template, the example browser, and the
  breadth of the catalogue. gamefirst prototypes are engine-pack based, not copied
  from an example index.
- **Dead end**: mining examples for implementation instead of using the engine pack
  (N00); it produces code that answers someone else's question.

### 3. increpare/PuzzleScript (gamedev, 1.1k, MIT)

"Open Source HTML5 Puzzle Game Engine", playable at puzzlescript.net with docs at
puzzlescript.net/Documentation. The rule set is the artifact; the engine is fixed.

- **Borrow**: rules-first iteration, where changing the rules and replaying is one
  short action, and the prototype is the rule set rather than a product around it.
- **Reject**: the web editor, the engine, and the puzzle-game constraint. Also the
  idea that the prototype must be a complete game.
- **Dead end**: polishing the rule editor; it is infrastructure, not an answer.

### 4. ncase/trust (gamedev, 6.4k, CC0-1.0)

"The Evolution of Trust is dedicated to the public domain." The piece is a single
interactive argument about trust and game theory; the observation (what the player
does) is built into the playable artifact. Assets are licensed individually (CC0,
CC Sampling+, CC BY-NC).

- **Borrow**: one playable piece built to answer one question; observation embedded
  in the artifact rather than collected afterwards.
- **Reject**: finished narrative and visual polish, the public-domain release model,
  and mixed per-asset licensing. gamefirst prototypes use placeholders only.
- **Dead end**: the polished single-question essay-game as the target form; it takes
  weeks, not two days.

### 5. github/scientist (software, 7.8k, MIT)

A Ruby library for refactoring critical paths: `experiment.use` declares the
control, `experiment.try` the candidate, `experiment.run` randomizes execution
order, measures duration, compares results, publishes observations, and records
exceptions.

- **Borrow**: control versus candidate declared before running; a comparison that
  produces a mismatch signal rather than a narrative; exceptions treated as data.
- **Reject**: the Ruby implementation and production instrumentation. A prototype
  is not wired into a live path.
- **Dead end**: running both paths in production code to "prototype" inside the
  game; that is a flag, not a prototype, and it ships.

### 6. kubernetes/enhancements (software, 4.0k, Apache-2.0)

The KEP template (`keps/NNNN-kep-template/README.md`) requires Summary, Motivation,
Goals, Non-Goals, Risks and Mitigations, Test Plan, Graduation Criteria ("what
signals will be looked at to determine graduation"), Drawbacks ("Why should this KEP
_not_ be implemented?"), Alternatives ("What other approaches did you consider, and
why did you rule them out?"), and Implementation History.

- **Borrow**: graduation criteria written before the work, and a Drawbacks section
  that forces the kill case to be argued in advance; implementation history as a
  dated tail.
- **Reject**: the 32,574-character template, the review process, and the KEP
  numbering. A one-page skill cannot carry that weight.
- **Dead end**: adopting the full template shape for `REPORT.md`; it buries the
  answer under process sections.

### 7. rust-lang/rfcs (software, 6.6k, MIT OR Apache-2.0)

`0000-template.md` sections: Summary, Motivation, Guide-level explanation,
Reference-level explanation, Drawbacks, Rationale and alternatives, Prior art,
Unresolved questions, Future possibilities.

- **Borrow**: "Unresolved questions" as a named, single slot for what is still open;
  the idea that the open question is stated before the proposal is accepted.
- **Reject**: the proposal structure, guide/reference split, and the long-form
  rationale. The prototype report is shorter than the RFC it replaces.
- **Dead end**: writing the RFC first and prototyping after; that inverts R5 and
  turns the prototype into a proof of a document.

### 8. openai/evals (AI-agent workflow, 19.8k, MIT)

Each eval registers an `id`, a `description`, `metrics`, and a class; the eval
templates doc says to pick a template, inspect completions, and choose the metric.
One eval tests one behaviour, and the metric is declared before running.

- **Borrow**: one build = one question, with the answer format (yes/no/number)
  declared alongside it; the metric is part of the definition, not the analysis.
- **Reject**: API keys, the registry infrastructure, model-specific classes, and the
  leaderboard orientation.
- **Dead end**: adding evals to the prototype "for coverage"; each extra question
  breaks the one-answer rule.

### 9. Aider-AI/aider (AI-agent workflow, 50.3k, Apache-2.0)

`benchmark/README.md` describes a harness over Exercism exercises: each run creates
`tmp.benchmarks/YYYY-MM-DD-HH-MM-SS--a-helpful-name-for-this-run`, `--stats` produces
a YAML report, unit tests decide pass/fail, and the README warns that LLM code runs
unsupervised, so it executes in Docker.

- **Borrow**: a dated run folder per attempt, a generated stats table, and a pass
  criterion fixed by tests rather than by impression.
- **Reject**: Docker isolation (a solo prototype runs on the target machine), the
  leaderboard framing, and model benchmarking as the purpose.
- **Dead end**: chasing comparability between runs across different prototypes; the
  reports are comparable in shape, not in score.

## Dead ends hit during research

| Dead end | What happened | What replaced it |
|---|---|---|
| GitHub REST API for star counts | `https://api.github.com/repos/<repo>` returned 403 (rate-limited/blocked) for all repos; curl and `Invoke-RestMethod` failed the same way | Read `https://github.com/<repo>` HTML and parsed the stars element; values are GitHub's rounded display figure |
| `kubernetes/community/keps` | 404: KEPs moved out of that repository | `kubernetes/enhancements`, where the template and process now live |
| Aider benchmark as a prototype protocol | Requires Docker, Exercism fixtures and a model harness; the framing is competitive scoring | Kept only the dated run folder, generated stats and test-based pass criterion |
| Godot demos as a template | Full games with finished assets and project settings | Kept only "one small project per question, runnable alone" |
| ncase/trust as a form to imitate | Polished, narrated, weeks of work, per-asset licenses | Kept only the one-question playable piece with observation inside |
| Full KEP/RFC templates for `REPORT.md` | 32k+ characters, process-heavy, buries the answer | Kept five report fields and a pre-declared kill criterion |
| Phaser examples as implementation source | Engine-specific code and a catalogue to browse | Kept one-scene-one-question, built from the engine pack instead |

## What was deliberately not used

- No source supplied wording, section order, or examples to the skill. All nine were
  read for structure, then the structure was reduced to the one-page form used by
  `library/core/skills/verify/SKILL.md` and its neighbours.
- Star counts and licenses are recorded for traceability only; they did not influence
  which ideas were borrowed.
