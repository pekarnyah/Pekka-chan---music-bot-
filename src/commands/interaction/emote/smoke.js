const { EmbedBuilder } = require("discord.js");
const { gif_smoke } = require("./data.js");

module.exports = {
    name: "smoke",
    description: 'smoke',
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
        console.log(`[DEBUG] Processing /smoke by ${user.tag} (${user.id})`);

        const embed = new EmbedBuilder()
            .setColor(0x420082)
            .setTitle("SMOKE")
            .setDescription(`${user} smoked his penis. Oh, no, I think he smoked a cigarette.`)
            .setImage(gif_smoke[Math.floor(Math.random() * gif_smoke.length)]);

        return interaction.editReply({ embeds: [embed] });
    },
};