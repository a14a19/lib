const routes = require('express').Router();
const UserRoutes = require('./user.routes');
const LibraryRoutes = require('./library.routes');
const BookIssue = require('./bookissue.routes')
const AuthUser = require('./authUser.routes')

routes.get('/', (req, res) => {
    res.send({ msg: 'Welcome to library!' })
})

routes.use('/user', UserRoutes)
routes.use('/library', LibraryRoutes)
routes.use('/book_issue', BookIssue)
routes.use('/auth', AuthUser)

module.exports = routes;