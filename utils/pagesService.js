var fs      = require('fs');
var log     = require('winston');
var moment  = require('moment');
var path    = require('path');
var webshot = require('webshot');


var pages = {};


//-----------------------------------------------------------------------------
// Return array of pages sorted by creation date
function getPagesList(dir, callback) {
    fs.readdir(dir, function(err, files){
        files = files.map(function (fileName) {
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

        return callback(files);
    }); 
    //return list
};

function generatPreviews() {
    log.info('[pagesService] generate previews');
    var pages = global.PAGES;

    var pageUrl = '';
    var options;

    if (process.env.NODE_ENV === 'development') {
        pageUrl = process.env.BASE_URL + ':' + process.env.PORT + '/pages/' + pages[i];
        var options = {
            phantomPath: '',
            phantomConfig: {
                debug: true
            }
        }
    } else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined) {
        pageUrl = process.env.BASE_URL + '/pages/' + pages[i];
        var options = {
            phantomConfig: {
                debug: true
            }
        }
    }
        
    for (var i = 0; i < pages.length; i++) {
        var previewsPath = process.env.BASE_DIR + '/public/prevs/' + pages[i] + '.png';
        log.info(' == previewsPath == ');
        log.info(previewsPath);
        webshot(pageUrl, previewsPath, options, function(err) {
            log.info('webshot error');
            log.info(err);
        });
    }
}


//-----------------------------------------------------------------------------
// Init pages list as global
pages.init = function() {
    
    log.info('[pagesService] Init');

    getPagesList('./views/pages' , function(files) {
        //log.info(fls);

        global.PAGES         = files;
        global.PAGES_CURRENT = global.PAGES[global.PAGES.length - 1];
        global.PAGES_INDEX   = global.PAGES.length - 1;
        
        generatPreviews()

        log.info('[pagesService] Pages initialised ');
    });
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
