const sex = require("../../../../conf.json")
const emojis = require("../../../../Database/src/Settings/emojis.json")
const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'oyun-rol',
  aliases: ["gamerole"],
  description: 'Oyun rolleri seçim paneli oluşturur.',
  category: 'Rol Seçim',
  async execute(message) {
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için rol alma panelini kuramazsın.`, ephemeral: true })
    } else {
    const maymun = new SelectMenuBuilder()
      .setCustomId('oyun_rol_secme') 
      .setPlaceholder('Bir rol seçin.')
      .addOptions([
{
  label: 'Pubg',
  value: 'pubgm',
  description: 'Pubg Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
label: 'Cs Go',
value: 'counter',
description: 'Csgo Oyun Rolünü Almanızı Sağlar.',
emoji: emojis.ok
},
{
  label: 'Roblox',
  value: 'robux',
  description: 'Roblox Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Valorant',
  value: 'rayne',
  description: 'Valorant Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Gta',
  value: 'mta',
  description: 'Pubg Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Dota 2',
  value: 'dosex',
  description: 'Dota Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Genshın Impact',
  value: 'gensex',
  description: 'Genshın Impact Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Lol',
  value: 'lolo',
  description: 'Legue Of Legends Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Minecraft',
  value: 'steve',
  description: 'Minecraft Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Fortnite',
  value: 'forest',
  description: 'Fortnite Oyun Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
}

      ]);

    const row = new ActionRowBuilder().addComponents(maymun);

   
    await message.channel.send({
      content: `
      ${emojis.ayarlar} Merhaba Sevgili **${message.guild.name}** üyeleri! Oyun Rol Seçim menüsüne hoşgeldiniz!
      ${emojis.ok} Aşağıdaki menüden istediğiniz oyun rolünü seçerek role sahip olabilirsiniz.`,
      components: [row],
    });
  }},
};
