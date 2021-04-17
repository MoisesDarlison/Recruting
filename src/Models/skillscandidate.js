const connection = require("../config/DB/connection");
const Candidate = require('./Candidates');
const Skill = require('./Skills');

const SkillCandidate = connection.define('skillsCandidates', {

}, {
  freezeTableName: true
});

SkillCandidate.removeAttribute('id');

Candidate.hasMany(SkillCandidate, {
  foreignKey: 'candidateId'
});

SkillCandidate.belongsTo(Candidate);

Skill.hasMany(SkillCandidate, {
  foreignKey: 'skillId'
});

SkillCandidate.belongsTo(Skill);

module.exports = SkillCandidate;