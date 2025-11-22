const { Client, GatewayIntentBits, Interaction, PermissionsBitField } = require('discord.js');
const sex = require("../../../Database/src/Settings/role.json");
const Blacklist = require("../../../Database/src/Models/blacklist")
const SetupDatabase = require("../../../Database/src/Settings/settings.json");
const EmojiDatabase = require("../../../Database/src/Settings/emojis.json");
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

    if (interaction.customId === 'renk_rol_secme') {

      if (!yarram.roles.cache.has(SetupDatabase.boosterRole) && !yarram.permissions.has(PermissionsBitField.Flags.Administrator)) {
        return interaction.reply({
          content: `Renk Rolü Seçmek İçin Booster Veya Admin Olman Gerekmektedir! ${EmojiDatabase.carpi}`,
          ephemeral: true,
        });
      }


      const seçilenrol = interaction.values[0];

      let rolad = '';
      switch (seçilenrol) {
        case 'kirmizi1':
          rolad = sex.renkler.beyaz;
          break;
          case 'kirmizi2':
            rolad = sex.renkler.gri;
            break;
            case 'kirmizi0':
          rolad = sex.renkler.siyah;
          break;
          case 'kirmizi6':
          rolad = sex.renkler.turuncu;
          break;
          case 'kirmizi7':
          rolad = sex.renkler.mavi;
          break;
          case 'kirmizi4':
          rolad = sex.renkler.pembe;
          break;
          case 'kirmizi5':
          rolad = sex.renkler.mor;
          break;
          case 'kirmizi8':
          rolad = sex.renkler.yesil;
          break;
          case 'kirmizi9':
          rolad = sex.renkler.sari;
          break;
          case 'kirmizi3':
          rolad = sex.renkler.kirmizi;
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
      }
    }}}      
     