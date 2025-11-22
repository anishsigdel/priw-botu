const mongoose = require('mongoose');

const registerModeSchema = new mongoose.Schema({
    guildId: { type: String, default: "" },
    registerMode: { type: String, enum: ['açık', 'kapalı'], default: 'kapalı' }
});

module.exports = mongoose.model('registerMode', registerModeSchema);
