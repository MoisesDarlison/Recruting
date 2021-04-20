const routes = require('express')();
const { verifyJWT } = require('../middleware/Auth');
const { executeMatch } = require('../Controllers/Match');
const { index, create, associateSkill } = require('../Controllers/OpportunitiesController');

routes.get('/:id/match', verifyJWT, executeMatch);
routes.get('/', index);
routes.post('/increment/:id', verifyJWT, associateSkill);
routes.post('/', verifyJWT, create);

module.exports = routes;