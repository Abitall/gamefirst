# S10 slice - sources

Nine public repositories, read on 2026-11-25. Star counts come from `gh api repos/<owner>/<repo>`; licenses are as reported by GitHub at that time. Paths are files and directories that exist on the default branch. Every quote below was fetched from the named file and read on 2026-11-25; no quote is reconstructed, and no unverified quote is used.

Rows are `SRC1`-`SRC9` so they never collide with part IDs (`S02`, `S08`, `S09`, `S10`). Nothing is copied: the only text taken is the one-line quote that proves the artifact exists. All borrows are patterns restated for this skill.

## Gamedev (4)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim quote) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC1 | deepnight/gameBase | https://github.com/deepnight/gameBase | 714 | MIT | `src/game/App.hx`, `src/game/Boot.hx`, `src/game/Game.hx` - one root process owns the app, game, pause and restart | "Any other Process, including Game instance, should be a child of App." | One root owns the frame; pause and restart are calls on it, not new scenes | Haxe/Heaps stack, crash-log dialogs, sample entities |
| SRC2 | melonjs/melonJS | https://github.com/melonjs/melonJS | 6,527 | MIT | `packages/melonjs/src/system/save.ts`, `packages/melonjs/src/state/state.ts` - save keys declared with defaults; a stage stack for menu screens | "me.save.add({ score : 0, lives : 3 });" | Save is a named, typed key with a default, set once; a menu is a stage above play | Engine runtime, storage wrapper internals |
| SRC3 | phaserjs/phaser | https://github.com/phaserjs/phaser | 40,781 | MIT | `src/sound/webaudio/WebAudioSoundManager.js` - audio unlocks on the first input, because browsers block it | "Unlocks Web Audio API on the initial input event." | Sound needs an explicit unlock at the first input, and the title or menu is where that happens | WebAudio internals, any engine API call |
| SRC4 | godotengine/godot-demo-projects | https://github.com/godotengine/godot-demo-projects | 9,838 | MIT | `2d/dodge_the_creeps` (`README.md`, `main.gd`, `hud.gd`) - a finished short game: one screen, a goal, a score, an end, a restart, music | "This is a simple game where your character must move and avoid the enemies for as long as possible." | The nine points at demo scale: a timer, a score, a loss, a restart, sound, one screen | Godot scenes and tutorial code |

SRC4 is a repeat from S09. S09 borrowed "one mechanic per scene, playable immediately" (isolation); this skill borrows the complete mini-game loop (the frame). The artifact is analogous, not identical, and rubric 3 allows reuse only in that case. No other repository is shared with S09.

## Software development (3)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim quote) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC5 | microsoft/code-with-engineering-playbook | https://github.com/microsoft/code-with-engineering-playbook | 2,761 | CC-BY-4.0 | `docs/engineering-fundamentals-checklist.md` - a checkbox list a reader re-checks; `docs/non-functional-requirements/usability.md` - observe facts, gather feedback | "Usability testing's goal is to identify any usability issues, gather feedback, and make improvements to the product." | A DoD is a checkbox list, not prose; observations are facts before they are opinions | Web/ISE project structure, Azure guidance |
| SRC6 | microsoft/playwright | https://github.com/microsoft/playwright | 101,053 | Apache-2.0 | `docs/src/videos.md` - the run produces a video, not a person holding a camera | "Playwright Test can record videos for your tests, controlled by the `video` option in your Playwright config." | The capture is a product of the run; if the run did not produce it, there is no capture | Test runner, trace viewer, browser automation |
| SRC7 | elsewhencode/project-guidelines | https://github.com/elsewhencode/project-guidelines | 29,406 | MIT | `README.md` - a short, opinionated checklist with a reason attached to each line | "a list of guidelines we've found, written and gathered that (we think) works really well with most JavaScript projects" | Every checklist line carries its why, and the list stays short enough to re-read | JavaScript tooling, git workflow details, 2024 stack |

## AI-agent workflow (2)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim quote) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC8 | SWE-bench/SWE-bench | https://github.com/SWE-bench/SWE-bench | 6,247 | MIT | `README.md`, `swebench/harness` - a run writes build logs and evaluation logs, plus `results.json`; saved logs can be re-graded without re-running | "This command will generate docker build logs (`logs/build_images`) and evaluation logs (`logs/evaluation`) in the current directory." | The packet is a folder of artifacts with a machine-readable summary, and a verdict is re-readable later | Docker harness, dataset, model scoring |
| SRC9 | SWE-agent/SWE-agent | https://github.com/SWE-agent/SWE-agent | 20,871 | MIT | `docs/usage/trajectories.md` - one `<instance_id>.traj` per run records every thought, action and observation | "The main output file is `<instance_id>.traj`, which is a `.json` formatted file containing the (thought, action, observation) turns generated by SWE-agent towards solving `<instance_id>`." | A run leaves one step record, so a claim can be replayed instead of trusted | Agent loop, tool configuration, benchmark integration |

## Dead ends

| Repository | Stars | License | Why it failed |
|---|---|---|---|
| Unity-Technologies/EndlessRunnerSampleGame | 501 | No license detected | An official sample with a menu and a score, but no license to build on and no text to quote. Nothing borrowed. |
| SFML/SFML-Game-Development-Book | 1,040 | NOASSERTION | Last push 2015; the license is unclear and the chapters predate the current engine versions. Stale for a 2026 source. |
| 18F/API-Usability-Testing | 14 | NOASSERTION | Real usability scripts, but not popular and the license is unclear; the "observe facts" idea is already covered by SRC5 with a clear license. |
| cucumber/common | 3,351 | MIT | After the monorepo move the root holds only `README.md`; the Gherkin docs are gone, so there is no artifact to read. |
| getgauge/gauge | 3,201 | Apache-2.0 | Sponsorship ended in 2021 and the spec-as-check idea overlaps the SRC5 checklist. Dropped rather than stretched. |

## Finding

No repository in the sample ships a nine-point vertical slice or a G2 packet. The gamedev sources supply the frame and the two systems players notice when absent (SRC1 the root lifecycle, SRC2 save and menu, SRC3 audio unlock, SRC4 a complete short loop). The software sources supply the checklist, the capture and the reason-per-line habit (SRC5-SRC7). The AI sources supply the packet folder and the step record (SRC8-SRC9). The playtest protocol itself comes from R8 and D07, not from a repository: three to five testers, silence first, think-aloud after, no leading questions. No code, project files or assets were copied; the CC-BY-4.0 and MIT sources are idea-only.
