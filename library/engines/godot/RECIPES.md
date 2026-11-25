# Godot 4 - recipes

`run` rows are shell commands executed by `selftest.mjs` from the pack root and
must pass without Godot. `manual` rows are performed by a person in a game
project that installed the pack; `cmd` names the editor action, `artifact` names
the evidence. A manual row never carries a shell command.

| step | cmd | required | artifact | mode |
|---|---|---|---|---|
| R1 | `node --version` | yes | `-` | run |
| R2 | `node -e "const c=require('crypto'),fs=require('fs'),m=require('./manifest.json');for(const f of m.files){const h=c.createHash('sha256').update(fs.readFileSync(f)).digest('hex');if(h!==m.hashes[f])process.exit(1)}"` | yes | `-` | run |
| R3 | Project > Project Settings > Input Map: add `move_left`, `move_right`, `jump` | yes | `project.godot` | manual |
| R4 | F6 on the player scene, walk and jump for 10 s at 60 and 144 FPS | yes | `player.tscn` | manual |
| R5 | F5, change scene three times, watch Debugger > Monitors | yes | `-` | manual |
| R6 | F5, save, quit, relaunch, load, then truncate the save file | yes | `user://save.cfg` | manual |
| R7 | F5, press Esc, then movement keys while paused | yes | `-` | manual |
| R8 | Project > Export, Linux/X11 preset, run the binary | no | `build/game.x86_64` | manual |

## Pass criteria

- R1: Node 18 or newer; the selftest needs only `node`.
- R2: every file listed in `manifest.json` hashes to its `hashes` entry; exit 0.
- R3: the three actions appear in `project.godot` under `[input]`; no raw keycode
  is read in script.
- R4: distance per second and jump height match at both frame rates within 5%;
  the body reports `is_on_floor()` after landing.
- R5: node count returns to the baseline after each scene change; one emitted
  signal calls one handler; the Output panel has no already-connected error.
- R6: the save restores; a truncated file produces an error path and no crash.
- R7: physics stops while paused; a node with `PROCESS_MODE_ALWAYS` still runs;
  movement input does nothing.
- R8: export completes and the binary reaches the main scene without missing
  resources.
