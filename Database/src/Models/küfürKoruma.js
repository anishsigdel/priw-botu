const mongoose = require('mongoose');

const bannedWordsSchema = new mongoose.Schema({
  guildID: { type: String, required: true }, 
  isActive: { type: Boolean, default: true } 
});

module.exports = mongoose.model('BannedWords', bannedWordsSchema);
