# E10 — Sources

Nine repositories, split 4 gamedev / 3 software / 2 AI-agent. Star counts were read from shields.io on 2026-11-25 and rounded. No source code was copied; quotes are short excerpts for identification only. "Analogous" maps the artifact to E10's problem, "Borrowed" is what reached the eval, and "Rejected" is what deliberately did not.

## Gamedev (4)

### [godotengine/godot](https://github.com/godotengine/godot)

- **Stars:** 121k
- **License:** MIT
- **Artifact:** `core/object/undo_redo.cpp` — `set_max_steps` and the trim loop that runs after a commit.
- **Quote:** `if (max_steps > 0) { // Clear early steps. while (actions.size() > max_steps) { _pop_history_tail(); } }` (lines 333–338, condensed onto one line).
- **Analogous:** a hard cap on retained history; the oldest entries are dropped instead of the structure growing forever.
- **Borrowed:** an explicit maximum and a deterministic drop of the oldest entries; history never grows without a bound.
- **Rejected:** silent truncation without a cap, and keeping everything "for safety".

### [renpy/renpy](https://github.com/renpy/renpy)

- **Stars:** 7.1k
- **License:** MIT (most of Ren'Py; other bundled components have their own licences).
- **Artifact:** `renpy/config.py` — `rollback_length` and `history_length`.
- **Quote:** `# If the rollback is longer than this, we may trim it.` / `rollback_length = 128` / `# How many elements of history are kept. None to disable history.` / `history_length = None` (lines 66–67 and 771–772, joined in order).
- **Analogous:** a named retention limit with a documented trim rule, and an explicit way to disable retention.
- **Borrowed:** a numeric cap plus a one-line statement of what happens when it is exceeded.
- **Rejected:** trimming the save state itself; E10 trims the transcript, not the game state.

### [inkle/ink](https://github.com/inkle/ink)

- **Stars:** 5k
- **License:** MIT
- **Artifact:** `ink-engine-runtime/StoryState.cs` — the class and its save/load contract.
- **Quote:** `All story state information is included in the StoryState class, including global variables, read counts, the pointer to the current point in the story, the call stack (for tunnels, functions, etc), and a few other smaller bits and pieces. You can save the current state using the json serialisation functions ToJson and LoadJson.` (lines 10–14).
- **Analogous:** resume from a compact state snapshot rather than replaying the transcript.
- **Borrowed:** `STATE.md` as the resume artifact; the transcript is evidence, not state.
- **Rejected:** replaying the whole log to reconstruct where the agent was.

### [SFTtech/openage](https://github.com/SFTtech/openage)

- **Stars:** 15k
- **License:** GPL-3.0-or-later.
- **Artifact:** `AGENTS.md` — the reference index at the top of a game-engine repository.
- **Quote:** `Read the docs of the subsystem you touch; link to them instead of duplicating their content`.
- **Analogous:** an index that points at the right document instead of copying it into the context.
- **Borrowed:** keep one fact in one place; read only the docs for the subsystem being touched.
- **Rejected:** copying an 11 KB agent guide into the eval, or duplicating rule text across files.

## Software (3)

### [redis/redis](https://github.com/redis/redis)

- **Stars:** 78k
- **License:** RSALv2 / SSPLv1 / AGPLv3 tri-licence from Redis 8; earlier releases are BSD-3.
- **Artifact:** `redis.conf` — automatic AOF rewrite policy.
- **Quote:** `This base size is compared to the current size. If the current size is bigger than the specified percentage, the rewrite is triggered. Also you need to specify a minimal size for the AOF file to be rewritten, this is useful to avoid rewriting the AOF file even if the percentage increase is reached but it is still pretty small.` (lines 1638–1646, joined).
- **Analogous:** rewrite history when it grows past a ratio, with a floor so small histories are left alone.
- **Borrowed:** a threshold with a floor, not a fixed cap; the budget has both a limit and a reason to act.
- **Rejected:** rewriting on every append, which would defeat the point of a budget.

### [apache/kafka](https://github.com/apache/kafka)

- **Stars:** 34k
- **License:** Apache-2.0
- **Artifact:** `clients/src/main/java/org/apache/kafka/common/config/TopicConfig.java` — log cleanup policy documentation.
- **Quote:** `The "delete" policy (which is the default) will discard old segments when their retention time or size limit has been reached. The "compact" policy will enable log compaction, which retains the latest value for each key.` (joined).
- **Analogous:** an explicit per-topic choice between discarding old entries and compacting them to the latest value per key.
- **Borrowed:** the policy is declared, not implicit; compaction keeps the latest fact per key rather than everything.
- **Rejected:** one global retention rule for all content, and compacting content that must stay verbatim.

### [etcd-io/etcd](https://github.com/etcd-io/etcd)

- **Stars:** 53k
- **License:** Apache-2.0
- **Artifact:** `server/storage/mvcc/kv.go` — the `ReadView` contract after compaction.
- **Quote:** `// FirstRev returns the first KV revision at the time of opening the txn.` / `// After a compaction, the first revision increases to the compaction revision.` (lines 41–43, joined; the source breaks the second sentence after "compaction").
- **Analogous:** a compaction cut point; reads below it are invalid, so old history is gone rather than hidden.
- **Borrowed:** name the cut point and treat older history as unavailable, not as a silent fallback.
- **Rejected:** keeping unbounded revisions so any old read can still succeed.

## AI-agent workflow (2)

### [openai/codex](https://github.com/openai/codex)

- **Stars:** 136k
- **License:** Apache-2.0
- **Artifact:** `codex-rs/core/src/agents_md.rs` — AGENTS.md discovery and instruction assembly.
- **Quote:** `Collect every AGENTS.md found from the project root down to the current working directory (inclusive) and concatenate their contents in that order.` / `We do **not** walk past the project root.` (module docs, steps 2–3).
- **Analogous:** instructions are discovered from files and assembled deterministically, not recalled from the conversation.
- **Borrowed:** rules are loaded from files each session; the transcript is never the source of rules.
- **Rejected:** assuming a summary carries the instruction hierarchy correctly.

### [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)

- **Stars:** 109k
- **License:** Apache-2.0
- **Artifact:** `docs/reference/commands.md` — the `/compress` command.
- **Quote:** `Replace the entire chat context with a summary. This saves on tokens used for future tasks while retaining a high level summary of what has happened.` (lines 130–132, joined).
- **Analogous:** compaction replaces the chat context with a lossy summary; the summary keeps events, not the rules.
- **Borrowed:** after compaction the agent must re-read rules and state, because the summary is explicitly not a full record.
- **Rejected:** treating the summary as a substitute for `AGENTS.md`, `STATE.md`, or `DECISIONS.md`.

## Considered and rejected

- **OpenRA/OpenRA.** Its root `AGENTS.md` (397 chars) tells automated agents to stop: "Automated agents and autonomous AI systems are not authorized to modify, analyze, or generate contributions for this repository." It documents a refusal, not a method, so it is not a source; it belongs to an E05-style consent case.
- **All-Hands-AI/OpenHands.** The condenser paths returned 404 after the repository restructure. No verified quote, so it was excluded rather than cited from memory.
- **temporalio/temporal.** Continue-as-new exists in `service/history/workflow/mutable_state_impl.go`, but the inspected 388 KB file yielded no clean state-carry-over quote. The cost exceeded the value of one source.
- **bevyengine/bevy, phaserjs/phaser, o3de/o3de.** No root `AGENTS.md`, `CLAUDE.md`, or `.github/copilot-instructions.md` found in probes; no context-management artifact to quote.
- **apache/kafka `config/server.properties`.** Retention settings exist there, but the precise delete/compact semantics are in `TopicConfig.java`, so the class is the artifact instead of the config file.

## License note

All quotes are short excerpts used for identification and comparison; no source code, configuration, or documentation text was copied into the eval. MIT and Apache-2.0 sources permit quotation with attribution. openage is GPL-3.0-or-later: only a one-line quote is used, and no code or text is linked into the artifact, so the eval remains licence-neutral. Redis is source-available under a tri-licence; only its documentation comment is quoted. The fixture and eval contain no third-party code.
