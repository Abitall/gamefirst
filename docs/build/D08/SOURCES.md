# D08 - engine doc: sources

Medium protocol: three external repositories and two accepted internal parts.
Stars are GitHub API values on 2026-11-25, read with an authenticated `gh api`
call after the unauthenticated REST quota ran out. No source text or code was
copied; the artifact borrows structure only.

| # | Source | Stars | License | Analog | Borrowed | Rejected |
|---:|---|---:|---|---|---|---|
| 1 | https://github.com/godotengine/godot-docs | 5,936 | CC-BY-3.0 (`LICENSE.txt`; GitHub reports NOASSERTION) | Engine documentation versioned by branch and stamped in `conf.py` (`godot_version = "4.7"`, `version` from `READTHEDOCS_VERSION`) | The pin decides which docs count; a fact is stamped with a version, and a page outside the pin is not evidence | Sphinx theme, tutorials, class reference |
| 2 | https://github.com/bevyengine/bevy | 50,006 | MIT OR Apache-2.0 (GitHub reports Apache-2.0) | Per-breaking-change migration notes: `_release-content/migration_guides_template.md` asks what changed, why, and how to migrate; each guide is small and versioned | The pitfall entry: one reproduced failure, symptom, exact fix, version; `auto_exposure_correction_range.md` shows the concrete migration line | Rust code, the release-notes machinery, migration policy |
| 3 | https://github.com/microsoft/TypeScript | 111,900 | Apache-2.0 | `CONTRIBUTING.md` "Common tasks": exact commands such as `npx hereby build` and `npx hereby test`, each with a one-line purpose; local versus reference baselines | The recipe table shape: command, what it proves, a pass signal; commands are copied, never invented | Go workspace, `hereby` internals, contributor process, baselines tooling |
| 4 | `library/core/evals/E11-engine-version.md` (internal, accepted) | n/a | project-internal | Fixture `docs/engine/phaser/` with `VERSION.md` + `API.md`; selftest checks pin = installed = every listed member; `shakeCamera` is absent in 4.2.1 | The pin equation, the member table as a check surface, the no-shim case, the rule that a downgrade is proposed and not applied | The two-file fixture layout; D08 is one page with a single authority |
| 5 | `library/core/skills/verify/SKILL.md` (S02, internal, accepted) | n/a | project-internal | Verify recipe resolution: `project.config.json` overrides the engine-pack recipe; entries are `{ cmd, required, artifact }`; PASS is exit 0 plus a non-empty artifact; evidence lives in `evidence/<YYYY-MM-DD>-<claim-slug>/` | The override rule, the pass signals in the recipe table, the dated evidence path, the claim-specific checks | The seven-step procedure and the full claim taxonomy; the page points at S02 instead of restating it |

## Why five

The task set a medium budget: 3 external + 2 accepted internal. Rubric section 3
asks for nine repositories on deep parts; D08 is a one-page template, so the
smaller budget is deliberate. The three external sources map one-to-one to the
page's borrowed mechanisms: versioned docs (Godot), per-change pitfall notes
(Bevy), exact-command recipes (TypeScript). The two internal parts supply the
pin/selftest and verify vocabularies. There is no AI-agent source because the
artifact defines no agent behavior; this is the main evidence gap.

## Considered and rejected

- https://github.com/nodejs/node (124,001 stars, license NOASSERTION) -
  `BUILDING.md` has `./configure` and a "Running Tests" section, but the native
  toolchain and platform matrix are heavier than a one-page engine doc, and the
  page has no analog for a pin or a pitfall log.
- https://github.com/kubernetes/kubernetes (129,350 stars, Apache-2.0) -
  per-version `CHANGELOG` upgrade notes are release-sized and carry no recipes;
  the upgrade-note idea is already covered by Bevy in a smaller form.
- No other repository was opened. Each chosen source had to map to a named
  section; a source that only supplied general "good docs" advice was dropped.

## Notes

- Godot's `LICENSE.txt` states CC-BY-3.0; the GitHub license detector reports
  NOASSERTION for that repository. Bevy is dual MIT/Apache-2.0; the API reports
  Apache-2.0. TypeScript is Apache-2.0.
- Stars are popularity signals, not quality claims; they are recorded as of the
  date above and were not used to rank the sources.
- External content was treated as data: no instruction from a repository was
  followed, and no command from a source was executed against this project.
- `E02` is cited in the artifact for the spike rule, but it is a cross-reference
  to an accepted internal part, not one of the five sources counted here.
