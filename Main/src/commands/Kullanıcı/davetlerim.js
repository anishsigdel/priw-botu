const Discord = require("discord.js");
const db = require('croxydb');
const emojıdb = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'davetlerim',
  aliases: ["invites", "inv", "invite", "davetler"],
  description: 'Sizin veya etiketlediğiniz kullanıcın davetlerini gösterir! <oxy/id>',
  category: 'Kullanıcı',
  async execute(message, args) { 
    var member = args[0] ? (message?.mentions?.members.first() || message.guild.members.cache.find((m) => m.member.membername.toLocaleLowerCase() == args[0].toLocaleLowerCase()) || message.guild.members.cache.get(args[0])) : message.member;
    
    if (!member && args[0]) {
      await message.react(emojıdb.carpi);
      return message.reply({content: `Yanlış ID/kullanıcı adı veya sunucuda olmayan birisini belirttiniz. Lütfen bilgileri kontrol edip tekrar deneyiniz.`});
    };
    
    await member.fetch();
    
    if (member.user.bot) {
      await message.react(emojıdb.carpi);
      return message.reply({content: `Bu komutu botlar üstünde kullanmanın sebebini tam olarak anlamış değilim. :smiley:`});
    }

    const regularCount = db.fetch(`regular_${member.id}`) || null; 
    const fakeinviteCount = db.fetch(`fakeinvite_${member.id}`) || null;
    const leaveCount = db.fetch(`leave_invites_${member.id}`) || null;  
    const bonusCount = db.fetch(`bonus_${member.id}`) || null;  

    let description = `\`\`\`${member.username} adlı kullanıcının davet bilgileri:\`\`\`\n\n`;

    description += `**Gerçek Davetler (Regular):** ${regularCount !== null ? `${regularCount} davet` : 'Veri bulunamadı'}\n`;


    description += `**Sahte Davetler (Fake):** ${fakeinviteCount !== null ? `${fakeinviteCount} davet` : 'Veri bulunamadı'}\n`;

    description += `**Ayrılan Davetler (Leave):** ${leaveCount !== null ? `${leaveCount} davet` : 'Veri bulunamadı'}\n`;


    description += `**Bonus Davetler (Bonus):** ${bonusCount !== null ? `${bonusCount} davet` : 'Veri bulunamadı'}\n`;

    const totalInvites = (regularCount || 0) + (fakeinviteCount || 0) + (bonusCount || 0);
    description += `\n**Toplam Davetler:** ${totalInvites} davet`;


    const embed = new Discord.EmbedBuilder()
      .setTitle("İnvite Sistemi")
      .setDescription(description)
      .setFooter({text: "oxy İnvite Systems."});


    message.reply({embeds: [embed]});
  }
};
