const sex = require("../../../../conf.json")
const emojis = require("../../../../Database/src/Settings/emojis.json")
const { SelectMenuBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: 'renk-rol',
  aliases: ["colorrole"],
  description: 'Renk rolleri seçim paneli oluşturur.',
  category: 'Rol Seçim',
  async execute(message) {
    if (message.guild === null) {
      return message.reply({ content: `Bu komutu sadece Sunucuda kullanabilirsin!`, ephemeral: true })
    } else if (!sex.Devs.includes(message.author.id)) {
      return message.reply({ content: `${emojis.carpi} Bot developerı olmadığın için rol alma panelini kuramazsın.`, ephemeral: true })
    } else {
    const maymun = new SelectMenuBuilder()
      .setCustomId('renk_rol_secme') 
      .setPlaceholder('Bir rol seçin.')
      .addOptions([
{
  label: 'Siyah',
  value: 'kirmizi0',
  description: 'Siyah Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
label: 'Beyaz',
value: 'kirmizi1',
description: 'Beyaz Renk Rolünü Almanızı Sağlar.',
emoji: emojis.ok
},
{
  label: 'Gri',
  value: 'kirmizi2',
  description: 'Gri Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Kırmızı',
  value: 'kirmizi3',
  description: 'Kırmızı Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Pembe',
  value: 'kirmizi4',
  description: 'Pembe Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Mor',
  value: 'kirmizi5',
  description: 'Mor Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Turuncu',
  value: 'kirmizi6',
  description: 'Turuncu Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Mavi',
  value: 'kirmizi7',
  description: 'Mavi Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Yeşil',
  value: 'kirmizi8',
  description: 'Yeşil Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
},
{
  label: 'Sarı',
  value: 'kirmizi9',
  description: 'Sarı Renk Rolünü Almanızı Sağlar.',
  emoji: emojis.ok
}

      ]);

    const row = new ActionRowBuilder().addComponents(maymun);

   
    await message.channel.send({
      content: `
      ${emojis.ayarlar} Merhaba Sevgili **${message.guild.name}** üyeleri! Renk Rol Seçim menüsüne hoşgeldiniz!
      ${emojis.ok} Aşağıdaki menüden istediğiniz renk rolünü seçerek role sahip olabilirsiniz.`,
      components: [row],
    });
  }},
};
