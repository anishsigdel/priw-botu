const sex = require("../../../../conf.json")
const emojis = require("../../../../Database/src/Settings/emojis.json")
const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'bildirim-rol',
  aliases: ["notifications"],
  description: 'Bildirim rolleri seçim paneli oluşturur.',
  category: 'Rol Seçim',
  async execute(message) {
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için rol alma panelini kuramazsın.`, ephemeral: true })
    } else {
    const maymun = new SelectMenuBuilder()
      .setCustomId('rol_secme') 
      .setPlaceholder('Bir rol seçin.')
      .addOptions([
        {
          label: 'Github Bildirimleri',
          value: 'github',
          description: 'Github Bildirimleri Rolünü Almanızı Sağlar.',
          emoji: emojis.github
        },
        {
          label: 'Duyuru Bildirimleri',
          value: 'duyuru',
          description: 'Duyuru Bildirimleri Rolünü Almanızı Sağlar.',
          emoji: emojis.duyuru
        },
        {
          label: 'Çekiliş Bildirimleri',
          value: 'cekilis',
          description: 'Çekiliş Bildirimleri Rolünü Almanızı Sağlar.',
          emoji: emojis.cekilis
        }
      ]);

    const row = new ActionRowBuilder().addComponents(maymun);

   
    await message.channel.send({
      content: `
      ${emojis.ayarlar} Merhaba Sevgili **${message.guild.name}** üyeleri! Bildirim Rol Seçim menüsüne hoşgeldiniz!
      ${emojis.ok} Aşağıdaki menüden istediğiniz bildirim rolünü seçerek role sahip olabilirsiniz.`,
      components: [row],
    });
  }},
};
