var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var winston = require('winston');
var config = require('config');
var cors = require('cors');
var { Catalogue, Goods, Users } = require('./Models/sequalized');
// const auth = require('./authorization');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('./authorization/jwt');
const cookieParser = require('cookie-parser');

//routers
const registrationUser = require('./authorization/auth');
const basketShopping = require('./routers/shoppingBasket');
const userRouter = require('./routers/userRouters');

var serverConfig = config.get('Server');

var logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});
const urlencoder = bodyParser.urlencoded({ extended: true });

passport.use(jwtStrategy);

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());



app.route('/catalogue')
    .get(function (req, res) {
        let id = (req.query.id) ? req.query.id : null;
        if (id) {
            Catalogue.findAll({ where: { id_catalogue: id } }).then(cat => res.json(cat));
        } else {
            Catalogue.findAll().then(cat => res.json(cat));
        }
    });

app.use('/', registrationUser);

app.use('/basket/', basketShopping);

app.use('/user/', userRouter);

app.route('/goods')
    .get(function (req, res) {
        let query = {};
        Object.keys(req.query).forEach(el => {
            if (el == 'id') {
                query.idgoods = req.query[el];
            }
            if (el == 'id_catalogue') {
                query.catalogue_id_catalogue = req.query[el];
            }
        });
        if (Object.keys(query).length) {
            Goods.findAll({ where: query }).then(good => res.json(good));
        } else {
            Goods.findAll().then(good => res.json(good));
        }

    })
    .post(urlencoder, function (req, res) {

        let objToCreate = {
            name: (req.body.name) ? req.body.name : 'No name',
            description: (req.body.description) ? req.body.description : 'No description',
            catalogue_id_catalogue: (req.body.catalogue_id_catalogue) ? req.body.catalogue_id_catalogue : 4
        };
        Goods.create(objToCreate)
            .then(good => {
                res.json(good);
            })
            .catch((e) => res.send(e));

    })
    .delete(function (req, res) {
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




app.listen(serverConfig.port, function () {
    logger.log({
        level: 'info',
        message: 'Server start successfully! Port ' + serverConfig.port
    });
});