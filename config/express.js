const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');

module.exports= (app) => {

    app.use(cookieParser());
    app.use(express.urlencoded({extended:false}));
    app.use(express.static('public'));
    app.set('views','views')
    app.engine('.hbs', handlebars({ extname :'.hbs'}));

}