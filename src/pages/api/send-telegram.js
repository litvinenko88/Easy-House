export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8498114010:AAFcJmkf9AOaA2p6xUgaQ0edyNJPOIgY2DI';
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '682859146';

  try {
    const { name, phone, source, projectInfo } = req.body;

    let message = `🏠 Новая заявка с сайта Easy House

👤 Имя: ${name}
📞 Телефон: ${phone}
📍 Источник: ${source}`;

    if (projectInfo) {
      message += `

🏡 Информация о проекте:
🏷️ Название: ${projectInfo.name}
📏 Размеры дома: ${projectInfo.dimensions}
📐 Площадь: ${projectInfo.area}м²
🏞️ Участок: ${projectInfo.lotSize}
🧱 Стен: ${projectInfo.wallsCount}
🚪 Дверей: ${projectInfo.doorsCount}
🪟 Окон: ${projectInfo.windowsCount}`;
    }

    message += `
⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: 'HTML'
      })
    });

    const result = await response.json();

    if (result.ok) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(400).json({ success: false, error: result.description });
    }
  } catch (error) {
    console.error('Telegram API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}