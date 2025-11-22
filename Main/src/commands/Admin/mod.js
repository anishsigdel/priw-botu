const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const serverTag  = require('../../../../Database/src/Models/serverTag');
const ayar = require("../../../../conf.json")
const { exec } = require('child_process');

module.exports = {
    name: 'tag-mod',
    description: 'Sunucudaki tag modunu seçer. <priv-ekip>.',
    category: 'Admin',
    async execute(message, args) {
       
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.reply('Bu komutu kullanmak için yeterli yetkiniz yok.');
        }
       
        if (!args[0] || !['ekip', 'priv'].includes(args[0].toLowerCase())) {
            return message.reply('Lütfen geçerli bir tag modu girin: `ekip` ya da `priv`.');
        }

        const tagMode = args[0].toLowerCase(); 
        const guildId = message.guild.id; 

        try {
            const serverTagDoc = await serverTag.findOne({ guildId });

            if (!serverTagDoc) {
                const newServerTag = new serverTag({
                    guildId,
                    tagMode,
                    isActive: true
                });

                await newServerTag.save();

                const embed = new EmbedBuilder()
                    .setTitle('Tag Modu Seçildi')
                    .setDescription(`Sunucu için **${tagMode}** tag modu başarıyla seçildi!`);

  
                exec(`pm2 restart ${ayar.user}_welcomer`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return message.reply("Botu yeniden başlatırken bir hata oluştu.");
                    }
                    console.log(`Pm2 Restart yedi = Tag Modu Değişti: ${stdout}`);
                });

                return message.channel.send({ embeds: [embed] });
            } else {
                serverTagDoc.tagMode = tagMode;
                await serverTagDoc.save();

                const embed = new EmbedBuilder()
                    .setTitle('Tag Modu Güncellendi')
                    .setDescription(`Sunucunun tag modu başarıyla **${tagMode}** olarak güncellendi.`);

                exec(`pm2 restart ${ayar.user}_welcomer`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return message.reply("Botu yeniden başlatırken bir hata oluştu.");
                    }
                    console.log(`Pm2 Restart yedi = Tag Modu Değişti: ${stdout}`);
                });

                return message.channel.send({ embeds: [embed] });
            }
            
        } catch (error) {
            console.error(error);
            message.reply('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    }
};
