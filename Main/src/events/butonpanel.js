const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ChannelType } = require('discord.js');
const emojis = require("../../../Database/src/Settings/emojis.json"); 
const Blacklist = require("../../../Database/src/Models/blacklist");
const helıkmoz = require("../../../conf.json");
const yarragımkalktı = require("../../../Database/src/Settings/questions.json"); 
const { getUserStats, getVoiceStats } = require('../../../Database/src/Functions/stat');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    const yarram = interaction.member;
    const karaliste = await Blacklist.findOne({ userId: yarram.id, isActive: true });

    if (karaliste) {
      return interaction.reply({
        content: "Üzgünüz, kara listeye alındığınız için bu işlemi gerçekleştiremezsiniz.",
        ephemeral: true,
      });
    }

    if (interaction.isButton()) {
      switch (interaction.customId) {
        case 'oxyaktiflik': {
          const guild = interaction.guild;
          const toplamUyeSayisi = guild.memberCount;
          const aktifUyeSayisi = guild.members.cache.filter(member => member.presence?.status === 'online').size;
          const sesliKanalUyeSayisi = guild.channels.cache
              .filter(channel => channel.type === ChannelType.GuildVoice)
              .map(channel => channel.members.size)
              .reduce((acc, curr) => acc + curr, 0);

          const mesaj = `
              **Sunucu Adı:** ${guild.name}
              **Toplam Üye Sayısı:** ${toplamUyeSayisi}
              **Aktif Üye Sayısı:** ${aktifUyeSayisi}
              **Toplam Seslideki Üyesi:** ${sesliKanalUyeSayisi}
          `;

          await interaction.reply({
            content: mesaj,
            ephemeral: true,
          });
          break;
        }

        case 'oxyhesap': {
          const member = interaction.member;
          const hesapAcilisTarihi = member.user.createdAt;
          const formattedDate = hesapAcilisTarihi.toLocaleString('tr-TR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          await interaction.reply({
            content: `Hesabınız **${formattedDate}** tarihinde oluşturulmuştur.`,
            ephemeral: true,
          });
          break;
        }

        case 'oxyistatistik': {
          const voiceStats = await getVoiceStats(yarram.id);
          const messageStats = await getUserStats(yarram.id);

          await interaction.reply({
            content: `Mesaj İstatistikleriniz:\nToplam mesaj sayısı: ${messageStats.messageCount}\n\nSes İstatistikleriniz:\nToplam sesli kanal süresi: ${voiceStats.totalVoiceTime} dakika`,
            ephemeral: true,
          });
          break;
        }

        case 'oxyroller': {
          const member = interaction.guild.members.cache.get(yarram.id);
          const roles = member.roles.cache
              .filter(role => role.name !== '@everyone')
              .map(role => `<@&${role.id}> (${role.name})`)
              .join('\n') || 'Hiç rolü yok.';

          await interaction.reply({
            content: `Sahip olduğunuz roller:\n${roles}`,
            ephemeral: true,
          });
          break;
        }

        case 'oxyhelp': {
          await interaction.reply({
            content: `${emojis.pikachu} Öncelikle merhaba ${yarram}! Botu kullanmak için öncelikle sunucumuzun bot komut kanalına gidip **${helıkmoz.Prefix}help** yazıp bot komut menüsüne erişmen gerekmektedir. Ardından hangi kategoriye erişmek istiyorsan açılan menüden o kategoriyi seç ve tadaa gerekli komutlar karşında! Unutma, her kategori farkli kişiler ve yetkiler üzerine kurulmuştur! ${emojis.giveaway}`,
            ephemeral: true,
          });
          break;
        }

        case 'oxybooster': {
          const guild = interaction.guild;
          const member = guild.members.cache.get(interaction.user.id);

          if (!member.premiumSince) {
            await interaction.reply({ content: `${emojis.carpi} **Panelin bu özelliğini kullanmak için Booster olmalısınız.**`, ephemeral: true });
            return;
          }

          const modal = new ModalBuilder()
              .setCustomId('isimDegistirModal')
              .setTitle('İsim Değiştirme');

          const isimInput = new TextInputBuilder()
              .setCustomId('newNickname')
              .setLabel('Yeni isminizi girin:')
              .setStyle(TextInputStyle.Short);

          const row = new ActionRowBuilder().addComponents(isimInput);
          modal.addComponents(row);
          isimInput.setPlaceholder('oxybabapro');
          await interaction.showModal(modal);
          break;
        }

        case 'oxyonerı': {
          const soru = yarragımkalktı.Sorular.oneri.onerinne;
          const soru2 = yarragımkalktı.Sorular.oneri.oneriniacikla;
          const modal = new ModalBuilder()
            .setCustomId('oxyınonerısıvarmıs')
            .setTitle('Öneri Başvuru Formu')
            .addComponents(
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxyınonerısı')
                  .setStyle(TextInputStyle.Paragraph)
                  .setMinLength(5)
                  .setMaxLength(100)
                  .setLabel(soru)
                  .setPlaceholder(soru2)
                  .setRequired(true)
              )
            );
          await interaction.showModal(modal);
          break;
        }

        case 'oxysikayet': {
          const soru = yarragımkalktı.Sorular.sikayet.sikayetinne;
          const soru2 = yarragımkalktı.Sorular.sikayet.sikayetiacikla;
          const modal = new ModalBuilder()
            .setCustomId('sikayetcimm')
            .setTitle('Şikayet Başvuru Formu')
            .addComponents(
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxysıkayetcıya')
                  .setStyle(TextInputStyle.Paragraph)
                  .setMinLength(5)
                  .setMaxLength(100)
                  .setLabel(soru)
                  .setPlaceholder(soru2)
                  .setRequired(true)
              )
            );
          await interaction.showModal(modal);
          break;
        }

        default:
          break;
      }
    }

    if (interaction.isModalSubmit()) {
      switch (interaction.customId) {
        case 'sikayetcimm': {
          const oxysıkayetcıya = interaction.fields.getTextInputValue("oxysıkayetcıya");
          const channel = interaction.guild.channels.cache.find(c => c.name === 'sikayet-log');
          const sıkayetbuton = new ButtonBuilder()
            .setCustomId("yarramınbası3")
            .setLabel("Şikayet")
            .setEmoji(emojis.sikayet)
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary);
          const row = new ActionRowBuilder().addComponents(sıkayetbuton);
          const sikayetEmbed = new EmbedBuilder()
            .setDescription(`
              **${interaction.guild.name}** Yönetimi

              Yeni Şikayet geldi!

              Şikayeti Nereden Yaptı: **Button-Panel**

              Şikayette bulunan kişi: ${interaction.user}

              Şikayeti: **${oxysıkayetcıya}**
            `);

          await interaction.reply({ content: "Şikayet Başvurunuz Başarıyla Alındı!", ephemeral: true });
          await channel.send({
            embeds: [sikayetEmbed],
            components: [row]
          });
          break;
        }

        case 'oxyınonerısıvarmıs': {
          const oneri = interaction.fields.getTextInputValue('oxyınonerısı');
          const onerılog = interaction.guild.channels.cache.find(c => c.name === 'oneri-log');
          const onerıbuton = new ButtonBuilder()
            .setCustomId("yarramınbası")
            .setLabel("Öneri")
            .setEmoji(emojis.oneri)
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary);
          const row = new ActionRowBuilder().addComponents(onerıbuton);
          const embedOneri = new EmbedBuilder()
            .setDescription(`
              **${interaction.guild.name}** Yönetimi


              Öneriyi Nereden Yaptı: **Button-Panel**

              Yeni Öneri Başvurusu geldi!

              Öneriyi yapan kişi: ${interaction.user}

              Öneri: **${oneri}**
            `);

          await interaction.reply({ content: "Öneri Başvurunuz Başarıyla Alındı!", ephemeral: true });
          await onerılog.send({
            embeds: [embedOneri],
            components: [row]
          });
          break;
        }

        default:
          break;
      }
    }
  }
};
