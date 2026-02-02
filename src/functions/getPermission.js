const { PermissionsBitField } = require("discord.js");

module.exports = {
    permissions: async (client, response, command, embed, player, args) => {
        if (command.permissions.bot) {
            if (!response.guild.members.me.permissions.has(command.permissions.bot || [])) {
                embed.setDescription(`The bot lacks the \`${command.permissions.bot.join(", ")}\` permissions to execute this command.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }
        }

        if (command.permissions.user) {
            if (!response.member.permissions.has(command.permissions.user || [])) {
                embed.setDescription(`You lack the \`${command.permissions.user.join(", ")}\` permissions to execute this command.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }
        }

        if (command.settings.voice) {
            if (!response.member.voice.channel) {
                embed.setDescription(`You need to join a voice channel first.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }

            if (
                !response.guild.members.me.permissions.has(PermissionsBitField.Flags.Connect) ||
                !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.Connect)
            ) {
                embed.setDescription(`The bot lacks the \`Connect\` permission in your voice channel.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }

            if (
                !response.guild.members.me.permissions.has(PermissionsBitField.Flags.Speak) ||
                !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.Speak)
            ) {
                embed.setDescription(`The bot lacks the \`Speak\` permission in your voice channel.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }

            if (response.member.voice.channel.type === 13) {
                if (
                    !response.guild.members.me.permissions.has(PermissionsBitField.Flags.RequestToSpeak) ||
                    !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.RequestToSpeak)
                ) {
                    embed.setDescription(`The bot lacks the \`Request to Speak\` permission in your stage channel.`);

                    return response.reply({ embeds: [embed], ephemeral: true });
                }

                if (
                    !response.guild.members.me.permissions.has(PermissionsBitField.Flags.PrioritySpeaker) ||
                    !response.guild.members.me.permissionsIn(response.member.voice.channelId).has(PermissionsBitField.Flags.PrioritySpeaker)
                ) {
                    embed.setDescription(`The bot lacks the \`Priority Speaker\` permission in your stage channel.`);

                    return response.reply({ embeds: [embed], ephemeral: true });
                }
            }
        }

        if (command.settings.player) {
            if (!player) {
                embed.setDescription(`There is no player on this server.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }

            if (player.voiceId !== response.member.voice.channelId) {
                embed.setDescription(`You need to be in the same voice channel as the bot.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }
        }

        if (command.settings.current) {
            if (!player.queue.current) {
                embed.setDescription(`Nothing is currently playing on this server.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }
        }

        if (command.devOnly) {
            if (!client.config.dev.includes(response.member.id) && client.config.owner !== response.member.id) {
                embed.setDescription(`This command is only available to developers.`);

                return response.reply({ embeds: [embed], ephemeral: true });
            }
        }

        try {
            command.run(client, response, player, args);
        } catch (error) {
            console.error(error);
        }
    },
};