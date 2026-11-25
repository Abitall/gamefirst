# S01 research — Sources

Selection rule: nine source repositories, split 4 gamedev / 3 software / 2
AI-agent. Stars were read from the GitHub REST API on 2026-11-25; artifact claims
were checked against the named file in each repository (README, LICENSE,
CHANGELOG or template). No source prose, code, data or asset was copied. The
borrowings below are structural ideas, restated in S01's own words.

## Gamedev (4)

| # | Repository | Stars (2026-11-25) | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 1 | [godotengine/godot-docs](https://github.com/godotengine/godot-docs) | 5,936 | Versioned documentation source: reStructuredText built with Sphinx; a branch per engine version (2.1–4.7); offline builds labelled stable, latest, 3.6 | Step 3 official docs; Step 4 version label | Read the version label before the fact; official docs are a primary source for their pinned version; cite the branch or release | Sphinx/RST toolchain, docs build, site theme |
| 2 | [godotengine/godot-proposals](https://github.com/godotengine/godot-proposals) | 1,464 | Proposal repository governed by README rules and issue/PR templates | Step 2 project-first and prior-art search; Step 6 cross-check | Search existing proposals, issues, the web and the asset library first; write the proposal yourself; state context, workarounds and related proposals; no invented facts | Proposal template, long governance, voting process |
| 3 | [Unity-Technologies/UnityCsReference](https://github.com/Unity-Technologies/UnityCsReference) | 13,082 | Reference-only C# source for Unity 7000.0.0a16; per-version branches; layout changes between versions | Step 3 source as primary evidence; Step 7 conflict resolution | A pinned-version source settles ambiguous API behavior; read the source when docs and behavior disagree; cite version and file | Compiling, modifying or redistributing the source; code reuse |
| 4 | [phaserjs/phaser](https://github.com/phaserjs/phaser) | 40,781 | Engine repository with a per-version `CHANGELOG.md` index, a Phaser 3→4 migration guide, and `types/phaser.d.ts`; package 4.2.1 | Step 3 changelog and maintained release note; Step 4 version | Cite the exact version's changelog; use the migration guide as a maintained article; use types as a source for API shape | Tutorials/API teaching, engine code, Phaser-specific content in the core layer |

## Software (3)

| # | Repository | Stars (2026-11-25) | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 5 | [rust-lang/rfcs](https://github.com/rust-lang/rfcs) | 6,643 | RFC repository with `0000-template.md`: Motivation, Prior art, Unresolved questions, Future possibilities | Step 1 question and decision; Step 7 conflicts; Brief "what would change the answer" | Prior art before a proposal; alternatives and unresolved questions; make what remains open explicit | Multi-page RFC process, governance, long templates |
| 6 | [joelparkerhenderson/architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record) | 17,521 | ADR template collection; Nygard template sections Status, Context, Decision, Consequences; many variants | Brief risks and recommendation; handoff to A02, A03, S07 | One-page dated decision record with context and consequences; research feeds the record; do not hide the losing option | 20+ variants, leadership material, license/text reuse |
| 7 | [mdn/browser-compat-data](https://github.com/mdn/browser-compat-data) | 5,801 | Machine-readable compatibility data (JSON) with per-feature version records; contribution docs point to browser source, Chromium bugs/code search, Searchfox and WebKit | Step 4 version per claim; Step 3 source or bug tracker | Every compatibility claim carries a version; when unsure, the source or bug tracker settles it; do not infer from a blog | JSON schema, browser matrix, dataset maintenance |

## AI-agent (2)

| # | Repository | Stars (2026-11-25) | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 8 | [assafelovic/gpt-researcher](https://github.com/assafelovic/gpt-researcher) | 30,905 | Multi-agent research application: planner and execution agents break a task into research questions; decision models keep useful context; reports with citations; recursive depth | Step 1 question decomposition; Step 5 claim-level citations; Brief evidence table | Split the question into decision-relevant sub-questions; keep only useful context; cite each claim; use a report skeleton | Autonomous multi-agent loop, scraping, unbounded recursion, long generated reports |
| 9 | [stanford-oval/storm](https://github.com/stanford-oval/storm) | 31,952 | Two-stage article generator: pre-writing (collect references, outline) and writing (outline + references → cited article); perspective-guided questions; simulated conversation | Step 1 questions from perspectives; Brief one-page structure; separation of research and output | Generate questions from several perspectives; finish references and outline before writing; ground every claim in a citation | Simulated dialogues, article generation, outline-to-prose automation |

## Coverage and trade-offs

- Gamedev covers four source shapes S01 relies on: official docs (1), prior-art
  discipline (2), source (3), and a versioned changelog plus types (4). It does
  not supply a game-design research method; the procedure is the synthesis in
  `SKILL.md`, not a copy.
- Software covers the decision side: alternatives and unresolved questions (5),
  the one-page record research feeds (6), and version-per-claim (7).
- AI-agent covers question decomposition and citations (8), and perspectives plus
  the separation of research from writing (9). It does not supply the labels,
  timebox or one-page limit; those come from the S01 boundary and R2/R3. Claiming
  a repository for them would invent a source.
- STORM is the oldest source: last push 2025-09-30, about 14 months before the
  read date. It is not archived and its method is stable, but a future refresh
  should replace it first if a fresher method source appears.
- Web-search ranking, scraping and search quotas are not sourced. They were
  rejected as read-only and cost risks, not overlooked.

## Not sources (inspected, rejected)

| Repository | Stars (2026-11-25) | Why rejected |
|---|---|---|
| [langchain-ai/open_deep_research](https://github.com/langchain-ai/open_deep_research) | 12,675 | Archived; an agent orchestration reference. Too heavy for a one-page brief, and an archived implementation is a weak method source |
| [nickscamara/open-deep-research](https://github.com/nickscamara/open-deep-research) | 6,300 | A Firecrawl-based clone; last push 2025-05-07. Stale and dependent on scraping |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | 85,794 | General long-horizon agent harness (research, code, create). Too broad; it would import an orchestration runtime, not a brief |

## Licensing

| Source | License | Use in S01 |
|---|---|---|
| godot-docs | CC BY 3.0 per `LICENSE.txt`; GitHub reports NOASSERTION | No docs prose copied; versioning and citation idea only |
| godot-proposals | MIT | No proposal text copied; prior-art rule restated |
| UnityCsReference | Unity Reference Only License; GitHub reports NOASSERTION | Read-only reference; no code copied, modified or redistributed |
| phaser | MIT | No code copied; changelog and version practice only |
| rust-rfcs | Apache-2.0 | No template text copied; section idea only |
| architecture-decision-record | README CC BY-NC-SA 4.0 / OGL-UK-3.0; GitHub reports NOASSERTION; templates have their own licenses | No text copied; one-page record idea only. A future quote would need the non-commercial and share-alike check |
| browser-compat-data | CC0-1.0 | No data copied; version-per-claim idea only |
| gpt-researcher | Apache-2.0 | No code or text copied; question and citation ideas only |
| storm | MIT | No code or text copied; two-stage idea only |

No source is imported here. S04 owns any import, and that step re-checks the
license before text, code or an asset enters the project (R3).
