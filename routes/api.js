var express = require('express');
var multer  = require('multer');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;

var winston = require('winston');

//var auth    = require('../utils/authService');
var files   = require('../utils/filesService');

//-----------------------------------------------------------------------------
// Configuration
var router              = express.Router();

const TMP_DIR           = "./public/tmp";
const PAGES_LOCATION    = "./views/pages";

var UPLOAD              = multer({ dest: TMP_DIR });


//-----------------------------------------------------------------------------
// POST upload file
router.post('/uploadFile',
    require('connect-ensure-login').ensureLoggedIn(),
    UPLOAD.single('fileToUpload'),

    function(req, res, next) {

        winston.info('=> uploadFile');

        var fileName = req.originalname;
        var tmpName = req.filename;
        var tmpPath = req.path;

        var file = req.file;
        var tmpPath = file.path
        var imgPath = 'public/images/' + file.originalname;
        var htmlPath = 'http://localhost:7331/images/' + file.originalname;

        winston.info('=> create file');

        // Move file to images directory
        files.moveFile(tmpPath, imgPath);

        // Clean temp directory
        files.cleanTmpDir('public/tmp/');

        winston.info('=> file created');

        var data = {
            file: htmlPath,
            success: true
        };

        res.send(data);
    }
);

//-----------------------------------------------------------------------------
// POST upload page html
router.post('/uploadPage',
    require('connect-ensure-login').ensureLoggedIn(),
    function(req, res, next) {

    winston.info('=> upload page');

    // Get page content
    var pageName = req.body.pageName.replace(/\s+/g, '_');
    var content  = req.body.content;

    // Set page variable
    //var date = moment(testDate).format('MMDDYYYY');
    //winston.info("date : " + date);

    var PAGE_NAME = pageName; // + '-' + date;
    var PAGE_PATH = PAGES_LOCATION + '/' + PAGE_NAME;
    var PAGE_FILE = PAGE_PATH + '/page.ejs';

    files.createDir(PAGE_PATH);
    files.createFile(PAGE_FILE, content);

    res.send(PAGE_FILE);
});

module.exports = router;