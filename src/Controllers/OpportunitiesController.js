const Opportunity = require('../Models/Opportunities');
const Company = require('../Models/Companies');
const Skill = require('../Models/Skills');
const SkillOpportunity = require('../Models/SkillsOpportunities');
const sequelize = require('sequelize');

module.exports = {
    async index(req, res) {
        try {
            const opportunity = await Opportunity.findAll({
                include: [{
                    model: Company,
                    attributes: ['name']
                }, {
                    model: Skill,
                    attributes: ['name']
                },]
            });

            return res.status(200).json(opportunity);

        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async create(req, res) {
        try {

            const companyId = req.userId;

            const { name, description, level, requirements, numberOfJobsOpens } = req.body;
            const opportunity = await Opportunity.create({ name, description, level, requirements, numberOfJobsOpens, companyId });

            return res.status(200).json(opportunity);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async associateSkill(req, res) {
        try {

            const { id } = req.params;
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

            const skill_opportunity = await SkillOpportunity.create({ opportunityId: id, skillId: skillAlreadyExists.id });

            return res.status(201).json(skill_opportunity);
        } catch (error) {
            if (error instanceof sequelize.Error) {

                switch (error.name) {
                    case "SequelizeForeignKeyConstraintError":
                        return res.status(404).json({ message: "OPPORTUNITY DOES NOT EXISTS" });
                    case "SequelizeUniqueConstraintError":
                        return res.status(401).json({ message: "SKILL ALREADY EXISTS FOR THIS OPPORTUNITY" });
                    default:
                        return res.status(400).json(error.name);
                }
            }

            return res.status(500).json({ error });
        }
    }
};