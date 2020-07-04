const User = require('../models/User');
const jwt = require('../utils/jwt')
module.exports= {

    get : {
        register(req,res,next) {
            res.render('user/register.hbs', {pageTitle : "Register Page"});
        },
        login(req,res,next){
            res.render('user/login.hbs', {pageTitle : "Login Page"});
        },
        logout (req,res,next){
            res.clearCookie('auth-cookie').redirect('/');

        }
    },
    post : {
       async register(req,res,next){
            const {username,password,'repeat-password':repeatPassword}= req.body;
            if(password !== repeatPassword) {
                 res.render('user/register.hbs',{pageTitle : "Register Page",
                 message:"Password and repeat password don't match!"} );return;
                }
                try {
                    const user = await User.findOne({username});
                    if(user) {
                        res.render('user/register.hbs',{pageTitle : "Register Page",
                        message:"Username is already taken!"} );return;
                    }
                    await User.create({username,password});
                    res.status(201).redirect('/user/login');
                } catch (error) {
                    next(error)
                }
        },
       async login(req,res,next){
            const {username,password}= req.body;

            try {
                const user=await User.findOne({username});
                if(!user) {
                    res.render('user/login.hbs',{
                        pageTitle : "Login Page",
                        message:"Username don't exist!",
                        username
                     });
                    return;
                }
               const match = await user.checkPasswords(password);
               if(!match) {
                res.render('user/login.hbs',{
                    pageTitle : "Login Page",
                    message:"Username or password is not valid!",
                    username
                    });
                    return;
                }
                const token = await jwt.create({id:user._id, username :user.username});
                res.cookie('auth-cookie',token);
                res.redirect('/');
                
            } catch (error) {
                next(error)
            }

           }
    }
    

}