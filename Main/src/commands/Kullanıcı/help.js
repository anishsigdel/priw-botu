const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle, ModalBuilder,TextInputBuilder,TextInputStyle } = require('discord.js');
const emojis = require("../../../../Database/src/Settings/emojis.json");
const ayar = require("../../../../conf.json");

module.exports = {
  name: 'help',
  aliases: ["yardım", "y", "h", "yardim"],
  description: 'Bot komutları ve kullanım şekli gösterilir. ',
  category: 'Kullanıcı',
  async execute(message) {
    const commands = message.client.commands;

    const komutgrubu = {};

    commands.forEach(command => {
      const kategori = command.category;
      if (!komutgrubu[kategori]) {
        komutgrubu[kategori] = [];
      }
      komutgrubu[kategori].push(command);
    });

    const menusenecekler = Object.keys(komutgrubu).map(kategori => ({
      label: kategori,
      value: kategori,
      emoji: emojis.pikachu,
      description: `${kategori} kategorisine ait komutları görüntüleyin.`,
    }));

    const butonum = new ButtonBuilder()
      .setCustomId("helparamabutonu")
      .setStyle(ButtonStyle.Secondary)
      .setLabel("Komut Ara")
      .setEmoji("1198105121020719144");

    const menucugum = new SelectMenuBuilder()
      .setCustomId('yardım_kategorisi')
      .setPlaceholder('Bir kategori seçin...')
      .addOptions(menusenecekler);

    const row = new ActionRowBuilder().addComponents(menucugum);
    const row2 = new ActionRowBuilder().addComponents(butonum);
    const kategoriler = Object.keys(komutgrubu).length;

    const oxysex = new EmbedBuilder()
      .setImage("https://media.discordapp.net/attachments/1329191932353839228/1330650839387471933/oxy_1.png?ex=678ec0aa&is=678d6f2a&hm=91f0ee5fd806bf3e9da19fa0c4ebd5d29fe1249756cca15b9e2f038a316790da&=&format=webp&quality=lossless&width=1440&height=576")
      .setDescription(`Merhaba ${message.author} ${emojis.pikachu}, Nasılsın? Umarım iyisindir!\n\n${emojis.ayarlar} Aşağıda bot tarafından otomatik oluşturulmuş kategoriler bulunmaktadır.\nToplam \`${message.client.commands.size}\` komut bulunmaktadır${emojis.pikachu}. Toplam \`${kategoriler}\` kategori bulunmaktadır!\n\n${emojis.developer} Bu Bot **${ayar.RealOwner}** tarafından **${message.guild.name}** adlı sunucuya özel yapılmıştır.\n${emojis.sikayet} Herhangi bir **istek & şikayet** veya **öneri & hatayı** **[oxy'e](https://discord.com/users/980449798207438908)** bildirebilirsin.\n\nİyi Eğlenceler ${emojis.giveaway}`);

    const mesaj = await message.channel.send({
      embeds: [oxysex],
      components: [row, row2],
    });

    const filter = (interaction) => interaction.user.id === message.author.id; 
    const collector = mesaj.createMessageComponentCollector({
      filter,
    });
    const filtre = (interaction) => interaction.user.id === message.author.id; 
    const collectim = mesaj.createMessageComponentCollector({
      filtre,
    });


    collectim.on('collect', async (interaction) => {
      if (!interaction.isButton()) return;
      
        if (interaction.customId === 'helparamabutonu') {
          const modal = new ModalBuilder()
            .setCustomId('command_search_modal')
            .setTitle('Komut Arama')
            .addComponents(
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('command_name') 
                  .setLabel('Komut Adını Girin')
                  .setStyle(TextInputStyle.Short)
                  .setPlaceholder('Örnek: ban')
                  .setRequired(true)
              )
            );
      
          await interaction.showModal(modal);
          }
    })
    collector.on('collect', async (interaction) => {
      if (interaction.isSelectMenu()) {
      }})
    collector.on('collect', async (interaction) => {
      if (interaction.isSelectMenu()) {
        const kategori = interaction.values[0];

        let embed = new EmbedBuilder()
          .setTitle(`${kategori} Komutları`);

        let description = '';

        komutgrubu[kategori].forEach(command => {
          description += ` ${emojis.dot} **${ayar.Prefix}${command.name}**: ${command.description}\n`;
        });

        embed.setDescription(description);

        const sıkısbuton = new ButtonBuilder()
          .setCustomId("anamenu")
          .setStyle(ButtonStyle.Secondary)
          .setLabel("Ana Menüye Dön.");

        const donusbuton = new ActionRowBuilder().addComponents(sıkısbuton);

        try {
          await interaction.update({ embeds: [embed], components: [row, donusbuton] });
        } catch (err) {
          console.error('Güncellenemedi:', err);
        }
      }

      if (interaction.isButton() && interaction.customId === 'anamenu') {
        try {
          await interaction.update({
            embeds: [oxysex],
            components: [row, row2],
          });
        } catch (err) {
          console.error('Ana Menü Gösterilemedi:', err);
        }
      }
    });
  },
};
