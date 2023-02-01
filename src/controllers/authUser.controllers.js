const Users = require('../models/user.model');
const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
    Users.findOne({ email: req.body.email }).exec((err, userFound) => {
        if (err) {
            res.status(500).send({ error: 'Internal server error' })
        } else if (!(userFound && userFound.validatePassword(req.body.password))) {
            res.status(401).send({ error: "Email or password is incorrect. Please try again or sign up using different email" })
        } else {
            try {
                const claims = {
                    iss: 'http://www.abc.com',
                    sub: userFound.email,
                    scope: userFound.name
                };

                const access_token = jwt.sign(claims, process.env.JWT_ACCESS_TOKEN_KEY, {
                    algorithm: 'HS256',
                    expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
                });

                const refresh_token = jwt.sign(claims, process.env.JWT_REFRESH_TOKEN_KEY, {
                    algorithm: 'HS256',
                    expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
                });

                res.header('Access-Control-Allow-Origin', "http://localhost:3000");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
                res.header('Access-Control-Allow-Credentials', true);

                // jwt set in cookie
                res.cookie('access_token', access_token, {
                    httpOnly: true,
                    maxAge: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
                    // secure: true
                });
                res.cookie('refresh_token', refresh_token, {
                    httpOnly: true,
                    maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
                    // secure: true
                });
                res.status(200).send({ msg: "Login successful" });
                // console.log(`access = ${access_token}, refresh = ${refresh_token}, claims = ${claims}`);
            } catch (e) {
                console.log(e);
            }
        }
    });
}

const refresh = (req, res) => {
    const claims = {
        iss: req.claims.iss,
        sub: req.claims.sub,
        scope: req.claims.scope
    };
    try {
        const access_token = jwt.sign(claims, process.env.JWT_ACCESS_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN
        });
        const refresh_token = jwt.sign(claims, process.env.JWT_REFRESH_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN
        });

        res.header('Access-Control-Allow-Origin', "http://localhost:3000");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.header('Access-Control-Allow-Credentials', true);
        // parsing in cookie
        res.cookie('access_token', access_token, {
            httpOnly: true,
            maxAge: process.env.JWT_ACCESS_TOKEN_EXPIRES_IN,
            // secure: true
        });
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            maxAge: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
            // secure: true
        });
        res.status(200).send({ msg: "Login successful" });
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    loginUser,
    refresh
}