const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const emojis = require("../../../../Database/src/Settings/emojis.json");
const Blacklist = require('../../../../Database/src/Models/blacklist'); 
const sex = require("../../../../conf.json")

module.exports = {
  name: 'unblacklist',
  aliases: ["unbl","unlist"],
  description: 'Bir kullanıcıyı kara listeden çıkarır. <oxy/id>',
  category: 'oxy',
  async execute(message) {


    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için başvuru panelini kuramazsın.`, ephemeral: true })
    } else {

    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Lütfen kara listeden çıkarmak istediğiniz kullanıcıyı etiketleyin.");
    }

    
    try {
     
      const blacklistkontrol = await Blacklist.findOne({ userId: member.user.id, isActive: true });

      if (!blacklistkontrol) {
        return message.reply("Bu kullanıcı zaten kara listede değil.");
      }

      const blacklistonay = new SelectMenuBuilder()
        .setCustomId('blacklist_onay')
        .setPlaceholder('Kullanıcıyı kara listeden çıkarmak istiyor musunuz?')
        .addOptions([
          {
            label: 'Evet',
            value: 'onayliyorum',
            description: 'Kullanıcıyı kara listeden çıkar.',
            emoji: emojis.ok,
          },
          {
            label: 'Hayır',
            value: 'reddediyorum',
            description: 'İşlemi iptal et.',
            emoji: emojis.carpi,
          },
        ]);

      const row = new ActionRowBuilder().addComponents(blacklistonay);


      await message.channel.send({
        content: `${member} kullanıcısını kara listeden çıkarmak istiyor musunuz?`,
        components: [row],
      });


      const filter = (interaction) => interaction.user.id === message.author.id;
      const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

      collector.on('collect', async (interaction) => {
        if (interaction.isSelectMenu()) {
          const secenegimiz = interaction.values[0];

          if (secenegimiz === 'onayliyorum') {
      
            blacklistkontrol.isActive = false;
            await blacklistkontrol.save();

            const blacklistlog = message.guild.channels.cache.find(channel => channel.name === 'blacklist-log');
            if (!blacklistlog) {
              return interaction.reply("Log kanalı bulunamadı.");
            }

            const blacklistlogmesaj = new EmbedBuilder()
              .setDescription(`
                ${member} **Kara Listeden Çıkarıldı!** 
                Yetkili: ${message.author}`)
              .setTimestamp();

            blacklistlog.send({ embeds: [blacklistlogmesaj] });

            interaction.reply(`${member} başarıyla kara listeden çıkarıldı.`);
          } else if (secenegimiz === 'reddediyorum') {
            interaction.reply("Kara listeden çıkarma işlemi iptal edildi.");
          }
        }
      });

      collector.on('end', (collected) => {
        if (collected.size === 0) {
          message.channel.send("15 saniye içinde bir seçim yapılmadı. İşlem iptal edildi.");
        }
      });

    } catch (error) {
      console.error(error);
      message.reply("Kullanıcıyı kara listeden çıkarmak için bir hata oluştu.");
    }
  }},
};
