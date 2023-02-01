const AuthUser = require('express').Router();
const { loginUser, refresh } = require('../controllers/authUser.controllers');
const { validationLoginUser } = require('../validators/authUser.validators');
const verifyToken = require('../middleware/auth.middleware')

AuthUser.post('/user', validationLoginUser, loginUser);
AuthUser.get('/refresh', verifyToken, refresh);

module.exports = AuthUser;