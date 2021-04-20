const Candidate = require('../Models/Candidates');
const Skill = require('../Models/Skills');
const SkillCandidate = require('../Models/SkillsCandidates');
const sequelize = require('sequelize');

module.exports = {

    async index(req, res) {
        try {
            const candidate = await Candidate.findAll({
                attributes: ['name', 'email', 'active'],
                include: {
                    model: Skill,
                    attributes: ['name']
                }
            });
            return res.status(200).json(candidate);

        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async create(req, res) {
        try {
            const { name, address, phone, email, password } = req.body;
            //TRATAR ENTRADA DE DADOS

            const candidateAlreadyExists = await Candidate.findOne({
                where: { email }
            });

            if (candidateAlreadyExists) {
                //tratar
                return res.status(401).json({ message: 'EMAIL ALREADY EXISTS' });
            }
            const candidate = await Candidate.create({ name, address, phone, email, password });

            return res.status(201).json(candidate);

        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async filter(req, res) {

        const { id } = req.params;

        try {
            const candidate = await Candidate.findOne({
                attributes: ['name', 'address', 'phone', 'email', 'active'],
                where: {
                    id
                },
                include: {
                    model: Skill,
                    attributes: ['name'],
                }
            });
            if (!candidate) {
                //tratar
                return res.status(404).json({ message: 'CANDIDATE NOT FOUND' });
            }

            return res.status(200).json(candidate);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async update(req, res) {
        const { userId } = req;
        const { id } = req.params;
        const { name, address, phone, email, password } = req.body;

        try {
            if (userId != id || !email) {
                //tratar
                return res.status(404).json({ message: 'DOES NOT AUTHORIZED' });
            }

            const candidate = await Candidate.findOne({
                where: { id }
            });

            if (!candidate) {
                //tratar
                return res.status(404).json({ message: 'CANDIDATE NOT FOUND' });
            }

            const candidateAlreadyExists = await Candidate.findOne({
                where: { email }
            });

            if (candidateAlreadyExists && candidateAlreadyExists.id != candidate.id) {
                //tratar
                return res.status(401).json({ message: 'EMAIL ALREADY EXISTS' });
            }

            await Candidate.update({
                name, address, phone, email, password, active: true
            }, {
                where: { id }
            });

            return res.status(201).json({ message: 'SUCCESSFULLY CHANGED' });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async destroy(req, res) {

        const { id } = req.params;
        const { userId } = req;

        try {
            if (userId != id) {
                return res.status(401).json({ message: 'DOES NOT AUTHORIZED' });
            }

            const candidate = await Candidate.update({
                active: false
            }, {
                where: { id }
            });

            if (!candidate) {
                //tratar
                return res.status(404).json({ message: 'CANDIDATE NOT FOUND' });
            }

            return res.status(200).json({ message: 'user will no longer appear in queries' });
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async associateSkill(req, res) {
        try {
            const { userId } = req;
            const { skill } = req.query;

            const skillAlreadyExists = await Skill.findOne({
                where: { name: skill.toLowerCase() }
            });

            if (!skillAlreadyExists) {
                //tratar
                return res.status(404).json({ message: 'SKILL NOT FOUND' });
            }
            /** hitalo
             *  Need treatment if not exists OpportunityID with other consult database 
             *  Or can handle error only
             **/

            const skill_candidate = await SkillCandidate.create({ candidateId: userId, skillId: skillAlreadyExists.id });

            return res.status(201).json(skill_candidate);
        } catch (error) {
            if (error instanceof sequelize.Error) {

                switch (error.name) {
                    case "SequelizeForeignKeyConstraintError":
                        return res.status(404).json({ message: "OPPORTUNITY DOES NOT EXISTS" });
                    case "SequelizeUniqueConstraintError":
                        return res.status(401).json({ message: "SKILL ALREADY EXISTS FOR THIS CANDIDATE" });
                    default:
                        return res.status(400).json(error);
                }
            }
            return res.status(500).json(error);
        }
    },
};