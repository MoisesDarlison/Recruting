const routes = require('express')();
const { index, create } = require('../Controllers/Opportunities');

routes.get('/', index);
routes.post('/', create);

module.exports = routes;