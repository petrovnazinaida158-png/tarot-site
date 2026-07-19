exports.handler = async (event, context) => {
  // Только POST запросы
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Метод не допускается' })
    };
  }

  try {
    const data = JSON.parse(event.body);

    // Получаем токен и Chat ID из переменных окружения
    const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    // Проверяем наличие переменных
    if (!BOT_TOKEN || !CHAT_ID) {
      console.error('❌ Ошибка: переменные окружения не установлены!');
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Конфигурация сервера не корректна' })
      };
    }

    // Формируем сообщение
    let message = `🔮 *НОВАЯ ЗАЯВКА НА РАСКЛАД*\n\n`;
    message += `👤 *Имя:* ${data.name}\n`;
    message += `📅 *Дата рождения:* ${data.birthdate || 'не указано'}\n`;
    message += `🌍 *Страна:* ${data.country}\n`;
    message += `📱 *Контакты:* ${data.contact}\n`;
    message += `❓ *Вопрос:* ${data.question}\n`;
    message += `👥 *Другой человек:* ${data.hasOtherPerson}\n`;

    if (data.hasOtherPerson === 'Да') {
      message += `\n🔸 *Имя:* ${data.otherName || 'не указано'}\n`;
      message += `📅 *Дата рождения:* ${data.otherBirthdate || 'не указано'}\n`;
      message += `🔸 *Кем приходится:* ${data.relation || 'не указано'}\n`;
    }

    // Отправляем в Telegram
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: 'Markdown'
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Ошибка Telegram:', errorData);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Ошибка отправки в Telegram' })
      };
    }

    console.log('✅ Заявка успешно отправлена в Telegram');
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Заявка отправлена!' })
    };

  } catch (error) {
    console.error('Ошибка сервера:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Ошибка сервера' })
    };
  }
};
