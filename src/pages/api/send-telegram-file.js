import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const TELEGRAM_BOT_TOKEN = process.env.NEXT_PUBLIC_TELEGRAM_BOT_TOKEN || '8498114010:AAFcJmkf9AOaA2p6xUgaQ0edyNJPOIgY2DI';
  const TELEGRAM_CHAT_ID = process.env.NEXT_PUBLIC_TELEGRAM_CHAT_ID || '682859146';

  try {
    const form = formidable({});
    const [fields, files] = await form.parse(req);

    const name = fields.name?.[0];
    const phone = fields.phone?.[0];
    const source = fields.source?.[0];
    const projectInfo = fields.projectInfo?.[0] ? JSON.parse(fields.projectInfo[0]) : null;

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

    // Отправляем текстовое сообщение
    const textResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
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

    const textResult = await textResponse.json();

    // Если есть файл, отправляем его
    if (files.pdfFile && files.pdfFile[0]) {
      const file = files.pdfFile[0];
      const formData = new FormData();
      formData.append('chat_id', TELEGRAM_CHAT_ID);
      formData.append('document', fs.createReadStream(file.filepath), 'floor-plan.pdf');
      formData.append('caption', '📋 План дома от клиента');

      const fileResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
        method: 'POST',
        body: formData
      });

      const fileResult = await fileResponse.json();
      
      // Удаляем временный файл
      fs.unlinkSync(file.filepath);
      
      return res.status(200).json({ 
        success: textResult.ok && fileResult.ok, 
        data: { text: textResult, file: fileResult } 
      });
    }

    res.status(200).json({ success: textResult.ok, data: textResult });
  } catch (error) {
    console.error('Telegram API error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}