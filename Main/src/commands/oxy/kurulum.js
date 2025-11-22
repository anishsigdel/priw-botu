const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js');
const sex = require("../../../../conf.json");

module.exports = {
  name: 'kurulum',
  aliases: ["swkurulum","log-emoji"],
  description: 'Rol & Emoji & Log kurulumu yaparsınız.',
  category: 'oxy',
  async execute(message) {
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece sunucuda kullanabilirsin!`, ephemeral: true });
    }

    if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `Bot geliştiricisi olmadığın için kurulum panelini kullanamazsın.`, ephemeral: true });
    }

    const kurulummenu = new SelectMenuBuilder()
      .setCustomId('kurulumsebebim') 
      .setPlaceholder('Bir kurulum seçin...')
      .addOptions([
        {
          label: 'Kanal Kurulumu Yap!',
          value: 'kanal-setup',
          description: 'Gerekli log kanallarını kurar.',
        },
        {
          label: 'Rol Kurulumu Yap!',
          value: 'rol-setup',
          description: 'Gerekli rolleri kurar.',
        },
        {
          label: 'Emoji Kurulumu Yap!',
          value: 'emoji-setup',
          description: 'Gerekli emojileri kurar.',
        }
      ]);
    
    const row = new ActionRowBuilder().addComponents(kurulummenu);

    const embed = new EmbedBuilder()
      .setDescription(`Merhaba Sevgili ${message.author}. Aşağıdaki menü aracılığıyla istediğin kurulumu gerçekleştirebilirsin.\n\n- **Emoji Kurulumu Yap**: Bot kurulumu için gerekli emojileri kurar.\n- **Kanal Kurulumu Yap**: Bot kurulumu için gerekli log kanallarını kurar.\n- **Rol Kurulumu Yap**: Bot kurulumu için gerekli rolleri kurar.\n\n**__60 saniye içinde kurulum yapmalısınız.__**
      `)
      .setFooter({ text: sex.Text });

    message.channel.send({ embeds: [embed], components: [row] });
  }
};
