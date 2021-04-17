const routes = require('express')();
const { index, create, associateSkill } = require('../Controllers/OpportunitiesController');
const { verifyJWT } = require('../middleware/Auth');

routes.get('/', verifyJWT, index);
routes.post('/skills', verifyJWT, associateSkill);
routes.post('/', verifyJWT, create);

module.exports = routes;