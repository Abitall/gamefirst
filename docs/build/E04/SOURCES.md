# E04 — question budget: sources

Nine repositories: four game development, three software, two AI-agent. Stars were read from the GitHub API on 2026-11-25 and rounded. No source code is copied; each entry names the artifact that informed the eval and what was borrowed or rejected.

## Game development

### godotengine/godot-proposals
- URL: https://github.com/godotengine/godot-proposals
- Stars: ~1,464
- License: MIT
- Artifact: `.github/ISSUE_TEMPLATE/feature_proposal.yml`, `README.md`
- Analogous: a proposal form that forces a problem statement, a proposed improvement, and a search for existing proposals before posting.
- Borrowed: search before asking, and a proposed answer instead of an open question.
- Rejected: no cap on questions per stage, no machine-readable log.

### bevyengine/bevy
- URL: https://github.com/bevyengine/bevy
- Stars: ~50,000
- License: MIT OR Apache-2.0 (API reports Apache-2.0)
- Artifact: `.github/ISSUE_TEMPLATE/feature_request.md`
- Analogous: a request is three prompts — problem, solution, alternatives considered.
- Borrowed: the recommendation-plus-reason shape; a question should carry a candidate answer.
- Rejected: no question budget and no stage concept.

### Donchitos/Claude-Code-Game-Studios
- URL: https://github.com/Donchitos/Claude-Code-Game-Studios
- Stars: ~40,900
- License: MIT
- Artifact: `CLAUDE.md`, `docs/COLLABORATIVE-DESIGN-PRINCIPLE.md`
- Analogous: a question → options → decision → draft → approval loop driven by the agent.
- Borrowed: one decision per question, and the agent waits for approval before acting.
- Rejected: its example batches three questions into one message, there is no cap, and no answer is logged.

### YarnSpinnerTool/YarnSpinner
- URL: https://github.com/YarnSpinnerTool/YarnSpinner
- Stars: ~2,878
- License: MIT
- Artifact: `YarnSpinner.Tests/SaliencyTests.cs` (`Yarn.Saliency`, `OnReceivedOptions`)
- Analogous: one question delivers a ranked option set, and the receiver returns the chosen option.
- Borrowed: a question ships ranked options, so the user can accept rather than compose.
- Rejected: no per-stage budget, no log.

## Software

### github/spec-kit
- URL: https://github.com/github/spec-kit
- Stars: ~151,000
- License: MIT
- Artifact: `templates/commands/clarify.md`
- Analogous: up to five clarifying questions, one at a time, each with a prominent recommendation and short reasoning; answered and stylistic questions are skipped; a validation step checks the total and duplicates.
- Borrowed: one question per message, recommendation with reason, skip already answered, explicit quota check.
- Rejected: five rather than three, a taxonomy scan, and no JSONL log.

### t3-oss/create-t3-app
- URL: https://github.com/t3-oss/create-t3-app
- Stars: ~29,000
- License: MIT
- Artifact: `cli/src/cli/index.ts` (`@clack/prompts`), last push 2025-12-13
- Analogous: one prompt at a time, each with an initial value; `-y, --default` answers everything with defaults; a non-TTY fallback confirms a default app.
- Borrowed: every question has a default, and deferral is itself an answer.
- Rejected: no stage, no log; the slower cadence is stated rather than hidden.

### rust-lang/rfcs
- URL: https://github.com/rust-lang/rfcs
- Stars: ~6,600
- License: Apache-2.0
- Artifact: `0000-template.md`
- Analogous: a proposal carries motivation, alternatives, and unresolved questions together.
- Borrowed: questions live inside a decision that already recommends; alternatives are recorded.
- Rejected: no cap, no log, and one RFC is one decision rather than one stage.

## AI-agent

### Aider-AI/aider
- URL: https://github.com/Aider-AI/aider
- Stars: ~50,300
- License: Apache-2.0
- Artifact: `aider/args.py` (`--yes-always`), last push 2026-05-22
- Analogous: confirmations arrive one at a time, and a flag accepts all of them.
- Borrowed: non-interactive runs must not ask; a global accept flag is a legitimate mode.
- Rejected: no stage budget and no JSONL; its slower 2026 cadence is stated as a limitation.

### modelcontextprotocol/modelcontextprotocol
- URL: https://github.com/modelcontextprotocol/modelcontextprotocol
- Stars: ~9,800
- License: Apache-2.0 (code and spec), CC-BY-4.0 (docs); GitHub reports NOASSERTION
- Artifact: `docs/specification/2025-06-18/client/elicitation.mdx`
- Analogous: an elicitation request carries a full schema, the user may decline or cancel, servers must not request sensitive data, clients should rate-limit.
- Borrowed: a complete schema per request, decline as "you decide", and rate limiting as a budget.
- Rejected: protocol-level machinery with no stage or game context.

## Considered and rejected

- `cline/cline` — its `ask_followup_question` source path no longer exists in the monorepo; nothing verifiable to cite.
- `bmad-code-org/BMAD-METHOD` — advanced elicitation means critique rounds, not a question budget.
- `godotengine/godot` — engine code, no question artifact.
- `kubernetes/enhancements` — KEP template is an infrastructure process, with no budget or log.
- `OpenHands/OpenHands` — agent runtime, no question-discipline artifact.

## License note

All nine repositories are permissively licensed (MIT, Apache-2.0, or MIT OR Apache-2.0); none is copyleft. Only ideas and document shapes were reused, not code, so no license text is reproduced. The MCP entry is dual-licensed across code and documentation, which matters only if text is copied — it is not.
