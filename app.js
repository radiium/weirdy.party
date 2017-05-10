'use strict';

var express       = require('express');
//var session       = require('express-session');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var winston       = require('winston');
var helmet        = require('helmet');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var dotenv        = require('dotenv');
//var passport      = require('passport');  

var files         = require('./utils/filesService');
var pages         = require('./utils/pagesService');


//-----------------------------------------------------------------------------
// Setup environment variables NODE_ENV=development
if (process.env.NODE_ENV === 'development') {
    winston.info('[SERVER] Running in \'development\' mode');
    dotenv.config({ path: './environment/dev.env' })
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined) {
    winston.info('[SERVER] Running in \'production\' mode');
    dotenv.config({ path: '/var/www/weirdy.party/environment/prod.env' })
}


//-----------------------------------------------------------------------------
// Initialization
winston.info('[SERVER] Configuration');

var app = express();

// Logger (morgan)
//app.use(logger('dev'));
app.use(logger('common'));

// Path setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('view cache', false);
app.use(express.static(path.join(__dirname, 'public'), { redirect : false }));
//app.locals.basedir = app.get('views');

// HTTP Tools
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());

// Authentication
//app.use(session({
//    secret: process.env.SECRET,
//    resave: true,
//    saveUninitialized: true
//}));
//app.use(passport.initialize());  
//app.use(passport.session());

// Init list of pages in global variable
pages.init();

app.use(require('./routes/index'));
app.use(require('./routes/pages'));
app.use(require('./routes/login'));
app.use(require('./routes/editor'));
app.use('/api', require('./routes/api'));


//-----------------------------------------------------------------------------
// Error handler
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    //next(err);
    res.redirect('404');
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
