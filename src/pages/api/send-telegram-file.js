export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8498114010:AAFcJmkf9AOaA2p6xUgaQ0edyNJPOIgY2DI';
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '682859146';

  try {
    // Просто отправляем текстовое сообщение с данными формы
    const { name, phone, source, projectInfo } = req.body;

    let message = `🏠 Новая заявка с сайта Easy House\n\n👤 Имя: ${name}\n📞 Телефон: ${phone}\n📍 Источник: ${source}`;

    if (projectInfo) {
      message += `\n\n🏡 Информация о проекте:\n🏷️ Название: ${projectInfo.name}\n📏 Размеры дома: ${projectInfo.dimensions}\n📐 Площадь: ${projectInfo.area}м²`;
      if (projectInfo.lotSize) {
        message += `\n🏞️ Участок: ${projectInfo.lotSize}`;
      }
      message += `\n🧱 Стен: ${projectInfo.wallsCount || 0}\n🚪 Дверей: ${projectInfo.doorsCount || 0}\n🪟 Окон: ${projectInfo.windowsCount || 0}`;
      message += `\n\n📋 План дома будет отправлен отдельным сообщением`;
    }

    message += `\n⏰ Время: ${new Date().toLocaleString('ru-RU')}`;

    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
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