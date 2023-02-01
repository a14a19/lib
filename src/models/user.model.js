const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const User = new Schema({
    name: String,
    email: String,
    number: Number,
    password: String,
})

User.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
}

User.methods.validatePassword = function (password) {
    const result = bcrypt.compareSync(password, this.password);
    return result;
}

module.exports = mongoose.model('Users', User);