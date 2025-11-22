const mongoose = require('mongoose');

const userStatsSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  messageCount: { type: Number, default: 0 },
  totalVoiceTime: { type: Number, default: 0 },
});

module.exports = mongoose.model('UserStats', userStatsSchema);
