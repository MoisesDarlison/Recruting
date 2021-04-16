const routes = require('express')();
const { index, create } = require('../Controllers/CompaniesController');

routes.get('/', index);
routes.post('/', create);

module.exports = routes;