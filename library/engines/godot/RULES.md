# Godot 4 - rules for code

Scope: Godot 4.0.0 to 4.7.2, GDScript. These are engine constraints, not style.
A member absent from `API.md` is a stop: do not guess it, verify and add it first.

## Scene tree
- A `Node` joins the tree only through `add_child()`; an instantiated scene is
  inert until then. `_ready()` runs after the node and its children enter the
  tree, children first, and runs once per node.
- `queue_free()` deletes at the end of the frame and is safe to call twice.
  Never call `free()` on a node that signals or the tree may still touch.
- `_exit_tree()` runs children first, parent last. Put de-initialization there,
  and disconnect outward signals before the node leaves.
- `get_node()` with a wrong path logs an error and returns `null`. Resolve
  children once with `@onready` after the node is inside the tree, or use
  `get_node_or_null()` and check.
- An Autoload may not hold references to nodes from a scene; the scene can be
  freed while the Autoload lives.

## Signals
- Connect with `object.signal.connect(callable)` or `object.connect("signal",
  callable)`. A signal accepts one connection per callable: connecting twice
  pushes an error and returns `ERR_INVALID_PARAMETER`.
- A connection to a freed object disappears; the emitter does not crash. Do not
  rely on a callback to disconnect itself after deletion.
- Declare `signal name(arg)` on the class that emits; emit with `name.emit(arg)`.
  Keep the argument count identical on both sides.
- Disconnect in `_exit_tree()` when the receiver outlives the emitter.

## Resources and scenes
- `preload()` resolves at parse time and requires a constant path; `load()` goes
  through `ResourceLoader` and is cached by path.
- A `Resource` is shared: editing one loaded from disk changes every user in the
  running game. Call `duplicate(true)` for per-instance data, and mark intended
  local resources `resource_local_to_scene`.
- Instantiate packed scenes with `PackedScene.instantiate()`; check
  `can_instantiate()` for scenes exported or built at runtime.
- For large scenes use `load_threaded_request()` and poll
  `load_threaded_get_status()` across frames; `load_threaded_get()` blocks.

## Input
- Bind actions in Project Settings > Input Map; read them by name with
  `Input.is_action_pressed()` and `Input.get_vector()`. Do not scatter raw
  keycodes through gameplay code.
- `_input()` receives events before the GUI; `_unhandled_input()` runs after the
  GUI and is the default for gameplay.
- Prefer `is_physical_key_pressed()` and `InputEventKey.physical_keycode` when
  the key position matters across layouts.

## Physics
- `CharacterBody2D.move_and_slide()` must run in `_physics_process()`: it uses
  the physics delta. Calling it from `_process()` changes speed with frame rate.
- Set `velocity` before the call; read `is_on_floor()` after it. Check
  `get_slide_collision_count()` for contacts from that call.
- Do not edit transforms of physics bodies directly; move them through the
  physics API so the broadphase stays correct.

## Save and load
- `FileAccess.open()` returns `null` on failure and does not throw. Check it and
  read `FileAccess.get_open_error()` before using the handle.
- `store_var()` and `get_var()` accept `full_objects`, off by default. Never
  deserialize objects from a user-writable file: the docs warn that
  deserialized objects can execute code (remote code execution).
- Use `ConfigFile` for small keyed settings; it preserves sections and types.
- Write to `user://`, never beside the executable; exported builds are read-only.

## Teardown and scene changes
- `SceneTree.change_scene_to_file()` is deferred: the new scene is not available
  immediately. Do work in the new scene's `_ready()`, not after the call.
- Pausing stops physics; a node keeps processing only with a `process_mode`
  that allows it. Set pause behaviour per node, not per game.
- Free a scene by freeing its topmost node; children go with it. Cancel timers
  and pending callbacks that point at freed nodes.

## Version discipline
- The floor is 4.0.0: no member added in 4.1 or later may appear in shared code.
  `SceneTree.change_scene_to_node` is 4.7-only and therefore out.
- Check the engine version at runtime with `Engine.get_version_info()` only for
  diagnostics, never to branch around missing API.
- `Engine.is_editor_hint()` is for `@tool` scripts; gameplay code must behave the
  same in the editor and in a build.
