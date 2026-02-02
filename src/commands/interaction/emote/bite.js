const { EmbedBuilder } = require("discord.js");


module.exports = {
    name: "bite",
    description: 'bite member',
    category: "emote",
    options: [
        {
            name: "member",
            description: 'member',
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
        const user = interaction.user;
        const member = interaction.options.getMember("member");

        await interaction.deferReply({ ephemeral: true });
        console.log(`[DEBUG] Processing /bite by ${user.tag} (${user.id})`);

        const embed = new EmbedBuilder().setColor(0x420082);

        if (!member) {
            embed.setDescription("You forgot to specify the user.");
        } else {
            embed.setDescription(`${user} bite ${member}`);
            const res = await fetch("https://api.waifu.pics/sfw/bite").then((r) => r.json());
            embed.setImage(res.url);
        }

        return interaction.editReply({ embeds: [embed] });
    },
};