# SOURCES — R10 Autonomy is contract

Nine real repositories: 4 gamedev, 3 software, 2 AI-agent. Captured 2026-11-25
with `gh api repos/<owner>/<repo>`, reading stars, license and the quoted file on
the default branch. Star counts drift by a few per hour (bevy returned 49,998 on
the first call and 49,999 on a second one a minute later); the number below is
the first reading.

Nothing is copied. Every entry states what was taken as an idea and what was
deliberately left out. All quoted text stays the property of its authors. R10 is
prose about process, not code, so no license obligation attaches; the licenses
are listed so a reader can check that claim.

## Gamedev

### 1. Unity-Technologies/ml-agents — 19,893 stars

- URL: https://github.com/Unity-Technologies/ml-agents
- License: NOASSERTION (license file present, not SPDX-recognized)
- Artifact: `config/ppo/3DBall.yaml`
- Verbatim:

```yaml
keep_checkpoints: 5
max_steps: 500000
time_horizon: 1000
summary_freq: 12000
```

- Borrowed: a training run declares its limits as numbers before it starts, keeps
  a bounded number of checkpoints, and writes a summary at a fixed cadence. This
  is the shape of R10's `budget` and `checkpoints` rows.
- Rejected: the RL meanings (a "step" is an environment tick, `time_horizon` is
  the rollout length, not a wall-clock budget). R10 counts files, tokens and
  minutes because those are what a coding run actually spends.

### 2. bevyengine/bevy — 49,998 stars

- URL: https://github.com/bevyengine/bevy
- License: Apache-2.0
- Artifact: `tools/ci/src/ci.rs`
- Verbatim:

```rust
/// continue running commands even if one fails
pub(crate) keep_going: bool
```

- Borrowed: the set of runnable commands is a closed, named list, and the default
  is to stop at the first failure. That is R10's `allowed` (an enumerated set,
  not "whatever the agent finds") and the stop-on-failure default behind the
  attempt cap. `--test-threads` and `--build-jobs` supplied the idea that
  parallelism is a declared budget knob, not an emergent property.
- Rejected: `keep_going` itself, which is the opposite default. R10 retries one
  problem up to three times; it does not walk past failures through a list.

### 3. BehaviorTree/BehaviorTree.CPP — 4,313 stars

- URL: https://github.com/BehaviorTree/BehaviorTree.CPP
- License: MIT
- Artifact: `include/behaviortree_cpp/decorators/retry_node.h`
- Verbatim:

```cpp
<RetryUntilSuccessful num_attempts="3">
```

and, in the same header: "Use -1 to create an infinite loop."

- Borrowed: the retry count is a declared integer on the node, not a hidden
  policy, and "unlimited" exists only as an explicit opt-in. R10's
  `attempts_per_problem` (max 3) is that idea with the infinite option removed.
- Rejected: `-1` as a sentinel for infinity. In R10 an absent or invalid budget
  is a stop, not an unbounded run, so there is no value that means "forever".

### 4. godotengine/godot — 120,803 stars

- URL: https://github.com/godotengine/godot
- License: MIT
- Artifact: `main/main.cpp`
- Verbatim:

```cpp
print_help_option("--quit-after <int>", "Quit after the given number of iterations. Set to 0 to disable.\n");
print_help_option("--log-file <file>", "Write output/error log to the specified path instead of the default location defined by the project.\n");
```

- Borrowed: a headless run declares in advance how it stops and where its log
  goes. Those are two rows of R10's table (`stop`, `log`), and the log is a file
  path the operator chose, not something the process invents at the end.
- Rejected: `0` meaning "disabled". In Godot zero disables the limit; in R10 an
  unset limit is not an invitation to run forever.

## Software

### 5. kubernetes/kubernetes — 129,337 stars

- URL: https://github.com/kubernetes/kubernetes
- License: Apache-2.0
- Artifact: `staging/src/k8s.io/api/batch/v1/types.go`
- Verbatim: "completions specifies the desired number of successfully finished
  pods the job should be run with." / "activeDeadlineSeconds specifies the
  duration in seconds relative to the startTime that the job may be continuously
  active before the system tries to terminate it" / "backoffLimit specifies the
  number of retries before marking this job failed. Defaults to 6"
- Borrowed: done is a count of successful outcomes, a job carries a wall-clock
  deadline, and retries have a cap that ends in a failed state rather than
  silence. R10's `done`, `budget` and `stop` rows follow this triple.
- Rejected: the default of 6 retries. R10 caps at 3, matching E08, and the
  failure state is a written report, not a pod condition.

### 6. hashicorp/terraform — 50,323 stars

- URL: https://github.com/hashicorp/terraform
- License: NOASSERTION (BUSL-1.1 text; GitHub does not recognize the SPDX id)
- Artifact: `internal/command/plan.go`, `internal/command/apply.go`
- Verbatim: `-out=path  Write a plan file to the given path. This can be used as
  input to the "apply" command.` / `-parallelism=n  Limit the number of
  concurrent operations. Defaults to 10.` / from apply: "If you don't provide a
  saved plan file then this command will also accept all of the
  plan-customization options accepted by the terraform plan command."
- Borrowed: the reviewed plan is what the executing step consumes, and the degree
  of concurrency is a declared number. R10's contract is that plan: written,
  approved, then executed, with `max_files` and `max_tokens` as its parallelism.
- Rejected: the two-phase `plan`/`apply` workflow as a required ritual, and the
  HCL/state machinery. R10 needs one short file, not a tool.

### 7. git/git — 64,495 stars

- URL: https://github.com/git/git
- License: NOASSERTION (GPL-2.0 text plus per-file exceptions)
- Artifact: `Documentation/git-worktree.adoc`
- Verbatim: "A git repository can support multiple working trees, allowing you to
  check out more than one branch at a time.  With `git worktree add` a new working
  tree is associated with the repository, along with additional metadata that
  differentiates that working tree from others in the same repository."
- Borrowed: an autonomous run gets its own tree on its own branch, so a failed run
  is thrown away without touching the main checkout. This is the mechanism behind
  R10's "work in a worktree or a scratch branch".
- Rejected: the metadata and pruning details, bare-repository setups and
  submodules. The rule names the mechanism; the operator runs it.

## AI-agent

### 8. crewAIInc/crewAI — 61,254 stars

- URL: https://github.com/crewAIInc/crewAI
- License: MIT
- Artifact: `lib/crewai/src/crewai/task.py`
- Verbatim:

```python
expected_output: str = Field(description="Clear definition of expected output for the task.")
guardrail_max_retries: int = Field(default=3, description="Maximum number of retries when guardrail fails")
```

In practice the field is required: "expected_output must be provided either
directly or through config".

- Borrowed: an agent task cannot start without a stated expected output, and the
  retry cap defaults to 3. R10's `goal`/`done` rows and the attempt limit come
  from here as much as from Kubernetes.
- Rejected: the role/goal/backstory agent model, LLM-judged guardrails as the
  correctness test, and `output_file` as the deliverable. R10 requires evidence a
  human can inspect, not a model's verdict on itself.

### 9. langchain-ai/langgraph — 45,410 stars

- URL: https://github.com/langchain-ai/langgraph
- License: MIT
- Artifact: `libs/langgraph/langgraph/pregel/main.py`
- Verbatim:

```python
f"Recursion limit of {config['recursion_limit']} reached "
"without hitting a stop condition. You can increase the "
"limit by setting the `recursion_limit` config key."
```

with `GraphRecursionError`, and earlier: `if config["recursion_limit"] < 1:
raise ValueError("recursion_limit must be at least 1")`.

- Borrowed: the stop is a configured hard limit that raises an error and surfaces
  to the caller, not a warning the loop can ignore. R10's Blocked section is that:
  a stop condition ends the run and produces a visible question.
- Rejected: recursion depth as the only dimension of a budget, and the
  graph/Pregel execution model. R10 budgets files, tokens and minutes, because a
  coding agent can loop without deep recursion.

## Dead ends

- `hashicorp/terraform`: the docs path `website/docs/cli/commands/plan.mdx`
  returns 404 — the CLI docs moved to developer.hashicorp.com and the site source
  left the repository. Cited `internal/command/plan.go` instead.
- `Aider-AI/aider` (50,255 stars): last push 2026-05-22. Seven months stale, so
  the quoted behavior may not describe the current tool. Dropped rather than cite
  a frozen snapshot.
- `FoundationAgents/MetaGPT` (71,475 stars): renamed from `geekan/MetaGPT`, last
  push 2026-01-21. Stale, and the rename makes the artifact path unstable in
  older references. Dropped.
- `OpenHands` (94,318 stars): has `max_budget_per_task`, but its budget covers
  spend in dollars, which this project has no unit for. Considered and left out;
  crewAI and LangGraph cover the expected-output and hard-stop ideas more
  directly.
- `o3de` (9,918) and `OpenRA` (17,834): checked for game-side autonomy or CI
  limits, nothing that the four gamedev picks do not already say better.
- `systemd` (17,063) and `pytest` (14,760): candidates for default-deny and retry
  semantics; dropped because the Kubernetes and BehaviorTree quotes cover both
  without adding a fourth domain.
