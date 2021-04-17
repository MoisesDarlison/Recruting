const routes = require('express')();
const { index, create, associateSkill } = require('../Controllers/OpportunitiesController');

routes.get('/', index);
routes.post('/skills', associateSkill);
routes.post('/', create);

module.exports = routes;