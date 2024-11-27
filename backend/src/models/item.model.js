const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    ingredients: String,
    price: Number,
    category: String,
    images: [String],
});

module.exports = mongoose.model('Item', itemSchema);