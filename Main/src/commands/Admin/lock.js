const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');
const emojiciö = require("../../../../Database/src/Settings/emojis.json")
module.exports = {
    aliases: ["kanal-kilit","lock-channel"],
    name: 'lock',
    description: 'Bulunduğunuz kanala herkesin yazmasını <kapatır/açar>.',
    category: 'Admin',
    async execute(message, args) {
       
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild) && !message.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) return message.react(emojiciö.carpi);
    
        const role = message.guild.roles.everyone;
        const channelPermissions = message.channel.permissionOverwrites.cache.get(role.id) || { allow: new Set(), deny: new Set() };
        const hasSendMessagesPermission = !channelPermissions.allow.has(PermissionsBitField.Flags.SendMessages) || channelPermissions.deny.has(PermissionsBitField.Flags.SendMessages);
        
        message.channel.permissionOverwrites.edit(role.id, { SendMessages: hasSendMessagesPermission });
        message.channel.send({ content: `Başarıyla kanal kilidi ${hasSendMessagesPermission ? 'açıldı' : 'kapatıldı'}.` }).then(s => setTimeout(() => s.delete().catch(err => {}), 15000));
    }
};
