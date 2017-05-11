var express = require('express');
var router  = express.Router();
var log     = require('winston');
var pages   = require('../utils/pagesService');


//-----------------------------------------------------------------------------
// GET Entry point
router.get('/', function(req, res, next) {
    log.info('=> Get /');
    var page = pages.getLastPage();
    res.redirect('/pages/' + page);
});


//-----------------------------------------------------------------------------
// GET 404
router.get('/404', function(req, res) {
    log.info('=> Get 404');

    var data = {};
    data.title = '404';
    data.type  = '404';

    res.render('index', {data: data});
});

module.exports = router;
