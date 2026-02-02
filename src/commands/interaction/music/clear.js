const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "clear",
    description: "Clear queue",
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

        if (player.queue.isEmpty) {
            embed.setDescription(`The queue already empty.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.queue.clear();

        embed.setDescription(`The queue empty.`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

