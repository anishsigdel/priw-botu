const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, SelectMenuBuilder } = require('discord.js');
const sex = require("../../../../conf.json");
const emojis = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'emoji',
  aliases: ["emojiinfo","emj"],
  description: 'Sunucudaki bir emoji hakkında bilgi verir.',
  category: 'oxy',
  async execute(message, args) {
    if (!message.guild) {
        return message.reply({ content: "Bu komutu sadece bir sunucuda kullanabilirsin!", ephemeral: true });
    }

    if (!sex.Devs.includes(message.author.id)) {
        return message.reply({ content: `${emojis.carpi} Bot geliştiricisi olmadığın için bu komutu kullanamazsın.`, ephemeral: true });
    }

    const emojiName = args[0];
    if (!emojiName) {
        return message.reply("Lütfen bir emoji ismi girin.");
    }

    const emoji = message.guild.emojis.cache.find(e => e.name === emojiName);
    if (!emoji) {
        return message.reply("Bu isimle bir emoji bulunamadı.");
    }

    const emojicartcurt = new SelectMenuBuilder()
      .setCustomId('emoji_info')
      .setPlaceholder('Bir bilgi seçin...')
      .addOptions([
        {
          label: 'Emoji ID',
          value: 'emojiidogren',
          description: 'Emojinin ID’sini gösterir.',
          emoji: emojis.ok
        },
        {
          label: 'Emoji İndirme Linki',
          value: 'emojiurlogren',
          description: 'Emojinin indirme linkini gösterir.',
          emoji: emojis.ok
        }
      ]);

    const row = new ActionRowBuilder().addComponents(emojicartcurt);

    await message.channel.send({
      content: `Lütfen ${emoji.name} emoji bilgilerini almak için bir seçenek seçin.`,
      components: [row],
    });

    const filtreleme = (interaction) => interaction.user.id === message.author.id;
    const toplayıcı = message.channel.createMessageComponentCollector({ filtreleme });

    toplayıcı.on('collect', async (interaction) => {
      if (interaction.isSelectMenu()) {
        const secenegımemoji = interaction.values[0];

        let sonuc = '';

        if (secenegımemoji === 'emojiidogren') {
          sonuc = `**Emoji ID:** ${emoji.id}`;
        } else if (secenegımemoji === 'emojiurlogren') {
          sonuc = `**İndirme Linki:** [Tıklayınız](${emoji.url})`;
        }


        await interaction.reply({ content: sonuc, ephemeral: true });
      }
    });
  },
};
