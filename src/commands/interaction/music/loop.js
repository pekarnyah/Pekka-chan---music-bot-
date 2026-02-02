const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "loop",
    description: "loop mode",
    category: "music",
    options: [
        {
            name: "mode",
            description: "Set loop mode",
            type: 3,
            required: true,
            choices: [
                { name: "off", value: "none" },
                { name: "song", value: "song" },
                { name: "queue", value: "queue" },
            ],
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
        const mode = interaction.options.getString("mode");

        switch (mode) {
            case "none":
                embed.setDescription(`Loop set: \`Off\`.`);
                break;
            case "song":
                embed.setDescription(`Loop set: \`song\`.`);
                break;
            case "queue":
                embed.setDescription(`Loop set: \`queue\`.`);
                break;
        }

        player.setLoop(mode);

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

