# G2 - slice: sources

Nine repositories, read on 2026-11-25. Metadata comes from the GitHub API;
every quote is copied from the file named in the row. Nothing here is code or
license text reused: the artifact borrows the shape of an idea, not the words.

## Gamedev (4)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC1 | Maaack/Godot-Game-Template | https://github.com/Maaack/Godot-Game-Template | 1,759 | MIT | `docs/FeatureList.md`: Main Menu, Options Menus, Pause Menu, Persistent Settings, Global State Management (Basic Saving/Loading), Win / Lose Manager | "This template has a main menu, options menus, pause menu, credits, scene loader, extra tools, and an example game scene." (README) | The addon set, the accessibility plugin suite, UI SFX |
| SRC2 | KenneyNL/Starter-Kit-3D-Platformer | https://github.com/KenneyNL/Starter-Kit-3D-Platformer | 1,284 | MIT (assets CC0) | One licensed asset pack feeding sprites, models and sound in a single slice | "Assets included in this package (2D sprites, 3D models and sound effects) are [CC0 licensed](https://creativecommons.org/publicdomain/zero/1.0/)" (README) | The Godot controller and scenes |
| SRC3 | openrct2/OpenRCT2 | https://github.com/openrct2/OpenRCT2 | 16,608 | GPL-3.0 | `docs/save-format.md`: the save header declares both the version it targets and the oldest reader allowed | `target-version:       uint32` / `min-version:          uint32` (same header block) | The binary layout of the rest of the file |
| SRC4 | OpenTTD/OpenTTD | https://github.com/OpenTTD/OpenTTD | 8,531 | GPL-2.0 (`COPYING.md`; GitHub reports NOASSERTION) | `docs/releasing_openttd.md`: a release branch is cut and only backports land after it | "If this is a later RC or release build and the release branch already exists, you'll need to backport fixes and language from master to this branch, which were merged after the branch diverged from master." | Changelog, website and tag mechanics |

## Software development (3)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC5 | kubernetes/sig-release | https://github.com/kubernetes/sig-release | 644 | Apache-2.0 | `releases/EXCEPTIONS.md`: deadlines are defaults; late work needs an argued exception | "the default is that missing a deadline means your enhancement will be part of the next milestone" | The email request process and AoE cut-off times |
| SRC6 | microsoft/code-with-engineering-playbook | https://github.com/microsoft/code-with-engineering-playbook | 2,761 | CC-BY-4.0 | `docs/agile-development/team-agreements/definition-of-done.md`: a definition of done per scope level | "To close a user story, a sprint, or a milestone it is important to verify that the tasks are complete." | The Azure Boards and ISE workflow around it |
| SRC7 | kubernetes/enhancements | https://github.com/kubernetes/enhancements | 3,991 | Apache-2.0 | `keps/README.md`: decisions carry approvers and leave a record that survives turnover | "A clear process with approvers and reviewers for making decisions." followed by "This will lead to more structured decisions that stick as there is a discoverable record around the decisions." | KEP metadata rules and presubmit checks |

## AI-agent workflow (2)

| # | Repository | URL | Stars | License | Analogous artifact | Borrowed (verbatim) | Rejected |
|---|---|---|---|---|---|---|---|
| SRC8 | modelcontextprotocol/modelcontextprotocol | https://github.com/modelcontextprotocol/modelcontextprotocol | 9,765 | MIT to Apache-2.0 transition, docs CC-BY-4.0 (GitHub reports NOASSERTION) | `docs/community/sep-guidelines.mdx`: Draft, InReview, Decision, Accepted, Final, each with a sponsor | "A SEP needs a working group to sponsor it before formal review" | The SEP numbering, templates and review rotation |
| SRC9 | EleutherAI/lm-evaluation-harness | https://github.com/EleutherAI/lm-evaluation-harness | 14,536 | MIT | A run writes its results to a path, so a later reader can re-check the verdict | "To save evaluation results provide an `--output_path`." (README) | The evaluation framework, task registry and backends |

## Dead ends

| Repository | Stars | License | Why it was not used |
|---|---|---|---|
| bevyengine/bevy | 50,000 | Apache-2.0 | No release checklist in the repo; `_release-content` holds migration guides only |
| OpenRA/OpenRA | 17,834 | GPL-3.0 | The release process lives in the wiki, not in the tree |
| veloren/veloren | 7,717 | GPL-3.0 | The GitHub repo is a mirror; the process is on GitLab |
| openai/evals | 19,803 | NOASSERTION | License status unclear, so nothing can be borrowed safely |
| cncf/toc | 1,899 | NOASSERTION | The graduation gate is the closest analogue found, but there is no license file to cite |
| KenneyNL/Starter-Kit-FPS | 1,026 | MIT | Same frame as SRC2, no gate artifact |
| godotengine/godot-demo-projects | 9,838 | MIT | Already a source in S09 and S10; nothing about gates |
| deepnight/gameBase | 714 | MIT | Lifecycle only, already cited in S10 |

## Finding

The nine agree on one shape: a gate is a human verdict over evidence that was
written down, not a score. SRC1 and SRC2 show the evidence being produced (a
menu frame, one licensed asset set); SRC3 and SRC4 show what a freeze looks
like when it is real (a version in the save, a branch point); SRC5, SRC6 and
SRC7 show the habit the artifact needs most, that the default is cut and the
exception is argued; SRC8 and SRC9 show the record: states, sponsors, and a
result path a later reader can open. G2 keeps the verdict to one line, the
budget to numbers, and the evidence to files.
