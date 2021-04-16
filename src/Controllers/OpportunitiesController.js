const Opportunities = require('../Models/Opportunities');

module.exports = {
    async index(req, res) {
        try {
            const opportunity = await Opportunities.findAll();
            return res.status(200).json(opportunity);

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async create(req, res) {
        try {
            //companyId coming token
            const { name, description, level, requirements, numberOfJobsOpens, companyId } = req.body;
            const opportunity = await Opportunities.create({ name, description, level, requirements, numberOfJobsOpens, companyId });

            return res.status(200).json(opportunity);
        } catch (error) {
            return res.status(500).json(error);
        }
    }

};