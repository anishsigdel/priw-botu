const { EmbedBuilder } = require("discord.js");
const managerbot = global.bot;
const ayar = require("../../../conf.json");
const system = require("../../../Database/src/Settings/system.json");
const emojis = require("../../../Database/src/Settings/emojis.json");
const { isLicenseValid } = require("../../../license-checker");

module.exports = {
  name: 'messageCreate',
  once: false,
  async execute(message) {
    // License kontrolü - eğer süre dolmuşsa hiçbir komuta cevap verme
    if (!isLicenseValid()) {
      return; // Hiçbir şey yapma, sessizce çık
    }

    const prefix = ayar.Prefix;
    if (!message.content.startsWith(prefix)) return;
    if (message.author.bot || !message.guild || !prefix) return;

    let args = message.content.substring(prefix.length).trim().split(" ");
    let commandName = args[0].toLowerCase();

    const embed = new EmbedBuilder().setFooter({ text: system.Text }).setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true }) });

    args = args.splice(1);
    let cmd = managerbot.commands.get(commandName);

    if (!cmd) {
  
      cmd = managerbot.commands.find(command => command.aliases && command.aliases.includes(commandName));
    }

    const komutLog = managerbot.channels.cache.find(x => x.name == "command-log");

    if (cmd) {
      try {
        await cmd.execute(message, args, embed, prefix);  
      } catch (error) {
        console.error(`Komut hatası: ${error}`);
      }

      const oxycommandsss = new EmbedBuilder()
        .setFooter({ text: system.Text })
        .setDescription(`
          ${message.author} tarafından ${message.channel} kanalında \`${prefix}${commandName}\` komutu kullanıldı.
                      
          ${emojis.ok} Komut Kanalı: ${message.channel} - (\`${message.channel.id}\`)
          ${emojis.ok} Komut Sahibi: ${message.author} - (\`${message.author.id}\`)
          ${emojis.ok} Komut İçeriği: \`\`\`${message.content}\`\`\`
        `);

      if (komutLog) komutLog.send({ embeds: [oxycommandsss] });
    } else {
      console.log(`Komut bulunamadı: ${commandName}`);
    }
  }
};
