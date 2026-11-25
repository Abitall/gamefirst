# Justification: narrative pack (P05)

## Why this pack exists

The framework has slice, content, and polish skills, but no narrative skill and no
optional reference for canon, voice, and delivery. A small story change therefore
has two bad options: edit a large bible for one line, or keep facts only in
dialogue where they drift. This pack supplies a three-register reference and
checklists so that a line edit touches delivery, a voice edit touches voice and
strings, and a canon edit is explicit. It is a reference pack, not a story
generator and not runtime dialogue code.

## Why a pack, not a rule or skill

A rule is binding for every task; narrative is optional and loaded on demand. A
skill is a procedure with steps; this pack is a lookup and a review checklist. It
does not restate S10-S12, add a gate, or ship a parser. The pack contract is
inherited from P01; the manifest, file list, hashes, and offline selftest make the
artifact inspectable without trusting the prose.

## Unit-by-unit accounting

Sources: `D01`, `D03`, `D04`, `D06`, `D07`, `S10`, `S11`, `S12`, `X02`, `P01`,
`P06` are project documents; `ink`, `Yarn`, `Ren'Py`, `Twine`, `i18next`, `Vale`,
`Weblate`, `Letta`, `promptfoo` are the analogs in `SOURCES.md`.

| Unit | Why | If removed | Shorter? | Source |
|---|---|---|---|---|
| Load trigger: story, lore, voice, branch, ending, or line changes | Names the moment the reference is useful | The pack is skipped until a continuity bug appears | No; it is the entry point | S10, S11; P01 |
| Scope exclusion: not combat, art, marketing, engine work | Keeps a narrative pack from becoming a general handbook | Readers expect tuning or store copy here | Already one line | P01; S11 |
| Boundary: no runtime code, engine API, parser, runner, or save format | Keeps the pack portable and testable as files | The pack becomes an engine module and ages with it | No; each noun blocks a real scope leak | P01; Ren'Py reject |
| Canon admission through D03, never a lone line | Stops dialogue from silently becoming canon | Facts drift and the bible stops being authoritative | No; this is the anti-drift rule | D03; Letta provenance |
| No restating S10-S12, no new rule, no publishing or spending | Protects the skill and gate boundaries | The pack competes with skills and bypasses approvals | No; boundary list is the contract | P01; S10-S12 |
| No copied prose, lyrics, names, or settings; ideas only (X02) | Prevents license and attribution surprises | A familiar name or line creates a legal and tonal debt | No; X02 requires the distinction | X02; ink, Twine |
| No secrets, personal data, or credentials in canon, voice, or strings | Narrative files are shared and shipped | Strings become a leak path | No; security boundary | X02 |
| Story cannot rescue an unfun loop (E09) | Keeps narrative subordinate to verified fun | A polished story hides a loop nobody wants to play | No; this is the honesty check | E09; S10, S11 |
| Three registers: canon, voice, delivery | Separates facts, speech, and IDs so edits stay local | Every line edit risks a bible rewrite | No; this is the pack's core | P01; Yarn, i18next |
| Change propagation: line to delivery, voice to voice and strings, canon to canon and D03 | Makes the cost of a change visible | Editors update one copy and leave stale IDs | No; table row is already compact | E01; Yarn, i18next |
| Premise: player, want, obstacle | Gives every scene a testable promise | Story becomes a sequence of unrelated beats | No; one sentence | D01, D04; S11 |
| Theme: one question, not a stated moral | Keeps theme arguable through play | The story lectures or has no through-line | No; the distinction is the rule | D04; S10 |
| Pillars: three to five, each with a story test and a never | Connects narrative choices to design pillars | Pillars stay slogans with no story consequence | Could merge into theme, but tests would blur | D04; S11 |
| Story proves the loop's fantasy; it does not replace it | Aligns narrative with the actual game | The pack encourages cutscenes for a loop that does not need them | No; one sentence | D04; E09 |
| Record premise in D01, theme in D04, choices in D03 | Gives decisions a durable home | The pack becomes the only copy and drifts | No; three pointers | D01, D03, D04 |
| Named character: want, need, contradiction, canon boundary, voice card | Makes a character testable rather than a name | Background characters accumulate unexplained behavior | No; five fields are the test | S11; Ren'Py |
| World rules must forbid something the plot could do; exceptions are canon | Turns lore into constraints instead of decoration | Magic or tech solves every problem on demand | No; the forbid clause is the point | D03; ink |
| Factions: goal, cost, reason to oppose; one glossary spelling | Gives conflict a cause and stops name drift | Factions become costume and spelling forks | No; three fields plus glossary | D03; Weblate glossary |
| No retcon in dialogue; change canon and list affected strings and branches | Makes retcons reviewable | A quiet line change breaks earlier scenes and translations | No; this is the continuity trigger | D03; Letta no silent rewrite |
| Voice card: rhythm, diction, taboo, subtext, sample, never-say | Gives each speaker a reproducible sound | Every writer invents a new voice per scene | No; fields are the minimum card | Yarn; Ren'Py |
| Voice is how a character speaks, not what they know | Keeps lore out of voice cards | Voice cards become second canon files | No; one distinction | Yarn; S11 |
| A line must change state, reveal character, or land a joke; else cut | Gives a delete test | Scenes fill with decorative chatter | No; three outcomes | Vale; S11 |
| Subtext over exposition; let a want leak through a refusal or shortcut | Prevents characters from explaining the plot | Dialogue reads as a wiki | No; one craft rule | Ren'Py; Vale |
| Barks: short, situational, repeatable; record the trigger | Fits barks to the loop and prevents repetition bugs | Barks fire in wrong states or repeat forever | No; four constraints | S11; Ren'Py |
| Read aloud; split a line that cannot be said in one breath | Catches written-not-spoken prose | Lines look fine and sound unsayable | No; one test | Vale; Yarn |
| Choice lines use the same table with speaker marked | Keeps player-choice voice in the delivery system | Choice text escapes localization and voice review | Could merge into string row, but the reminder is useful | Yarn; i18next |
| Branch: entry, state change, exit, visible consequence | Defines a branch as more than a text fork | Branches become invisible or dead | No; four parts | ink; Twine |
| State: named flags with default, owner, reset; no prose flags | Makes state inspectable and resettable | Saves and branches depend on ambiguous prose | No; each field prevents a bug | Letta; Ren'Py |
| A choice must cost or reveal; delay-only is a click | Distinguishes choice from filler | Menus pad runtime without meaning | No; one test | ink; S10 |
| Prefer one meaningful branch to three cosmetic ones; count reachable endings | Protects scope and branch quality | The graph grows faster than the content | No; scope rule | R9; Twine |
| Ending: condition, theme proof, path back to loop; dead end is a hold | Makes endings testable and replayable | Endings are unreachable or stop the loop | No; three parts | ink; S10 |
| Save/load must restore the state the branch reads, or cut the branch | Connects narrative state to the save contract | A reload silently changes the ending | No; binary test | Ren'Py; Letta |
| Passage graph: mark unreachable, orphaned, single-exit nodes | Finds structural holes without playing every path | Dead content ships unnoticed | No; three marks | Twine |
| String row: id, text, context, max_length, notes; stable dotted IDs, never reused | Gives every line a durable handle | Translations and references break on reorder | No; the row is the unit | i18next; Yarn |
| Context: speaker, listener, moment, prior event | Gives a translator the scene without the build | Translators guess tone and grammar | No; four fields | Weblate; i18next |
| No concatenation, text in images, hardcoded number, plural, or gender; placeholders and plural rules | Prevents untranslatable strings | Locales get broken grammar and unreadable images | No; each item is a known failure | i18next; Weblate |
| Before P06: unique IDs, context everywhere, no empty or orphan text, length checked in real font and UI | Makes the handoff reviewable | P06 inherits duplicate IDs and overflow | No; four exit checks | P06; i18next |
| Record source language; no machine translation without human review | Preserves authorship and review responsibility | Tone and jokes ship unreviewed | No; one policy line | Weblate; X02 |
| Continuity 1-3: premise promise, timeline order, character knowledge | Catches the three most common story breaks | Contradictions survive until a player finds them | Could split into three rows, but one pass is cheaper | Twine; Ren'Py |
| Continuity 4-5: world-rule exceptions and voice traceability | Catches lore breaks and unassignable lines | Rules and voices drift between scenes | Keep with 1-3 in one pass | D03; Yarn |
| Continuity 6-7: flag lifecycle and delivery row for every changed line | Catches state and localization orphans | A branch reads a flag nobody sets; a line misses P06 | No; these close the loop | Letta; i18next |
| Review checklist: nine boxes tied to the units above | Gives a reviewer a fast pass without rereading the pack | Review becomes taste without evidence | No; it is the output | P01; Vale |
| Holds: eight escalation triggers | Stops the pack from making decisions above its scope | Editors improvise canon, spend, or runtime changes | No; each hold is a real stop | P01; S10-S12 |
| Cross-refs: D01, D03, D04, D06, D07, S10-S12, G2/G2.5, R1/R2/R9, E01/E06/E09, P01/P06/P07, X02 | Keeps the pack connected to the framework | Readers cannot find the binding source | No; IDs are the index | Project docs |
| Template `story-bible.md`: one page of canon only | Gives canon a home without mixing voice or IDs | The bible becomes a second string table | No; canon-only is the separation | P01; ink |

## Design decisions

- **Three registers, not one document.** Facts, voice, and delivery change at
  different rates. Merging them makes a one-line edit look like a canon change.
- **Reference and checklists, not generation.** The pack never invents a premise,
  character, or line. It tells a writer what to check and where the fact lives.
- **Canon-only template.** Voice cards and string rows have different owners and
  review paths; the template points to them instead of copying them.
- **Pack contract inherited from P01.** No second contract, no `$schema`, no
  runtime. The selftest is the only executable part and it checks packaging only.
- **Holds over silent judgment.** Canon changes, missing engine features,
  untranslatable jokes, and scope leaks stop for a human decision.

## Rejected alternatives

- A full narrative GDD: too heavy for an optional pack and would duplicate S11.
- A dialogue script format or parser: runtime scope, engine-specific, and outside
  the pack contract.
- A genre lore bible: would ship invented canon and age badly.
- A prose style guide: useful, but a pack should be a checklist; the style rules
  stay with the project's own guide.
- A generated story prompt library: not reference, not testable, and encourages
  story to rescue an unproven loop.
- Copying an existing dialogue system: license and runtime risk; only ideas are
  borrowed, as recorded in `SOURCES.md`.

## Limits

- No genre-specific canon, names, or plot.
- No dialogue parser, compiler, save format, or engine API.
- No localization vendor management, pricing, or publishing.
- No claim that a checklist replaces playtesting or a writer's judgment.
- `CANON.md` and `VOICE.md` are proposed project paths; a project may relocate
  them if D03 records the change.

## Size and integration

PACK.md is 5,989 characters, about 1,498 tokens at four characters per token, and
132 lines including the final newline. The template is 1,693 characters. The
selftest is 249 lines and runs offline with no dependencies. Integration points are S10 (slice), S11 (content),
S12 (polish), G2/G2.5, P06 (localization), P01 (pack contract), and X02 (licenses,
secrets, external content).
