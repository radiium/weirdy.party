var express    = require('express');
var router     = express.Router();
var multer     = require('multer');
var passport   = require('passport');
var log        = require('winston');

var isLoggedIn = require('../utils/authService');
var pages      = require('../utils/pagesService');
var files      = require('../utils/filesService');

//-----------------------------------------------------------------------------
// Configuration

const TMP_DIR           = "./public/tmp";
const PAGES_LOCATION    = "./views/pages";

var UPLOAD              = multer({ dest: TMP_DIR });


//-----------------------------------------------------------------------------
// POST upload file
router.post('/uploadFile',
    isLoggedIn,
    UPLOAD.single('fileToUpload'),

    function(req, res, next) {

        log.info('=> uploadFile');

        var fileName = req.originalname;
        var tmpName = req.filename;
        var tmpPath = req.path;

        var file = req.file;
        var tmpPath = file.path
        var imgPath = 'public/images/' + file.originalname;
        var htmlPath = '/images/' + file.originalname;

        log.info('=> create file');

        // Move file to images directory
        files.moveFile(tmpPath, imgPath);

        // Clean temp directory
        files.cleanTmpDir('public/tmp/');

        log.info('=> file created');

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
    isLoggedIn,
    function(req, res, next) {

    log.info('=> upload page');

    // Get page content
    var pageName = req.body.pageName.replace(/\s+/g, '_');
    var content  = req.body.content;


    // Set page variable
    //var date = moment(testDate).format('MMDDYYYY');
    //log.info("date : " + date);

    var PAGE_NAME = pageName; // + '-' + date;
    var PAGE_PATH = PAGES_LOCATION + '/' + PAGE_NAME;
    var PAGE_FILE = PAGE_PATH + '/page.ejs';

    files.createDir(PAGE_PATH);
    files.createFile(PAGE_FILE, content);

    // Re-init list of pages 
    pages.init();

    var data = {
        message: 'Page ' + PAGE_NAME + ' created',
        success: true
    };

    res.send(data);
});

module.exports = router;
