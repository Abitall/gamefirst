#!/usr/bin/env node
/**
 * gamefirst capture (CLI10) - save one screenshot of a running game as evidence.
 *
 * Zero dependencies: drives an installed Chrome, Edge or Chromium in headless
 * mode and keeps only the png. A still image is the evidence a reviewer can
 * open; video is out of scope, because a moving frame cannot be cited later.
 *
 * Usage: node tools/capture.mjs --url http://localhost:5173 --claim menu
 * Options and exit codes: node tools/capture.mjs --help
 */
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, realpathSync, renameSync, rmSync, statSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, isAbsolute, join, relative, resolve, sep } from 'node:path'

const USAGE = `gamefirst capture - screenshot a running game into evidence/

usage: node tools/capture.mjs --url <url> [options]

  --url <url>       page to capture; http or https only (required)
  --claim <slug>    evidence folder suffix; default "capture"
  --out <file>      png inside evidence/; default evidence/<date>-<claim>/capture.png
  --browser <path>  browser binary, or a .js file run with the current node
  --size <WxH>      viewport in pixels; default 1280x720
  --wait <ms>       virtual time the page gets before the shot; default 3000
  --json            one JSON object on stdout instead of the human report
  --help            this text

The browser runs headless with --screenshot. The tool waits for it to exit,
checks the png signature and only then moves the file into place, so a failed
run never leaves a file that looks like evidence. The only network access is the
page itself. Video is out of scope: this command captures one still image.

exit: 0 captured, 1 capture failed, 2 usage or no browser`

const FLAGS = ['url', 'claim', 'out', 'browser', 'size', 'wait']
const PNG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
const GRACE_MS = 60000
const posix = (value) => (value ? String(value).split(sep).join('/') : null)
const under = (base, rest) => (base ? join(base, rest) : null)

// Chrome and Edge install per machine and per user; Chromium has the Linux name.
const CANDIDATES = [
  under(process.env.ProgramFiles, 'Google/Chrome/Application/chrome.exe'),
  under(process.env['ProgramFiles(x86)'], 'Google/Chrome/Application/chrome.exe'),
  under(process.env.LOCALAPPDATA, 'Google/Chrome/Application/chrome.exe'),
  under(process.env.ProgramFiles, 'Microsoft/Edge/Application/msedge.exe'),
  under(process.env['ProgramFiles(x86)'], 'Microsoft/Edge/Application/msedge.exe'),
  under(process.env.LOCALAPPDATA, 'Microsoft/Edge/Application/msedge.exe'),
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/usr/bin/microsoft-edge',
].filter(Boolean)

function parseArgs(argv) {
  const out = { json: false, help: false, errors: [] }
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index]
    if (arg === '--json') { out.json = true; continue }
    if (arg === '--help') { out.help = true; continue }
    const name = arg.startsWith('--') ? arg.slice(2).split('=')[0] : null
    if (!name || !FLAGS.includes(name)) { out.errors.push(`unknown argument: ${arg}`); continue }
    const inline = arg.includes('=') ? arg.slice(arg.indexOf('=') + 1) : null
    const next = argv[index + 1]
    const value = inline ?? (next !== undefined && !next.startsWith('--') ? argv[++index] : undefined)
    if (value === undefined) out.errors.push(`--${name} needs a value`)
    else out[name] = value
  }
  return out
}

function slug(raw) {
  return String(raw).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/, '')
}

function stamp() {
  const now = new Date()
  const pad = (value) => String(value).padStart(2, '0')
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`
}

function parseTarget(raw) {
  let url
  try { url = new URL(String(raw)) } catch { return { error: `--url is not a url: ${raw}` } }
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return { error: `--url must be http or https, not ${url.protocol}` }
  if (!url.hostname) return { error: `--url has no host: ${raw}` }
  return { url: url.href }
}

function parseSize(raw) {
  const match = /^(\d{2,4})x(\d{2,4})$/.exec(String(raw).toLowerCase())
  if (!match) return { error: '--size must be WxH in pixels, such as 1280x720' }
  const width = Number(match[1])
  const height = Number(match[2])
  if (width < 64 || height < 64 || width > 8192 || height > 8192) return { error: '--size must be between 64x64 and 8192x8192' }
  return { width, height }
}

function parseWait(raw) {
  const ms = /^\d{1,6}$/.test(String(raw)) ? Number(raw) : -1
  if (ms < 0 || ms > 600000) return { error: '--wait must be whole milliseconds from 0 to 600000' }
  return { ms }
}

function inside(root, file) {
  const rel = relative(root, file)
  return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel)
}

function hints(log) {
  return String(log || '').split('\n').map((line) => line.trim()).filter((line) => /error|fail|cannot/i.test(line)).slice(0, 3)
}

function launch(command, flags, limit) {
  return new Promise((done) => {
    const child = spawn(command[0], [...command.slice(1), ...flags], { stdio: ['ignore', 'ignore', 'pipe'], windowsHide: true })
    let log = ''
    const timer = setTimeout(() => { child.kill('SIGKILL'); done({ code: null, note: `browser did not exit within ${limit} ms` }) }, limit)
    child.stderr.on('data', (chunk) => { if (log.length < 8192) log += chunk })
    child.on('error', (error) => { clearTimeout(timer); done({ code: null, kind: 'spawn', note: `cannot start the browser: ${error.message}` }) })
    child.on('exit', (code) => { clearTimeout(timer); done({ code, log }) })
  })
}

function emit(state, code, result) {
  const body = {
    schema: 1,
    ok: code === 0,
    error: result.error ?? null,
    detail: result.detail ?? [],
    url: state.target ?? null,
    claim: state.claim ?? null,
    out: state.out ? posix(relative(state.cwd, state.out)) : null,
    browser: posix(state.browser),
    width: state.size?.width ?? null,
    height: state.size?.height ?? null,
    wait: state.wait?.ms ?? null,
    bytes: result.bytes ?? null,
    ms: state.started ? Date.now() - state.started : null,
  }
  if (state.json) {
    console.log(JSON.stringify(body))
    return code
  }
  if (code === 0) {
    console.log(`capture  ${body.url}`)
    console.log(`shot     ${body.out}  ${body.width}x${body.height}  ${body.bytes} B  ${body.ms} ms`)
  } else {
    console.error(`capture: ${body.error}`)
    for (const line of body.detail) console.error(`  ${line}`)
  }
  return code
}

async function main() {
  const argv = parseArgs(process.argv.slice(2))
  if (argv.help) { console.log(USAGE); return 0 }
  const cwd = process.cwd()
  const errors = [...argv.errors]
  const claim = slug(argv.claim ?? 'capture')
  const target = parseTarget(argv.url ?? '')
  const size = parseSize(argv.size ?? '1280x720')
  const wait = parseWait(argv.wait ?? '3000')
  if (!claim) errors.push('--claim needs at least one letter or digit (a-z, 0-9)')
  if (target.error) errors.push(target.error)
  if (size.error) errors.push(size.error)
  if (wait.error) errors.push(wait.error)
  const evidence = join(cwd, 'evidence')
  const out = resolve(cwd, argv.out ?? join('evidence', `${stamp()}-${claim}`, 'capture.png'))
  if (!out.toLowerCase().endsWith('.png')) errors.push('--out must end in .png')
  else if (!inside(evidence, out)) errors.push(`--out must stay inside ${posix(evidence)}/`)
  const browser = argv.browser ? resolve(cwd, argv.browser) : CANDIDATES.find((path) => existsSync(path))
  if (!browser) errors.push('no Chrome, Edge or Chromium found; pass --browser <path>')
  else if (!existsSync(browser) || !statSync(browser).isFile()) errors.push(`--browser is not a file: ${posix(browser)}`)
  const state = { json: argv.json, cwd, claim, out, browser, size, wait, started: Date.now(), target: target.url }
  if (errors.length) return emit(state, 2, { error: errors[0], detail: errors.slice(1) })

  const part = `${out}.part`
  let profile = null
  try {
    mkdirSync(dirname(out), { recursive: true })
    const root = realpathSync(evidence)
    const parent = realpathSync(dirname(out))
    if (parent !== root && !inside(root, parent)) return emit(state, 2, { error: '--out resolves outside evidence/ through a link' })
    rmSync(part, { force: true })
    profile = mkdtempSync(join(tmpdir(), 'gamefirst-capture-'))
    const command = /\.(m?js|cjs)$/i.test(browser) ? [process.execPath, browser] : [browser]
    const flags = [
      '--headless=new',
      '--disable-gpu',
      '--hide-scrollbars',
      '--force-device-scale-factor=1',
      `--window-size=${size.width},${size.height}`,
      `--virtual-time-budget=${wait.ms}`,
      `--user-data-dir=${profile}`,
      `--screenshot=${part}`,
      target.url,
    ]
    const run = await launch(command, flags, wait.ms + GRACE_MS)
    if (run.kind === 'spawn') return emit(state, 2, { error: run.note })
    if (run.code !== 0) return emit(state, 1, { error: `browser exited with ${run.code ?? 'no code'}`, detail: hints(run.log) })
    if (!existsSync(part)) return emit(state, 1, { error: 'browser exited without writing a screenshot', detail: hints(run.log) })
    const png = readFileSync(part)
    if (png.length < PNG.length || !png.subarray(0, PNG.length).equals(PNG)) return emit(state, 1, { error: `screenshot is not a png (${png.length} bytes)` })
    renameSync(part, out)
    return emit(state, 0, { bytes: png.length })
  } finally {
    rmSync(part, { force: true })
    if (profile) {
      try { rmSync(profile, { recursive: true, force: true, maxRetries: 3 }) } catch { /* windows may hold the profile; the shot is safe */ }
    }
  }
}

process.exitCode = await main()
