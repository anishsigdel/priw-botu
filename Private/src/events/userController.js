const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType,ChannelType,PermissionFlagsBits } = require("discord.js");
const oxy = require("../../../conf.json")
const ayol = require("../../../Database/src/Settings/settings.json");
module.exports = async (oldSex,newSex) => {
if(!newSex.channel)return;

let channel = client.guilds.cache.get(oxy.Server).channels.cache.get(newSex.channelId);
if(channel.parentId == ayol.secretroomParent
){
let data = client.db.get(`members_${newSex.channel.id}`)
if(!data)return;
if(data.some(bes => bes.includes(newSex.member.id)))return;
newSex.member.voice.disconnect();
}else return

}
module.exports.conf = {
name: "voiceStateUpdate"
}
