var express = require('express');
var router = express.Router();
const { Catalogue } = require('../Models/sequalized');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStratagy = require('../authorization/jwt');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

passport.use(jwtStratagy);

router.get('/', function (req, res) {
    let id = (req.query.id) ? req.query.id : null;
    if (id) {
        Catalogue.findAll({ where: { id_catalogue: id } }).then(cat => res.json(cat));
    } else {
        Catalogue.findAll().then(cat => res.json(cat));
    }
});

router.put(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdminRight,
    (req, res) => {
        let objToUpdate = {
            id_catalogue: req.params.id
        };

        let dataToUpdate = {
            name: req.body.name,
            description: req.body.description,
            parent_id: req.body.parent_id
        };

        console.log(dataToUpdate, objToUpdate);

        Catalogue.findOne({ where: objToUpdate })
            .then(item => {
                item.update(dataToUpdate, Object.keys(dataToUpdate))
                    .then(() => {
                        res.status(200).send('Data is updated');
                    })
                    .catch((e) => {
                        res.status(400).send(`${e}`);
                    });
            }).catch((e) => {
                res.status(500).send(`${e}`);
            });

    });

router.delete(
    '/:id',
    passport.authenticate('jwt', { session: false }),
    checkAdminRight,
    (req, res) => {
        let objToUpdate = {
            id_catalogue: req.params.id
        };

        Catalogue.findOne({ where: objToUpdate })
            .then(item => {
                item.destroy({ forse: true })
                    .then(() => {
                        res.status(200).send('Item is deleted');
                    })
                    .catch((e) => {
                        res.status(500).send(`${e}`);
                    });
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