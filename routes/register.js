var express = require('express');
var router = express.Router();

var db = require('.././server/models/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

router.post('/', function(req, res, next) {
    const user = req.body;
    db.query('INSERT INTO Player (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5);'
                  ,[user.first_name, user.last_name, user.username, user.email, user.password]);
    // the url will have a query string registration=complete
    // in index.js, having this query string will print 'Registration Successful' in the rendered page.
    res.redirect('../?registration=complete');
});

module.exports = router;
