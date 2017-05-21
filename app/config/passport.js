var LocalStrategy = require('passport-local').Strategy;
var UserModel     = require('../models/user');
var log           = require('winston');

module.exports = function(passport) {

    // Serialize User
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // Deserialize User
    passport.deserializeUser(function(id, done) {
        UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // Login Localstrategy
    passport.use('local-login', new LocalStrategy({
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true
    },
    function(req, username, password, done) {
        UserModel.findOne({ 'username' :  username }, function(err, user) {
            // Error
            if (err) {
                log.info(err);
                return done(err);
            }

            // User not found
            if (!user) {
                log.info('User not found');
                return done(null, false);
            }

            // Password not match
            if (!user.validPassword(password)) {
                log.info('Invalid password');
                return done(null, false);
            }

            // all is well, return successful user
            return done(null, user);
        });
    }));
};
