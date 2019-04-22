var express = require('express');
var router = express.Router();
const { Basket_History_Users, Users } = require('../Models/sequalized');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStratagy = require('../authorization/jwt');

passport.use(jwtStratagy);

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    let { cont, user_id } = req.body;
    if (cont && user_id) {
        Basket_History_Users.create({
            contents: cont,
            user_id: user_id
        }).then(data => {
            res.status(201).json(data);
        });

    } else if (!user_id) {
        let token = req.headers['authorization'].split(' ')[1];
        jwt.verify(token, 'Oleg', (err, decode) => {
            if (err) {
                res.status(401).send(err);
            }
            if (decode) {
                Users.findOne({
                    where: {
                        email: decode.email
                    }
                }).then((data) => {
                    Basket_History_Users.create({
                        contents: cont,
                        user_id: data.id
                    }).then(data2 => {
                        res.status(201).json(data2);
                    });
                });

            }
        });
    } else {
        res.status(401).send('What\'s broken!');
    }
});

router.get('/:basketID', (req, res) => {
    let { basketID } = req.params;
    if (basketID) {
        Basket_History_Users.findOne({
            where: {
                id: basketID
            }
        }).then(data => {
            res.status(201).json(data);
        }).catch(error => {
            res.status(401).send(`There are no basket with basketID=${basketID} Error ${error}`);
        });

    } else {
        res.status(401).send(`Incorrect params of query`);
    }

});


router.get('/users/history', passport.authenticate('jwt', { session: false }), (req, res) => {
    let token = req.headers['authorization'].split(' ')[1];
    jwt.verify(token, 'Oleg', (err, decode) => {
        if (err) {
            res.status(401).send(err);
        }
        if (decode) {
            Users.findOne({
                where: {
                    email: decode.email
                }
            }).then(user => {
                return Basket_History_Users.findAll({
                    where: {
                        user_id: user.id
                    }
                });
            }).then(data => {
                res.status(200).json(data);
            });
        }
    });
    // res.send(`There are history of baskets`);
});

//Need protection with jwt passport
router.get('/users/:userID', (req, res) => {
    res.send(`There are baskets with userID=${req.params.userID}`);
});

module.exports = router;