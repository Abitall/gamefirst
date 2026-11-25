# Final review — game designer

Достигнут лимит шагов агента; инструменты отключены. Ревью выполнено только на чтение: `C:\Phaser Projects\gamefirst` и Wordblocks не изменялись, коммитов нет.

**Вердикт: FAIL** — не из-за дизайна, а из-за первых 30 минут: два BLOCKER'а не дают новичку дойти до играбельного цикла по документации. Ядро (R8/R9/R2, G1–G3, A04) сильное, но v0.3 обещает путь, которого нет.

**1. BLOCKER — quickstart ставит только core.** `README.md:75` и `docs/QUICKSTART.ru.md:19` дают `new-project` без `--packs`; `new-project --help:29` — «default core»; прогон: `packs: core; parts: 31; crews: 0; gates: 0`. При этом `README.md:136` обещает «installs core and game only». Итог: нет G0–G3, C01–C03, S06–S13; `/start` рекомендует режим, которого нет в проекте. Плюс `status.mjs` печатает `[stage: G0, ...]` и «questions 1 open» на пустом шаблоне — первый экран это шум.

**2. BLOCKER — нет запускаемого билда.** `new-project.mjs:13` ставит только core/game. `library/engines/phaser/manifest.json:6-8`: `stability: beta`, `parts: ["docs","recipe"]`, seed нет; в шаблоне нет `package.json`/`index.html`; `verify.mjs` падает «verify.recipe is empty»; `RECIPES.md:16` велит `npm run dev`, но запускать нечего. `README.md:41,127` называет Phaser «stable», а selftest пишет «installed pin: skipped». R8/G1 требуют running build; метрики «first loop ≤3 days» и «add engine ≤1 day» (`BLUEPRINT:384,391`) недостижимы — новичок вручную собирает Vite и пишет verify recipe.

**3. CONCERN — G1 не проверяем и узок.** `G1-fun.md:5` требует «loop day», которого нет в определениях; `docs/build/G1/JUSTIFICATION.md:11` сам признаёт «Loop day is jargon; the blueprint defines it», но `BLUEPRINT:327` только повторяет термин. `G1:21` — one human 15–20 minutes; `BLUEPRINT:385` — at least 2 playtest hours; 3–5 сессий по 15–20 мин дают максимум 100 мин. `prototype/SKILL.md:21,53` — 1–2 дня и «no third day»: вопрос на 3 недели не раскладывается. `R8:11` задаёт loop как input→action→feedback→challenge→reward — для slow-burn/системной/нарративной игры альтернативы нет. Первый человеческий гейт нельзя однозначно запустить; E09 «fun honesty» теряет опору.

**4. CONCERN — нет G2a, второго дешёвого kill-point.** `BLUEPRINT:321` рисует «G2a fun/cut» после core loop, но в `library/game/gates/` только G0,G1,G2,G2.5,G3; ни один skill не ссылается на G2a. Следующее человеческое решение — G2 с 9 пунктами (sound, save, menus, 3–5 strangers, 10-minute run; `G2-slice.md:13-21`). Для соло 2 ч/день это недели; «cut» приходит поздно. Прямой ответ: G2 слишком поздний именно потому, что обещанный промежуточный гейт не реализован.

**5. CONCERN — два владельца диалога, бюджет вопросов неисполним.** A01 — «dialogue owner» (`partner.md:2,37`) и «at most 3 per stage» (`:47`); A02 — `mode: subagent` (`designer.md:3`), но «talk to the user directly» (`:52`) и «Ask the user directly: 3 per stage» (`:78`). `R2:7` — «across all agents», т.е. 3 всего; два файла читаются как 3+3. У A02 нет allow на `runs/**`, а `R2:15` требует писать каждый вопрос в `runs/questions.jsonl` (его читает E04) — лог дизайнера неполный. A04, наоборот, ясен: blind protocol, `severity — file:line — finding`, accept/revise/reject; A03 тоже.

**3 улучшения**
1. Сделать `game` дефолтом или вписать `--packs core,game` в `README:75`/`QUICKSTART:19`; заменить placeholder-ы STATE на «Phase: G0», «Next: run S06»; `status.mjs` игнорировать `[...]`. Это возвращает гейты и первый осмысленный Next.
2. В phaser pack добавить `seed/` (`package.json`, `index.html`, `src/game/main.ts`, один тест), `parts: ["docs","recipe","seed"]`, `--engine phaser`, копирующий seed и пишущий `verify.recipe` (`npm run build`, `node --test`). Если seed не готов — убрать «stable» из README (beta) и честно написать: «v0.3 не создаёт проект; начните с существующего Vite/Phaser».
3. Определить «loop day» (2 часа игры или полная смена); согласовать 2 часа с 15–20-мин сессией (6–8 сессий) или убрать метрику; разрешить один «slow loop» прототип с бюджетом 3–5 дней; добавить одностраничный G2a «fun/cut». G1 станет проверяемым, kill/cut придёт до вертикального слайса.

**Оставить без изменений**
Одна страница — настоящая: BRIEF 334 слова, STATE 276, GAME 279, TASTE 200; поля требуют проверяемого («the build shows», kill criteria, «verified by»), а не лозунги. Гейты как one-liner/артефакт-или-провал: G2 «missing artifact = failed point», G3 «publish separate command». `R8:27-29` «boring is a result» / «no human = blocked, never invent a session». `R9`: BACKLOG одной строкой, ordered cut list, «no number = cannot cut». A04 blind protocol, A03 handoff, data/code boundary, gym live-кнобы, art pack reference-only — сценарий без художника проходит на грейбоксе.

**Чего нет сознательно — и это нормально**
Нет 50-страничного GDD, постоянного совета, PASS/CONCERNS/FAIL-бюрократии, телеметрии, мультиплеера, live-ops, автопубликации, submodules, engine rules в core. Нет установщика domain packs (ручное копирование) — нормально для v0.3, если quickstart это говорит. Нет runnable eval fixtures: `eval.mjs` на новом проекте даёт 12× `missing-fixture` и exit 0 — нормально как «спеки», но README должен называть их спеками, а не «12 evals». Нет автотестов браузера Phaser (R1–R5 manual) — нормально, но тогда beta, а не stable.

**Что осталось:** формальный отчёт в родительской сессии не записан; файлы не менялись. Следующий шаг — починить два BLOCKER'а, прогнать быстрый старт на пустой папке и повторить ревью. Новые части не добавлять, пока новичок не доходит до G1 за один день.
