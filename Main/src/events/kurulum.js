const { ChannelType, PermissionsBitField } = require('discord.js');
const sex = require("../../../conf.json");
const fs = require('fs');
const path = require('path');
const emojis = require("../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
 
    if (!interaction.isSelectMenu()) return;

    if (interaction.user.bot) return;

    if (interaction.customId === 'kurulumsebebim') {
      const secılmıssecenekaq = interaction.values[0];
      if (!sex.Devs.includes(interaction.user.id)) {
        return interaction.reply({ content: `Bu işlemi sadece bot geliştiricileri yapabilir.`, ephemeral: true });
      }


    if (secılmıssecenekaq === 'emoji-setup') {
      await interaction.reply("Emojiler oluşturuluyor...");
    
      const emojiler = [
        { name: "para", url: "https://cdn.discordapp.com/emojis/1322965566155395172.gif" },
        { name: "sebep", url: "https://cdn.discordapp.com/emojis/1323299279288143945.gif" },
        { name: "destek", url: "https://cdn.discordapp.com/emojis/1322965850323550268.gif" },
        { name: "partner", url: "https://cdn.discordapp.com/emojis/1173608670064549954.png" },
        { name: "developer", url: "https://cdn.discordapp.com/emojis/1318582679020503143.gif" },
        { name: "basvuru", url: "https://cdn.discordapp.com/emojis/1309837510972801115.png" },
        { name: "oneri", url: "https://cdn.discordapp.com/emojis/1322981331772248276.png" },
        { name: "sikayet", url: "https://cdn.discordapp.com/emojis/1322981340496527540.png" },
        { name: "github", url: "https://cdn.discordapp.com/emojis/1323005874662543611.png" },
        { name: "duyuru", url: "https://cdn.discordapp.com/emojis/1323005882497237052.png" },
        { name: "cekilis", url: "https://cdn.discordapp.com/emojis/1323005890533785681.png" },
        { name: "ayarlar", url: "https://cdn.discordapp.com/emojis/1323007262650011788.gif" },
        { name: "ucgen", url: "https://cdn.discordapp.com/emojis/1323009542316884009.gif" },
        { name: "yaprak", url: "https://cdn.discordapp.com/emojis/1323020455816462336.gif" },
        { name: "ok", url: "https://cdn.discordapp.com/emojis/1323027568722706532.gif" },
        { name: "carpi", url: "https://cdn.discordapp.com/emojis/1309650763101765743.png" },
        { name: "onay", url: "https://cdn.discordapp.com/emojis/1323341523252940801.png" },
        { name: "kilit", url: "https://cdn.discordapp.com/emojis/1323292693010448459.png" },
        { name: "kilitac", url: "https://cdn.discordapp.com/emojis/1329178325306048686.png"},
        { name: "ekle", url: "https://cdn.discordapp.com/emojis/1329179453762568254.png"},
        { name: "cikar", url: "https://cdn.discordapp.com/emojis/1329179418924421142.png"},
        { name: "olustur", url: "https://cdn.discordapp.com/emojis/1329179136996016161.png"},
        { name: "bosluk", url: "https://cdn.discordapp.com/emojis/1329178641682403389.png"},
        { name: "copkutusu", url: "https://cdn.discordapp.com/emojis/1323292684898668585.png" },
        { name: "pikachu", url: "https://cdn.discordapp.com/emojis/1323968443766013983.gif" },
        { name: "dot", url: "https://cdn.discordapp.com/emojis/1328450201228148829.png" },
        { name: "edit", url: "https://cdn.discordapp.com/emojis/1329190756937891880.png" },
        { name: "kick", url: "https://cdn.discordapp.com/emojis/1329190588540522558.png" },
        { name: "oxycik", url: "https://cdn.discordapp.com/emojis/1329551949128925205.png" },
        { name: "giveaway", url: "https://cdn.discordapp.com/emojis/1325172973119737876.gif"}
      ];
    
      emojiler.forEach(async (emojiData) => {
        const yuklenenemoji = interaction.guild.emojis.cache.find((e) => e.name === emojiData.name);
        
        if (yuklenenemoji) {
          await global.emojidb.set(emojiData.name, yuklenenemoji.toString());
          console.log(`Emoji ${emojiData.name} zaten mevcut.`);
        } else {
          try {
            const emoji = await interaction.guild.emojis.create({ attachment: emojiData.url, name: emojiData.name });
            await global.emojidb.set(emojiData.name, emoji.toString());
            interaction.channel.send({ content: `\`${emojiData.name}\` isimli emoji oluşturuldu! (${emoji.toString()})`, ephemeral: true });
          } catch (error) {
            console.error(`Emoji oluşturulurken hata oluştu: ${error}`);
          }
        }
      });    
    } else if (secılmıssecenekaq === 'kanal-setup') {
      await interaction.reply("Kanallar oluşturuluyor...");

      const parent = await interaction.guild.channels.create({
        name: 'Logs',
        type: ChannelType.GuildCategory,
        permissionOverwrites: [{
          id: interaction.guild.id,
          deny: [PermissionsBitField.Flags.ViewChannel],
        }]
      });

      await interaction.guild.channels.create({ name: 'basvuru-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'sikayet-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'oneri-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'sikayet-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'oneri-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'ticket-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'command-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'dogrulama-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'join-leave-log', type: ChannelType.GuildText, parent: parent.id });
      await interaction.guild.channels.create({ name: 'blacklist-log', type: ChannelType.GuildText, parent: parent.id });

      await interaction.followUp({ content: `Kanal kurulumu başarılı!`, ephemeral: true });
    } else if (secılmıssecenekaq === 'rol-setup') {
      await interaction.reply("Roller oluşturuluyor...");

      await interaction.guild.roles.create({
        name: "------------------------",
        color: "#000000",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });

      await interaction.guild.roles.create({
        name: "Github Bildirimleri",
        color: "#ff0000",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });

      await interaction.guild.roles.create({
        name: "Duyuru Bildirimleri",
        color: "#ff0000",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });

      await interaction.guild.roles.create({
        name: "Çekiliş Bildirimleri",
        color: "#ff0000",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "------------------------",
        color: "#000000",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Mavi",
        color: "#0600ff",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      }); 
      await interaction.guild.roles.create({
        name: "Kırmızı",
        color: "#ff0000",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Mor",
        color: "#8b00ff",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Pembe",
        color: "#ff00e8",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Sarı",
        color: "#ebff00",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Yeşil",
        color: "#00ff55",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Gri",
        color: "#999796",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Siyah",
        color: "#080000",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Beyaz",
        color: "#ffffff",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });
      await interaction.guild.roles.create({
        name: "Turuncu",
        color: "#ff7a00",
        permissions: [],
        reason: "Bot kurulumu için rol oluşturuldu."
      });



      await interaction.followUp({ content: `Roller başarıyla sunucuya yüklendi.`, ephemeral: true });
    }
  }
}
};
