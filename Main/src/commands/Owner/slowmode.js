const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'slowmode',
    aliases: ["yavasmod","yavaş-mod","slow-mod","slow-mode"],
    description: 'Bulunduğunuz kanalı slowmode alır. <1/100>',
    category: 'Owner',
    async execute(message, args) {
        if (!message.member.permissions.has("ADMINISTRATOR")) {
            return message.reply("Bu işlemi yapabilmek için yönetici iznine sahip olmalısın!");
          };
      const number = args[0];
      if (!number) return message.reply("Bir sayı girmelisin!");
      if (isNaN(number)) return message.reply("Geçerli bir sayı girmelisin!");
      if (number > 100) return message.reply("Sayı en fazla 100 olmalıdır!");
  const oxyciks = new EmbedBuilder()
  .setDescription(`Kanal slowmode'u **${number} saniye** olarak ayarlandı!`)
      await message.channel.setRateLimitPerUser(number);
      message.channel.send({embeds: [oxyciks]});
    },
  };