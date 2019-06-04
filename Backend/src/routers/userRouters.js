var express = require('express');
var router = express.Router();
const { Users } = require('../../models/index');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../authorization/jwt');

passport.use(jwtStrategy);

router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, 'Oleg', (err, decode) => {
        if (err) {
            res.status(401).send(err);
        }
        if (decode) {
            Users.findOne({ where: { 
                email: decode.email 
            } }).then(user => {
                const { password, ...userP} = user.dataValues;
                const { id,  ...userId} = userP;
                res.status(200).json(JSON.stringify(userId));
            });
        }
    });
});

router.delete('/', passport.authenticate('jwt', { session: false }), checkSuperAdminRight, (req, res) => {
    let userToDestroy = {
        id: req.body.id,
        email: req.body.email
    };
    Users.findOne({ where: { email: userToDestroy.email, id: userToDestroy.id } })
        .then(user => user.destroy({ forse: true }))
        .then(() => {
            res.send('User is deleted');
        });
});

function checkAdminRight(req, res, next) {
    checkRight(req, res, next, ['Admin', 'SuperAdmin']);
}

function checkSuperAdminRight(req, res, next) {
    checkRight(req, res, next, ['SuperAdmin']);
}

function checkRight(req, res, next, roles = ['SuperAdmin']) {
    // let roles = ['SuperAdmin'];
    let token = null;
    if (req.headers['authorization']) {
        token = req.headers['authorization'].split(' ')[1];    
    }
    if (token) {
        jwt.verify(token, 'Oleg', (err, decode) => {
            if (err) {
                return res.status(500).send({auth: false, message: "Auth failed"});
            } else {
                let email = decode.email;
                if ((decode.role) && (roles.indexOf(decode.role) >= 0)) {
                    next();
                } else {
                    Users.findOne({where: {email: email}}).then((user) => {
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