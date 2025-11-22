const { EmbedBuilder } = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'tekme',
  aliases: ["tekmele", "tekme-at"],
  description: 'Belirttiğiniz kullanıcıya tekme atın! <oxy/id>',
  category: 'Fun',
  async execute(message) {
    const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member) {
      return message.reply({ content: "Bir kullanıcı etiketlemelisiniz!" });
    }

    if (member.id === message.author.id) {
      return message.reply({ content: "Kendine tekme atamazsın!" });
    }

    if (member.id === message.client.user.id) {
      await message.react(carpi);
      return message.reply({ content: "Bota tekme atamazsın!" });
    }

    if (member.user.bot) {
      return message.reply({ content: "Botlara tekme atamazsın!" });
    }

    const gif = [
      "https://media.discordapp.net/attachments/917295589371301899/927960903742275604/AgileFlatGourami-size_restricted.gif?ex=665d45b0&is=665bf430&hm=9c4febc4a531063527f5af1d36fc8e3061fee7a62cb9cbec2640af3c81d08886&",
      "https://media.discordapp.net/attachments/917295589371301899/927960903331250186/ucan-tekme.gif?ex=665d45b0&is=665bf430&hm=9e404c209f51731a0a9b200529ac1fe82abe241a1394a341082d79b42dd04430&",
      "https://media.discordapp.net/attachments/917295589371301899/927960904102998126/giphy.gif?ex=665d45b0&is=665bf430&hm=cf98e0fe2f781bc9ced417ae57a0893ff529529ecd157e435d9088b4e9366d0e&"
    ];
    
    // Rastgele bir GIF seç
    let resimler = gif[Math.floor(Math.random() * gif.length)];
    
    // Embed oluştur
    const embed = new EmbedBuilder()
      .setColor('#FF5757')
      .setDescription(`${member}, ${message.author} Sana Tekme Attı!`)
      .setImage(resimler)
      .setTimestamp();
    
    await message.react(onay);
    return message.reply({ embeds: [embed] });
  }
};