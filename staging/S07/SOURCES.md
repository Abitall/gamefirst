# S07 engine-choice - sources

Nine public repositories inspected on 2026-11-25: four game-development, three software-development, two AI-agent workflow. The brief asked for engine comparisons, architecture decision records, spikes, and weighted matrices. What exists, what was borrowed, and what did not transfer:

## Gamedev (4)

| # | Repository | Stars | License | Analogous artifact | Borrowed | Rejected / dead end |
|---|---|---|---|---|---|---|
| 1 | https://github.com/bevyengine/bevy | 49,999 | Apache-2.0 OR MIT | `_release-content/migration-guides/` with `migration_guides_template.md` (title, pull requests, what changed, why breaking, how to migrate) and `release_notes_template.md` (goals: what, why it matters, how to use) | One migration note per breaking change, tied to the version that introduces it. Becomes the pack's upgrade path behind S07 step 7. | The PR-metadata pipeline and Rust specifics. A migration guide explains a known upgrade; it does not choose an engine, so it supplies the revisit trigger, not the decision. |
| 2 | https://github.com/libgdx/libgdx | 25,558 | Apache-2.0 | `tests/gdx-tests/src/com/badlogic/gdx/tests/`: 83 one-class test screens (`InputTest.java`, `Box2DTest.java`, `AssetManagerTest.java`, `AudioDeviceTest.java`, `FullscreenTest.java`) | One minimal runnable probe per capability. The six spike probes are six such screens: each proves one thing, runs alone, and stays as evidence. | The Java test harness and engine internals. A passing probe shows the capability exists; it does not score the engine, so timing and friction stay separate measurements. |
| 3 | https://github.com/libsdl-org/SDL | 17,071 | Zlib | `docs/README-platforms.md` (supported and unsupported platform lists with notes, e.g. macOS 10.14+, Switch only via an NDA fork) and `docs/README-versions.md` (since 3.2.0: even minor plus patch is stable; patch releases are backward- but not forward-compatible) | Two things: an export target must name its platform and its support tier, and a version policy must say which build is stable. Both feed the finalist check and the exact pin. | The SDL API and platform how-tos. Supporting a platform is not the same as shipping to it: store requirements are a separate check (S02). |
| 4 | https://github.com/pixijs/pixijs | 48,902 | MIT | `skills/pixijs/SKILL.md` plus `references/` inside the engine repository; description starts "PixiJS v8 (pixi.js) reference. Use it before writing, fixing or porting any PixiJS code..." and routes to topic files (Application, Container, Sprite, Graphics, Text, Assets, Ticker) | An engine pack is version-scoped and routes to topic files; its description names the task, so it loads deliberately. S07 is the gate that selects which pack gets loaded and pinned. | The PixiJS API content and topic files. It is the model for a pack's shape, not its contents, and it is not engine-selection evidence. |

## Software development (3)

| # | Repository | Stars | License | Analogous artifact | Borrowed | Rejected / dead end |
|---|---|---|---|---|---|---|
| 5 | https://github.com/adr/madr | 2,666 | CC0-1.0 AND MIT (`LICENSE.CC0-1.0`, `LICENSE.MIT`; GitHub's sidebar shows only "MIT") | `template/adr-template.md`: Context and Problem Statement, Decision Drivers, Considered Options, Decision Outcome (Consequences, Confirmation), Pros and Cons of the Options, More Information; status proposed / rejected / accepted / deprecated / superseded by ADR-NNNN | Decision drivers, considered options with pros and cons, a confirmation line, and the supersede lifecycle. Drives the D03 entry fields and the "alternatives" record. | The template prose and metadata fields (decision-makers, consulted, informed). Too heavy for a ten-line entry, and the roles do not exist in a one-person project. |
| 6 | https://github.com/kubernetes/enhancements | 3,991 | Apache-2.0 | `keps/NNNN-kep-template/README.md`: Motivation, Goals, Non-Goals, Risks and Mitigations, Production Readiness Review Questionnaire, Implementation History, Alternatives | Goals and non-goals as separate lists (the must/nice split), risks with named mitigations, alternatives kept, and implementation history as the revisit record. | The SIG process and the production-readiness questionnaire. A solo project has no review board, and the questionnaire answers questions an engine choice does not ask. |
| 7 | https://github.com/thoughtworks/build-your-own-radar | 2,599 | AGPL-3.0 | README ring table (`name`, `ring`, `quadrant`, `isNew`, `description`) with rings adopt, trial, assess, hold and movement between rings | A time-boxed trial earns a ring, and movement is the revisit signal. The spike produces trial evidence, not adoption on a demo alone. | The AGPL code and the quadrant taxonomy. Four quadrants do not map to engines, and reading the ring vocabulary is not a derivative work. |

## AI-agent workflow (2)

| # | Repository | Stars | License | Analogous artifact | Borrowed | Rejected / dead end |
|---|---|---|---|---|---|---|
| 8 | https://github.com/EleutherAI/lm-evaluation-harness | 14,536 | MIT | README and `docs/task_guide.md`: `lm-eval ls tasks`, YAML task configs, natively supported metrics, install extras such as `lm_eval[hf]` | Every candidate runs the same fixed battery with the same named metrics. The matrix scores are defined before the first spike, not after the first engine. | The benchmark tasks and model-scoring code. Engine probes measure feasibility and speed, not accuracy, so the harness is a protocol model only. |
| 9 | https://github.com/UKGovernmentBEIS/inspect_ai | 3,338 | MIT | README (200+ pre-built evals, scorers, Inspect View) and `docs/eval-logs.qmd`: "Every time you use `inspect eval` or call the `eval()` function, an evaluation log is written for each task evaluated" | One log per run, with scoring kept separate from the run. The spike writes one evidence log per engine, and the matrix is filled from it afterwards. | The eval framework and model APIs. Logs are evidence format, not decision logic; the choice still runs through weights and a veto. |

## Coverage and gaps

| S07 step | Covered by | Gap |
|---|---|---|
| Must/nice split, veto | #5 drivers, #6 goals and non-goals | No public source uses a hard veto in an engine matrix; the split is synthesized. |
| Weighted matrix | #5 pros and cons, #8 fixed metrics | **No maintained public repository ships a weighted engine-selection matrix.** Comparisons found were vendor or blog content: R3 level 4, rejected. The weights, 1-5 scores, and 1-3 weights are designed here. |
| Finalist facts | #1 migration notes, #3 platform and version docs, #4 version-scoped pack | Docs quality and community health have no standard artifact; S01 cites what it reads. |
| One-day spike | #2 one probe per capability, #9 one log per run | **No public engine-spike protocol exists.** The six probes and the day budget are synthesized from the two patterns. |
| Decision record | #5 MADR, #6 KEP | D03 already fixes the entry; the sources only shape it. |
| Pin and revisit | #3 version policy, #1 migration guide, #7 ring movement | No source ties a revisit trigger to a pack contract; N00 does. |

## Dead ends

Searched and rejected, with the reason:

- `godotengine/godot` (120,808, MIT): the engine itself. No selection or comparison artifact lives in the repository.
- `architecture-decision-record/architecture-decision-record` (17,521, license shown only as "License"): an ADR record format without decision drivers or a trade-off table. Duplicates MADR, which is more complete and clearly licensed.
- `openai/evals` (19,803, license shown only as "License"): a second eval harness. Duplicates lm-evaluation-harness without an added decision pattern.
- `godotengine/godot-proposals` (1,464, MIT): proposals about one engine, not comparisons between engines.

## Licensing and use

No text is copied. Ideas are re-expressed in this project's vocabulary. MADR is CC0-1.0, so even textual reuse would be permitted; it is not needed. The AGPL repository (#7) was read for the ring vocabulary only; no code or text is included, and nothing here is a derivative work. Apache-2.0 and MIT repositories contribute patterns, not snippets, so no notice file is required.

## Method

GitHub's REST API returned 403 with `x-ratelimit-remaining: 0` on 2026-11-25, so star counts were read from the repository page's `"stargazerCount"` field and licenses from the sidebar license link. Stars are a snapshot and a popularity proxy only; the selection uses them as community evidence, never as a criterion. Each repository's artifact was opened and read before it was listed.
