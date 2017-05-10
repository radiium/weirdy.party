var express  = require('express');
//var _        = require('lodash');
//var jwt      = require('jsonwebtoken');
var winston  = require('winston');

var auth    = require('../utils/authService');
//var hash    = require('../utils/hashService').hash;
//-----------------------------------------------------------------------------
// Configuration
var router              = express.Router();

var users = {
    admin: {
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    }
};


//-----------------------------------------------------------------------------
// Create token
//function createToken(user) {
//    return jwt.sign(_.omit(user, 'password'), process.env.SECRET, { expiresIn: 60*60*5 });
//}


//-----------------------------------------------------------------------------
// Login
router.get('/login', function (req, res) {
    var data = {};
    data.title = 'login';
    data.type  = 'login';
    //data.message = 
    res.render('index', {data: data});
});


router.post('/api/login', function (req, res) {

    var data = {};
    var user = auth.user;

    // Check username and password match
    if (!req.body.username || user.username !== req.body.username) {
        data.message = 'User name not match';
        res.render('index', {data: data});
    }
    if (!req.body.password || user.password !== req.body.password) {
        data.message = 'Password not match';
        res.render('index', {data: data});
    }

    // Set session
    req.session.user = user.username;
    req.session.admin = true;

    //var token = createToken(user);

    res.redirect('editor');

});


// Logout endpoint
router.get('/logout', function (req, res) {
    req.session.destroy();
    req.logout();
    res.redirect('/');
});

module.exports = router;