var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var matterjs = require('matter-js');
// Sets up to route to proper locations
// var index = require('./routes/index');
// var profile = require('./routes/profile');
var scoreboard = require('./routes/scoreboard');
var register = require('./routes/register');
var lobby = require('./routes/lobby');
var session = require('express-session');
var app = express();


//added 4/20/17 to allow passport-local and sessions
var passport = require('passport');
require('./server/passport.js')(passport);

app.use(session({secret: "..Secret",
                 resave: true,
                 saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// used to access matter.js, will be accessed as: script(src = '/scripts/')
app.use('/scripts', express.static(__dirname + '/node_modules/'));


var index = require('./routes/index')(app, passport);
var profile = require('./routes/profile')(app, passport);
var player = require('./routes/player')(app, passport);
var game = require('./routes/game')(app, passport);

// This is where the routing happens
app.use('/', index);
app.use('/lobby', lobby);
app.use('/profile', profile);
app.use('/scoreboard', scoreboard);
app.use('/register', register);
app.use('/player', player);
app.use('/game', game);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
