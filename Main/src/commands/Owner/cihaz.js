const { EmbedBuilder, PermissionsBitField } = require("discord.js");

module.exports = {
    name: 'cihaz',
    aliases: ["cihazı","cihazım","device"],
    description: 'Belirledğiniz üye veya sizin cihazınızı gösterir. <oxy/id>',
    category: 'Owner',
    async execute(message, args) {
    
        if (!message.guild) return;

        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator)) return;

        let embed = new EmbedBuilder()
            .setAuthor({ name: message.member.displayName, iconURL: message.author.avatarURL({ dynamic: true }) })
            .setTimestamp();

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

     
        if (member.presence?.status === "offline") {
            return message.channel.send({ embeds: [embed.setDescription(`${member} üyesi çevrim dışı!`)] });
        }

       
        let clientStatus = member.presence?.clientStatus;
        if (!clientStatus) {
            return message.channel.send({ embeds: [embed.setDescription(`${member} üyesinin cihaz bilgilerine ulaşılamadı.`)] });
        }

        let statusDescription = Object.keys(clientStatus)
            .map(c => {
                return `\`•\` ${c.replace("desktop", "Masaüstü Uygulaması")
                    .replace("mobile", "Mobil Cihaz")
                    .replace("web", "İnternet Tarayıcısı")} (${clientStatus[c].replace("online", "Çevrim içi")
                    .replace("dnd", "Rahatsız etmeyin")
                    .replace("idle", "Boşta")})`;
            })
            .join("\n");

        message.channel.send({
            embeds: [embed.setDescription(`${member} üyesinin şu anki cihazları;\n\n${statusDescription}`)]
        });
    }
};

  