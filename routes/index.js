var express = require('express');
var winston = require('winston');
var pages   = require('../utils/pagesService');

var router = express.Router();

//-----------------------------------------------------------------------------
// GET Entry point
router.get('/', function(req, res, next) {
    winston.info('=> Get /');
    var page = pages.getLastPage();
    res.redirect('/pages/' + page);
});

module.exports = router;
