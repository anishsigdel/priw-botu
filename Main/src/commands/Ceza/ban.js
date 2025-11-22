const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const sex = require("../../../../conf.json");
const emojis = require("../../../../Database/src/Settings/emojis.json")

module.exports = {
  name: 'ban',
  aliases: ["yargı","ban"],
  description: 'Bir kullanıcıyı seçilen sebebe göre banlar. <oxy/id>',
  category: 'Ceza',
  async execute(message) {

    if (!message.member.permissions.has('BAN_MEMBERS')) {
      return message.reply("Bu komutu kullanmak için **Üyeleri Banla** yetkisine sahip olmalısınız!");
    }

    const member = message.mentions.members.first();
    if (!member) {
        return message.reply("Lütfen banlamak istediğiniz kullanıcıyı etiketleyin.");
    }

   
    if (member.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply("Banlamak istediğiniz kullanıcının rolü, sizin rolünüzden yüksek veya eşit olduğu için işlem yapılamaz.");
    }


    const bansebepsec = new SelectMenuBuilder()
      .setCustomId('ban_sebebi')
      .setPlaceholder('Bir ban sebebi seçin...')
      .addOptions([
        {
          label: 'Aşağılama',
          value: 'asagilama',
          description: 'Kişiye hakaret veya aşağılayıcı davranış.',
          emoji: emojis.ok
        },
        {
          label: 'Tartışma Çıkarmak',
          value: 'tartisma',
          description: 'Sunucuda gereksiz tartışma başlatmak.',
          emoji: emojis.ok
        },
        {
          label: 'Spam',
          value: 'spam',
          description: 'Spam yapmak veya reklam göndermek.',
          emoji: emojis.ok
        },
        {
          label: 'Dini ve Irkçı Davranış',
          value: 'diniirkci',
          description: 'Dini veya ırkçı söylemler ve davranışlar.',
          emoji: emojis.ok
        },
        {
          label: 'İptal Et',
          value: 'iptal',
          description: 'İşlemi iptal eder.',
          emoji: emojis.carpi
          }
      ]);

    const row = new ActionRowBuilder().addComponents(bansebepsec);

    await message.channel.send({
      content: `${emojis.basvuru} **${message.guild.name}** sunucusunda ${member} üyesini banlamak için lütfen bir sebep seçin. 15 Saniyeniz var.`,
      components: [row],
    });

    
    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      if (interaction.isSelectMenu()) {
        const sebepsec = interaction.values[0]; 
        const secenekler = {
          asagilama: 'Kişiye hakaret veya aşağılayıcı davranış.',
          tartisma: 'Sunucuda gereksiz tartışma başlatmak.',
          spam: 'Spam yapmak veya reklam göndermek.',
          diniirkci: 'Dini veya ırkçı söylemler ve davranışlar.',
        };

        const sebep = secenekler[sebepsec];

        if (sebepsec === 'iptal') {
            return interaction.reply("Ban işlemi iptal edildi.");
          }

        if (!sebep) {
          return interaction.reply("Geçersiz sebep seçildi.");
        }

        try {
          await member.ban({ reason: `${sebep} - Yetkili: ${message.author.tag}` });
          interaction.reply(`${member.user.tag} başarılı bir şekilde banlandı. Sebep: ${sebep}`);
        } catch (error) {
          interaction.reply("Kullanıcıyı banlamak için yeterli izniniz yok.");
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
