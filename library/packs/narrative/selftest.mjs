#!/usr/bin/env node
// Offline packaging self-test for the narrative pack. No network, no build.
import {
  readFileSync, readdirSync, statSync, writeFileSync,
  mkdtempSync, cpSync, rmSync,
} from "node:fs";
import { createHash } from "node:crypto";
import { join, relative, sep, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const MANIFEST = "manifest.json";
const ID = "pack-narrative";
const VERSION = "0.1.0";
const CHAR_CAP = 6000;
const TEMPLATE_CAP = 4000;
const LINE_CAP = 250;
const KEYS = ["files", "hashes", "id", "loaded", "requires", "selftest", "upgrade", "version"];
const REQUIRES = ["core", "game"];
const PLACEHOLDER = "{" + "{";
const SECTIONS = [
  "## When to load",
  "## Boundaries",
  "## Three registers",
  "## Premise, theme, pillars",
  "## Character and world rules",
  "## Dialogue voice",
  "## Branching and state",
  "## String tables and localization readiness",
  "## Continuity check",
  "## Review checklist",
  "## Holds",
  "## Cross-refs",
];
const SECRETS = [
  ["private key", /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ["GitHub token", /\bgh[pousr]_[A-Za-z0-9]{20,}\b/],
  ["AWS key", /\bAKIA[0-9A-Z]{16}\b/],
  ["API key", /\bsk-[A-Za-z0-9]{20,}\b/],
];

const CHECKS = [];
const check = (name, fn) => CHECKS.push([name, fn]);
const need = (ok, message) => { if (!ok) throw new Error(message); };
const readManifest = (dir) => JSON.parse(readFileSync(join(dir, MANIFEST), "utf8"));
function walk(dir, base = dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const rel = relative(base, full).split(sep).join("/");
    if (statSync(full).isDirectory()) out.push(...walk(full, base));
    else out.push(rel);
  }
  return out.sort();
}
function listFiles(dir) {
  return walk(dir).filter((p) => p !== MANIFEST);
}
function hashFile(dir, rel) {
  return createHash("sha256").update(readFileSync(join(dir, rel))).digest("hex");
}
function textFiles(dir) {
  return listFiles(dir).filter((p) => /\.(md|json|mjs)$/.test(p));
}
check("manifest parses", (dir) => {
  const m = readManifest(dir);
  need(m && typeof m === "object" && !Array.isArray(m), "manifest is not an object");
  return "JSON object";
});
check("identity", (dir) => {
  const m = readManifest(dir);
  need(m.id === ID, `id is ${JSON.stringify(m.id)}`);
  need(m.version === VERSION, `version is ${JSON.stringify(m.version)}`);
  return `${ID} ${VERSION}`;
});
check("keys", (dir) => {
  const m = readManifest(dir);
  const got = Object.keys(m).sort();
  need(!got.includes("$schema"), "$schema is not allowed");
  need(got.length === KEYS.length, `expected ${KEYS.length} keys, got ${got.length}`);
  need(got.every((k, i) => k === KEYS[i]), `keys are ${got.join(", ")}`);
  return "exactly 8 keys";
});
check("contract values", (dir) => {
  const m = readManifest(dir);
  need(Array.isArray(m.requires), "requires is not an array");
  need(JSON.stringify(m.requires) === JSON.stringify(REQUIRES), "requires must be core,game");
  need(m.loaded === "on-demand", `loaded is ${JSON.stringify(m.loaded)}`);
  need(m.selftest === "node selftest.mjs", `selftest is ${JSON.stringify(m.selftest)}`);
  need(m.upgrade === "none", `upgrade is ${JSON.stringify(m.upgrade)}`);
  return "core,game; on-demand; none";
});
check("files listing", (dir) => {
  const m = readManifest(dir);
  need(Array.isArray(m.files), "files is not an array");
  const seen = new Set();
  m.files.forEach((f, i) => {
    need(typeof f === "string", `files[${i}] is not a string`);
    need(f.length > 0, `files[${i}] is empty`);
    need(!f.includes("\\"), `${f} is not POSIX`);
    need(!f.startsWith("/") && !f.startsWith("../"), `${f} is not relative`);
    need(f !== MANIFEST, "files must not list manifest.json");
    need(!seen.has(f), `${f} is listed twice`);
    seen.add(f);
    const full = join(dir, f);
    need(statSync(full, { throwIfNoEntry: false })?.isFile(), `${f} is missing`);
    need(statSync(full).size > 0, `${f} is empty`);
  });
  const listed = [...m.files].sort();
  const actual = listFiles(dir);
  const extra = actual.filter((f) => !listed.includes(f));
  const missing = listed.filter((f) => !actual.includes(f));
  need(extra.length === 0, `unlisted file: ${extra.join(", ")}`);
  need(missing.length === 0, `listed but missing: ${missing.join(", ")}`);
  return `${listed.length} files`;
});
check("hashes", (dir) => {
  const m = readManifest(dir);
  need(m.hashes && typeof m.hashes === "object" && !Array.isArray(m.hashes), "hashes is not an object");
  const files = [...m.files].sort();
  const keys = Object.keys(m.hashes).sort();
  need(JSON.stringify(keys) === JSON.stringify(files), "hash keys do not match files");
  for (const f of m.files) {
    need(/^[a-f0-9]{64}$/.test(m.hashes[f]), `bad sha256 for ${f}`);
    need(hashFile(dir, f) === m.hashes[f], `hash mismatch for ${f}`);
  }
  return `${m.files.length} sha256`;
});
check("encoding", (dir) => {
  for (const f of textFiles(dir)) {
    const buf = readFileSync(join(dir, f));
    need(!(buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf), `${f} has BOM`);
    need(!buf.includes(0x0d), `${f} has CRLF`);
    let text;
    try {
      text = new TextDecoder("utf-8", { fatal: true }).decode(buf);
    } catch {
      throw new Error(`${f} is not UTF-8`);
    }
    need(!text.includes("\uFFFD"), `${f} has U+FFFD`);
    need(!text.includes(PLACEHOLDER), `${f} has a template placeholder`);
  }
  return "UTF-8, LF, no BOM";
});
check("token cap", (dir) => {
  const text = readFileSync(join(dir, "PACK.md"), "utf8");
  const chars = text.length;
  const tokens = Math.ceil(chars / 4);
  need(chars <= CHAR_CAP, `PACK.md is ${chars} chars (cap ${CHAR_CAP})`);
  need(tokens <= 1500, `PACK.md is ~${tokens} tokens (cap 1500)`);
  return `${chars} chars / ~${tokens} tokens`;
});
check("template cap", (dir) => {
  const text = readFileSync(join(dir, "templates/story-bible.md"), "utf8");
  need(text.length <= TEMPLATE_CAP, `story-bible.md is ${text.length} chars (cap ${TEMPLATE_CAP})`);
  return `${text.length} chars`;
});
check("line cap", (dir) => {
  const lines = readFileSync(join(dir, "selftest.mjs"), "utf8").split("\n").length;
  need(lines <= LINE_CAP, `selftest.mjs is ${lines} lines (cap ${LINE_CAP})`);
  return `${lines} lines`;
});
check("required sections", (dir) => {
  const lines = readFileSync(join(dir, "PACK.md"), "utf8").split("\n");
  const missing = SECTIONS.filter((s) => !lines.includes(s));
  need(missing.length === 0, `missing section: ${missing.join(", ")}`);
  return `${SECTIONS.length} sections`;
});
check("register separation", (dir) => {
  const text = readFileSync(join(dir, "PACK.md"), "utf8");
  for (const word of ["CANON.md", "VOICE.md", "string table", "not a story generator", "runtime code"]) {
    need(text.includes(word), `missing ${word}`);
  }
  return "canon, voice, delivery separated";
});
check("no secrets", (dir) => {
  for (const f of textFiles(dir)) {
    const text = readFileSync(join(dir, f), "utf8");
    for (const [label, re] of SECRETS) {
      need(!re.test(text), `${f} contains ${label}`);
    }
  }
  return "none";
});

function run(dir) {
  return CHECKS.map(([name, fn]) => {
    try {
      return { name, ok: true, detail: fn(dir) || "ok" };
    } catch (e) {
      return { name, ok: false, detail: e.message };
    }
  });
}

function clonePack() {
  const root = mkdtempSync(join(tmpdir(), "pack-narrative-"));
  const dir = join(root, "pack");
  cpSync(HERE, dir, { recursive: true });
  return { root, dir };
}

const CASES = [
  ["extra file", (dir) => writeFileSync(join(dir, "extra.txt"), "x\n"), "files listing", "unlisted file"],
  ["bad hash", (dir) => {
    const m = readManifest(dir);
    m.hashes[m.files[0]] = "0".repeat(64);
    writeFileSync(join(dir, MANIFEST), JSON.stringify(m, null, 2) + "\n");
  }, "hashes", "hash mismatch"],
  ["string file entry", (dir) => {
    const m = readManifest(dir);
    m.files.push(123);
    writeFileSync(join(dir, MANIFEST), JSON.stringify(m, null, 2) + "\n");
  }, "files listing", "not a string"],
  ["missing section", (dir) => {
    const p = join(dir, "PACK.md");
    writeFileSync(p, readFileSync(p, "utf8").replace("## Holds", "## Held"));
  }, "required sections", "missing section"],
];

const report = run(HERE);
for (const r of report) {
  console.log(`${r.ok ? "ok  " : "FAIL"} ${r.name}: ${r.detail}`);
}

let negativePassed = 0;
for (const [label, mutate, expectName, expectText] of CASES) {
  const { root, dir } = clonePack();
  try {
    mutate(dir);
    const hit = run(dir).find((r) => r.name === expectName && !r.ok && r.detail.includes(expectText));
    if (hit) {
      negativePassed += 1;
      console.log(`ok   negative ${label}: ${expectName}`);
    } else {
      const got = run(dir).filter((r) => !r.ok).map((r) => `${r.name}: ${r.detail}`).join("; ") || "no failure";
      console.log(`FAIL negative ${label}: expected ${expectName} (${expectText}), got ${got}`);
    }
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
}

const passed = report.filter((r) => r.ok).length + negativePassed;
const failed = report.filter((r) => !r.ok).length + CASES.length - negativePassed;
console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
