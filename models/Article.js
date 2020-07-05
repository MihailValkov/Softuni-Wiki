const mongoose = require('mongoose');
const { String , ObjectId} = mongoose.Schema.Types

const articleSchema = new mongoose.Schema({
    title :{
        type : String,
        required:true,
        unique:true,
        minlength : [5,"Title should be at least 5 characters!"]
    },
    description : {
        type : String,
        required:true,
        minlength : [20,"Description should be at least 20 characters!"]
    },
    author : { type : ObjectId , ref:"User"},
    createdAt : { type : String}
})

module.exports = mongoose.model('Article', articleSchema)
