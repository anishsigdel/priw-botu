const { PermissionFlagsBits } = require('discord.js');
const { boosterRole } = require("../../../../Database/src/Settings/settings.json");
const {onay,carpi} = require("../../../../Database/src/Settings/emojis.json")

module.exports = {
  name: 'zengin',
  aliases: ["booster","b"],
  description: 'Boosterlara özel isim değiştirme özelliği! <yeni isim>',
  category: 'Kullanıcı',
  async execute(message) {
    const member = message.guild.members.cache.get(message.author.id);

   
    if (!member.roles.cache.has(boosterRole)) {
      await message.react(carpi);

      return message.channel.send({ content: 'Bu komutu kullanabilmek için "*Booster*" rolüne sahip olmalısınız!' })
    }

    const zenginİsim = message.content.slice(message.content.indexOf(' ') + 1).trim();
    if (!zenginİsim || zenginİsim.length > 32) {
      return message.reply({ content: 'Lütfen geçerli bir isim girin (32 karakterden uzun olmamalıdır).' });
    }

    try {
      await message.member.setNickname(zenginİsim);
      await message.react(onay);
      message.reply({ content: `İsminiz başarıyla "${zenginİsim}" olarak değiştirildi!` });
    } catch (error) {
      console.error(error);
      message.reply({ content: 'İsminizi değiştirme sırasında bir hata oluştu.' });
    }
  },
};
