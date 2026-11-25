# N00: Engine contract

One pack shape for every engine, so Phaser, Unity, and Godot are interchangeable:
pack data plus a test that core and game never import. A game names its engine in
`project.config.json`; a swap replaces pack and adapter, not the logic.

## Pack directory

```text
library/engines/<engine>/
  manifest.json     # the only file a tool reads
  RULES.md          # what the engine forces on the code
  API.md            # members verified for the pin
  PITFALLS.md       # reproduced failures only
  RECIPES.md        # step | cmd | required | artifact | mode
  selftest.mjs      # proves the pack against the pin
  install/          # optional payload: rule/, docs/, seed/, permissions.json
```

`RULES.md`, `API.md`, `PITFALLS.md`, `RECIPES.md`: at most 1,500 tokens each
(chars/4). `selftest.mjs`: at most 250 lines.

## manifest.json

| Field | Rule |
|---|---|
| `id` | `engine-<engine>`; equals the directory name and the lockfile id. |
| `engine` | Host id; the same string as `project.config.json` `engine.id`. |
| `engineRange` | The pin, or a range; see below. |
| `version` | Pack semver, independent of the engine version (X03). |
| `stability` | `stable` or `beta`; `stable` only while the selftest passes. |
| `parts` | Roles shipped: `rule`, `docs`, `seed`, `permission`, `recipe`. |
| `files` | Every path in the pack except `manifest.json`, POSIX and relative; unlisted, missing, or wrongly hashed files fail the selftest. |
| `hashes` | sha256 per `files` entry; same values as `agent.lock.json`. |
| `selftest` | Command run from the pack root, e.g. `node selftest.mjs`. |
| `upgrade` | `none`, or `{"from": "<version>", "note": "<file>"}`, read by CLI06. |
| `apiSource` | `{kind, uri, version, date}`: what `API.md` was read from; `kind` is `typings`, `docs`, or `source`. |

## engineRange

`stable`: one exact version, `"4.2.1"`, a pin not a preference. `beta`: one
floor and one ceiling, `">=3.80 <5"`, and every `API.md` row names the versions
where the member was seen. No member outside the pin is written or documented: a
missing one is a stop, not a shim (E02, E11). Changing `engineRange` needs a new
pack `version`.

## project.config.json

The template ships none, so the skeleton assumes no engine. CLI01 writes the
seed: `name`, `engine: null`, `packs: {}`, an empty `verify.recipe`,
`budgets: {}`, `default_agent: "partner"`. The first install fills `engine`,
`packs`, and `verify`. N00 owns this schema; CLI07 reads it.

```json
{
  "name": "Game",
  "engine": { "id": "phaser", "version": "4.2.1", "range": "4.2.1" },
  "packs": { "engine-phaser": "docs/engine/phaser" },
  "verify": { "recipe": [{ "cmd": "npm run build", "required": true, "artifact": "dist/index.html" }] },
  "budgets": { "verifySeconds": 300, "contextTokens": 12000 },
  "default_agent": "partner"
}
```

`engine` is the only pin; `range` copies `engineRange`. `packs` maps each pack to
its directory; `upgrade` and `doctor` resolve paths, not scans. `budgets`: caps
the tools read; a missing key means the default. `default_agent` is `partner`
(A01): one agent owns dialogue.

## Install, remove, upgrade

Install copies `files`, checks each hash, writes path, version, and hash to
`agent.lock.json` (CLI01, CLI05):

- `rule` -> `.opencode/rules/<id>.md`, `docs` -> `packs` directory: hashed,
  replaced on upgrade.
- `seed` -> `src/game/`: copied only when absent; never overwrites a local edit,
  and `upgrade` reports it.
- `permission` -> rows from `install/permissions.json` printed as a diff; the
  user applies them to `opencode.json`, which no installer writes (X02).
- `recipe` -> `run` rows of `RECIPES.md` appended to `verify.recipe` as defaults;
  a project entry overrides them, not the reverse (D08).

`remove` deletes hashed, unmodified `rule` and `docs` entries plus `seed` files
matching their hash; it reports the rest, permission rows included, for the user.
`upgrade` is CLI06: dry run, diff, apply; a pack whose `version` moved ships its
`upgrade` note.

## selftest

One offline command proves: `manifest.json` parses with every field above;
`files` equals the directory listing except `manifest.json`, hashes match, and an
empty `files` fails; `apiSource` resolves: a local path exists and declares `version`, a URL is
recorded and not fetched; every `run` recipe exits 0 and every other row is
`manual`; no pack file keeps an unreplaced double-brace placeholder; on a
`stable` pack the installed engine version equals `engineRange` (E11). One line
per check, exit 0 or 1, for CLI03 and CLI07. `stable` is the claim this passed on
the pin; otherwise the pack is `beta`.

Built to this shape: N01. Version fields and upgrades: X03. Tools: CLI06, CLI07.
