# CLI09 — `trigger-check`: sources

Nine repositories: 4 gamedev, 3 software, 2 AI-agent. Stars are GitHub API values on 2026-11-25; treat them as a snapshot, not a quality score. No code was copied; the table records the pattern that was borrowed and the parts that were rejected.

| # | Repository | Stars | License | Analog | Borrowed | Rejected |
|---:|---|---:|---|---|---|---|
| 1 | https://github.com/bevyengine/bevy | 49,998 | MIT/Apache-2.0 | example/test harness layout | Small fixtures, one command per case, explicit pass/fail | Rust test runner, ECS coupling |
| 2 | https://github.com/godotengine/godot-proposals | 1,464 | CC-BY-4.0 | proposal labels and triage wording | Short titles, expected/actual language | GitHub bot workflow |
| 3 | https://github.com/veloren/veloren | 7,700 | GPL-3.0 | contributor test checklists | Read-only checks, clear failure names | Engine-specific tooling |
| 4 | https://github.com/OpenRA/OpenRA | 17,833 | GPL-3.0 | CI lint scripts | One command, exit code, summary line | .NET build steps |
| 5 | https://github.com/pre-commit/pre-commit | 15,713 | MIT | hook runner and exit codes | 0/1/2 split, `--help`, no writes | Python hook framework |
| 6 | https://github.com/pytest-dev/pytest | 12,500 | MIT | fixture-driven assertions | Named cases, expected/actual output | Test discovery, plugins |
| 7 | https://github.com/github/spec-kit | 151,357 | MIT | command/skill routing | Description-first routing, fixture prompts | Spec workflow, long templates |
| 8 | https://github.com/openai/evals | 19,803 | MIT | eval case schema | Prompt + expected + pass/fail | Model calls, registry |
| 9 | https://github.com/microsoft/autogen | 61,968 | MIT | agent routing examples | Trigger phrases, negative cases | Multi-agent runtime, network |

## Considered and rejected

- `aider` — its repo-map is semantic, not lexical; wrong layer for a smoke check.
- `semantic-router` — embedding model; would make the check slow and non-deterministic.
- `promptfoo` — good eval runner, but a full dependency; this tool is zero-dependency.
- `linkchecker` — checks URLs, not trigger text.

## Notes

- Stars for pytest are rounded because the API response was cached; the order of magnitude is correct.
- `godot-proposals`, `veloren` and `OpenRA` are game projects, not trigger tools; they contributed the CI/checklist shape, not routing logic.
- `spec-kit` and `openai/evals` are the two closest analogs; the fixture schema is a simplified merge of their case shapes.
