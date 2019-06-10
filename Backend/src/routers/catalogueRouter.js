var express = require('express');
var router = express.Router();
const { Catalogue, Users } = require('../../models/index');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../authorization/jwt');

passport.use(jwtStrategy);

router.get('/', function (req, res) {
    let id = (req.query.id) ? req.query.id : null;
    if (id) {
        Catalogue.findAll({ where: { id_catalogue: id } }).then(cat => res.json(cat));
    } else {
        Catalogue.findAll().then(cat => res.json(cat));
    }
});

router.post('/',
    passport.authenticate('jwt', { session: false }),
    checkAdminRight,
    (req, res) => {
        let objToCreate = {
            ...req.body
        };

        Catalogue.findOrCreate({ where: objToCreate })
            .then(([item, created]) => {
                res.status(201).json({
                    message: (created) ? 'Item was cteated' : `Item with '${item.id_catalogue}' id is exist`,
                    status: created,
                    item: (created) ? {
                        id_catalogue: item.id_catalogue,
                        name: item.name,
                        description: item.description,
                        parent_id: item.parent_id
                    } : {}
                });
            }).catch(e=>{
                res.status(500).send(e);
            });
        
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

function checkRight(req, res, next, roles = ['SuperAdmin']) {
    let token = null;
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];
    }
    if (token) {
        jwt.verify(token, `${process.env.SECRET_KEY_AUTH}`, (err, payload) => {
            if (err) {
                return res.status(500).json({ auth: false, message: 'Auth failed' });
            } else {
                let email = payload.email;
                if ((payload.role) && (roles.indexOf(payload.role) >= 0)) {
                    next();
                } else {
                    Users.findOne({ where: { email: email } }).then((user) => {
                        if ((user.role) && (roles.indexOf(user.role) >= 0)) {
                            next();
                        } else {
                            res.status(401).json({
                                auth: true,
                                right: false,
                                message: 'You have not permission on operation'
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.status(401).json({
            auth: false,
            right: false,
            message: 'Access denied'
        });
    }
}

module.exports = router;