const mongoose = require('mongoose');

const registerStatsSchema = new mongoose.Schema({
    userID: { type: String, required: true },   
    guildID: { type: String, required: true },   
    totalMale: { type: Number, default: 0 },   
    totalFemale: { type: Number, default: 0 },  
    male1: { type: Number, default: 0 },        
    male7: { type: Number, default: 0 },        
    male14: { type: Number, default: 0 },      
    male30: { type: Number, default: 0 },       
    female1: { type: Number, default: 0 },      
    female7: { type: Number, default: 0 },       
    female14: { type: Number, default: 0 },      
    female30: { type: Number, default: 0 },     
    topGuild: { type: Number, default: 0 },     
    registerDate: { type: String, default: "" }, 
}, { timestamps: true }); 

module.exports = mongoose.model('registerStats', registerStatsSchema);
