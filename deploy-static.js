const ftp = require('basic-ftp');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function deployStatic() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    console.log('Подключение к FTP серверу...');
    await client.access({
      host: process.env.FTP_SERVER,
      user: process.env.FTP_USERNAME,
      password: process.env.FTP_PASSWORD,
      secure: false
    });

    console.log('Переход в целевую директорию...');
    await client.ensureDir(process.env.FTP_REMOTE_PATH);

    console.log('Загрузка статических файлов...');
    await client.uploadFromDir('./out', process.env.FTP_REMOTE_PATH);

    console.log('✅ Статический сайт успешно развернут!');
  } catch (err) {
    console.error('❌ Ошибка деплоя:', err);
  } finally {
    client.close();
  }
}

deployStatic();