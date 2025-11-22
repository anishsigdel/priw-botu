module.exports = {
  name: 'voiceStateUpdate',
  async execute(oldState, newState) {
    const UserStats = require("../../../Database/src/Models/user");
    
   
    if (!newState.member || newState.member.bot) return;

    const userStats = await UserStats.findOne({ userId: newState.member.id });
    if (userStats) {
      const currentTimestamp = Date.now();
      
    
      if (!oldState.channel && newState.channel) {
        newState.member.voiceJoinTimestamp = currentTimestamp; 
      }
      
  
      if (oldState.channel && !newState.channel) {
        const timeSpent = Math.floor((currentTimestamp - newState.member.voiceJoinTimestamp) / 1000 / 60);
        userStats.totalVoiceTime += timeSpent;
        await userStats.save();
      }
    }
  }
}
