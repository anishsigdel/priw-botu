const { EmbedBuilder, ChannelType, PermissionFlagsBits } = require("discord.js");
const ayarım = require("../../../Database/src/Settings/settings.json");

module.exports = async (oldFive, newFive) => {
    let data = client.db.get(`özeloda_${newFive.member.id}`);
    
    if (newFive.channelId == ayarım.secretVoice) {
        if (!data) {
            let odaisim = newFive.member.displayName.length > 10 
                ? newFive.member.displayName.substring(0, 10).trim() + ".." 
                : newFive.member.displayName;

      
            newFive.guild.channels.create({
                name: `#${odaisim}`,
                type: ChannelType.GuildVoice,
                parent: ayarım.secretParent,
                userLimit: 1, 
                permissionOverwrites: [
                    {
                        id: newFive.member.id,
                        allow: [
                            PermissionFlagsBits.Connect,
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.MuteMembers,
                            PermissionFlagsBits.DeafenMembers,
                            PermissionFlagsBits.Stream,
                            PermissionFlagsBits.Speak
                        ]
                    },
                    {
                        id: newFive.guild.id,
                        deny: [
                            PermissionFlagsBits.Connect,
                            PermissionFlagsBits.ViewChannel,
                            PermissionFlagsBits.MuteMembers,
                            PermissionFlagsBits.DeafenMembers,
                            PermissionFlagsBits.Stream,
                            PermissionFlagsBits.Speak
                        ]
                    }
                ]
            }).then(async (bes) => {
                await newFive.member.voice.setChannel(bes.id); 
                await client.db.set(`özeloda_${newFive.member.id}`, bes.id);
                await client.db.set(`${bes.id}`, `${newFive.member.id}`);
                await client.db.push(`members_${bes.id}`, newFive.member.id);

              
                const kanal = newFive.guild.channels.cache.find(x => x.name === "özel-oda-log");
                if (kanal) {
                    const embedım = new EmbedBuilder()
                
                        .setDescription(`
                          ${newFive.member.displayName} yeni bir özel oda oluşturdu, Oda: **#${odaisim}**`)
                        .setTimestamp();

                    await kanal.send({ embeds: [embedım] });
                } else {
                    console.log("Log kanalı bulunamadı!");
                }
            });
        } else {
           
            let channel = newFive.guild.channels.cache.get(data);
            if (channel) {
                newFive.member.voice.setChannel(channel.id);
            }
        }
    }
};

module.exports.conf = {
    name: "voiceStateUpdate"
};
