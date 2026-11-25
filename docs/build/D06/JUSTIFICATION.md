# D06 Justification - System Card

Status: ready for review.
Artifact: `artifact/template/docs/systems/SYSTEM-CARD.md` - 60 lines, 1,942 chars, 485.5 tokens.
Mirror: `template/docs/systems/`, one card per system.
Scope: the template only. No filled card, no gate checklist, no engine content.

## Why this unit exists

D06 is the map of a system that already runs. Without it the build is the only
memory of what the system promises: the next session re-derives the inputs, the
next programmer guesses the config key, and a reviewer cannot separate a claim
from a guess. The card is not a GDD and not a design doc (R5:25-28). It is the
one page a programmer reads before touching a system and the page a reviewer
checks the claim against. R1 needs a place where `verified by` names an artifact
(R1:34); S02 needs a claim whose evidence folder can be found (S02:27). D06 is
that place.

## Semantic units

Every instruction, prohibition, slot and status word in the artifact is listed
below. "Breaks" is the failure that follows if the unit is removed or changed.

| # | Unit (line) | Why it is there | What breaks | Source |
|---|---|---|---|---|
| 1 | `# SYSTEM CARD` (1) | names the document type | the file reads as a system design doc and gets edited as one | D06 brief |
| 2 | path, one system per file, kebab-case (3-4) | a card is found by system name; git history and links stay per system | a multi-system file cannot be verified, cut or linked independently | blueprint:263, A02:67 |
| 3 | English (4) | single vocabulary for search and review | mixed-language keys and headings stop resolving | blueprint:263 |
| 4 | one page (4) | forces a map, not an essay | a long card duplicates the GDD and rots first | R5:25-33 |
| 5 | `draft` is the approved plan, not proof (4-5) | A02 needs a card before code; R5 forbids claiming a working system | either A02 cannot write, or the card lies about being done | A02:70, R5:46 |
| 6 | exact only after the mechanic runs, someone plays it, verify passes (5-6) | states the R5/S02 gate in one line | a card written from intention passes review and is never true | blueprint:344, R5:46, S02:29 |
| 7 | build is truth; stale card follows; failing test is a build bug (6-7) | kills drift in both directions: doc follows code, test is never rewritten to match prose | edited tests hide regressions; a doc arguing with code misleads | R1:14, R1:25-26, R5:25-26 |
| 8 | no code (7) | a snippet in prose is a second copy that cannot run | the copy decays and the reader trusts it | R5:25-26, D06 brief |
| 9 | no engine APIs (7) | cards must survive an engine swap (`src/systems` rule) | engine names fossilize the doc and leak across the adapter boundary | `template/AGENTS.md:40-43`, A03:77 |
| 10 | no values; a value is a key in `src/data/` (7-8) | numbers go stale silently; keys are the stable contract | one tuning change turns the card into a lie (E01's fixture shows it) | A02:69, A03:78 |
| 11 | no future tense (8) | a card records what is; plans belong to `BACKLOG.md` | promises read as commitments and never expire | R5:39 |
| 12 | status change recorded in `STATE.md` (8-9) | `STATE.md` is the live project state (D02); the card is per system | two places claim the phase and disagree | D02, `template/AGENTS.md:32` |
| 13 | design change is a `DECISIONS.md` entry first (9) | D03 is append-only; a card edit without a decision loses the why | silent design drift | D03, `template/AGENTS.md:33` |
| 14 | `Name: [...]` (12) | identifies the system and matches the file name | a card set with no name cannot be indexed | A02:67 |
| 15 | four status words (13) | one vocabulary; each word has a testable meaning | free-text status ("mostly done") cannot be checked | D06 brief, R5:46 |
| 16 | `draft`: plan only, no test has run (13-14) | separates intent from evidence | a draft presented as proof | A02:70, R1:25-26 |
| 17 | `working`: in the build, named tests pass, played once (14) | the R5 bar before verify | "it works" with no run and no player | R5:46 |
| 18 | `verified`: S02 PASS (14) | the only state that may be called done | done claimed on a green mood | R1:34, S02:29 |
| 19 | `cut`: removed, card kept as the record (15) | removal is a state, not a deletion | silent deletion loses the lesson and invites a re-add | D06 brief |
| 20 | player fantasy in one sentence (17-21) | the reason the system exists, in player terms | a card that lists mechanics without a fantasy invites scope creep | A02:67 |
| 21 | what it asks; feel stays in `GAME.md` (18-19) | bounds the card to one system; D04 owns global feel | duplicated feel guidance drifts | D04, `template/AGENTS.md:33` |
| 22 | inputs, one per line, source named (23-25) | an input with no source is unimplementable; the list is the test surface | a missing input is a hidden dependency | A03:72 |
| 23 | outputs, one per line (30-32) | defines the contract readers depend on | a consumer built on an unlisted output breaks | A03:63-67 |
| 24 | the failure the player sees (31-32) | failure is an output; naming it prevents silent failure | "it just does not work" bugs | D06 brief |
| 25 | reader named: system, save, screen (31-32) | forces a concrete observer and an integration test | vague "the game updates" | D06 brief |
| 26 | config file + key, never the number (37-38) | the key survives tuning; the number does not | the card contradicts the build after one balance pass | A02:69, A03:78 |
| 27 | exact test names, not counts (43-45) | a name is runnable and reviewable; a count is a claim | "12 tests pass" proves nothing | R1:14, R1:25-26, A03:63 |
| 28 | a unit test per rule and edge (44-45) | maps the card's rules to tests; edges are where cards lie | an untested edge is a future bug report | A03:72 |
| 29 | an integration test per flow (45) | inputs and outputs are flows; units cannot prove they are wired | green units, broken game | A03:81-82 |
| 30 | a draft leaves tests empty (45-46) | A03 adds names when they run; a draft must not invent them | invented names become permanent fiction | A03:86, D06 brief |
| 31 | a name that does not run is not proof (46) | R1's core; a name can be copied from a test that never executed | false evidence | R1:25-26, S02:59 |
| 32 | date + path (51-53) | makes the claim auditable and orders cards by freshness | undated proof cannot be trusted | R1:34, S02:27 |
| 33 | the S02 evidence folder for the claim (52-53) | one claim, one folder; the format S02 owns | scattered artifacts "do not count" | S02:27 |
| 34 | empty in `draft` and `working` (53) | only verified has evidence; otherwise the slot invites a placeholder | a path to nothing | S02:29 |
| 35 | at most three questions (55-57) | matches R2's cap; a card with ten questions is not ready | unbounded questions stall the next action | R2, `template/AGENTS.md:25` |
| 36 | each question gets a recommendation (56) | a question without a proposal shifts the work to the reader | "what do you think?" loops | R2 |
| 37 | an answered question moves to `DECISIONS.md` (56-57) | one home for settled decisions; the card stays current | answers buried in cards get lost | D03 |
| 38 | `none` when there is nothing open (57) | an empty section is ambiguous: forgotten or none | the reviewer cannot tell | D06 brief |
| 39 | `[...]` slots, no `{{` (whole file) | visible fill points that survive the installer | `{{...}}` is the framework's substitution syntax and may be stripped | D01 precedent |

## Deliberately absent

- **GDD, feature list, roadmap.** The card documents one working system. Scope
  is `BACKLOG.md` and `STATE.md`; a roadmap here would be a second plan (R9).
- **Formulas, stat tables, balance numbers.** Values live in `src/data/` and the
  code. A number in prose goes stale on the first tuning pass; this is exactly
  the failure E01's fixture encodes.
- **Architecture, module map, engine API names.** The code is the map (R5:25-33);
  engine facts live in `docs/engine/` and the adapter.
- **Playtest quotes, telemetry, metrics.** `docs/playtests/` owns the session;
  the card cites only the verdict path in `verified by`.
- **Screenshots or mockups.** Visual truth is the build; an image is a second
  source that drifts and ages.
- **Owner, estimate, sprint, priority.** Production fields belong to `STATE.md`,
  `BACKLOG.md` and sprint docs, not to a system card.
- **Test code.** The test file and the runner own it; a copy in prose cannot run
  (R1:14).
- **Revision history.** Git owns history; `DECISIONS.md` owns decisions (D03).
- **A filled example system.** It would be copied, not read; the slots teach the
  shape and stay engine- and game-agnostic.
- **Acceptance criteria or a done checklist.** Status, test names and
  `verified by` already encode done; a second list drifts from the first.
- **Emotional design theory.** `GAME.md` owns feel and anti-rules (D04).

## Consistency check

| ID | Where it appears | Why it resolves |
|---|---|---|
| D02 | "recorded in `STATE.md`" | names the file, not just the part ID |
| D03 | design change, answered question | same file is named in both places |
| D04 | feel stays in `GAME.md` | file named next to the part ID |
| S02 | exact gate and evidence folder | verify owns PASS and `evidence/` |
| R1 | build is truth, no proof without a run | the rule behind `verified by` |
| R5 | one page, after play, no future tense | the doc-order rule |
| R2 | at most three questions, each with a recommendation | the question cap |
| A02 | `draft` authorship | designer writes the card before code |
| A03 | code, tests, evidence after approval | engineer fills names and proof |

Every cited part is also named as a file, so a reader without `.opencode/` still
resolves the reference.

## Size

| Measure | Value | Limit | Headroom |
|---|---|---|---|
| characters | 1,942 | 2,600 (650 tokens x 4) | 658 |
| tokens (chars/4) | 485.5 | 650 target / 800 hard | 164.5 / 314.5 |
| lines | 60 | one page | - |
| max line | 80 | 80 | 0 |
| bytes | 1,942 | - | - |

## Risks and limits

- **`draft` is a reconciliation, not a word R5 uses.** A02:70 and A03:63 need a
  card before code; R5:46 allows the card only after play. The template labels
  the early card `draft` and states it is not proof. If the parent rejects the
  word, the header clause and one enum value go; A02 then has no legal state for
  its output.
- **E01 and S09 still assume values in cards.** Until those fixtures are fixed,
  two framework files contradict this card. The smallest fix is in `REPORT.md`,
  open question 1.
- **No card validator exists.** The check in `REPORT.md` validates the template's
  shape, not a filled card. R5:50 promises a docs lint; the cheapest version is
  a `verified by` presence check.
- **Test paths assume the A03 layout** (`tests/unit/`, `tests/integration/`). A
  repo with another layout edits two slot lines; nothing else moves.
- **Part IDs are framework vocabulary.** Each is paired with a file name, so the
  card still reads in a bare game repo.
