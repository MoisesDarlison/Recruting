const connection = require("../config/DB/connection");
const Opportunity = require('./Opportunities');
const Skill = require('./Skills');

const skillsOpportunity = connection.define('skillsOpportunities', {

}, {
  freezeTableName: true
});

skillsOpportunity.removeAttribute('id');

Opportunity.hasMany(skillsOpportunity, {
  foreignKey: 'opportunityId'
});

skillsOpportunity.belongsTo(Opportunity);

Skill.hasMany(skillsOpportunity, {
  foreignKey: 'skillId'
});

skillsOpportunity.belongsTo(Skill);

module.exports = skillsOpportunity;