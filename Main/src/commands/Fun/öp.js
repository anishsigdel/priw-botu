const { EmbedBuilder } = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'öp',
  aliases: ["kiss","muck","yiyiş"],
  description: 'Belirttiğiniz kullanıcıyı öpün! <oxy/id>',
  category: 'Fun',
  async execute(message) {
    
    const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/);
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!member) {
      await message.react(carpi);
      return message.reply({ content: "Lütfen bir kullanıcı belirtin!" });
    }


    if (member.id === message.author.id) {
      await message.react(carpi);
      return message.reply({ content: "Kendini öpemezsin!" });
    }

  
    if (member.id === message.client.user.id) {
      await message.react(carpi);
      return message.reply({ content: "Botu öpemezsin!" });
    }

    if (member.user.bot) {
      await message.react(carpi);
      return message.reply({ content: "Botları öpemezsin!" });
    }

 
    const gifler = [
        "https://media.discordapp.net/attachments/854240833049067590/935888252685139968/kiss-blushing.gif",
        "https://media.discordapp.net/attachments/854240833049067590/935886516033560636/hugs-icegif.gif",
        "https://media.giphy.com/media/HKQZgx0FAipPO/giphy.gif",
        "https://images-ext-1.discordapp.net/external/jft5uuJ40ZE8RbmMyokQQGLFDIICyOjbblghJdhSMXk/https/cdn.weeb.sh/images/ryoW3T_vW.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127184799268864/image0.gif",
        "https://images-ext-1.discordapp.net/external/KsK-8tyqhbUMmln7ONZZzMPzWaO8RRnsgDkjMGCD67w/https/cdn.weeb.sh/images/B12g3TOPZ.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127067488911360/image0.gif",
        "https://images-ext-1.discordapp.net/external/RrIJqwya0V5YZrs2cSZWIZv0Ey5CTZmGtmChjCDUDYo/https/cdn.weeb.sh/images/SJQRoTdDZ.gif",
        "https://images-ext-2.discordapp.net/external/m9eklzJLlkvESWgtdy_X54vVtApnaf5q4CJwCUb9vro/https/cdn.weeb.sh/images/H1tv2p_Db.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127260565307402/image0.gif",
        "https://images-ext-2.discordapp.net/external/rCU9rz5uujwZfgs8qSXX87FOMC-e3XAbMnhI4iO_F_k/https/cdn.weeb.sh/images/Hy-oQl91z.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127347844448282/image0.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127561787506699/image0.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127582901633034/image0.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127677277667328/image0.gif",
        "https://cdn.discordapp.com/attachments/577500526749679619/580127874657550336/image0.gif",
        "https://images-ext-1.discordapp.net/external/z-ha0J2w7UjiYDtFxaOiCL9X-sXcNsIhX9u70_8kSI0/https/cdn.weeb.sh/images/H1e7nadP-.gif",
        "https://tenor.com/view/kissing-make-up-caressing-smooching-snuggling-gif-13953470",
        "http://45.media.tumblr.com/00e6fbba41137992c38c04b4737b5c0b/tumblr_nko99t1z401uo0fjdo1_500.gif",
        "https://media0.giphy.com/media/17zrEYLzrQwgM/giphy.gif?cid=790b76115ccc8cc761596a33551818af&rid=giphy.gif",
        "https://media1.tenor.com/images/39cfeb56ad27483e51037ad2cf51af97/tenor.gif",
        "https://images-ext-2.discordapp.net/external/2aOrF1ZdAQZzSr6Jeby3VGq76X_g_OAlWgsK4PliTcs/https/cdn.weeb.sh/images/Sy6Ai6ODb.gif",
        "https://78.media.tumblr.com/6ee2b7c64bdd13b93c9cf6abc2d16b5e/tumblr_o2nnk0G2P41ulficuo1_500.gif",
        "https://images-ext-1.discordapp.net/external/x3wxLuZ3BftWulacXCVrk7iDc3GJlkwD0EbJbA9_l0Y/https/cdn.weeb.sh/images/Sksk4l51z.gif",
        "https://images-ext-2.discordapp.net/external/dMuL1QWAmMnktxtoS4axRN0g_is0B_WiTpU6t0k85pQ/https/cdn.weeb.sh/images/SJ--2auDZ.gif",
        "https://thumbs.gfycat.com/SimilarWealthyHawk-size_restricted.gif",
        "https://images-ext-2.discordapp.net/external/KEEfJ9-N-ie14CUblqic94d-fdwsTB65-Ij7MSHjzCQ/https/cdn.weeb.sh/images/ByurnpODW.gif",
        "https://images-ext-1.discordapp.net/external/oNSDV9UyxGTA1XFqxYXBO_F5X0jNRoLl4VTlHukdJXA/https/cdn.weeb.sh/images/Bkuk26uvb.gif",
        "https://images-ext-2.discordapp.net/external/fh0DlgBBnwvZaXzb6c_qkMX0c7tuy3Yo_5ijXPXMRyU/https/cdn.weeb.sh/images/ryFdQRtF-.gif",
        "https://images-ext-2.discordapp.net/external/kCPyFDjySVa0zhqLoqDAN3ukGw4fjCuQgurS8HEHMP8/https/cdn.weeb.sh/images/SJJUhpOD-.gif",
        "https://images-ext-1.discordapp.net/external/f8CBPFmC073A6t2gGusaZ1QCw0FQZZCv0DW-2tXLa6Q/https/cdn.weeb.sh/images/H1a42auvb.gif",
        "https://images-ext-2.discordapp.net/external/9j2oCUaiBkLVgicVP--RqcSQZUvzpgoMJsLtY-vIJKw/https/cdn.weeb.sh/images/HklBtCvTZ.gif",
        "https://images-ext-2.discordapp.net/external/rD7yBGlVLD3FPr6k8n9j4us4A7wSQVSTcDsoBASGadY/https/cdn.weeb.sh/images/r10UnpOPZ.gif",
        "https://images-ext-1.discordapp.net/external/b1bxHaV30aGo5TjuVoMoiQnimMFqFGC9SQ2LcwZbIgM/https/cdn.weeb.sh/images/rJrCj6_w-.gif",
        "https://images-ext-1.discordapp.net/external/j5LjPVJ12Z3iTz4_dX3ndMa3O1qSBOvbmOVm_PTLvuA/https/cdn.weeb.sh/images/ry-r3TuD-.gif",
        "https://media2.giphy.com/media/F1WftEL9Luw7K/giphy.gif?cid=790b76115ccc8ce1784375626f8096b8&rid=giphy.gif",
        "https://data.whicdn.com/images/76661628/original.gif",
        "https://images-ext-1.discordapp.net/external/9TcfYpOyiCNkuOZVV5Bqh7z8_2kBUDcZJ4ITpOlicU4/https/cdn.weeb.sh/images/Sk1k3TdPW.gif",
        "https://images-ext-1.discordapp.net/external/_t7w_aBBhKaTWtOxMUo772YFXz2hmYJ9gUo6QFMf9lk/https/cdn.weeb.sh/images/Skc42pdv-.gif",
        "https://images-ext-2.discordapp.net/external/auznSk7yqtg_M2wKmlNW-BsyE2-kY9fEeH572pQSZ1Y/https/cdn.weeb.sh/images/B1yv36_PZ.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935883889275187261/lap-kiss.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935883889560408095/giphy.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935883970321723392/dc29auj-9489363a-9a1e-4ef3-bf58-f5ea450a694e.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935883970774716436/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f727949...652f3763314672437944436e595952673d3d2d3732323130373238322e313539376266626164376339373765323132303432333434353135302e676966.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935883971647115274/Morning-Makeout.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935884354264129616/3c55f9f3ab028c316647310937646f0e.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935884354821959720/couple-kiss.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935884355388194816/French-Kiss-Kissing-GIF-FrenchKiss-Kissing-Couple-Discover.gif",
        "https://media3.giphy.com/media/n5lxRSJWjKbkY/giphy.gif?cid=790b76115ccc8cf54b34474e4d77027f&rid=giphy.gif",
        "https://media.discordapp.net/attachments/917295589371301899/927965602923024434/200_1.gif",
        "https://media.discordapp.net/attachments/917295589371301899/927965602608463922/200.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935877569658621992/2.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935877570329718794/5.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935877570824634418/0_ccC0P9gHsLr_ixyc.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935877648331190282/opusme-sevgi-seksi-animasyon-whatsapp7.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935877648910008410/12.gif",
        "https://media.discordapp.net/attachments/934389291403075645/935877649505591366/images.jpeg",
        "https://media.discordapp.net/attachments/934389291403075645/935877650138943588/ceykor-opusme.gif",
        "https://images-ext-1.discordapp.net/external/bVpCoCMrburBWo3u55QQhfLGEHo3sEdjvIaBIEEUUVM/https/cdn.weeb.sh/images/rkv_mRKF-.gif",
        "https://images-ext-2.discordapp.net/external/gH_EpCJcPfbBg4YGRUMKTJFVDm-zFx_Cr-_E1I7cWic/https/cdn.weeb.sh/images/S1-KXsh0b.gif",
        "https://images-ext-2.discordapp.net/external/jrwsDnvFNgdS26mOJp7Qkf189nQsEiK76zMcV0W5J94/https/cdn.weeb.sh/images/HJlWhpdw-.gif",
        "https://images-ext-1.discordapp.net/external/8lwB7-f28B5lwSK4T8CdrCQoybwdcIKhWG9-GGchBa4/https/cdn.weeb.sh/images/H1Gx2aOvb.gif",
        "https://images-ext-2.discordapp.net/external/lK6beqsVL_bU528XfVd8xmXZW9iqd1k8LZCp3FzgqiQ/https/cdn.weeb.sh/images/SydfnauPb.gif",
        "https://images-ext-1.discordapp.net/external/aVabAKVgnUMWWH-0yGVe6v3H_QISdNSiRov8pXKGxt8/https/cdn.weeb.sh/images/r1H42advb.gif",
        "https://images-ext-2.discordapp.net/external/fh0DlgBBnwvZaXzb6c_qkMX0c7tuy3Yo_5ijXPXMRyU/https/cdn.weeb.sh/images/ryFdQRtF-.gif",
        "https://images-ext-1.discordapp.net/external/MEa5JtAFAeryP6eAHHwD1PNUB4pX3dOxlQiizUvZwP8/https/cdn.weeb.sh/images/rkde2aODb.gif",
        "https://images-ext-1.discordapp.net/external/Nn1X3MLFdEYCctqH_VL74FRKD5Fo8SvlRZQhXOQ9xOU/https/cdn.weeb.sh/images/BJLP3a_Pb.gif"
        ];

    const resimler = gifler[Math.floor(Math.random() * gifler.length)];

    const embed = new EmbedBuilder()
      .setDescription(`${message.author} sana bir öpücük gönderdi!`)
      .setImage(resimler)
      .setColor("Random")
      .setFooter({ text: `${message.author.tag} | ${message.guild.name}`, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setThumbnail(member.displayAvatarURL({ dynamic: true }));

    message.react(onay);
    message.reply({ embeds: [embed], content: `${member}` });
  }
};
