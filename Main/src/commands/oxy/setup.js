const { ComponentType, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder, ChannelType, ButtonBuilder, ButtonStyle } = require("discord.js");
const { RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");
const sex = require("../../../../conf.json");
const ayar = require("../../../../Database/src/Settings/settings.json");
const emojis = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'setup',
  aliases: ["server-configs","config"],
  description: 'Sunucu kurulumu yapar.',
  category: 'oxy',
  async execute(message) {

   
    if (!message.guild) {
      return message.reply({ content: "Bu komutu sadece sunucuda kullanabilirsin!", ephemeral: true });
    }

    if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: "Bot geliştiricisi olmadığın için kurulum panelini kullanamazsın.", ephemeral: true });
    }
    const toplamkomut = message.client.commands.size;
const amınakoyıyımya = new EmbedBuilder()
.setDescription(`
      Merhaba ${message.author} ${emojis.pikachu}\n
      ${emojis.developer} Bu Bot **${sex.RealOwner}** tarafından yapılmıştır.

      ${emojis.ok} İçerisinde **${toplamkomut}** komut vardır.

      ${emojis.ok} Botun yapım amacı; __Bot__ ve __Tasarım__ sunucularına **Manager** botu niteliği taşıması.

      ${emojis.ucgen} **__Ek olarak içerisinde Setup, Kurulum ve Blacklist sistemi mevcuttur.__**`)

      const oxyskismeyisever = new ButtonBuilder()
      .setCustomId("yarramkalkti")
      .setDisabled(true)
      .setLabel(sex.Text)
      .setStyle(ButtonStyle.Secondary)
      const supportsunujum = new ButtonBuilder()
      .setLabel("oxy")            
      .setStyle(ButtonStyle.Link)         
      .setEmoji(emojis.developer)         
      .setURL("https://discord.gg/para");
      const urlmizigeriverilann = new ActionRowBuilder().addComponents(oxyskismeyisever,supportsunujum)
    const oxycokseksi = new EmbedBuilder()
    .setDescription(`
      Merhaba ${message.author} ${emojis.pikachu}. Aşağıdaki Menüden Setup İşlemlerini Gerçekleştirebilirsin.\n
      ${emojis.sebep} - **Bot Kurulum Liste:** Bot kurulum listesindeki kayıtlı verileri gösterir.\n${emojis.ayarlar} - **Kurulum Yap:** Kurulum için gerekli menüleri gösterir.`)
      .setFooter({ text: sex.Text})
    const row = new ActionRowBuilder().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Bot Kurulum bilgilendirme için tıklayınız')
        .addOptions([
          { label: 'Kurulum Yap', description: 'Kurulum için gerekli menüleri gösterir.',emoji: emojis.ok, value: 'kurulumyap' },
          { label: 'Bot Kurulum Liste', description: 'Bot kurulum listesindeki kayıtlı verileri gösterir.', emoji: emojis.ok, value: 'kurulumliste' },
          { label: 'Bot İnfo', description: 'Bot Bilgilendirme.', emoji: emojis.developer, value: 'informationsex' },
        ])
    );


    message.channel.send({ embeds: [oxycokseksi], components: [row] });

    const veriler = new EmbedBuilder()
      .setDescription(`${message.author.toString()},**${message.guild.name}** adlı sunucu için bota kurulmuş veya kurulmamış tüm verileri görüntüleyebilirsiniz.

\`\`\`fix\n- SUNUCU KURULUM VERİLERİ -\`\`\`

${emojis.ayarlar} **Kanallar:**
${emojis.yaprak} Ticket Channel: ( <#${ayar.ticketChannel ? ayar.ticketChannel : "YOK"}> )
${emojis.yaprak} Kurallar Kanalı: ( <#${ayar.kurallar ? ayar.kurallar : "YOK"}> )
${emojis.yaprak} Register Channel: ( <#${ayar.registerChannel ? ayar.registerChannel : "YOK"}> )
${emojis.yaprak} Chat Channel: ( <#${ayar.chatChannel ? ayar.chatChannel : "YOK"}> )
${emojis.yaprak} İnvite-Log: ( <#${ayar.invLog ? ayar.invLog : "YOK"}> )
${emojis.yaprak} Secret Voice: ( <#${ayar.secretVoice ? ayar.secretVoice : "YOK"}>)

${emojis.ayarlar} **Roller:**
${emojis.yaprak} Ticket Staff: ( <@&${ayar.ticketStaff ? ayar.ticketStaff : "YOK"}> )
${emojis.yaprak} Register Staff: ( <@&${ayar.registerStaff ? ayar.registerStaff : "YOK"}> )
${emojis.yaprak} Oto-Role: ( <@&${ayar.otoRole ? ayar.otoRole : "YOK"}>)
${emojis.yaprak} Doğrulanmış-Role: ( <@&${ayar.verificationRole ? ayar.verificationRole : "YOK"}>)
${emojis.yaprak} Booster-Role: ( <@&${ayar.boosterRole ? ayar.boosterRole : "YOK"}>)
${emojis.yaprak} Woman-Role: ( <@&${ayar.womanRole ? ayar.womanRole : "YOK"}>)
${emojis.yaprak} Man-Role: ( <@&${ayar.manRole ? ayar.manRole : "YOK"}>)
${emojis.yaprak} Vip-Role: ( <@&${ayar.vipRole ? ayar.vipRole : "YOK"}>)

${emojis.ayarlar} **Kategoriler:**
${emojis.yaprak} Ticket Kategori: ( <#${ayar.TicketParent ? ayar.TicketParent : "YOK"}> )
${emojis.yaprak} Secret Kategori: ( <#${ayar.secretParent ? ayar.secretParent : "YOK"}>)
${emojis.yaprak} Public Kategori: ( <#${ayar.publicParent ? ayar.publicParent : "YOK"}> )
${emojis.yaprak} Streamer Kategori: ( <#${ayar.streamerParent ? ayar.streamerParent : "YOK"}>)

${emojis.ayarlar} **Diğer:**
${emojis.developer} Bot Owner: (${sex.Devs.length > 0 ? `${sex.Devs.map(x => `<@${x}>`).join(",")}` : "\`YOK\`"})







`)
      .setFooter({
        text: message.author.tag,
        iconURL: message.author.displayAvatarURL({ dynamic: true })
      });


    const filter = i => i.user.id === message.author.id;
    const collector = message.channel.createMessageComponentCollector({ filter, componentType: ComponentType.StringSelect, max: 2 });

    collector.on("collect", async (interaction) => {
      if (interaction.customId === 'select') {
        const secimyap = interaction.values[0];

        if (secimyap === "kurulumliste") {
        
          await interaction.reply({ embeds: [veriler], ephemeral: true });
          return; 
        }

        if (secimyap === "informationsex") {
        
          await interaction.reply({ embeds: [amınakoyıyımya], components: [urlmizigeriverilann], ephemeral: true });
          return; 
        }

      
        if (secimyap === "kurulumyap") {
          await interaction.reply({ content: "Kurulum yapman için gerekli menüleri oluşturdum.", ephemeral: true });
          
          const kanalsetup = [
            { name: "ticketChannel", conf: "ticketChannel", cmdName: "Destek Kanalı" },
            { name: "chatChannel", conf: "chatChannel", cmdName: "Sohbet Kanalı" },
            { name: "kurallar", conf: "kurallar", cmdName: "Kurallar" },
            { name: "invLog", conf: "invLog", cmdName: "İnvite Log" },
            { name: "registerChannel", conf: "registerChannel", cmdName: "Kayıt Kanalı" }
          ];

          const rolsetup = [
            { name: "ticketStaff", conf: "ticketStaff", cmdName: "Destek Yetkilisi" },
            { name: "otoRole", conf: "otoRole", cmdName: "Oto Rol." },
            { name: "vipRole", conf: "vipRole", cmdName: "VIP Rol." },
            { name: "boosterRole", conf: "boosterRole", cmdName: "Booster Rolü." },
            { name: "registerStaff", conf: "registerStaff", cmdName: "Regiytser (Yt) Rolü." },
            { name: "womanRole", conf: "womanRole", cmdName: "Kadın Rolü." },
            { name: "streamerRole", conf: "streamerRole", cmdName: "Yayıncı Rolü." },
            { name: "verificationRole", conf: "verificationRole", cmdName: "Doğrulanmış Hesap Rolü." },
          ];

          const voicesetup = [
            { name: "secretVoice", conf: "secretVoice", cmdName: "(Özel) Oda Ses" }
          ];

          const kategorisetup = [
            { name: "TicketParent", conf: "TicketParent", cmdName: "Destek Kategorisi" },
            { name: "secretParent", conf: "secretParent", cmdName: "(Özel) Oda Kategorisi" }
          ];

       
          voicesetup.forEach(async (x) => {
            const selectMenu = new ActionRowBuilder()
              .addComponents(
                new ChannelSelectMenuBuilder()
                  .setCustomId(x.conf)
                  .addChannelTypes(ChannelType.GuildVoice)
                  .setMaxValues(1)
              );
            
            const msg = await message.channel.send({ content: `${emojis.oneri} Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] });

            const channelCollector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 });

            channelCollector.on("collect", async (interaction) => {
              const channel = interaction.values[0];
              if (channel) {
                global.setupdb.set(x.conf, channel);
                await interaction.update({ content: `**${x.cmdName}** olarak <#${channel}> başarıyla eklendi ${emojis.onay}`, components: [] });
              }
            });
          });
          kanalsetup.forEach(async (x) => {
            const selectMenu = new ActionRowBuilder()
              .addComponents(
                new ChannelSelectMenuBuilder()
                  .setCustomId(x.conf)
                  .addChannelTypes(ChannelType.GuildText)
                  .setMaxValues(1)
              );
            
            const msg = await message.channel.send({ content: `${emojis.oneri} Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** seçiniz.`, components: [selectMenu] });

            const channelCollector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 });

            channelCollector.on("collect", async (interaction) => {
              const channel = interaction.values[0];
              if (channel) {
                global.setupdb.set(x.conf, channel);
                await interaction.update({ content: `**${x.cmdName}** olarak <#${channel}> başarıyla eklendi ${emojis.onay}`, components: [] });
              }
            });
          });

       
          rolsetup.forEach(async (x) => {
            const selectMenu = new ActionRowBuilder()
              .addComponents(
                new RoleSelectMenuBuilder()
                  .setCustomId(x.conf)
                  .setMaxValues(1)
              );

            const msg = await message.channel.send({ content: `${emojis.oneri} Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** rolünü seçiniz.`, components: [selectMenu] });

            const roleCollector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.RoleSelect, max: 1 });

            roleCollector.on("collect", async (interaction) => {
              const role = interaction.values[0];
              if (role) {
                global.setupdb.set(x.conf, role);
                await interaction.update({ content: `**${x.cmdName}** olarak <@&${role}> başarıyla eklendi ${emojis.onay} `, components: [] });
              }
            });
          });

        
          kategorisetup.forEach(async (x) => {
            const selectMenu = new ActionRowBuilder()
              .addComponents(
                new ChannelSelectMenuBuilder()
                  .setCustomId(x.conf)
                  .addChannelTypes(ChannelType.GuildCategory)
                  .setMaxValues(1)
              );

            const msg = await message.channel.send({ content: `${emojis.oneri} Aşağıdaki menüden kurmak istediğiniz **${x.cmdName}** kategorisini seçiniz.`, components: [selectMenu] });

            const categoryCollector = msg.createMessageComponentCollector({ filter, componentType: ComponentType.ChannelSelect, max: 1 });

            categoryCollector.on("collect", async (interaction) => {
              const category = interaction.values[0];
              if (category) {
                global.setupdb.set(x.conf, category);
                await interaction.update({ content: `**${x.cmdName}** olarak <#${category}> başarıyla eklendi ${emojis.onay}`, components: [] });
              }
            });
          });
        }
      }
    });
  }
};
