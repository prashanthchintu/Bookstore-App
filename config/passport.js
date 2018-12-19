var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;

var User = require('../models/user');
var settings = require('../config/settings');
require("dotenv").config();

module.exports = function(passport){
    const jwtOptions = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secret"
    };


    passport.use(new JwtStrategy(jwtOptions,function(jwt_payload, done){
        User.findOne({ id: jwt_payload.id }, function(err, user) {
            if (err) {
              return done(err, false);
            }
            if (user) {
              return done(null, user);
            } else {
              return done(null, false);
              // or you could create a new account
            }
          })
    }))
};