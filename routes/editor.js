var express = require('express');
var router  = express.Router();
var log     = require('winston');

//-----------------------------------------------------------------------------
// GET editor.
router.get('/editor',
    isLoggedIn,
    function(req, res, next) {

    var data = {};
    data.title = 'editor';
    data.type  = 'editor';

    res.render('index', {data: data});
});

module.exports = router;

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
    log.info('=> isLoggedIn');

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
        log.info('Already authenticated');
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/login');
} 