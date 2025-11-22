const { Discord, EmbedBuilder, AttachmentBuilder, ClientUser, hyperlink, PermissionsBitField, ButtonStyle, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const canvafy = require('canvafy');
const conf = require("../../../../Database/src/Settings/settings.json");
const ayar = require("../../../../Database/src/Settings/images.json");
const {oxycik,carpi,basvuru,onay} = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'ship',
  aliases: ["ask","aşk","love"],
  description: 'Ship oyunu oynatır: .ship <oxy/id>',
  category: 'Kullanıcı',
  async execute(message, args) { 
    if (!args[0]) {
      
      await message.react(carpi);
    
      return message.reply('**Lütfen birini etiketle!**').then((e) => setTimeout(() => { e.delete(); }, 10000)); 
    }
const mentionedMembers = Array.from(message.mentions.members.values());
let user = mentionedMembers[0] || message.guild.members.cache.get(args[0]);
let user2 = mentionedMembers[1] || message.guild.members.cache.get(args[1]);

if (user.id === message.author.id) {
  await message.react(carpi);
  return message.reply("**Kendinle ship yapamazsın! Lütfen başka birini etiketle.**").then((e) => setTimeout(() => { e.delete(); }, 10000));
}

const maleRoleIds = conf.verificationRole;
const femaleRoleIds = conf.womanRole;

if (!user && !user2) {
  user = message.member;
  let userGenderRole = null;

  if (user.roles.cache.has(maleRoleIds)) {
    userGenderRole = 'male';
    user2 = message.guild.members.cache.filter(member => member.roles.cache.has(femaleRoleIds) && !member.user.bot).random();
  } else if (user.roles.cache.has(femaleRoleIds)) {
    userGenderRole = 'female';
    user2 = message.guild.members.cache.filter(member => member.roles.cache.has(maleRoleIds) && !member.user.bot).random();
  } else {
    user2 = message.guild.members.cache.filter(member => !member.user.bot && member.id !== message.author.id).random();
  }
} else if (!user2) {
  user2 = user;
  user = message.member;
}

if (user2.user.bot || user.user.bot) {
  message.channel.send({ content: `**Botlarla Ship Yapamazsın!**` }).then(msg => {
  
    msg.react(carpi); 

    setTimeout(() => {
      msg.delete(); 
    }, 5000);
  });
}


const specialUserIds = ['980449798207438908', '1413529323704549547'];
let customNumber = Math.floor(Math.random() * 101);

if ((user.id === specialUserIds[0] && user2.id === specialUserIds[1]) || (user.id === specialUserIds[1] && user2.id === specialUserIds[0])) {
  customNumber = 100;
}
// Güvenli background URL oluştur
let backgroundUrl = ayar.Pngs.shipArkaPlan; // Varsayılan background
const guildBanner = message.guild.bannerURL({extension:"png",size:2048});
if (guildBanner) {
  backgroundUrl = guildBanner;
}

let ship;
try {
  ship = await new canvafy.Ship()
    .setAvatars(user.user.displayAvatarURL({ dynamic: true, extension: "png" }), user2.user.displayAvatarURL({ dynamic: true, extension: "png" }))
    .setBackground("image", backgroundUrl)
    .setBorder("#ffffff")
    .setCustomNumber(customNumber)
    .setOverlayOpacity(0.5)
    .build();
} catch (error) {
  // Eğer background hatası varsa, varsayılan background ile tekrar dene
  try {
    ship = await new canvafy.Ship()
      .setAvatars(user.user.displayAvatarURL({ dynamic: true, extension: "png" }), user2.user.displayAvatarURL({ dynamic: true, extension: "png" }))
      .setBackground("color", "#7289da") // Varsayılan renk background
      .setBorder("#ffffff")
      .setCustomNumber(customNumber)
      .setOverlayOpacity(0.5)
      .build();
  } catch (secondError) {
    // Son çare olarak gradient background kullan
    ship = await new canvafy.Ship()
      .setAvatars(user.user.displayAvatarURL({ dynamic: true, extension: "png" }), user2.user.displayAvatarURL({ dynamic: true, extension: "png" }))
      .setBackground("gradient", ["#7289da", "#99aab5"])
      .setBorder("#ffffff")
      .setCustomNumber(customNumber)
      .setOverlayOpacity(0.5)
      .build();
  }
}

let button = new ButtonBuilder();
if (customNumber >= 80) {
  button.setCustomId('tanis')
    .setLabel('Tanış')
    .setEmoji(oxycik)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(false);
} else {
  button.setCustomId('tanis_disabled')
    .setLabel('Tanış')
    .setEmoji(carpi)
    .setStyle(ButtonStyle.Secondary)
    .setDisabled(true);
}

const row = new ActionRowBuilder().addComponents(button);

const sentMessage = await message.reply({
  content: `              **${user.user.tag} ${oxycik} ${user2.user.tag}**`,
  files: [{
    attachment: ship,
    name: `ship-${message.member.id}.png`
  }],
  components: [row]
});

const filter = (interaction) => interaction.customId === 'tanis' && interaction.user.id === message.author.id;
const collector = sentMessage.createMessageComponentCollector({ filter, time: 60000 });

collector.on('collect', async (interaction) => {
  if (interaction.customId === 'tanis') {
    // First, acknowledge the interaction immediately to prevent timeout
    await interaction.deferUpdate();
    
    try {
      // Then send the DM
      await user2.send({
        content: `**Merhaba! ${user} seninle tanışmak istiyor.**\n\n> **Sende tanışmak istiyorsan \`${interaction.guild.name}\` sunucunda onunla tanışabilirsin.** ${basvuru} \n> **Eğer Bu durumdan şikayetçi olmaya başlarsan oxy ile iletişime geç.**${onay}`,
        files: [{ attachment: ship, name: `ship-${message.member.id}.png` }]
      });

      const updatedButton = new ButtonBuilder()
        .setCustomId('tanisildi')
        .setLabel('Tanışıldı')
        .setEmoji(onay)
        .setStyle(ButtonStyle.Secondary)
        .setDisabled(true);

      const updatedRow = new ActionRowBuilder().addComponents(updatedButton);

      // Now update the message with the new button
      await interaction.editReply({ components: [updatedRow] });

    } catch (err) {
      if (err.code === 50007) { 
        await interaction.followUp({
          content: `Bu kullanıcı DMlerini kapalı tutuyor, bu yüzden tanışma isteği gönderilemedi. ${carpi}`,
          ephemeral: true
        });
      } else {
        console.error("Error in ship command:", err);
      }
    }
  }
});
collector.on('end', async (collected, reason) => {
  if (reason === 'time' && customNumber >= 80) {
    const disabledButton = new ButtonBuilder(button)
      .setLabel('Tanışma süresi doldu')
      .setEmoji(carpi)
      .setCustomId('suredoldu')
      .setStyle(ButtonStyle.Secondary)
      .setDisabled(true);

    const disabledRow = new ActionRowBuilder().addComponents(disabledButton);
    await sentMessage.edit({ components: [disabledRow] }).catch();
  }
});
}
}