function logoutUser(req, res, next) {
    if (req.session && req.session.user) {
        req.session.destroy();
        res.redirect('/');
    } else {
        next();
    }
}

module.exports=logoutUser