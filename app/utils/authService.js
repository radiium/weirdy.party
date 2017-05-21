var log = require('winston');

// route middleware to make sure a user is logged in
module.exports = function isLoggedIn(req, res, next) {
    log.info('=> isLoggedIn');
    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        log.info('Already authenticated');
        return next();
    }
    // if they aren't redirect them to the home page
    res.redirect('/login');
}