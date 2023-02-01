const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LibrarySchema = new Schema ({
    name: String,
    volume: Number,
    author: String,
    category: String,
    publishYear: Number,
    price: Number
})

module.exports = mongoose.model('LibrarySchema', LibrarySchema);