const routes = require('express')();
const { authentication } = require('../Controllers/AuthController');

routes.post('/', authentication);

module.exports = routes;