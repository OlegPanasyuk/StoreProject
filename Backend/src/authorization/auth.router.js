var express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('./jwt');
const { Users } = require('../../models/index');

var router = express.Router();

passport.use(jwtStrategy);

router.post('/reg', (req, res) => {
    let { email, password1, password2 } = req.body;
    const regExEmail = /[\w_.-]+@\w+.\w+/gmi;
    let arr = regExEmail.exec(email);
    if (arr) {
        if (email !== arr[0]) {
            res.status(401).json({
                message: 'Incorrect email. Use [0-9a-zA-Z.-_]',
                status: false
            });
        } else if (password1 !== password2) {
            res.status(401).json({
                message: 'PASSWORDS NOT EQUALS',
                status: false
            });
        } else {
            Users.findOrCreate({
                where: {
                    email: email
                },
                defaults: {
                    username: 'User',
                    password: password1,
                    create_time: new Date(),
                    role: 'User'
                }
            }).then(([user, created]) => {
                res.status(201).json({
                    message: (created) ? 'User was cteated' : `User with '${user.email}' email is exist`,
                    status: created,
                    user: (created) ? {
                        username: user.username,
                        email: user.email,
                        role: user.role
                    } : {}
                });
            });
        }
    } else {
        res.status(401).json({
            message: 'Incorrect email or email has not been entered. Use [0-9a-zA-Z.-_]',
            status: false
        });
    }

});

router.post('/login', (req, res) => {
    let { email, password } = req.body;
    let checkRights = null;
    if (req.headers['checkrights']) {
        checkRights = JSON.parse(req.headers['checkrights']);
    }
    let roles = ['Consultant', 'Admin', 'SuperAdmin'];
    Users.findOne({ where: { email: email } }).then((user) => {
        if (user && user.email === email) {
            if (password === user.password) {
                if (checkRights === true) {
                    if (roles.indexOf(user.role) >= 0) {
                        const opts = {};
                        const role = user.role;
                        opts.expiresIn = 1200;
                        const secret = process.env.SECRET_KEY_AUTH;
                        const token = jwt.sign({ email, role }, secret, opts);
                        return res.status(200).json({
                            message: 'Auth Passed',
                            token,
                            role: user.role,
                            username: user.username
                        });
                    }
                } else {
                    const opts = {};
                    opts.expiresIn = 1200;
                    const secret = process.env.SECRET_KEY_AUTH;
                    const token = jwt.sign({ email }, secret, opts);
                    return res.status(200).json({
                        message: 'Auth Passed',
                        token,
                        role: user.role,
                        username: user.username
                    });
                }

            } else {
                res.status(401).send('Password or email is incorrect');
            }
        } else {
            res.status(401).send('Password or email is incorrect');
        }
        res.status(401).send(`${email} ${password} Auth failed`);
    });
});

router.post('/logintoken', function (req, res) {
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY_AUTH, (err, payload) => {
        if (err) {
            return res.status(400).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        let email = payload.email;
        Users.findOne({ where: { email } }).then((user) => {
            const opts = {};
            opts.expiresIn = 1200;
            const secret = process.env.SECRET_KEY_AUTH;
            const token = jwt.sign({ email: payload.email }, secret, opts);
            return res.status(200).json({
                message: 'Auth Passed',
                token,
                role: user.role,
                username: user.username
            });
        });
    });
});

module.exports = router;