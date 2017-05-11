var fs     = require('fs');
var log    = require('winston');
var moment = require('moment');
var path   = require('path');

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


//-----------------------------------------------------------------------------
// Init pages list as global
pages.init = function() {
    
    log.info('[pagesService] Init');

    getPagesList('./views/pages' , function(files) {
        //log.info(fls);

        global.PAGES         = files;
        global.PAGES_CURRENT = global.PAGES[global.PAGES.length - 1];
        global.PAGES_INDEX   = global.PAGES.length - 1;
        
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
