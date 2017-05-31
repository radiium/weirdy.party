var express  = require('express');
var router   = express.Router();
var log      = require('winston');

var page      = require('../utils/pagesService');



//-----------------------------------------------------------------------------
// GET previews pages
router.get('/previews', function(req, res) {
    log.info('=> Get previews');

    var data = {}; 

    data.title = 'previews';
    data.type  = 'previews';
    data.previews = [];

    if (global.hasPreviews) {
        var pages = global.PAGES;
        for (var i = 0; i < pages.length; i++) {
            data.previews.push(pages[i]);
        }
    } else {
        page.init();
    }

    res.render('index', {data: data});
});

module.exports = router;