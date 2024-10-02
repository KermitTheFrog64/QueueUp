# Приложение для управления задачами

Это полнофункциональное веб-приложение для управления задачами, построенное с использованием React и Koa. Оно позволяет пользователям создавать, обновлять и отслеживать задачи с различными функциями, такими как приоритеты, сроки и статус выполнения.

## Функциональность
- Регистрация и авторизация пользователей (на основе JWT)
- Создание, обновление и удаление задач
- Установка приоритетов и описания для задач
- Сохранение данных в базе MySQL

## Стек
- **Frontend**: React, Redux, TypeScript
- **Backend**: Koa, TypeScript, TypeORM
- **База данных**: MySQL
- **Другие технологии**: Docker

## Установка и запуск

1. Клонируйте репозиторий:
   
   ```bash
   git clone https://github.com/KermitTheFrog64/GTDFlow.git
   ```
3. Установите зависимости для фронтенда и бэкенда:

   Для фронтенда:
   
   ```bash
   cd frontend
   npm install
   ```
   Для бэкенда:

    ```bash
   cd backend
   npm install
   ```
5. Запуск проекта:

    1. Убедитесь, что у вас установлен Docker.
    2. В корневой папке проекта выполните команду для запуска MySQL через Docker:

   ```bash
   docker-compose up
   ```
   Это создаст и запустит контейнер с MySQL, который будет использоваться для хранения данных.

   3. Выполните миграции базы данных:

   ```bash
   npm run typeorm migration:run
   ```
   4. Запустите сервер:
  
   ```bash
   npm run dev
   ```
   5. Запустите фронтенд:
  
    ```bash
   npm run dev
   ```
6. Доступ к приложению:

Фронтенд будет доступен по адресу: http://localhost:5173
Бэкенд (API) будет доступен по адресу: http://localhost:3001
