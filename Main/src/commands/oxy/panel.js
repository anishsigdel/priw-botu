const ayar = require("../../../../conf.json")
const system = require("../../../../Database/src/Settings/system.json")
const emojis = require("../../../../Database/src/Settings/emojis.json")
const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'panel',
  aliases: ["başvuru-panel","öneri-panel","şikayet-panel"],
  description: 'Başvuru & Öneri & Şikayet Paneli oluşturur.',
  category: 'oxy',
  async execute(message) {
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!system.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için başvuru panelini kuramazsın.`, ephemeral: true })
    } else {
    const maymun = new SelectMenuBuilder()
      .setCustomId('basvurusebebim') 
      .setPlaceholder('Bir sebep seçin.')
      .addOptions([
        {
          label: 'Yetkili Başvurusu',
          value: 'basvuru',
          description: 'Yetkili Başvurusu Yapmanızı Sağlar',
          emoji: emojis.basvuru
        },
        {
          label: 'Öneri Başvurusu',
          value: 'onerimvar',
          description: 'Öneri Başvurusu Yapmanızı Sağlar.',
          emoji: emojis.oneri
        },
        {
          label: 'Şikayet Başvurusu',
          value: 'sıkayetımvar',
          description: 'Şikayet Başvurusu Yapmanızı Sağlar.',
          emoji: emojis.sikayet
        }
      ]);

    const row = new ActionRowBuilder().addComponents(maymun);

   
    await message.channel.send({
      content: `
      ${emojis.developer} Merhaba Sevgili **${message.guild.name}** üyeleri! Başvuru menüsüne hoşgeldiniz!
      ${emojis.ok} Aşağıdaki menüden başvuru talebi nedenini seçerek başvuru talebi açabilirsiniz.
      ${emojis.ok} Not: \`Başvurularınızın Sonuçları Sizlere **Sadece DM** Üzerinden Bildirilir.\``,
      components: [row],
    });
  }},
};
