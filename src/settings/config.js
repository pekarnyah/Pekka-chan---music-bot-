require("dotenv").config();
const { DeezerPlugin } = require("rainlink-deezer");
const { SpotifyPlugin } = require("rainlink-spotify");
const { ApplePlugin } = require("rainlink-apple");

module.exports = {
    // GENERAL DETAILS
    token: process.env.TOKEN, 
    prefix: process.env.PREFIX || "!", 
    owner: process.env.OWNER, 
    dev: process.env.DEV ? process.env.DEV.split(",") : [], 
    embedColor: process.env.EMBED_COLOR || "f984e5", 
    leaveTimeout: parseInt(process.env.LEAVE_TIMEOUT) || 60000, 
    minVolume: parseInt(process.env.MIN_VOLUME) || 1, 
    maxVolume: parseInt(process.env.MAX_VOLUME) || 100, 
    mongoUri: process.env.MONGO_URI, // <--- САМОЕ ВАЖНОЕ: Пароль убран!
    geniusApiKey: process.env.GENIUS_API_KEY, 
    supportServerUrl: process.env.SUPPORT_SERVER_URL, 

    // MUSIC DETAILS
    rainlinkPlugins: [
        new DeezerPlugin(),
        new SpotifyPlugin({
            clientId: process.env.SPOTIFY_CLIENT_ID, // Скрыли ID
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET, // Скрыли Secret
            playlistPageLimit: 1,
            albumPageLimit: 1,
            searchLimit: 20,
            searchMarket: "US",
        }),
        new ApplePlugin({
            countryCode: "us", 
            imageWidth: 600, 
            imageHeight: 900, 
        }),
    ],
    rainlinkOptions: {
        resume: true,
        resumeTimeout: 600,
    },
    // Узлы лавалинка тоже лучше спрятать, но если они публичные - не так страшно.
    rainlinkNodes: [
        {
            name: "lavalink",
            host: "lava-v4.ajieblogs.eu.org",
            port: 80,
            auth: "https://dsc.gg/ajidevserver",
            secure: false,
            driver: "lavalink/v4/koinu",
        },
    ],    
};