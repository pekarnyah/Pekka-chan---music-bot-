const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player) => {
    try {
        const guild = await client.guilds.fetch(player.guildId).catch(() => null);
        const channel = await client.channels.fetch(player.textId).catch(() => null);

        console.error(`[ERROR] A song got stuck in ${guild?.name || "Unknown Guild"} (${player.guildId})`);

        if (player.message) {
            await player.message.delete().catch(() => {});
        }

        const embed = new EmbedBuilder()
            .setColor(client.data.get(`color_${player.guildId}`) || 0xff0000)
            .setAuthor({
                name: guild?.name || "Unknown Guild",
                iconURL: guild?.iconURL() || undefined
            });

        // ✅ Проверяем через length
        const hasQueue = Array.isArray(player.queue) ? player.queue.length > 0 : player.queue?.tracks?.length > 0;

        if (hasQueue) {
            embed.setDescription(`❗️ **The track got stuck. Skipping to the next one...**`);
        } else {
            embed.setDescription(`⚠️ **The track got stuck and the queue is empty. Stopping the player...**`);
        }

        if (channel) {
            await channel.send({ embeds: [embed] }).catch(() => {});
        }

        return player.skip();
    } catch (error) {
        console.error(`[trackStuck ERROR]:`, error);
    }
};
