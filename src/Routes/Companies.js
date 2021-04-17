const routes = require('express')();
const { index, create } = require('../Controllers/CompaniesController');
const { verifyJWT } = require('../middleware/Auth');

routes.get('/', verifyJWT, index);
routes.post('/', create);

module.exports = routes;