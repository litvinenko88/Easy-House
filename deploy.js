const ftp = require('basic-ftp');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

async function deployToFTP() {
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

    console.log('Загрузка файлов...');
    await client.ensureDir(process.env.FTP_REMOTE_PATH || '/');
    await client.clearWorkingDir();
    await client.uploadFromDir('./out', process.env.FTP_REMOTE_PATH || '/');
    
    console.log('✅ Деплой завершен успешно!');
  } catch (err) {
    console.error('❌ Ошибка деплоя:', err);
  }

  client.close();
}

deployToFTP();