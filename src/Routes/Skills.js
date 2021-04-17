const routes = require('express')();
const { index, create } = require('../Controllers/SkillsController');
const { verifyJWT } = require('../middleware/Auth');

routes.get('/', verifyJWT, index);
routes.post('/', verifyJWT, create);

module.exports = routes;