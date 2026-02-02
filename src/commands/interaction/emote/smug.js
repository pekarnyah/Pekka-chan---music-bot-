const { EmbedBuilder } = require("discord.js");


module.exports = {

    name: "smug",
    description: 'smug  ',
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
        console.log(`[DEBUG] Processing /smug by ${user.tag} (${user.id})`);

        const embed = new EmbedBuilder()
            .setColor(0x420082)
            .setDescription(`${user} looking smug`);

        try {
            const res = await fetch("https://api.waifu.pics/sfw/smug").then((r) => r.json());
            embed.setImage(res.url);
        } catch (error) {
            console.error(`[ERROR] Failed to fetch smug image: ${error.message}`);
            embed.setDescription("Error");
        }

        return interaction.editReply({ embeds: [embed] });
    },
};