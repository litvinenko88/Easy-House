# Easy House

Проект Easy House - система управления умным домом.

## Установка

```bash
# Клонирование репозитория
git clone https://github.com/litvinenko88/Easy-House.git
cd Easy-House

# Установка зависимостей
npm install
```

## Разработка

```bash
# Запуск в режиме разработки
npm run dev
```

## Деплой

```bash
# Локальный деплой (копирование в папку deploy)
npm run deploy

# Деплой на FTP сервер (требует настройки .env.local)
npm run deploy:ftp

# Только сборка без деплоя
npm run build
```

### Автоматический деплой
При пуше в main ветку автоматически:
1. Собирается статический сайт
2. Деплоится на хостинг по FTP

### Локальный деплой
Для локального тестирования файлы копируются в папку `deploy/`

## Настройка FTP

### Локальная настройка
Отредактируйте файл `.env.local`:
```
FTP_SERVER=your-ftp-server.com
FTP_USERNAME=your-username
FTP_PASSWORD=your-password
FTP_REMOTE_PATH=/public_html/
```

### GitHub Secrets
Добавьте в Settings > Secrets and variables > Actions:
- `FTP_SERVER` - адрес FTP сервера
- `FTP_USERNAME` - имя пользователя FTP
- `FTP_PASSWORD` - пароль FTP
- `FTP_REMOTE_PATH` - путь на сервере