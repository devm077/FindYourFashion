function authenticateAdmin(req, res, next) {
    if (req.session && req.session.admin) {
        req.admin = req.session.admin;
        next();
    }
    else{
        req.admin=null
        next()
    }
}

module.exports=authenticateAdmin