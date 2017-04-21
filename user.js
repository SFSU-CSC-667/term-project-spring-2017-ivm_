


exports.isLoggedIn = function(req, res, next) {

    if (req.isAuthenticated()){
        console.log(req.user.username);
        return next();
    }

    res.redirect('/');
}
