const Users = require('../models/user.model');

const getUsers = async (req, res) => {
    Users.findOne({ email: req.body.email }).exec((err, data) => {
        if (err) {
            return res.status(500).send({ msg: "internal server error!" })
        }
        res.status(200).send({ data: data })
    })
}

const createUser = async (req, res) => {
    const user = new Users(req.body);
    user.password = user.generateHash(req.body.password);
    Users.findOne({ email: req.body.email }).exec((err, existingUser) => {
        if (err) {
            return res.status(500).send({ error: 'Internal server error' })
        } else if (existingUser) {
            res.status(404).send({ err: "Email already exists, please sign-in or use another email." })
        } else {
            user.save((err, data) => {
                if (err) {
                    return res.status(500).send({ msg: 'Internal server error' })
                }
                res.status(200).send(data)
            })
        }
    })
}

const detectingExistingUser = (req, res) => {
    Users.findOne({ email: req.body.email }).exec((err, existingUser) => {
        if (err) {
            return res.status(500).send({ error: 'Internal server error' })
        } else {
            if (existingUser) {
                res.status(200).send()
            } else {
                res.status(404).send()
            }
        }
    })
}

module.exports = {
    getUsers,
    createUser,
    detectingExistingUser
}