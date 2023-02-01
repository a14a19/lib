const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const { default: mongoose } = require('mongoose');
const routes = require('./api-routes');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const socket = require('socket.io');
const io = socket(process.env.SOCKET_PORT, {
    cors: {
        origin: '*'
    }
});
// socket connection
const users = {};
io.on('connection', clientSocket => {
    clientSocket.on('newUser', userName => {
        // use 'userName' for socket-client to get different user name whenever a new user login
        users[clientSocket.id] = userName;
    })
});
// sharing of socket instance to other files in express app
app.set('socket-io', io);
// mongoDB connection
mongoose.set('strictQuery', true)
mongoose.connect(process.env.MONGODB_CONNECT);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'DB connection error!'));
db.on('open', () => {
    console.log("MongoDB is connected!");
    serverStart();
});
// resolving cors issues
app.use(cors((req, cb) => {
    let corsOptions = { origin: false, credentials: false };
    if (process.env.WHITELISTED_ORIGINS.indexOf(req.headers.origin) !== -1) {
        corsOptions.origin = true;
        corsOptions.credentials = true;
    }
    cb(null, corsOptions);
}));
// body parsing for put or post method 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// for cookies
app.use(cookieParser());
// routing
app.use('/', routes);
// starting server
const serverStart = () => {
    http.listen(PORT, process.env.HOSTNAME, () => {
        console.log(`Server running at: http://${process.env.HOSTNAME}:${PORT}`);
    })
}