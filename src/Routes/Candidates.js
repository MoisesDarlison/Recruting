const routes = require('express')();
const { index, create, associateSkill } = require('../Controllers/CandidatesController');
const { verifyJWT } = require('../middleware/Auth');

routes.get('/', verifyJWT, index);
routes.post('/skills', verifyJWT, associateSkill);
routes.post('/', create);

module.exports = routes;