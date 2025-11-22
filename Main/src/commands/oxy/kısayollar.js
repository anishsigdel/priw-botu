const { SelectMenuBuilder, ActionRowBuilder, MessageEmbed } = require('discord.js');
const sex = require("../../../../conf.json");
const emojis = require("../../../../Database/src/Settings/emojis.json")

module.exports = {
  name: 'kısayollar',
  aliases: ["user-kısayol","user-panel2"],
  description: 'Kullanıcılar için kullanışlı kısayol menüsü oluşturur.',
  category: 'oxy',
  async execute(message, client) {
    
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için kısayol panelini kuramazsın.`, ephemeral: true })
    } else {
  
    const maymun = new SelectMenuBuilder()
      .setCustomId('amsıkenoxy')
      .setPlaceholder('Bilgi Seçin')
      .addOptions([
        {
          label: 'Hesap Oluşturulma Tarihi',
          value: 'yaaramınoglu1',
          description: 'Hesabınızın oluşturulma tarihini gösterir.',
          emoji: emojis.ucgen
        },
        {
          label: 'Sunucu Aktiflik',
          value: 'hırrımınucu',
          description: 'Sunucu hakkında istatistikler ve bilgiler.',
          emoji: emojis.ucgen
        },
        {
          label: 'Roller',
          value: 'roller',
          description: 'Sahip olduğunuz roller.',
          emoji: emojis.ucgen
        },
        {
          label: 'Mesaj Statları',
          value: 'mesajcik',
          description: 'Mesaj gönderme istatistiklerinizi gösterir.',
          emoji: emojis.ucgen
        },
        {
          label: 'Ses Statları',
          value: 'sesciks',
          description: 'Sesli kanal istatistiklerinizi gösterir.',
          emoji: emojis.ucgen
        },
      ]);
    
    const toplamkomut = message.client.commands.size;
    const row = new ActionRowBuilder().addComponents(maymun);
   
    await message.channel.send({
      content: `
     ${emojis.yaprak} Merhaba Sevgili **${message.guild.name}** üyeleri! Kısayollar menüsüne hoşgeldiniz!
     ${emojis.ok} Toplamda **${toplamkomut}** komut bulunmaktadır.
     ${emojis.ok} Aşağıdaki kısayol menüsünden sahip olmak istediğiniz bilgiye ulaşabilirsiniz.`,
      components: [row],
    });
  }},
};
