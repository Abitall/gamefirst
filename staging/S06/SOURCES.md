# S06 - Sources

Nine public repositories read on 2026-11-25 (stars via authenticated `gh api repos/<owner>/<repo>`), split 4 gamedev / 3 software / 2 AI-agent workflow. Everything below was read for method; nothing is copied — no sentence, list or template from these repos appears in the artifact.

Two entries (2 and 9) are also cited in R7 for different artifacts; the reuse is named in each row rather than hidden.

## Gamedev (4)

### 1. Donchitos/Claude-Code-Game-Studios — 40,885 stars
- URL: https://github.com/Donchitos/Claude-Code-Game-Studios
- License: MIT · pushed 2026-11-09
- Artifact: `.claude/docs/templates/game-brief.md`; `.claude/skills/brainstorm/SKILL.md`
- Quote: "Keep it to one screen ('In your words' does not count)." and "If a field needs a second paragraph, you're writing a GDD, not a brief."
- Analogous to: S06's one-page `BRIEF.md`, and the shape of this skill's step 7.
- Borrowed: the brief is one screen; the user's own words are never rewritten; six required fields including a kill condition; "riskiest first" as the build order; more than about seven features is not an MVP.
- Rejected: the agent asks for a full brief before generating anything (no set first); its feature list and build order belong to scope, not to S06.

### 2. godotengine/godot-proposals — 1,464 stars
- URL: https://github.com/godotengine/godot-proposals
- License: MIT · pushed 2026-09-15
- Artifact: `.github/ISSUE_TEMPLATE/feature_proposal.yml`
- Quote: "Don't write your problem as \"I need flour\", write \"I want to bake a cake\"."
- Analogous to: step 1, restating the goal instead of restating the solution.
- Borrowed: the problem is stated before the proposal, in the user's situation; one problem per proposal; a missing motivation closes the proposal.
- Rejected: the form demands a fully specified solution with mock-ups before discussion — that is convergence, and S06 has to stay open at this stage. Also cited by R7 for the problem-first form; here only the goal-vs-solution split is used.

### 3. 2DGD-F0TH/2DGD_F0TH — 471 stars
- URL: https://github.com/2DGD-F0TH/2DGD_F0TH
- License: CC BY-NC-SA (API reports NOASSERTION) · pushed 2026-11-17 · read only, no text reused (NC)
- Artifact: `chapters/003_Project_Management/002_GDD.md`
- Quote: "This section should not be longer than a couple paragraphs."
- Analogous to: the length ceiling on the brief, and the boundary between brief and GDD.
- Borrowed: the description of the project fits a couple of paragraphs; a design document may live in many forms; technical matters belong in a separate document.
- Rejected: the chapter's full GDD section list (characters, storyline, progression) — S06 produces no GDD.

### 4. zenstory-ai/novel-to-game — 1,251 stars
- URL: https://github.com/zenstory-ai/novel-to-game
- License: MIT · pushed 2026-11-25
- Artifact: `skills/game-design/SKILL.md`, `skills/game-design/references/concept-method.md`
- Quote: "Turns SOURCE_BIBLE and PRODUCT_BRIEF into separate CONCEPT, GAME_DESIGN, and ART_DIRECTION specs stage by stage without writing code."
- Analogous to: the stage order S06 sits in — concept before design, no code in either.
- Borrowed: a concept stage that exists as its own artifact before any design spec; the stage refuses to write code; a named profile (system-led / narrative-led / hybrid) decides what the concept must promise.
- Rejected: the pipeline assumes a source novel and a Chinese-language workflow; its body text did not survive fetching (mojibake), so nothing inside it is relied on beyond the stage contract above.

## Software (3)

### 5. golang/proposal — 3,459 stars
- URL: https://github.com/golang/proposal
- License: BSD-3-Clause · pushed 2026-10-16
- Artifact: `design/TEMPLATE.md`
- Quote: "## Background — An introduction of the necessary background and the problem being solved by the proposed change."
- Analogous to: the brief's opening — the problem, then the proposal, then what was not solved.
- Borrowed: Background before Proposal, Rationale that names alternatives and their trade-offs, and an explicit "Open issues" section for what the author cannot yet answer.
- Rejected: the one-to-three-page design doc and the compatibility section — S06 writes one page and no engineering commitments.

### 6. python/peps — 5,043 stars
- URL: https://github.com/python/peps
- License: none detected by the API (PEP text carries its own terms) · pushed 2026-11-23
- Artifact: `peps/pep-0001.rst` (PEP purpose and status set), PEP template sections
- Quote: no verbatim line quoted; the fetch returned headings and the status vocabulary (Draft, Accepted, Rejected, Withdrawn).
- Analogous to: the brief as a document that is allowed to be Rejected and stay on the record.
- Borrowed: a proposal has a status, and "Rejected" is a normal end state that keeps the reasoning; a rejected idea is closed with its reason, not deleted.
- Rejected: the numbered, formal, multi-section PEP body; the status ceremony around accepting a PEP.

### 7. tc39/proposals — 19,204 stars
- URL: https://github.com/tc39/proposals
- License: none detected by the API · pushed 2026-11-16
- Artifact: `README.md` (stage list), `stage-0-proposals.md`
- Quote: "Stage 0 Proposals", from the README's link list.
- Analogous to: the brief as a draft at stage zero — written down so it can be argued about, not frozen.
- Borrowed: an idea advances by evidence, not by the confidence of its author; a one-page README per proposal is the unit; stage zero is explicitly a strawman.
- Rejected: the four-stage committee process and its advancement criteria — G2.5 owns freezing here.

## AI-agent workflow (2)

### 8. github/spec-kit — 151,357 stars
- URL: https://github.com/github/spec-kit
- License: MIT · pushed 2026-11-25
- Artifact: `templates/spec-template.md`; `templates/commands/clarify.md`
- Quote: "**Status**: Draft" and "Each user story/journey must be INDEPENDENTLY TESTABLE".
- Analogous to: the draft status of `BRIEF.md`, and questions whose answers are written back into the document.
- Borrowed: every artifact opens as Draft; each clarification question carries a recommended answer and the answer is written into the spec so it is not asked twice; stories are prioritised P1-P3.
- Rejected: `clarify` allows five questions per round and repeats rounds — R2 caps at three, once. User stories and acceptance scenarios belong to stories, not to a one-page brief.

### 9. bmad-code-org/BMAD-METHOD — 55,731 stars
- URL: https://github.com/bmad-code-org/BMAD-METHOD
- License: the API reports NOASSERTION (the repository ships its own licence text) · pushed 2026-11-25
- Artifact: `skills/core-tools/bmad-brainstorming/SKILL.md`; `references/converge.md`
- Quote: "The best sessions end with the user surprised by what came out."
- Analogous to: step 8 (record the surprise) and step 5 (converge on three).
- Borrowed: surprise is the success test of a session, not the number of ideas; the stance is chosen once and holds for the run (which is what "you decide" authorises); convergence names clusters before it ranks.
- Rejected: the three facilitator stances as a setup ritual, the technique catalogue and its scripts, and the per-project configuration the skill requires before it can start. R7 already cites this repo for divergence rules; here only the surprise test and the converge step are used.

## Considered, not counted

| Repo | Stars | Why not counted |
|---|---|---|
| obra/superpowers | 326,394 | `skills/brainstorming/SKILL.md` is the strongest AI-agent precedent, but R7 already draws its "alternatives as a set" and spike framing from it; second use adds no new artifact. |
| anthropics/skills | 200,364 | Large, but contains no brainstorming or brief skill after a tree scan; the closest artifacts are tool-use concepts. |
| kociden/sakurai-skill | 590 | Unofficial distillation of 257 Sakurai videos; the planning and mindset references are on point, but no licence is declared in the repo, so nothing could be reused and the artifact could not be cited safely. |
| mhgolkar/Arrow | 1,376 | Narrative design tool, not an ideation method; last push 2025-09. |
| bevyengine/rfcs | 116 | Correct artifact (design RFC with mandatory Alternatives), too small and stale (2025-06) to count as precedent. |
| o3de/o3de | 9,919 | Tree scan found no RFC or proposal template. |
| ellisonleao/magictools | 17,871 | Resource list; no process. |
| godotengine/godot | 120k+ | No in-tree design method; the proposal process lives in the repo counted above. |

## Dead ends encountered

- `mhgolkar/Arrow` README could not be read: the contents API returned a payload that failed base64 decoding twice; the repo was dropped rather than guessed at.
- `zenstory-ai/novel-to-game` skill bodies are Chinese and arrived as mojibake; only the English frontmatter description was usable. Recorded, not reconstructed.
- `o3de/o3de`: no `rfc` or `proposal` path in the tree, despite an RFC-shaped contribution process being expected.
- `anthropics/skills`: scanned for a brainstorming skill and found none; the repo is large but not on-topic for S06.
- Small GDD-template repos (`gheja/game-design-documents` 78 stars, stale 2019; `LazyHatGuy/GDDMarkdownTemplate` 64; `gamedevpl/game-design-document` 26) were rejected on age and size before reading.
- Game repositories checked for in-tree design docs and found to have none usable: OpenTTD, Wesnoth, FreeOrion, Space Station 14, OpenRA, Widelands, Endless Sky, 0 A.D. Their `docs/` hold technical or contribution guides, not ideation.
- `python/peps` and `tc39/proposals` declare no licence the API recognises; both were read for structure only, and no text is reused.
