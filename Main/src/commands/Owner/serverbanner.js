const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");
module.exports = {
    name: 'serverbanner',
    aliases: ["sunucubanner","swbanner"],
    description: 'Sunucudaki banneri gösterir.',
    category: 'Owner',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply(`${carpi} Yeterli yetkin yok`).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
          }

          await message.react(onay)
await message.reply({content: `[**${message.guild.name}**] Sunucusunun Banneri Aşağıda Belirtilmiştir.`, files: [message.guild.bannerURL({dynamic: true, size: 4096}) || "https://i.imgur.com/poYt5sN.png"]})
}
}