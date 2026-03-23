# SmartEvent

Система учета внеучебной активности студентов.

## Технологии

- Vue 3 (Composition API)
- JavaScript
- Vite
- Vue Router 4
- Tailwind CSS
- vee-validate + zod
- vue-sonner

## Запуск

```sh
npm i
npm run dev
```

## Локальный mock API (если backend недоступен)

1. В отдельном терминале запустить mock:

```sh
npm run mock:api
```

2. Во втором терминале запустить фронтенд:

```sh
npm run dev
```

По умолчанию для локальной разработки используется `.env.local`:

```env
VITE_API_URL=http://localhost:3001
```

Тестовые пользователи для входа:

- `student@example.com` / `123456`
- `admin@example.com` / `admin123`

Симуляция ошибок backend в mock API:

- `?mockStatus=401` -> ответ `401`
- `?mockStatus=500` -> ответ `500`

Пример:

- `POST http://localhost:3001/users/auth/login?mockStatus=401`
