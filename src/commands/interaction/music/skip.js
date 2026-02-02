const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "skip",
    description: "Skip the current song",
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

        if (player.queue.isEmpty && !client.data.get("autoplay", player.guildId)) {
            embed.setDescription(`The queue is empty. Skipping is not possible.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.skip();

        embed.setDescription(`Skipping the current song.`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};