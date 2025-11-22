const emojis = require("../../../Database/src/Settings/emojis.json");
const moment = require("moment");
require("moment-duration-format");
moment.locale("tr");

const { isLicenseValid } = require("../../../license-checker");

module.exports = {
  name: "messageCreate",
  async execute(message) { 
    // License kontrolü - eğer süre dolmuşsa hiçbir mesaja cevap verme
    if (!isLicenseValid()) {
        return; // Hiçbir şey yapma, sessizce çık
    }

    if (message.author.bot) return;

    if (message.content.toLowerCase() === 'sa') {
      await message.react(emojis.giveaway);
      const replyMessage = await message.reply('Aleykum selam hoşgeldin reis!');
      setTimeout(() => {
        replyMessage.delete().catch(() => {});
      }, 7000);  
    }

    if (message.content.toLowerCase() === 'Sa') {
        await message.react(emojis.giveaway);
        const replyMessage = await message.reply('Aleykum selam hoşgeldin reis!');
        setTimeout(() => {
          replyMessage.delete().catch(() => {});
        }, 7000);  
    }

    if (message.content.toLowerCase() === 'selamunaleykum') {
        await message.react(emojis.giveaway);
        const replyMessage = await message.reply('Aleykum selam hoşgeldin reis!');
        setTimeout(() => {
          replyMessage.delete().catch(() => {});
        }, 7000);  
    }

    if (message.content.toLowerCase() === 'selamun aleykum') {
        await message.react(emojis.giveaway);
        const replyMessage = await message.reply('Aleykum selam hoşgeldin reis!');
        setTimeout(() => {
          replyMessage.delete().catch(() => {});
        }, 7000);  
    }

    if (message.content.includes('<@980449798207438908>')) {
        await message.react(emojis.carpi);
        const replyMessage = await message.reply('bot & sorun & istek dm!');
        setTimeout(() => {
          replyMessage.delete().catch(() => {});
        }, 7000);  
    }
  },
};
