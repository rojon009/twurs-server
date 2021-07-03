const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    required: true,
    trim: true,
    lowercase: true
})

const Category = mongoose.model('Category', categorySchema);

module.exports = Category