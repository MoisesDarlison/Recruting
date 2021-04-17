const routes = require('express')();
const { index, create, associateSkill } = require('../Controllers/CandidatesController');

routes.get('/', index);
routes.post('/skills', associateSkill);
routes.post('/', create);

module.exports = routes;