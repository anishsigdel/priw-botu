const { PermissionsBitField } = require('discord.js');
const sex = require("../../../../conf.json");
const emojis = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'sil',
  aliases: ["trash","temizle"],
  description: 'Mesaj siler. <1-100>',
  category: 'Admin',
  async execute(message, args) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && 
        !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) && 
        !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      return message.react(emojis.carpi);
    }


    const amount = args[0];
    if (!amount || isNaN(amount)) {
      return message.reply({ content: `Bir sayı belirtmelisin! ${emojis.carpi}` })
        .then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    }
    if (amount < 1 || amount > 100) {
      return message.reply({ content: `En fazla 100 mesaj silebilirsin! ${emojis.carpi}` })
        .then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
    }

    try {

      const deletedMessages = await message.channel.bulkDelete(amount, true);
      message.channel.send({ content: `Toplamda **${deletedMessages.size}** adet mesaj başarıyla silindi. ${emojis.copkutusu}` })
        .then(s => setTimeout(() => s.delete().catch(err => {}), 15000));
    } catch (err) {
      console.error(err);
      message.reply({ content: `Mesajları silerken bir hata oluştu. ${emojis.carpi}` });
    }
  }
};
