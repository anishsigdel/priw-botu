const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, Modal, TextInputBuilder, OAuth2Scopes, Partials, resolveColor, Client, Collection, GatewayIntentBits,SelectMenuBuilder,ActivityType } = require("discord.js");
const client = global.client = new Client({fetchAllMembers: true,intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildBans,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.MessageContent],scopes:[OAuth2Scopes.Bot, OAuth2Scopes.ApplicationsCommands],partials: [Partials.Message, Partials.Channel, Partials.Reaction, Partials.User,Partials.GuildMember, Partials.ThreadMember, Partials.GuildScheduledEvent],ws: {version: "10"}});
const oxybaba = require("../conf.json")
const { readdir } = require("fs");
const { REST } = require('@discordjs/rest');
const { Routes } = require("discord-api-types/v10");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
const {JsonDatabase} = require("wio.db");
const db = client.db = new JsonDatabase({databasePath:"./database.json"});
readdir("./src/commands/", (err, files) => {if (err) console.error(err)
files.forEach(f => {readdir("./src/commands/" + f, (err2, files2) => {
if (err2) console.log(err2)
files2.forEach(file => {let oxy_prop = require(`./src/commands/${f}/` + file);
console.log(` [oxy - command]  ${oxy_prop.name} Yüklendi!`);
commands.set(oxy_prop.name, oxy_prop);
oxy_prop.aliases.forEach(alias => {aliases.set(alias, oxy_prop.name);});});});});});
readdir("./src/events", (err, files) => {
if (err) return console.error(err);
files.filter((file) => file.endsWith(".js")).forEach((file) => {let oxy_prop = require(`./src/events/${file}`);
if (!oxy_prop.conf) return;
client.on(oxy_prop.conf.name, oxy_prop);
console.log(` [oxy - event] ${oxy_prop.conf.name} Yüklendi!`);});});
const commands2 = client.commands2 = (global.commands2 = []);
readdir("./context/", (err, files) => {
  if (err) throw err;
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      let props = require(`./context/${file}`);
      client.commands2.push({name: props.name,type: props.type})
      console.log(`👌 [MENU] Menü Komut Yüklendi: ${props.name}`);
  });
});
client.on("ready", async () => {
    const rest = new REST({ version: "9" }).setToken(oxybaba.PrivateKey);
  try {
    await rest.put(Routes.applicationCommands(client.user.id), {body: client.commands2,});
  } catch (error) {
    console.error(error);
  }
});
client.on('interactionCreate', (button) => {
  if (button.isUserContextMenuCommand()){
      try {
        readdir("./context/", (err, files) => {
          if (err) throw err;
          files.forEach(async (f) => {
            const command = require(`./context/${f}`);
            if (
              button.commandName.toLowerCase() === command.name.toLowerCase()
            ) {
              return command.run(button);
            }
          });
        });
      } catch (err) {
        console.error(err);
      }}});
Collection.prototype.array = function() {return [...this.values()]}
client.login(oxybaba.PrivateKey).then(() => console.log(`🟢 ${client.user.tag} Başarıyla Giriş Yaptı!`)).catch((beş_err) => console.log(`🔴 Bot Giriş Yapamadı / Sebep: ${beş_err}`));

