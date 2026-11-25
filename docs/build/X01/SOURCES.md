# X01 — Sources

Medium protocol: 5 sources — 3 external repositories and 2 accepted internal
parts. Stars are shields.io values on 2026-11-25. No code copied.

| # | Source | Stars | License | Analog | Borrowed | Rejected |
|---|---|---|---|---|---|---|
| 1 | [microsoft/autogen](https://github.com/microsoft/autogen) | 62k | MIT (code), CC-BY-4.0 (docs) | Termination as a typed object, evaluated every turn | `stop` is a small closed set of machine-checkable conditions; a termination ends the run, it does not pause it; `HandoffTermination` is the "hand back and stop" shape behind `BLOCKING —` | Agent runtime, model clients, group chat, the component config DSL |
| 2 | [langchain-ai/langgraph](https://github.com/langchain-ai/langgraph) | 45k | MIT | Checkpointed state plus interrupt and resume | A state snapshot after each step; `interrupt()` and `Command(resume=...)` resume from persisted state, not memory, so a checkpoint is the resume point and a question survives a process exit | Graph and node API, channel reducers, the hosted server |
| 3 | [openai/openai-agents-python](https://github.com/openai/openai-agents-python) | 31k | MIT | A turn budget as a first-class limit | `max_turns` with `MaxTurnsExceeded` raised by default: a limit is a hard stop, and producing output at the limit takes explicit handling — the reason closing writes are exempt | Handoffs, guardrails, tracing, sessions |
| 4 | R10, `library/core/rules/R10-autonomy-is-contract.md` (accepted) | — | — | The rule X01 templates | Ten field names, approval by the user, stop versus pause, blocked question, log and report shape, worktree and scratch branch, the R1–R9 ladder | Its field definitions are not restated (see omissions) |
| 5 | A01, `library/core/agents/partner.md` (accepted) | — | — | The agent that drafts and routes | A01 writes `STATE.md`, drafts the block, routes to other agents, escalates instead of guessing, never publishes | Routing table, permission list, language rules |

## Considered and rejected

- **All-Hands-AI/OpenHands** (94k, MIT). A per-task budget and workspace
  confinement would have been a strong analog, but the file moved and
  `max_budget_per_task` could not be found in the current tree; citing it would
  be inventing a fact.
- **cline/cline** (72k, Apache-2.0). Auto-approve lists and per-task cost; the
  paths changed after the restructure and were not verifiable.
- **temporalio/temporal** (25k, MIT). Durable execution and retries; not an
  agent contract and no human approval artifact. A weaker analog than LangGraph.
- **SWE-agent/SWE-agent** (21k, MIT). An agent scaffold with a config file, but
  nothing a human signs before the run.
- **github/gh-aw** (5.7k, MIT). Workflow frontmatter with safe outputs; close in
  spirit, but small and fast-moving, and not a contract a human approves.

## Dead ends

- **GitHub API** returned 403 from this environment; star counts came from
  `https://img.shields.io/github/stars/<owner>/<repo>.json` instead. Shields
  rounds to two significant figures, so the table says `62k`, not `62,431`.
- **Shields for licenses** is unreliable: for autogen it reports CC-BY-4.0,
  while the repository has `LICENSE-CODE` (MIT) and `LICENSE` (CC-BY-4.0). The
  table follows the raw files.
- **OpenHands and Cline** were read for budget fields and dropped when the files
  moved; details in the rejected list.

## License note

No source code, configuration, or prose is reproduced. Only mechanisms are
described, in this project's words. Autogen's documentation is CC-BY-4.0 and
none of it is quoted; its code is MIT. LangGraph and OpenAI Agents SDK are MIT.
The internal parts are this project's own files.
