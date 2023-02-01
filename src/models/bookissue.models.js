const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookIssuingSchema = new Schema ({
    name: String,
    book: String,
    volume: String,
    price: Number,
    date: Date,
    numberOfDay: Number,
    returned: String
})

module.exports = mongoose.model('BookIssuingSchema', BookIssuingSchema)