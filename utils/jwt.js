const jwt = require('jsonwebtoken');
module.exports= {
    create(data){
        return jwt.sign(data,process.env.SECRET);
    },
    verify(token){}
}