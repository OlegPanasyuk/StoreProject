var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

var { Goods, Users } = require('../Models/sequalized');

const Sequelize = require('sequelize');

const Op = Sequelize.Op;

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../authorization/jwt');

passport.use(jwtStrategy);

router.use(bodyParser.json());

router.get('/', function (req, res) {
    let query = {};
    let queryLimit = {};
    let count = false;
    Object.keys(req.query).forEach(el => {
        if (el == 'id') {
            query.idgoods = req.query[el];
        }
        if (el == 'id_catalogue') {
            query.catalogue_id_catalogue = req.query[el];
        }
        if (el == 'page') {
            queryLimit.limit = 10;
            queryLimit.offset = (req.query[el] - 1) * 10;
        }
        if (el == 'count') {
            count = true;
        }
    });
    if (Object.keys(query).length) {
        Goods.findAll({ where: query }).then(good => res.json(good));
    } else if (Object.keys(queryLimit).length) {
        Goods.findAll(queryLimit).then(good => res.json(good));
    } else if (count) {
        Goods.count().then(good => res.json(good));
    } else {
        Goods.findAll().then(good => res.json(good));
    }
});

router.get('/filter', function (req, res) {
    
    let query = {};
    let queryLimit = {};
    let count = false;
    queryLimit.order = [];
    queryLimit.where = {};
    queryLimit.where.price = {[Op.gte]:0};
    Object.keys(req.query).forEach(el => {
        if (el == 'id_catalogue') {
            queryLimit.where.catalogue_id_catalogue = +req.query[el];
        }
        if (el == 'page') {
            queryLimit.limit = 10;
            queryLimit.offset = (req.query[el] - 1) * 10;
        }
        if (el == 'orderPrice') {
            if (req.query[el] === 'up') {
                queryLimit.order.push(['price']);    
            } else {
                queryLimit.order.push(['price', 'DESC']);    
            }
        }
        if (el == 'priceMore') {
            queryLimit.where.price[Op.gte] = +req.query[el];
        }
        if (el == 'priceLess') {
            queryLimit.where.price[Op.lte] = +req.query[el];
        }
        if (el == 'priceBetween') {
            queryLimit.where.price[Op.between] = JSON.parse(req.query[el]);
        }
        if (el == 'nameSearch') {
            queryLimit.where.name = {};
            queryLimit.where.name[Op.regexp] = `${req.query[el]}`;
        }
        if (el == 'count') {
            count = true;
        }
    });
    console.log(queryLimit);
    if (Object.keys(query).length) {
        Goods.findAll({ where: query }).then(good => res.json(good));
    } else if ((Object.keys(queryLimit).length) && (!count)) {
        Goods.findAll(queryLimit).then(good => res.json(good));
    } else if (count) {
        Goods.count(queryLimit).then(good => res.json(good));
    } else {
        Goods.findAll().then(good => res.json(good));
    }
});

router.post('/', checkRight, function (req, res) {
    let objToCreate = {
        name: (req.body.name) ? req.body.name : 'No name',
        description: (req.body.description) ? req.body.description : 'No description',
        catalogue_id_catalogue: (req.body.catalogue_id_catalogue) ? req.body.catalogue_id_catalogue : 4,
        price: (req.body.price) ? req.body.price : 0
    };
    console.log(req.body);
    Goods.create(objToCreate)
        .then(good => {
            res.json(good);
        })
        .catch((e) => res.send(e));
});

router.delete('/',checkRight, function (req, res) {
    let objToDelete = {
        id: req.query.id,
        name: req.query.name
    };
    Goods.findOne({ where: { idgoods: objToDelete.id } })
        .then(good => good.destroy({ forse: true }))
        .then(() => {
            res.send('deleted');
        });
});
router.put('/:id',checkRight, function(req, res) {
    let objToUpdate = {
        idgoods: req.params.id
    };
    let dataToUpdate = {
        ...req.body
    };
    Goods.findOne({where: objToUpdate})
        .then(goods => {
            goods.update(dataToUpdate)
                .then(()=> {
                    res.status(201).send('Data is updated');
                })
                .catch((e)=>{
                    res.status(401).send(`${e}`);
                });
        })
        .catch(e => {
            res.status(401).send(`${e}`);
        });

});


function checkRight(req, res, next) {
    let roles = ['Admin', 'SuperAdmin'];
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