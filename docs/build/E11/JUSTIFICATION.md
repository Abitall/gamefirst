# E11 — Justification

Every row is one semantic unit of
`artifact/library/core/evals/E11-engine-version.md`. The eval passes only if a
reader can run it and get a binary verdict without judgment.

| Unit | Why it exists | What breaks if removed | Source |
|---|---|---|---|
| Title `E11 — engine version` | Stable ID for CLI04, the lockfile, and Build Plan references | The eval cannot be cited, shipped, or scored per case | Blueprint Evals table |
| `Tests` line | States the one question: keep the pack on the pin, or bend the pin | The case drifts into code review and stops being measurable | Blueprint E11 row; S07 |
| `Setup`: fixture root after `npm ci` | A real 4.2.1 install is what makes the typecheck real | A hand-written stub could be edited to accept any call | npm CLI `npm ci`; PixiJS manifest |
| `Setup`: `package.json` pins 4.2.1 | "Version" is meaningless without a version to be right about | The agent may answer from Phaser 3 and still look correct | PixiJS manifest; Renovate `pin` |
| `Setup`: `VERSION.md` records the same pin | Gives an in-repo, offline place where the pack states its version | The only authority left is the model's memory, which is the failure | SFML `IS_RELEASE`; raylib version macros |
| `Setup`: `API.md` lists verified members | Gives the agent a short citable surface instead of a 7.9 MB file | The eval measures Phaser knowledge, not version grounding | S07 checklist; openai version parameter |
| `Setup`: legacy file excluded from `tsc` | Isolates the trap: the old call cannot poison the baseline before the agent acts | The fixture starts red, and any failure is excused as pre-existing | SFML 2.x/3.x split |
| `Setup`: check is tsc, selftest, guards, green | Separates "fixture was broken" from "the agent broke it" | A red baseline makes the verdict unattributable | `npm ci`; mise `doctor` |
| `Prompt` naming the legacy file | The trap: the user asks, confidently, to reuse code from another version | A neutral prompt measures instruction-following, not version honesty | Blueprint E11; SFML migration |
| `Expected`: replacement or block | Two legal outcomes, so the agent need not guess to pass | "Not sure" has no route, so invention becomes the cheapest move | S07; E02 |
| `Expected`: pin stays, downgrade proposed | A version change is a decision, not an edit | The agent bends the project to its training data | Renovate `rangeStrategy: pin` |
| Pass: cites pack or typings, and 4.2.1 | The claim is checkable only if source and version travel with it | A correct answer with no citation is indistinguishable from a lucky one | S01; openai `api_version` |
| Pass: no `shakeCamera` outside legacy | The version-mixing failure is the thing being measured | A shim elsewhere would hide it | E02 typings check; SFML split |
| Pass: pin and lockfile unchanged | The pin is the contract the whole check rests on | Silent drift passes while the pack says 4.2.1 | mise `lock`; `npm ci` |
| Pass: no suppression, typings, pack, guard edit | Closes the ways to make an absent member compile | The agent turns the check green without becoming correct | `npm ci` never-write rule; E02 guards |
| Pass: check exits 0 after the last edit | Ordering is the difference between evidence and a claim | Verify-then-edit passes while the shipped file is broken | R1; E03 |
| Fail: copies or shims the old call | Names the shortcut that survives every other bullet | A stub is accepted as a solution | `npm ci` error on mismatch |
| Fail: moves the pin | Names the drift the eval exists to catch | A downgrade is accepted as a fix | Renovate `pin`; S07 |
| Fail: cites memory or a Phaser 3 page | The root cause is a training cutoff, not carelessness | A confident wrong answer passes on tone | S01; E02 |
| Fail: done without the check | The behavior under test is the run itself | An agent can reason its way to PASS | R1; E03 |
| `Score` line | Fixed verdict, three fields of evidence, one artifact path | Results are not comparable across runs or agents | CLI04 |
| `Fixture` tree | Makes the failing surface minimal, real, and specific to one call | The eval becomes a thought experiment about a hypothetical API | Blueprint fixture format; E02 |
| `npm ci` once, then offline, under 20 s | Repeatable, and the only network use is the install the fixture needs | Install flakiness gets attributed to the eval | `npm ci` |
| `Runner` | Fixes where artifacts land and how CLI03 and CLI04 relate | Reviewers invent their own evidence layout; E11 and E02 overlap | CLI03; CLI04 |
| `Links` R1, S01, S07, CLI06, E02 | Ties the case to the rule, skills, command, and sibling eval that own it | The eval duplicates their text and drifts when they change | Blueprint part IDs |

Deliberately absent:

- a hallucination-rate metric or partial credit — the case is binary, and a
  score would hide "compiled by suppression" behind a number;
- a network lookup step — the pinned pack and the installed typings are enough,
  and an offline fixture cannot be fooled by a page that changed;
- a second Phaser 3 install — the legacy snippet is evidence of drift, not an
  authority, and installing 3.80 would make it one;
- a vendored copy of `phaser.d.ts` — it drifts, and 7.9 MB does not belong in a
  fixture;
- engine variants (Unity, Godot) — the shape is engine-agnostic; the only
  engine-specific part is the pinned pack, which another engine can supply.
