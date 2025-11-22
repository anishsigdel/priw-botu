const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const spamEngel = require('../../../Database/src/Models/spamKoruma'); 
const emojis = require("../../../Database/src/Settings/emojis.json");

const usersMap = new Map();
const LIMIT = 5; 
const TIME = 5000;
const DIFF = 1000;

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
    let filter = await spamEngel.findOne({ guildID: guildId });

    if (filter && filter.isActive) {

      if (usersMap.has(message.author.id)) {
        const userData = usersMap.get(message.author.id);
        const { lastMessage, timer } = userData;
        const difference = message.createdTimestamp - lastMessage.createdTimestamp;
        let msgCount = userData.msgCount;

        if (difference > DIFF) {
          clearTimeout(timer);
          userData.msgCount = 1;
          userData.lastMessage = message;
          userData.timer = setTimeout(() => {
            usersMap.delete(message.author.id);
          }, TIME);
          usersMap.set(message.author.id, userData);
        } else {
          msgCount++;
          if (msgCount >= LIMIT) {
            await message.delete();
            
            await message.reply({
              content: `${emojis.pikachu} Merhaba ${message.author}, Spam yapmaktan dolayı mesajlarınız silindi ve 5 dakika boyunca chat mute uygulanacaktır. Lütfen sakinleşin!`
            }).then(x => setTimeout(() => {
              x.delete().catch(() => {}); 
            }, 10000));

            const duration = "5m" ? ms("5m") : undefined;
            return message.guild.members.cache.get(message.author.id).roles.add('CHAT_MUTED_ROLE_ID'); 
          } else {
            userData.msgCount = msgCount;
            usersMap.set(message.author.id, userData);
          }
        }
      } else {
        let fn = setTimeout(() => {
          usersMap.delete(message.author.id);
        }, TIME);
        usersMap.set(message.author.id, {
          msgCount: 1,
          lastMessage: message,
          timer: fn
        });
      }
    }
  }
};
