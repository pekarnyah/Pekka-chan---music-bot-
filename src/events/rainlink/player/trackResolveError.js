const { EmbedBuilder } = require("discord.js");

module.exports = async (client, player, track, message) => {
    const guild = await client.guilds.cache.get(player.guildId);

    console.error(`[ERROR] Song error from ${guild.name} (${guild.id})`, message);

    if (player.message) player.message.delete().catch((e) => {});

    const channel = await client.channels.cache.get(player.textId);
    const embed = new EmbedBuilder().setColor(client.config.embedColor);

    if (!player.queue.isEmpty) {
        embed.setDescription(`The song contains an error. Skip to the next song...`);

        if (channel) await channel.send({ embeds: [embed] });
    } else {
        embed.setDescription(`The song contains an error and the queue is empty. Stopping the player...`);

        if (channel) await channel.send({ embeds: [embed] });
    }

    return player.skip();
};

