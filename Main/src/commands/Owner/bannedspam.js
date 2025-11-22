const { EmbedBuilder, PermissionsBitField, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const spamEngel = require('../../../../Database/src/Models/spamKoruma'); 
const ayar = require("../../../../conf.json");
const { exec } = require('child_process'); 

module.exports = {
  name: 'spam-engel',
  aliases: ["spam-engel"],
  description: 'Spam engelleme sistemini <aç/kapat>.',
  category: 'Owner',
  async execute(message, args) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) {
      return message.reply('Bu komutu kullanmak için yeterli yetkiniz yok.');
    }

    const guildId = message.guild.id;
    const action = args[0]; 

    if (!action || !['aç', 'kapat'].includes(action.toLowerCase())) {
      return message.reply('Lütfen geçerli bir seçenek girin: `aç` veya `kapat`.');
    }

    try {
      let filter = await spamEngel.findOne({ guildID: guildId });

      if (!filter) {
        filter = new spamEngel({
          guildID: guildId,
          isActive: action.toLowerCase() === 'aç', 
        });

        await filter.save();
      } else {
        filter.isActive = action.toLowerCase() === 'aç';
        await filter.save();
      }

      const status = filter.isActive ? 'aktif' : 'kapalı';

      const embed = new EmbedBuilder()
        .setDescription(`Spam engelleme sistemi **${status}** hale getirildi. Ayarın tam-mod aktif hale getirilmesi için lütfen aşağıdaki menüden **Yeniden Başlat'ı** seçiniz!`);

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId('select_option')
          .setPlaceholder('Seçenekleri Görüntüle')
          .addOptions(
            { label: 'Yeniden Başlat', value: 'yenidenbaslat' },
          )
      );

      const sentMessage = await message.channel.send({
        embeds: [embed],
        components: [row]
      });

      const filtreleme = (interaction) => interaction.user.id === message.author.id;
      const toplayıcı = sentMessage.createMessageComponentCollector({ filter: filtreleme });

      toplayıcı.on('collect', async (interaction) => {
        if (interaction.isStringSelectMenu()) {
          const secim = interaction.values[0];

          if (secim === 'yenidenbaslat') {
            interaction.reply({ content: "Manager Botu yeniden başlatılıyor.", ephemeral: true });

            exec(`pm2 restart ${ayar.user}_manager`, (error, stdout, stderr) => {
              if (error) {
                console.error(`exec error: ${error}`);
                return interaction.reply("Botu yeniden başlatırken bir hata oluştu.");
              }
              console.log(stdout);
              console.error(stderr);
            });
          } 
        }
      });

      toplayıcı.on('end', collected => {
        console.log(`Koleksiyon tamamlandı, ${collected.size} etkileşim alındı.`);
      });

    } catch (error) {
      console.error(error);
      return message.reply('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  }
};
