const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require("discord.js");
const ayar = require("../../../Database/src/Settings/settings.json");
const emojis = require("../../../Database/src/Settings/emojis.json");


module.exports = async (member) => {
    const hoşgeldinkanal = await member.guild.channels.cache.find(channel => channel.name === 'join-leave-log');

    if (!hoşgeldinkanal || hoşgeldinkanal.type !== ChannelType.GuildText) {
        console.error("Çıkış kanalı bulunamadı veya geçerli bir metin kanalı değil.");
        return;
    }


    const butoncuk = new ButtonBuilder()
    .setStyle(ButtonStyle.Secondary)
    .setCustomId("gulegule")
    .setDisabled(true)
    .setEmoji(emojis.pikachu)
    .setLabel(`Güle güle ${member.user.tag}`)

    const çıkışrow = new ActionRowBuilder().addComponents(butoncuk);


    const cıkısembedcım = new EmbedBuilder()
    .setDescription(`
        ${member} sunucudan ayrıldı.

        Sensiz **${member.guild.memberCount}** kişiyiz. 
        
        Sunucudan ayrıldığın için üzgünüz, umarız tekrar görüşürüz! ${emojis.giveaway}`);

 
    hoşgeldinkanal.send({
        embeds: [cıkısembedcım],
        components: [çıkışrow],
    });
};

module.exports.conf = {
    name: "guildMemberRemove",
};
