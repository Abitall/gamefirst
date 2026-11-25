# Godot 4 - verified API

Only these members may be used by pack code. Each was read in the class XML of
`4.0-stable` (4.0.0) and `4.7.2-stable` (4.7.2); `Seen` repeats those tags per
row. Docs base: `https://docs.godotengine.org/en/4.7/classes/`. Source base:
`https://github.com/godotengine/godot/tree/4.7.2-stable/doc/classes`. A member
not listed here is not verified: do not use it.

| Class | Member | Signature | Seen | Docs |
|---|---|---|---|---|
| Node | add_child | `add_child(node, force_readable_name = false, internal = 0)` | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Node | remove_child | `remove_child(node)`; removes, does not free | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Node | lookup | `get_node(path) -> Node`; `get_node_or_null(path) -> Node`; `has_node(path) -> bool` | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Node | tree | `get_tree() -> SceneTree`; `is_inside_tree() -> bool`; null and an error outside the tree | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Node | queue_free | `queue_free()`; deletes at end of frame, safe to repeat | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Node | lifecycle | `_ready()`, `_enter_tree()`, `_exit_tree()`, `_process(delta)`, `_physics_process(delta)`, `_unhandled_input(event)` | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Node | signals | `ready`, `tree_entered`, `tree_exiting`, `tree_exited` | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Node | process_mode | `process_mode`; `PROCESS_MODE_INHERIT`, `DISABLED`, `ALWAYS`, `WHEN_PAUSED` | 4.0-stable, 4.7.2-stable | `class_node.html` |
| Object | connect | `connect(signal: StringName, callable: Callable, flags = 0) -> Error` | 4.0-stable, 4.7.2-stable | `class_object.html` |
| Object | is_connected | `is_connected(signal, callable) -> bool`; `disconnect(signal, callable)` | 4.0-stable, 4.7.2-stable | `class_object.html` |
| Signal | emit | `Signal.connect(callable, flags = 0) -> int`; `Signal.emit(...)` | 4.0-stable, 4.7.2-stable | `class_signal.html` |
| SceneTree | scene change | `change_scene_to_file(path: String) -> Error`; deferred | 4.0-stable, 4.7.2-stable | `class_scenetree.html` |
| SceneTree | state | `paused: bool`; `current_scene`, `root` | 4.0-stable, 4.7.2-stable | `class_scenetree.html` |
| ResourceLoader | load | `load(path, type_hint = "", cache_mode = 1) -> Resource` | 4.0-stable, 4.7.2-stable | `class_resourceloader.html` |
| ResourceLoader | threaded | `load_threaded_request(path, type_hint = "", use_sub_threads = false, cache_mode = 1) -> Error` | 4.0-stable, 4.7.2-stable | `class_resourceloader.html` |
| ResourceLoader | status | `load_threaded_get_status(path, progress: Array = []) -> ThreadLoadStatus`; `load_threaded_get(path) -> Resource` | 4.0-stable, 4.7.2-stable | `class_resourceloader.html` |
| PackedScene | instantiate | `instantiate(edit_state = 0) -> Node`; `can_instantiate() -> bool` | 4.0-stable, 4.7.2-stable | `class_packedscene.html` |
| Resource | duplicate | `duplicate(deep = false) -> Resource`; shallow shares nested data | 4.0-stable, 4.7.2-stable | `class_resource.html` |
| Resource | identity | `resource_local_to_scene: bool`; `resource_path: String` | 4.0-stable, 4.7.2-stable | `class_resource.html` |
| Input | actions | `is_action_pressed(action, exact_match = false) -> bool`; `is_action_just_pressed`, `is_action_just_released` | 4.0-stable, 4.7.2-stable | `class_input.html` |
| Input | vector | `get_vector(negative_x, positive_x, negative_y, positive_y, deadzone = -1.0) -> Vector2` | 4.0-stable, 4.7.2-stable | `class_input.html` |
| Input | keys | `is_physical_key_pressed(keycode: Key) -> bool`; `is_key_pressed(keycode: Key) -> bool` | 4.0-stable, 4.7.2-stable | `class_input.html` |
| InputEventKey | fields | `physical_keycode`, `keycode`, `pressed`, `echo` | 4.0-stable, 4.7.2-stable | `class_inputeventkey.html` |
| CharacterBody2D | move_and_slide | `move_and_slide() -> bool`; physics delta, `_physics_process` only | 4.0-stable, 4.7.2-stable | `class_characterbody2d.html` |
| CharacterBody2D | floor | `is_on_floor() -> bool`; `velocity`, `up_direction`, `floor_snap_length` | 4.0-stable, 4.7.2-stable | `class_characterbody2d.html` |
| CharacterBody2D | contacts | `get_slide_collision_count() -> int`; `get_last_slide_collision() -> KinematicCollision2D` | 4.0-stable, 4.7.2-stable | `class_characterbody2d.html` |
| FileAccess | open | `open(path: String, flags: ModeFlags) -> FileAccess`; null on failure | 4.0-stable, 4.7.2-stable | `class_fileaccess.html` |
| FileAccess | error | `get_open_error() -> Error`; `file_exists(path) -> bool` | 4.0-stable, 4.7.2-stable | `class_fileaccess.html` |
| FileAccess | var | `store_var(value, full_objects = false) -> bool`; `get_var(allow_objects = false) -> Variant` | 4.0-stable, 4.7.2-stable | `class_fileaccess.html` |
| ConfigFile | keys | `load(path) -> Error`; `save(path) -> Error`; `set_value`, `get_value`; `has_section_key` | 4.0-stable, 4.7.2-stable | `class_configfile.html` |
| Engine | editor | `is_editor_hint() -> bool` | 4.0-stable, 4.7.2-stable | `class_engine.html` |
| Engine | version | `get_version_info() -> Dictionary` | 4.0-stable, 4.7.2-stable | `class_engine.html` |
| @GDScript | preload | `preload(path: String)`; parse-time, constant path | 4.0-stable, 4.7.2-stable | `class_gdscript.html` |
| @GDScript | annotations | `@export`, `@export_range`, `@onready`, `@tool` | 4.0-stable, 4.7.2-stable | `class_gdscript.html` |

## Checked and excluded

- `Engine.get_physics_ticks_per_second` is absent from both class XMLs.
- `SceneTree.change_scene_to_node` is 4.7-only: present in 4.7.2, not in 4.0.0.
