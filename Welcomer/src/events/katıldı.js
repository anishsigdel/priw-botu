const { EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const ayar = require("../../../Database/src/Settings/settings.json");
const emojis = require("../../../Database/src/Settings/emojis.json");
const registerModum = require("../../../Database/src/Models/registerMode");

module.exports = async (member) => {
    const registerModeData = await registerModum.findOne({ guildId: member.guild.id });

    const registerMode = registerModeData ? registerModeData.registerMode : 'kapalı';

  
    const welcomeKanalı = ayar.registerChannel;
    const joinLeaveLogKanalı = await member.guild.channels.cache.find(channel => channel.name === 'join-leave-log');
    const welcomeKanal = await member.guild.channels.fetch(welcomeKanalı);

    if (!joinLeaveLogKanalı || joinLeaveLogKanalı.type !== ChannelType.GuildText) {
        console.error("Join-Leave log kanalı geçerli bir metin kanalı değil.");
        return;
    }

    if (!welcomeKanal || welcomeKanal.type !== ChannelType.GuildText) {
        console.error("Hoşgeldin kanalı geçerli bir metin kanalı değil.");
        return;
    }

    if (ayar.otoRole) {
        try {
            await member.roles.add(ayar.otoRole);
            console.log(`Yeni üye ${member.user.tag} için otomatik rol eklendi.`);
        } catch (error) {
            console.error("Rol eklenirken hata oluştu:", error);
        }
    }

    const butoncuk = new ButtonBuilder()
        .setStyle(ButtonStyle.Secondary)
        .setCustomId("vayaq")
        .setDisabled(true)
        .setEmoji(emojis.pikachu)
        .setLabel(`Hoşgeldin ${member.user.tag}`);

    const welcomerow = new ActionRowBuilder().addComponents(butoncuk);

    const normalWelcomeEmbed = new EmbedBuilder()
        .setDescription(`Hoşgeldin ${member}, Seninle beraber **${member.guild.memberCount}** kişi olduk. ${emojis.giveaway}\n\nHesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) tarihinde oluşturulmuş ${emojis.giveaway}\n\nSunucu kurallarını <#${ayar.kurallar}> kanalından okuyabilirsin, İyi eğlenceler. ${emojis.giveaway}`);


    if (registerMode === "açık") {
        joinLeaveLogKanalı.send({ embeds: [normalWelcomeEmbed]})
        welcomeKanal.send({
            content: `
${member}, **${member.guild.name}** adlı sunucumuza hoşgeldin. ${emojis.giveaway}
Sunucumuz seninle birlikte toplamda **${member.guild.memberCount}** kişi oldu ve giderek daha da artacak! ${emojis.oxycik}

${emojis.ayarlar} Hesabın <t:${Math.floor(member.user.createdTimestamp / 1000)}> (<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>) tarihinde oluşturulmuş!
Sunucumuza kayıt olmak için <#${ayar.registerChannel}> kanalında \`İsim & Yaş\` belirtmen yeterlidir!
Seninle <@&${ayar.registerStaff}> rolündeki yetkililer ilgilenecektir! ${emojis.basvuru}

Bize destek olmak istersen sunucumuza \`Boost\` basabilir veya Tagımızı \`${ayar.tag}\` alabilirsin!
<#${ayar.kurallar}> kanalından sunucu kurallarımızı okumayı unutma! İyi eğlenceler. **_${member.guild.name} Yönetimi_**`,
components: [welcomerow],
        });
    } else {
        joinLeaveLogKanalı.send({
            embeds: [normalWelcomeEmbed],
        });
    }
};

module.exports.conf = {
    name: "guildMemberAdd",
};
