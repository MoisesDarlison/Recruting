const routes = require('express')();
const { index, create } = require('../Controllers/OpportunitiesController');

routes.get('/', index);
routes.post('/', create);

module.exports = routes;