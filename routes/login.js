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
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            log.info('LOGIN');
            res.redirect('editor');
        });
});

//-----------------------------------------------------------------------------
// Logout endpoint
router.get('/logout', function (req, res) {
    log.info('LOGOUT');
    log.info('user : ' + req.user);
    log.info(req.account);
    log.info(req.session);
    
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;