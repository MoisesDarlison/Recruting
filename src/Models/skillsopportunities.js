const connection = require("../config/DB/connection");
const Opportunity = require('./Opportunities');
const Skill = require('./Skills');

const skillsOpportunity = connection.define('skillsOpportunities', {}, { freezeTableName: true });

skillsOpportunity.removeAttribute('id');

Opportunity.belongsToMany(Skill, { through: skillsOpportunity });
Skill.belongsToMany(Opportunity, { through: skillsOpportunity });

module.exports = skillsOpportunity;