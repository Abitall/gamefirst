# Final review — lead programmer / engineering

**Лимит шагов агента исчерпан** — проверка остановлена на этой точке; ниже итог по уже собранным доказательствам.

## Вердикт: FAIL

Архитектура sound, но продукт в текущем виде не выполняет собственные обещания: установка по README даёт половину библиотеки, `/verify` не запускается, а `upgrade` уничтожает локальные правки.

## 5 главных проблем

1. **CRITICAL — `new-project` по умолчанию ставит только `core`, а не `core+game`.**
   `tools/new-project.mjs:37`: `packs: 'core'`. README Quick start и `docs/QUICKSTART.ru.md` обещают «core and game»: 13 skills, 5 gates, 3 crews. Факт: `node tools/new-project.mjs <dir> --name "Check Game" --git` → `parts: 31; crews: 0; gates: 0`; только `--packs game` даёт 47 частей. В свежей игре нет S06–S13, G0–G3, C01–C03, хотя `AGENTS.md` на них ссылается. Это не «ограничение v0.3», а расхождение кода и документации.

2. **CRITICAL — `/verify` — тупик в свежей игре.**
   `template/.opencode/commands/verify.md:9` велит запускать `node tools/verify.mjs`, но `new-project` не копирует `tools/` в игру. Даже при запуске из framework: `node tools/verify.mjs <game> --claim 'check game'` → FAIL `verify.recipe is empty`, exit 1, при этом создаётся пустая папка `evidence/...`. `status.mjs` в той же игре печатает `verify: yes`, хотя recipe пуст. R1 «build is truth» нечем выполнить.

3. **HIGH — `upgrade --apply` молча затирает локальные правки и не обновляет шаблон.**
   Симуляция 0.3→0.4: локальная строка `LOCAL EDIT` в `R1` после `--apply` исчезла, заменена upstream-текстом; `opencode.json` остался старым. `tools/upgrade.mjs:169–183`: пишет все `changed` без проверки конфликта и без backup; строка 177 удаляет `hash` из lock. Правки правил/скиллов — норма для соло-проекта; обновление их уничтожает. Заодно не обновляются `AGENTS.md`, команды и permissions — исправление безопасности не дойдёт до существующей игры.

4. **HIGH — `eval.mjs` даёт зелёный результат без единой проверки.**
   `node tools/eval.mjs <game>` → `12 cases: 0 pass, 0 fail, 12 missing-fixture`, exit 0; `--json` → `"ok":true`. Fixtures не поставляются. «12 evals» в README — это prompt-only карточки, а инструмент трактует их отсутствие как успех. Для framework, построенного на evidence, это ложное доказательство.

5. **HIGH — `trigger-check` падает на собственном сгенерированном артефакте.**
   `node tools/trigger-check.mjs --root <game>` → exit 2, `duplicate part id: verify` (skill `verify` и command `verify`). На framework root проверка проходит (78 parts). То есть advertised-инструмент нельзя применить к игре, для которой он предназначен; схема ID не выдерживает установку.

## 3 улучшения с максимальным эффектом

1. **Сделать `core+game` дефолтом**, а `core` — через `--minimal`; синхронизировать README/QUICKSTART. Это одно изменение, которое убирает главное расхождение.
2. **Сделать `/verify` самодостаточным**: класть минимальный `tools/` в игру или вызывать runner из framework по явному пути; при пустом recipe не создавать evidence и возвращать FAIL; `status` не должен писать `verify: yes` без единого check.
3. **Трёхсторонний upgrade**: хранить base-hash в lock с момента создания, сравнивать base/local/upstream, при локальной правке — отказ или backup; включить `template/`, `commands/`, `opencode.json` в план обновления. Плюс `eval` должен возвращать non-zero при `0 runnable checks`, а `verify`/`gate` — не считать `missing-fixture` успехом.

## Что оставить

- Engine-agnostic ядро и правило «код раньше документации» — это работает.
- `doctor` действительно read-only, ловит BOM/CRLF/placeholders/битые ссылки; на свежей игре 0 errors.
- Все 10 pack/engine selftests проходят; негативные кейсы (лишний файл, битый hash) реализованы.
- V2 `permissions` корректны по схеме: `permissions` — массив `{action,resource,effect}`, порядок «широкий allow → узкий deny» верен (https://opencode.ai/config.json, https://opencode.ai/docs/permissions).
- UTF-8/LF и отсутствие секретов в шаблоне подтверждены; Windows-пути инструменты принимают.

## Что сломается на первом реальном проекте

1. Разработчик идёт по README, получает 31 часть без гейтов и game-скиллов; `/next` и gate-flow ссылаются на отсутствующие G0–G3.
2. Первый `/verify` падает с «no verify runner», первый `/eval` говорит «ok» без проверок — обе основные гарантии фреймворка не работают.
3. После первой правки правила и первого `upgrade --apply` правка исчезает, а `opencode.json`/команды остаются старыми; `sync-agent diff` на свежем lock показывает `unknown` вместо `modified` (хэшей нет: `tools/sync-agent.mjs:110–114`).
4. `lint-agent-context` предупреждает о битых путях в установленных правилах (`template/opencode.json`, `library/toolbox`, `runs/*.jsonl`) — инструкции ссылаются на файлы, которых в игре нет.

**Не завершено:** детальный разбор `docs/build/BATCH-{10..19}-REVIEW.md`, `capture.mjs`, полный аудит всех обещаний README. Для вердикта этого достаточно; для исправления — нет.
