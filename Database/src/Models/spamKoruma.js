const mongoose = require('mongoose');

const spamEngelSchema = new mongoose.Schema({
  guildID: { type: String, required: true },
  isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('SpamEngel', spamEngelSchema);
