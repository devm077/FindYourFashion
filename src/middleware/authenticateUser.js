
function authenticateUser(req, res, next) {
    if (req.session && req.session.user) {
        req.user = req.session.user;
        next();
    }
    else{
        req.user=null
        next()
    }
}

module.exports =  authenticateUser

