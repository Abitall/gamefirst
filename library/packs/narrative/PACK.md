# Narrative pack

Load on demand before story, lore, voice, a branch, an ending, or a line changes.
Adds reference for canon, voice, delivery, and continuity. S10 proves the slice,
S11 adds content, S12 polishes, P06 localizes. A checklist, not a story generator;
no runtime code.

## When to load

- A premise, theme, faction, place, character, timeline, or ending changes.
- A dialogue line, bark, item description, or UI string is written.
- A branch, flag, gate, or ending condition is added.
- A P06 handoff or continuity review is due.
- Not for combat tuning, art, marketing (P07), or engine work.

## Boundaries

- No runtime code, engine API, parser, dialogue runner, or save format.
- No invented canon: a fact enters `CANON.md` through D03, never a lone line.
- No restating S10-S12, no new rule, no publishing or spending.
- No copied prose, lyrics, names, or settings; ideas only (X02).
- No secrets, personal data, or credentials in canon, voice, or strings.
- Story cannot rescue a loop that is not fun (E09); fix the loop first.

## Three registers

| Register | Home | Holds | A change touches |
|---|---|---|---|
| Canon | `docs/narrative/CANON.md` | world, timeline, cast, endings | canon, D03, IDs |
| Voice | `docs/narrative/VOICE.md` | how each speaker sounds | voice, strings |
| Delivery | P06 string table | ID, text, context, length | one row |

Facts stay out of voice; voice out of IDs. Line edits touch delivery only;
voice edits touch voice and strings; canon edits touch canon, D03, and dependent
IDs (E01).

## Premise, theme, pillars

- Premise: who the player is, what they want, what blocks it.
- Theme: one question the story argues, not a moral it announces.
- Pillars: three to five, each with a story test and a "never".
- The story proves the loop's fantasy; it does not replace it.
- Record premise in D01, theme in D04, choices in D03.

## Character and world rules

- Every named character has a want, need, contradiction, canon boundary, and
  voice card; two missing means background.
- World rules (magic, tech, money, travel, death, time) must forbid something the
  plot could do; exceptions are canon, not one-off lines.
- Factions have a goal, a cost, and a reason to oppose the player; names enter
  the glossary once and keep one spelling.
- No retcon: change canon and list affected strings and branches.

## Dialogue voice

- One card per speaker in `VOICE.md`: rhythm, diction, taboo, subtext, a sample,
  and what they never say.
- Voice is how a character speaks, not what they know; keep lore out.
- A line must change state, reveal character, or land a joke; else cut it.
- Subtext over exposition: let a want leak through a refusal or shortcut.
- Barks are short, situational, repeatable; record what fires them.
- Read aloud; if it cannot be said in one breath, split it.
- Choice lines are voice too: same table, speaker marked.

## Branching and state

- Every branch has an entry condition, a state change, an exit, and a visible
  consequence; without the last, no branch.
- State is named flags with a default, owner, and reset point; no prose flags.
- A choice must cost or reveal something; one that only delays text is a click.
- Prefer one meaningful branch to three cosmetic ones; count reachable endings.
- Every ending needs a condition, a proof of theme, and a path back to the loop;
  a dead end is a hold.
- Save/load must restore the state the branch reads; if not, cut it.
- Draw the passage graph; mark unreachable, orphaned, and single-exit nodes.

## String tables and localization readiness

- One row per line: `id`, `text`, `context`, `max_length`, `notes`. IDs are
  stable, dotted, never reused (`ui.menu.start`).
- `context` names speaker, listener, moment, and prior event; a translator cannot
  see the scene.
- No concatenation, text in images, or hardcoded number, plural, or gender; use
  placeholders and plural rules, markup inside the string.
- Before P06: unique IDs, context on every row, no empty or orphan text, length
  checked in the real font and UI.
- Record the source language; no machine translation without human review.

## Continuity check

Run before a milestone, after a canon edit, or before P06 handoff.

1. Premise: does the slice still deliver the one-sentence promise?
2. Timeline: do events, travel, and ages line up in one order?
3. Knowledge: does each character know only what they witnessed or were told?
4. World rules: does a scene break a rule without paying for the exception?
5. Voice: can every line be traced to its speaker's card?
6. State: does every flag have a setter, a reader, a default, and a reset?
7. Delivery: does every changed line have an ID, context, and a P06 row?

## Review checklist

- [ ] Premise, theme, and pillars fit D01/D04 and the build (R1).
- [ ] Canon facts live in `CANON.md`; none only in dialogue.
- [ ] Every speaker has a voice card; no line is unassignable.
- [ ] Every branch has a condition, visible consequence, and exit.
- [ ] Every flag is named, defaulted, set, read, and reset.
- [ ] Every line has an ID, context, and length budget.
- [ ] Continuity passes with evidence, not memory.
- [ ] No copied text, secret, personal data, or engine dependency.
- [ ] The slice is fun without the story (E09); story adds, never rescues.

## Holds

Stop and escalate when:

- a canon fact changes the premise, an ending, or a shipped string;
- sources disagree and no D03 decision settles it;
- a branch needs a save format or feature the game lacks;
- a line cannot be translated without losing the joke or mechanic;
- a character has no want, need, or contradiction after two passes;
- a scene exists only to explain lore;
- the story carries a loop playtests do not enjoy (E09);
- a request asks for runtime code, publishing, or spending.

## Cross-refs

- D01 BRIEF, D03 DECISIONS, D04 GAME+TASTE, D06 cards, D07.
- S10 slice, S11 content, S12 polish; G2/G2.5; R1/R2/R9; E01/E06/E09; P01, P06,
  P07; X02 licenses and secrets.
