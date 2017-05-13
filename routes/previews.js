var express  = require('express');
var router   = express.Router();
var log      = require('winston');


//-----------------------------------------------------------------------------
// GET previews
router.get('/previews', function(req, res) {
    log.info('=> Get previews');

    var data = {};
    data.title = 'previews';
    data.type  = 'previews';
    
    var pages = global.PAGES;
    
    data.previews = [];

    for (var i = 0; i < pages.length; i++) {
        //var pageName = pages[i];

        //var pageUrl      = process.env.BASE_URL + ':' + process.env.PORT + '/pages/' + pageName;
        //var PreviewsPath = '/prevs/' + pageName + '.png';
        //var imgUrl = baseUrl + PreviewsPath
        //log.info(imgUrl);

        data.previews.push( pages[i]);
    }

    res.render('index', {data: data});
});

module.exports = router;