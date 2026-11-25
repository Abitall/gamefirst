# M01 — memory schema: sources

Medium protocol: 5 sources — 3 external repositories and 2 accepted internal
parts. Stars are shields.io values on 2026-11-25. No code copied.

| # | Repository | Stars | License | Analog | Borrowed | Rejected |
|---:|---|---:|---|---|---|---|
| 1 | https://github.com/basicmachines-co/basic-memory | ~4,700 | AGPL-3.0 | Plain-text knowledge base | One file per item, a header, and an index that decides what loads; local-first, copy not submodule | The MCP server, the editor, the sync daemon |
| 2 | https://github.com/getzep/graphiti | ~33,000 | Apache-2.0 | Temporal knowledge graph | `scope`, `expiry`, and `replaces` as first-class fields; stale facts are retired, not silently kept | The graph database, embeddings, LLM extraction |
| 3 | https://github.com/mem0ai/mem0 | ~69,000 | Apache-2.0 | Agent memory layer | `status` forward-only, an admission gate, and a user-reviewed push | The hosted service, vector store, automatic extraction |
| 4 | R6 — add only after failure (internal, accepted) | n/a | project-internal | Admission rule | Second project or two failures; smallest fix first; one in, one out | The rule text itself |
| 5 | S03 — retrospect (internal, accepted) | n/a | project-internal | Promotion path | The retro proposes; the user admits; the agent never self-accepts | The five-line retro format |

## Considered and rejected

- `langchain-ai/langmem` — a library, not a file contract.
- `letta-ai/letta` — a server with its own database; too heavy for a git repo.

## License note

basic-memory is AGPL-3.0; only the file/index idea is borrowed, no code.
Graphiti and mem0 are Apache-2.0; only field ideas are borrowed. R6 and S03 are
project-internal.
