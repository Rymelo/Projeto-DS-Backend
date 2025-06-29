const { Sequelize } = require("sequelize");

const connection = new Sequelize ({
    dialect: 'mysql',
    host:'localhost',
    port:3306,
    username:'root',
    password:'admin',
    database: 'DSBackend'
})

module.exports = connection;