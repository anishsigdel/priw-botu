const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const emojis = require("../../../Database/src/Settings/emojis.json");
const database = require("../../../Database/src/Settings/settings.json");

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {

    if (interaction.isButton()) {

      if (interaction.customId === 'streamer_role') {

        const member = interaction.guild.members.cache.get(interaction.user.id);


        const streamerRole = interaction.guild.roles.cache.get(database.streamerRole);
        if (!streamerRole) {
          return interaction.reply({ content: 'Sunucuda "Streamer" rolü bulunamadı!', ephemeral: true });
        }


        if (member.roles.cache.has(streamerRole.id)) {
          return interaction.reply({ content: 'Zaten "Streamer" rolüne sahipsin!', ephemeral: true });
        }

        await member.roles.add(streamerRole);
        await interaction.reply({ content: `Tebrikler! **${streamerRole.name}** rolünü aldın.`, ephemeral: true });
      }
    }
  }
};
