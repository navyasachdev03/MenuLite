const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    mail: String,
    contact: Number,
    pwd: String,
});

module.exports = mongoose.model('User', userSchema);