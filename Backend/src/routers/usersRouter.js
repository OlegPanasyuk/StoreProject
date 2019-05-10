var express = require('express');
var router = express.Router();
const { Users } = require('../Models/sequalized');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStratagy = require('../authorization/jwt');

passport.use(jwtStratagy);

router.get('/', passport.authenticate('jwt', { session: false }), checkSuperAdminRight, (req, res) => {
    Users.findAndCountAll()
        .then(results => {
            res.status(200).json(results);
        })
        .catch(e => {
            res.status(500).send(`${e}`);
        });

});

router.get('/filter', passport.authenticate('jwt', { session: false }), checkSuperAdminRight, (req, res) => {
    let objToQuery = {
        role: (!req.query.role) ? '' : req.query.role
    };
    Users.findAndCountAll({ where: objToQuery })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(e => {
            res.status(500).send(`${e}`);
        });
});

router.get('/:id', passport.authenticate('jwt', { session: false }), checkSuperAdminRight, (req, res) => {
    let objToQuery = {
        id: req.params.id
    };
    Users.findOne({ where: objToQuery })
        .then(results => {
            res.status(200).json(results);
        })
        .catch(e => {
            res.status(500).send(`${e}`);
        });

});

router.put('/:id', passport.authenticate('jwt', { session: false }), checkSuperAdminRight, (req, res) => {
    let objToQuery = {
        id: req.params.id
    };
    let dataToUpdate = {
        ...req.body
    };
    Users.findOne({ where: objToQuery })
        .then(results => {
            results.update(dataToUpdate)
                .then(() => {
                    res.status(200).send('Data is updated');
                })
                .catch((e) => {
                    res.status(400).send(`${e}`);
                });
        })
        .catch(e => {
            res.status(500).send(`${e}`);
        });

});

router.post('/new', passport.authenticate('jwt', { session: false }), checkSuperAdminRight, (req, res) => {
    let { email, password1, password2, role, name } = req.body;
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
                    username: name,
                    password: password1,
                    create_time: new Date(),
                    role: role
                }
            }).then(([user, created]) => {
                // console.log(user.get({
                //     plain: true
                // }));
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

router.delete('/:id', passport.authenticate('jwt', { session: false }), checkSuperAdminRight, (req, res) => {
    let userToDestroy = {
        id: req.params.id,
    };
    Users.findOne({ where: { id: userToDestroy.id } })
        .then(user => user.destroy({ forse: true }))
        .then(() => {
            res.send('User is deleted');
        })
        .catch((e) => {
            res.status(500).send(`${e}`);
        });
});

function checkAdminRight(req, res, next) {
    checkRight(req, res, next, ['Admin', 'SuperAdmin']);
}

function checkSuperAdminRight(req, res, next) {
    checkRight(req, res, next, ['SuperAdmin']);
}

function checkRight(req, res, next, roles = ['SuperAdmin']) {
    let token = null;
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if (token) {
        jwt.verify(token, 'Oleg', (err, decode) => {
            if (err) {
                return res.status(500).send({ auth: false, message: "Auth failed" });
            } else {
                let email = decode.email;
                if ((decode.role) && (roles.indexOf(decode.role) >= 0)) {
                    next();
                } else {
                    Users.findOne({ where: { email: email } }).then((user) => {
                        if ((user.role) && (roles.indexOf(user.role) >= 0)) {
                            next();
                        } else {
                            res.status(401).send({
                                auth: true,
                                right: false,
                                message: "You have not permission on operation"
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.status(401).send({
            auth: false,
            right: false,
            message: "Access denied"
        });
    }
}


module.exports = router;