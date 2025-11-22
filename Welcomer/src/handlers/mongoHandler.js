const mongoose = require("mongoose");
const ayarlar = require("../../../conf.json");

mongoose.set('strictQuery', true);
mongoose.connect(ayarlar.Data, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on("connected", () => {
  console.log("Database bağlantısı tamamlandı!");
});
mongoose.connection.on("error", () => {
  console.error("[HATA] Database bağlantısı kurulamadı!");
});