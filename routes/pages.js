var express = require('express');
var winston = require('winston');
var pages   = require('../utils/pagesService');
var fs      = require('fs');
var ejs     = require('ejs');

var router  = express.Router();

//-----------------------------------------------------------------------------
// Handle page param
router.param('page', function(req, res, next, page) {
    winston.info('=> Param page');
    if (page) {
        req.page = page;
    }
    next(); 
});

// Get specified page
router.get('/pages/:page', function(req, res, next) {
    winston.info('=> Get /pages/:page     ==> ' +req.page)
    
    var pageName = pages.getPagePath(req.page);
    var currentPage = 'pages/' + pageName  + '/page';


    if (pageName && pageName !== '') {
        var data = {};

        // Set page info
        data.title = req.page;
        data.type  = 'page';

        // Set current page
        data.currentPage = currentPage;

        // Get and set next page if exist
        var testNextPage = pages.getPrevPage(pageName);
        if (testNextPage && testNextPage !== '') {
            data.nextPage = testNextPage;
        }

        res.render('index', {data: data});
    } else {
        //res.redirect('/404');
    }
});

router.get('/404', function(req, res) {
    winston.info('=> Get 404');

    var data = {};
    data.title = '404';
    data.type  = '404';

    res.render('index', {data: data});
});

module.exports = router;
