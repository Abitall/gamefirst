# Sources: narrative pack (P05)

Evidence base: nine repositories, read on 2026-11-26. Star counts are exact
values from `ungh.cc` for that date; GitHub HTML shows rounded counts. Licenses
were checked on the repository page or in the raw license file. No source code
was copied. GPL-3.0 projects were read for ideas only, as required by X02.

## Gamedev (4)

### 1. inkle/ink

- URL: https://github.com/inkle/ink
- Stars (2026-11-26): 5,034
- License: MIT (repository page)
- Analog: branching narrative authoring; story content and runtime state are
  separate; a compiled story is consumed by a game.
- Borrow: a branch has explicit entry, state change, exit, and visible
  consequence; keep canon out of runtime state.
- Reject: the ink language, compiler, runtime, and file format. The pack ships
  no parser and no compiled story data.

### 2. YarnSpinnerTool/YarnSpinner

- URL: https://github.com/YarnSpinnerTool/YarnSpinner
- Stars (2026-11-26): 2,878
- License: MIT (`LICENSE.md`)
- Analog: dialogue authoring for games, with stable line identifiers and a
  localization workflow.
- Borrow: one durable ID per line; separate speaker voice from the string table;
  keep context next to the line rather than in the writer's head.
- Reject: the Yarn runtime, compiler, node format, and Unity integration. The
  pack only describes the handoff.

### 3. renpy/renpy

- URL: https://github.com/renpy/renpy
- Stars (2026-11-26): 7,062
- License: MIT (GitHub README states contributions are MIT and points to the
  official license page; no root `LICENSE.txt` at HEAD)
- Analog: dialogue, branching, translation, and save/load in one narrative
  engine.
- Borrow: save/load must restore the state a branch reads; separate dialogue
  labels from presentation; treat translation as a first-class pass.
- Reject: the Ren'Py script language, engine API, screen language, and save
  format. No runtime code is included.

### 4. klembot/twinejs

- URL: https://github.com/klembot/twinejs
- Stars (2026-11-26): 2,963
- License: GPL-3.0 (`LICENSE`)
- Analog: a passage graph editor with visible links between story nodes.
- Borrow: draw the passage graph; look for unreachable, orphaned, and single-exit
  nodes before playing every path.
- Reject: the GPL-licensed editor code, UI, and storage format. Ideas only; no
  code or assets are copied.

## Software (3)

### 5. i18next/i18next

- URL: https://github.com/i18next/i18next
- Stars (2026-11-26): 8,663
- License: MIT (`LICENSE`)
- Analog: stable translation keys with context, interpolation, and plural rules.
- Borrow: dotted stable IDs, never reuse an ID, put context on every row, keep
  markup inside the string, and use plural rules instead of concatenation.
- Reject: the JavaScript runtime, framework bindings, and resource-store API.
  The pack defines a table shape, not a library integration.

### 6. vale-cli/vale

- URL: https://github.com/vale-cli/vale
- Stars (2026-11-26): 6,428
- License: MIT (`LICENSE`, Copyright 2016 Joseph Kato)
- Analog: a prose linter that turns a style guide into repeatable rules.
- Borrow: express review checks as short, testable rules; a checklist is more
  useful when each box can fail for a named reason.
- Reject: the Vale binary, configuration format, and style packages. The pack
  does not lint prose at build time.

### 7. WeblateOrg/weblate

- URL: https://github.com/WeblateOrg/weblate
- Stars (2026-11-26): 6,182
- License: GPL-3.0 (repository page and README; no root `COPYING` at HEAD)
- Analog: a translation platform with translator context, review states, and
  glossary control.
- Borrow: context fields for speaker, listener, moment, and prior event; one
  glossary spelling per name; review before a string ships.
- Reject: the server, database, API, and review workflow implementation. Ideas
  only; the pack names the handoff, not the tool.

## AI-agent (2)

### 8. letta-ai/letta

- URL: https://github.com/letta-ai/letta
- Stars (2026-11-26): 25,544
- License: Apache-2.0 (`LICENSE`, Copyright 2023 Letta authors)
- Analog: explicit agent state and memory with provenance, rather than silent
  rewriting of context.
- Borrow: named state with an owner and reset point; a canon change is explicit
  and lists what it invalidates; no silent rewrite.
- Reject: the agent runtime, memory server, model calls, and API. The pack ships
  no agent and makes no network request.

### 9. promptfoo/promptfoo

- URL: https://github.com/promptfoo/promptfoo
- Stars (2026-11-26): 27,664
- License: MIT (`LICENSE`, Copyright 2025)
- Analog: eval cases and failing fixtures for generated or authored text.
- Borrow: test the packaging with positive and negative cases; a check is only
  credible when a known bad input makes it fail.
- Reject: the eval runtime, model providers, network calls, and test harness
  code. The pack's selftest uses only Node built-ins and local files.

## Dead ends

- `api.github.com/repos/...` returned HTTP 403 in this environment, so exact
  stars could not be read from the REST API.
- The local `websearch_search` path was unusable: SearXNG had an invalid URL and
  DuckDuckGo returned a captcha. No search result was used as evidence.
- `renpy/renpy` has no root `LICENSE.txt` at HEAD or master (404). The MIT claim
  comes from the repository README and the official Ren'Py license page it
  links to.
- `WeblateOrg/weblate` has no root `COPYING` at HEAD or main (404). The GPL-3.0
  claim comes from the repository page and README.
- `errata-ai/vale` redirects to `vale-cli/vale`; it is counted once.
- `ungh.cc` returns exact star counts but no license field. Licenses were read
  from raw license files or the repository page.
- GitHub HTML shows rounded star counts ("7.1k"), so it was used for license
  labels, not for the numbers in this file.

No code, prose, lyrics, names, or settings were copied from these projects.
Trademarks and license names belong to their owners.
