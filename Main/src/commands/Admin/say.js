const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const emojidb = require("../../../../Database/src/Settings/emojis.json")

module.exports = {
    name: 'say',
    aliases: ["count","sunucusay"],
    description: 'Sunucudaki aktifliği sayar.',
    category: 'Admin',
    async execute(message) {
        if (!message.member.permissions.has(PermissionsBitField.Flags.Administrator) && !message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return;

        const totalMember = message.guild.memberCount;
        const onlineMember = message.guild.members.cache.filter(m => m.presence && m.presence.status !== "online").size
        const voiceMember = message.guild.members.cache.filter(m => m.voice.channel).size
      
        const embed = new EmbedBuilder({
            description: `
            **${message.guild.name}** adlı sunucumuzun anlık aktiflik bilgileri;

            Toplam **${totalMember}** üye bulunmakta. Bunlardan **${onlineMember}** tanesi çevrimiçi ve **${voiceMember}** tanesi seslide bulunmakta.
            Sunucuda toplam **${message.guild.premiumSubscriptionCount}** (${message.guild.premiumTier !== 'NONE' ? `\`${message.guild.premiumTier.toString().replace("Tier_1", "1").replace("Tier_2", "2").replace("Tier_3", "3")}. Lvl\`` : ''}) boost var.`,
        })

        message.channel.send({ embeds: [embed] });
    }
};