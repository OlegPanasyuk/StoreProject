const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const { Users } = require('../../models/index'); 
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY_AUTH; //normally store this in process.env.secret

console.log(process.env.SECRET_KEY_AUTH);

module.exports = new JwtStrategy(opts, (jwt_payload, done) => {
    Users.findOne({ where: { email: jwt_payload.email } } )
        .then((user, err)=> {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
                
            }
        }).catch(err => {
            return done(err, false);
        });
});