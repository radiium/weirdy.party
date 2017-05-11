var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var log      = require('winston');

var db       = require('./db');


// Local strategy
passport.use(new Strategy(
    function(username, password, cb) {
    db.users.findByUsername(username, function(err, user) {
        //log.info(user);
        if (err) {
            log.info('error: ' + err);
            return cb(err);
        }
        if (!user) {
            log.info('user no found');
            return cb(null, false);
        }
        if (user.password != password) {
            log.info('user found, password not match');
            return cb(null, false);
        }
        return cb(null, user);
    });
}));

// Serialize
passport.serializeUser(function(user, cb) {
    log.info(user);
    cb(null, user.id);
});

// Deserialize
passport.deserializeUser(function(id, cb) {
    db.users.findById(id, function (err, user) {
        if (err) {
            log.info('deserialize: ' + err);
            return cb(err);
        }
        log.info('deserialize: ' + user);
        cb(null, user);
    });
});
