const Candidate = require('../Models/Candidates');
const SkillCandidate = require('../Models/SkillsCandidate');

module.exports = {
    async index(req, res) {
        try {
            const candidate = await Candidate.findAll();
            return res.status(200).json(candidate);

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async create(req, res) {
        try {
            const { name, address, phone, email } = req.body;
            const candidate = await Candidate.create({ name, address, phone, email });

            return res.status(201).json(candidate);

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async associateSkill(req, res) {
        try {
            const [candidateId, skillId] = [1, 1];
            console.log({ candidateId, skillId });

            const skill = await SkillCandidate.create({ candidateId, skillId });

            return res.status(201).json(skill);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

};