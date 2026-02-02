const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "resume",
    description: "Resuming a currently paused song",
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

        if (!player.paused) {
            embed.setDescription(`The song is not paused.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.resume();

        embed.setDescription(`Resumes the current song.`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

