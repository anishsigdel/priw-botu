const client = global.client;
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const oxy = require("../../../conf.json");
const ms = require('ms');
const { isLicenseValid } = require("../../../license-checker");

module.exports = async (message) => {
// License kontrolü - eğer süre dolmuşsa hiçbir komuta cevap verme
if (!isLicenseValid()) {
    return; // Hiçbir şey yapma, sessizce çık
}

if (oxy.Prefix && !message.content.startsWith(oxy.Prefix)) return;
const args = message.content.slice(1).trim().split(/ +/g);
const commands = args.shift().toLowerCase();
const cmd = client.commands.get(commands) || [...client.commands.values()].find((e) => e.aliases && e.aliases.includes(commands));
const beş_embed = new EmbedBuilder().setColor(`#2f3136`).setAuthor({name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: oxy.Text ? oxy.Text : `oxy was here` , iconURL: message.author.avatarURL({ dynamic: true, size: 2048 })})
if (cmd) {
cmd.execute(client, message, args, beş_embed)} }
module.exports.conf = {name: "messageCreate"}
