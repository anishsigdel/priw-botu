const { ChannelType, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const ayarlar = require("../../../conf.json")
const system = require("../Settings/system.json")
const emojis = require("../Settings/emojis.json");
const settıngs = require("../Settings/settings.json")
async function createTicketChannel(guild, user, reason) {
 
  const ticketnumara = Math.floor(Math.random() * 9000) + 1000; 

 
  const yetkılı = settıngs.ticketStaff;
  const kanalısım = `destek-${ticketnumara}`;
  let kanalcık = kanalısım
  
  const ticketkanal = await guild.channels.create({
    name: kanalısım,
    type: ChannelType.GuildText, 
    topic: `Ticket Sebebi: ${reason}`,
    parent: settıngs.TicketParent, 
    permissionOverwrites: [
      {
        id: guild.id,
        deny: ['ViewChannel'], 
      },
      {
        id: user.id,
        allow: ['ViewChannel', 'SendMessages'], 
      },
      {
        id: yetkılı,
        allow: ['ViewChannel', 'SendMessages'],
      },
    ],
  });

 
  const kilitlebutton = new ButtonBuilder()
    .setCustomId("ticketikapat")
    .setLabel("Talebi Kilitle")
    .setEmoji(emojis.kilit)
    .setStyle(ButtonStyle.Secondary);  

  const silbutton = new ButtonBuilder()
    .setCustomId("ticketisil")
    .setLabel("Talebi Sil")
    .setEmoji(emojis.copkutusu)
    .setStyle(ButtonStyle.Danger);  

  
  const oxy = new ActionRowBuilder().addComponents(
    kilitlebutton, 
    silbutton, 
  );

 
  const tıckembed = new EmbedBuilder()
    .setDescription(`Merhaba ${user}, ticket'iniz oluşturuldu! 
    
    Sebep: ${reason}. 
    
    Ticket Numaranız: ${ticketnumara}

    <@&${yetkılı}> sizinle ilgilenecektir`)
    .setFooter({text: system.Text});

  await ticketkanal.send({
    content: `${user} & <@&${yetkılı}>`, 
    embeds: [tıckembed], 
    components: [oxy]
  });
}

module.exports = { createTicketChannel };
