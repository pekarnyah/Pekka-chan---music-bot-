const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "247",
    description: "Enable 24/7 mode",
    category: "setting",
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
        await interaction.deferReply({ ephemeral: true });

        const guildData = client.data.get(`guildData_${interaction.guildId}`);

        guildData.reconnect.status = !guildData.reconnect.status;
        guildData.reconnect.text = player.textId || interaction.channelId;
        guildData.reconnect.voice = player.voiceId || interaction.member.voice.channelId;

        const embed = new EmbedBuilder()
            .setColor(client.config.embedColor)
            .setDescription(guildData.reconnect.status ? "24/7 mode - `enabled`." : "24/7 mode - `disabled`.");

        return interaction.editReply({ embeds: [embed] });
    },
};