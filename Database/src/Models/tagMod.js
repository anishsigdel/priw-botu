const mongoose = require('mongoose');

const tagModeSchema = new mongoose.Schema({
    userID: { type: String, default: "" },
	guildID: { type: String, default: "" },
    tagMode: Boolean
});

module.exports = mongoose.model('tagMode', tagModeSchema);
