var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var winston = require('winston');
var config = require('config');
var cors = require('cors');
const formData = require('express-form-data');
const os = require('os');
// const auth = require('./authorization');
const passport = require('passport');
//const jwt = require('jsonwebtoken');
const jwtStrategy = require('./authorization/jwt');
const cookieParser = require('cookie-parser');

//routers
const registrationUser = require('./authorization/auth');
const basketShopping = require('./routers/shoppingBasket');
const userRouter = require('./routers/userRouters');
const goodsRouter = require('./routers/goodsRouter');
const usersRouters = require('./routers/usersRouter');
const catalogueRouter = require('./routers/catalogueRouter');
const imagesRouter = require('./routers/imagesRouter');

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
//app.use(fileUpload());
app.use(cookieParser());
// parse data with connect-multiparty. 
app.use(formData.parse(options));
// clear from the request and delete all empty files (size == 0)
app.use(formData.format());
// // change file objects to stream.Readable 
// app.use(formData.stream());
// union body and files
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