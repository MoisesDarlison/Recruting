const routes = require('express')();
const { index, create } = require('../Controllers/SkillsController');

routes.get('/', index);
routes.post('/', create);

module.exports = routes;