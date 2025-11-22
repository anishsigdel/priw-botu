const mongoose = require('mongoose');

const isimlerSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    newName: {
        type: String,
        required: true, 
    },
    oldName: {
        type: String,
        required: true, 
    },
    age: {
        type: String,  
        default: null,  
    },
    moderatorId: {
        type: String,
        required: true, 
    },
    changeDate: {
        type: Date,
        default: Date.now, 
    },
});

const isimler = mongoose.model('Isimler', isimlerSchema);

module.exports = isimler;
