const { EmbedBuilder, Collection } = require("discord.js");
const sex = require("../../../conf.json");
const emojis = require("../../../Database/src/Settings/emojis.json")
const Blacklist = require("../../../Database/src/Models/blacklist");
const { getUserStats, getVoiceStats } = require('../../../Database/src/Functions/stat');

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isSelectMenu()) return;

        const user = interaction.user;

        const karaliste = await Blacklist.findOne({ userId: user.id, isActive: true });

        if (karaliste) {
          return interaction.reply({
            content: "Üzgünüz, kara listeye alındığınız için bu işlemi gerçekleştiremezsiniz.",
            ephemeral: true,
          });
        }

        if (interaction.customId === 'amsıkenoxy') {
            const secenegimaq = interaction.values[0];

            switch (secenegimaq) {
                case 'yaaramınoglu1':
                    await interaction.reply({
                        content: `Hesabınız **${user.createdAt.toLocaleDateString()}** tarihinde oluşturulmuştur.`,
                        ephemeral: true,
                    });
                    break;

                case 'hırrımınucu':
                    const sunucu = interaction.guild;
                    const toplamuye = sunucu.memberCount;
                    const boostlar = sunucu.premiumSubscriptionCount;
                    const sunucuid = sunucu.id;
                    const aktifüyeler = sunucu.members.cache.filter(member => member.presence?.status === 'online').size;
                    const sesaktifligi = sunucu.members.cache.filter(member => member.voice.channel).size;

                    await interaction.reply({
                        content: `${emojis.ucgen} Aşağıda **${sunucu.name}** sunucumuzun anlık aktifliği bulunmaktadır.\n\n**__Toplam Üye:${toplamuye}__**\n**__Toplam Boost: ${boostlar}__**\n**__Sunucu ID: ${sunucuid}__**\n**__Toplam Aktif Üye: ${aktifüyeler}__**\n**__Toplam Sesteki Üye: ${sesaktifligi}__**`,
                        ephemeral: true
                    });
                    break;

                case 'roller':
                    const member = interaction.guild.members.cache.get(user.id);
                    const roles = member.roles.cache
                        .filter(role => role.name !== '@everyone')
                        .map(role => `<@&${role.id}> (${role.name})`)
                        .join('\n') || 'Hiç rolü yok.';

                    await interaction.reply({
                        content: `Sahip olduğunuz roller:\n${roles}`,
                        ephemeral: true,
                    });
                    break;

                case 'mesajcik':
                    const messageStats = await getUserStats(user.id);
                    await interaction.reply({
                        content: `Mesaj İstatistikleriniz:\n\nToplam mesaj sayısı: ${messageStats.messageCount}`,
                        ephemeral: true,
                    });
                    break;

                case 'sesciks':
                    const voiceStats = await getVoiceStats(user.id);
                    await interaction.reply({
                        content: `Ses İstatistikleriniz:\n\nToplam sesli kanal süresi: ${voiceStats.totalVoiceTime} dakika`,
                        ephemeral: true,
                    });
                    break;

                default:
                    await interaction.reply({
                        content: 'Geçersiz seçim.',
                        ephemeral: true
                    });
                    break;
            }
        }
    }
};
