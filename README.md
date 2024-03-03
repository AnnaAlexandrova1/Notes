# **Приложение для заметок (Frontend)**
Реализована только frontend часть приложения

## **Загрузка и настройка проекта:**

1. Клонировать репозиторий по https
```
git clone https://github.com/AnnaAlexandrova1/Notes.git
```
2. Установить необходимые зависимости: 
```
npm install
```
3. Собрать mock-сервер приложения
```
npx json-server data-base.json5
```
4. Собрать клиентскую часть приложения(в новом терминале)
```
ng serve
```
5. Перейти по адресу http://localhost:4200/

## **В проекте реализован следующий функционал:**
* Моковый сервер с эндпоинтами для операций с заметками, напоминаниями и тегами
* Создание, редактирование, удаление заметок
* Создание напоминаний, сортировка по дате
* Создание, удаление тегов
* Установка тегов на определеную заметку
* Возможность установки в заметку конкретной даты