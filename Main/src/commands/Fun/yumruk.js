const { EmbedBuilder } = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'yumruk',
  aliases: ["yumrukla","yumruk-at"],
  description: 'Belirttiğiniz kullanıcıya yumruk atın! <oxy/id>',
  category: 'Fun',
  async execute(message) {
    const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);


    if (!member) {
      return message.reply({ content: "Bir kullanıcı etiketlemelisiniz!" });
    }

    if (member.id === message.author.id) {
      return message.reply({ content: "Kendine yumruk atamazsın!" });
    }

    if (member.id === message.client.user.id) {
        await message.react(carpi);
        return message.reply({ content: "Bota yumruk atamazsın!" });
      }

    if (member.user.bot) {
      return message.reply({ content: "Botlara yumruk atamazsın!" });
    }


    var gif = [
        "https://media.discordapp.net/attachments/917295589371301899/927968605142917120/original.gif",
        "https://images-ext-1.discordapp.net/external/fHgnbSkpcmTE6MbsI9OPVhcKkzkB1x1-Mj-qARrBJ5E/https/cdn.weeb.sh/images/BkdyPTZWz.gif",
        "https://media.discordapp.net/attachments/917295589371301899/927968605532979240/main-qimg-c592cafcb42749a6a608cf659adbd4a1.gif",
        "https://media.discordapp.net/attachments/917295589371301899/927968606250237982/opm.gif",
        "https://images-ext-1.discordapp.net/external/L_bVAX-_zOmz_MzgO4rFceYKvXF9DUE8BkYHZAGkmGg/https/cdn.weeb.sh/images/B1-ND6WWM.gif",
        "https://media.discordapp.net/attachments/917295589371301899/927968667684188230/kemal-sunal-vur.gif",
        "https://images-ext-2.discordapp.net/external/POYEseNsbVcW5YM9ccCtFb-EPVooQl4jFzMGs9B3sbs/https/cdn.weeb.sh/images/HykeDaZWf.gif",
        "https://images-ext-2.discordapp.net/external/iTf4fr_k8FyQDf_BtlcrfD0QbRN-Bm9v0YANz-N-0Rg/https/cdn.weeb.sh/images/SkFLH129z.gif",
        "https://media.discordapp.net/attachments/917295589371301899/927968667990388766/1343-5-c14bb9f372e0c962d021bfd8abb3f9e1.gif",
        "https://images-ext-2.discordapp.net/external/DcdB6jBiKoL7ISwmc7DIfe-WXONAIhCV2ibDPDRGNJw/https/cdn.weeb.sh/images/SJAfH5TOz.gif",
        "https://media.discordapp.net/attachments/917295589371301899/927968668430762084/naruto-sakura.gif",
        "https://images-ext-1.discordapp.net/external/9VgmfwvI3Wst_P72kqveRqijoV5Pj4ojm7vRUhofTRs/https/cdn.weeb.sh/images/BJXxD6b-G.gif",
        "https://images-ext-1.discordapp.net/external/JTQxjkNSP03Fk9APzYL3tlCVtV3ocq97jr-sFxgxeHs/https/cdn.weeb.sh/images/ryYo_6bWf.gif",
        "https://images-ext-2.discordapp.net/external/BZPa2Wx7vXciXcOIbU_SsU1myt7tA7YwCY_WcI4ceNo/https/cdn.weeb.sh/images/BJg7wTbbM.gif",
        "https://images-ext-1.discordapp.net/external/jR1W-Xg80OzzI4oAVd4L-hbt7T7NEf8vcHM6Q7v8ebM/https/cdn.weeb.sh/images/rkkZP6Z-G.gif",
        "https://images-ext-1.discordapp.net/external/1XHayY_wLAxMH1UI8dUE5pWfaZbFWCW_guDs_DbiPSk/https/cdn.weeb.sh/images/HJfGPTWbf.gif",
        "https://images-ext-2.discordapp.net/external/iRWrGzMiaVR5nZ_CzfNtaym7JVFOiY2EUDYUTrpBy-w/https/cdn.weeb.sh/images/B1rZP6b-z.gif",
        "https://images-ext-1.discordapp.net/external/w4pvWUqZ7DwYsphKvaSKMFXNarCngEd1cc_ZBTw0ISs/https/cdn.weeb.sh/images/rJHLDT-Wz.gif",
        "https://images-ext-1.discordapp.net/external/bSwIsWrcgwS-FT5zJJ6WkdyGnNesOsTH4sa7K62OOp8/https/cdn.weeb.sh/images/SJvGvT-bf.gif",
        "https://images-ext-1.discordapp.net/external/TRzcRQdDKxMj5fgMd8Av_zX6QJ3SyWv1yitibgF1Pq8/https/cdn.weeb.sh/images/HJqSvaZ-f.gif",
        "https://images-ext-1.discordapp.net/external/BXaocQWGvF1Pjhun0GPOZhZixuToMHTWVv2EzgWAhqs/https/cdn.weeb.sh/images/ByI7vTb-G.gif"
        ];
        let resimler = gif[Math.floor(Math.random() * gif.length)];
        await message.react(onay)
        return message.reply({content: `${member}, ${message.author} Sana Yumruk Attı!`, files: [resimler]})
        }
        };
