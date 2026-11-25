# RULES - Unity

Applies to every C# file under `src/game/`. The pack range is `>=6000.0 <6001`;
members were checked against the installed `6000.3.24f1` and `6000.0.83f1`
reference assemblies. `src/systems/` and everything below it stay
engine-agnostic: no `UnityEngine` or `UnityEditor` using directives there.
Per N00/E11, if a member is not in `API.md` and not verified against the
installed reference assembly, stop. Do not invent, shim, augment typings, or
reflect around a missing member.

## 1. Scenes and prefabs

1. One bootstrap scene owns global services. Gameplay scenes are loaded
   additively with `SceneManager.LoadSceneAsync(name, LoadSceneMode.Additive)`.
2. Subscribe to `SceneManager.sceneLoaded` and `sceneUnloaded` in `OnEnable`;
   unsubscribe in `OnDisable`. Never store a `Scene` struct past an unload.
3. A scene owns its objects. Cross-scene object references are forbidden;
   resolve at spawn time and pass plain data across the boundary.
4. Prefabs are the only spawn unit. No `new GameObject()` in gameplay code;
   instantiate a serialized prefab or component reference.
5. `DontDestroyOnLoad` is called only by the bootstrap composition root.

## 2. Serialization

1. Configuration is a `ScriptableObject` with `[CreateAssetMenu]`. Runtime
   state is plain C# and is never a `ScriptableObject`.
2. Serialize with `[SerializeField] private` fields. Public mutable fields are
   forbidden.
3. `ScriptableObject` assets hold data only: no scene objects, no
   `MonoBehaviour` references, no mutable runtime caches.
4. Save data is a versioned DTO written with `JsonUtility`. Never serialize a
   live `MonoBehaviour`. The first field is a schema version.
5. Save compatibility never depends on field order; missing fields take their
   default values.

## 3. Input

1. One backend per project, recorded in `project.config.json`. This pack
   verifies only legacy `UnityEngine.Input`. If the Input System package is
   added, pin its package version and verify its API separately first.
2. Poll input in `Update`, never in `FixedUpdate`.
3. Gameplay reads an input snapshot struct, not `Input` directly.
   `src/game/Input/` is the only adapter allowed to touch the input API.
4. No key names outside the adapter's serialized bindings.

## 4. Resources and Addressables

1. Addressables is a package, not part of the engine pin. Its API is outside
   this pack. Adding it requires a version pin, a verification pass, and an ADR.
2. `Resources.Load` is allowed only for small, always-loaded assets. Paths are
   relative to a `Resources` folder and carry no file extension.
3. Addressable handles are released exactly once, by the owner that acquired
   them. Track handles per scene and release them on unload or `OnDestroy`.
4. No synchronous load of a large asset in `Awake` or `Start`. Use an async
   operation and keep the loading screen until it completes.
5. A missing asset is a startup failure: log it and stop. Never continue with a
   silent `null`.

## 5. Physics

1. Rigidbody writes happen in `FixedUpdate`; input and read-only queries happen
   in `Update`.
2. Use `Rigidbody.linearVelocity`. The legacy `velocity` property is not used
   in new code.
3. Kinematic bodies move with `MovePosition` and `MoveRotation`; dynamic bodies
   receive `AddForce`.
4. Every gameplay raycast passes an explicit layer mask and
   `QueryTriggerInteraction`. Unbounded scene-wide raycasts are forbidden.
5. `Time.deltaTime` is frame time; `Time.fixedDeltaTime` is the physics step.
   Never mix them.
6. Collision callbacks only enqueue events. Resolution happens in the owning
   system's tick.

## 6. Teardown and lifecycle

1. Runtime destruction is deferred with `Object.Destroy`. `DestroyImmediate`
   is editor-only.
2. `OnDisable` and `OnDestroy` unsubscribe every event and release every handle
   the object acquired.
3. Pooled objects are reset in `OnDisable`, not rebuilt per spawn.
4. No `FindFirstObjectByType` or `FindObjectsByType` in per-frame code. Resolve
   references once during composition.
5. A scene unload must leave no live objects from that scene. R2 checks the
   Hierarchy after two load/unload cycles.

## 7. API discipline

1. `API.md` is the allowed surface. A new member is added only after it is
   found in the installed reference assembly and in both installed 6.0 and 6.3
   doc sets, with version and URL recorded.
2. No `#if UNITY_6000_0_OR_NEWER` branches until both sides are verified.
3. No reflection, no typings augmentation, no engine downgrade. A missing
   member stops the task.
4. Every public API has an XML doc comment and a usage example in the PR.
