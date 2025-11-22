const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { exec } = require('child_process');
const ayar = require("../../../../conf.json")
const emojis = require("../../../../Database/src/Settings/emojis.json")
const sex = require("../../../../conf.json")

module.exports = {
  name: 'user-panel',
  aliases: ["button-panel","kullanıcı-panel"],
  description: 'Kullanıcı buton-paneli oluşturur.',
  category: 'oxy',
  async execute(message) {
    if (message.guild === null) {
        return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
      } else if (!sex.Devs.includes(message.author.id)) {
        return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için başvuru panelini kuramazsın.`, ephemeral: true })
      } else {
        await message.delete().catch(e => {})

    const row = new ActionRowBuilder()
    .addComponents( 
        new ButtonBuilder()
        .setCustomId("oxybooster")
        .setLabel("I")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("oxyhesap")
        .setLabel("II")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("oxyistatistik")
        .setLabel("III")
        .setStyle(ButtonStyle.Secondary)
    )

    const row2 = new ActionRowBuilder()
    .addComponents( 
        new ButtonBuilder()
        .setCustomId("oxyaktiflik")
        .setLabel("IV")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("oxyroller")
        .setLabel("V")
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("oxyhelp")
        .setLabel("VI")
        .setStyle(ButtonStyle.Secondary)
    );

    const row3 = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
        .setCustomId("oxyonerı")
        .setEmoji(emojis.oneri)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("oxyboskutu")
        .setEmoji(emojis.bosluk)
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setCustomId("oxysikayet")
        .setEmoji(emojis.sikayet)
        .setStyle(ButtonStyle.Secondary)
    );

    message.channel.send({content: `Merhaba sevgili **${message.guild.name}** Üyeleri! ${emojis.giveaway}\nKullanıcı paneline hoşgeldiniz, erişmek istediğiniz bilgilere tuşlara tıklayarak erişebilirsiniz!\n\n__**Tuş Tanıtımları:**__\n\n\`I:\` İsim Değiştirme (Booster Özel),\n\`II:\` Hesap Açılış Tarihiniz,\n\`III:\` Genel İstatistikleriniz,\n\`IV:\` Sunucu aktiflik listesi,\n\`V:\` Üzerinizde bulunan roller,\n\`VI:\` Bot Kullanım Rehberi\n${emojis.oneri} Öneri İletme\n${emojis.sikayet} Şikayet İletme\n`, components: [row,row2,row3]})
}
  }}