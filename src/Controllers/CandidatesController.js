const Candidate = require('../Models/Candidates');

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
    }

};