var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // the registration=complete query string is a result of completing registration,
  // which takes the visitor back to the home page with the 'Registration Successful!' message.
    if(req.query.registration === 'complete'){
      res.render('index', { title: 'Tank City', register_message: 'Registration Successful!' });
    }else {
      res.render('index', { title: 'Tank City', register_message: '' });
    }
});

module.exports = router;
