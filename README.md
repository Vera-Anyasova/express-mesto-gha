[![Tests](../../actions/workflows/tests-13-sprint.yml/badge.svg)](../../actions/workflows/tests-13-sprint.yml) [![Tests](../../actions/workflows/tests-14-sprint.yml/badge.svg)](../../actions/workflows/tests-14-sprint.yml)

# Проект Mesto фронтенд + бэкенд

В данном проекте создается сервер для приложения Mesto. В проекте используется линтер eslint, который поддерживает единообразие кода. Для организации данных используется самая распространённая NoSQL база данных - MongoDB. Заданы две схемы для пользователя и карточек через Mongoose. На основе этих схем построены модели методом mongoose.model. Для тестирования сервера использовалось приложение Postman.

В рамках проектной работы использованы следующие инструменты:

- созданы роуты signup для регистрации и signin для авторизации;
- для сущности user реализованы следующие роуты: get (для получения всех пользователей и конкретного пользователя по id), post (для создания пользователя), patch (для обновления профиля и аватара пользователя);
- для сущности card реализованы роуты: get (для получения всех карточек), post (для создания карточки), delete (для удаления карточки по id), put и delete (для добавления и удаления лайка);
- все роуты, кроме тех, что используются для логина и регистрации, находятся в отдельной папке routes. Эти маршруты защищены авторизацией;
- логику обработки запросов описывает файл контроллеров - controllers;
- данные валидированы на уровне схемы, тела и параметры запросов валидируются с помощью celebrate;
- в проекте создан мидлвэр для централизованной обработки ошибок.

Cсылка на GitHub Pages: https://github.com/Vera-Anyasova/express-mesto-gha
