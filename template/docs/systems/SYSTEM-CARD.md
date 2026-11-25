# SYSTEM CARD

`docs/systems/<system>.md`: one system per file, kebab-case, named after the
system. English, one page. A `draft` is the approved plan, not proof (A02; R5);
the card is exact only after the mechanic runs, someone plays it, and `verify`
passes (S02). The build is truth (R1): a stale card follows it; a failing test
is a build bug, not a test to edit. No code, no engine APIs, no values, no
future tense: a value is a key in `src/data/` (A03). A status change is recorded
in `STATE.md` (D02); a design change is a `DECISIONS.md` entry first (D03).

## System
Name: [...]
Status: `draft | working | verified | cut` - draft: plan only, no test has run;
working: in the build, named tests pass, played once; verified: S02 PASS; cut:
removed, card kept as the record.

## Player fantasy
One sentence: the moment this system gives the player, and what it asks; the
game's overall feel stays in `GAME.md` (D04).

[...]

## Inputs
What it reads, one per line; name the source: a player action, another system,
or a `src/data/` key.

- [...]
- [...]

## Outputs
What changes outside it, one per line, including the failure the player sees;
name the reader (system, save, screen) and what it observes.

- [...]
- [...]

## Config keys
File and key, never the number (A03): `src/data/<file>.json` -> `<key.path>`.

- [...]
- [...]

## Tests
Exact names as the runner prints them, not counts: a unit test per rule and
edge, an integration test per flow (A03). A draft leaves this empty; a name that
does not run is not proof (R1).

- `tests/unit/<file>` - `[test name]`
- `tests/integration/<file>` - `[test name]`

## Verified by
`[YYYY-MM-DD]` and `[path]`: the S02 evidence folder for the claim (R1). Empty
in `draft` and `working`.

## Open questions
At most three; each gets a recommendation (R2); an answered one moves to
`DECISIONS.md` (D03). Write `none` if there are none.

1. [...]? Recommend: [...].
2. [...]? Recommend: [...].
