const { EmbedBuilder } = require('discord.js');
const sex = require("../../../../conf.json");
const emojis = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'yaz',
  aliases: ["mesaj", "say"],
  description: 'Botun belirtilen mesajı yazmasını sağlar.',
  category: 'oxy',
  async execute(message, args) {
    if (!message.guild) {
        return message.reply({ content: "Bu komutu sadece bir sunucuda kullanabilirsin!", ephemeral: true });
    }

    if (!sex.Devs.includes(message.author.id)) {
        return message.reply({ content: `${emojis.carpi} Bot geliştiricisi olmadığın için bu komutu kullanamazsın.`, ephemeral: true });
    }

    const yazilacakMesaj = args.join(' ');
    if (!yazilacakMesaj) {
        return message.reply({ content: "Lütfen yazdırmak istediğiniz bir mesaj belirtin.", ephemeral: true });
    }

    // Önce kullanıcının mesajını silme (opsiyonel)
    try {
      await message.delete();
    } catch (error) {
      console.error("Mesaj silinemedi:", error);
    }

    // Botun mesajı yazması
    await message.channel.send({ content: yazilacakMesaj });
  },
};