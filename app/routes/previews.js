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

    // Check and remove hidden file in prevs folder
    var previews = fs.readdirSync(process.env.BASE_DIR + '/public/prevs');
    for (var i = 0; i < previews.length; i++) {
        if(previews[i] == '.DS_Store'
        || previews[i] == '.gitignore') {
            previews.splice(i, 1);
        } 
    }

    // check if previews is available
    if (previews !== null && previews !== undefined &&  previews.length !== 0) {
        data.hasPreviews = true;
    } else {
        data.hasPreviews = false;
        data.message = "Something went wrong with thumbnail previews ..."
        page.init();
    }

    var pages = global.PAGES;
    data.pagesNameList = [];
    for (var i = 0; i < pages.length; i++) {
        data.pagesNameList.push(pages[i]);
    }

    res.render('index', {data: data});
});

module.exports = router;