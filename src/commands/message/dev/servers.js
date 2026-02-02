const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'serverstats',
    aliases: ['stats', 'serverinfo'],
    description: 'Показать статистику текущего сервера',
    category: 'info',
    permissions: {
        bot: ['VIEW_AUDIT_LOG', 'SEND_MESSAGES', 'EMBED_LINKS'],
        user: [],
    },
    settings: {
        voice: false,
        player: false,
        current: false,
    },
    devOnly: false,
    run: async (client, message) => {
        const msg = await message.reply('🔄 Получаю статистику сервера...');

        try {
            const guild = message.guild;

            // Получаем дату присоединения бота
            const botJoinDate = guild.members.me.joinedAt.toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
            });

            // Получаем регион сервера
            const region = 'Автоматический (Discord больше не указывает конкретный регион)';

            // Получаем информацию о том, кто пригласил бота
            let inviter = 'Не удалось определить';
            try {
                const auditLogs = await guild.fetchAuditLogs({ type: 28 }); // 28 = Bot Add
                const botAddLog = auditLogs.entries.find(
                    (entry) => entry.target.id === client.user.id
                );
                if (botAddLog) {
                    inviter = botAddLog.executor.tag;
                }
            } catch (error) {
                console.error('Ошибка при получении audit logs:', error);
            }

            // Дополнительные статистики
            const memberCount = guild.memberCount;
            const voiceChannels = guild.channels.cache.filter(
                (channel) => channel.type === 'GUILD_VOICE'
            ).size;
            const activeVoiceMembers = guild.channels.cache
                .filter((channel) => channel.type === 'GUILD_VOICE')
                .reduce((count, channel) => count + (channel.members.size || 0), 0);

            // Создаем embed для вывода
            const embed = new EmbedBuilder()
                .setColor(client.config.embedColor || '#00FF00')
                .setTitle(`📊 Статистика сервера: ${guild.name}`)
                .setThumbnail(guild.iconURL())
                .addFields(
                    { name: 'Дата присоединения бота', value: botJoinDate, inline: true },
                    { name: 'Регион сервера', value: region, inline: true },
                    { name: 'Кто пригласил бота', value: inviter, inline: true },
                    { name: 'Количество участников', value: `${memberCount}`, inline: true },
                    { name: 'Голосовые каналы', value: `${voiceChannels}`, inline: true },
                    { name: 'Участники в голосовых', value: `${activeVoiceMembers}`, inline: true }
                )
                .setTimestamp()
                .setFooter({ text: `Запрошено: ${message.author.tag}` });

            // Редактируем начальное сообщение
            await msg.edit({ content: null, embeds: [embed] });
        } catch (error) {
            console.error(error);
            await msg.edit('❌ Произошла ошибка при получении статистики сервера.');
        }
    },
};