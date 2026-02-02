const { EmbedBuilder } = require("discord.js");


module.exports = {
    name: "kiss",
    description: 'kiss',
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

        await interaction.deferReply({ flags: [4096] });
        console.log(`[DEBUG] Processing /kiss by ${user.tag} (${user.id})`);

        const embed = new EmbedBuilder().setColor(0x420082);

        if (!member) {
            embed.setDescription("You forgot to specify the user.");
        } else {
            embed.setDescription(`${user} kiss ${member}`);
            try {
                const res = await fetch("https://api.waifu.pics/sfw/kiss").then((r) => r.json());
                embed.setImage(res.url);
            } catch (error) {
                console.error(`[ERROR] Failed to fetch kiss image: ${error.message}`);
                embed.setDescription("Error");
            }
        }

        return interaction.editReply({ embeds: [embed] });
    },
};