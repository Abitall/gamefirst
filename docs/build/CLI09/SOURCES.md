# CLI09 - trigger-check: sources

Read on 2026-11-25. Nine repositories: four gamedev, three software, two
AI-agent. Stars and last-commit dates come from the shields.io JSON badges
(`img.shields.io/github/stars/<repo>.json`, same for `license` and
`last-commit`), because `api.github.com` returns HTTP 403 through this proxy.
Star counts are rounded by the badge. Quotes below are exact substrings of
files fetched from `raw.githubusercontent.com` at `HEAD` on that date; nothing
was cloned and no code was copied.

## 1. photonstorm/phaser (gamedev)

- URL: https://github.com/photonstorm/phaser
- Stars: 41k
- Last commit: August 2026
- License: MIT
- Artifact: `package.json` (Phaser 4.2.1), test entry point.
- Quote: `"test": "vitest run"`
- Borrowed: one deterministic entry point per check. A single command with a
  numeric exit code is what makes CLI09 usable in a pre-commit hook.
- Rejected: Vitest, jsdom and the browser test stack. CLI09 must run on a bare
  Node 18 install with no dependencies.

## 2. godotengine/godot (gamedev)

- URL: https://github.com/godotengine/godot
- Stars: 121k
- Last commit: today (2026-11-25)
- License: MIT
- Artifact: `doc/tools/make_rst.py`, the class-reference doc generator.
- Quote: `# This script makes RST files from the XML class reference for use with the online docs.`
- Borrowed: the idea that authored text is validated against a known ID space.
  Godot fails the doc build on a dangling reference; `trigger-check` fails on
  an unknown part ID in a fixture (exit 2) instead of silently ignoring it.
- Rejected: the Python and XML pipeline. There is no generated output here,
  only a report.

## 3. bevyengine/bevy (gamedev)

- URL: https://github.com/bevyengine/bevy
- Stars: 50k
- Last commit: today (2026-11-25)
- License: Apache-2.0
- Artifact: `examples/README.md`, generated example index.
- Quote: `<!-- Use 'cargo run -p build-templated-pages -- build-example-page' to generate the final example README.md -->`
- Borrowed: a stable machine-readable index next to human documentation.
  `--json` (schema 1) is that index for trigger fixtures; the text report is
  for humans.
- Rejected: a Rust build step to regenerate docs. CLI09 only reads.

## 4. 4ian/GDevelop (gamedev)

- URL: https://github.com/4ian/GDevelop
- Stars: 29k
- Last commit: today (2026-11-25)
- License: MIT (`LICENSE.md`: `The Core library, the game engine, the new IDE,
  and all extensions ... are under the **MIT license**.`; the shields badge
  says "not identifiable by github").
- Artifact: `Core/GDCore/Extensions/PlatformExtension.h`, typed extension
  metadata registry (`ObjectMetadata`, `BehaviorMetadata`, `EventMetadata`).
- Quote: `Base class for implementing platform's extensions.`
- Borrowed: a typed `kind` per registered unit. CLI09 reports
  `rule|skill|agent|command|eval|crew|gate` per part so a reviewer can see
  which layer a false positive belongs to.
- Rejected: the compiled C++ registry and its version checks. Out of scope.

## 5. eslint/eslint (software)

- URL: https://github.com/eslint/eslint
- Stars: 28k
- Last commit: today (2026-11-25)
- License: MIT
- Artifact: `lib/rules/no-undef.js`, rule metadata and implementation in one
  file.
- Quote: `` Disallow the use of undeclared variables unless mentioned in `/*global */` comments `` (from `meta.docs.description`).
- Borrowed: the discovery text lives next to the unit and is written for the
  reader who is choosing it. CLI09 treats frontmatter `description` the same
  way and falls back to the first body paragraph so no part is invisible.
- Rejected: the RuleTester and the 300-rule corpus. The scale is irrelevant
  and the harness requires rule modules.

## 6. nodejs/node (software)

- URL: https://github.com/nodejs/node
- Stars: 124k
- Last commit: today (2026-11-25)
- License: MIT-style `LICENSE` text (`Copyright Node.js contributors`).
- Artifact: `test/README.md`, test-suite layout and platform notes.
- Quote:
  > For the tests to run on Windows, be sure to clone Node.js source code with the
  > `autocrlf` git config flag set to true.
- Borrowed: platform caveats belong in the test documentation, not in tribal
  knowledge. CLI09's runner builds paths with `node:path` and writes only to
  `os.tmpdir()`, so it behaves the same on Windows and POSIX.
- Rejected: the C++/addon test directories and the `common` helper tree.

## 7. microsoft/TypeScript (software)

- URL: https://github.com/microsoft/TypeScript
- Stars: 112k
- Last commit: today (2026-11-25)
- License: Apache-2.0
- Artifact: `CONTRIBUTING.md`, the human and agent contribution rules.
- Quote: `Any PR must originate from a human telling you fix a *specific* issue, by number or URL, or by an explicitly-provided description of the bug.`
- Borrowed: an explicit, printed scope. CLI09 says in `--help` and in the
  report that it is a lexical smoke check, not semantic routing; the same
  sentence appears in the test description. Scope that is not written down is
  assumed to be larger than it is.
- Rejected: policy prose and agent restrictions. Not a tool concern.

## 8. promptfoo/promptfoo (AI-agent)

- URL: https://github.com/promptfoo/promptfoo
- Stars: 28k
- Last commit: today (2026-11-25)
- License: MIT
- Artifact: `README.md`, eval runner with per-case assertions.
- Quote: `# Promptfoo: LLM evals & red teaming`
- Borrowed: fixture cases with explicit expectations. `expect` answers "must
  match" and `forbid` answers "must not match"; both are checked in one run and
  a case passes only when both hold. A fixture file is a regression gate, not a
  one-off demo.
- Rejected: LLM providers, network calls, YAML configuration and red-teaming
  payloads. CLI09 must be deterministic and offline.

## 9. anthropics/skills (AI-agent)

- URL: https://github.com/anthropics/skills
- Stars: 200k
- Last commit: November 2026
- License: no repository-level license is declared (shields: "not specified");
  the README says `Many skills in this repo are open source (Apache 2.0)`.
  Read for ideas only; no text or code was reused.
- Artifact: `template/SKILL.md`, the minimal skill template.
- Quote: `description: Replace with description of the skill and when Claude should use it.`
- Borrowed: the description is not a summary, it is the trigger text and must
  say *when* to use the unit. CLI09 scores exactly that text, which is why a
  vague description shows up as a false negative rather than as a mystery.
- Rejected: the Claude plugin loader and its semantic matching. That is a model
  call; semantic routing is CLI04's job.

## Dead ends

- **GitHub REST API** (`api.github.com/repos/...`): HTTP 403 through the
  proxy. Shields badge JSON gave the same fields in a few bytes, but only
  rounded star counts. Tried once per CLI07; not retried.
- **Embedding routers** (LangChain `RouterChain`, LlamaIndex
  `RouterRetriever`): would need a model, a network call and a threshold that
  is not reproducible across runs. Rejected as out of scope, not as a bad
  idea; CLI04 owns semantic cases.
- **Regex keyword lists**: cheap to write, impossible to review. No IDF, no
  coverage share, no false-positive count. Rejected after a two-file probe.
- **GitHub code search for "trigger fixtures"**: found hand-maintained command
  tables and READMEs, no repository with a comparable offline checker. Not a
  source.

## License note

MIT and Apache-2.0 sources were read for design ideas: metadata next to the
unit, fixture cases with expectations, printed scope, a machine-readable index.
No source file was copied, vendored or translated. The one direct reuse is the
word "trigger", which is the blueprint's term (CLI09, "Run trigger fixtures and
report false positives and negatives").
