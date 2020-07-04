const jwt = require('jsonwebtoken');
module.exports= {
    create(data){
        return jwt.sign(data,process.env.SECRET);
    },
    verify(token){
       return jwt.verify(token,process.env.SECRET, (err,user)=> {
            if(err) { return false}
            return user;
        });
    }
}