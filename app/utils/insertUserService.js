var UserModel = require('../models/user');
var log       = require('winston');

module.exports = function() {
    UserModel.findOne({ 'username':  process.env.USERNAME }, function(err, user) {
        if (err) {
            throw err;
        }

        if (user) {
            log.info('User already inserted');
            return;
        } else {
            log.info('User not found, add user');

            // Create user
            var User1 = new UserModel({
                username: process.env.USERNAME,
                password: process.env.PASSHASH
            });

            User1.save(function (err) {
                if (err) {
                    throw err;
                }
                console.log('User added');
            });
        }
        return;
    });
}
