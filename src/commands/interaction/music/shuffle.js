const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "shuffle",
    description: "Shuffle the queue",
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
            embed.setDescription(`The queue is empty. Shuffling is not possible.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        if (player.queue.length <= 1) {
            embed.setDescription(`There is only one song in the queue. Shuffling is not possible.`);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.queue.shuffle();

        embed.setDescription(`Shuffled the queue.`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};