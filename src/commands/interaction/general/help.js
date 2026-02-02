const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { readdirSync } = require("fs");

module.exports = {
    name: "help",
    description: "Get a list of commands",
    category: "general",
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
    run: async (client, interaction, player) => {
        const embed = new EmbedBuilder().setColor(client.config.embedColor);
        const categories = readdirSync("./src/commands/interaction/");

        const categoryPromises = categories.map(async (category) => {
            const commands = client.slash.filter((c) => c.category === category);

            const slashCommandData = await Promise.all(
                commands.map(async (c) => {
                    return `\`${c.name}\``;
                }),
            );

            const categoryNames = { 
                general: "Global", 
                music: "Music", 
                setting: "Settings" 
            };
            const categoryName = categoryNames[category] || category; // Используем `category`, если нет в `categoryNames`
            
            return embed.addFields({ 
                name: `\`❯\`  ${toOppositeCase(categoryName)}`, 
                value: `${slashCommandData.join(", ")}` 
            });
        });

        await Promise.all(categoryPromises);

        embed
            .setAuthor({ 
                name: `Help with commands ${client.user.username}`, 
                iconURL: client.user.displayAvatarURL() 
            })
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(
                `Hi, **${interaction.member}**, I'm **${client.user}**. I am a multifunctional Discord bot. I can play music on Spotify, SoundCloud, Apple Music and other services. Find out what I can do with the commands below:`,
            )
            .setFooter({
                text: `© ${client.user.username} | Total commands: ${client.slash.size}`,
                iconURL: client.user.displayAvatarURL({ dynamic: true }),
            })
            .setTimestamp();

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("Support server")
                .setURL(client.config.supportServerUrl)
                .setStyle(ButtonStyle.Link),
        );

        return interaction.reply({ embeds: [embed], components: [row] });
    },
};

function toOppositeCase(str) {
    if (!str) return "null"; // Защита от `null` и `undefined`
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}