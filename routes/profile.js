var express = require('express');
var router = express.Router();
var db = require('.././server/models/db.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    // allows all users to be rendered in profile.jade
    var result = db.query('SELECT * FROM Player;', function(err, result){
      //res.send(result.rows);
      res.render('profile', {query_rows: result.rows});
    });
});

module.exports = router;
