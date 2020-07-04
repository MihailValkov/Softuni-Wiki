const jwt = require('./jwt');
module.exports = (needAccess=true) => {
    return function(req,res,next) {
        const token = req.cookies['auth-cookie'] || '';
        const user = jwt.verify(token, process.env.SECRET);
        if(!user) {
            if(!needAccess) {
                next();return;
            }
            res.redirect('/');return;
        }
        req.user= user;
        if(req.user && needAccess===false){ res.redirect('/home');return;}
        next();
    }
}