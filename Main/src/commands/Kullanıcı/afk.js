const afk = require("../../../../Database/src/Models/afk");
const { onay } = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'afk',
  aliases: ["awayfromkeyboard","afk-bırak"],
  description: 'Afk moduna girersiniz!',
  category: 'Kullanıcı',
  async execute(message) {

    if (message.member.displayName.includes("[AFK]")) return;


    const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/);


    const reason = args.join(" ") || "Belirtilmedi!";

    await afk.findOneAndUpdate(
      { guildID: message.guild.id, userID: message.author.id },
      { $set: { reason, date: Date.now() } },
      { upsert: true }
    );

    message.react(onay);
    message.reply({
      content: "Başarıyla afk moduna girdiniz! Bir şey yazana kadar [AFK] kalacaksınız."
    }).then((e) => setTimeout(() => { e.delete(); }, 10000));


    if (message.member.manageable) {
      message.member.setNickname(`[AFK] ${message.member.displayName}`);
    }
  }
};
