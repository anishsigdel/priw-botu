const { Client, GatewayIntentBits, PermissionsBitField, ChannelType } = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");
const ayarlar = require("../../../../Database/src/Settings/settings.json");
module.exports = {
    name: 'dağıt',
    aliases: ["pub","public"],
    description: 'Bulunduğunuz kanaldaki üyeleri public ses kanallarına dağıtır.',
    category: 'Owner',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            message.reply(`${carpi} Yeterli yetkin yok`).then(s => setTimeout(() => s.delete().catch(err => {}), 5000))
            return;
        } 
    
        if (!message.member.voice.channel) {
            message.reply({ content: `${carpi} Bir ses kanalında olmanız gerekiyor.` }).then(s => setTimeout(() => s.delete().catch(err => {}), 5000));
            return;
        }
    
        const publicCategory = message.guild.channels.cache.filter((c) => c.parentId === ayarlar.publicParent && c.type === ChannelType.GuildVoice);
    
        [...message.member.voice.channel.members.values()]
        .filter((m) => m.voice.channelId === message.member.voice.channelId)
        .forEach((m) => m.voice.setChannel(publicCategory.random().id));
    
        message.react(onay);
        message.channel.send({ content: `${onay} Başarıyla kanaldaki tüm kullanıcılar public odalara dağıtıldı.` }).then(s => setTimeout(() => s.delete().catch(err => {}), 15000));
    }, 
};