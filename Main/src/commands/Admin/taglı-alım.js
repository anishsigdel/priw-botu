const { ButtonStyle, EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");
const realoxy = require("../../../../conf.json");
const emojis = require("../../../../Database/src/Settings/emojis.json")
const registerData  = require("../../../../Database/src/Models/tagMod");
const children = require("child_process");

module.exports = {
  aliases: ["tagli-alim","alim-mod"],
  name: 'taglı-alım',
  description: 'Taglı Alımı <kapatır/açar>.',
  category: 'Admin',
  async execute(message, args) {

   

    let data = await registerData.findOne({ guildID: realoxy.Server })
    if(!data) new registerData({guildID: realoxy.Server, tagMode: false}).save();

    let ac = new ButtonBuilder()
    .setCustomId("ac")
    .setLabel("Aktif")
    .setStyle(ButtonStyle.Secondary);

    let kapa = new ButtonBuilder()
    .setCustomId("kapa")
    .setLabel("Deaktif")
    .setStyle(ButtonStyle.Secondary);

    if (data && data.tagMode === true) {
      ac.setStyle(ButtonStyle.Success).setDisabled(true);
    } else {
      ac.setStyle(ButtonStyle.Success);
    }

    if (data && data.tagMode === false) {
      kapa.setStyle(ButtonStyle.Danger).setDisabled(true);
    } else {
      kapa.setStyle(ButtonStyle.Danger);
    }

    const row = new ActionRowBuilder()
    .addComponents([ ac, kapa ]);
  
  
    let oxy = new EmbedBuilder()  
    .setDescription(`${message.author} Taglı Modunu Aktifleştirmek ve Deaktifleştirmek için butonları kullanınız.`)
    .setFooter({ text: `Kapalı olan buton şuanki taglı modunu gösterir tekrar kullanılamaz.`})
    .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
    .setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }));

  let msg = await message.channel.send({ embeds: [oxy], components: [row] })

  var filter = button => button.user.id === message.author.id;

  let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })

  collector.on("collect", async (button) => {

    if (button.customId === "ac") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: realoxy.Server })
      data.tagMode = true;
      data.save();
      msg.edit({ content: `${emojis.onay} Taglı Alım modu başarıyla **Aktif** edildi!`, embeds: [], components: [] });
        children.exec(`pm2 restart ${realoxy.RealOwner}_Welcomer`);
      }
    if (button.customId === "kapa") {
      await button.deferUpdate();
      let data = await registerData.findOne({ guildID: realoxy.Server })
      data.tagMode = false;
      data.save();
      msg.edit({ content: `${emojis.onay} Taglı Alım modu başarıyla **Deaktif** edildi!`, embeds: [], components: [] });
    }

  })
  }
};
