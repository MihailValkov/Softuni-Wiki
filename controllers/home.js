const Article = require('../models/Article');
module.exports = {
    get : {
        async home (req,res,next){
            try {
                const articles= await Article.find().populate("author").sort({"createdAt" : -1}).limit(3).lean();
                articles.map(x=> x.description=x.description.split(' ').slice(0,50).join(' '));
                const username= req.user? req.user.username: undefined;
                res.render('home/home.hbs',{pageTitle : "Home Page",articles,
                 username, isLoggedIn : !!username});

            } catch (error) {
                next(error);
            }
        }
    }
}