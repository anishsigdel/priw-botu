const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const registerModum  = require('../../../../Database/src/Models/registerMode');
const ayar = require("../../../../conf.json");
const { exec } = require('child_process');

module.exports = {
    aliases: ["rg-mod","registermod"],
    name: 'register-mod',
    description: 'Sunucudaki register modunu seçer. <açık-kapalı>.',
    category: 'Admin',
    async execute(message, args) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
            return message.reply('Bu komutu kullanmak için yeterli yetkiniz yok.');
        }
       
        if (!args[0] || !['kapalı', 'açık'].includes(args[0].toLowerCase())) {
            return message.reply('Lütfen geçerli bir register modu girin: `kapalı` ya da `açık`.');
        }

        const registerMode = args[0].toLowerCase(); 
        const guildId = message.guild.id; 

        try {
            const registerModumDoc = await registerModum.findOne({ guildId });

            if (!registerModumDoc) {
                const newRegisterModum = new registerModum({
                    guildId,
                    registerMode,
                    isActive: true
                });

                await newRegisterModum.save();

                const embed = new EmbedBuilder()
                    .setTitle('Register Modu Seçildi')
                    .setDescription(`Sunucu için **${registerMode}** Register Modu başarıyla seçildi!`);

                exec(`pm2 restart ${ayar.user}_welcomer`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return message.reply("Botu yeniden başlatırken bir hata oluştu.");
                    }
                    console.log(`Pm2 Restart yedi = Register Modu Değişti: ${stdout}`);
                });

                return message.channel.send({ embeds: [embed] });
            } else {
                registerModumDoc.registerMode = registerMode;
                await registerModumDoc.save();

                const embed = new EmbedBuilder()
                    .setTitle('Register Modu Güncellendi')
                    .setDescription(`Sunucunun Register Modu başarıyla **${registerMode}** olarak güncellendi.`);

                exec(`pm2 restart ${ayar.user}_welcomer`, (error, stdout, stderr) => {
                    if (error) {
                        console.error(`exec error: ${error}`);
                        return message.reply("Botu yeniden başlatırken bir hata oluştu.");
                    }
                    console.log(`Pm2 Restart yedi = Register Modu Değişti: ${stdout}`);
                });

                return message.channel.send({ embeds: [embed] });
            }

        } catch (error) {
            console.error(error);
            message.reply('Bir hata oluştu, lütfen tekrar deneyin.');
        }
    }
};
