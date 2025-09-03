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
# Сборка и автоматический деплой
npm run build
```

При пуше в main ветку автоматически:
1. Собирается статический сайт
2. Выгружается в ветку production
3. Деплоится на хостинг по FTP

## Настройка GitHub Secrets

Добавьте в Settings > Secrets and variables > Actions:
- `FTP_SERVER` - адрес FTP сервера
- `FTP_USERNAME` - имя пользователя FTP
- `FTP_PASSWORD` - пароль FTP
- `FTP_REMOTE_PATH` - путь на сервере