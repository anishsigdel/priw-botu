const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');
const sex = require("../../../../conf.json");
const emojis = require("../../../../Database/src/Settings/emojis.json");
const database = require("../../../../Database/src/Settings/settings.json");

module.exports = {
  name: 'streamer-panel',
  aliases: ["stream-panel","st-panel","st-rol"],
  description: 'Butona tıklayan kullanıcıya "Streamer" rolünü verir.',
  category: 'oxy',
  async execute(message, args) {

    if (!message.guild) {
      return message.reply({ content: "Bu komutu sadece bir sunucuda kullanabilirsin!", ephemeral: true });
    }


    if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot geliştiricisi olmadığın için bu komutu kullanamazsın.`, ephemeral: true });
    }

    const streamerRole = message.guild.roles.cache.get(database.streamerRole);
    if (!streamerRole) {
      return message.reply({ content: 'Sunucuda "Streamer" rolü bulunamadı!', ephemeral: true });
    }


    const streamerButton = new ButtonBuilder()
      .setCustomId('streamer_role')
      .setLabel('Streamer Ol')
      .setStyle(ButtonStyle.Secondary) 
      .setEmoji(emojis.giveaway); 

   
    const row = new ActionRowBuilder().addComponents(streamerButton);


    await message.channel.send({
      content: `
      ${emojis.duyuru} Merhaba sevgili **${message.guild.name}** üyeleri! 
      Sunucumuzda yayın açmak isteyenler için aşağıdaki **"Streamer Ol"** butonuna tıklamanız yeterli!`,
      components: [row],
    });
  },
};
