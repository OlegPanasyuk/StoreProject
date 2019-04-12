const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Users } = require.resolve('../Models/sequalized'); 
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'Oleg'; //normally store this in process.env.secret

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    Users.findOne({ where: { email: jwt_payload.email } } ).then((err, user)=> {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});