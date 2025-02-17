# Electronics Store

Интернет-магазин электроники с админ-панелью, корзиной и системой заказов.

## Функционал

- Каталог товаров с фильтрацией и поиском
- Корзина покупок
- Оформление заказов
- Система авторизации и регистрации
- Личный кабинет с историей заказов
- Админ-панель для управления товарами и заказами

## Технологии

- Frontend: React, Material-UI
- Backend: Node.js, Express
- База данных: MongoDB
- Аутентификация: JWT

## Требования

- Node.js (версия 14 или выше)
- MongoDB (должен быть запущен на порту 27017)
- Git

## Установка и запуск

1. Клонируйте репозиторий:

bash
git clone [url-репозитория]
cd electronics-store

2. Установите зависимости и создайте необходимые файлы:

bash
chmod +x setup.sh
./setup.sh

3. Запустите сервер:

bash
cd server
npm start

4. В новом терминале запустите клиент:

bash
cd client
npm start

5. Откройте браузер и перейдите по адресу: http://localhost:3000

## Создание администратора

Для создания администратора выполните в MongoDB:

javascript
use electronics-store
db.users.insertOne({
email: "admin@example.com",
password: "$2a$10$YourHashedPasswordHere", // пароль: admin123
name: "Admin",
isAdmin: true
})

## Структура проекта

electronics-store/
├── client/ # Frontend React приложение
│ ├── src/
│ │ ├── components/ # React компоненты
│ │ ├── pages/ # Страницы приложения
│ │ ├── context/ # React контексты
│ │ └── App.js # Главный компонент
│ └── package.json
│
└── server/ # Backend Node.js/Express приложение
├── models/ # Mongoose модели
├── routes/ # Express роуты
├── middleware/ # Middleware функции
├── server.js # Входная точка сервера
└── package.json

## Доступы

- Админ панель: 
  - Email: admin@example.com
  - Пароль: admin123

## Порты

- Frontend: http://localhost:3000
- Backend: http://localhost:5000
- MongoDB: mongodb://localhost:27017

## Основные роуты

### Frontend:
- / - Главная страница
- /products - Каталог товаров
- /cart - Корзина
- /checkout - Оформление заказа
- /orders - История заказов
- /admin - Админ панель
- /admin/products - Управление товарами
- /admin/orders - Управление заказами

### Backend API:
- POST /api/users/register - Регистрация
- POST /api/users/login - Авторизация
- GET /api/products - Получение списка товаров
- POST /api/orders - Создание заказа
- GET /api/orders/my-orders - История заказов пользователя
