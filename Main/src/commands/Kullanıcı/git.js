const { EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder, PermissionsBitField, ChannelType } = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");
const moment = require("moment");
const client = global.bot;

module.exports = {
  name: 'git',
  aliases: ["götür"],
  description: 'Etiketlediğiniz kullanıcının bulunduğunuz sese gidersiniz. <oxy/id>',
  category: 'Kullanıcı',
  async execute(message, embed) {
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    if (!message.member.voice.channel || message.member.voice.channel.type !== ChannelType.GuildVoice) {
      return message.reply({ content: "Bir ses kanalında olmalısın!" });
    }
    if (!member) {
      return message.reply({ content: "Bir üye etiketle ve tekrardan dene!" });
  }
    if (!member.voice.channel) {
      return message.reply({ content: "Bu kullanıcı herhangi bir ses kanalında bulunmuyor!" });
  }
    if (message.member.voice.channel === member.voice.channel) {
      return message.reply({ content: "Zaten aynı kanaldasınız!" });
  }
  
  const row = new ActionRowBuilder()
  .addComponents(
  
  new ButtonBuilder()
  .setCustomId("onay")
  .setLabel("Kabul Et")
  .setStyle(ButtonStyle.Success)
  .setEmoji("915754671728132126"),
  
  new ButtonBuilder()
  .setCustomId("oxy_denial")
  .setLabel("Reddet")
  .setStyle(ButtonStyle.Danger)
  .setEmoji("920412153712889877"),
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
  
  const embedyarrak = new EmbedBuilder()
  .setThumbnail(message.author.avatarURL({ dynamic: true, size: 2048 }))
  .setDescription(`${message.author}, ${member} kişisini yanınıza gittiniz.`);
    if (message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
        message.member.voice.setChannel(member.voice.channel.id)
        message.react(onay)
        message.reply({ embeds: [embedyarrak]})
        const log = new EmbedBuilder()
        .setDescription(`
       Bir Transport işlemi (*Gitme*) gerçekleşti.
    
        Odaya Giden Kullanıcı: ${member} - \`${member.id}\`
        Odasına Gidilen Yetkili: ${message.author} - \`${message.author.id}\`
        `)
        .setFooter({ text: `${moment(Date.now()).format("LLL")}`})
        client.channels.cache.find(x => x.name == "transport-log").send({ embeds: [log] });
  } else {    
  
  let oxycimgit = new EmbedBuilder()
  .setDescription(`${member}, ${message.author} \`${member.voice.channel.name}\` odasına gelmek istiyor. Kabul ediyor musun?`)
  .setFooter({ text: `30 saniye içerisinde işlem iptal edilecektir.`})
  .setAuthor({ name: member.displayName, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
  
  let msg = await message.channel.send({ content: `${member}`, embeds: [oxycimgit], components: [row] })
  
  var filter = button => button.user.id === member.user.id;
  
  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
  
  collector.on("collect", async (button) => {
  
  if(button.customId === "onay") {
    await button.deferUpdate();
  
  const embeds = new EmbedBuilder() 
  .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
  .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
  .setTimestamp()
  .setDescription(`${message.author}, ${member} kişisinin yanına başarıyla gittiniz.`)
  
  message.member.voice.setChannel(member.voice.channel.id)
  
  msg.edit({
  embeds: [embeds],
  components : [row2]
  })
  
  }
  
  if(button.customId === "oxy_denial") {
    await button.deferUpdate();
  
  const embedss = new EmbedBuilder() 
  .setAuthor({ name: member.displayName, iconURL: member.user.avatarURL({ dynamic: true })})
  .setFooter({ text: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true })})
  .setTimestamp()
  .setDescription(`${message.author}, ${member} yanına gitme işlemi iptal edildi.`)
  
  msg.edit({
    embeds: [embedss],
    components : [row3]
  })
      }
   });
  
  }
  }
  }
  