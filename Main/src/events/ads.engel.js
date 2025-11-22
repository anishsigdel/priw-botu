const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const reklamEngel = require('../../../Database/src/Models/reklamKoruma'); 
const emojis = require("../../../Database/src/Settings/emojis.json");
const { isLicenseValid } = require("../../../license-checker");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    // License kontrolü - eğer süre dolmuşsa hiçbir mesaja cevap verme
    if (!isLicenseValid()) {
        return; // Hiçbir şey yapma, sessizce çık
    }

    if (message.author.bot) return;

    const guildId = message.guild.id;
    let filter = await reklamEngel.findOne({ guildID: guildId });

    if (filter && filter.isActive) {
      if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return;
      }

      const reklamMap = [
        "darkvista", "dp", "monarch", "1932", "1972", ".gg/", ".gg", "discord.gg/", 
        "discord.com/", "discord.gg/", "https://", ".com", ".tr", ".gov"
      ];
    
      const mesaj = message.content.toLowerCase();
      let containsReklam = false;

      // Check if message contains any filtered words
      for (const reklam of reklamMap) {
        if (mesaj.includes(reklam)) {
          containsReklam = true;
          break; // Exit the loop as soon as one match is found
        }
      }

      // Only attempt to delete and send warning if a filtered word was found
      if (containsReklam) {
        try {
          await message.delete();
          
          // Send warning message only after successful deletion
          const replyMessage = await message.channel.send({
            content: `${emojis.pikachu} Merhaba ${message.author}, Bu sunucuda reklam engelleme aktif. Lütfen reklam yapmaktan kaçının! ${emojis.basvuru}`
          });
          
          // Auto-delete the warning message after 10 seconds
          setTimeout(() => {
            replyMessage.delete().catch(() => {}); 
          }, 10000);
        } catch (err) {
          console.error('Mesaj işlenirken hata:', err);
        }
      }
    }
  }
};