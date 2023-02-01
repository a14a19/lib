const BookIssuingSchema = require('../models/bookissue.models');

const getAllIssuedBook = (req, res) => {
    BookIssuingSchema.find({}).exec((err, data) => {
        if (err) {
            return res.status(500).send({ msg: 'Internal server error' })
        }
        res.status(200).send({ data: data })
    })
}

module.exports = {
    getAllIssuedBook
}