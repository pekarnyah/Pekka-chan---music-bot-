const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "stop",
    description: 'Stop music',
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
        player.stop();

        const embed = new EmbedBuilder().setColor(client.config.embedColor).setDescription(`Stop the current song.`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

