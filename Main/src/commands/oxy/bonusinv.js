const Discord = require("discord.js");
const db = require('croxydb');
const emojıdb = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'bonus',
  description: 'Kullanıcıya belirli bir sayı kadar bonus davet ekler!',
  category: 'oxy',
  async execute(message, args) {
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true });
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojıdb.carpi} Bot developerı olmadığın için bu komutu kullanamazsın.`, ephemeral: true });
    } else {

      const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

      if (!member) {
        return message.reply({content: "Lütfen geçerli bir kullanıcı etiketleyin veya ID'sini girin!"});
      }

      const amount = args[1] ? parseInt(args[1]) : 1;

      if (isNaN(amount) || amount <= 0) {
        return message.reply({ content: "Lütfen geçerli bir sayı girin!" });
      }

      let bonusCount = db.fetch(`bonus_${member.id}`) || 0;

      bonusCount += amount;

      db.set(`bonus_${member.id}`, bonusCount);

      message.reply({content: `${member} adlı kullanıcıya ${amount} bonus davet eklendi! Şu anda ${bonusCount} bonus daveti var.`});
    }
  }
};
