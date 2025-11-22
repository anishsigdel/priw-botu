const { EmbedBuilder } = require("discord.js");
const moment = require("moment");
const snipe = require("../../../Database/src/Models/snipe");  
moment.locale("tr");

module.exports = {
  name: 'messageDelete',
  once: false,
  async execute(message) {
    if (message.author.bot || !message.guild || !message.content) return;

 
    await snipe.findOneAndUpdate(
      { guildID: message.guild.id, channelID: message.channel.id, messageContent: message.content },
      { 
        $set: {
          userID: message.author.id,
          messageContent: message.content,
          image: message.attachments.size > 0 ? message.attachments.first().proxyURL : null,
          createdDate: message.createdTimestamp,
          deletedDate: Date.now(),
        }
      },
      { upsert: true } 
    );


    const channel = message.guild.channels.cache.find(ch => ch.name === "message-log");
    if (!channel) return;


    const embed = new EmbedBuilder()
      .setAuthor({
        name: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      })
      .setDescription(`
        **Bir mesaj silindi!**

        \`•\` Mesaj Sahibi: ${message.author} - (\`${message.author.id}\`)
        \`•\` Mesaj Kanalı: ${message.channel} - (\`${message.channel.id}\`)
        \`•\` Silinen Mesaj İçeriği: \`\`\`${message.content.length > 1000 ? "1000 Karakterden uzun.." : message.content}\`\`\`
      `)
      .setFooter({ text: `ID: ${message.author.id} • ${moment(Date.now()).format("LLL")}` })
      .setColor("#ff0000");


    if (message.attachments.size > 0) {
      embed.setImage(message.attachments.first().proxyURL);
    }

    channel.send({ embeds: [embed] });
  }
};
