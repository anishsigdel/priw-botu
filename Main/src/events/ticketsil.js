const ayar = require("../../../Database/src/Settings/settings.json");

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {
        if (!interaction.isButton()) return; 

        const butoncuk = interaction.customId; 
        const sunucu = interaction.guild; 
        const kanal = interaction.channel; 
        const yarram = interaction.user; 
        const ticketyt = ayar.ticketStaff; 

    
        const staffmısın = interaction.member.roles.cache.has(ticketyt);

       
        

      
        if (butoncuk === 'ticketikapat') {
            if (!staffmısın) {
                return interaction.reply({
                    content: 'Bu işlemi yapmaya yetkiniz yok.',
                    ephemeral: true,
                });
            }
            await interaction.reply({
                content: `Ticket'iniz kapatılıyor, ${yarram}.`,
                ephemeral: true, 
            });

           
            await kanal.permissionOverwrites.edit(sunucu.id, {
                ViewChannel: false, 
            });

            
            await kanal.send({ content: 'Ticket kapatıldı.' });
        }

       
        if (butoncuk === 'ticketisil') {
          
            if (!staffmısın) {
                return interaction.reply({
                    content: 'Bu işlemi yalnızca staff yapabilir.',
                    ephemeral: true, 
                });
            }

            await interaction.reply({
                content: `Ticket'iniz siliniyor, ${yarram}.`,
                ephemeral: true, 
            });

            await kanal.delete();
        }
    },
};
