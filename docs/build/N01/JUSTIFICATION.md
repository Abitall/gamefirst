# N01 — justification

Method: every unit below exists because a Phaser 4.2.1 fact must reach an agent without a web search, or because a check must fail when the pack drifts. Units that only restate official prose were cut (see Omissions).

## manifest.json

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| `id`, `engine` | Names the pack and the engine it owns; the loader keys on `id`. | Two packs can claim phaser; lookups collide. | N00 (pending), assignment m00156 |
| `engineRange: "4.2.1"` | Exact pin; a patch drift must fail, not pass. | Agent silently uses 4.2.2+ or a v3 install. | semver exact-range semantics; E11 |
| `version: "0.1.0"` | Pack revision, independent of the engine version. | No way to tell two revisions apart in a report. | N00 (pending) |
| `stability: "beta"` | Honest status until the selftest passes in a real project. | Readers treat an unproven pack as stable. | assignment; blueprint |
| `parts: ["docs","recipe"]` | Declares the shipped roles: documentation plus recipes; no rule, seed or permission payload. | An installer cannot tell what the pack provides. | N00; assignment |
| `files` (5 entries) | Every artifact except the manifest; install copies exactly this list. | An unlisted or missing file passes unnoticed. | N00; assignment |
| `hashes` | sha256 per `files` entry, the same value written to `agent.lock.json`. | A tampered or stale file installs silently. | N00 |
| `selftest: "node selftest.mjs"` | Command run from the pack root. | Tooling has no runnable entry point. | N00 |
| `apiSource` object | Records kind, URI, pin and read date; a URL is recorded, never fetched. | The evidence trail loses provenance. | N00; E11 |
| `upgrade: "none"` | First pack version, so no migration note exists. | CLI06 looks for a note that is not there. | N00 |

## RULES.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Scope and layer line | States that gameplay may import Phaser and systems may not. | Engine types leak into `src/systems/` and core. | blueprint layers; AGENTS.md |
| Pin and authority | Typings first, memory last; no shims or downgrade. | Copied Phaser 3 code ships as if it were 4.2.1. | E11; `phaser.d.ts` |
| Scene lifecycle | Loader and update only work in the right phase. | Assets requested in `create()` never load; update logic runs in the wrong scene. | `skills/scenes/SKILL.md`; L129775–L129916 |
| Transitions | `start` vs `launch` vs `sleep` vs `restart` differ observably. | Overlays stop the game, or two copies of a scene run. | ScenePlugin signatures |
| Input on scaled canvas | CSS pixels are not game pixels; the error grows with zoom. | Clicks miss targets on every non-design window size. | `worldX` L86032; P1 |
| Loader and textures | Runtime textures are global and can collide; a load in `create()` is a no-op. | Silent empty sprites; "key in use" on restart. | L135640; P2, P3 |
| Physics | Velocity and `body.reset` are the supported motion paths. | Body snaps back after a teleport; colliders fire at old positions. | L110298, L111659 |
| Rendering | WebGL is the supported renderer; filters replace v3 pipelines. | Blank effects on Canvas fallback; removed v3 names throw. | L95732, L5615, L14199 |
| Teardown | Scene-scoped state dies with the scene; global state does not. | Duplicate handlers and texture growth after scene changes. | L82369; P7 |
| No invented API | The rule that makes E11 enforceable during coding. | Agents guess plausible names and ship runtime errors. | E11 |

## API.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Authority and tarball hash | Fixes which file the line numbers belong to. | Line references become unverifiable after any upgrade. | npm `phaser@4.2.1` |
| Docs URL and version caveat | Gives a human-checkable source without trusting the "latest" page. | A 4.3 symbol is accepted as 4.2.1. | docs.phaser.io; assignment |
| Scene fields | Tells the agent what is injected and needs no import. | Agents construct managers manually or import the wrong path. | `class Scene` L130440 |
| ScenePlugin signatures | The exact transition API, with parameter order and return type. | `start`/`launch` data passed in the wrong slot. | L129775–L129916 |
| Scale, camera, input, math | The four members most used by scene code, each with a signature. | `shakeCamera`, DOM coordinates or `Math.PI * 2` reintroduced. | L128944, L4014, L86032, L84859, L91671 |
| Textures | Existence check, removal and canvas creation, with return types. | Key collision or a null dereference on `createCanvas`. | L135231–L135419 |
| Physics | Collider, sprite factory and the safe teleport. | Manual body mutation and broken collisions. | L111659, L111718, L110298 |
| Rendering and config | Renderer constants, tint mode, mask type, shutdown event. | Canvas fallback, deprecated tint, wrong event name. | L5602–L5615, L128073, L18840, L82369 |
| Absent list | Pre-empts the three symbols an agent is most likely to invent. | Runtime "is not a function" from v3 memory. | grep of `phaser.d.ts` |
| How to check | Turns "verify" into two concrete commands. | Agents rely on snippets instead of the installed typings. | E11 |

## PITFALLS.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Status rule | Separates tarball facts from runtime reports. | Readers treat a plausible bug as reproduced. | rubric (evidence) |
| P1 pointer offset | The most common scaled-canvas failure. | Selection is off by the scale factor. | L86032 |
| P2 load in `create()` | A silent failure with no console error. | Missing assets are debugged as art bugs. | scene lifecycle |
| P3 texture collision | Restart is the normal path in this project. | Memory grows every scene visit. | L135313, L135409, L135640 |
| P4 body sync | Direct position writes look correct for one frame. | Collisions happen at invisible coordinates. | L110298 |
| P5 renderer fallback | Verified from the typings, affects some machines only. | Effects ship broken on low-end hardware. | L95732 |
| P6 v3 names | Verified absences; the exact error text is quotable. | Agents re-add removed members. | grep results |
| P7 global listeners | The leak that survives scene shutdown. | Double input and freed-object errors. | L82369 |

## RECIPES.md

| Unit | Why | Breaks without | Source |
|---|---|---|---|
| Scope note | States that R1–R5 are manual and R0 is packaging only. | The pack is credited with a browser test it does not run. | assignment |
| R0 selftest | One command, one pass condition. | Pack drift is found by a human reading files. | `selftest.mjs` |
| R1 boot | Proves the game starts on the pinned renderer. | A Canvas fallback passes unnoticed. | L5615 |
| R2 input | The only check that can confirm P1. | Pointer offset ships to players. | P1 |
| R3 load | Separates "asset missing" from "loader never ran". | Silent placeholder textures. | P2 |
| R4 physics | Confirms rest and teleport behaviour. | P4 survives to production. | P4 |
| R5 save/teardown | Covers three failure modes in one pass (state, textures, listeners). | Leaks accumulate across scene visits. | P3, P7 |

## selftest.mjs

| Check | Why | Breaks without | Source |
|---|---|---|---|
| Presence | Every declared file must exist. | A partial install reports success. | N00 |
| Manifest and identity | Parses; exact id/engine/pin/version/stability. | Drift in any named field passes. | N00 |
| Parts | Only known roles, and the shipped set is `docs` + `recipe`. | An installer maps a role the pack does not have. | N00 |
| Files listing | Non-empty, POSIX, relative, and equal to the directory except the manifest. | A missing or stray file installs unnoticed. | N00 |
| Hashes | Object keys equal `files`; every value is the file's sha256. | Tampering or a stale copy installs silently. | N00 |
| apiSource shape | Object with kind/uri/version/date; URL recorded, not fetched. | The evidence trail degrades to a bare string. | N00 |
| Upgrade shape | `"none"` or `{from, note}`. | CLI06 cannot choose between "no upgrade" and a bad note. | N00 |
| Selftest command | `node <file>` and the file exists. | The manifest names a command that cannot run. | N00 |
| Encoding and placeholders | BOM, CRLF, unresolved double-brace placeholders, U+FFFD, invalid UTF-8. | Broken text ships. | rubric |
| Token cap | Four docs at ≤1,500 tokens (chars/4). | The pack exceeds its context budget. | N00 |
| Selftest budget | 250-line limit, read from the file itself. | The test grows into a second product. | N00 |
| API evidence | `4.2.1`, the docs host, `shakeCamera`, and the `start` line must remain. | The API file can be emptied without a failure. | rubric (evidence) |
| Installed pin | Compares `node_modules/phaser` when present; otherwise prints why it skipped. | A project runs a different patch than the manifest claims. | E11 |

Failure paths were exercised on a scratch copy: empty `files`, a wrong hash, a string `apiSource`, a bad `upgrade`, and one extra file each exit 1 with the matching `FAIL` line.

## Deliberate omissions

- Full API dump and engine tutorial — `docs.phaser.io` owns them; the 1,500-token cap forces a used surface.
- 3-to-4 migration guide — the official changelog is authoritative; the pack records only symbols the project may touch.
- Install and build setup — environment/D09 territory, not a pack concern.
- Automated browser test — a real Phaser scene cannot be honestly tested without a browser and a project; recipes stay manual.
- Gameplay implementations — R5 forbids code before design; the recipes are checks, not features.
- Filled `files`/`hashes` — tooling owns them under N00; the pack ships the documented empty state.
- Star counts for pages that hide them, or a guessed license — SOURCES records the gap instead.

## Sizes (chars / tokens at chars÷4)

| File | Chars | Tokens | Cap |
|---|---:|---:|---:|
| `manifest.json` | 900 | 225 | — |
| `RULES.md` | 3,742 | 936 | 1,500 |
| `API.md` | 4,387 | 1,097 | 1,500 |
| `PITFALLS.md` | 3,683 | 921 | 1,500 |
| `RECIPES.md` | 2,229 | 558 | 1,500 |
| `selftest.mjs` | 7,758 | 1,940 | 250 lines (208) |
