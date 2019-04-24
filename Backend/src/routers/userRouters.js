var express = require('express');
var router = express.Router();
const { Users } = require('../Models/sequalized');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStratagy = require('../authorization/jwt');

passport.use(jwtStratagy);

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

module.exports = router;