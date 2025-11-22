const mongoose = require('mongoose');

const safeListSchema = new mongoose.Schema({
  guildId: {
    type: String,
    required: true,
  },
  safeUsers: [{
    userId: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ['chat', 'kanal', 'rol', 'full', 'sagTik', 'webhook', 'sunucu'],
      required: true,
    },
  }],
});

module.exports = mongoose.model('SafeList', safeListSchema);
