const routes = require('express')();
const { verifyJWT } = require('../middleware/Auth');
const { index, create, filter, update } = require('../Controllers/CompaniesController');

routes.post('/', create);
routes.get('/:id', verifyJWT, filter);
//routes.delete('/:id', verifyJWT, destroy);
routes.put('/:id', verifyJWT, update);
routes.get('/', verifyJWT, index);

module.exports = routes;