# CLI08 justification

Unit-by-unit rationale for `artifact/tools/lint-agent-context.mjs` (248 lines)
and `test/run-checks.mjs` (196 lines). "Breaks" is the failure the unit prevents.

## Artifact

### 1. Shebang and header contract (lines 1-8)
- Why: makes the tool runnable directly and states the read-only scope plus the
  three exit codes before any code.
- Breaks: callers guessing whether a non-zero exit means findings or a broken
  invocation.
- Source: lychee's documented exit-code enum and glTF-Validator's documented
  non-zero-on-error behavior.

### 2. Read-only imports (lines 9-10)
- Why: only `node:fs` readers and `node:path` helpers; no network, no shell, no
  writes.
- Breaks: a linter that mutates the tree or needs dependencies to install.
- Source: task constraint; OpenRA validator only reads files and reports.

### 3. `USAGE` (lines 11-16)
- Why: one-line option contract for `--help` and for humans reading failures.
- Breaks: undiscoverable `--strict` and `--budget`.
- Source: glTF-Validator option listing; size-limit argument handling.

### 4. `BUDGETS` (line 17)
- Why: single table for the seven part kinds plus AGENTS.md, in chars/4 tokens.
- Breaks: budgets drifting between docs, tests and implementation.
- Source: codex's `PROJECT_DOC_BUDGET_GUIDANCE`; size-limit's budget concept.

### 5. `ORDER` (line 18)
- Why: canonical priority rank used by both priority checks.
- Breaks: two code paths disagreeing about which layer wins.
- Source: v0.3 blueprint `mode > rules > skill > pack > docs`.

### 6. Name-to-ID maps (lines 19-22)
- Why: resolves IDs from stable names when the body omits them; `AGENTS` was
  added after a real run printed `-` for `library/core/agents/engineer.md`.
- Breaks: missing IDs and misleading `-` rows for valid parts (observed bug).
- Source: blueprint ID order; bevy's requirement that a diagnostic path be
  unique and non-empty.

### 7. `KIND_BY_DIR` (line 23)
- Why: classifies a file by the first meaningful path segment.
- Breaks: README and fixture files being charged against part budgets.
- Source: gemini-cli's discovery limited to known context files.

### 8. ID registry (lines 24-28)
- Why: derives all valid IDs from blueprint ranges, including `G2.5`, padded
  two-digit forms and `N00`.
- Breaks: false STALE-REF reports for parts that exist in the design but are
  not installed yet.
- Limit: planned-but-deleted IDs still resolve; documented in REPORT.
- Source: godot's duplicate-class checks need a known namespace; bevy's path
  component rules.

### 9. Path and record helpers (lines 29-32)
- Why: `posix` keeps JSON and tables Windows-safe; `lineAt` gives 1-based
  locations; `finding` and `fail` keep shapes uniform.
- Breaks: backslash paths in reports, off-by-one lines, inconsistent errors.
- Source: godot and OpenRA report `file:line` style locations.

### 10. `parseArgs` (lines 33-56)
- Why: parses the four flags, rejects unknown/positional input, validates
  `--budget` kind and positivity.
- Breaks: config mistakes silently becoming findings and exit 1.
- Source: lychee separates config failure from check failure; size-limit's
  `--json` switch.

### 11. `walk` (lines 57-61)
- Why: sorted recursive walk with a 5000-file cap.
- Breaks: nondeterministic output and runaway scans of huge trees.
- Source: codex walks root-to-cwd deterministically; gemini-cli discovers a
  bounded set of instruction files.

### 12. `kindOf` (lines 62-70)
- Why: accepts only `.md` parts under rules/agents/gates/evals/crews/commands
  or `SKILL.md` under skills.
- Breaks: random docs entering budgets, duplicates and ID checks.
- Source: gemini-cli filters to context files rather than every markdown file.

### 13. `parseFm` (lines 71-84)
- Why: flat `key: value` frontmatter parser that records where the body starts.
- Breaks: frontmatter keys being treated as prose or duplicate lines.
- Source: observed agent/skill/command formats in the library.

### 14. `checkFm` (lines 85-103)
- Why: per-kind schema: agent needs description and valid mode; skill needs
  name plus directory match and description; command needs description; rule,
  gate, eval and crew must not carry frontmatter.
- Breaks: malformed parts loading silently and agent routing failing later.
- Source: OpenRA reports missing type/field with the offending name instead of
  ignoring it; bevy's path checks reject empty components.

### 15. `declared` (lines 104-116)
- Why: extracts the declared ID from the heading, the body (`You are A01`), the
  crew sentence, frontmatter name or filename map, in that order.
- Breaks: absent and false IDs; specifically the engineer `-` bug, fixed by the
  filename map fallback.
- Source: godot reports duplicate declarations; blueprint fixes the ID space.

### 16. `bodyLines` (lines 117-130)
- Why: normalizes trim/case/whitespace and drops code fences, headings, tables,
  quotes, separators and lines under 40 chars or 7 words.
- Breaks: duplicate noise from boilerplate and formatting-only differences.
- Source: PMD CPD's minimum tile size before reporting a duplicate.

### 17. Scan setup (lines 131-135)
- Why: rejects a missing/non-directory root and a directory without AGENTS.md,
  `.opencode` or `library`; walks four known roots.
- Breaks: `[object Object]` style mistakes and scanning unrelated folders.
- Source: lychee's config-error path; task's usage-error requirement.

### 18. Part construction (lines 138-158)
- Why: computes relative POSIX path, kind, layer/source, BOM-stripped text,
  tokens, budget, frontmatter, ID; then checks BOM, CRLF, U+FFFD, active `{{`,
  budget, and missing ID.
- Breaks: encoding drift, silent budget overruns, placeholders shipping, and
  unidentified parts.
- Source: codex's hard byte budget message; OpenRA's warning/error counters;
  project encoding rule.

### 19. Duplicate lines (lines 159-164)
- Why: compares normalized body lines only within the active source and reports
  the first location.
- Breaks: copied rule text that will drift; cross-source copies are excluded on
  purpose so an installed part is not a duplicate of its library source.
- Source: PMD CPD grouped duplicate reporting.

### 20. Duplicate IDs (lines 165-172)
- Why: keys by `source:id`; active duplicates and core/game/pack collisions are
  errors, installed copies of library parts are not.
- Breaks: two parts claiming the same ID in one layer, which makes references
  ambiguous.
- Source: bevy duplicate map keys; godot duplicate class declarations.

### 21. Priority line (lines 173-186)
- Why: finds the AGENTS.md line with two or more layer words and a `>` and
  requires the words to be an ordered subsequence of `ORDER`; absence is a
  warning.
- Breaks: reversed priority lists that invert conflict resolution.
- Source: blueprint priority rule; codex ordering instructions root-to-cwd.

### 22. Priority prose (lines 187-193)
- Why: flags sentences where a lower-ranked layer claims to override a
  higher-ranked one.
- Breaks: a pack or docs paragraph quietly contradicting the AGENTS.md line.
- Source: task's priority-conflict requirement; OpenRA's explicit error text.

### 23. Stale references (lines 194-197)
- Why: token-boundary regex for R/S/A/E/CLI/G/D/C IDs, checked against the
  registry.
- Breaks: instructions pointing at parts that do not exist.
- Source: OpenRA's "Missing Type" and "Missing field" errors; godot's
  duplicate-name diagnostics.

### 24. Missing paths (lines 198-207)
- Why: in a real game tree only, checks backticked path-like spans in active
  non-eval parts; missing paths are warnings because `runs/*` and future
  `toolbox/` directories are legitimately absent in a fresh tree.
- Breaks: dead instructions; a hard error here would fail every fresh scaffold.
- Source: lychee resolves local paths relative to a root; glTF-Validator
  separates errors from warnings.

### 25. `printHuman` (lines 211-227)
- Why: fixed-width ID/KIND/LAYER/TOKENS/FILE table, aligned findings, explicit
  PASS/FAIL line.
- Breaks: unreadable CI logs and ambiguous results.
- Source: godot and glTF-Validator human summaries with counts.

### 26. `main` (lines 228-242)
- Why: resolves the root, maps findings to exit 1 and config to exit 2, emits
  schema-1 JSON with parts, budgets, errors and warnings.
- Breaks: CI being unable to distinguish "found problems" from "tool misused".
- Source: lychee's exit enum; glTF-Validator's JSON report with counts.

### 27. Entry guard (lines 243-248)
- Why: catches every unexpected error, prints one line and exits 2.
- Breaks: stack traces being mistaken for findings, or a crash exiting 1.
- Source: lychee `UnexpectedFailure`; OpenRA `Environment.Exit(1)` on errors.

## Test harness

- `tree` writes a fresh temp fixture per scenario; `run` accepts a root or a
  files object so a missing `tree()` cannot silently pass `[object Object]`;
  `raw` covers argument errors without a root; `check` isolates failures.
- `eq`, `has` and `lacks` assert exit codes, table/JSON content and the absence
  of false positives.
- 55 checks cover: pass and strict pass, help, usage errors, budgets and
  overrides, duplicate lines (exact and normalized), cross-source exclusion,
  duplicate IDs, priority order and prose, stale and known references, missing
  paths, frontmatter for agent/skill/command, rule frontmatter rejection, BOM,
  CRLF, placeholders, invalid UTF-8, JSON schema and exit codes.
- The cleanup loop removes every fixture; the harness is read-only against the
  repository under test.
