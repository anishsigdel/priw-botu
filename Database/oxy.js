const { Client, Collection } = require("discord.js");
const ayar = require("../conf.json");
const mongoose = require("mongoose");

// Error handling
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (error) => {
  console.log('Uncaught Exception:', error);
  process.exit(1);
});

const client = (global.bot = new Client({
  fetchAllMembers: true,
  intents: 32767,
}));

client.commands = new Collection();

const connectDB = async () => {
  try {
    // MongoDB bağlantısı - deprecated seçenekleri kaldırıldı
    await mongoose.connect(ayar.Data);
    console.log("Database bağlantısı tamamlandı!");
    
    // Event handler'ı yükle
    require("./src/Handlers/EventHandler.js");
    
    // Bot'u başlat
    await client.login(ayar.DatabaseKey); // DatabaseKey yerine DatabaseKey kullanın
    console.log("Bot başarıyla başlatıldı!");
    
  } catch (error) {
    console.error("Başlatma hatası:", error);
    
    // Eğer MongoDB bağlantısı başarısızsa, bot'u offline modda başlat
    if (error.name === 'MongooseServerSelectionError') {
      console.log("MongoDB bağlantısı başarısız, bot offline modda başlatılıyor...");
      try {
        await client.login(ayar.DatabaseKey);
        console.log("Bot offline modda başlatıldı!");
      } catch (loginError) {
        console.error("Bot login hatası:", loginError);
        process.exit(1);
      }
    } else {
      process.exit(1);
    }
  }
};

// MongoDB bağlantı olayları
mongoose.connection.on('connected', () => {
  console.log('MongoDB bağlantısı kuruldu');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB bağlantı hatası:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('MongoDB bağlantısı kesildi');
});

connectDB();