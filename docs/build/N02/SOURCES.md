# N02 - sources

Stars were read on 2026-11-26 from each repository's GitHub HTML
(`"stargazerCount"` in the page payload), because the unauthenticated GitHub REST
API returns 403 in this environment. Licenses are what the repository displays
at that date; "no license displayed" means no `LICENSE` file and no license
label was found. Stars for S1-S3 and A1-A2 are the 2026-11-26 readings already
recorded in N01; they were not re-read for this pack.

The four Unity repositories are analogs, not vendored code. Unity's licenses
allow reference use of the engine source and use of companion-licensed samples
in Unity-dependent projects; they do not allow copying code into this
engine-agnostic pack. Nothing below is copied verbatim.

## Gamedev (4)

### G1. Unity-Technologies/UnityCsReference - 13,082 stars
- URL: https://github.com/Unity-Technologies/UnityCsReference
- License: Unity Reference Only License (README points to
  https://unity3d.com/legal/licenses/Unity_Reference_Only_License).
- Analog: the engine's own C# surface and naming. It is the reason the pack can
  say `Rigidbody.linearVelocity`, not the obsolete `velocity`, and why
  `SceneManager.LoadSceneAsync` returns `AsyncOperation`.
- Borrow: member names, signatures, and the rule that the reference source is
  read-only. The local installed assemblies were used for verification, not
  this repository, because the repository tracks a 7000.0 alpha line.
- Reject: copying source, comments, or implementation. The license forbids
  modification and redistribution.

### G2. Unity-Technologies/InputSystem - 1,527 stars
- URL: https://github.com/Unity-Technologies/InputSystem
- License: Unity Companion License (`LICENSE.md`).
- Analog: separating input devices from game actions through action maps.
  `RULES.md` borrows only the architectural idea: one backend, one snapshot
  adapter, gameplay never reads devices directly.
- Borrow: the "actions, not keys" boundary and the warning that two input
  backends must not run at once.
- Reject: the package API itself. `com.unity.inputsystem` is not in the pinned
  install set, so no Input System member appears in `API.md`. Adding it would
  require a package pin and a new verification pass.

### G3. Unity-Technologies/FPSSample - 5,140 stars
- URL: https://github.com/Unity-Technologies/FPSSample
- License: Unity Companion License (`LICENSE.md`).
- Analog: a complete Unity project layout with bootstrap, additive scene flow,
  prefabs, and object pooling. It shows what "scene owns its objects" looks
  like in practice.
- Borrow: bootstrap-before-gameplay, additive load/unload, and pool ownership.
  These became rules and the R2 manual check (load and unload twice, then audit
  the Hierarchy).
- Reject: sample gameplay, networking, and art. The project is not a template
  and the pack must not import a sample's domain code.

### G4. Unity-Technologies/Addressables-Sample - 1,451 stars
- URL: https://github.com/Unity-Technologies/Addressables-Sample
- License: no license displayed (no `LICENSE` file found on 2026-11-26).
- Analog: resource ownership when content is loaded by key: who holds the
  handle, when it is released, and what happens when a key is missing.
- Borrow: only the problem framing. `RULES.md` requires explicit handle
  ownership and a hard failure on a missing asset; it does not prescribe an
  Addressables API.
- Reject: code and API names. The package is absent from the local cache, so
  E11 cannot be satisfied; `API.md` marks Addressables out of scope. The
  missing license is a second reason not to copy.

## Software (3)

### S1. nodejs/node - 124,003 stars
- URL: https://github.com/nodejs/node
- License: NOASSERTION on GitHub (the project is MIT plus third-party notices).
- Analog: a runtime whose contract is exit codes, stable CLI behavior, and
  `node:`-prefixed built-ins.
- Borrow: `selftest.mjs` uses only built-ins (`node:fs`, `node:crypto`,
  `node:path`, `node:url`), prints one line per check, and exits 0 or 1. No
  dependency is installed to test the pack.
- Reject: vendoring any part of the runtime or adding a package manager step.

### S2. microsoft/playwright - 101,066 stars
- URL: https://github.com/microsoft/playwright
- License: Apache-2.0.
- Analog: a verification harness that separates automated commands from checks
  a human must perform, and makes the pass condition explicit.
- Borrow: the `run` versus `manual` split in `RECIPES.md`, and one observable
  pass condition per step (Console clean, Hierarchy clean, Player.log clean).
- Reject: the browser stack and any test runner dependency. The pack's only
  automated recipe is the packaging selftest.

### S3. npm/node-semver - 5,477 stars
- URL: https://github.com/npm/node-semver
- License: ISC.
- Analog: unambiguous range semantics for a beta pin.
- Borrow: the floor-plus-ceiling form `>=6000.0 <6001` and the reading that
  `6000.3.24f1` satisfies it.
- Reject: adding the library. `selftest.mjs` checks the exact string and the
  installed-version rule with a small local regex, so the pack stays
  dependency-free.

## AI-agent (2)

### A1. anthropics/skills - 200,452 stars
- URL: https://github.com/anthropics/skills
- License: no license displayed.
- Analog: a skill/pack format with an explicit contract, a machine-readable
  manifest, and a self-check.
- Borrow: the idea that a pack must state its allowed surface and prove its own
  packaging; this produced the manifest checks and the API evidence needles.
- Reject: the skill format and any text. This pack follows N00, not an external
  schema.

### A2. agentsmd/agents.md - 25,707 stars
- URL: https://github.com/agentsmd/agents.md
- License: MIT.
- Analog: a short root instruction file that survives loader failures and points
  to deeper documents.
- Borrow: the layering rule already used by the framework: root file keeps only
  non-negotiables, details live in the pack. `RULES.md` is written to be read
  before `API.md`, not to replace it.
- Reject: copying the AGENTS.md template or adding agent-specific prose to an
  engine pack.

## Dead ends

- Unauthenticated GitHub REST API returned 403 for star counts; repository HTML
  payload was used instead.
- `monop.exe` failed with `Could not load the file
  'UnityEngine.SharedInternalsModule...'`; `monodis` in `MonoBleedingEdge\bin`
  is a macOS Mach-O binary and cannot run on Windows.
- PowerShell `ReflectionOnlyLoadFrom` failed on the netstandard 2.1 resolver.
  A temporary .NET `MetadataLoadContext` dumper was used to read exact public
  signatures from the installed reference assemblies.
- The installed editor has no local `ScriptReference` HTML; the XML doc files
  carry member IDs but no signatures. Both were needed: XML for presence,
  MetadataLoadContext for signatures.
- `com.unity.addressables` is not in the local package cache, so no Addressables
  member could be verified. The package is out of scope, not guessed.
- No Unity Editor session or player build was run, so no runtime pitfall was
  reproduced. `PITFALLS.md` says so instead of repeating folklore.
- N01's beta deviations (exact pin on a beta pack, prose recipes, unverified
  pitfalls, string `apiSource`) were read and deliberately not copied.
