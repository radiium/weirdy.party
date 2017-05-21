var express = require('express');
var router     = express.Router();
var passport   = require('passport');
var log        = require('winston');
var isLoggedIn = require('../utils/authService');


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
