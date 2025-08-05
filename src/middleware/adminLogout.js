function logoutAdmin(req, res, next) {
    if (req.session && req.session.admin) {
        req.session.destroy();
        res.redirect('/');
    } else {
        next();
    }
}

module.exports=logoutAdmin