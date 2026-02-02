# 🎵 Pekka-chan Music Bot

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Discord.js-5865F2?style=for-the-badge&logo=discord&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge" />
</p>

<p align="center">
  <b>A fun and powerful Discord music bot for chilling with friends 🎧</b><br>
  Supports YouTube, Spotify and SoundCloud with clean audio via Lavalink.
</p>

<p align="center">
  <b>Фановый и мощный Discord музыкальный бот для тусовки с друзьями 🎧</b><br>
  Поддержка YouTube, Spotify и SoundCloud + чистый звук через Lavalink.
  <br><br>
  👉 <a href="README_RU.md"><b>Read in Russian / Читать на Русском</b></a> 👈
</p>

------------------------------------------------------------------------

## 😎 What is this?

**Pekka-chan** is a Discord music bot that: - plays music without pain
and suffering, - understands links and track names, - has audio filters
(bass, nightcore, 8D, etc.), - and simply makes your server more fun 🎉

Short version: **start it up and let the server vibe**.

------------------------------------------------------------------------

## 🔥 Features

-   🎧 **High quality audio** (via Lavalink)
-   🎼 **YouTube / Spotify / SoundCloud**
-   ⚡ **Slash commands** (`/play`, `/skip`, `/stop`, etc.)
-   🎛️ **Audio filters** (bassboost, nightcore, 8D, and more)
-   📜 **Lyrics support**
-   🗃️ **MongoDB** for data storage

------------------------------------------------------------------------

## 🧰 Requirements

-   Node.js 18+
-   MongoDB (you can get it here: https://www.mongodb.com/)
-   Lavalink server
-   Discord Bot Token

------------------------------------------------------------------------

## 🛠️ Installation

1.  **Clone the repo:**

``` bash
git clone https://github.com/pekarnyah/Pekka-chan---music-bot-.git
cd Pekka-chan---music-bot-
```

2.  **Install dependencies:**

``` bash
npm install
```

3.  **Setup config:** Rename `.env.example` → `.env` and fill it:

``` env
TOKEN=your_discord_token
MONGO_URI=your_mongodb_connection_string
OWNER=your_discord_id
SPOTIFY_CLIENT_ID=your_spotify_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret
```

4.  **Start the bot:**

``` bash
node src/index.js
```

------------------------------------------------------------------------

## 🎮 Example commands

-   `/play <name or link>` --- play a track
-   `/skip` --- skip current track
-   `/stop` --- stop playback
-   `/queue` --- show queue
-   `/filter` --- enable audio effects

> Full list is available via `/help`

------------------------------------------------------------------------

## 🔗 Links

-   🤖 Invite Bot:
    https://discord.com/oauth2/authorize?client_id=1356970045183492195
-   💬 Support Server: https://discord.gg/5pZqrJFEYZ
-   🗃️ MongoDB: https://www.mongodb.com/

------------------------------------------------------------------------

## 🤝 Contributing

Want to help? - Fork the repo - Make a pull request - Or drop ideas in
issues

Any help is appreciated ❤️

------------------------------------------------------------------------

## 📜 License & Note

This project is licensed under the **MIT License**.

⚠️ Important note: I **found the original code and reworked it in my own
way**.\
You are free to share and use it, **but please credit me as the script
modifier and author of the modifications**.

In short: use it, improve it, but don't forget the credits 😉
