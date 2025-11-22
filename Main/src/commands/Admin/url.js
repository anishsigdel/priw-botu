const {PermissionsBitField,ButtonBuilder,ButtonStyle,ActionRowBuilder } = require('discord.js');
const emojidb = require("../../../../Database/src/Settings/emojis.json")
module.exports = {
    name: 'url',
    aliases: ["vanity","link"],
    description: 'Sunucu özel url toplam kullanım sayısını gösterir.',
    category: 'Admin',
    async execute(message) {

if (!message.guild.vanityURLCode) return message.reply({ content: "Sunucuda bir özel url yok." });
if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;

    const url = await message.guild.fetchVanityData();

 
    const refreshButton = new ButtonBuilder()
      .setCustomId('refresh') 
      .setLabel('Yenile')  
      .setEmoji(emojidb.giveaway)
      .setStyle(ButtonStyle.Secondary); 


    const row = new ActionRowBuilder().addComponents(refreshButton);

    
    const messageSent = await message.reply({ content: `**Sunucu Özel URL:** discord.gg/${message.guild.vanityURLCode}\n\`Toplam Kullanım Sayısı:\` **${url.uses}**`, components: [row] });

    const filter = (interaction) => interaction.customId === 'refresh' && interaction.user.id === message.author.id;
    const collector = messageSent.createMessageComponentCollector({ filter });  

    collector.on('collect', async (interaction) => {
    
      const updatedUrl = await message.guild.fetchVanityData();


 
      await interaction.update({ content: `**Sunucu Özel URL:** discord.gg/${message.guild.vanityURLCode}\n\`Toplam Kullanım Sayısı:\` **${updatedUrl.uses}**` });
    });
  },
};