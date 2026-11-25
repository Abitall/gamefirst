# N03 - sources

Nine repositories, read on 2026-11-26. Stars are GitHub REST API values on that
date; licenses are from the repository LICENSE file or GitHub's license field.
Each entry names the file that was actually read, what it analogizes in this
pack, what was borrowed, one verbatim quote, and what was rejected. No source
code or prose block is copied into the pack; the quotes are evidence only.

## Gamedev (4)

### S1 - godotengine/godot

- URL: https://github.com/godotengine/godot
- Stars: 120,820
- License: MIT
- Read at: `8f2e46bca3c1cca8f3b759a0eaf67e44082b81a4`
- Artifact: `doc/classes/Node.xml`, `Object.xml`, `SceneTree.xml`,
  `ResourceLoader.xml`, `FileAccess.xml` (the class XML that generates the docs)
- Analog: the authority for every row in `API.md`
- Borrow: member names, signatures, defaults, and documented failure behaviour;
  the habit of reading the source XML instead of the rendered page
- Quote: "Queues this node to be deleted at the end of the current frame."
- Reject: engine internals, C++ code, and any member not confirmed in both tag
  trees

### S2 - godotengine/godot-docs

- URL: https://github.com/godotengine/godot-docs
- Stars: 5,936
- License: CC BY 3.0
- Read at: `4b22866ffab240404ffa3d5da43cd6590b0e2324`
- Artifact: `tutorials/scripting/nodes_and_scene_instances.rst`
- Analog: the scene-tree and input rules in `RULES.md`
- Borrow: the order in which a parent may resolve children, and the advice to
  bind named actions instead of raw keycodes
- Quote: "For this to work, the child node must be present in the scene tree.
  Getting it in the parent node's `_ready()` function guarantees that."
- Reject: tutorial prose and screenshots; the pack keeps the constraint, not the
  lesson

### S3 - godotengine/godot-demo-projects

- URL: https://github.com/godotengine/godot-demo-projects
- Stars: 9,838
- License: MIT
- Read at: `281a99f02178db944bcddef39aa694e3bfbe354a`
- Artifact: `2d/platformer/player/player.gd`
- Analog: the physics rule and the frame-rate recipe
- Borrow: a `CharacterBody2D` that calls `move_and_slide()` from
  `_physics_process()`, and a runnable scene to compare at two frame rates
- Quote: `move_and_slide()` (line 48)
- Reject: the demo's game code, scenes, and assets

### S4 - bitwes/Gut

- URL: https://github.com/bitwes/Gut
- Stars: 2,795
- License: MIT
- Read at: `cf45f668709d988346e766afee916d4169a9283b`
- Artifact: `addons/gut/test.gd`
- Analog: the pass criteria and setup/teardown discipline in `RECIPES.md`
- Borrow: one assertion per line with an explicit message, and a named hook for
  setup and teardown
- Quote: `assert_eq("asdf", "asdf", "Should pass")`
- Reject: the in-engine runner and the `gut` object; this pack does not run
  Godot

## Software development (3)

### S5 - npm/node-semver

- URL: https://github.com/npm/node-semver
- Stars: 5,477
- License: ISC
- Read at: `b37b033b585ad5e575afeccadb426ea41bc6cea4`
- Artifact: `README.md`
- Analog: the `engineRange` grammar in `manifest.json`
- Borrow: `>=` floor plus `<` ceiling as a compact, checkable range
- Quote: `>=1.2.7`
- Reject: npm's full comparator set, prerelease rules, and the package

### S6 - tapjs/tapjs

- URL: https://github.com/tapjs/tapjs
- Stars: 2,427
- License: BlueOak-1.0.0 for `src/tap`; the monorepo root reports NOASSERTION
  because licenses are per package
- Read at: `dc8d06993478270c00320cfad70c899911ca887b`
- Artifact: `README.md`
- Analog: the one-line-per-check output of `selftest.mjs`
- Borrow: a stable `ok`/`not ok` prefix so a machine and a person read the same
  stream
- Quote: "The module that parses [TAP](https://testanything.org/)"
- Reject: the TAP specification in full and the `tap` runner

### S7 - nodejs/node

- URL: https://github.com/nodejs/node
- Stars: 124,003
- License: MIT (GitHub reports NOASSERTION because bundled dependencies carry
  their own licenses)
- Read at: `72bf3926bfa385adc9c3ebdfd6c1f4c9ee33cbf0`
- Artifact: `doc/api/test.md`
- Analog: `selftest.mjs` exit codes, and the rule that `run` rows must exit 0
- Borrow: one process per check with a non-zero exit on failure, and a reporter
  line per result
- Quote: "The `tap` reporter outputs the test results in the [TAP][] format."
- Reject: the in-process test API; the pack uses only `node --version` and a
  hash script

## AI-agent (2)

### S8 - github/spec-kit

- URL: https://github.com/github/spec-kit
- Stars: 151,369
- License: MIT
- Read at: `f2010547121b3351e4923fe467205079e4593a32`
- Artifact: `spec-driven.md`
- Analog: the pack as a specification first, with code and recipes as its
  expression
- Borrow: one primary artifact per concern, and gates that fail on a missing
  input rather than on taste
- Quote: "The specification becomes the primary artifact. Code becomes its
  expression (as an implementation from the implementation plan) in a particular
  language and framework."
- Reject: the workflow commands, templates, and agent prompts

### S9 - agentsmd/agents.md

- URL: https://github.com/agentsmd/agents.md
- Stars: 25,707
- License: MIT
- Read at: `d001185d792eb6402a58e4cbef1c228b309ec25d`
- Artifact: `README.md`
- Analog: the pack as one predictable instruction file a coding agent reads
  before touching Godot code
- Borrow: a fixed, short document at a known path; terse normative rules
- Quote: "AGENTS.md is a simple, open format for guiding coding agents."
- Reject: the format's section list and examples

## Dead ends

- The first GitHub REST star read returned HTTP 403 (unauthenticated rate
  limit); all values were re-read on 2026-11-26 after the limit reset.
- The docs site's stable selector serves 4.7; 4.0 was checked in the
  `4.0-stable` class XML instead of the rendered site.
- `SceneTree.change_scene_to_node` is present in 4.7.2 and absent from 4.0.0;
  excluded so the floor holds.
- `Engine.get_physics_ticks_per_second` is not a member in either class XML;
  excluded rather than guessed.
- `anthropics/skills` was dropped: no repository-level LICENSE, so the license
  could not be stated.
- N01's beta exceptions were not copied: this pack uses a floor and ceiling, a
  table recipe, and an empty reproduced-pitfall set.
- No Godot binary is installed, so no runtime failure could be reproduced and
  no pitfall is claimed.
