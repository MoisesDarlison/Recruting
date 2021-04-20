const routes = require('express')();
const { verifyJWT } = require('../middleware/Auth');
const { index, create, filter, update, destroy, associateSkill } = require('../Controllers/CandidatesController');

routes.get('/', verifyJWT, index);
routes.get('/:id', verifyJWT, filter);
routes.put('/:id', verifyJWT, update);
routes.delete('/:id', verifyJWT, destroy);
routes.post('/increment', verifyJWT, associateSkill);
routes.post('/', create);

module.exports = routes;