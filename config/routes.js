const routes = require('../routers')

module.exports= (app) => {

    app.use('/', routes.home);
}