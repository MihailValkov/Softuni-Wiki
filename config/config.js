module.exports = {
    development : {
        port : process.env.PORT,
        dataBase : `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@db.exhqa.mongodb.net/${process.env.DB_NAME}`
    },
    production : {}
}