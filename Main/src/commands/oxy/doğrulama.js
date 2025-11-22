const { ActionRowBuilder, SelectMenuBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("../../../../Database/src/Settings/emojis.json");
const Setup = require("../../../../Database/src/Settings/settings.json");
const sex = require("../../../../conf.json")

module.exports = {
  name: 'doğrulama-panel',
  aliases: ["verify","verification"],
  description: 'Hesap doğrulama paneli oluşturur.',
  category: 'oxy',
  async execute(message, args) {
    if (!message.guild) {
      return message.reply({ content: "Bu komutu sadece bir sunucuda kullanabilirsin!", ephemeral: true });
    }


    if (!sex.Devs.includes(message.author.id)) {
        return message.reply({ content: `${emojis.carpi} Bot geliştiricisi olmadığın için bu komutu kullanamazsın.`, ephemeral: true });
    }

    const dogrulamayapkanka = new SelectMenuBuilder()
      .setCustomId('dogrulama_secim')
      .setPlaceholder('Doğrulama yapın...')
      .addOptions([
        {
          label: 'Doğrulama Yap',
          value: 'dogrulama_yap',
          description: 'Doğrulama işlemini gerçekleştirin.',
          emoji: emojis.onay
        },
        {
          label: 'Doğrulama İptal',
          value: 'dogrulama_iptal',
          description: 'Doğrulama işlemini iptal edin.',
          emoji: emojis.carpi
        }
      ]);

    const sexikizlaraselamolsun = new ActionRowBuilder().addComponents(dogrulamayapkanka);

    await message.channel.send({
      content: `${emojis.pikachu} Merhaba sevgili **${message.guild.name}** üyeleri, Aşağıdaki menüden doğrulama yapabilirsiniz! <@&${Setup.otoRole}>`,
      components: [sexikizlaraselamolsun],
    });

    const toplayıcı = message.channel.createMessageComponentCollector();

    toplayıcı.on('collect', async (interaction) => {
      if (interaction.isSelectMenu()) {
        const secim = interaction.values[0];
        const userHasVerificationRole = interaction.member.roles.cache.has(Setup.verificationRole);

        if (secim === 'dogrulama_yap') {
          if (userHasVerificationRole) {
            return interaction.reply({ content: 'Zaten doğrulanmış bir hesabınız var!', ephemeral: true });
          }

          if (!Setup.otoRole || !Setup.verificationRole) {
            return interaction.reply({ content: 'Rollerden biri bulunamadı!', ephemeral: true });
          }

          try {
      
            await interaction.member.roles.add(Setup.verificationRole);

            if (Setup.otoRole) {
              await interaction.member.roles.remove(Setup.otoRole);
            }

        
            await interaction.reply({ content: `Başarılı bir şekilde hesap doğrulaması yapıldı! ${emojis.onay}`, ephemeral: true });

         
            const chatChannel = message.guild.channels.cache.get(Setup.chatChannel); 
            if (chatChannel) {
              chatChannel.send({ 
                content: `${interaction.member}, hesabını doğruladığın için teşekkürler, aramıza hoş geldin! Şu anda sunucumuzda ${interaction.guild.memberCount} kişi bulunuyor!` 
              }).then(sentMessage => {
               
                setTimeout(() => {
                  sentMessage.delete().catch(err => console.log("Mesaj silinemedi:", err));
                }, 10000); 
              });
            } else {
              console.log('Chat kanalı bulunamadı.');
            }
            


          
            const verificationLogChannel = message.guild.channels.cache.find(channel => channel.name === 'dogrulama-log'); 
            if (verificationLogChannel) {
              const embed = new EmbedBuilder()
                .setTitle("Hesap Doğrulandı!")
                .setDescription(`**${interaction.member.user.tag}** başarıyla doğrulama işlemini tamamladı.`)
                .setTimestamp();
              verificationLogChannel.send({ embeds: [embed] });
            } else {
              console.log('Doğrulama log kanalı bulunamadı.');
            }
          } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Bir hata oluştu, lütfen tekrar deneyin.', ephemeral: true });
          }
        }

        else if (secim === 'dogrulama_iptal') {
          await interaction.reply({ content: 'Doğrulama işlemi iptal edildi.', ephemeral: true });
        }
      }
    });
  },
};
