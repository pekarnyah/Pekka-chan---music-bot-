const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Show user avatar",
    category: "general",
    options: [
        {
            name: "user",
            description: "Whose avatar you want to see",
            type: 6, // USER
            required: false,
        },
    ],
    permissions: {
        bot: [],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: false,

    run: async (client, interaction) => {
        const user = interaction.options.getUser("user") || interaction.user;

        const embed = new EmbedBuilder()
            .setTitle(`Avatar ${user.username}`)
            .setImage(user.displayAvatarURL({ dynamic: true, size: 1024 }))
            .setColor(0x420082);

        await interaction.reply({ embeds: [embed] });
    },
};
