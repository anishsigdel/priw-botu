const mongoose = require('mongoose');

const bannedAdsSchema = new mongoose.Schema({
  guildID: { type: String, required: true }, 
  isActive: { type: Boolean, default: true } 
});

module.exports = mongoose.model('BannedAds', bannedAdsSchema);
