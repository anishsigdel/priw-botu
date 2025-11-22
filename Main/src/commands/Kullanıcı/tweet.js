const { PermissionFlagsBits, ActivityType } = require("discord.js");
const client = global.bot;
const emojidb = require("../../../../Database/src/Settings/emojis.json")
const canvafy = require('canvafy');

module.exports = {
  name: 'tweet',
  aliases: ["tw","twitter"],
  description: 'Sahte tweet atarsınız. <tweet metni>',
  category: 'Kullanıcı',
  async execute(message, args) { 
   
    const tweetText = args.join(' ').trim(); 
    if (!tweetText) {
        await message.react(emojidb.carpi);
        
        const yanıt = await message.reply('Bir tweet metni girmelisin!');
        
      
        setTimeout(() => {
            yanıt.delete();
        }, 7000);
        
        setTimeout(() => {
            message.delete();
        }, 5000);
        
        return;
    }
    
    const avatarURL = message.member.user.displayAvatarURL({ format: 'png', dynamic: true, size: 512 });
    if (!avatarURL) {
        console.error("Failed to retrieve user avatar.");
        return; 
    }
    
    try {
        const tweet = await new canvafy.Tweet()
            .setTheme("dark")
            .setUser({
                displayName: message.member.displayName,
                username: message.member.user.username  
            })
            .setVerified(true) 
            .setComment(tweetText)  
            .setAvatar(avatarURL)
            .build();

        message.channel.send({
            files: [{
                attachment: tweet,
                name: `tweet-${message.author.id}.png`
            }]
        });
        message.delete()
    } catch (error) {
        console.error("Error building the tweet image:", error);
        message.channel.send("Tweet png oluşturulurken bir hata meydana geldi.");
    }
  }
};
