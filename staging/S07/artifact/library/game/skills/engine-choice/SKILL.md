---
name: engine-choice
description: Choose, pin, and record an engine with a weighted matrix and a one-day spike. Use at project start, on a platform or scale change, or a suspected mismatch; not for a feature inside a chosen engine.
allowed-tools: Read, Write, Edit, Glob, Grep, WebFetch, WebSearch, Bash
---

# engine-choice

S07: an engine is expensive to replace. Score it, spike it, pin it, name the way out. Core stays engine-agnostic; engines are packs (N00).

## Trigger

- No engine chosen yet.
- A new platform or a much larger scale.
- A suspected mismatch: a failure that returns to the engine after three attempts (E08, R6).
- Not a feature inside a chosen engine: A03 builds it, the pack governs it.

## Inputs

Genre; target platforms and stores; 2D or 3D; frame and memory target; team skills; ecosystem needs (physics, netcode, localization); art pipeline; license and budget. Write them before scoring: an unstated input becomes taste.

## Steps

1. **Split the list.** A must-have vetoes a candidate that misses it; nice-to-haves carry weight 1-3. A must-have the current engine misses feeds the R6 case for migrating.
2. **Score 3-5 candidates** on the nice-to-haves: score 1-5, weight 1-3, total = weight x score summed. Show the table and arithmetic. No score rescues a veto.
3. **Check each finalist.** Stable or LTS version, breaking changes in release notes, known pitfalls, docs quality, export targets, license, community activity. S01 gathers it; a claim with no source is dropped (R1, R3).
4. **Spike one day on the top two** (S08, R9): the same six probes in each: input, movement, collision, UI, save, export. Record build time, iteration time, docs friction, workarounds. Keep builds and log in `evidence/` (R1); S02 runs the export check.
5. **Choose.** Top score wins unless a veto, a spike failure, or a cost the matrix missed; an override carries its reason.
6. **Record** a D03 entry: decision, why, alternatives, consequences, risks, fallback, revisit trigger. Matrix and spike log live in `docs/engine/` (D08), linked once, not copied (R5).
7. **Pin the exact version** in `AGENTS.md`; make the pack's `engineRange` include it; run the pack selftest (E11).
8. **Revisit when** a platform is added, a must-have moves, the spike's frame budget is missed, the selftest fails, or an upgrade blocks.

## Output

A D03 decision, the matrix, spike evidence in `evidence/`, the pinned version, risks, and a spiked fallback: an unspiked one is a guess.

## Boundaries

- No fanboyism: a preference with no score or spike line is logged as taste.
- No installation without the user's permission (R2, irreversible).
- No migration without R6's repeated failure or measured gap.
- No unverified claim: a version, license, or export fact without a citation stays a risk.
- No engine rule in core or game; it belongs to the pack (N00).
- No choice by popularity: stars and tutorials are community evidence, not a score.

## Cross-refs

R1 evidence, R3 sources, R6 migration gate, R9 spike budget, S01 facts, S02 export check, S08 spike day, N00 packs, D03, D08, E11.
