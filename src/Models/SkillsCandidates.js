const connection = require("../config/DB/connection");
const Candidate = require('./Candidates');
const Skill = require('./Skills');

const SkillCandidate = connection.define('skillsCandidates', {}, { freezeTableName: true });

SkillCandidate.removeAttribute('id');

Candidate.belongsToMany(Skill, { through: SkillCandidate });
Skill.belongsToMany(Candidate, { through: SkillCandidate });

module.exports = SkillCandidate;