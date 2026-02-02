const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "megadance",
    description: 'megadance',
    category: "emote",
    options: [],
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
        const user = interaction.user;

        await interaction.deferReply({ flags: [4096] });
        console.log(`[DEBUG] Processing /megadance by ${user.tag} (${user.id})`);

        const embed = new EmbedBuilder()
            .setColor(0x420082)
            .setTitle("YYYEEEEYY")
            .setDescription(`${user} ♪ EVERYBODY DANCE, EVERYBODY DANCE ♪`)
            .setImage("https://cdn.discordapp.com/attachments/1073333671169372220/1080054673412722699/1387f7e74c043601.gif");

        return interaction.editReply({ embeds: [embed] });
    },
};