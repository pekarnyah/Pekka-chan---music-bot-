const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "filter",
    description: "Select filter",
    category: "music",
    options: [
        {
            name: "mode",
            description: "Choose a filter",
            type: 3,
            required: true,
            choices: [
                { name: "8d", value: "eightD" },
                { name: "bass", value: "bass" },
                { name: "chipmunk", value: "chimpunk" },
                { name: "clear", value: "clear" },
                { name: "earrape", value: "earrape" },
                { name: "electronic", value: "electronic" },
                { name: "karaoke", value: "karaoke" },
                { name: "nightcore", value: "nightcore" },
                { name: "pitch", value: "pitch" },
                { name: "slow", value: "slow" },
                { name: "soft", value: "soft" },
                { name: "tremolo", value: "tremolo" },
                { name: "treblebass", value: "treblebass" },
                { name: "vaporwave", value: "vaporwave" },
                { name: "vibrato", value: "vibrato" },
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
        const currentVolume = player.volume;

        player.filter.set(mode);
        player.setVolume(currentVolume);

        if (mode === "clear") {
            embed.setDescription(`Filters cleaned`);
        } else {
            embed.setDescription(`Filter set: \`${mode}\``);
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

