const moment = require("moment");
moment.locale("tr");
const { EmbedBuilder } = require("discord.js");
const snipe = require("../../../Database/src/Models/snipe");
const client = global.bot;

module.exports = async (message) => {
  if (!message.guild || !message.content) return;


  await snipe.findOneAndUpdate({ guildID: message.guild.id, channelID: message.channel.id }, {
    $set: {
      messageContent: message.content,
      userID: message.author.id,
      image: message.attachments.first() ? message.attachments.first().proxyURL : null,
      createdDate: message.createdTimestamp,
      deletedDate: Date.now()
    }
  }, { upsert: true });


  const channel = client.channels.cache.find(x => x.name == "message-log");
  if (!channel) return;


  let messageContent = message.content;

  
  if (!messageContent || messageContent.trim() === '') {
    if (message.attachments.size > 0) {
      messageContent = "[Görsel içerik]";
    } else if (message.embeds.length > 0) {
      messageContent = "[Embed içerik]";
    } else {
      messageContent = "[Boş mesaj]";
    }
  }


  const displayMessage = messageContent.length > 1000 ? "1000 Karakterden uzun.." : messageContent;

  const embed = new EmbedBuilder()
    .setDescription(`
    ${message.channel} kanalında bir mesaj sildi!
                        
    \`•\` Mesaj Kanalı: ${message.channel} - (\`${message.channel.id}\`)
    \`•\` Mesaj Sahibi: ${message.author} - (\`${message.author.id}\`)
    \`•\` Mesaj İçeriği: \`\`\`${displayMessage}\`\`\`
    `)
    .setFooter({ text: `ID: ${message.author.id} • ${moment(Date.now()).format("LLL")}` });


  if (!message.attachments.first()) {
    channel.send({ embeds: [embed] });
  }


  if (message.attachments.first()) {
    const embedx = new EmbedBuilder()
      .setDescription(`
      ${message.channel} kanalında bir içerik sildi!
      \`•\` Mesaj Kanalı: ${message.channel} - (\`${message.channel.id}\`)
      \`•\` Mesaj Sahibi: ${message.author} - (\`${message.author.id}\`)
      `)
      .setFooter({ text: `ID: ${message.author.id} • ${moment(Date.now()).format("LLL")}` });

    channel.send({ embeds: [embedx.setImage(message.attachments.first().proxyURL)] });
  }
};

module.exports.conf = {
  name: "messageDelete",
};
