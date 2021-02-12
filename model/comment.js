const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const comment = new Schema({
    show_id: Number,
    name: String,
    content: String,
    created_at: Date
});

module.exports = mongoose.model('Comment', comment);