const { PermissionsBitField, StringSelectMenuBuilder, EmbedBuilder, ActionRowBuilder } = require("discord.js");
const snipe = require("../../../../Database/src/Models/snipe");
const emojis = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'snipe',
  aliases: ["sn","sonsilinen"],
  description: 'Son silinen mesajları gösterir',
  category: 'Admin',
  async execute(message, client) {

    if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
      message.react(emojis.carpi);
      return;
    }

    const hembed = new EmbedBuilder().setAuthor({ name: message.member.displayName, iconURL: message.author.displayAvatarURL({ dynamic: true }) });
    message.react(emojis.onay);

    const data = await snipe.find({ guildID: message.guild.id, channelID: message.channel.id });
    if (!data || data.length === 0) {
      message.reply({ embeds: [new EmbedBuilder()
        .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({ dynamic: true }) })
        .setThumbnail()
        .setDescription(`Bu kanalda silinmiş bir mesaj bulunmuyor`)] })
        .then((e) => setTimeout(() => { e.delete(); }, 5000));
      return;
    }

    const pageSize = 10;
    const pages = Math.ceil(data.length / pageSize);
    const selectMenus = [];

    for (let i = 0; i < pages; i++) {
      const startIndex = i * pageSize;
      const endIndex = Math.min(startIndex + pageSize, data.length);
      const options = data.slice(startIndex, endIndex).map((msg, index) => ({
        label: `Mesaj ${startIndex + index + 1}`,
        description: msg.messageContent.length > 50 ? `${msg.messageContent.slice(0, 50)}...` : msg.messageContent,
        value: `${msg.deletedDate}`
      }));

      const selectMenu = new StringSelectMenuBuilder()
        .setCustomId(`snipe_select_${i}`)
        .setPlaceholder('Bir mesaj seçin...')
        .setMaxValues(1)
        .setMinValues(1)
        .addOptions(options);

      selectMenus.push(selectMenu);
    }

    const actionRows = selectMenus.map(selectMenu => new ActionRowBuilder().addComponents(selectMenu));

    // Discord allows maximum 5 components per message
    const limitedActionRows = actionRows.slice(0, 5);

    message.channel.send({ content: 'Birden fazla silinen mesaj arasından seçim yapın:', components: limitedActionRows });
  }
};
