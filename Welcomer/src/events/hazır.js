const client = global.bot;
const { joinVoiceChannel } = require('@discordjs/voice');
const { ChannelType, ActivityType } = require('discord.js');
const ayar = require("../../../conf.json");
const system = require("../../../Database/src/Settings/system.json");
const setup = require("../../../Database/src/Settings/settings.json");
const tagMod = require('../../../Database/src/Models/tagMod');
const serverTag = require('../../../Database/src/Models/serverTag'); 
const { checkLicense, setLicenseChecked, startPeriodicLicenseCheck } = require("../../../license-checker");

module.exports = async ( guild ) => {

  console.log(`[oxy Welcomer!] Bot ${client.user.tag} aktif!`);

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
    console.log('[oxy Welcomer!] Ses kanalına bağlanıldı.');
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
  console.log('[oxy Welcomer!] Durum başarıyla ayarlandı.');

  async function isTagPriv(guildId) {
    const serverTagDoc = await serverTag.findOne({ guildId });

    if (serverTagDoc && serverTagDoc.tagMode === 'priv') {
      
        return true;
    }
    return false; 
}


  async function TagsızKontrol() {
    const tagModedata = await tagMod.findOne({ guildID: ayar.Server });
    const guild = client.guilds.cache.get(ayar.Server);
    const tagArray = Array.isArray(setup.tag) ? setup.tag :  ["sancho","sâncho","Sancho","Sâncho"];
  
    const isPriv = await isTagPriv(ayar.Server);
    if (isPriv) return;

  
    if (tagModedata && tagModedata.tagMode === true) {
     
      const members = [...guild.members.cache.filter(member => {
        const hasTag = tagArray.some(tag => 
          (member.user.globalName && member.user.globalName.includes(tag)) || 
          (member.user.username && member.user.username.includes(tag))
        );
  
       
        return !hasTag && !member.user.bot;
      }).values()].splice(0, 10); 
  

      for (const member of members) {
      
        await member.roles.set([]);
        
        if (setup.otoRole) {
          await member.roles.add(setup.otoRole);
        }
      }
    }
  };

  
async function RolsuzeKayitsizVerme()  { 


const guild = client.guilds.cache.get(ayar.Server);
let wexa = guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== guild.id).size == 0)
wexa.forEach(r => {
   if (setup.otoRole) r.roles.add(setup.otoRole)
   })
};


async function TagAlıncaKontrol() { 

  const guild = client.guilds.cache.get(ayar.Server);
  const tagArray = Array.isArray(setup.tag) ? setup.tag : ["sancho","sâncho","Sancho","Sâncho"];

  const isPriv = await isTagPriv(ayar.Server);
  if (isPriv) return;

  const members = [...guild.members.cache.filter(member => tagArray && tagArray.some(tag => member.user.globalName && member.user.globalName.includes(tag) || member.user.username.includes(tag)) && !member.user.bot &&  !member.roles.cache.has(setup.tagRole)).values()].splice(0, 10);
  for await (const member of members) {
    if (setup.tagRole) await member.roles.add(setup.tagRole);
  }
};

  
async function TagBırakanKontrol() {
  const tagModedata = await tagMod.findOne({ guildID: ayar.Server });
  const guild = client.guilds.cache.get(ayar.Server);
  const tagArray = Array.isArray(setup.tag) ? setup.tag : ["sancho","sâncho","Sancho","Sâncho"];

  const isPriv = await isTagPriv(ayar.Server);
  if (isPriv) return;

  const members = [...guild.members.cache.filter(member => {
    const hasTag = tagArray.some(tag => 
      (member.user.globalName && member.user.globalName.includes(tag)) || 
      (member.user.username && member.user.username.includes(tag))
    );
    
    return !hasTag && !member.user.bot && setup.tagRole.some(roleId => member.roles.cache.has(roleId));
  }).values()].splice(0, 10);  
  
  for (const member of members) {
   
    if (tagModedata && tagModedata.tagMode === true) {
      if (!member.roles.cache.has(setup.boosterRole)) {  
        await member.roles.set([]); 
        await member.roles.add(setup.otoRole); 
      }
    }

   
    if (setup.tagRole) {
      await Promise.all(setup.tagRole.map(roleId => member.roles.remove(roleId)));
    }
  }
};
};


module.exports.conf = {
  name: "ready",
};
