const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { find } = require("llyrics");
const gsearch = require("google-search-url");

module.exports = {
    name: "lyric",
    description: "Get the lyrics of current song",
    category: "music",
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: true,
        player: true,
        current: true,
    },
    devOnly: false,

    run: async (client, interaction, player) => {
        await interaction.deferReply(); // <--- фикс

        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const formatString = (str, maxLength) => (str.length > maxLength ? str.substr(0, maxLength - 3) + "..." : str);
        const formatText = (text) =>
            text
                .replace(/\(.*?\)/gi, "")
                .replace(/\s/g, "-")
                .replace(/['",]/g, "")
                .replace(/ - Topic$/, "")
                .toLowerCase();

        const track = player.queue.current;
        const trackTitle = formatText(track.title);
        const trackArtist = formatText(track.author);
        const lyricText = await lyricFind(client, trackTitle, trackArtist);

        if (!lyricText) {
            embed.setDescription(`No lyrics found for: \`${trackTitle} - ${trackArtist}\``);
            return interaction.editReply({ embeds: [embed], ephemeral: true });
        }

        embed
            .setAuthor({
                name: `${formatString(trackTitle, 30)} - ${formatString(trackArtist, 25)} Lyrics`,
                iconURL: client.user.displayAvatarURL(),
            })
            .setThumbnail(track.artworkUrl);

        if (lyricText.length <= 4096) {
            embed.setDescription(lyricText);
            return interaction.editReply({ embeds: [embed] });
        } else {
            embed.setDescription(lyricText.substring(0, 4096));

            const lyricUrl = gsearch.craft({ query: `${trackTitle} ${trackArtist} lyrics` }).url;
            const lyricButton = new ActionRowBuilder().addComponents(
                new ButtonBuilder().setURL(lyricUrl.replace("http", "https")).setLabel("Full Lyrics").setStyle(ButtonStyle.Link)
            );

            return interaction.editReply({ embeds: [embed], components: [lyricButton] });
        }
    },
};

async function lyricFind(client, title, author) {
    const response = await find({
        song: title,
        artist: author,
        geniusApiKey: client.config.geniusApiKey,
        engine: "genius",
        forceSearch: true,
    });

    return response.lyrics;
}
