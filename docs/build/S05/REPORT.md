# S05 tool — report

**Status:** complete, pending review
**Artifact:** `artifact/library/core/skills/tool/SKILL.md` (52 lines)
**Scope:** one new core skill. No other project file was modified.

## Summary

The skill turns the blueprint's one-line S05 definition into a procedure with a
trigger, four inputs, ten steps, an R6 admission gate, an output shape, and
three boundaries. It is project- and engine-agnostic: no engine, studio, game,
or repository name appears in it.

The distinctive decisions are:

1. **Reuse before creation.** Step 1 searches `toolbox/`, prefers a flag or a
   merge, and names a duplicate as a rejection reason.
2. **Runtime follows the machine.** Step 3 uses an already installed runtime
   and records its version; it forbids a framework, a build step, and a global
   install.
3. **Evidence is a test, written first.** Step 5 requires one fixture, a
   passing and a failing case, and the exact command; Step 10 keeps the log.
4. **Version and discovery are files.** Step 7 adds a semver `VERSION`; Step 9
   adds one row to `toolbox/README.md`, creating it if missing.
5. **Admission is four named things.** The R6 section asks for the failure or
   measured gap with evidence, the smallest fix, what is replaced or merged,
   and the proving test.

Out of scope by design: a one-off command and a game feature. Both are named in
the Trigger, and the game case is routed to A03.

## Size

| Metric | Value | Limit or target | Verdict |
|---|---:|---|---|
| Characters (ASCII, so bytes) | 3,110 | — | — |
| Tokens, `chars / 4` | **777.5** | ≤ 800; target 720–780 | PASS |
| Words | 523 | — | — |
| Tokens, `words × 1.35` | **706.05** | secondary estimate | PASS |
| Lines | 52 | one page | PASS |

The rubric metric is `chars / 4`. The word-based estimate is reported because
the two can diverge on punctuation-heavy text; both are under 800. No required
content was cut to fit. The final edit added `R2` and `E12` to the cross-ref
index (773.0 → 777.5), which keeps the artifact 2.5 below the target ceiling.
Any further addition must be paired with a cut or reported as over target.

## Checks

| Check | Result | How |
|---|---|---|
| Frontmatter: `name`, one-line description, allowed-tools | PASS | `name: tool`; tools are Read, Write, Edit, Glob, Grep, Bash only |
| Required headings | PASS | Trigger, Inputs, Steps, Admission (R6), Output, Boundaries, Cross-refs |
| Ten steps | PASS | Numbered list, each with a bold lead |
| Size band | PASS | 777.5 ≤ 800 and inside 720–780 |
| Encoding | PASS | UTF-8 without BOM, LF only, ASCII, no tabs or trailing spaces |
| Required cross-refs | PASS | R1, R3, R4, R6, R10, S02, E02, E03 present; R2 and E12 are cited in the body and indexed |
| No engine, game, or repository specifics | PASS | Manual read; only runtime examples and a Windows-safe naming rule |
| No secret, network, or publish instruction | PASS | Boundaries forbid all three without an explicit command |
| No duplicated rule text | PASS | Cross-refs are IDs and short owner labels only |
| Sibling voice and structure | PASS | Same order and imperative tone as S01–S04 |
| Nine sources, 4/3/2 | PASS | `SOURCES.md` table; every row has URL, stars, license, artifact, borrow, reject |
| Every semantic unit accounted for | PASS | 27 units and 10 omissions in `JUSTIFICATION.md` |

### Reproduction

The artifact checks were run from the repository root with Node reading the
script from stdin (PowerShell here-string; the same script works with any shell
that preserves quoting):

```powershell
@'
const fs = require("fs");
const p = "C:/Phaser Projects/gamefirst/staging/S05/artifact/library/core/skills/tool/SKILL.md";
const s = fs.readFileSync(p, "utf8");
const a = (n, c) => { console.log((c ? "PASS " : "FAIL ") + n); if (!c) process.exitCode = 1; };
const chars = [...s].length, words = s.trim().split(/\s+/).length;
a("frontmatter-name", /^---\nname: tool\n/.test(s));
a("allowed-tools", /allowed-tools: Read, Write, Edit, Glob, Grep, Bash\n/.test(s));
a("headings", ["## Trigger", "## Inputs", "## Steps", "## Admission (R6)", "## Output", "## Boundaries", "## Cross-refs"].every(h => s.includes(h)));
a("steps-10", (s.match(/^\d+\. \*\*/gm) || []).length === 10);
a("size-band", chars / 4 >= 720 && chars / 4 <= 800);
a("encoding", s.charCodeAt(0) !== 0xFEFF && !s.includes("\r") && !s.includes("\t") && !/[ \t]+\n/.test(s));
a("refs", ["R1", "R3", "R4", "R6", "R10", "S02", "E02", "E03"].every(id => s.includes(id)));
console.log(JSON.stringify({ chars, words, charsDiv4: chars / 4, wordsX135: +(words * 1.35).toFixed(2) }));
'@ | node
```

Observed output: seven `PASS` lines, no `FAIL`, then
`{"chars":3110,"words":523,"charsDiv4":777.5,"wordsX135":706.05}`.

## Coverage

| S05 requirement | Where |
|---|---|
| Trigger: twice, or cross-project measurement | Trigger, line 13 |
| Exclusions: one-off, game feature → A03 | Trigger, line 14 |
| Inputs: task, contract, runtime/users/limits, existing tools | Inputs, lines 18–21 |
| Search `toolbox/`, reuse or merge, reject duplicate | Step 1 |
| Smallest useful tool, one job | Step 2 |
| Installed runtime, version, no framework/build/global | Step 3 |
| CLI contract, streams, exit codes, help, POSIX paths | Step 4 |
| Test first, fixture, passing and failing case | Step 5 |
| README: install, usage, example, limits, runtime, license/source | Step 6 |
| Semver `VERSION` and bump rules | Step 7 |
| `toolbox/<name>/`, copy not link | Step 8 |
| One index row, five fields | Step 9 |
| Run test, keep log, exact command | Step 10 |
| R6 admission: four named things | Admission |
| Output: folder, row, one-line result | Output |
| Boundaries: secrets/network/publish; no framework/engine/game; stop and ask | Boundaries |
| R1 evidence | Steps 5 and 10; Reproduction above |
| Cross-refs | Cross-refs, line 52 |

## Open questions

1. **Game-repo toolbox path.** The blueprint's game tree has no `toolbox/`,
   while the gamefirst tree has `library/toolbox/`. The skill says
   `toolbox/<name>/` and notes `library/toolbox/` for gamefirst. Current default:
   a game repo creates `toolbox/` at its root on the first tool. Confirm or
   amend the blueprint.
2. **Who creates `toolbox/README.md`?** Step 9 creates it if missing. The
   alternative is the repo skeleton or CLI, so the index exists before the first
   tool. Two owners would drift; one should be chosen.
3. **Is a per-tool `VERSION` compatible with `agent.lock.json` (X03)?** Tools are
   not library parts and have no IDs. Current default: index row plus `VERSION`;
   the lockfile does not track tools. Confirm this is the intended boundary.
4. **S02 has no claim type for a tool test.** `verify` covers builds, types,
   tests, screenshots, and evidence, but a toolbox tool is not a library part.
   Is the log in the tool folder enough, or should S02 gain a `tool` claim? S04
   recorded the same gap for imported parts.
5. **Exit code 2 for misuse.** Adopted as a convention (`0` ok, `1` failure,
   `2` misuse). No project-wide contract was found. If one exists, cite it or
   drop the third code.
6. **Does the sync step copy `toolbox/`?** Step 8 says copy the folder by hand.
   If `sync-agent`/CLI05 is expected to carry `library/toolbox/` into game
   repos, the skill should say so; the blueprint is silent.
7. **Runtime examples read as a list.** "Node, Python, PowerShell" follows
   "runtime available on the machine", so they are examples. A reader could
   still treat them as the only allowed runtimes. If that matters, change to
   "for example" — at the cost of three words.

## Rubric self-check

| # | Criterion | Verdict | Note |
|---|---|---|---|
| 1 | Necessity | PASS | 27 units, each with why it exists, what breaks if removed, and a source; 10 deliberate omissions with reasons. |
| 2 | Function | PASS | A reader can go from trigger to a tested, versioned tool folder without another document; each step has one action. |
| 3 | Evidence | PASS | Nine repositories, 4 gamedev / 3 software / 2 AI-agent, each with URL, 2026-11-25 stars, license, artifact, borrow, reject; three dead ends; no copying. |
| 4 | Fit | PASS | Core layer; no engine or project names; cross-refs are IDs. S02, E02, E03 resolve in the blueprint, though their files are not in this checkout. |
| 5 | Size | PASS | 777.5 by `chars / 4`; 706.05 by `words × 1.35`; both under 800, primary metric inside 720–780. |
| 6 | Language and encoding | PASS | English imperative; UTF-8 no BOM, LF, ASCII, no tabs or trailing spaces; POSIX paths with a Windows-safe naming rule. |
| 7 | Security | PASS | No secret in code, fixture, or output; network, service, and publish require an explicit command (R4, E12); external code is adapted, not pasted (R3). |
| 8 | Testability | PASS | The tool must ship a fixture, a passing and a failing case, and an exact command; the skill's own checks are reproducible above. R6 admission remains a prose judgment, not a mechanical one. |
| 9 | Integration | PASS | Stable IDs; the skill loads alone; one index row and one `VERSION` per tool; no rule restated. |

## Known weaknesses

- **Tight ceiling.** 777.5 leaves 2.5 tokens of target headroom; a later edit
  can cross 780 without looking large. The report records the number so a
  reviewer can see the margin.
- **Estimator, not a tokenizer.** `chars / 4` is the rubric's approximation. A
  real tokenizer can differ by a few percent; `words × 1.35` is the second
  estimate, and both stay under 800.
- **Admission is not mechanical.** "At least twice" is checked by a human or an
  agent reading the claim; the skill cannot prove it.
- **No dependency threshold.** "No framework, large dependency" is a judgment;
  R6 and X02 own the boundary, and a numeric limit would be arbitrary.
- **Test runner assumption.** The test is an exact command, so a runtime
  without a test framework can use a scripted assertion — but the skill does
  not spell that case out.
- **One fixture.** Required coverage is a passing and a failing case, not edge
  cases; a tool with parsing or path logic may need more.

## Review

Review: accepted 2026-11-26
