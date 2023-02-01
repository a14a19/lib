const LibrarySchema = require('../models/library.models');

const getAllData = (req, res) => {
    LibrarySchema.find({}).exec((err, data) => {
        if (err) {
            res.status(500).send({ msg: 'Internal server error!' })
        }
        res.status(200).send({ data: data })
    })
}

const bulkInsert = async (req, res) => {
    const result = await LibrarySchema.insertMany(req.body.libraryList).catch(err => {
        return res.status(500).send({error: 'Internal server error!'})
    })
    res.status(200).send({libraryList: result});
}

module.exports = {
    getAllData,
    bulkInsert
}