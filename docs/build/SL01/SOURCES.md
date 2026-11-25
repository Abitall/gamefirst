# SL01 — `/start`: sources

Thin part: two external sources and one accepted internal artifact, as the batch protocol sets for commands. The nine-repository rule in the review rubric is for library parts; a command is not a subsystem. Stars were read from the GitHub repository page on 2026-11-25 (the REST API returned 403, as in Batch 11), and are rounded as the page shows them. No code, prose, or license was copied.

## External

### 1. github/spec-kit — a capped clarification loop with a recommended answer

- URL: https://github.com/github/spec-kit
- Stars: 151.4k (2026-11-25)
- Last commit: 2026-11-25 (2,518 commits)
- License: MIT
- Artifact: `templates/commands/clarify.md`
- Quote (verified in source): "Maximum of 5 total questions across the whole session." The same command says: "Present your **recommended option** prominently at the top with clear reasoning".
- Borrowed: a hard question cap, one recommended answer per question instead of an open form, and an explicit deferred list when the cap is reached. `/start` applies the same shape with R2's smaller budget: three for the stage, one message, each with a recommendation.
- Rejected: the five-question default, the spec-ambiguity taxonomy, the one-question-at-a-time loop, and writing the answers back into a spec. `/start` asks about the stage, not a feature, and writes no document.

### 2. bmad-code-org/BMAD-METHOD — next-step help and right-sized process

- URL: https://github.com/bmad-code-org/BMAD-METHOD
- Stars: 55.7k (2026-11-25)
- Last commit: 2026-11-25 (2,374 commits)
- License: MIT
- Artifact: `README.md`
- Quote (verified in source): "run bmad-help whenever you want guidance on what comes next"; and "Right-sized process — Go directly to implementation for clear changes or add deeper planning for larger initiatives."
- Borrowed: one onboarding command that recommends what to run next, and a process depth chosen from the work rather than a menu the user must decode. That is the shape of the mode rule: no `BRIEF` -> `discuss`, before G1 -> `prototype`, after G1 -> `production`, at a gate -> `review`.
- Rejected: the persona set, the module installer, `npx` setup, the workflow tree, and the Discord/community layer. None of them changes the one screen `/start` produces.

## Internal (accepted)

### 3. A01 — partner agent

- URL: none (project artifact; the repository has no remote)
- Stars: n/a
- Path: `library/core/agents/partner.md` (accepted; authored at `staging/A01/artifact/library/core/agents/partner.md`, identical SHA-256)
- Artifact: `partner.md`
- Quote (verified in source): "STATE.md is the truth; the chat is not." and "One screen."
- Borrowed: the read-first list, the one-screen report, the question budget's owner, the mode/gate duties, and the write permissions for `STATE.md`, `BACKLOG.md`, and `DECISIONS.md`. `/start` points at A01 instead of restating those duties.
- Rejected: no text is copied. A01's full duties stay in the agent file; the command only invokes them.

## Considered and rejected

- `anthropics/claude-code` `/init` — an onboarding command, but it writes or refreshes a context file. `/start` must read and report; scaffolding is a separate act (R5). Rejected.
- `sst/opencode` — the repository redirects and its command/config paths were already judged unstable in CLI07. Rejected rather than cite a moving target.
- A game-specific "new game" command from a commercial template — the public ones either write a design document before code or ask a long interview, both contrary to R5 and R2. Rejected.

## License note

Both external sources are MIT. Only short, attributed quotes and the behavioral ideas above were used; no source code, assets, or license files were copied. The internal artifact is this project's own accepted work.
