var express   = require('express');
var winston   = require('winston');

//var auth      = require('../utils/authService');

//-----------------------------------------------------------------------------
// Configuration
var router = express.Router();

//-----------------------------------------------------------------------------
// GET editor.
router.get('/editor',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res, next) {

    var data = {};
    data.title = 'editor';
    data.type  = 'editor';

    res.render('index', {data: data});
});

module.exports = router;