const { EmbedBuilder } = require('discord.js');
const ayar = require("../../../../conf.json");
const system = require("../../../../Database/src/Settings/system.json")
const database = require("../../../../Database/src/Settings/settings.json")
const database2 = require("../../../../Database/src/Settings/emojis.json")

module.exports = {
  name: 'streamer',
  aliases: ["st","yayinci"],
  description: 'Bir kullanıcıya Streamer rolü verir. <oxy/id>',
  category: 'Rol Seçim',
  async execute(message, args) {
    if (message.guild === null) {
      return message.reply({ content: 'Bu komutu sadece bir sunucuda kullanabilirsiniz!', ephemeral: true });
    }


    if (!message.member.permissions.has('MANAGE_ROLES')) {
      return message.reply({ content: 'Bu komutu kullanmak için `Rolleri Yönet` yetkiniz olmalı.', ephemeral: true });
    }


    const hedefuye = message.mentions.members.first();
    if (!hedefuye) {
      return message.reply({ content: 'Lütfen rol vermek istediğiniz bir kullanıcı belirtin.', ephemeral: true });
    }


    const rolId = database.streamerRole; 
    const rol = message.guild.roles.cache.get(rolId);

    if (!rol) {
      return message.reply({ content: 'Geçerli bir rol bulunamadı.', ephemeral: true });
    }

    try {
      await hedefuye.roles.add(rol);
      await message.react(database2.onay)
      await message.reply({ content: `${hedefuye.user.username} kişisine **${rol.name}** rolü verildi.`, ephemeral: true });

      const rollogkanal = message.guild.channels.cache.find(channel => channel.name.toLowerCase().includes('role-log'));
      if (rollogkanal) {
        const logEmbed = new EmbedBuilder()
          .setDescription(`**${message.author.username}** tarafından **${hedefuye.user.username}** kullanıcısına **${rol.name}** rolü verildi.`)
          .setFooter({ text: system.Text, iconURL: message.guild.iconURL() });
        await rollogkanal.send({ embeds: [logEmbed] });
      }
    } catch (error) {
      console.error(error);
      await message.reply({ content: 'Rol verme işlemi sırasında bir hata oluştu.', ephemeral: true });
    }
  },
};
