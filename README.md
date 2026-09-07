# КупиГолос — прототип страницы «Кто озвучил»

Локальный прототип универсального шаблона на Next.js 16 и React 19.

## Запуск

```bash
npm install
npm run dev
```

Страница доступна по адресу:

`http://localhost:3000/kto-ozvuchivaet/film-pobeg-iz-shoushenka`

## Структура

- `data/movies.ts` — данные фильмов, ролей, ссылок, изображений и аудиодемо.
- `components/MovieVoicePage.tsx` — универсальный шаблон и интерактивные блоки.
- `app/kto-ozvuchivaet/[slug]/page.tsx` — SEO-маршрут для страниц фильмов.
- `app/globals.css` — адаптивная визуальная система прототипа.

Чтобы добавить новый фильм, достаточно создать ещё один объект `MovieVoiceData` и добавить его в словарь `movies`.
