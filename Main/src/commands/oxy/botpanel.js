const { SelectMenuBuilder, ActionRowBuilder, EmbedBuilder } = require('discord.js');
const { exec } = require('child_process');
const ayar = require("../../../../conf.json")
const system = require("../../../../Database/src/Settings/system.json")
const emojis = require("../../../../Database/src/Settings/emojis.json")

module.exports = {
  name: 'botpanel',
  aliases: ["bot-settings","bots"],
  description: 'Bot hakkında bilgiler almanızı sağlar, ping atabilir veya botu yeniden başlatabilirsiniz.',
  category: 'oxy',
  async execute(message) {
    
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true });
    }

    if (!system.Devs.includes(message.author.id)) {
      return message.reply({ content: `Bu komutu sadece bot geliştiricileri kullanabilir.`, ephemeral: true });
    }

    const yaaragımınkafası = new SelectMenuBuilder()
      .setCustomId('bot-paneli-iste-aq')
      .setPlaceholder('Bir işlem seçin...')
      .addOptions([
        {
          label: 'Bot Ping',
          value: 'pingat',
          description: 'Botun gecikme süresini gösterir.',
          emoji: emojis.destek
        },
        {
          label: 'Botu Yeniden Başlat',
          value: 'yenidenbaslat',
          description: 'Botu yeniden başlatır.',
          emoji: emojis.developer
        },
        {
          label: 'Welcome Botu Yeniden Başlat',
          value: 'yenidenbaslat2',
          description: 'Welcome Botu yeniden başlatır.',
          emoji: emojis.developer
        },
        {
          label: 'Secret Botu Yeniden Başlat',
          value: 'yenidenbaslat3',
          description: 'Secret Botu yeniden başlatır.',
          emoji: emojis.developer
        },
        {
          label: 'Database Botu Yeniden Başlat',
          value: 'yenidenbaslat4',
          description: 'Database Botu yeniden başlatır.',
          emoji: emojis.developer
        },
        {
          label: 'Botun Uptime Süresini Görüntüle',
          value: 'uptimegoster',
          description: 'Botun uptime süresini gösterir.',
          emoji: emojis.developer
        },
        {
          label: 'Bot Hakkında',
          value: 'hakkinda',
          description: 'Bot hakkında bilgi verir.',
          emoji: emojis.para
        }
      ]);

    const row = new ActionRowBuilder().addComponents(yaaragımınkafası);

    const botpanel = new EmbedBuilder()
    .setDescription(`Merhaba ${message.author} ${emojis.pikachu}. Bot paneline hoşgeldin! Aşağıda açılan menüden bir işlem seçebilirsin.`)
    await message.channel.send({
    embeds: [botpanel],
      components: [row],
    });

    const filtreleme = (interaction) => interaction.user.id === message.author.id;
    const toplayıcı = message.channel.createMessageComponentCollector({ filtreleme });

    toplayıcı.on('collect', async (interaction) =>  { 
      if (interaction.isSelectMenu()) {
        const secim = interaction.values[0];

        if (secim === 'pingat') {
          const pingimkacki = new EmbedBuilder()
          .setDescription(`Botun ping süresi: ${Math.round(interaction.client.ws.ping)} MS ${emojis.onay}`)
          .setFooter({text: system.Text});
          return interaction.reply({embeds: [pingimkacki], ephemeral: true});
        }

        if (secim === 'yenidenbaslat') {
          interaction.reply({content: "Manager Botu yeniden başlatılıyor.", ephemeral: true});
          exec(`pm2 restart ${ayar.user}_manager`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return interaction.reply("Botu yeniden başlatırken bir hata oluştu.");
            }
            
          });
        }

        if (secim === 'yenidenbaslat2') {
          interaction.reply({content: "Welcome Botu yeniden başlatılıyor.", ephemeral: true});
          exec(`pm2 restart ${ayar.user}_welcomer`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return interaction.reply("Botu yeniden başlatırken bir hata oluştu.");
            }
            
          });
        }
        if (secim === 'yenidenbaslat3') {
          interaction.reply({content: "Secret Botu yeniden başlatılıyor.", ephemeral: true});
          exec(`pm2 restart ${ayar.RealOwner}_Secret`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return interaction.reply("Botu yeniden başlatırken bir hata oluştu.");
            }
            
          });
        }
        if (secim === 'yenidenbaslat4') {
          interaction.reply({content: "Database Botu yeniden başlatılıyor.", ephemeral: true});
          exec(`pm2 restart ${ayar.RealOwner}_Database`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return interaction.reply("Botu yeniden başlatırken bir hata oluştu.");
            }
            
          });
        }

        if (secim === 'uptimegoster') {
          const calismasuresi = message.client.uptime; 
          const saniye = Math.floor((calismasuresi / 1000) % 60);
          const dakika = Math.floor((calismasuresi / (1000 * 60)) % 60);
          const saat = Math.floor((calismasuresi / (1000 * 60 * 60)) % 24);
          const gün = Math.floor(calismasuresi / (1000 * 60 * 60 * 24));
          const uptimeembed = new EmbedBuilder()
            .setDescription(`${emojis.ok} Çalışma Süresi: ${gün} gün, ${saat} saat, ${dakika} dakika, ${saniye} saniye`);

          return interaction.reply({ embeds: [uptimeembed], ephemeral: true });
        }
        if (secim === 'hakkinda') {
          const hakkindaembed = new EmbedBuilder()
            .setDescription(`
                Bot Adı: ${message.client.user.tag}
                ${emojis.ayarlar} **Toplam Komut**: **${message.client.commands.size}**
                ${emojis.developer} **Bot Developers:** ${system.Devs.length > 0 ? `${system.Devs.map(x => `<@${x}>`).join(", ")}` : "\`YOK\`"}
                ${emojis.para} **Aylık Ücret:** **oxy is here**`);
                

          return interaction.reply({ embeds: [hakkindaembed], ephemeral: true  });
        }
      }
    });
  },
};
