# S09 gym — sources

Nine public repositories, read on 2026-11-25. Star counts come from `gh api repos/<owner>/<repo>`; unauthenticated calls to api.github.com returned 403 (rate limit exhausted), so `gh` was the working path. Licenses are as reported by GitHub at that time. Paths are files and directories that exist in the default branch.

Rows are `SRC1`-`SRC9` so they never collide with part IDs (`S02`, `S08`, `S09`, `S10`). Nothing is copied. Every borrow is a pattern restated for this skill; no code, text, or asset was taken, and the GPL source below is idea-only.

## Gamedev (4)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|
| SRC1 | id-Software/DOOM-3-BFG | https://github.com/id-Software/DOOM-3-BFG | 5,410 | GPL-3.0 | `neo/framework/CVarSystem.cpp`, `neo/framework/Console.cpp`, `neo/framework/CmdSystem.cpp` — typed console variables with defaults, ranges, runtime edit and persistence | A knob carries name, type, default, range and can be changed while the game runs, then saved | The console as a cheat surface, idTech internals, any GPL code |
| SRC2 | godotengine/godot-demo-projects | https://github.com/godotengine/godot-demo-projects | 9,838 | MIT | `2d/dodge_the_creeps`, `2d/platformer`, `2d/pong`, `2d/physics_tests` — one mechanic per minimal runnable project | One mechanic per scene, playable immediately, feedback inside the first seconds | Shipping a demo as a template; Godot project structure |
| SRC3 | jakobhellermann/bevy-inspector-egui | https://github.com/jakobhellermann/bevy-inspector-egui | 1,656 | Apache-2.0 | `crates/bevy-inspector-egui/src/quick.rs`, `crates/bevy-inspector-egui/src/inspector_egui_impls` — a panel that edits live values with bounds and drag speed | Value edited at runtime with a declared bound; no restart | Generic reflection inspector; adding egui to the game |
| SRC4 | KilledByAPixel/LittleJS | https://github.com/KilledByAPixel/LittleJS | 4,408 | MIT | `src/engineDebug.js`, `docs/Debug.html` — debug overlay toggled by one key, live values and frame data | One key toggles an overlay that shows the state being tuned | Canvas/engine draw code; the full debugger |

## Software development (3)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|
| SRC5 | ocornut/imgui | https://github.com/ocornut/imgui | 77,242 | MIT | `imgui_demo.cpp`, `imgui.h` (`ImGui::SliderFloat`) — widget bound directly to the variable it edits | The control edits the same variable the mechanic reads; no copy-and-sync layer | Embedding an immediate-mode GUI in the game |
| SRC6 | optuna/optuna | https://github.com/optuna/optuna | 15,084 | MIT | `Trial.suggest_float(low, high)`, `optuna/pruners/_median.py`, `_successive_halving.py` — a search space declared before the trial, early pruning of bad trials | Declare the range before the run; stop a direction early when it is clearly worse | Automatic objective and optimizer: the human is the objective |
| SRC7 | mlflow/mlflow | https://github.com/mlflow/mlflow | 28,966 | Apache-2.0 | `mlflow/tracking/fluent.py` (`start_run`, `log_param`, `log_metric`, `log_artifact`) — one run records params, one measured result and an artifact | One iteration = values + one observation + the note; runs are comparable side by side | Tracking server, database, dashboard |

## AI-agent workflow (2)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|
| SRC8 | langchain-ai/langgraph | https://github.com/langchain-ai/langgraph | 45,414 | MIT | `libs/langgraph/langgraph/types.py` (`def interrupt`), `libs/langgraph/langgraph/pregel/_checkpoint.py` — pause for a human, resume with the returned value, state survives | The run stops at the human, takes one answer, and continues from the same state | Graph runtime, checkpoint store |
| SRC9 | cline/cline | https://github.com/cline/cline | 71,892 | Apache-2.0 | `docs/core-workflows/checkpoints.mdx`, `apps/vscode/proto/cline/checkpoints.proto` — each step is a checkpoint that can be reverted | An iteration is a checkpoint: revert the value instead of patching forward | Per-action approval prompts; workspace snapshots |

## Dead ends

| Repository | Stars | License | Why it failed |
|---|---|---|---|
| microsoft/autogen | 61,967 | GitHub reports CC-BY-4.0 | Archived on 2026-11-12; license reported ambiguously. `human_input_mode` is the only analogous idea, and it is already covered by R8. Nothing borrowed. |
| humanlayer/humanlayer | 12,957 | Apache-2.0 | Python SDK for human-in-the-loop approval is gone after the move to a TS monorepo (`packages/`, `apps/`); the concept (structured human contact) was kept as a check, no artifact borrowed. |
| All-Hands-AI/OpenHands | 94,322 | MIT | After the restructure, searches for `StuckDetector` and `confirmation_mode` returned no hits and the root listing was empty; nothing verifiable. |
| photonstorm/phaser3-examples | 1,671 | No license detected | Phaser 3 while the project pins 4.2.1, and no license to build on. Rejected. |

## Finding

No repository in the sample ships a playtest protocol; they supply the tuning mechanics (SRC1-SRC5), the run bookkeeping (SRC6-SRC7) and the human pause (SRC8-SRC9). The session protocol itself comes from R8 and D07. Books and talks were out of scope (repositories only), so no book source is cited.
