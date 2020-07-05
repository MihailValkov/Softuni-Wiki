const Article = require("../models/Article");
const User = require("../models/User");
const renderMessage = require('../utils/error-handler');

module.exports = {
  get: {
    create(req, res, next) {
        const username= req.user? req.user.username: undefined;
        res.render('article/create.hbs',{pageTitle:"Article Create Page",username, isLoggedIn : !!username});
    },
    async all(req,res,next){
        try {
            const articles= await Article.find().select("title").lean();
            const username= req.user? req.user.username: undefined;
            res.render('article/all.hbs',{pageTitle:"All Articles Page",username, isLoggedIn : !!username, articles});
            
        } catch (error) {
            
        }
    },
    async details(req,res,next){
        const { articleId } = req.params;
        const username= req.user? req.user.username: undefined;
        try {
            const article =  await Article.findById(articleId).populate('author').lean();
            const isAuthor = article.author.username === req.user.username;
            article.description=article.description.split('\n');
            res.render('article/details.hbs',{pageTitle:"Details Article Page",username,isAuthor, isLoggedIn : !!username, ...article});

        } catch (error) {
            next(error);
        }
    },
    async search(req,res,next){
        const { search } =req.query;
        const username= req.user? req.user.username: undefined;
        const regex = new RegExp(`.*${search}.*`,'i');
        try {
            const articles = await Article.find({title : { $regex :regex}}).lean();
            res.render('article/search.hbs',{pageTitle:"Search Article Page",username, isLoggedIn : !!username, articles,search});
        } catch (error) {
            
        }
    },
    async edit (req,res,next){
        const { articleId } = req.params;
        const username= req.user? req.user.username: undefined;
        try {
            const article = await Article.findById(articleId).lean();
            res.render('article/edit.hbs',{pageTitle:"Edit Article Page",username, isLoggedIn : !!username, ...article,articleId})
        } catch (error) {
            next(error);
        }
    },
    async delete (req,res,next){
        const { articleId } = req.params;
        const userId = req.user.id;
        try {
           const article= await Article.findById(articleId);
           // Only author can delete current article 
           if(article.author.toString()=== userId){
               await Article.findByIdAndRemove(articleId);
               res.redirect('/article/all');
               return;
           }
            res.redirect(`/article/details/${articleId}`);
        } catch (error) {
            next(error);
        }
    }
  },
  post: {
    async create(req, res, next) {
        const {title, description}= req.body;
        const username= req.user? req.user.username: undefined;
        try {
            const article = await Article.findOne({title});
            const createdArticle =await Article.create({title, description, author:req.user.id, createdAt :new Date().toLocaleString()});
            await User.findByIdAndUpdate(req.user.id, {$addToSet: { createdArticles: createdArticle._id }});
            res.status(201).redirect('/article/all');
            
        } catch (error) {
            renderMessage(error,res,"article/create.hbs",
            { pageTitle:"Create Article Page",username, isLoggedIn : !!username,description,title } ,next);
        }
    },
    async edit (req,res,next){
        const { articleId }= req.params;
        const { description }= req.body
        const username= req.user? req.user.username: undefined;
        try {
            await Article.findByIdAndUpdate(articleId,{description}, {runValidators :true});
            res.redirect(`/article/details/${articleId}`);
        } catch (error) {
            renderMessage(error,res,"article/edit.hbs",
            { pageTitle:"Edit Article Page",username, isLoggedIn : !!username,description, articleId} ,next);
        }
    }
  },
};
