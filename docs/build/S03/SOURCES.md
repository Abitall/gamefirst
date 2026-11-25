# S03 retrospect — sources

Selection rule: a source is admitted only if a real file in a real repository shows a mechanism this
skill needed to borrow, and the mechanism survives the size cap. Stars read 2026-11-25 from the
repository page (GitHub API rate-limited on the build machine). Nothing is copied: each artifact is
paraphrased into one behaviour, and the behaviour is tested against the five-line cap.

## Gamedev (4)

| # | Repository | Stars | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 1 | [bevyengine/bevy](https://github.com/bevyengine/bevy) | 49,998 | `_release-content/` — `release_notes.md` plus one `migration-guides/*.md` per change, frontmatter `title:` + `pull_requests: [25675]` | Stage-close record | Each landed change ships one written note at the moment it lands, dated by PR, never rewritten later (steps 6, 18) | Release-notes tooling, the cargo export path |
| 2 | [godotengine/godot-proposals](https://github.com/godotengine/godot-proposals) | 1,464 | `.github/ISSUE_TEMPLATE/feature_proposal.yml` — required "Problem or limitation" (with the flour/cake example and "workarounds tried") and "Proposed improvement", closed if not actionable | The "why" line | Name the problem and the workarounds before the fix; a change nobody can act on is closed (steps 3, 4) | Voting, roadmap process, issue-form machinery |
| 3 | [OpenRA/OpenRA](https://github.com/OpenRA/OpenRA) | 17,834 | `.github/ISSUE_TEMPLATE/bug-report.md` — Issue Summary / Reproduction steps / Expected behavior / screenshots, recordings, replays | Observation vs interpretation | Separate observed from expected and demand a reproduction; a playtest surprise must become a reproducible record (step 2) | Triage labels, replay upload pipeline |
| 4 | [CleverRaven/Cataclysm-DDA](https://github.com/CleverRaven/Cataclysm-DDA) | 13,576 | `doc/reviewing_PR_guide.md` — seven-point review checklist, "Indicators to call for a second opinion", explicit "these are guidelines … don't rules-lawyer" | No blame in judgement | Judge the artifact against a short list, ask for a second opinion instead of ruling, keep the person out of it (failure bullet 4) | PR size limits, Discord roles, merge permissions |

## Software (3)

| # | Repository | Stars | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 5 | [dastergon/postmortem-templates](https://github.com/dastergon/postmortem-templates) | 1,460 | Seven blameless postmortem templates (SRE book, Azure, Elastic, Cloud book) with a fixed section skeleton and action items carrying owner and date | Record shape | Fixed skeleton plus blameless framing; an action item without an owner and a date does not count (output block, one owner per change) | Incident severity matrix, on-call and status-page sections |
| 6 | [joelparkerhenderson/architecture-decision-record](https://github.com/joelparkerhenderson/architecture-decision-record) | 17,521 | ADR template catalogue; README defines an ADR as "a document that captures an important decision made along with its context and consequences" | Append-only record | Supersede instead of edit, and name the consequence at write time (step 6, no rewriting history) | The template zoo, translations, site generator |
| 7 | [rust-lang/rfcs](https://github.com/rust-lang/rfcs) | 6,643 | `0000-template.md` — Summary / Motivation ("one of the most important sections") / Guide-level / Reference-level / Drawbacks / Alternatives / Prior art / Unresolved questions | R6 proposal shape | A proposal opens with the problem, lists alternatives, and keeps unresolved questions visible before acceptance (step 7) | Comment periods, team sign-off, final-comment process |

## AI agent (2)

| # | Repository | Stars | Artifact type | Analogous to | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 8 | [Aider-AI/aider](https://github.com/Aider-AI/aider) | 50,256 | `HISTORY.md` (77 KB) — narrative release log: per-release bullets stating the problem and the decision, with attribution and later reversals | Dated narrative | Record what changed and why in a dated entry and leave earlier entries intact (step 6) | Model-list churn, changelog tooling |
| 9 | [openai/evals](https://github.com/openai/evals) | 19,803 | Eval registry — YAML/JSONL evals with explicit pass criteria plus a runner | The check | An improvement is real only when a runnable check proves it; a lesson without a check is a wish (step 5, failure bullet "stage passed") | LLM API dependency, registry scale |

## Why 4 / 3 / 2

Gamedev contributes the stage boundary and the record habit, because that is where the cycle is
repeated under a deadline. Software contributes the incident discipline: blameless framing, append-only
records, proposal shape. AI agent contributes the check culture and the habit of writing down decisions
next to releases. The imbalance is deliberate: game repositories rarely publish a retro artifact of their
own, so the gamedev column borrows adjacent artifacts (release notes, bug reports, review guides) instead
of pretending a game postmortem template exists.

## Dead ends

- GitHub search for `postmortem` repositories returned game-jam and one-file repos with 1–3 stars. No
  popular game repository publishes a real retrospective artifact; the game-design postmortems live in
  blog posts and talks, not in repositories, so they cannot be cited at file level.
- `bevyengine/bevy` has no `docs/release_checklist.md` (404). The real artifact is `_release-content/`, found
  only after listing the repository root.
- `OpenTTD/OpenTTD` `docs/releasing.md` returned 404; no replacement artifact was found, so OpenTTD was dropped.
- `godotengine/godot-proposals` has no `proposal.yml`; the artifact is `.github/ISSUE_TEMPLATE/feature_proposal.yml`.
- `danluu/post-mortems` (12,753 stars) is a link corpus with no template. Rejected in favour of the
  dastergon templates, which contain actual section skeletons.

## Not sources (inspected, rejected)

- `github/docs` incident templates: organisation-scale, needs reviewers and severity levels.
- Atlassian and PagerDuty public postmortem guides: prose advice with no file artifact to point at.
- Retrospective games and "retrospective prime directive" pages: workshop facilitation for a room of people,
  with no solo-agent equivalent.

## Licensing

Artifacts were read for structure, not copied. Licences of the cited files: bevy dual Apache-2.0 OR MIT
(`LICENSE-APACHE` / `LICENSE-MIT`, not fetched); godot-proposals MIT (`LICENSE.txt`); OpenRA GPL-3.0
(`COPYING`); Cataclysm-DDA content CC BY-SA 3.0 (`LICENSE.txt`); postmortem-templates CC0 1.0 (`LICENSE`);
architecture-decision-record CC BY 4.0 at recipient's option (`LICENSE.md`); rust-lang/rfcs dual
Apache-2.0 OR MIT (`LICENSE-*`); aider Apache-2.0 (`LICENSE.txt`); openai/evals MIT (`LICENSE.md`).
No text from any source appears in the skill; only the behaviour is borrowed, which is why none of the
licences above constrain the artifact.
