const { PermissionFlagsBits, ActivityType } = require("discord.js");
const client = global.bot;
const canvafy = require('canvafy');
const emoji = require("../../../../Database/src/Settings/emojis.json")

module.exports = {
  name: 'spotify',
  aliases: ["sp","music"],
  description: 'Spotify görüntüler. <oxy/id>',
  category: 'Kullanıcı',
  async execute(message, args) { 
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    
    if (member && member.presence && member.presence.activities && member.presence.activities.some(five => five.name == "Spotify" && five.type == ActivityType.Listening)) {
        let durum = await member.presence.activities.find(five => five.type == ActivityType.Listening);
        
        const spotify = await new canvafy.Spotify()
            .setAuthor(durum.state)
            .setAlbum(durum.assets.largeText)
            .setImage(`https://i.scdn.co/image/${durum.assets.largeImage.slice(8)}`)
            .setTimestamp(new Date(Date.now()).getTime() - new Date(durum.timestamps.start).getTime(), new Date(durum.timestamps.end).getTime() - new Date(durum.timestamps.start).getTime())
            .setTitle(durum.details)
            .setOverlayOpacity(0.7)
            .build();

        return message.reply({
            files: [{
                attachment: spotify,
                name: `spotify-${message.member.id}.png`
            }]
        });                  
    } else {
        await message.react(emoji.carpi);
        const yanıt = await message.reply(`Kullanıcı Şuan Spotify Üzerinde Şarkı Dinlemiyor! ${emoji.carpi}`);
        setTimeout(() => {
            yanıt.delete();
        }, 7000);
        setTimeout(() => {
            message.delete();
        }, 5000);
        
        return;
    }
  }
};
