const { EmbedBuilder } = require('discord.js');
const { onay, carpi } = require("../../../../Database/src/Settings/emojis.json");

module.exports = {
  name: 'sarıl',
  aliases: ["hug","saril"],
  description: 'Belirttiğiniz kullanıcıya bol bol sarılın! <oxy/id>',
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
      return message.reply({ content: "Kendine sarılamazsın!" });
    }

  
    if (member.id === message.client.user.id) {
      await message.react(carpi);
      return message.reply({ content: "Bota sarılamazsın!" });
    }

    if (member.user.bot) {
      await message.react(carpi);
      return message.reply({ content: "Botlara sarılamazsın!" });
    }

 
    const gifler = [
    'https://media.discordapp.net/attachments/854240833049067590/935888252299259964/milk-and-mocha-cuddling.gif',
'https://media.discordapp.net/attachments/854240833049067590/935888251816927252/running-hug.gif',
'https://media.discordapp.net/attachments/854240833049067590/935886515752558652/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f50416b5f5a62427368664b5265513d3d2d34382e313630373365613462626131356665393830303936363131363537392e676966.gif',
'https://media.discordapp.net/attachments/854240833049067590/935886515312160908/tumblr_c4fee63afd5497fb1c004492a2b7ad60_1ffde95c_500.gif',
'https://media.discordapp.net/attachments/854240833049067590/935886514989174925/70wZ.gif',
'https://media.discordapp.net/attachments/854240833049067590/935886470651187211/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f727949...2f4955444e70344b4f7231425170413d3d2d313039353637383635342e313638663037643336613831346262333834393432383930323330342e676966.gif',
'https://media.discordapp.net/attachments/854240833049067590/935886470395351070/milk-and-mocha-hug.gif',
'https://media.discordapp.net/attachments/854240833049067590/935886470189817866/mochi-peachcat-mochi.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156810796498954/BJF5_uXvZ.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156815381135380/BkBs2uk_b.gif',
'https://images-ext-2.discordapp.net/external/Ub9wxmE5jf8GGCbC44jYMWlN_AmfxTfQwEeSV2A869M/https/cdn.weeb.sh/images/Sy65_OQvZ.gif',
'https://media.discordapp.net/attachments/917295589371301899/927970805676134460/357157d3a74ce4421e30d960e3bfdc5f.gif',
'https://media.discordapp.net/attachments/917295589371301899/927970806053629982/large_2.gif',
'https://media.discordapp.net/attachments/917295589371301899/927970806540152852/ea97cf295a00771dc164df7cf3e9c88d.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156818103107585/H1ui__XDW.gif',
'https://images-ext-2.discordapp.net/external/iYOTMwzM8SAFzhx4JoSFGRpSdSN75hF3454lyxc-wOw/https/cdn.weeb.sh/images/r1kC_dQPW.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156823790452776/SywetdQvZ.gif',
'https://images-ext-2.discordapp.net/external/DW_JAjCEp8cv0BuB8MqCsJcGrcP0hMNyi902U841x5E/https/cdn.weeb.sh/images/B11CDkhqM.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156853250719784/BkBs2uk_b.gif',
'https://images-ext-2.discordapp.net/external/Thk4yqjg6pAnDqoUSs7Ijv19Q7ggLgzTNrXHqjxwjDE/https/cdn.weeb.sh/images/rk6PsvOUM.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156865829306419/8e70d198-9ddc-40aa-b0c6-ccb4573f14a42FHJU2OdmwW.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156871458455592/BJ0UovdUM.gif',
'https://images-ext-1.discordapp.net/external/C_hUEibQTv8udnPvr49yVurcC5fdvGN-g1DHh7P5HTE/https/cdn.weeb.sh/images/SyaAd_7vW.gif',
'https://images-ext-2.discordapp.net/external/0Qqr3MhBsC1p5peV7LwrRY0QpuQtssC88kEpUTlgtsE/https/cdn.weeb.sh/images/r1bAksn0W.gif',
'https://images-ext-2.discordapp.net/external/u-06dasD5ypmKqmirfEI_1R57S2ukXb_bIIFFWUujn8/https/cdn.weeb.sh/images/HkQs_dXPZ.gif',
'https://images-ext-1.discordapp.net/external/2AiwmHWQaS_XkvvnTXvOjQ97_i7obTrXZWBo79XlIu0/https/cdn.weeb.sh/images/r1R3_d7v-.gif',
'https://cdn.weeb.sh/images/H1X6OOmPW.gif',
'https://images-ext-1.discordapp.net/external/Ki4ytGZlwiyMkKqBrL6Jvxj01A6_TQ5-wbIB-MmqWp4/https/cdn.weeb.sh/images/Hk3ox0tYW.gif',
'https://cdn.discordapp.com/attachments/767145493822046229/767156876198019082/ByPGRkFVz.gif',
'https://images-ext-1.discordapp.net/external/PDpYIi07VOBExcTswU0ETtxLSF_QVQ6YaHr_4Dvm1Nc/https/cdn.weeb.sh/images/BkHA_O7v-.gif',
'https://images-ext-1.discordapp.net/external/PDpYIi07VOBExcTswU0ETtxLSF_QVQ6YaHr_4Dvm1Nc/https/cdn.weeb.sh/images/BkHA_O7v-.gif',
'https://images-ext-1.discordapp.net/external/2AiwmHWQaS_XkvvnTXvOjQ97_i7obTrXZWBo79XlIu0/https/cdn.weeb.sh/images/r1R3_d7v-.gif',
'https://images-ext-1.discordapp.net/external/NB_B_bx-DLeQoUGo6oHoxyLa9hoD_fMtX5viapsPAq8/https/cdn.weeb.sh/images/ryuhhuJdb.gif',
'https://images-ext-2.discordapp.net/external/YSH6MzKY5bdTrVcEkStQ_CdpiPn5uZn4Nmt2eWF1J6g/https/cdn.weeb.sh/images/HkRwnuyuW.gif',
'https://images-ext-2.discordapp.net/external/Mjq0LUze9WBW9_S4YV6GDUixFNoSCwpcSABvmRjdV6w/https/cdn.weeb.sh/images/BkotddXD-.gif',
'https://images-ext-1.discordapp.net/external/gRSqKHozPS9foIY_I608kk_QfoycaW1-h5H-ey0U9dQ/https/cdn.weeb.sh/images/rJv2H5adf.gif',
'https://images-ext-2.discordapp.net/external/iEC3z8yEo0vfwoWgLR9nXLtRxM-a4-c5hBPxmrtcadA/https/cdn.weeb.sh/images/ryPix0Ft-.gif',
'https://images-ext-1.discordapp.net/external/wwnMkOuo4TBt_QliCxgUNn_fGX2NrPl2lfPvJBvXNjA/https/cdn.weeb.sh/images/rkN2u_XP-.gif',
'https://images-ext-2.discordapp.net/external/_FI20LII9PG87rzbd9WDjmWMqkSN4QsECVdf6sYzunI/https/cdn.weeb.sh/images/S1DyFuQD-.gif',
'https://images-ext-1.discordapp.net/external/QYnzqF83OZ14RzVoM1t3EUw62M5x9WiIRTdwwNkVW0c/https/cdn.weeb.sh/images/HkfgF_QvW.gif',
'https://images-ext-2.discordapp.net/external/YZ6yky1cWG9B7MwtggVOIAYof-D8E6No5DCLbZsJWX0/https/cdn.weeb.sh/images/S1qX2OJ_Z.gif',
'https://images-ext-2.discordapp.net/external/J8VQeuIX02yM134dAShL7Q4a5g_lySbtIgWsnB2tqNM/https/cdn.weeb.sh/images/S1OAduQwZ.gif',
'https://images-ext-1.discordapp.net/external/KzJieMWS7_SU7uAos_EhSOyh5amvsElHGGKvM4CiGyE/https/cdn.weeb.sh/images/S1qhfy2cz.gif',
'https://images-ext-2.discordapp.net/external/3wXDLr7wXxXe0SXGMsZAAKR68yQDiuFn9y5d4ww1UlI/https/cdn.weeb.sh/images/BJ0UovdUM.gif',
'https://images-ext-2.discordapp.net/external/jrX0nCT1NyyMX0P35blVgvt51v3Y9tBPEjaKOlJgvP0/https/cdn.weeb.sh/images/Hy4hxRKtW.gif',
'https://images-ext-1.discordapp.net/external/5oXkEEAHxAPmHQxNkjQMxdyE4vbHaedZnMrhoQ-RVsQ/https/cdn.weeb.sh/images/SJWR__7P-.gif',
'https://images-ext-2.discordapp.net/external/iYOTMwzM8SAFzhx4JoSFGRpSdSN75hF3454lyxc-wOw/https/cdn.weeb.sh/images/r1kC_dQPW.gif',
'https://images-ext-2.discordapp.net/external/Kt5_AgD-5oka22XeloOodF4YsndgkDNScvDztPAi44o/https/cdn.weeb.sh/images/SJn18IXP-.gif',
'https://images-ext-2.discordapp.net/external/3d8f8FW7iWLEPKrY03UURjkLpZN4TBQNjCJtn5wusjA/https/cdn.weeb.sh/images/Hy5y88mPb.gif',
'https://images-ext-2.discordapp.net/external/mbTjYMx8QhXNXxpjgxRUOC6LHwrruFaM1V4e9K0AenI/https/cdn.weeb.sh/images/S1T91Att-.gif',
'https://images-ext-1.discordapp.net/external/G0q966OtFNMiza_G4GJynRQzCZq959hZURk776C0EA8/https/cdn.weeb.sh/images/BJseUI7wb.gif'
];

    const resimler = gifler[Math.floor(Math.random() * gifler.length)];

    const embed = new EmbedBuilder()
      .setDescription(`${message.author} sana kucak dolusu sarıldı!`)
      .setImage(resimler)
      .setColor("Random")
      .setFooter({ text: `${message.author.tag} | ${message.guild.name}`, iconURL: message.author.avatarURL({ dynamic: true }) })
      .setThumbnail(member.displayAvatarURL({ dynamic: true }));

    message.react(onay);
    message.reply({ embeds: [embed], content: `${member}` });
  }
};
