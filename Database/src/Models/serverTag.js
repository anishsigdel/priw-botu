const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  guildId: { type: String, required: true, unique: true }, 
  tagMode: { 
    type: String, 
    enum: ['ekip', 'priv'], 
    required: true 
  },
  isActive: { type: Boolean, default: true }, 
});

module.exports = mongoose.model('serverTag', tagSchema);
