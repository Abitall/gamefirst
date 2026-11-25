# G0 sources

Nine repositories read on 2026-11-25: 4 gamedev, 3 software, 2 AI-agent. Stars
are GitHub counts on that date. Each entry names the analogous artifact, quotes
it verbatim, and states what G0 borrowed and what it rejected. Nothing is copied:
the page is a synthesis, and no sentence from a source appears in it.

Reused sources (5 of 9) are disclosed per entry: S06 already cited a different
file from the same repository, so the artifact below is new evidence.

## Gamedev

### 1. Donchitos/Claude-Code-Game-Studios

- URL: https://github.com/Donchitos/Claude-Code-Game-Studios
- Stars: 40887
- License: MIT
- Analogous artifact: `.claude/docs/director-gates/cd-pillars.md`;
  `.claude/docs/templates/pitch-document.md`
- Quote: "an overall verdict: APPROVE (strong), CONCERNS [list] (needs
  sharpening), or REJECT (weak — pillars do not carry weight)"
- Quote: "[One powerful sentence. If someone reads nothing else, this should make
  them curious.]"
- Borrow: explicit criteria per item followed by one verdict; a single hook
  sentence; audience named before features.
- Reject: the three-label verdict (G0 decides go or revise), and the pitch
  sections on market timing and comparable sales.
- Reuse: S06 cited `templates/game-brief.md`; this entry uses the gate and pitch
  files, a different artifact.

### 2. 2DGD-F0TH/2DGD_F0TH

- URL: https://github.com/2DGD-F0TH/2DGD_F0TH
- Stars: 471
- License: CC BY-NC-SA 4.0 (LICENSE; GitHub API reports NOASSERTION)
- Analogous artifact:
  `chapters/003_Project_Management/001_Basics/004_Common_Errors.md`
- Quote: `usually due to having "too much ambition"`
- Quote: `lots of "started projects" and nothing finished`
- Borrow: ambition is the named failure mode, so constraints and kill criteria
  are mandatory rather than optional.
- Reject: the motivational essay form and the absence of any decision procedure.
- Reuse: S06 cited `002_GDD.md`; this entry uses the common-errors chapter.

### 3. zenstory-ai/novel-to-game

- URL: https://github.com/zenstory-ai/novel-to-game
- Stars: 1251
- License: MIT
- Analogous artifact: `skills/game-design/references/concept-method.md`
- Quote: "有以下任一硬伤的方案直接淘汰，不用其他优点的综合分找补"
  (any hard flaw eliminates the option; other strengths do not make up for it)
- Borrow: veto items are checked before scoring, trade-offs are stated, and no
  decimal ranking is used.
- Reject: the novel-to-game pipeline and the platform monetization rules.
- Reuse: S06 cited the same file for the variation method; G0 uses only its
  elimination rule, not its generation steps.

### 4. godotengine/godot-proposals

- URL: https://github.com/godotengine/godot-proposals
- Stars: 1464
- License: MIT
- Analogous artifact: `TRIAGE-AND-REVIEW.md`
- Quote: "close a proposal immediately if it's not valid, is missing key details,
  or is a duplicate"
- Quote: label "Rejected: Out of Scope"
- Borrow: incomplete input is closed, not patched; "out of scope" is a normal
  outcome, which supports the non-goals field.
- Reject: the public issue workflow, label taxonomy and project board.
- Reuse: S06 cited the issue template; this entry uses the triage policy.

## Software

### 5. architecture-decision-record/architecture-decision-record

- URL: https://github.com/architecture-decision-record/architecture-decision-record
- Stars: 17521
- License: NOASSERTION; `LICENSE.md` offers CC BY-NC-SA 4.0 or OGL-UK-3.0
- Analogous artifact:
  `architecture-decision-record.github.io/src/content/locales/en-001/templates/decision-record-template-by-michael-nygard.md`
- Quote: "What is the status, such as proposed, accepted, rejected, deprecated,
  superseded, etc.?"
- Borrow: a decision carries a status and a record, and a rejected decision stays
  on file.
- Reject: the Context/Consequences sections, because D03 owns decision records.
- Reuse: not used by S06.

### 6. rust-lang/rfcs

- URL: https://github.com/rust-lang/rfcs
- Stars: 6643
- License: Apache-2.0
- Analogous artifact: `0000-template.md`
- Quote: "What parts of the design do you expect to resolve through the RFC
  process before this gets merged?"
- Borrow: split what is settled now from what a later step resolves, and make
  open questions explicit.
- Reject: RFC stages, the long rationale and the alternatives section.
- Reuse: not used by S06.

### 7. kubernetes/enhancements

- URL: https://github.com/kubernetes/enhancements
- Stars: 3991
- License: Apache-2.0
- Analogous artifact: `keps/NNNN-kep-template/README.md`
- Quote: "Listing non-goals helps to focus discussion"
- Borrow: non-goals are required, not optional, and graduation criteria are
  stated up front.
- Reject: the KEP yaml, milestone fields and production-readiness review.
- Reuse: not used by S06.

## AI-agent

### 8. bmad-code-org/BMAD-METHOD

- URL: https://github.com/bmad-code-org/BMAD-METHOD
- Stars: 55732
- License: MIT per `LICENSE` (GitHub API reports NOASSERTION)
- Analogous artifact:
  `skills/method/bmad-agent-analyst/assets/template-brief.md`
- Quote: "Why to build a product, or pitching it, in a page or two."
- Quote: frontmatter `status: draft`, and `not_for` naming `prd`
- Borrow: a brief is one to two pages, starts as a draft, says what it is not,
  and is done when a reader can say what, who and why.
- Reject: the executive summary, the "why now" section and the facilitation
  order.
- Reuse: S06 cited the brainstorming skill; this entry uses the brief template.

### 9. langchain-ai/langgraph

- URL: https://github.com/langchain-ai/langgraph
- Stars: 45415
- License: MIT
- Analogous artifact: `libs/prebuilt/langgraph/prebuilt/interrupt.py`
- Quote: "This controls the available interaction options when the graph is
  paused for human input."
- Borrow: a human pause offers named options; G0 offers exactly two, go or
  revise, plus one line of text.
- Reject: the graph runtime, checkpoints and state machine machinery.
- Reuse: not used by S06.

## Reuse disclosure

Five repositories were already cited by S06: Donchitos (game brief), 2DGD
(`002_GDD.md`), zenstory (concept method), godot-proposals (issue template) and
BMAD (brainstorming skill). Each entry above names a different file from the same
repository, which is why the artifact is new evidence rather than a repeat. The
other four are fresh to G0.

## Dead ends

- bevyengine/rfcs: 116 stars, last push 2025-06. Too small and too old for a 2026
  evidence set.
- o3de/o3de: 9920 stars, NOASSERTION; a tree scan found no concept or gate
  artifact.
- godotengine/godot: the proposal process lives in godot-proposals, so citing the
  engine repo would point at the wrong artifact.
- gsd-build/get-shit-done: 64113 stars, MIT, last push 2026-05. Stale for this
  window and no concept-brief artifact.
- gheja/game-design-documents and LazyHatGuy/GDDMarkdownTemplate: small and old;
  templates only, no decision rule.
- obra/superpowers, github/spec-kit, python/peps, tc39/proposals: their decision
  artifacts are proposal templates already represented by sources 6 and 7, so
  they add no new evidence.

## Use policy

All nine were read through the GitHub API without cloning. The two
share-alike/non-commercial repositories (2DGD, ADR) are quoted for evidence only;
no text is reused, so no license obligation attaches to the page.
