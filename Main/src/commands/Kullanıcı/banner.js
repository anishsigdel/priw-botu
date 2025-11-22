const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const axios = require('axios');
const { onay } = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'banner',
  aliases: ["bannercik","bannerim"],
  description: 'Sizin veya etiketlediğiniz kullanıcın bannerını gösterir! <oxy/id>',
  category: 'Kullanıcı',
  async execute(message) {
    const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/);

    let member = message.author; 
    if (args.length > 0) {
z
      const mentionedUser = message.mentions.users.first();
      if (mentionedUser) {
        member = mentionedUser; 
      } else {
       
        try {
          member = await message.client.users.fetch(args[0]);
        } catch (err) {
          return message.reply({ content: "Geçerli bir kullanıcı ID'si girmeniz gerekiyor!" });
        }
      }
    }


    let banner = await oxyBannerCreate(member.id, message.client);

    if (!banner) {
      return message.reply({ content: `Kullanıcının banneri bulunmuyor.` });
    }


    let Link = new ActionRowBuilder({
      components: [
        new ButtonBuilder({
          label: "Tarayıcıda Aç",
          style: ButtonStyle.Link,
          url: `${banner}`,
        })
      ]
    });

    message.channel.send({
      content: `${banner}`, 
      components: [Link],
    });
  }
};


async function oxyBannerCreate(user, client) {
  try {
    const response = await axios.get(`https://discord.com/api/v9/users/${user}`, { 
      headers: { 'Authorization': `Bot ${client.token}` } 
    });

    if (!response.data.banner) return null;  

    if (response.data.banner.startsWith('a_')) {

      return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.gif?size=512`;
    } else {
    
      return `https://cdn.discordapp.com/banners/${response.data.id}/${response.data.banner}.png?size=512`;
    }
  } catch (error) {
    console.error('Banner çekme hatası:', error);
    return null;
  }
}
