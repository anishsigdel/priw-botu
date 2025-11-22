const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },  
  reason: { type: String, required: true }, 
  dateAdded: { type: Date, default: Date.now }, 
  isActive: { type: Boolean, default: true },  
});

module.exports = mongoose.model('Blacklist', blacklistSchema);
