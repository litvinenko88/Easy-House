const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

async function deployLocal() {
  try {
    console.log('🚀 Начинаю локальный деплой...');
    
    const sourceDir = './out';
    const targetDir = './deploy'; // Можете изменить на нужную папку
    
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true });
    }
    
    copyDir(sourceDir, targetDir);
    
    console.log('✅ Локальный деплой завершен успешно!');
    console.log(`📁 Файлы скопированы в: ${path.resolve(targetDir)}`);
  } catch (err) {
    console.error('❌ Ошибка локального деплоя:', err);
  }
}

deployLocal();