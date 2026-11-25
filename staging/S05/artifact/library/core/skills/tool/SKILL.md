---
name: tool
description: Build a small portable tool for a repeated manual step, with a CLI contract, README, test, and version. Use after the second repetition or a measured gap; not for a one-off or a game feature.
allowed-tools: Read, Write, Edit, Glob, Grep, Bash
---

# tool

S05: turn a repeated manual step into a portable tool that a test proves. R6 admits it; the test is the evidence (R1, S02).

## Trigger

- The same manual step has run at least twice in separate sessions, or a measurement or check is needed across projects.
- Not a one-off command: run it once, keep the line. Not a game feature, asset, or engine task: route to A03.

## Inputs

- The task and the manual step it replaces, with both occurrences named.
- Contract: input, output, and what each exit code means.
- Runtime available on the machine (Node, Python, PowerShell), who runs the tool (agent, human, CI), and limits (offline, no service).
- Existing entries in `toolbox/` and its index row.

## Steps

1. **Search `toolbox/` first.** Reuse a tool or add a flag; merge beats new. A duplicate is rejected (R6).
2. **State the smallest useful tool** in one sentence: one job, one output. A second job needs a second admission.
3. **Choose a runtime already installed** and name its version in the README. No framework, no build step, no global install.
4. **Fix the CLI contract**: arguments, file or stdin input, stdout, stderr, exit codes (0 ok, 1 failure, 2 misuse), `--help`, `--version`. Relative POSIX paths; Windows-safe names.
5. **Write the test before the code**: one fixture, a passing case, a failing case, the exact command. No run, no tool (R1).
6. **Write `README.md`**: install, usage, one worked example, limits, runtime version, license and source note. Adapt code, never paste it (R3).
7. **Write `VERSION`** as semver: patch for a fix, minor for a flag, major for a broken contract.
8. **Place `toolbox/<name>/`** (`library/toolbox/` in gamefirst) with source, `README.md`, `VERSION`, and `test/` fixture. Copy the folder to move it; never link or install globally.
9. **Add one row** to `toolbox/README.md` (create it if missing): name, one line, runtime, entry command, version.
10. **Run the test** and keep its log with the exact command; a pass is the evidence (R1).

## Admission (R6)

Before step 1, name four things: the repeated failure or measured gap with its evidence path, the smallest fix, what this replaces or merges, and the test that proves it. Missing one: no tool.

## Output

`toolbox/<name>/` plus one index row. One line back: name, version, command, test result.

## Boundaries

- No secret, token, or private path in code, fixture, or output. No network, service, or publish without an explicit command (R4, E12).
- No framework, large dependency, engine import, or game code. A tool is not a home for the game.
- No available runtime, duplicate, or unclear exit code: stop, ask once (R2), record the gap.

## Cross-refs

R1 evidence, R2 questions, R3 sources and licenses, R4/E12 publish, R6 admission, R10 allowed paths and tools, S02 the test, E02 cited versions, E03 done.
