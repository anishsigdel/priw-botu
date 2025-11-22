const UserStats = require('../../../Database/src/Models/user'); 


async function getUserStats(userId) {
  const stats = await UserStats.findOne({ userId });
  return stats || { messageCount: 0 };
}


async function getVoiceStats(userId) {
  const stats = await UserStats.findOne({ userId });
  return stats || { totalVoiceTime: 0 };  
}

module.exports = { getUserStats, getVoiceStats };
