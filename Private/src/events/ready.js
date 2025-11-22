const oxy = require("../../../conf.json");
const { joinVoiceChannel } = require("@discordjs/voice");
const { EmbedBuilder, ChannelType,ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const { checkLicense, setLicenseChecked, startPeriodicLicenseCheck } = require("../../../license-checker");
const client = global.client;
module.exports = async () => {

// License kontrolü yap
const licenseValid = await checkLicense();
setLicenseChecked();

// Periyodik license kontrolünü başlat
startPeriodicLicenseCheck();

if (!licenseValid) {
  return;
}

client.user.setPresence({activities:[{name:oxy.Status,type: ActivityType.Streaming,url:"https://www.twitch.tv/oxy"}], status: "dnd" });

const kanal = client.channels.cache.get(oxy.Voice);
  if (kanal && kanal.type === ChannelType.GuildVoice) {  
    joinVoiceChannel({
      channelId: kanal.id,
      guildId: kanal.guild.id,
      adapterCreator: kanal.guild.voiceAdapterCreator,
      selfDeaf: true,
      selfMute: true
    });
    console.log('[oxy Private!] Ses kanalına bağlanıldı.');
  }

const guild = client.guilds.cache.get(oxy.Server)
setInterval(function(){
guild.channels.cache.forEach(async channel => {
if (channel.name.startsWith('#')) {
    let channeldata = client.db.get(`${channel.id}`)
    if(!channeldata)return;
    let member = guild.members.cache.get(channeldata)
    let data = client.db.get(`özeloda_${channeldata}`)
    if(!data)return;
    if (channel.members.size == 0) {
    channel.delete()
    client.db.delete(`members_${channel.id}`)
    client.db.delete(`özeloda_${channeldata}`)
    client.db.delete(`${channel.id}`)
    
   member.user.send({content:`Merhaba ${member.user.username} Odada Olmadığın İçin Özel Odan Bot Tarafından Kapatıldı! `}).catch((bes) => { })
   const kanal = client.channels.cache.find(x => x.name == "özel-oda-log")
const embedım = new EmbedBuilder()
            .setDescription(`${member} Secret Roomdan Ayrıldığı İçin Özel Odasını Sildim!`)
            .setTimestamp();
   if (kanal) {
       kanal.send({ embeds: [embedım] });
   }
 }
}
})
},15000)


}
module.exports.conf = {
name: "ready"
}
