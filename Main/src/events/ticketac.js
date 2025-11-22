const { EmbedBuilder } = require("discord.js");
const conf = require("../../../conf.json")
const { createTicketChannel } = require('../../../Database/src/Functions/ticket'); 
const Blacklist = require("../../../Database/src/Models/blacklist")

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isSelectMenu()) return;

   
    if (interaction.customId === 'ticketsebebimizke') {
      const sebepcık = interaction.values[0]; 
      const yarram = interaction.user;

      const karaliste = await Blacklist.findOne({ userId: yarram.id, isActive: true });

      if (karaliste) {
        return interaction.reply({
          content: "Üzgünüz, kara listeye alındığınız için bu işlemi gerçekleştiremezsiniz.",
          ephemeral: true,
        });
      }

      let sebep;
      switch (sebepcık) {
        case 'botbilgi':
          sebep = 'Bot Bilgisi';
          break;
        case 'supports':
          sebep = 'Destek';
          break;
        case 'satinalma':
          sebep = 'Satın Alma İşlemleri';
          break;
        case 'diger':
          sebep = 'Başka Bir Sebep';
          break;
        default:
          sebep = 'Bilinmeyen Sebep';
          break;
      }

      await interaction.reply({
        content: `Ticket'iniz açıldı! Sebep: **${sebep}**`,
        ephemeral: true,
      });

      await createTicketChannel(interaction.guild, yarram, sebep);
   
      const ticketlog = interaction.guild.channels.cache.find(c => c.name === 'ticket-log');

      if (ticketlog) {
        const embedcıks = new EmbedBuilder()
          .setDescription('Yeni bir ticket açıldı!')
          .addFields(
            { name: 'Ticlet Sahibi', value: `${yarram.tag} (${yarram.id})`, inline: true },
            { name: 'Sebep', value: sebep, inline: true },
            { name: 'Açılma Tarihi', value: new Date().toLocaleString(), inline: true },
          )
        await ticketlog.send({ embeds: [embedcıks] });
      } else {
        console.error('Log kanalını bulamadım :/');
      }
    }
  },
};
