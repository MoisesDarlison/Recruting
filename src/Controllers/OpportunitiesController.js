const Opportunity = require('../Models/Opportunities');
const Company = require('../Models/Companies');
const SkillOpportunity = require('../Models/SkillsOpportunities');

module.exports = {
    async index(req, res) {
        try {
            const opportunity = await Opportunity.findAll({
                include: {
                    model: Company,
                    attributes: ['name']
                }
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
            const [opportunityId, skillId] = [1, 1];

            const skill = await SkillOpportunity.create({ opportunityId, skillId });

            return res.status(201).json(skill);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

};