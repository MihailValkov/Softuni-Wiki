const config = require('./config')[process.env.NODE_ENV];
const mongoose = require('mongoose');

module.exports = ()=> {
    return mongoose.connect(config.dataBase,{ useNewUrlParser: true ,useUnifiedTopology: true},(err)=> {
        if(err) {
            console.error('!!! WARNING !!! Something is wrong with DB');
        }
        console.log('*** Database is connected ! ***');
    })
}