const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "autoplay",
    description: "Enable autoplay mode",
    category: "setting",
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
        const track = player.queue.isEmpty ? player.queue.current : player.queue[player.queue.size - 1];

        if (!isYoutube(track)) {
            embed.setDescription(
                `${player.queue.isEmpty() ? "The current track's platform is not supported" : "The last platform in the queue is not supported"}. Autoplay mode can only be used with YouTube.`,
            );

            return interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const autoplay = client.data.get("autoplay", player.guildId);

        if (autoplay) {
            client.data.delete("autoplay", player.guildId);

            embed.setDescription(`Autoplay mode - \`Disabled\``);
        } else {
            client.data.set("autoplay", player.guildId);

            embed.setDescription(`Autoplay mode - \`Enabled\``);
        }

        return interaction.reply({ embeds: [embed], ephemeral: true });
    },
};

function isYoutube(track) {
    return track?.source === "youtube";
}