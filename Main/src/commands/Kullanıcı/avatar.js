const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { onay } = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'avatar',
  aliases: ["av","avatarim"],
  description: 'Sizin veya etiketlediğiniz kullanıcın avatarını gösterir! <oxy/id>',
  category: 'Kullanıcı',
  async execute(message) {
   
    const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/);


    let member;
    if (args.length > 0) {
    
      if (args[0].match(/^\d+$/)) {
     
        try {
          member = await message.client.users.fetch(args[0]);
        } catch (err) {
          return message.reply("Geçersiz kullanıcı ID'si.");
        }
      } else {

        member = message.mentions.users.first();
      }
    }


    member = member || message.author;

    let Link = new ActionRowBuilder({
      components: [
        new ButtonBuilder({
          label: "Tarayıcıda Aç",
          style: ButtonStyle.Link,
          url: member.displayAvatarURL({ dynamic: true })
        })
      ]
    });


    message.react(onay);
    message.channel.send({
      content: member.displayAvatarURL({ dynamic: true }),
      components: [Link]
    });
  }
};
