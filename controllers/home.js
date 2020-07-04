module.exports = {
    get : {
        home (req,res,next){
            const username= req.user? req.user.username: undefined;
            res.render('home/home.hbs',{pageTitle : "Home Page", username, isLoggedIn : !!username});
        }
    }
}