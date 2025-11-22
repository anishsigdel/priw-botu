const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const AfkModel = require('../../../../Database/src/Models/afk');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");
module.exports = {
    name: 'afklist',
    aliases: ["afkliste"],
    description: 'Sunucudaki afkları listeler.',
    category: 'Owner',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            return message.reply(`${carpi} Yeterli yetkin yok`).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
          }

            const afkUsers = await AfkModel.find({ guildID: message.guild.id });

            if (!afkUsers || afkUsers.length === 0) {
                return message.channel.send("Şu anda hiçbir kullanıcı afk değil.");
            }
    
            const afkListEmbed = new EmbedBuilder()
            afkUsers.forEach((user, index) => {
                afkListEmbed.setDescription(`${client.emojis.cache.find(x => x.name === "oxy_nokta")} \`${message.guild.name}\` **Adlı Sunucumuzda [AFK] Olan Kullanıcıların Hepsini Aşağıda Listeler.**
                
                \` ${index + 1} \` ${client.users.cache.get(user.userID)} - **Sebep:** \` ${user.reason} \``);
            });
    
            await message.channel.send({ embeds: [afkListEmbed] });
        }
};