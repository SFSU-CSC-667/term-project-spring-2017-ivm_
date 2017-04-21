var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('lobby', { title: 'Tank City Lobby', register_message: '' });
});

module.exports = router;
