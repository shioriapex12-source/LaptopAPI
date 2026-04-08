const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    name: String,
    brand: String,
    price: String,
    desc: String
});

module.exports = mongoose.model('products', laptopSchema);