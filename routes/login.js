var express  = require('express');
var passport = require('passport');
var winston  = require('winston');


//-----------------------------------------------------------------------------
// Configuration
var router = express.Router();


//-----------------------------------------------------------------------------
// Login
router.get('/login', function (req, res) {
    var data = {};
    data.title = 'login';
    data.type  = 'login';
    //data.message = 
    res.render('index', { data: data });
});


router.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function (req, res) {
        winston.info('LOGIN');
        res.redirect('editor');
});


// Logout endpoint
router.get('/logout', function (req, res) {
    winston.info('LOGOUT');
    req.logout();
    res.redirect('/');
});

module.exports = router;