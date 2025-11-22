const { Client, GatewayIntentBits, Interaction } = require('discord.js');
const sex = require("../../../Database/src/Settings/role.json");
const Blacklist = require("../../../Database/src/Models/blacklist")

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    
    const yarram = interaction.member;
    const karaliste = await Blacklist.findOne({ userId: yarram.id, isActive: true });

    if (karaliste) {
      return interaction.reply({
        content: "Üzgünüz, kara listeye alındığınız için bu işlemi gerçekleştiremezsiniz.",
        ephemeral: true,
      });
    }

    if (!interaction.isSelectMenu()) return;

    if (interaction.customId === 'rol_secme') {

      const seçilenrol = interaction.values[0];

      let rolad = '';
      switch (seçilenrol) {
        case 'github':
          rolad = sex.Bildirimler.github;
          break;
        case 'duyuru':
          rolad = sex.Bildirimler.duyuru;
          break;
        case 'cekilis':
          rolad = sex.Bildirimler.cekilis;
          break;
        default:
          return interaction.reply({
            content: 'Seçilen rol geçerli değil.',
            ephemeral: true,
          });
      }
     const rolcum = interaction.guild.roles.cache.find(r => r.name === rolad);

if (!rolcum) {
  return interaction.reply({
    content: 'Bu rol sunucuda bulunamadı.',
    ephemeral: true,
  });
}

try {
 
  if (interaction.member.roles.cache.has(rolcum.id)) {
   
    await interaction.member.roles.remove(rolcum);
    return interaction.reply({
      content: `Başarıyla **${rolad}** rolü kaldırıldı!`,
      ephemeral: true,
    });
  } else {
    await interaction.member.roles.add(rolcum);
    return interaction.reply({
      content: `Başarıyla **${rolad}** rolünü aldınız!`,
      ephemeral: true,
    });
  }
} catch (error) {
  console.error(error);
  return interaction.reply({
    content: 'Rolü eklerken veya kaldırırken bir hata oluştu.',
    ephemeral: true,
  });
}}}}

