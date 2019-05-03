var express = require('express');
var router = express.Router();
const { Goods } = require('../Models/sequalized');

const passport = require('passport');
const jwt = require('jsonwebtoken');
const jwtStrategy = require('../authorization/jwt');

passport.use(jwtStrategy);

router.get('/');