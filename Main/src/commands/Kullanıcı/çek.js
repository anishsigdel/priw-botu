const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField, ChannelType} = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");
const moment = require("moment");
const client = global.bot;

module.exports = {
  name: 'çek',
  aliases: ["gel","getir"],
  description: 'Etiketlediğiniz kullanıcıyı bulunduğunuz sese çeker. <oxy/id>',
  category: 'Kullanıcı',
  async execute(message) {
    const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!message.member.voice.channel || message.member.voice.channel.type !== ChannelType.GuildVoice) {
      return message.reply({ content: "Bir ses kanalında olmalısın!" });
    }

 
    if (!member) {
      return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
    }

    if (!member.voice || !member.voice.channel) {
      return message.reply({ content: "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!" });
    }

    if (message.member.voice.channel.id === member.voice.channel.id) {
      return message.reply({ content: "Zaten aynı kanaldasınız!" });
    }

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("oxy_okey")
          .setLabel("Kabul Et")
          .setStyle(ButtonStyle.Success)
          .setEmoji(onay),
        new ButtonBuilder()
          .setCustomId("oxy_no")
          .setLabel("Reddet")
          .setStyle(ButtonStyle.Danger)
          .setEmoji(carpi),
      );

    const row2 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("onayy")
          .setLabel("İşlem Başarılı")
          .setStyle(ButtonStyle.Success)
          .setDisabled(true),
      ); 
    
    const row3 = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setCustomId("redd")
          .setLabel("İşlem Başarısız")
          .setStyle(ButtonStyle.Danger)
          .setDisabled(true),
      );

    const onayembed = new EmbedBuilder()
      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
      .setDescription(`${message.author}, ${member} kişisini yanınıza taşıdınız.`);

    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      member.voice.setChannel(message.member.voice.channel.id);
      message.react(onay);
      message.reply({ embeds: [onayembed] });

      const transport = new EmbedBuilder()
        .setDescription(`
          Bir Transport işlemi (*Çekme*) gerçekleşti.

          Odaya Taşınan Kullanıcı: ${member} - \`${member.id}\`
          Odasına Taşıyan Kullanıcı: ${message.author} - \`${message.author.id}\`
        `)
        .setFooter({ text: `${moment(Date.now()).format("LLL")}` });
        
      client.channels.cache.find(x => x.name == "transport-log").send({ embeds: [transport] });

    } else {
      let oxycimcek = new EmbedBuilder()  
        .setDescription(`${member}, ${message.author} \`${message.member.voice.channel.name}\` odasına seni çekmek istiyor. Kabul ediyor musun?`)
        .setFooter({ text: `30 saniye içerisinde işlem iptal edilecektir.` })
        .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) });

      let msg = await message.channel.send({ content: `${member}`, embeds: [oxycimcek], components: [row] });

      var filter = button => button.user.id === member.user.id;

      let collector = await msg.createMessageComponentCollector({ filter, time: 30000 });

      collector.on("collect", async (button) => {
        if (button.customId === "oxy_okey") {
          await button.deferUpdate();
          const embeds = new EmbedBuilder()
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true }) })
            .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .setDescription(`${message.author}, ${member} kişisini yanınıza taşıdınız.`);

          member.voice.setChannel(message.member.voice.channel.id);
          msg.edit({ embeds: [embeds], components: [row2] });
        }

        if (button.customId === "oxy_no") {
          await button.deferUpdate();
          const embedss = new EmbedBuilder()
            .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true }) })
            .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setTimestamp()
            .setDescription(`${message.author}, ${member} yanına taşıma işlemi iptal edildi.`);

          msg.edit({ embeds: [embedss], components: [row3] });
        }
      });
    }
  }
};
