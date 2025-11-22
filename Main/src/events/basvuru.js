const { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emojis = require("../../../Database/src/Settings/emojis.json"); 
const Blacklist = require("../../../Database/src/Models/blacklist");
const yarragımkalktı = require("../../../Database/src/Settings/questions.json") 

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

    if (interaction.isSelectMenu()) {
      if (interaction.customId === 'basvurusebebim') {
        const basvuruTuru = interaction.values[0];
        let modal;

        
        if (basvuruTuru === 'basvuru') {
            const soru = yarragımkalktı.Sorular.basvuru.isim.isminne
            const soru2 = yarragımkalktı.Sorular.basvuru.isim.isim
            const soru3 = yarragımkalktı.Sorular.basvuru.yas.yasinkac
            const soru4 = yarragımkalktı.Sorular.basvuru.yas.yas
            const soru5 = yarragımkalktı.Sorular.basvuru.sebep.nedenytolmakıstıonaq
            const soru6 = yarragımkalktı.Sorular.basvuru.sebep.yetkılıolmasebebım
            const soru7 = yarragımkalktı.Sorular.basvuru.kurallar.kurallarıokudugunukabuledıonmu
            const soru8 = yarragımkalktı.Sorular.basvuru.kurallar.kurallarıokudunmu
          modal = new ModalBuilder()
            .setCustomId('yetkili_basvuru')
            .setTitle('Yetkili Başvuru Formu')
            .addComponents(
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxy')
                  .setStyle(1)
                  .setMinLength(1)
                  .setMaxLength(20)
                  .setLabel(soru)
                  .setPlaceholder(soru2)
                  .setStyle(TextInputStyle.Short)
                  .setRequired(true)
              ),
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxy2')
                  .setStyle(1)
                  .setMinLength(2)
                  .setMaxLength(2)
                  .setLabel(soru3)
                  .setPlaceholder(soru4)
                  .setStyle(TextInputStyle.Short)
                  .setRequired(true)
              ),
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxy3')
                  .setStyle(1)
                  .setMinLength(5)
                  .setMaxLength(100)
                  .setLabel(soru5)
                  .setPlaceholder(soru6)
                  .setStyle(TextInputStyle.Paragraph)
                  .setRequired(true)
              ),
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxy4')
                  .setStyle(1)
                  .setMinLength(5)
                  .setMaxLength(10)
                  .setLabel(soru7)
                  .setPlaceholder(soru8)
                  .setStyle(TextInputStyle.Short)
                  .setRequired(true)
              )
            );
        } else if (basvuruTuru === 'onerimvar') {
            const soru = yarragımkalktı.Sorular.oneri.onerinne
            const soru2 = yarragımkalktı.Sorular.oneri.oneriniacikla
          modal = new ModalBuilder()
            .setCustomId('oneri_basvuru')
            .setTitle('Öneri Başvuru Formu')
            .addComponents(
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxy5')
                  .setStyle(1)
                  .setMinLength(5)
                  .setMaxLength(100)
                  .setLabel(soru)
                  .setPlaceholder(soru2)
                  .setStyle(TextInputStyle.Paragraph)
                  .setRequired(true)
              )
            );
        } else if (basvuruTuru === 'sıkayetımvar') {
            const soru = yarragımkalktı.Sorular.sikayet.sikayetinne
            const soru2 = yarragımkalktı.Sorular.sikayet.sikayetiacikla
          modal = new ModalBuilder()
            .setCustomId('sikayet_basvuru')
            .setTitle('Şikayet Başvuru Formu')
            .addComponents(
              new ActionRowBuilder().addComponents(
                new TextInputBuilder()
                  .setCustomId('oxy1')
                  .setStyle(1)
                  .setMinLength(5)
                  .setMaxLength(100)
                  .setLabel(soru)
                  .setPlaceholder(soru2)
                  .setStyle(TextInputStyle.Paragraph)
                  .setRequired(true)
              )
            );
        }

        
        await interaction.showModal(modal);
      }
    }

   
    if (interaction.isModalSubmit()) {
      let channel;
      if (interaction.customId === 'sikayet_basvuru') {
        const oxy1 = interaction.fields.getTextInputValue("oxy1");
        const channel = interaction.guild.channels.cache.find(c => c.name === 'sikayet-log');
        const sıkayetbuton = new ButtonBuilder()
        .setCustomId("yarramınbası3")
        .setLabel("Şikayet")
        .setEmoji(emojis.sikayet)
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary)
        const row = new ActionRowBuilder().addComponents(sıkayetbuton);
        const sikayetEmbed = new EmbedBuilder()
          .setDescription(`
                   **${interaction.guild.name}** Yönetimi

                   Yeni Şikayet geldi!

                   Şikayeti Nereden Yaptı: **Başvuru-Panel**
            
                   Şikayette bulunan kişi ${interaction.user}
           
                   Şikayeti: **${oxy1}**`);
            await interaction.reply({content:"Şikayet Başvurunuz Başarıyla Alındı!", ephemeral: true});
        await channel.send({
          embeds: [sikayetEmbed], components:[row]
        }
    );

      } else if (interaction.customId === 'yetkili_basvuru') {

        const isim = interaction.fields.getTextInputValue('oxy');
        const yas = interaction.fields.getTextInputValue('oxy2');
        const nedenYetkili = interaction.fields.getTextInputValue('oxy3');
        const kurallar = interaction.fields.getTextInputValue('oxy4');

        const channel = interaction.guild.channels.cache.find(c => c.name === 'basvuru-log');
        const basvurubuton = new ButtonBuilder()
        .setCustomId("yarramınbası2")
        .setLabel("Başvuru")
        .setEmoji(emojis.basvuru)
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary)
        const row = new ActionRowBuilder().addComponents(basvurubuton);
        const embedYetkili = new EmbedBuilder()
          .setDescription(`
            **${interaction.guild.name}** Yönetimi

            Yeni Yetkili Başvurusu geldi!

            Başvuruyı Nereden Yaptı: **Başvuru-Panel**


            Başvuruyu yapan kişi: ${interaction.user}

            İsim: **${isim}**

            Yaş: **${yas}**

            Neden Yetkili Olmak İstiyor: **${nedenYetkili}**

            Kuralları kabul ediyor mu?: **${kurallar}**`);
            await interaction.reply({content:"Yetkili Başvurunuz Başarıyla Alındı!", ephemeral: true});
        await channel.send({
          embeds: [embedYetkili]
        });
      } else if (interaction.customId === 'oneri_basvuru') {
        const oneri = interaction.fields.getTextInputValue('oxy5');

      
        const onerılog = interaction.guild.channels.cache.find(c => c.name === 'oneri-log');
        const onerıbuton = new ButtonBuilder()
        .setCustomId("yarramınbası")
        .setLabel("Öneri")
        .setEmoji(emojis.oneri)
        .setDisabled(true)
        .setStyle(ButtonStyle.Secondary)
        const row = new ActionRowBuilder().addComponents(onerıbuton);
        const embedOneri = new EmbedBuilder()
          .setDescription(`
            **${interaction.guild.name}** Yönetimi

            Yeni Öneri Başvurusu geldi!

            Öneriyi Nereden Yaptı: **Başvuru-Panel**

            Öneriyi yapan kişi: ${interaction.user}

            Öneri: **${oneri}**`);
            await interaction.reply({content: "Öneri Başvurunuz Başarıyla Alındı!", ephemeral: true});
        await onerılog.send({
          embeds: [embedOneri], components:[row]
        });
      }
    }
  },
};
