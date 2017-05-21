var fs      = require('fs');
var log     = require('winston');
var moment  = require('moment');
var path    = require('path');
var webshot = require('webshot');


var pages = {};


//-----------------------------------------------------------------------------
// Return array of pages sorted by creation date
function getPagesList(dir) {
    var files1 = fs.readdirSync(dir);

    return files1.map(function (fileName) {
        return {
            name: fileName,
            time: fs.statSync(dir + '/' + fileName).mtime.getTime()
        };
    })
    .sort(function (a, b) {
        return a.time - b.time;
    })
    .map(function (v) {
        return v.name;
    });

};

function generatPreviews(pagesList) {
    log.info('[pagesService] generate previews');
    
    var pages   = pagesList;
    var pageUrl = '';
    var options = {};

    // Webshot options
    options = {
        phantomConfig: {
            'debug': true
        },
        screenSize: {
            width: 1024,
            height: 768
        },
        shotSize: {
            width: 1024,
            height: 'all'
        },
        renderDelay: 2000
    };
        
    for (var i = 0; i < pages.length; i++) {

        if (process.env.NODE_ENV === 'development') {
            pageUrl = process.env.BASE_URL + ':' + process.env.PORT + '/pages' + '/' + pages[i];
        } else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined) {
            pageUrl = process.env.BASE_URL + '/pages' + '/' + pages[i];
        }

        var previewsPath = process.env.BASE_DIR + '/public/prevs' + '/' + pages[i] + '.png';
        
        //log.info(' == previewsPath == ');
        //log.info(pageUrl);
        //log.info(previewsPath);

        webshot(pageUrl, previewsPath, options, function(err) {
            if (err) {
                log.info('webshot error');
                log.info(err);
            }
        });
    }
}


//-----------------------------------------------------------------------------
// Init pages list as global
pages.init = function() {
    
    log.info('[pagesService] Init');

    var pagesList = getPagesList('./views/pages');

    //log.info('pagesList : ');
    //log.info(pagesList);
    
    global.PAGES         = pagesList;
    global.PAGES_CURRENT = global.PAGES[global.PAGES.length - 1];
    global.PAGES_INDEX   = global.PAGES.length - 1;

    log.info(process.env.BASE_DIR);
    var previews = fs.readdirSync(process.env.BASE_DIR + '/public/prevs');

    if (previews === null || previews === undefined
    ||  previews.length === 0 || previews.length !== global.PAGES.length) {
       
        log.info('[pagesService] Generate previews');
        generatPreviews(pagesList);
    } 

    log.info('[pagesService] Pages initialised ');
};

//-----------------------------------------------------------------------------
// Get last page
pages.getLastPage = function() {
    return global.PAGES[global.PAGES.length - 1];
};

//-----------------------------------------------------------------------------
// Get next page
pages.getPrevPage = function(page) {
    var prevPage = '';
    for (var i = 0; i < global.PAGES.length; i++) {
        if (page === global.PAGES[i]) {
            if ((i + 1) < global.PAGES.length) {
                prevPage = global.PAGES[i + 1];
            }
        }
    }
    return prevPage
};

//-----------------------------------------------------------------------------
// Get next page
pages.getNextPage = function(page) {
    var nextPage = '';
    for (var i = global.PAGES.length; i >= 0 ; i--) {
        if (page === global.PAGES[i]) {
            if ((i - 1) >= 0) {
                nextPage = global.PAGES[i - 1];
            }
        }
    }
    return nextPage;
};

//-----------------------------------------------------------------------------
// Get page by name
pages.getPageByName = function(page) {
    var pagePath = '';
    for (var i = 0; i < global.PAGES.length; i++) {
        if (page === global.PAGES[i]) {
            pagePath = global.PAGES[i];
        }
    }
    return pagePath;
};

module.exports = pages;
