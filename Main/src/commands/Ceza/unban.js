const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const emojis = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'unban',
  aliases: ["yargı-kaldır","unb"],
  description: 'Bir kullanıcının banını açar. <id>',
  category: 'Ceza',
  async execute(message) {

    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("Bu komutu kullanmak için **Üyeleri Banla** yetkisine sahip olmalısınız!");
    }

    const userID = message.content.split(" ")[1];  
    if (!userID) {
        return message.reply("Lütfen unbanlamak istediğiniz kullanıcının ID'sini girin.");
    }

    
    const member = await message.guild.bans.fetch(userID).catch(() => null);
    if (!member) {
      return message.reply("Bu kullanıcı zaten banlanmamış.");
    }

    const unbansebep = new SelectMenuBuilder()
      .setCustomId('unbansebebimiz')
      .setPlaceholder('Bir unban sebebi seçin...')
      .addOptions([
        {
          label: 'Ban Affı',
          value: 'banaffi',
          description: 'Ban affı ile geri getirme.',
          emoji: emojis.ok
        },
        {
          label: 'Owner Affı',
          value: 'owneraffi',
          description: 'Sunucu sahibinin affı ile geri getirme.',
          emoji: emojis.ok
        },
        {
          label: 'Geçersizlik Affı',
          value: 'gecersizaffi',
          description: 'Geçersiz bir sebepten banlanma affı ile geri getirme.',
          emoji: emojis.ok
        },
        {
          label: 'İptal Et',
          value: 'iptal',
          description: 'İşlemi iptal eder.',
          emoji: emojis.carpi
        }
      ]);

    const row = new ActionRowBuilder().addComponents(unbansebep);

    await message.channel.send({
      content: `**${message.guild.name}** sunucusunda ${member.user.tag} üyesini unbanlamak için lütfen bir sebep seçin. 15 saniyeniz var.`,
      components: [row],
    });

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      if (interaction.isSelectMenu()) {
        const valuecik = interaction.values[0];
        const seceneklerim = {
          banaffi: 'Ban affı ile geri getirme.',
          owneraffi: 'Sunucu sahibinin affı ile geri getirme.',
          gecersizaffi: 'Geçersiz bir sebepten banlanma affı ile geri getirme.',
          iptal: 'İşlem iptal edildi.',
        };

        const sebepcik = seceneklerim[valuecik];

        if (valuecik === 'iptal') {
          return interaction.reply("Unban işlemi iptal edildi.");
        }

        try {
        
          await message.guild.members.unban(userID, `${sebepcik} - Yetkili: ${message.author.tag}`);
          interaction.reply(`${member.user.tag} başarılı bir şekilde unbanlandı. Sebep: ${sebepcik}`);
        } catch (error) {
          interaction.reply("Unban işlemini gerçekleştirmek için yeterli izniniz yok.");
        }
      }
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        message.channel.send("15 saniye içinde bir seçim yapılmadı.");
      }
    });
  },
};
