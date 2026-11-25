# P04 justification - audio pack

## Why the pack exists

`docs/BUILD-PLAN.md:105` schedules P04 as the audio pack in
`library/packs/audio/`; `docs/V0.3-BLUEPRINT.md:308` defines it as music and SFX
brief, loudness, format, licenses, and implementation. The directory existed but
held no files, and no audio rule or skill exists. Sound enters through S10 step 6,
S11 content, S12 polish, and S13 licenses, so the project needs one on-demand
reference those skills can point to.

## Unit-by-unit necessity

| Unit | Why | If removed | Shorter? | Source |
|---|---|---|---|---|
| Load trigger | Says when the pack is relevant: first sound, content cues, mix, licenses. | Agents load it too early or never find it. | No; one sentence gates four skills. | Blueprint line 308; S10-S13 |
| Boundaries | Five hard limits: no publish, no vendor, no aesthetics, no engine code, no audio-only information. | The pack drifts into procurement, runtime, or art direction. | No; each limit prevents a different failure. | R4, R10, N00; release pack shape |
| Audio pillars | Forces signature, silence, and feedback before assets exist. | Cues become a pile without a reason; silence is forgotten. | No; three lines, three decisions. | S1 demo recipes; S12 sound pass |
| SFX and music brief | One cue table, counts, beds, variations, missing-cue behavior. | Assets and gameplay ids diverge; nobody knows what is missing. | No; fields are the minimum to review a cue. | S2 asset/player split; S4 pooling |
| Loudness, format, loop, compression | Gives measurable targets and evidence for each. | Review becomes taste; loudness and size fail late. | No; numbers already terse. | S5 loudnorm; S3 format split |
| Implementation hooks | Contracts: cue table, one boundary, buses, caps, priority, lifecycle, timing. | Each system reaches the device; mixing and reuse break. | No; one line per contract. | S3, S4, S6, S7, S8, S9 |
| Mixing and accessibility | Static mix, ducking, sliders, mono, night mode, visual twins, deaf play. | Audio becomes the only carrier of state; mix is untestable. | No; each row is a test. | S6 buses; S12 accessibility |
| Licensing | One row per asset with proof, attribution, and rejection rules. | A shipped cue can have no usable license. | No; fields match the legal check. | X02, P03, S13 |
| Review checklist | Turns every target into a pass/fail row with evidence. | The pack is advice, not a gate. | No; rows map one-to-one to sections. | R1 evidence; P01 shape |
| Holds | Names the blockers that stop work. | Agents paper over missing licenses, twins, or budget. | No; seven stop conditions. | G2.5, G3; P01 shape |
| Cross-refs | Points to the owning skills, gates, rules, and packs. | The pack duplicates or contradicts them. | No; ids replace restatement. | Priority order; N00/N01 |
| `manifest.json` | Eight-key contract: identity, deps, files, hashes, command, upgrade. | The pack cannot be listed or verified. | No; exact schema is the contract. | Release manifest; P02-P07 contract |
| `selftest.mjs` | Offline proof of packaging, encoding, caps, sections, and mutations. | "Stable" is an opinion; bad copies pass review. | No; 236 lines, four negative cases. | Release selftest; P01 |
| `templates/audio-brief.md` | One page to record pillars, cues, targets, licenses, review. | Every project invents a different brief. | No; slots, not prose. | P03 template pattern |
| `JUSTIFICATION.md` | Explains why each unit exists and what its removal costs. | Reviewers cannot challenge scope with evidence. | No; table is the argument. | P01 justification |
| `SOURCES.md` | Nine checked sources, counts, licenses, borrow/reject, dead ends. | Claims lose provenance; stars and licenses become hearsay. | No; exactly 9, 4/3/2. | Staging README |
| `REPORT.md` | Sizes, checks, rubric, and open questions for the reviewer. | The verdict has no measured basis. | No; evidence replaces narrative. | C03 report |

## Why a pack, not a rule or a skill

A rule is always binding and path-scoped; audio is optional and only exists once
the game has sound. A skill is a procedure an agent executes; this artifact is a
reference and checklist with no steps to run. A pack loads on demand, has a
manifest and a self-test, and can be replaced without touching the rule set or a
skill's flow. Project docs are lower in the priority order and are not validated.

## Design decisions

- Targets and evidence, not tools: no DAW, vendor, codec product, or store is
  named; the project records its choice.
- One cue table is the source of truth; gameplay emits ids, never paths.
- A small fixed bus graph (music, SFX, UI, voice, ambience) with independent
  volume, mute, and meter.
- Loudness follows EBU R128 integrated loudness plus true peak, not peak
  normalization.
- Licensing is a row before the asset enters the build; attribution ships.
- No runtime code, no engine API, no publish or spend.
- The self-test runs offline and proves packaging, not audio quality.

## Rejected alternatives

- An audio engine wrapper: duplicates N00/N01 and locks the project to one API.
- An importer or asset pipeline: engine-owned, and the pack must not prescribe it.
- A vendor or DAW guide: ages quickly and violates the no-vendor rule.
- A database of free assets: license risk, stale links, and curation cost.
- Copying the release pack: wrong domain and would restate release steps.
- A full mixing tutorial: too long for 1,500 tokens and not a checklist.

## Limits and risks

- Targets may not match a store or platform spec; the stricter current spec wins.
- 50 ms input-to-audible is a target, not a guarantee on low-end browsers; measure.
- Loudness, loop seams, and mix quality need a human; the self-test cannot hear.
- License rows can go stale; expiring terms need a replacement before release.
- No cue-table schema is enforced; projects may diverge in field names.
- The pack does not choose a runtime format; engine support decides.

## Size

| File | Bytes | Lines | Tokens (chars/4) |
|---|---|---|---|
| `PACK.md` | 5,948 | 139 | 1,487 |
| `manifest.json` | 517 | 15 | 129 |
| `selftest.mjs` | 8,674 | 236 | 2,169 |
| `templates/audio-brief.md` | 1,932 | 50 | 483 |
| `JUSTIFICATION.md` | measured in REPORT | - | - |
| `SOURCES.md` | measured in REPORT | - | - |
| `REPORT.md` | measured in REPORT | - | - |

## Integration

Copy `artifact/library/packs/audio/` to `library/packs/audio/`; the manifest lists
every file except itself and hashes match. The pack requires `core` and `game`,
loads on demand, and has no upgrade path. S10-S13 and G2.5/G3 may cite it; no
rule, skill, or engine contract changes.
