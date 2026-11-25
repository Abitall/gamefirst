# D09 - sources

Budget: exactly 3 sources (thin research): 2 external + 1 internal accepted bundle. Counts and licences read from the GitHub REST API on 2026-11-25. No text copied; only structure and decisions were adapted.

## S1 - Maaack/godot-game-template

- URL: https://github.com/Maaack/godot-game-template
- Stars: 1759 (2026-11-25)
- Licence: MIT
- Analog: the entry README of a game-project template repository, where a stranger must go from "found this repo" to "running project" without reading the source.
- Taken: the 1-2-3 numbered installation that ends in a single "continue" link; a short pointer list to deeper documentation instead of inlining it; the rule that the first command is also the first verification.
- Rejected: the feature comparison table (the page has no room and the reader has already chosen the template); screenshots and GIFs (no stable UI; breaks the text budget); the "Existing Project" / asset-store branch (gamefirst has one supported path, `new-project`).
- Dead end: mining its setup wizard for step wording produced engine- and UI-specific instructions that do not map to a CLI plus OpenCode; only the numbered shape survived.

## S2 - othneildrew/Best-README-Template

- URL: https://github.com/othneildrew/Best-README-Template
- Stars: 16501 (2026-11-25)
- Licence: Unlicense
- Analog: the canonical structure of a project entry document; used here for section order and tone, not for content.
- Taken: the order "what it is -> getting started -> usage -> where things are"; a one-sentence project statement before any procedure; terse table rows for a command list.
- Rejected: the badge wall (no CI, no package, no release to advertise); the collapsible table of contents (the page is one screen); logo and screenshots; the Contributing / License / Contact tail (a solo local pipeline, not a community repo); the marketing "Why this template" section (the thesis line does that job in one sentence).
- Dead end: its "Built With" section has no one-page equivalent; listing the stack duplicated `AGENTS.md` and was dropped. Its badges were briefly considered as a visual anchor and rejected as noise.

## S3 - internal accepted bundle (authoritative behaviour)

- Path: `template/.opencode/commands/start.md`, `status.md`, `next.md`, `verify.md`, `retro.md`, `help.md`; `tools/new-project.mjs` (CLI01); R10 and E08 in the rule set; gate definitions G1, G2, G2.5, G3.
- Stars / licence: not applicable - project-owned parts, no third-party licence. CLI01 was accepted before this part; commands are the shipped interface.
- Analog: the specification the guide must not contradict; every factual claim on the page traces here.
- Taken: the six command names and one-line jobs; mode values and the `mode > rules > skill > pack > docs` precedence; R2's three-question cap; R10's contract fields and the `runs/AUTONOMY.jsonl` log; `BLOCKING -` as a question-and-wait stop plus E08's three-failure stop; the gate outcomes and the dated-line protocol; the file roles for `STATE`, `BRIEF`, `DECISIONS`, `BACKLOG`, `GAME`, `TASTE`; install facts (`core` always, `game` optional, new-or-empty target, 47 parts with both packs).
- Rejected: verbatim command output formats (SL02's six labels, SL06's seven) - correct but too long for one page; the full R1-R10 list and the E-series - `/help` and `AGENTS.md` own them; the internal pack matrix beyond the one-line note - the reader needs the flag, not the inventory.
- Dead end: trying to describe an engine-pack install route failed because v0.3's `new-project` implements `core,game` only; the page stays silent rather than promising a command that does not exist.
