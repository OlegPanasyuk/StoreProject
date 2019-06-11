require('dotenv').config();
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var winston = require('winston');
var config = require('config');
var cors = require('cors');
const formData = require('express-form-data');
const os = require('os');
const passport = require('passport');
const jwtStrategy = require('./authorization/jwt');
const cookieParser = require('cookie-parser');
const registrationUser = require('./authorization/auth.router');
const basketShopping = require('./routers/shopping.basket.router');
const userRouter = require('./routers/user.routers');
const goodsRouter = require('./routers/goods.router');
const usersRouters = require('./routers/users.router');
const catalogueRouter = require('./routers/catalogue.router');
const imagesRouter = require('./routers/images.router');

var serverConfig = config.get('Server');

var logger = winston.createLogger({
    transports: [
        new winston.transports.Console()
    ]
});

const options = {
    uploadDir: os.tmpdir(),
    autoClean: true
};

passport.use(jwtStrategy);

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(formData.parse(options));
app.use(formData.format());
app.use(formData.union());


app.use('/catalogue', catalogueRouter);

app.use('/', registrationUser);

app.use('/basket/', basketShopping);

app.use('/user/', userRouter);

app.use('/goods/', goodsRouter);

app.use('/users/', usersRouters);

app.use('/images/', imagesRouter);

app.listen(serverConfig.port, function () {
    logger.log({
        level: 'info',
        message: 'Server start successfully! Port ' + serverConfig.port
    });
});