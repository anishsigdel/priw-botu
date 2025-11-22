const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,StringSelectMenuBuilder,ActivityType, ButtonStyle } = require("discord.js");
const moment = require("moment")
require('moment-duration-format');
const oxywashere = require("../../../../Database/src/Settings/settings.json");
const oxyishere = require("../../../../conf.json")
const emojis = require("../../../../Database/src/Settings/emojis.json");
module.exports = {
name: "özel-oda",
aliases: ["secret-panel","oda-panel"],
execute: async (client, message, args, beş_embed) => {     
    if (!message.guild) {
        return;  
      }
      
      if (!oxyishere.Devs.includes(message.author.id)) {
        return;  
      }
      
    const oxybuton = new ActionRowBuilder()
    .addComponents(
            new ButtonBuilder()
            .setEmoji(emojis.ekle)
            .setCustomId('user-ekle')
            .setStyle(ButtonStyle.Success,), 
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex1')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setEmoji(emojis.olustur)
            .setCustomId('oda-oluştur')
            .setStyle(ButtonStyle.Primary),
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex2')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setEmoji(emojis.cikar)
            .setCustomId('user-cıkar')
            .setStyle(ButtonStyle.Danger),
           
           )
           const oxybuton2 = new ActionRowBuilder()
           .addComponents(
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex3')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setEmoji(emojis.kilit)
            .setCustomId('oda-kilit')
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex4')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setEmoji(emojis.kilitac)
            .setCustomId('oda-herkes')
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex5')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
                  )
            const oxybuton3 = new ActionRowBuilder()
            .addComponents(
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex6')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setEmoji(emojis.edit)
            .setCustomId('oda-isim')
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex7')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
            new ButtonBuilder()
            .setEmoji(emojis.kick)
            .setCustomId('sesten-at')
            .setStyle('Secondary'),
            new ButtonBuilder()
            .setEmoji(emojis.bosluk)
            .setCustomId('oxysex8')
            .setDisabled(true)
            .setStyle(ButtonStyle.Secondary),
                        )

const ozelodaembed = new EmbedBuilder()
            .setDescription(`Merhaba Sevgili **${message.guild.name}** üyeleri ${emojis.giveaway} - Private Room Paneline Hoşgeldiniz.
                Sağ tarafta bulunan <#${oxywashere.secretVoice}> kanalından özel odanı oluşturabilirsin.
                *_Bu kısımdan kendin belirleyeceğin isimde ve senin yöneteceğin bir kanal oluşturabilirsin. Ayrıca bu kanala istediklerin girebilir, istemediklerini odaya almayabilirsin._*`)
                .setFooter({text: oxyishere.Text})
            

message.channel.send({embeds:[ozelodaembed],components:[oxybuton, oxybuton2, oxybuton3]})
message.delete();



}}