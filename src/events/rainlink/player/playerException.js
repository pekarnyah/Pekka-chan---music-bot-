const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player, data) => {
    const guild = await client.guilds.cache.get(player.guildId);

    console.error(`[ERROR] Player got an exception from ${guild.name} (${guild.id})`, data);

    if (player.message) player.message.delete().catch((e) => {});

    const channel = await client.channels.cache.get(player.textId);
    const embed = new EmbedBuilder().setColor(client.config.embedColor);

    if (!player.queue.isEmpty) {
        embed.setDescription(`Error during playback. Skip to the next song...(if the problem is repeated contact the support server via /help)`);

        if (channel) await channel.send({ embeds: [embed] });
    } else {
        embed.setDescription(`Error during playback and the queue is empty. Stopping the player...(if the problem is repeated contact the support server via /help)`);

        if (channel) await channel.send({ embeds: [embed] });
    }

    return player.skip();
};

