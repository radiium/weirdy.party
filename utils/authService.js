var winston = require('winston');

// Authentication and Authorization Middleware
var checkAuth = function(req, res, next) {

    winston.info('=> checkAuth');

    if (req.session && req.session.user === auth.user.username && req.session.admin) {
        return next();
    } else {
        res.redirect('/login');
        //res.render('', )
    }
};

module.exports = checkAuth;