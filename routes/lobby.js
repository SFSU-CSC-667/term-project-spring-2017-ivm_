var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if (req.isAuthenticated()){
        res.render('lobby', { title: 'Tank City Lobby', user: req.user });
    }else{
        res.render('index', { error: 'Log in to start game!' });
    }

});

module.exports = router;
