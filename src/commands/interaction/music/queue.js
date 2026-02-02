const { EmbedBuilder } = require("discord.js");
const { createPage } = require("../../../functions/createPage.js");
const { convertTime } = require("../../../functions/timeFormat.js");

module.exports = {
    name: "queue",
    description: "Displaying a list of queues",
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
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const formatString = (str, maxLength) => (str.length > maxLength ? str.substr(0, maxLength - 3) + "..." : str);

        if (player.queue.isEmpty) {
            embed.setDescription(`The queue is empty.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const queueList = player.queue.map((track, index) => {
            const trackUrl = track.uri;
            const trackTitles = formatString(track.title, 30).replace(/ - Topic$/, "") || "Unknown title";
            const trackArtists = formatString(track.author, 25).replace(/ - Topic$/, "") || "Unknown author";
            const trackDuration = track.isStream ? "LIVE" : convertTime(track.duration);

            return `\`${index + 1}.\` **[${trackTitles} - ${trackArtists}](${trackUrl})**  •  \`${trackDuration}\``;
        });

        embed
            .setAuthor({ name: "Queue list", iconURL: client.user.displayAvatarURL() })
            .setColor(client.config.embedColor)
            .setThumbnail(interaction.guild.iconURL())
            .setFooter({
                text: `Total songs: ${player.queue.size}  • Total duration: ${convertTime(player.queue.duration)}`,
                iconURL: client.user.displayAvatarURL(),
            });

        const pages = lodash.chunk(queueList, 10).map((s) => s.join("\n"));

        return createPage(client, interaction, embed, pages);
    },
};

