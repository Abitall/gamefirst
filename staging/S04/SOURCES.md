# Sources for S04 import

Nine repositories read on 2026-11-25. Stars are GitHub REST API values for that date; licenses are as reported then. Artifact claims were checked by reading the named files, not README claims. No text, code, or assets are copied; only method structure is synthesized.

Selection rule: four gamedev, three software, two AI-agent; each had to expose a repeatable method with provenance, examples, or tests. Link lists, engines, and principle lists without a test were rejected.

## Gamedev

| # | Repository | Stars | License | Artifact type | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 1 | [munificent/game-programming-patterns](https://github.com/munificent/game-programming-patterns) | 4,583 | NOASSERTION; prose not reusable, code MIT | One Markdown chapter per pattern under `book/` (e.g., `command.markdown`), with prose, `^code` excerpts, and "See Also" links. | One named method per file; worked example; cross-links to neighbouring methods. | Prose, code, and license terms. |
| 2 | [godotengine/godot-demo-projects](https://github.com/godotengine/godot-demo-projects) | 9,838 | MIT | One minimal runnable project per feature (e.g., `2d/dodge_the_creeps/` with `project.godot`, `main.gd`, `mob.gd`, `player.gd`, README, LICENSE). | Runnable artifact; per-feature README; per-asset license and provenance. | Engine files, art, project settings. |
| 3 | [patriciogonzalezvivo/thebookofshaders](https://github.com/patriciogonzalezvivo/thebookofshaders) | 7,088 | All rights reserved (2025 Patricio Gonzalez Vivo) | Numbered chapter directories `00`-`18` with `README.md`; chapters `02` and `03` embed runnable shader canvases via `codeAndCanvas` divs. | Claim demonstrated by an executable example beside the text. | All text and code; license allows no reuse. |
| 4 | [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) | 12,856 | MIT | `gymnasium/envs/__init__.py` registers each env with `id`, `entry_point`, `max_episode_steps`, `reward_threshold`; `tests/envs/` covers registered envs. | Registry entry with ID, entry point, budget; every entry has a test. | RL API, environments, test internals. |

## Software development

| # | Repository | Stars | License | Artifact type | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 5 | [rust-lang/rfcs](https://github.com/rust-lang/rfcs) | 6,643 | Apache-2.0 | `0000-template.md`: Summary, Motivation, Guide-level/Reference-level explanation, Drawbacks, Rationale and alternatives, Prior art, Unresolved questions; review/FCP gate. | Candidate fields: alternatives, prior art, drawbacks; accept only after review. | Process scale and Rust content. |
| 6 | [google/eng-practices](https://github.com/google/eng-practices) | 23,274 | CC BY 3.0 | `review/reviewer/standard.md`, `looking-for.md`, `comments.md`, `navigate.md`, `pushback.md`, `speed.md`; `review/` and `standard/` docs. | Written acceptance standard and what-to-look-for checklist; decide on evidence, not perfection. | Google policy, CL workflow, text. |
| 7 | [tldr-pages/tldr](https://github.com/tldr-pages/tldr) | 64,301 | CC BY 4.0 | One Markdown page per command (`pages/common/tar.md`): title, one-line description, around five concrete examples with `{{placeholders}}`; `CONTRIBUTING.md` caps examples at eight. | Hard example cap; concrete examples over prose; page per method. | Command content and CC BY text. |

## AI-agent workflow

| # | Repository | Stars | License | Artifact type | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 8 | [anthropics/skills](https://github.com/anthropics/skills) | 200,345 | No root LICENSE; README says many skills are Apache-2.0; `spec/agent-skills-spec.md` points to agentskills.io | `skills/<name>/SKILL.md` folder per skill; `template/SKILL.md` with `name` and `description`; spec pointer. | Folder-per-skill; description states when to use; template. | Example bodies, scripts, unlicensed content. |
| 9 | [obra/superpowers](https://github.com/obra/superpowers) | 326,375 | MIT | `skills/writing-skills/SKILL.md`; `references/testing-skills-with-subagents.md` RED/GREEN/REFACTOR table; `tests/` harness. | No skill without a failing baseline, then a passing run; refactor loopholes. | Subagent pressure campaigns (cost) and multi-harness packaging. |

## Coverage and trade-offs

- Gamedev sources cover method-per-file, a runnable artifact, an executable example, and registry-plus-test. They shape the four-file bundle and the rule that a claim needs a run, not a sentence.
- Software sources cover candidate fields, a written acceptance standard, and a hard example cap. They shape the candidate header, the S02 pass rule, and the step limit.
- AI-agent sources cover folder-and-frontmatter packaging and test-first skill writing. They shape the artifact format and Step 5.
- Gap: no book or video is among the nine, so the source card's page and timestamp fields have no direct precedent. No non-English source. Stars skew toward AI repositories; selection weighted artifact relevance over popularity.
- Trade-off: larger repositories were rejected when they shipped an engine or a principle list without a test. A method with a runnable example was worth more than a popular catalogue.

## Not sources (inspected, rejected)

- [raysan5/raylib](https://github.com/raysan5/raylib) (35,791): examples per feature, but engine code; no separated method and test.
- [ellisonleao/magictools](https://github.com/ellisonleao/magictools) (17,871): link list; no method to test.
- [architecture-decision-record/architecture-decision-record](https://github.com/architecture-decision-record/architecture-decision-record) (17,521): ADR record format; duplicates the D03/R6 record, no import method.
- [humanlayer/12-factor-agents](https://github.com/humanlayer/12-factor-agents) (27,420): principles without a test task; fails no-skill-without-test.
- [wshobson/agents](https://github.com/wshobson/agents) (42,882): multi-harness generators and adapters; too much machinery for one import.
- Also inspected: libgdx (25,558), Unity ml-agents (19,893), openai/evals (19,803); engine, RL, and eval infrastructure, not method capture.

## Licensing

- Game Programming Patterns: GitHub reports NOASSERTION; its LICENSE separates prose (not reusable) from code (MIT). No prose or code is taken.
- The Book of Shaders: all rights reserved; the idea of an executable example is borrowed, nothing else.
- anthropics/skills: no root license; the folder and frontmatter idea is borrowed, no example bodies or scripts.
- Godot, Gymnasium, RFC, eng-practices, tldr, and superpowers carry permissive licenses, but no text, code, or assets are copied; only structure and method ideas are used.
- The artifact contains no quotes, code excerpts, or assets from any source.
