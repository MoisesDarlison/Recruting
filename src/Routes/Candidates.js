const routes = require('express')();
const { index, create } = require('../Controllers/CandidatesController');

routes.get('/', index);
routes.post('/', create);

module.exports = routes;