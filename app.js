'use strict';

var express       = require('express');
var session       = require('express-session');
var path          = require('path');
var favicon       = require('serve-favicon');
var logger        = require('morgan');
var log           = require('winston');
var helmet        = require('helmet');
var cookieParser  = require('cookie-parser');
var bodyParser    = require('body-parser');
var dotenv        = require('dotenv');
var passport      = require('passport');  

var files         = require('./utils/filesService');
var pages         = require('./utils/pagesService');

var app = express();

//-----------------------------------------------------------------------------
// Setup environment variables NODE_ENV=development
if (process.env.NODE_ENV === 'development') {
    log.info('[SERVER] Running in \'development\' mode');
    dotenv.config({ path: './config/environment/dev.env' });
    app.use(logger('dev'));
} else if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === undefined) {
    log.info('[SERVER] Running in \'production\' mode');
    dotenv.config({ path: '/var/www/weirdy.party/config/environment/prod.env' });
    app.use(logger('common'));
}


//-----------------------------------------------------------------------------
// Initialization
log.info('[SERVER] General Configuration');


    // Path setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'ejs');
    app.set('view cache', false);
    app.use(express.static(path.join(__dirname, 'public') ));//, { redirect : false }));
    app.use('/prevs', express.static(path.join(__dirname, 'public/prevs') ));//, { redirect : false }));
    //app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
    //app.locals.basedir = app.get('views');

    // Tools
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(helmet());

    // Authentication
    require('./config/passport');
    app.set('trust proxy', 1) // trust first proxy

    var expiryDate = new Date( Date.now() + ((60 * 60 * 1000) * 2) ); // 2 hour

    app.use(session({
        secret: process.env.SECRET,
        name : 'sessionIdTest',

        resave: false,
        saveUninitialized: false,
        cookie : {
            //domain: process.env.HOST,
            httpOnly: true,
            maxAge: 2419200000,
            expires: expiryDate
        }
    }));
    
    app.use(passport.initialize());  
    app.use(passport.session());

    // Security
    /*
    var client        = require('redis').createClient()
    var limiter       = require('express-limiter')(app, client)
    limiter({
        path: '/login',
        method: 'post',
        lookup: ['connection.remoteAddress'],
        // 150 requests per hour 
        total: 150,
        expire: 1000 * 60 * 60
    })*/

    // Init list of pages in global variable
    pages.init();


//-----------------------------------------------------------------------------
// Routes Configuration
log.info('[SERVER] Routes Configuration');
app.use(require('./routes/index'));
app.use(require('./routes/pages'));
app.use(require('./routes/previews'));
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
