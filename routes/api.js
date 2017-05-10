var express = require('express');
var fs      = require('fs');
var winston = require('winston');
var multer  = require('multer');

//var auth    = require('../utils/authService');
var files   = require('../utils/filesService');

//-----------------------------------------------------------------------------
// Configuration
var router              = express.Router();

const TMP_DIR           = "./public/tmp";
const PAGES_LOCATION    = "./views/pages";

var UPLOAD              = multer({ dest: TMP_DIR });


//-----------------------------------------------------------------------------
// POST file
router.post('/uploadFile',
    //auth.fn,
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
        fs.createReadStream(tmpPath).pipe(fs.createWriteStream(imgPath));

        winston.info('=> file created');

        // Clean temp directory
        files.cleanTmpDir('public/tmp/');

        var data = {
            file: htmlPath,
            success: true
        };

        res.send(data);
    }
);

//-----------------------------------------------------------------------------
// POST page html
router.post('/uploadPage',
            //auth.fn,
            function(req, res, next) {
    winston.info('=> upload page');

    var pageName = req.body.pageName.replace(/\s+/g, '_');
    var content = req.body.content;

    //var COUNT     = files.countObjInDir(PAGES_LOCATION);
    var PAGE_NAME = pageName; //COUNT + '_' + pageName;
    var PAGE_PATH = PAGES_LOCATION + '/' + PAGE_NAME;
    var PAGE_FILE = PAGE_PATH + '/page.ejs';

    files.createDir(PAGE_PATH);
    files.createFile(PAGE_FILE, content);

    res.send(PAGE_FILE);
});

module.exports = router;