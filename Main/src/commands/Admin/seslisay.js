const { PermissionsBitField: { Flags }, EmbedBuilder, bold } = require('discord.js');
const ayarcik = require('../../../../Database/src/Settings/settings.json');
const emojis = require('../../../../Database/src/Settings/emojis.json');

module.exports = {
    name: 'seslisay',
    aliases: ["sesaktiflik","voicecount"],
    description: 'Sunucudaki ses aktifliğini sayar.',
    category: 'Admin',
    async execute(message) {
        if (!message.member.permissions.has(Flags.Administrator)) {
            message.react(emojis.carpi);
            message.reply(`Yeterli yetkin yok.`).then(s => setTimeout(() => s.delete().catch(err => { }), 5000));
            return;
        }

        const embed = new EmbedBuilder({
            author: {
                name: message.author.username,
                iconURL: message.author.displayAvatarURL({ forceStatic: true }),
            },
        });


        const voiceMembers = message.guild.members.cache.filter((m) => m.voice.channel);
        const userMembers = voiceMembers.filter(m => !m.bot); 
        const botMembers = voiceMembers.filter(m => m.bot); 
        const streamMembers = voiceMembers.filter(m => m.voice.streaming);
        const mutedMembers = voiceMembers.filter(m => m.voice.mute);
        const deafenedMembers = voiceMembers.filter(m => m.voice.deaf);
        const taggedMembers = voiceMembers.filter(m => m.roles.cache.has(ayarcik.tagRole));


        const publicMembers = voiceMembers.filter(m => m.voice.channel.parentId === ayarcik.publicParent);
        const streamerMembers = voiceMembers.filter(m => m.voice.channel.parentId === ayarcik.streamerParent);
        const secretMembers = voiceMembers.filter(m => m.voice.channel.parentId === ayarcik.secretParent);


        message.reply({
            embeds: [
                embed.addFields(
                    { 
                        name: 'Sunucunun Genel Aktifliği',
                        value: [
                            `${emojis.ok} Toplam ${bold(userMembers.size.toString())} bot ses kanallarında.`,
                            `${emojis.ok} Toplam ${bold(botMembers.size.toString())} üye ses kanallarında.`,
                            `${emojis.ok} Toplam ${bold(taggedMembers.size.toString())} taglı üye ses kanallarında.`,
                            `${emojis.ok} Toplam ${bold(streamMembers.size.toString())} üye yayın yapıyor.`,
                            `${emojis.ok} Toplam ${bold(mutedMembers.size.toString())} üyenin mikrofonu kapalı.`,
                            `${emojis.ok} Toplam ${bold(deafenedMembers.size.toString())} üyenin kulaklığı kapalı.`,
                        ].join('\n'),
                        inline: true
                    },
                    {
                        name: 'Sunucunun Kategori Aktifliği',
                        value: [
                            `${emojis.ok} Toplam ${bold(publicMembers.size.toString())} üye public odalarda.`,
                            `${emojis.ok} Toplam ${bold(streamerMembers.size.toString())} üye streamer odalarda.`,
                            `${emojis.ok} Toplam ${bold(secretMembers.size.toString())} üye secret odalarda.`,
                        ].join('\n'),
                        inline: true
                    }
                )
            ]
        });
    },
};
