# API - Unity

This is the complete allowed engine surface for this pack. Anything not listed
here is unverified and must not be used. No shims, no typings augmentation, no
reflection fallback.

## Authority and checks

- Checked on 2026-11-26 against the installed reference assemblies and XML doc
  sets of `6000.3.24f1` and `6000.0.83f1` under
  `C:\Program Files\Unity\Hub\Editor\<version>\Editor\Data\Managed\UnityEngine\`.
- Signatures below were read from `UnityEngine.CoreModule.dll`,
  `UnityEngine.PhysicsModule.dll`, and `UnityEngine.JSONSerializeModule.dll`
  with `System.Reflection.MetadataLoadContext`; presence was cross-checked in
  the matching `UnityEngine.*.xml` files.
- Docs: Unity 6.3 Script Reference,
  `https://docs.unity3d.com/6000.3/Documentation/ScriptReference/Rigidbody-linearVelocity.html`
  (page declares "Version: 6000.3 LTS"; read 2026-11-26). The 6.0 doc set is the
  in-editor XML at the path above. The docs site version selector must stay on
  `6000.3` when a row is re-checked.

## Verified members

| Member | Exact signature in 6000.3.24f1 | Seen in 6000.0.83f1 |
|---|---|---|
| `SceneManager.LoadSceneAsync` | `public static AsyncOperation LoadSceneAsync(string sceneName, LoadSceneMode mode)` | yes |
| `SceneManager.LoadSceneAsync` | `public static AsyncOperation LoadSceneAsync(string sceneName)` | yes |
| `SceneManager.sceneLoaded` | `public static event UnityAction<Scene, LoadSceneMode> sceneLoaded` | yes |
| `SceneManager.sceneUnloaded` | `public static event UnityAction<Scene> sceneUnloaded` | yes |
| `GameObject.GetComponent<T>` | `public T GetComponent<T>()` | yes |
| `Object.Instantiate` | `public static Object Instantiate(Object original)` | yes |
| `Object.Instantiate` | `public static Object Instantiate(Object original, Vector3 position, Quaternion rotation)` | yes |
| `Rigidbody.linearVelocity` | `public Vector3 linearVelocity { get; set; }` | yes |
| `Rigidbody.velocity` | `public Vector3 velocity { get; set; }` | yes, legacy |
| `JsonUtility.ToJson` | `public static string ToJson(object obj)` | yes |
| `JsonUtility.ToJson` | `public static string ToJson(object obj, bool prettyPrint)` | yes |
| `JsonUtility.FromJson<T>` | `public static T FromJson<T>(string json)` | yes |
| `Physics.Raycast` | `public static bool Raycast(Vector3 origin, Vector3 direction, out RaycastHit hitInfo, float maxDistance, int layerMask, QueryTriggerInteraction queryTriggerInteraction)` | yes |
| `Physics.Raycast` | `public static bool Raycast(Vector3 origin, Vector3 direction, out RaycastHit hitInfo)` | yes |
| `Physics.Raycast` | `public static bool Raycast(Ray ray, float maxDistance, int layerMask, QueryTriggerInteraction queryTriggerInteraction)` | yes |

`Rigidbody.velocity` still exists in both assemblies, but Unity 6.3 documents
`linearVelocity` as the current name. New code uses `linearVelocity`; `velocity`
is listed only so an audit can recognize and reject old code.

## Verified API traps

These are verified API facts, not reproduced runtime failures. They are listed
here because they constrain code at compile time.

1. **Two velocity names.** `Rigidbody.velocity` and `Rigidbody.linearVelocity`
   both exist in `6000.3.24f1` and `6000.0.83f1`; Unity 6.3 documents
   `linearVelocity` as current. New code must use `linearVelocity`; an audit
   rejects `velocity`.
2. **Scene events are events.** `sceneLoaded` is
   `UnityAction<Scene, LoadSceneMode>` and `sceneUnloaded` is
   `UnityAction<Scene>` in both assemblies. A one-parameter handler for
   `sceneLoaded` does not match the delegate and fails at compile time.
3. **Scene loads are asynchronous.** `LoadSceneAsync` returns `AsyncOperation`
   in both assemblies, with `isDone` and `allowSceneActivation` present in both.
   Code that assumes the scene is active on the next line is not supported by
   the verified surface.

## Supporting members referenced by RULES.md

These were checked the same way and are allowed where RULES.md names them:
`Object.Destroy(Object)`, `Object.DontDestroyOnLoad(Object)`,
`Time.deltaTime`, `Time.fixedDeltaTime`, `Application.persistentDataPath`,
`AsyncOperation.isDone`, `AsyncOperation.allowSceneActivation`,
`MonoBehaviour.StartCoroutine(IEnumerator)`.

## Absent or out of scope

- `Rigidbody.velocity` is not a replacement for `linearVelocity`; it is the
  legacy name. Do not use it in new code.
- Addressables and the Input System are packages, not part of this engine pin.
  Neither package API is verified here. Adding one requires its own pin and
  verification pass.
- No other `UnityEngine` type is approved by this pack. If a task needs one,
  check it against the installed reference assembly first and add it here with
  its version and evidence.

## How to check a new member

1. Find the declaring type in the installed `UnityEngine.*.xml` doc set.
2. Confirm the exact overload in the matching reference assembly.
3. Confirm the same member exists in the other installed 6.0/6.3 editor.
4. Add one row above with signature, both versions, and the source URL or local
   assembly path. Then, and only then, use it in `src/game/`.
