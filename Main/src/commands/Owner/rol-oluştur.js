module.exports = {
    name: 'role-crate',
    aliases: ["rolaç","rololuştur","rolc"],
    description: 'Yeni bir rol oluşturur. <rol adı> <#renk kodu>',
    category: 'Owner',
    async execute(message, args) {
      if (!message.member.permissions.has('MANAGE_ROLES')) {
        return message.reply('Bu komutu kullanabilmek için roller üzerinde yönetim yetkiniz olmalı.');
      }
  
      const rolAdi = args[0];
      const renk = args[1];
  
      if (!rolAdi) {
        return message.reply('Yeni rol için bir isim belirtmelisiniz.');
      }
  
      if (!renk) {
        return message.reply('Yeni rol için bir renk kodu belirtmelisiniz (örneğin: `#FF5733`).');
      }

      const hexColorRegex = /^#[0-9A-Fa-f]{6}$/;
      if (!hexColorRegex.test(renk)) {
        return message.reply('Geçerli bir renk kodu girmeniz gerekiyor. Örnek: `#FF5733`.');
      }
  
      try {
        const rol = await message.guild.roles.create({
          name: rolAdi,
          color: renk,
          permissions: [], 
        });
  
        message.reply(`**${rol.name}** rolü başarıyla oluşturuldu ve rengi **${renk}** olarak ayarlandı.`);
      } catch (error) {
        message.reply('Rol oluşturulurken bir hata oluştu.');
        console.error(error);
      }
    }
  };
  