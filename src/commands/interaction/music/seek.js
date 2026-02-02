const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "seek",
    description: "Seek the current track",
    category: "music",
    options: [
        {
            name: "time",
            description: "Provide the time in seconds",
            type: 4,
            min_value: 0,
            required: true,
        },
    ],
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
        const time = interaction.options.getInteger("time");

        if (!player.queue.current.isSeekable) {
            embed.setDescription(`The current song is not seekable.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (time * 1000 > player.queue.current.duration) {
            embed.setDescription(`The time is greater than the song's duration.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.seek(time * 1000);

        embed.setDescription(`Seeking to: \`${time}s\``);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};