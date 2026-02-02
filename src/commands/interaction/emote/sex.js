const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { gif_list } = require("./data.js");

module.exports = {
    name: "sex",
    description: 'sex',
    category: "emote",
    options: [
        {
            name: "member",
            description: 'member',
            type: 6, // USER
            required: true,
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
        console.log(`[DEBUG] Processing /sex by ${user.tag} (${user.id})`);

        const embed = new EmbedBuilder().setColor(0x420082);

        if (user.id === "1189047934495510622") {
            embed.setTitle("Error").setDescription(`${user}, you are not allowed to fuck anyone, asshole!`);
            embed.setImage("https://cdn.discordapp.com/attachments/1130874573617893469/1331342863455223971/uwyUfRpeSq8.gif?ex=67914529&is=678ff3a9&hm=c7cedaf85c0ee3f53d934c02c2e3f8b26610187e7b42a0559b7600d2f960bf5b&");
            return interaction.editReply({ embeds: [embed] });
        }

        if (member.id === "1189047934495510622") {
            embed.setTitle("Ошибка").setDescription(`${member}, can't fuck him, he's dangerous!`);
            embed.setImage("https://cdn.discordapp.com/attachments/1130874573617893469/1331342863455223971/uwyUfRpeSq8.gif?ex=67914529&is=678ff3a9&hm=c7cedaf85c0ee3f53d934c02c2e3f8b26610187e7b42a0559b7600d2f960bf5b&");
            return interaction.editReply({ embeds: [embed] });
        }

        if (user.id === member.id) {
            embed.setTitle("Ошибка").setDescription(`${user}, you can't fuck yourself!`);
            embed.setImage("https://cdn.discordapp.com/attachments/1130874573617893469/1145005872800596089/sex-now-heavy.gif");
            return interaction.editReply({ embeds: [embed] });
        }

        let description;
        if (user.id === "849235064326979624") {
            description = `ASSHOLE ${user} wants to fuck ${member}, HELP!!!!!`;
            embed.setTitle("SEX");
        } else if (user.id === "807707453046652959") {
            description = `Oh yeah, ${user} wants to fuck ${member} hard, he's in luck.`;
            embed.setTitle("Пекарня на охоте");
        } else if (user.id === "604936055346429953") {
            description = `Oh no, straight guy ${user} wants to fuck ${member} hard, what should I do?`;
            embed.setTitle("SEX");
        } else {
            description = `${member}, do you want to fuck with ${user}?`;
            embed.setTitle("SEX");
        }

        embed.setDescription(description);
        embed.setImage("https://cdn.discordapp.com/attachments/1130874573617893469/1145005872800596089/sex-now-heavy.gif");

        const yesButton = new ButtonBuilder().setCustomId("yes").setLabel("✅").setStyle(ButtonStyle.Success);
        const noButton = new ButtonBuilder().setCustomId("no").setLabel("🚫").setStyle(ButtonStyle.Danger);
        const row = new ActionRowBuilder().addComponents(yesButton, noButton);

        const message = await interaction.editReply({ embeds: [embed], components: [row], content: `${member}` });

        const collector = message.createMessageComponentCollector({ time: 60000 });

        collector.on("collect", async (i) => {
            if (i.user.id !== member.id) {
                return i.reply({ content: "This is not your button, asshole!", ephemeral: true });
            }

            if (i.customId === "yes") {
                let successDescription;
                if (user.id === "849235064326979624") {
                    successDescription = `ASSHOLE ${user} mercilessly fucked ${member}. Looks like ${member} became a asshole`;
                    embed.setTitle("Sex");
                } else if (user.id === "807707453046652959") {
                    successDescription = `${user} и ${member} смачно испекли хлеб, как же это было классно!`;
                    embed.setTitle("Bakery");
                } else {
                    successDescription = `${user} и ${member} поебались!`;
                    embed.setTitle("SEX");
                }
                embed.setDescription(successDescription);
                embed.setImage(gif_list[Math.floor(Math.random() * gif_list.length)]);
                await i.update({ embeds: [embed], components: [] });
            } else if (i.customId === "no") {
                let failDescription;
                if (user.id === "849235064326979624") {
                    failDescription = `${user}, you're a furry. You can't have sex with ${member}.`;
                    embed.setTitle("=)");
                } else if (user.id === "807707453046652959") {
                    failDescription = `${member}, you missed out on a great time with ${user}.`;
                    embed.setTitle("=(");
                } else {
                    failDescription = `${user} and ${member} didn't have sex.`;
                    embed.setTitle("=(");
                }
                embed.setDescription(failDescription);
                embed.setImage("https://cdn.discordapp.com/attachments/1130874573617893469/1145005872800596089/sex-now-heavy.gif");
                await i.update({ embeds: [embed], components: [] });
            }
        });

        collector.on("end", () => {
            console.log(`[DEBUG] Collector for /sex ended for ${user.id}`);
        });
    },
};