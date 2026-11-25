# RECIPES - Unity

`run` rows are executed by the verify tool and must exit 0. `manual` rows are
performed by a person in the Unity Editor or on the built player; each has an
explicit pass condition. The pack does not run Unity itself.

| step | cmd | required | artifact | mode |
|---|---|---|---|---|
| R0 | node selftest.mjs | true | manifest.json | run |
| R1 | Open a project in Unity `6000.3.24f1`, wait for import, open Console. Pass: 0 compile errors and 0 missing-script warnings. | true | | manual |
| R2 | Play Mode: load the bootstrap scene, additively load and unload the gameplay scene twice, then inspect the Hierarchy. Pass: no objects from the unloaded scene remain and no duplicate global services exist. | true | | manual |
| R3 | Build a Windows x86_64 player and run it for 5 minutes. Pass: no missing-asset, null-reference, or input-backend errors in `Player.log`. | true | | manual |
| R4 | Audit `src/game/` for every `UnityEngine` member used. Pass: each member appears in `API.md` with a checked version. | true | | manual |
