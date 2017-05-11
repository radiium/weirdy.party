var express = require('express');
var router  = express.Router();
var log     = require('winston');

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