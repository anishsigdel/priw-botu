const emojis = require("../../../../Database/src/Settings/emojis.json")
const oxyishere = require("../../../../conf.json")

module.exports = {
  name: 'özel-oda',
  aliases: ["secret-panel","oda-panel"],
  description: 'Özel-oda paneli oluşturur.',
  category: 'oxy',
  async execute(message) {
    if (!message.guild) {
      return;  
    }

    if (!oxyishere.Devs.includes(message.author.id)) {
      await message.reply(`Özel-Oda panelini kurmak için bot developeri olman gerekiyor. ${emojis.carpi}`);
      await message.react(emojis.carpi); 
       return;
    }
  }
};
