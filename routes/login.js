var express  = require('express');
var passport = require('passport');
var log      = require('winston');


//-----------------------------------------------------------------------------
// Configuration
var router = express.Router();


//-----------------------------------------------------------------------------
// GET Login page
router.get('/login', function (req, res) {
    var data = {};
    data.title = 'login';
    data.type  = 'login';
    //data.message = 
    res.render('index', { data: data });
});

//-----------------------------------------------------------------------------
// POST Login
router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        log.info('LOGIN');
        res.redirect('editor');
});

//-----------------------------------------------------------------------------
// Logout endpoint
router.get('/logout', function (req, res) {
    log.info('LOGOUT');
    req.logout();
    res.redirect('/');
});

module.exports = router;