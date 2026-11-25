# P07 sources

Nine repositories, read on 2026-11-26. Stars are the `stargazerCount` value on
each repository page on that date; the GitHub REST API answered `403 rate limit
exceeded` for this network, so the page value is the record. Licenses are the
`spdxId` in the same page metadata, cross-checked against the license file name.
No code, text, or license was copied; each entry names the idea borrowed and the
part rejected.

## Gamedev (4)

### 1. itchio/itch

- URL: https://github.com/itchio/itch
- Stars: 2,923
- License: MIT.
- Artifact type: Electron desktop client for the itch.io store.
- Analog: the store page copy fields in §Store page copy fields and the dated
  beat in §Community and launch calendar.
- Borrow: a game page is a named set of fields (cover, screenshots, tags,
  description, devlog) and an update is a dated, visible event rather than a
  silent edit; the client's job is to surface that event.
- Reject: Electron, the butler/API integration, download and update code. The
  pack has no store client and no upload path.

### 2. bevyengine/bevy-website

- URL: https://github.com/bevyengine/bevy-website
- Stars: 251
- License: MIT.
- Artifact type: Zola source for bevy.org - official news, docs, examples.
- Analog: §Claims and evidence and §Review checklist.
- Borrow: a release or launch post is written and reviewed like code before it
  publishes, and each claim in the post links to the change or artifact that
  proves it; media sits next to the text it illustrates.
- Reject: Zola, templates, the site build, and any copied post text. Only the
  review-and-link practice is reused.

### 3. OpenRA/OpenRA

- URL: https://github.com/OpenRA/OpenRA
- Stars: 17,834
- License: GPL-3.0.
- Artifact type: open-source real-time strategy engine and game.
- Analog: §Community and launch calendar; the split between the build and the
  words in §Boundaries.
- Borrow: an announcement is a dated event on a site repository that is separate
  from the game repository, and the post names the release it describes; the
  artifact and the page ship from different places on different schedules.
- Reject: engine code, mod content, GPL assets. The related site repository
  (`OpenRA/OpenRAWebsiteV3`, 20 stars) reports no detected license, so no text
  from it is reused either.

### 4. veloren/veloren

- URL: https://github.com/veloren/veloren
- Stars: 7,716
- License: GPL-3.0.
- Artifact type: open-source multiplayer voxel RPG.
- Analog: the cadence line in §Community and launch calendar and the honest-scope
  rule in §Store page copy fields.
- Borrow: cadence beats bursts - a dated post per period, screenshots of what
  actually shipped, no roadmap promises; the README carries a banner and links,
  not claims.
- Reject: Rust code, assets, the GPL source. Only the publishing rhythm is
  reused.

## Software (3)

### 5. github/opensource.guide

- URL: https://github.com/github/opensource.guide
- Stars: 15,818
- License: CC-BY-4.0. Attribution is required for derivative text; none was
  copied.
- Artifact type: guides for maintainers, including marketing, launch, and README
  chapters.
- Analog: §Store page copy fields and §Audience and positioning.
- Borrow: a landing page answers what it is, why it matters, and how to start, in
  that order; a launch is a dated event with a checklist; a claim is concrete and
  checkable.
- Reject: the guide text, its examples, and the Jekyll site. The pack states the
  same ideas in its own words and links no page of the guide.

### 6. GoogleChrome/lighthouse

- URL: https://github.com/GoogleChrome/lighthouse
- Stars: 31,205
- License: Apache-2.0.
- Artifact type: automated page audit producing scored categories and per-audit
  evidence.
- Analog: §Review checklist and the measurement column in §Claims and evidence.
- Borrow: a page review is a list of rows with pass/fail and a measured value;
  the report names what was measured, on which version, and when; a score without
  its inputs is not a claim.
- Reject: Chrome, the Node harness, and the scores themselves. A Lighthouse score
  is not a quality claim about a store page, and the pack runs no audit.

### 7. plausible/analytics

- URL: https://github.com/plausible/analytics
- Stars: 29,939
- License: AGPL-3.0.
- Artifact type: privacy-focused web analytics.
- Analog: the wishlist paragraph in §Wishlist, demo, press kit and the player
  number row in §Claims and evidence.
- Borrow: measure page-level outcomes without identities; a metric needs a
  definition, a window, and a source before a campaign starts; no personal data
  is collected to answer "did the page work".
- Reject: the self-hosted stack, the tracking script, cookies, and the dashboard.

## AI-agent (2)

### 8. humanlayer/humanlayer

- URL: https://github.com/humanlayer/humanlayer
- Stars: 12,958
- License: Apache-2.0.
- Artifact type: human-in-the-loop approval layer for agent actions.
- Analog: §Boundaries and the "a human writes and approves" clause.
- Borrow: approval is a first-class step that names the action, the target, and
  the approver; the agent prepares evidence and stops, and approval is not a
  notification after the fact.
- Reject: the SDK, the SaaS, and the approval UI. The pack ships no integration
  and no credential.

### 9. langchain-ai/langgraph

- URL: https://github.com/langchain-ai/langgraph
- Stars: 45,419
- License: MIT.
- Artifact type: agent orchestration with human-in-the-loop interrupts.
- Analog: the publish boundary in §Boundaries and the last row of the calendar.
- Borrow: an interrupt is a node in the flow - the run cannot pass it without a
  human resume, and state is checkpointed so the pause survives a restart. The
  publish step is a stop, not a reminder in a checklist.
- Reject: the framework, runtime, model configuration, and persistence layer.

## Dead ends

- The GitHub REST API answered `403 rate limit exceeded` for every repository on
  2026-11-26. Stars were read from the repository page's embedded
  `stargazerCount`, and licenses from the same metadata; no authenticated call
  was made.
- `presskit-gg/presskit`, `presskit/presskit`, `RamiIsmail/presskit` and
  `vlambeer/presskit` all return `404`. The canonical `presskit()` has no public
  repository to read, so the press-kit fields in §Wishlist, demo, press kit and
  `templates/press-kit.md` were authored from common practice, not copied.
- `veloren/blog` returns `404`; the devblog is not in the game repository. Only
  the cadence idea was borrowed, and no post text was read.
- Store documentation is not on GitHub: Steamworks (`partner.steamgames.com/doc`),
  the console partner portals, and the Apple and Google policy pages were not
  counted as sources and were not fetched. Sizes are linked to the holder
  instead of snapshotted.
- No repository in this sample ships capsule, screenshot, or trailer pixel
  specifications covering several stores. None were invented; the brief carries
  the row shape and the reader records the spec date.
- No public marketing pack with a manifest and selftest was found to copy; the
  shape follows the project's own P01 contract.
