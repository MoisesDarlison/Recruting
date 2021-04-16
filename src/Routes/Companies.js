const routes = require('express')();
const { index, create } = require('../Controllers/Companies');

routes.get('/', index);
routes.post('/', create);

module.exports = routes;