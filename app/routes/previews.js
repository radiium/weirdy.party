var express  = require('express');
var router   = express.Router();
var log      = require('winston');
var fs       = require('fs');

var page     = require('../utils/pagesService');


//-----------------------------------------------------------------------------
// GET previews pages
router.get('/previews', function(req, res) {
    log.info('=> Get previews');

    var data = {}; 

    data.title = 'previews';
    data.type  = 'previews';
    data.previews = [];

    var previews = fs.readdirSync(process.env.BASE_DIR + '/public/prevs');
    for (var i = 0; i < previews.length; i++) {
        if(previews[i] == '.DS_Store'
        || previews[i] == '.gitignore') {
            previews.splice(i, 1);
        } 
    }
    if (previews !== null || previews !== undefined ||  previews.length !== 0) {

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