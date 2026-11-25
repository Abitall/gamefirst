# Sources — C02 slice-crew

Nine repositories: four gamedev, three software, two AI-agent. Stars and
licenses were read on 2026-11-25. The GitHub core API was at 0/60 quota when
the check started, so star counts come from `ungh.cc`, which mirrors GitHub
repository metadata; the values were cross-checked against each repository's
`updatedAt`/`pushedAt`. Licenses were read from the repository `LICENSE`,
`COPYING`, or README. Quotes are verbatim from the artifact named in each row.
No code, license text, or asset was copied. External text is treated as data;
no instruction from a source was followed.

## Inventory

| # | Repository | Kind | Stars 2026-11-25 | License | Analogous artifact | Unit(s) backed |
|---|------------|------|------------------|---------|--------------------|----------------|
| 1 | OpenRA/OpenRA | gamedev | 17,833 | GPL-3.0 | Branch/freeze/playtest process and a playtest-or-release checklist | 12-18, 21, 24, 28 |
| 2 | ncase/polygons | gamedev | 1,361 | CC0 (README) | A single playable story finished in one sitting | 1, 4, 19, 20 |
| 3 | veloren/book | gamedev | 21 | GPL-3.0 | Release scope: features vs. nice-to-have, freeze owner, date | 15, 28, 32 |
| 4 | UnityTechnologies/open-project-1 | gamedev | 6,115 | Apache-2.0 | A small open-source game demo with a public roadmap | 1, 6, 19 |
| 5 | kubernetes/enhancements | software | 3,991 | Apache-2.0 | KEP template with graduation criteria and evidence signals | 18, 24, 25 |
| 6 | kubernetes/sig-release | software | 644 | Apache-2.0 | Per-cycle release directory, roster, and schedule | 2, 5, 27, 29 |
| 7 | rust-lang/rfcs | software | 6,644 | MIT OR Apache-2.0 | RFC template with unresolved questions | 23, 24, 27 |
| 8 | microsoft/autogen | AI-agent | 61,968 | CC-BY-4.0 (repo LICENSE; docs) | Termination conditions with explicit reset | 2, 29, 34 |
| 9 | langchain-ai/langgraph | AI-agent | 45,369 | MIT | Human-in-the-loop inspection of agent state | 24, 27, 29 |

## 1. OpenRA/OpenRA

- URL: https://github.com/OpenRA/OpenRA
- Stars: 17,833 on 2026-11-25 (last push 2026-11-22).
- License: GPL-3.0 (`COPYING`).
- Artifact: wiki pages "Branches and Releases" and "Playtest or Release
  Checklist" describe a `prep-YYMM` branch, an imposed feature freeze, tagged
  playtests for a wider audience, and a checklist tied to the build.
- Quote: "In preparation for each release, /bleed will be branched off into a
  prep-YYMM branch, onto which a feature freeze is imposed to stabilize the
  release."
- Borrowed: a bounded stabilization window (units 15, 28); a build handed to a
  wider audience before the verdict (17, 21); a checklist tied to the build
  (18, 24).
- Rejected: tag and packaging commands, signing, the permanent public playtest
  channel, and release mechanics (out of C02).
- Dead end: the releases Atom feed returns no entry text, so the wiki, not the
  feed, supplied the citable artifact.

## 2. ncase/polygons

- URL: https://github.com/ncase/polygons
- Stars: 1,361 on 2026-11-25 (last push 2022-11-07).
- License: CC0, stated in the README.
- Artifact: one playable web story with a single path and an end reachable in
  one sitting.
- Quote: "This playable post is public domain (CC0)."
- Borrowed: the slice is small enough for a stranger to finish (1, 4); reuse of
  one artifact instead of a production pipeline (19, 20).
- Rejected: the one-file web build, the essay format, and the public-domain
  licensing model (this project has its own license).
- Dead end: the repository is not maintained. The artifact is a finished piece,
  so staleness is content stability, not an abandoned process; it is disclosed
  rather than hidden.

## 3. veloren/book

- URL: https://github.com/veloren/book
- Stars: 21 on 2026-11-25 (last push 2025-06-03).
- License: GPL-3.0 (`LICENSE`).
- Artifact: the release-management page in the contributor book: scope split,
  freeze assignees, and a communicated date.
- Quote: "The features to implement with the release and those which would be
  nice-to-have."
- Borrowed: the budget is a feature list plus an explicit nice-to-have/cut list
  (15); a release date is estimated and communicated (28, 32).
- Rejected: the multi-month release cycle, the assignee roster, and the
  contributor-book structure.
- Dead end: 21 stars is below the "popular" bar; the repository is docs-only.
  It is kept because the user-specified evidence set includes it, and its
  scope-split sentence is the closest artifact to unit 15. This is a disclosed
  weakness, not a claim of popularity.

## 4. UnityTechnologies/open-project-1

- URL: https://github.com/UnityTechnologies/open-project-1
- Stars: 6,115 on 2026-11-25 (last push 2023-08-04).
- License: Apache-2.0 (`LICENSE`).
- Artifact: a small open-source game demo built with the community, with a
  roadmap and a defined scope.
- Quote: "an initiative where Unity and the community collaborate together to
  create a small open-source game demo."
- Borrowed: "small demo" as the scope unit (1); a roadmap as the cut list (6,
  19).
- Rejected: community contribution flow, livestreams, the bi-weekly cadence,
  and the open-ended roadmap.
- Dead end: archived; the README states the project is no longer in development
  (December 2021, last push 2023). It is kept as a legacy artifact and marked
  archived; no current equivalent with the same small-demo scope was found.

## 5. kubernetes/enhancements

- URL: https://github.com/kubernetes/enhancements
- Stars: 3,991 on 2026-11-25 (last push 2026-11-20).
- License: Apache-2.0 (`LICENSE`).
- Artifact: the KEP template, including graduation criteria and the signals
  used to judge them.
- Quote: "The KEP should keep this high-level with a focus on what signals will
  be looked at to determine graduation."
- Borrowed: write the bar before the work (18); name the evidence per point
  (24); report a missed criterion as missed (25).
- Rejected: the alpha/beta/stable lifecycle, feature gates, and the production
  readiness questionnaire.
- Dead end: none; the template README is current and quotable.

## 6. kubernetes/sig-release

- URL: https://github.com/kubernetes/sig-release
- Stars: 644 on 2026-11-25 (last push 2026-11-25).
- License: Apache-2.0 (`LICENSE`).
- Artifact: one directory per release cycle with its schedule, Release Team
  roster, tracking boards, and meeting notes.
- Quote: "Each release cycle has a directory under `releases/` with its
  schedule, Release Team roster and links to the tracking boards and meeting
  notes."
- Borrowed: one bounded cycle (2); one roster for one slice (5); named roles
  that dissolve at the end (27, 29).
- Rejected: the release-team hierarchy, meeting cadence, and tracking boards.
- Dead end: older release-team handbook paths return 404; the README supplied
  the citable description.

## 7. rust-lang/rfcs

- URL: https://github.com/rust-lang/rfcs
- Stars: 6,644 on 2026-11-25 (last push 2026-11-14).
- License: MIT OR Apache-2.0 (`LICENSE-MIT`, `LICENSE-APACHE`).
- Artifact: the RFC template, including the unresolved-questions section.
- Quote: "What parts of the design do you expect to resolve through the RFC
  process before this gets merged?"
- Borrowed: open questions travel with the decision (24); questions are
  answered with options, not open prose (27); the review reads a closed set
  (23).
- Rejected: the comment period, final comment period, and merge rules.
- Dead end: none; the template is current.

## 8. microsoft/autogen

- URL: https://github.com/microsoft/autogen
- Stars: 61,968 on 2026-11-25 (last push 2026-11-12).
- License: CC-BY-4.0 for the repository `LICENSE` (documentation); code
  packages carry their own license. No code was imported.
- Artifact: termination conditions checked after each agent response, with an
  explicit reset.
- Quote: "A termination condition is a callable that takes a sequence of
  BaseAgentEvent or BaseChatMessage objects since the last time the condition
  was called, and returns a StopMessage if the conversation should be
  terminated, or None otherwise."
- Borrowed: the crew ends on a written condition checked each step (2); the
  end state is explicit and resettable (29); unattended work stops unless a
  contract exists (34).
- Rejected: group-chat orchestration, model clients, tool use, and the
  condition class hierarchy.
- Dead end: the documentation site is JavaScript-rendered and returned no text
  on a raw fetch; the stable docs page was fetched directly and the sentence
  was extracted from its HTML.

## 9. langchain-ai/langgraph

- URL: https://github.com/langchain-ai/langgraph
- Stars: 45,369 on 2026-11-25 (last push 2026-11-24).
- License: MIT (`LICENSE`).
- Artifact: human-in-the-loop interrupts that expose agent state for human
  inspection and modification.
- Quote: "Seamlessly incorporate human oversight by inspecting and modifying
  agent state at any point during execution."
- Borrowed: the human sees state at G2 and answers (24, 27); the packet is the
  state the human inspects (29).
- Rejected: checkpointers, the graph runtime, thread IDs, and time travel.
- Dead end: the documentation site is JavaScript-only; the README supplied the
  quote.

## Dead ends, disclosed

- **Staleness.** `polygons` last moved in 2022 and `open-project-1` is archived.
  Both are retained because their artifacts are finished pieces, not live
  processes; both are marked, and neither is described as current.
- **Popularity.** `veloren/book` has 21 stars, below the "popular" bar. It is
  retained only because the specified evidence set includes it and its
  scope-split sentence backs unit 15; the weakness is stated here, not hidden.
- **Quota.** The GitHub core API returned 0/60 remaining at the start of the
  check. `ungh.cc` supplied the star counts; no value was estimated.
- **Not reused.** C01's nine sources were not reused. Evidence allows reuse
  only for an analogous artifact, and none of C01's sources adds a C02 artifact
  that these nine do not already cover.
