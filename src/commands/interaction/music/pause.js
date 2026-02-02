const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "pause",
    description: "Pause this track",
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

        if (player.paused) {
            embed.setDescription(`Уже на паузе`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.pause();

        embed.setDescription(`Приостановка текущей композиции.`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

