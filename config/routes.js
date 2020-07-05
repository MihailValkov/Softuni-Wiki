const routes = require('../routers')

module.exports= (app) => {

    app.use('/', routes.home);

    app.use('/user', routes.user);

    app.use('/article', routes.article);
}