const { joinVoiceChannel } = require('@discordjs/voice');
const { ChannelType, ActivityType } = require('discord.js');
const ayar = require("../../../conf.json");
const system = require("../../../Database/src/Settings/system.json");
const { checkLicense, setLicenseChecked, startPeriodicLicenseCheck } = require("../../../license-checker");

module.exports = {
  name: 'ready',
  once: true,
  async execute(client) {
    console.log(`[oxy Manager!] Bot ${client.user.tag} aktif!`);

    // License kontrolü yap
    const licenseValid = await checkLicense();
    setLicenseChecked();
    
    // Periyodik license kontrolünü başlat
    startPeriodicLicenseCheck();
    
    if (!licenseValid) {
      return;
    }

    const kanal = client.channels.cache.get(system.Voice);
    if (kanal && kanal.type === ChannelType.GuildVoice) {  
      joinVoiceChannel({
        channelId: kanal.id,
        guildId: kanal.guild.id,
        adapterCreator: kanal.guild.voiceAdapterCreator,
        selfDeaf: true,
        selfMute: true
      });
      console.log('[oxy Manager!] Ses kanalına bağlanıldı.');
    }

    client.user.setPresence({
      activities: [
        {
          name: system.Status, 
          type: ActivityType.Streaming,
          url: system.URL,
        },
      ],
      status: 'dnd',
    });
    console.log('[oxy Manager!] Durum başarıyla ayarlandı.');
  },
};
