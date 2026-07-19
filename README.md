# Сайт «Зинаида Петровна»

## Что уже готово
- Обновлённая форма в бежево-золотых и нежно-сиреневых тонах.
- Поля: имя, дата рождения/возраст, страна, Telegram/WhatsApp, главный вопрос.
- Дополнительные поля для другого человека появляются только при выборе «Да».
- Заявка сохраняется в Netlify Forms.
- Копия заявки отправляется в Telegram через Netlify Function.

## Что нужно добавить в Netlify
В Site configuration → Environment variables добавьте:

- `TELEGRAM_BOT_TOKEN` — токен Telegram-бота (у вас уже добавлен).
- `TELEGRAM_CHAT_ID` — числовой ID чата, куда должны приходить заявки.

После добавления переменных сделайте новый Deploy.

## Структура проекта
- `index.html`
- `spasibo.html`
- `netlify.toml`
- `netlify/functions/send-telegram.js`
