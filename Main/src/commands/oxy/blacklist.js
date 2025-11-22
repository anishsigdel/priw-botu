const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const mongoose = require('mongoose');
const emojis = require("../../../../Database/src/Settings/emojis.json");
const Blacklist = require('../../../../Database/src/Models/blacklist'); 
const sex = require("../../../../conf.json")
module.exports = {
  aliases: ["bl","blist"],
  name: 'blacklist',
  description: 'Bir kullanıcıyı kara listeye alır. <oxy/id>',
  category: 'oxy',
  async execute(message) {

  
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot oxyı olmadığın için başvuru panelini kuramazsın.`, ephemeral: true })
    } else {
    const member = message.mentions.members.first();
    if (!member) {
      return message.reply("Lütfen kara listeye almak istediğiniz kullanıcıyı etiketleyin.");
    }

    if (member.roles.highest.position >= message.member.roles.highest.position) {
      return message.reply("Kara listeye almak istediğiniz kullanıcının rolü, sizin rolünüzden yüksek veya eşit olduğu için işlem yapılamaz.");
    }


    const blacklistSebepSec = new SelectMenuBuilder()
      .setCustomId('blacklist_sebebi')
      .setPlaceholder('Bir kara liste sebebi seçin...')
      .addOptions([
        {
          label: 'Kötüye Kullanım',
          value: 'kotuyekullanim',
          description: 'Hizmetleri Kötüye Kullanmak.',
          emoji: emojis.ok
        },
        {
          label: 'Ticketi Kötüye Kullanım.',
          value: 'kkotuyekullanim',
          description: 'Ticketi Kötüye Kullanmak.',
          emoji: emojis.ok
        },
        {
          label: 'Troll',
          value: 'troll',
          description: 'Troll yapmak.',
          emoji: emojis.ok
        },
        {
          label: 'İptal Et',
          value: 'iptal',
          description: 'İşlemi iptal eder.',
          emoji: emojis.carpi
        }
      ]);

    const row = new ActionRowBuilder().addComponents(blacklistSebepSec);

    await message.channel.send({
      content: `${emojis.basvuru} **${message.guild.name}** sunucusunda ${member} üyesini kara listeye almak için lütfen bir sebep seçin. 15 Saniyeniz var.`,
      components: [row],
    });

    const filter = (interaction) => interaction.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, time: 15000 });

    collector.on('collect', async (interaction) => {
      if (interaction.isSelectMenu()) {
        const sebepsec = interaction.values[0];
        const secenekler = {
          kotuyekullanim: 'Hizmetleri Kötüye Kullanmak.',
          kkotuyekullanim: 'Ticketi Kötüye Kullanmak.',
          troll: 'Troll yapmak.'
        };

        const sebep = secenekler[sebepsec];

        if (sebepsec === 'iptal') {
          return interaction.reply("Kara listeye alma işlemi iptal edildi.");
        }

        if (!sebep) {
          return interaction.reply("Geçersiz sebep seçildi.");
        }

        try {
          const blacklistEntry = new Blacklist({
            userId: member.user.id,
            reason: sebep,
            dateAdded: new Date(),
            isActive: true
          });

          await blacklistEntry.save(); 

    
          const logChannel = message.guild.channels.cache.find(channel => channel.name === 'blacklist-log'); 

          if (!logChannel) {
            return interaction.reply("Log kanalı bulunamadı.");
          }

          const logmesaji = new EmbedBuilder()
            .setDescription(`
              ${member} **Kara Listeye Alındı!** 
              Sebep: ${sebep} 
              Yetkili: ${message.author}`)
            .setTimestamp();

          logChannel.send({ embeds: [logmesaji] });

          interaction.reply(`${member} başarılı bir şekilde kara listeye alındı. Sebep: ${sebep}`);
        } catch (error) {
          console.error(error);
          interaction.reply("Kullanıcıyı kara listeye almak için bir hata oluştu.");
        }
      }
    });

    collector.on('end', collected => {
      if (collected.size === 0) {
        message.channel.send("15 saniye içinde bir seçim yapılmadı.");
      }
    });
  }},
};
