const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "leave",
    description: "Leave the voice channel",
    category: "music",
    permissions: {
        bot: [],
        user: ["ManageGuild"],
    },
    settings: {
        voice: true,
        player: true,
        current: false,
    },
    devOnly: false,
    run: async (client, interaction, player) => {
        player.destroy();

        const embed = new EmbedBuilder().setColor(client.config.embedColor).setDescription(`I left the voice channel..`);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

