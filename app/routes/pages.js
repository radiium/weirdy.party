var express = require('express');
var router  = express.Router();
var log     = require('winston');
var pages   = require('../utils/pagesService');

//-----------------------------------------------------------------------------
// Handle page param
router.param('page', function(req, res, next, page) {
    log.info('=> Param page');
    if (page) {
        req.page = page;
    }
    next(); 
});

//-----------------------------------------------------------------------------
// Get specified page
router.get('/pages/:page', function(req, res, next) {
    log.info('=> Get /pages/:' + req.page)
    
    var pageName = pages.getPageByName(req.page);
    var currentPage = 'pages/' + pageName  + '/page';

    if (pageName && pageName !== '') {
        var data = {};

        // Set page info
        data.title = req.page;
        data.type  = 'page';

        // Set current page
        data.currentPage = currentPage;

        // Get and set next page if exist
        var testPrevPage = pages.getPrevPage(pageName);
        if (testPrevPage && testPrevPage !== '') {
            data.prevPage = testPrevPage;
        }

        // Get and set previous page if exist
        var testNextPage = pages.getNextPage(pageName);
        if (testNextPage && testNextPage !== '') {
            data.nextPage = testNextPage;
        }

        res.render('index', {data: data});
    } else {
        res.redirect('/404');
    }
});

module.exports = router;
