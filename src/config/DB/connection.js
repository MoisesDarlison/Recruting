const Sequelize = require('sequelize');
const dbConfig = require('./config');

const connection = new Sequelize(dbConfig);

module.exports = connection;

//DB rodando da porta: 3306
// cria a migration
//npx sequelize migration:create --name=create-task