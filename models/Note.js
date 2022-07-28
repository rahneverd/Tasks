const mongoose = require('mongoose');

const note = new mongoose.Schema({
    task: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Note', note);