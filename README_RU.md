# 🎵 Pekka-chan Music Bot

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Lavalink-Ready-blueviolet?style=for-the-badge&logo=discord" alt="Lavalink Ready">
  <br><br>
  <b>Фановый и мощный Discord музыкальный бот для тусовки с друзьями 🎧</b><br>
  Поддержка YouTube, Spotify и SoundCloud + чистый звук через Lavalink.
  <br><br>
  <b>A powerful Discord music bot supporting Spotify, SoundCloud, and YouTube.</b>
  <br><br>
  👉 <a href="README.md"><b>Read in English / Читать на английском</b></a> 👈
</p>
------------------------------------------------------------------------

## 😎 Что это вообще такое?

**Pekka-chan** --- это музыкальный бот для Discord, который: - играет
музыку без боли и страданий, - понимает ссылки и названия треков, -
умеет фильтры (бас, nightcore, 8D и т.д.), - и просто делает сервер
веселее 🎉

Если коротко: **включил --- и погнал качать сервер**.

------------------------------------------------------------------------

## 🔥 Фичи

-   🎧 **Качественный звук** (через Lavalink)
-   🎼 **YouTube / Spotify / SoundCloud**
-   ⚡ **Slash-команды** (`/play`, `/skip`, `/stop` и т.п.)
-   🎛️ **Аудио-фильтры** (bassboost, nightcore, 8D и др.)
-   📜 **Поиск текстов песен**
-   🗃️ **MongoDB** для хранения данных

------------------------------------------------------------------------

## 🧰 Что нужно

-   Node.js 18+
-   MongoDB (можно взять тут: https://www.mongodb.com/)
-   Lavalink сервер
-   Discord Bot Token

------------------------------------------------------------------------

## 🛠️ Установка

1.  **Клонируем репу:**

``` bash
git clone https://github.com/pekarnyah/Pekka-chan---music-bot-.git
cd Pekka-chan---music-bot-
```

2.  **Ставим зависимости:**

``` bash
npm install
```

3.  **Настраиваем конфиг:** Переименуй `.env.example` → `.env` и
    заполни:

``` env
TOKEN=your_discord_token
MONGO_URI=your_mongodb_connection_string
OWNER=your_discord_id
SPOTIFY_CLIENT_ID=your_spotify_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret
```

4.  **Запускаем бота:**

``` bash
node src/index.js
```

------------------------------------------------------------------------

## 🎮 Примеры команд

-   `/play <название или ссылка>` --- включить трек
-   `/skip` --- пропустить
-   `/stop` --- остановить
-   `/queue` --- посмотреть очередь
-   `/filter` --- включить эффекты

> Полный список смотри через `/help`

------------------------------------------------------------------------

## 🔗 Ссылки

-   🤖 Invite Bot:
    https://discord.com/oauth2/authorize?client_id=1356970045183492195
-   💬 Support Server: https://discord.gg/5pZqrJFEYZ
-   🗃️ MongoDB: https://www.mongodb.com/

------------------------------------------------------------------------

## 🤝 Вклад в проект

Хочешь помочь? - Делай fork - Делай pull request - Или кидай идеи в
issues

Любая помощь --- респект и уважуха ❤️

------------------------------------------------------------------------

## 📜 Лицензия и примечание

Этот проект распространяется по лицензии **MIT**.

⚠️ Важно: Я **нашёл исходный код и переработал его под свой лад**.\
Распространять можно, **но желательно указывать меня как модификатора
скрипта** и автора доработок.

Короче: юзай, улучшай, но не забывай про кредит 😉
