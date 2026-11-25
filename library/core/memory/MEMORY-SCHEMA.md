# M01: Memory schema

`game-agent-memory` is a separate git repository for knowledge that outlives one
game: rules, skills, lessons, engine lessons, patterns, toolbox, preferences. It
is not a second copy of a game. Each part's main file (a lesson `.md`, a skill's
`SKILL.md`, a tool's `README.md`) carries this header.

```yaml
---
id: L-003
type: lesson
trigger: when a build passes locally but fails in CI
evidence: evidence/project-a/2026-11-20.md
scope: project-a
expiry: 2027-05-25
replaces: none
status: candidate
---
Body: the part itself.
```

## Fields

| Field | Rule |
|---|---|
| `id` | `^[A-Z]{1,2}-?[0-9]{1,3}$`; unique; never reused. |
| `type` | `rule`, `skill`, `lesson`, `engine`, `pattern`, `tool`, `preference`; selects `<type>s/`; `tool` -> `toolbox/`. |
| `trigger` | One line beginning `when `; the agent matches it against the task. |
| `evidence` | `evidence/<project>/<YYYY-MM-DD>.md`, or `none`; `accepted` needs a path. |
| `scope` | `all`, `engine:<name>@<version>`, or a project name matching `[a-z0-9-]+`. |
| `expiry` | `YYYY-MM-DD`, at most 12 months out; expired items are not pulled; the next retro retires or re-dates. |
| `replaces` | `none` or one id; on acceptance, that item is `retired`. |
| `status` | `candidate`, `accepted`, `retired`; forward only. |

## Admission

- A new item starts as `candidate`; it may have `evidence: none` and is not
  loaded into a game.
- `accepted` needs the M01 gate: a second project or two failures.
  `evidence` names the proof.
- Promotion happens in `retrospect` (S03): the retro proposes, the user admits.
  The agent never accepts its own item.
- When an accepted item changes an existing part, `replaces` names what it merges
  or removes (R6); otherwise `none`. A candidate with no second proof after two
  projects is deleted.

## Index

`MEMORY-INDEX.md` has one line per item:
`id | type | status | scope | expiry | trigger`, sorted by id, no `|` inside a
field. Regenerate it from the headers; a mismatch fails the check. The index, not
a directory scan, decides what loads. It is the only admission index.

## Sync

The memory repo is cloned beside the game. Copy, never submodule.

- `pull`: copy `accepted`, unexpired items whose `scope` matches; write path and
  sha256 to `agent.lock.json`; refuse to overwrite a local edit.
- `push`: write a change as a `candidate` that `replaces` the live item; the live
  item stays until the user admits it; the user reviews the diff.
- `diff`: report `clean`, `stale`, `modified`, `diverged`, `unknown`, `missing`,
  `missing-source`, `blocked`; write nothing.

## Not stored

Game docs (`BRIEF`, `STATE`, `DECISIONS`, `GAME`, `TASTE`, `BACKLOG`, systems,
playtests, retros), game code, assets, secrets, raw chats, unvalidated ideas.
Game docs stay in the game repo, scratch in `NOTES`/`INBOX`; memory links, never
mirrors.

## Check

E07 is the fixture: a one-project lesson becomes a `candidate` with all eight
fields and one index line, `rules/` untouched. Each field rule above is a machine
test; the index is regenerate-and-diff. A checker reads headers and the index
only; the body is prose.
