const { EmbedBuilder } = require("discord.js");


module.exports = {
    name: "smile",
    description: 'smile',
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
        console.log(`[DEBUG] Processing /smile by ${user.tag} (${user.id})`);

        const embed = new EmbedBuilder()
            .setColor(0x420082)
            .setDescription(`${user} smile`);

        const res = await fetch("https://api.waifu.pics/sfw/smile").then((r) => r.json());
        embed.setImage(res.url);

        return interaction.editReply({ embeds: [embed] });
    },
};