const { EmbedBuilder } = require("discord.js");
const afk = require("../../../Database/src/Models/afk");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");
const { isLicenseValid } = require("../../../license-checker");

module.exports = {
  name: 'messageCreate',
  once: false, 
  async execute(message) {
    // License kontrolü - eğer süre dolmuşsa hiçbir mesaja cevap verme
    if (!isLicenseValid()) {
        return; // Hiçbir şey yapma, sessizce çık
    }

    if (message.author.bot || !message.guild) return;

 
    const data = await afk.findOne({ guildID: message.guild.id, userID: message.author.id });
    const embed = new EmbedBuilder().setAuthor({
      name: message.member.displayName,
      iconURL: message.author.displayAvatarURL({ dynamic: true })
    });

    if (data) {
  
      const afkData = await afk.findOne({ guildID: message.guild.id, userID: message.author.id });
      await afk.deleteOne({ guildID: message.guild.id, userID: message.author.id });


      if (message.member.displayName.includes("[AFK]") && message.member.manageable) {
        await message.member.setNickname(message.member.displayName.replace("[AFK]", ""));
      }

      message.reply({
        content: `Afk modundan çıktınız. **${moment.duration(Date.now() - afkData.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** süredir AFK'ydınız.`
      }).then((e) => setTimeout(() => { e.delete(); }, 5000));
    }

    const member = message.mentions.members.first();
    if (!member) return;

    const afkDataMember = await afk.findOne({ guildID: message.guild.id, userID: member.user.id });
    if (!afkDataMember) return;

    embed.setDescription(`${member.toString()} kullanıcısı, \`${afkDataMember.reason}\` sebebiyle, **${moment.duration(Date.now() - afkDataMember.date).format("d [gün] H [saat], m [dakika] s [saniye]")}** önce AFK oldu!`);
    
    message.channel.send({ embeds: [embed] }).then((e) => setTimeout(() => { e.delete(); }, 10000)); 
  }
};
