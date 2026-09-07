# КупиГолос — прототип страницы «Кто озвучил»

Локальный прототип универсального шаблона на Next.js 16 и React 19.

## Запуск

```bash
npm install
npm run dev
```

Примеры страниц:

`http://localhost:3000/kto-ozvuchivaet/film-pobeg-iz-shoushenka`

`http://localhost:3000/kto-ozvuchivaet/film-12-obezyan`

## Синхронизация фильмов

```bash
npm run sync:movies
```

Команда читает список фильмов из sitemap `info.kupigolos.ru`, на каждой странице находит официальную ссылку на полный состав и загружает роли, версии дубляжа, изображения актёров и доступные аудиодемо с `kupigolos.ru`. Результат записывается в `data/generated/movies.json`, а пропуски и ошибки — в `data/generated/sync-report.json`.

Полезные режимы:

```bash
npm run sync:movies -- --dry-run
npm run sync:movies -- --limit=50 --skip-audio
npm run sync:movies -- --refresh --concurrency=4
```

HTML сохраняется в локальном кеше `.cache/kupigolos-sync`, поэтому повторный запуск не создаёт лишнюю нагрузку. Флаг `--refresh` принудительно обновляет кеш.

## Структура

- `data/movies.ts` — подключение сгенерированных данных и ручных точечных переопределений.
- `data/generated/movies.json` — автоматически собранные фильмы и составы дубляжа.
- `data/generated/sync-report.json` — отчёт синхронизации и список фильмов без полной озвучки.
- `scripts/sync-movies.mjs` — безопасный синхронизатор официальных доменов КупиГолос.
- `data/movie-types.ts` — единая схема фильма, ролей и версий дубляжа.
- `components/MovieVoicePage.tsx` — универсальный шаблон и интерактивные блоки.
- `app/kto-ozvuchivaet/[slug]/page.tsx` — SEO-маршрут для страниц фильмов.
- `app/globals.css` — адаптивная визуальная система прототипа.

Новые страницы появляются после запуска синхронизации без создания отдельных React-файлов. Ручной объект в `data/movies.ts` может переопределить автоматически собранный фильм с тем же slug.
