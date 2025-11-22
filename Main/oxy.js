const { Client, GatewayIntentBits, Collection, EmbedBuilder  } = require('discord.js');
const fs = require('fs');
const path = require('path');
const setupum = require("../Database/src/Settings/settings.json")
const ayar = require('../conf.json');
const mongoose = require('mongoose');
const snipe = require("../Database/src/Models/snipe");
const emojis = require("../Database/src/Settings/emojis.json")
const { ButtonBuilder, ButtonStyle, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require('discord.js');

const managerbot = global.bot = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences
  ],
});

const { Database } = require("ark.db");
const setupdb = (global.setupdb = new Database("../Database/src/Settings/settings.json"));
const emojidb = (global.emojidb = new Database("../Database/src/Settings/emojis.json"));

mongoose.connect(ayar.Data, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB bağlantısı başarılı!'))
.catch((error) => console.error('MongoDB bağlantısı hatası:', error));


managerbot.events = new Map();
const eventsPath = path.join(__dirname, './src/events');
fs.readdirSync(eventsPath).forEach((file) => {
  if (file.endsWith('.js')) {
    const event = require(path.join(eventsPath, file));
    managerbot.events.set(event.name, event);

    console.log(`[oxy Events] Event yüklendi: ${event.name}`);

    managerbot.on(event.name, (...args) => {
      event.execute(...args);
    });
  }
});


managerbot.commands = new Collection();
const loadCommands = (dirPath) => {
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);
    
  
    if (stat.isDirectory()) {
      loadCommands(fullPath); 
    } else if (file.endsWith('.js')) {
      const command = require(fullPath);
      managerbot.commands.set(command.name, command);
      console.log(`[oxy Commands] Komut yüklendi: ${command.name}`);
    }
  });
};

loadCommands(path.join(__dirname, './src/commands'));

managerbot.on('modalSubmit', async (modal) => {
  if (modal.customId === 'isimDegistirModal') {
      const member = modal.guild.members.cache.get(modal.user.id);
      const newNickname = modal.fields.getTextInputValue('newNickname');

      
      try {
          await member.setNickname(newNickname);
          await modal.reply({ content: "İsminiz başarıyla değiştirildi!", ephemeral: true });
      } catch (error) {
          console.error(error);
          await modal.reply({ content: "İsim değiştirme sırasında bir hata oluştu.", ephemeral: true });
      }
  }
});

managerbot.on('interactionCreate', async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  if (interaction.customId === 'command_search_modal') {
    
    const komut = interaction.fields.getTextInputValue('command_name').toLowerCase();  

    const komutlar = managerbot.commands;

  
    const bulunanKomut = komutlar.get(komut) || komutlar.find(cmd => cmd.aliases && cmd.aliases.includes(komut));

    if (bulunanKomut) {
      const komutAdi = bulunanKomut.name;
      const komutAliaslari = bulunanKomut.aliases ? bulunanKomut.aliases.join(', ') : 'Yok';
      const komutAciklama = bulunanKomut.description || 'Açıklama bulunamadı.';

      await interaction.reply({
        content: `**Komut Adı:** ${komutAdi}\n**Alternatif kullanımlar:** ${komutAliaslari}\n**Açıklama:** ${komutAciklama}`,
        ephemeral: true
      });
    } else {
      await interaction.reply({
        content: `Aradığınız komut bulunamadı: **${komut}**.`,
        ephemeral: true
      });
    }
  }
});

managerbot.on('interactionCreate', async (interaction) => {
  if (!interaction.isStringSelectMenu()) return;

  const value = interaction.values[0];
  const data = await snipe.find({ guildID: interaction.guild.id, channelID: interaction.channel.id });
  const selectedMessage = data.find(msg => `${msg.deletedDate}` === value);
  const pageSize = 10;
  const pages = Math.ceil(data.length / pageSize);
  const selectMenus = [];

  for (let i = 0; i < pages; i++) {
    const startIndex = i * pageSize;
    const endIndex = Math.min(startIndex + pageSize, data.length);
    const options = data.slice(startIndex, endIndex).map((msg, index) => ({
      label: `Mesaj ${startIndex + index + 1}`,
      description: msg.messageContent.length > 50 ? `${msg.messageContent.slice(0, 50)}...` : msg.messageContent,
      value: `${msg.deletedDate}`
    }));
    if (interaction.customId === `snipe_select_${i}`) {
      if (!selectedMessage) {
        return interaction.reply({ content: 'Mesaj bulunamadı!', ephemeral: true });
      }
  const author = await managerbot.users.fetch(selectedMessage.userID);


  const hembed = new EmbedBuilder()
    .setAuthor({ name: author.tag, iconURL: author.displayAvatarURL({ dynamic: true }) })
    .setDescription(`
      ${emojis.dot}  Mesaj Sahibi: <@${selectedMessage.userID}> - [\`${selectedMessage.userID}\`]
      ${emojis.dot}  Mesajın Yazılma Tarihi: <t:${Math.floor(selectedMessage.createdDate / 1000)}:R>
      ${emojis.dot}  Mesajın Silinme Tarihi: <t:${Math.floor(selectedMessage.deletedDate / 1000)}:R>

      \`\`\`fix\n${selectedMessage.messageContent ? selectedMessage.messageContent : ""}\`\`\`
    `);

  interaction.update({ embeds: [hembed] }).then((e) => setTimeout(() => { e.delete(); }, 5000));
}}});

const db = require('croxydb')

managerbot.on('guildMemberAdd', async (member) => {
  if(member.guild.id !== ayar.Server) return;
  const channel = member.guild.channels.cache.get(setupum.invLog)
  const invites = await member.guild.invites.fetch()
  const inviter = db.fetch(`inviter_${member.id}`)
  const invite = invites.find((invite) => invite.inviter && invite.inviter.id !== managerbot.user.id);
  const inviteCount = db.fetch(`invite_${inviter}`)

  const accountCreationDate = member.user.createdAt;
  const daysSinceCreation = (Date.now() - accountCreationDate.getTime()) / (1000 * 3600 * 24); 

  if (daysSinceCreation < 7) {
    db.set(`invite_type_${member.id}`, 'fakeinvite');
  } else {
    db.set(`invite_type_${member.id}`, 'regular');
  }
  db.add(`invite_${invite.inviter.id}`, 1)
  db.set(`inviter_${member.id}`, `${invite.inviter.id}`)

  channel.send({content: `${emojis.ekle} ${member} Sunucuya katıldı, **${member.guild.memberCount}** kişi olduk! ${emojis.giveaway}`})
});


managerbot.on('guildMemberRemove', async (member) => {
  if(member.guild.id !== ayar.Server) return;
  const channel = member.guild.channels.cache.get(setupum.invLog)
  const inviter = db.fetch(`inviter_${member.id}`)
  let inviteCount = db.fetch(`invite_${inviter}`)


  const accountCreationDate = member.user.createdAt;
  const daysSinceCreation = (Date.now() - accountCreationDate.getTime()) / (1000 * 3600 * 24); 

  if (inviteCount > 0) {
    if (daysSinceCreation < 7) {
      await db.subtract(`fakeinvite_${inviter}`, 1);
    } else {
      await db.subtract(`regular_${inviter}`, 1);
    }
    inviteCount = db.fetch(`invite_${inviter}`);
  }
  db.push(`leave_invites_${inviter}`, {
    member: member.id,
    date: new Date().toISOString()
  });
 
  await channel.send({content: `${emojis.cikar} ${member} Sunucudan ayrıldı. ${emojis.giveaway}`});
});



managerbot.login(ayar.ManagerKey);
