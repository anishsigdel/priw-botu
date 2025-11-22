const { isLicenseValid } = require("../../../license-checker");

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        // License kontrolü - eğer süre dolmuşsa hiçbir mesaja cevap verme
        if (!isLicenseValid()) {
            return; // Hiçbir şey yapma, sessizce çık
        }
        
const UserStats = require("../../../Database/src/Models/user")
    if (message.author.bot) return;
  
    const userStats = await UserStats.findOne({ userId: message.author.id });
    if (userStats) {
      userStats.messageCount++;
      await userStats.save();
    } else {
      const newUserStats = new UserStats({ userId: message.author.id, messageCount: 1 });
      await newUserStats.save();
    }
  }
}
  