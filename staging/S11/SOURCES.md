# S11 content - sources

Nine public repositories, read on 2026-11-25. Star counts come from `gh api repos/<owner>/<repo>`; unauthenticated calls to api.github.com returned 403 (rate limit exhausted), so `gh` was the working path. Licenses are as reported by GitHub at that time, with the repository `LICENSE` read when GitHub reported NOASSERTION. Paths are files that exist in the default branch. Quotes are verbatim, shortened only by the quoted span; they are cited for identification and comparison, and nothing is copied.

Rows are `SRC1`-`SRC9` so they never collide with part IDs (`S02`, `S09`, `S10`, `S11`). Every borrow is a pattern restated for this skill; no code, text, or asset was taken, and the GPL sources below are idea-only.

## Gamedev (4)

| # | Repository | URL | Stars | License | Analogous artifact | Verbatim quote | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|---|
| SRC1 | OpenRA/OpenRA | https://github.com/OpenRA/OpenRA | 17,834 | GPL-3.0 | `mods/ra/rules/infantry.yaml:1-2`, `mods/ra/rules/defaults.yaml:1` - a unit is declared as one line of deltas over a shared base template (`^Soldier`, `^ExistsInWorld`) | "Inherits: ^Soldier" (line 2; the source indents it with a tab) | A unit is one delta over an approved base; the base is the reuse-matrix row | GPL code, engine internals, mod packaging |
| SRC2 | CleverRaven/Cataclysm-DDA | https://github.com/CleverRaven/Cataclysm-DDA | 13,576 | NOASSERTION; `LICENSE` states CC-BY-SA 3.0 with per-component exceptions | `doc/JSON/JSON_INHERITANCE.md:15,54,89,103,126` - `copy-from` and abstract IDs let one JSON object inherit fields from a base | "To reduce duplication in the JSON data, it is possible for _some_ JSON `type`s to inherit from existing objects." | Inheritance and an abstract base: fill the matrix before producing; a unit with no base is new scope | The content volume, mod loading, the JSON parser |
| SRC3 | wesnoth/wesnoth | https://github.com/wesnoth/wesnoth | 7,008 | GPL-2.0 | `copyrights.csv:1` - one row per asset: date, file, license, author, notes, MD5 | "Date,File,License,Author - Real Name(other name);Real Name(other name);etc,Notes,Needs Update,MD5" | One license ledger line per imported asset, written at import | GPL content and the MD5 bookkeeping |
| SRC4 | OpenTTD/OpenTTD | https://github.com/OpenTTD/OpenTTD | 8,531 | NOASSERTION; `LICENSE` is GPL-2.0 with third-party exceptions | `src/saveload/saveload.h:22-25` - the save-version table records which trunk revision introduced each save format | "Previous savegame versions, the trunk revision where they were introduced and the released version that had that particular savegame version." | Saves are versioned, and an old save must still load | Savegame serialization machinery |

## Software development (3)

| # | Repository | URL | Stars | License | Analogous artifact | Verbatim quote | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|---|
| SRC5 | oss-review-toolkit/ort | https://github.com/oss-review-toolkit/ort | 2,127 | Apache-2.0 | `README.md:28` - a policy toolkit that evaluates dependency licenses against rules | "The OSS Review Toolkit (ORT) is a FOSS policy automation and orchestration toolkit that you can use to manage your (open source) software dependencies in a strategic, safe and efficient manner." | License policy as a gate checked at import, not a memory checked at release | Dependency-graph scanning at ORT scale |
| SRC6 | ajv-validator/ajv | https://github.com/ajv-validator/ajv | 14,886 | MIT | `README.md:7` - JSON schema validation applied before data is used | "The fastest JSON validator for Node.js and browser." | Data files are validated before the build reads them, so a unit is data, not code | A runtime validator shipped inside the game |
| SRC7 | fivetran/great_expectations | https://github.com/fivetran/great_expectations | 11,948 | Apache-2.0 | `README.md:39,44` - expectations as assertions, including a row-count-between check | "Expectations are assertions for data." | Assert a count and inspect a sample; "the file exists" is not validation | Data-pipeline infrastructure, dashboards |

## AI-agent workflow (2)

| # | Repository | URL | Stars | License | Analogous artifact | Verbatim quote | Borrowed | Rejected |
|---|---|---|---|---|---|---|---|---|
| SRC8 | assafelovic/gpt-researcher | https://github.com/assafelovic/gpt-researcher | 30,905 | Apache-2.0 | `gpt_researcher/config/variables/default.py:9,24,26` - response length and iteration caps in one config table (`"TOTAL_WORDS": 1200,` and `"MAX_ITERATIONS": 3,`) | "MAX_ITERATIONS": 3, | A numeric output budget plus a bounded number of iterations, both written before work starts | The web research pipeline and LLM calls |
| SRC9 | openai/openai-agents-python | https://github.com/openai/openai-agents-python | 30,870 | MIT | `src/agents/run.py:310,322-323` - `max_turns` bounds one run and raises when exceeded | "max_turns: The maximum number of turns to run the agent for. A turn is defined as one AI invocation (including any tool calls that might occur)." | A hard stop when the iteration budget is spent | The agent runtime and tool loop |

## Dead ends

| Repository | Stars | License | Why it failed |
|---|---|---|---|
| langchain-ai/open_deep_research | 12,675 | MIT | Archived on 2026-08-10. Research unit caps in config were the analog, but the artifact is frozen and would age. |
| stanford-oval/storm | 31,952 | MIT | Last push 2025-09-30, about 14 months before the review date; fails the currency preference. |
| 0ad/0ad | 2,827 | NOASSERTION | Archived, last push 2024-08-17. XML template inheritance is the analog, but the repository is dead. |
| luanti-org/minetest_game | 1,575 | NOASSERTION | Content is tied to the Lua engine, licenses are scattered per mod, and no numeric content budget exists. |

## Finding

No repository in the sample ships a content stage with a numeric budget, an ordered cut list, a reuse matrix, and per-unit evidence. The sources supply the parts: the unit-as-delta pattern (SRC1, SRC2), the per-asset license ledger (SRC3), save versioning (SRC4), the license gate (SRC5), data validation before use (SRC6), count-and-sample assertions (SRC7), a numeric output budget with bounded iterations (SRC8), and a hard stop when the budget is spent (SRC9). The procedure itself comes from R1, R6, R9 and the G2/G2.5 gates; the sources only confirm that each move is an established practice.
