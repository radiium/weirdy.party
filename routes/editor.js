var express   = require('express');
var winston   = require('winston');

//-----------------------------------------------------------------------------
// Configuration
var router = express.Router();

//-----------------------------------------------------------------------------
// GET editor.
router.get('/editor', function(req, res, next) {
    var data = {};
    data.title = 'editor';
    data.type  = 'editor';

    res.render('index', {data: data});
});

module.exports = router;