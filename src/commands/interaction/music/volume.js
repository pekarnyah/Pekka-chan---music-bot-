const { EmbedBuilder } = require("discord.js");
const { minVolume, maxVolume } = require("../../../settings/config.js");

module.exports = {
    name: "volume",
    description: "Adjust the volume",
    category: "music",
    options: [
        {
            name: "value",
            description: "Specify the volume (1-100)",
            type: 4,
            min_value: minVolume,
            max_value: maxVolume,
            required: false,
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
        const value = interaction.options.getInteger("value");

        if (!value) {
            embed.setDescription(`Current volume - \`${player.volume}%\``);

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        player.setVolume(value);

        embed.setDescription(`Volume set to: \`${value}%\``);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};