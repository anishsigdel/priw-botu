const sex = require("../../../../conf.json")
const emojis = require("../../../../Database/src/Settings/emojis.json")
const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'destek',
  aliases: ["support","ticket"],
  description: 'Destek paneli oluşturur.',
  category: 'oxy',
  async execute(message) {
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için destek panelini kuramazsın.`, ephemeral: true })
    } else {
    const menu = new SelectMenuBuilder()
      .setCustomId('ticketsebebimizke') 
      .setPlaceholder('Bir sebep seçin...')
      .addOptions([
        {
          label: 'Bot Bilgisi',
          value: 'botbilgi',
          description: 'Bot hakkında bilgi edinmek.',
          emoji: emojis.developer
        },
        {
          label: 'Destek',
          value: 'supports',
          description: 'Bir sorunla ilgili destek almak.',
          emoji: emojis.destek
        },
        {
          label: 'Satın Alma İşlemleri',
          value: 'satinalma',
          description: 'Satın alma ile ilgili bir sorun.',
          emoji: emojis.para
        },
        {
          label: 'Başka Bir Sebep',
          value: 'diger',
          description: 'Diğer bir konuda yardım almak.',
          emoji: emojis.sebep
        },
      ]);

    const row = new ActionRowBuilder().addComponents(menu);

   
    await message.channel.send({
      content: `
      ${emojis.partner} Merhaba Sevgili **${message.guild.name}** üyeleri! Destek menüsüne hoşgeldiniz!
      ${emojis.ok} Aşağıdaki menüden destek talebi nedenini seçerek destek talebi açabilirsiniz.`,
      components: [row],
    });
  }},
};
