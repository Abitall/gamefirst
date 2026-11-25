# N03 - Godot engine pack - justification

Method: every unit below earns its place by a failure it prevents for a file
tool, the selftest, or a programmer reading the pack. Units that only restate
Godot documentation were cut. Sources S1-S9 are listed in `SOURCES.md`.

## manifest.json

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| `id`, `engine` | A loader selects one engine pack per project and must not load the Godot pack into a Phaser project | Two packs claim one project; rules for the wrong engine are applied | N00; S8 (single primary artifact) |
| `engineRange: ">=4.0 <5"` | Godot 4 code is not Godot 3 code; a floor and a ceiling keep both ends out | A 3.x project installs the pack and every typed signature is wrong | N00; S5 (range grammar) |
| `stability: "beta"` | The pack was built without an installed Godot, so it must not pass as stable | A gate treats unrun recipes as proof | N00 |
| `files` + `hashes` | Proves the installed pack is byte-identical to the reviewed one | An edited or stale rule passes review silently | S6 (machine-readable result lines); N00 |
| `selftest: "node selftest.mjs"` | One command a project gate can run without Godot | Each consumer invents its own check | S7 (exit-code contract) |
| `upgrade: "none"` | First release; there is no previous pack version to migrate from | A fake migration note implies a history that does not exist | N00 |
| `parts: ["docs","recipe"]` | States what the pack contains; it adds no rule, seed, or permission | Tools look for parts that were never shipped | N00 |
| `apiSource` | Names the exact class XML tree and version every row was read from | API claims become unattributable and unreproducible | S1; S8 (spec as primary artifact) |

## RULES.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Scene tree and lifecycle | Nodes are inert until `add_child()`, `_ready()` runs once, and `queue_free()` is deferred | Code frees a node a signal still touches, or waits for `_ready()` that already ran | S1 (`Node.xml`); S2 |
| Signals | One connection per callable; a freed receiver drops its connection | Duplicate handlers fire twice or an error floods the Output panel | S1 (`Object.xml`, `Signal.xml`) |
| Resources and scenes | A loaded `Resource` is shared; threaded load is polled across frames | Editing one resource changes every user; a load loop freezes the frame | S1 (`Resource.xml`, `ResourceLoader.xml`); S2 |
| Input | Actions are named in the Input Map; `_unhandled_input()` runs after the GUI | Raw keycodes break remapping; gameplay eats UI clicks | S2 |
| Physics | `move_and_slide()` uses physics delta and belongs in `_physics_process()` | Speed changes with frame rate and contacts are missed | S3 (`2d/platformer/player/player.gd`) |
| Save and load | `FileAccess.open()` returns null; `get_var()` on user files can execute code | A crash on a missing file, or remote code execution from a save | S1 (`FileAccess.xml`) |
| Teardown and scene change | `change_scene_to_file()` is deferred; pause is per `process_mode` | Code reads the new scene too early; half the game ignores pause | S1 (`SceneTree.xml`); S2 |
| Version discipline | Floor 4.0.0; `change_scene_to_node` is 4.7-only and excluded | A member added after 4.0 breaks the floor silently | S1 (both class XML trees) |

## API.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Per-row `Seen` and `Docs` | Each member names the two tags and the rendered class page | A reader cannot tell a verified member from a remembered one | S1; S2 |
| Signatures and return types | Callers need arity, defaults, and null/error behaviour | Guessed arguments compile in the head and fail at runtime | S1 |
| "Checked and excluded" | Records members that look available but are not in range | `Engine.get_physics_ticks_per_second` or a 4.7-only call slips in | S1 |

## PITFALLS.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Zero-entry statement and admission rule | Godot is not installed, so no failure was reproduced; the file says so instead of repeating folklore | Readers treat documentation guesses as tested failures | N00; S8 (honest scope) |

## RECIPES.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Two `run` rows | Node and hash checks are the only steps that can run without Godot | The pack ships with no executable evidence | S6; S7 |
| Six `manual` rows | Input Map, frame-rate, scene, save, pause, and export checks need the editor | A shell command silently pretends to test the editor | S3 (demo project scenes); S4 (setup/teardown discipline) |
| Pass criteria | Each row names the observed evidence, not just the action | "It ran" is accepted as a pass | S4 |

## selftest.mjs

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Manifest, files, hashes checks | The manifest is the only file tools read; drift must fail loudly | A wrong hash or extra file installs as valid | N00; S6 |
| apiSource and range checks | Provenance and pin are machine-checked | A string or out-of-range source passes review | S1 |
| Encoding, placeholder, token, line caps | Keeps the pack readable by agents and inside the size budget | Mojibake, unreplaced placeholders, or an oversized file merge | N00 |
| Recipe execution and manual guard | `run` rows must exit 0; `manual` rows must not hide a command | A prose step is counted as executed evidence | S6; S7 |
| Negative behaviour | Extra, empty, missing, and edited files must fail | A green selftest proves nothing if it cannot go red | S8 (gate) |

## Deliberate omissions

- No `project.godot`, install script, or autoload: the pack is docs plus recipe;
  project scaffolding belongs to the template.
- No GDScript style guide: naming and formatting are not engine constraints.
- No Godot 3 migration table: the range starts at 4.0.0.
- No performance advice: no measurement was taken, so no number is claimed.
- No pitfalls from documentation: PITFALLS holds reproduced failures only.
- No C# or GDExtension rows: the pack targets GDScript.
- No `permission` or `seed` parts: nothing in this pack needs them.

## Sizes

| File | Chars | Tokens (chars/4) | Lines | Budget |
|---|---|---|---|---|
| `manifest.json` | 944 | 236 | 34 | n/a |
| `RULES.md` | 4,447 | 1,112 | 82 | 1,500 tokens |
| `API.md` | 5,631 | 1,408 | 50 | 1,500 tokens |
| `PITFALLS.md` | 736 | 184 | 15 | 1,500 tokens |
| `RECIPES.md` | 2,080 | 520 | 34 | 1,500 tokens |
| `selftest.mjs` | 9,868 | 2,467 | 213 | 250 lines |
