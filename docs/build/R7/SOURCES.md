# R7 — Sources

Stars were read from the GitHub API on 2026-11-25 with an authenticated `gh api repos/<owner>/<repo> --jq '.stargazers_count'`; unauthenticated `curl` to api.github.com returns 403 in this environment. Nothing is copied: the quotes are short citations, everything else is synthesis.

## Gamedev (4)

### 1. bevyengine/bevy — 49,998 stars

- URL: https://github.com/bevyengine/bevy
- Artifact: https://bevy.org/learn/contribute/introduction/ — the "Project Information" development-process goals.
- Quote: "Rapid experimentation over API stability: We need the freedom to experiment and iterate in order to build the best engine we can." Also: "Don't merge major changes or new features unless we have relative consensus that the design is correct and that we have the developer capacity to support it."
- Analogous to: a studio that protects room to experiment before a decision hardens into a public interface.
- Borrowed: experimentation is protected before the interface freezes (the tinker budget); consensus precedes a merge, so judgment comes after the work exists (the critic after the set).
- Rejected: "Consistent vision … takes precedence over democratic and/or decentralized processes." A single vision is right for a game, but it can veto options, not generate them; cited alone it becomes the reason to skip divergence.
- Note: R1 cites the same repository, different page ("Opening Pull Requests"); the rubric allows reuse when the artifact differs.

### 2. godotengine/godot-proposals — 1,464 stars

- URL: https://github.com/godotengine/godot-proposals
- Artifact: `.github/ISSUE_TEMPLATE/feature_proposal.yml`.
- Quote: "Don't write your problem as \"I need flour\", write \"I want to bake a cake\"."
- Analogous to: an intake form that separates the problem from the first proposed solution before anyone evaluates it.
- Borrowed: state the problem, not the first solution; search prior art before proposing; a proposal that cannot be acted on is closed rather than ranked.
- Rejected: the upvote and volume gates. Popularity is not a design criterion; the set is judged by the critic, not by a count.
- Honest caveat: the proposals repository is small, but it is the official intake for godotengine/godot (~121k stars), so the count understates its reach.

### 3. Anuken/Mindustry — 29,971 stars

- URL: https://github.com/Anuken/Mindustry
- Artifact: `CONTRIBUTING.md`.
- Quote: "Do not make large changes before discussing them first."
- Analogous to: a gate that forces a conversation before a large change.
- Borrowed: the gate exists for big moves; here the "discussion" is the written set, not a chat thread.
- Rejected: discussion in chat only. It leaves no set behind, and a solo developer has no thread to consult; the artifact replaces the thread.

### 4. CleverRaven/Cataclysm-DDA — 13,576 stars

- URL: https://github.com/CleverRaven/Cataclysm-DDA
- Artifact: `doc/design-balance-lore/design-doc.md` and the gameplay design page beside it.
- Quote: "The core tenet of Dark Days Ahead game design and balance is that if it works in reality, it should work in the game." Also: "The player can interact with the game world in a huge number of ways."
- Analogous to: a project that takes its reference from outside games (reality) and measures itself by how much the player can combine.
- Borrowed: an outside domain as the distant reference; interaction density as the quality measure (links, not system count); the lore may be adjusted "to make room" for a great idea, which is the tolerance the alive-but-illegible extension needs.
- Rejected: reality as a universal pillar. It produces simulation, not necessarily a game; the rule borrows the reference, not the tenet.

## Software (3)

### 5. rust-lang/rfcs — 6,643 stars

- URL: https://github.com/rust-lang/rfcs
- Artifact: the RFC template (`0000-template.md`) with its "Alternatives", "Prior art" and "Unresolved questions" sections; the process runs discussion, then a final comment period, then a decision.
- Quote: the section headings "Alternatives", "Prior art", "Unresolved questions".
- Analogous to: a change proposal that cannot be filed without alternatives and prior art, and cannot be decided while discussion is open.
- Borrowed: alternatives and prior art are mandatory fields; the decision waits for the comment period to close; unresolved questions may stay open.
- Rejected: the numbered RFC archive and team sign-off. A solo project has no team to sign, and the archive is bureaucracy the rule cannot afford.

### 6. adr/madr — 2,666 stars

- URL: https://github.com/adr/madr
- Artifact: `template.md` with "Considered Options", "Pros and Cons of the Options" and "Decision Outcome".
- Quote: the section headings "Considered Options", "Pros and Cons of the Options", "Decision Outcome".
- Analogous to: a decision record that keeps the rejected options and their trade-offs next to the choice.
- Borrowed: rejected options stay in the record with pros and cons (record the surprising result, not only the winner); one page is enough for a decision, which matches D03.
- Rejected: the full ADR lifecycle and status machinery. D03 already owns the decision record; a second process would compete with it.

### 7. kubernetes/enhancements — 3,991 stars

- URL: https://github.com/kubernetes/enhancements
- Artifact: the KEP template, with "Alternatives" and "Graduation Criteria" and its alpha, beta and stable stages.
- Quote: the section headings "Alternatives", "Graduation Criteria".
- Analogous to: a proposal that can live in an early stage while it proves itself, with the criteria written before the stage begins.
- Borrowed: staged graduation. G1's one extension is a stage with a criterion, not an indefinite limbo.
- Rejected: KEP numbering, reviewer rotas and the multi-file process. None of it survives contact with a one-person project.

## AI-agent workflow (2)

### 8. obra/superpowers — 326,367 stars

- URL: https://github.com/obra/superpowers
- Artifact: `skills/brainstorming/SKILL.md`.
- Quote: "Lay out the approaches in a message of their own, and have your human partner pick one." Also, on cheap probes: "a spike they said yes to (see Spike to feel things out)".
- Analogous to: an agent that presents alternatives as a set before anything is implemented, and uses a spike to feel out an option cheaply.
- Borrowed: alternatives are laid out as a set before one is picked; a spike is a cheap, uncommitted probe, which is what the `spark` pass is.
- Rejected: one-question-at-a-time dialogue. R2 batches up to three questions with recommendations; duplicating the interview here would make the rule a second procedure.

### 9. bmad-code-org/BMAD-METHOD — 55,731 stars

- URL: https://github.com/bmad-code-org/BMAD-METHOD
- Artifact: `skills/core-tools/bmad-brainstorming/SKILL.md` and `references/converge.md`.
- Quote: "Never run convergence while ideas are still flowing, and never let it leak into a generating batch — premature judgment is what kills good ideas." Also: "The best sessions end with the user surprised by what came out." And: "keeping the two apart is the point."
- Analogous to: a two-phase facilitation method that refuses to judge during generation and treats surprise as the success signal.
- Borrowed: divergence and convergence are separate phases; no judgment while generating; surprise is the outcome to record.
- Rejected: the 100+ idea target and the named convergence techniques (affinity clustering, impact–effort, NUF, dot vote, PMI, MoSCoW). S06 owns the procedure, and twenty is the floor a solo developer will actually reach.

## Considered, not counted

| Repository | Stars | Why it is not one of the nine |
|---|---|---|
| humanlayer/humanlayer | 12,956 | Separates research from planning, but the artifact is a command checklist, not a way to widen a design set. |
| munificent/game-programming-patterns | 4,583 | Last push 2024-07-21; too stale for a list that claims to be current. |
| OpenRA | 17,834 | Contributing docs gate changes, but no divergence artifact to borrow. |
| joelparkerhenderson/architecture-decision-record | 17,521 | A collection of links; MADR is the specific template this rule needs. |
| Roobyx/awesome-game-design | 723 | An index of links, not a process. |
| DY-2026/GameDesignOS | 461 | Too small and too young to cite as evidence. |

## Dead ends encountered

- `Unity-Technologies/open-project-1` — returns 404; the repository is gone.
- `Cataclysm-DDA/Cataclysm-DDA` — 404; the project lives under `CleverRaven`, which is why the owner matters in the citation.
- `bevyengine/bevy` `CONTRIBUTING.md` — a stub pointing at the website; the quoted artifact is the website page.
- `luanti` `CONTRIBUTING.md` — empty or unavailable at fetch time; `doc/direction.md` states a direction, not a way to generate options.
- `OpenRCT2` `docs/` — save-format documentation only, no design process.
- Unauthenticated `curl https://api.github.com/...` — HTTP 403; stars were collected with `gh api` instead. The PowerShell `curl` alias also behaved differently from `curl.exe`.
