const UserRoutes = require('express').Router();
const { getUsers, createUser, detectingExistingUser } = require('../controllers/user.controllers');
const { userValidation } = require('../validators/user.validators')
const verifyToken = require('../middleware/auth.middleware')

UserRoutes.head('/', verifyToken, detectingExistingUser)
UserRoutes.get('/', verifyToken, getUsers);
UserRoutes.post('/', userValidation, createUser);

module.exports = UserRoutes;