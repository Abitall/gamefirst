#!/usr/bin/env node
// Packaging selftest for the Godot engine pack. Does not run Godot.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { dirname, isAbsolute, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = dirname(fileURLToPath(import.meta.url));
const MANIFEST = "manifest.json";
const DOCS = ["RULES.md", "API.md", "PITFALLS.md", "RECIPES.md"];
const MAX_TOKENS = 1500;
const MAX_LINES = 250;
const results = [];
let failed = 0;
let manifest;

function need(ok, message) {
  if (!ok) throw new Error(message);
}
function check(name, fn) {
  try {
    fn();
    results.push(`ok  ${name}`);
  } catch (error) {
    failed += 1;
    results.push(`FAIL ${name}: ${error.message}`);
  }
}
function text(file) {
  return readFileSync(join(ROOT, file), "utf8");
}
function sha256(file) {
  return createHash("sha256").update(readFileSync(join(ROOT, file))).digest("hex");
}
function semver(value) {
  return typeof value === "string" && /^\d+\.\d+\.\d+$/.test(value);
}
function plain(value) {
  return value.replace(/^`+/, "").replace(/`+$/, "");
}
function range(value) {
  const match = /^>=(\d+)\.(\d+) <(\d+)$/.exec(String(value));
  need(match, `engineRange must look like >=4.0 <5, got ${value}`);
  return { floor: Number(match[1]) * 1000 + Number(match[2]), ceiling: Number(match[3]) };
}
function inRange(version, span) {
  need(semver(version), `not a semver: ${version}`);
  const [major, minor] = version.split(".").map(Number);
  need(major < span.ceiling, `${version} is at or above the ceiling`);
  need(major * 1000 + minor >= span.floor, `${version} is below the floor`);
}

check("manifest parses", () => {
  manifest = JSON.parse(text(MANIFEST));
  need(manifest && typeof manifest === "object" && !Array.isArray(manifest), "not an object");
});
check("identity is engine-godot", () => {
  need(manifest.id === "engine-godot", `id is ${manifest.id}`);
  need(manifest.engine === "godot", `engine is ${manifest.engine}`);
});
check("engineRange is one beta floor and ceiling", () => {
  range(manifest.engineRange);
});
check("pack version is semver", () => {
  need(semver(manifest.version), `version is ${manifest.version}`);
});
check("stability is stable or beta", () => {
  need(["stable", "beta"].includes(manifest.stability), `stability is ${manifest.stability}`);
});
check("parts are known roles", () => {
  const roles = ["rule", "docs", "seed", "permission", "recipe"];
  need(Array.isArray(manifest.parts) && manifest.parts.length > 0, "parts is empty");
  for (const part of manifest.parts) need(roles.includes(part), `unknown part ${part}`);
});
check("files are POSIX relative and exclude manifest", () => {
  need(Array.isArray(manifest.files) && manifest.files.length > 0, "files is empty");
  for (const file of manifest.files) {
    need(typeof file === "string" && file.length > 0, "empty file entry");
    need(!isAbsolute(file), `${file} is absolute`);
    need(!file.includes("\\") && !file.includes(".."), `${file} is not POSIX relative`);
    need(file !== MANIFEST, "manifest lists itself");
  }
});
check("files equal the directory listing", () => {
  const listed = readdirSync(ROOT).filter((name) => name !== MANIFEST).sort();
  const claimed = [...manifest.files].sort();
  need(JSON.stringify(listed) === JSON.stringify(claimed), `directory [${listed}] vs files [${claimed}]`);
});
check("every listed file is non-empty", () => {
  for (const file of manifest.files) {
    need(existsSync(join(ROOT, file)), `${file} is missing`);
    need(statSync(join(ROOT, file)).size > 0, `${file} is empty`);
  }
});
check("hashes cover exactly the files", () => {
  need(manifest.hashes && typeof manifest.hashes === "object" && !Array.isArray(manifest.hashes), "hashes is not an object");
  const keys = Object.keys(manifest.hashes).sort();
  need(JSON.stringify(keys) === JSON.stringify([...manifest.files].sort()), "hash keys differ from files");
});
check("every hash is sha256 and matches", () => {
  for (const file of manifest.files) {
    const value = manifest.hashes[file];
    need(/^[0-9a-f]{64}$/.test(String(value)), `${file} hash is not sha256`);
    need(value === sha256(file), `${file} hash does not match`);
  }
});
check("selftest command is node plus a file", () => {
  const match = /^node\s+(\S+)$/.exec(String(manifest.selftest));
  need(match, `selftest is ${manifest.selftest}`);
  need(existsSync(join(ROOT, match[1])), `${match[1]} does not exist`);
  need(manifest.files.includes(match[1]), `${match[1]} is not listed`);
});
check("upgrade is none or from plus note", () => {
  if (manifest.upgrade === "none") return;
  need(manifest.upgrade && typeof manifest.upgrade === "object" && !Array.isArray(manifest.upgrade), "upgrade is not an object");
  need(typeof manifest.upgrade.from === "string" && semver(manifest.upgrade.from), "upgrade.from is not semver");
  need(typeof manifest.upgrade.note === "string" && existsSync(join(ROOT, manifest.upgrade.note)), "upgrade.note is not a file");
});
check("apiSource is an object with four fields", () => {
  const source = manifest.apiSource;
  need(source && typeof source === "object" && !Array.isArray(source), "apiSource is not an object");
  need(["typings", "docs", "source"].includes(source.kind), `kind is ${source.kind}`);
  need(/^https?:\/\/\S+$/.test(String(source.uri)), "uri is not recorded as http(s)");
  need(semver(source.version), `version is ${source.version}`);
  need(/^\d{4}-\d{2}-\d{2}$/.test(String(source.date)), "date is not YYYY-MM-DD");
  need(String(source.uri).includes("godotengine/godot"), "uri does not point at the Godot source");
});
check("apiSource version sits inside engineRange", () => {
  inRange(manifest.apiSource.version, range(manifest.engineRange));
});
check("encoding and placeholders are clean", () => {
  for (const file of [MANIFEST, ...manifest.files]) {
    const bytes = readFileSync(join(ROOT, file));
    need(!(bytes[0] === 0xef && bytes[1] === 0xbb && bytes[2] === 0xbf), `${file} has a BOM`);
    const body = bytes.toString("utf8");
    need(Buffer.from(body, "utf8").equals(bytes), `${file} is not valid UTF-8`);
    need(!body.includes("\r"), `${file} has CRLF`);
    need(!body.includes("{" + "{"), `${file} has an unreplaced placeholder`);
    need(!body.includes("\uFFFD"), `${file} has a replacement character`);
  }
});
check("docs stay under the token cap", () => {
  for (const file of DOCS) {
    const tokens = Math.ceil(text(file).length / 4);
    need(tokens <= MAX_TOKENS, `${file} is ${tokens} tokens`);
  }
});
check("selftest stays under the line cap", () => {
  const count = text("selftest.mjs").split("\n").length;
  need(count <= MAX_LINES, `selftest.mjs is ${count} lines`);
});
check("API.md cites both versions and class URLs", () => {
  const api = text("API.md");
  need(api.includes("4.0-stable") && api.includes("4.7.2-stable"), "version tags are not cited");
  need(api.includes("class_node.html") && api.includes("class_scenetree.html"), "class doc URLs are not cited");
  need(api.includes("Checked and excluded"), "no exclusion section");
  need(api.includes("get_physics_ticks_per_second") && api.includes("absent from both class XMLs"), "absent-member note is missing");
  need(api.includes("change_scene_to_node") && api.includes("not in 4.0.0"), "4.7-only note is missing");
});
check("recipes have the five-column table", () => {
  const recipes = text("RECIPES.md");
  need(/\|\s*step\s*\|\s*cmd\s*\|\s*required\s*\|\s*artifact\s*\|\s*mode\s*\|/.test(recipes), "header is missing");
  const rows = recipes.split(/\r?\n/).filter((line) => /^\|\s*R\d+\s*\|/.test(line));
  need(rows.length >= 2, "fewer than two recipe rows");
  let runs = 0;
  for (const row of rows) {
    const cells = row.split("|").map((cell) => cell.trim());
    need(cells.length === 7, `row needs five columns: ${row}`);
    const [, step, rawCmd, rawRequired, rawArtifact, rawMode] = cells;
    const cmd = plain(rawCmd);
    const required = plain(rawRequired);
    const artifact = plain(rawArtifact);
    const mode = plain(rawMode);
    need(["run", "manual"].includes(mode), `${step}: mode is ${mode}`);
    need(["yes", "no"].includes(required), `${step}: required is ${required}`);
    need(cmd.length > 0 && artifact.length > 0, `${step}: empty cmd or artifact`);
    if (mode === "run") {
      runs += 1;
      const done = spawnSync(cmd, { cwd: ROOT, shell: true, encoding: "utf8", timeout: 120000 });
      need(done.status === 0, `${step}: exit ${done.status} ${String(done.stderr || done.error || "").slice(0, 200)}`);
    } else {
      need(!/^(node|npm|npx|godot|git|python|bash|sh|pwsh|powershell)\b/i.test(cmd), `${step}: manual row carries a command`);
    }
  }
  need(runs === 2, `expected 2 run rows, found ${runs}`);
});
check("installed version or not installed", () => {
  let dir = ROOT;
  let config = null;
  for (let step = 0; step < 5; step += 1) {
    const candidate = join(dir, "project.config.json");
    if (existsSync(candidate)) {
      config = candidate;
      break;
    }
    dir = dirname(dir);
  }
  if (!config) return;
  const project = JSON.parse(readFileSync(config, "utf8"));
  if (!project.engine || project.engine.id !== "godot") return;
  need(semver(project.engine.version), "installed Godot version is missing");
  inRange(project.engine.version, range(manifest.engineRange));
  need(project.engine.range === manifest.engineRange, "engine.range differs from the pack");
  if (manifest.stability === "stable") {
    need(project.engine.version === manifest.engineRange, "stable pack needs the exact version");
  }
});

for (const line of results) console.log(line);
console.log(`${results.length - failed} passed, ${failed} failed`);
process.exit(failed === 0 ? 0 : 1);
