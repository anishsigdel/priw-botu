const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'text',
    aliases: ["yazdir","textobot"],
    description: 'Bota yazı yazdırır. <metin/embed> <içerik>',
    category: 'Admin',
    async execute(message) {


        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;

     
        const args = message.content.slice(message.content.indexOf(' ') + 1).trim().split(/ +/); 

    
        if (args[0] !== "metin" && args[0] !== "embed") {
            return message.reply({ content: "Göndermek istediğiniz mesajın türünü seçiniz (metin/embed)" });
        }

        if (!args[1]) {
            return message.reply({ content: "Mesaj içeriğini girmelisiniz!" });
        }

  
        if (args[0] === "metin") {
            if (message) message.delete();  
            message.channel.send({ content: `${args.slice(1).join(" ")}` });  
        }

        if (args[0] === "embed") {
            if (message) message.delete();  
            message.channel.send({ embeds: [new EmbedBuilder().setDescription(`${args.slice(1).join(" ")}`)] }); 
        }
    }
}
