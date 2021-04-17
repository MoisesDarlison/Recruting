const Company = require('../Models/Companies');

module.exports = {
    async index(req, res) {
        try {
            const users = await Company.findAll();
            return res.status(200).json(users);

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async create(req, res) {
        try {
            const { name, address, category, email, password, cnpj } = req.body;
            const user = await Company.create({ name, address, category, password, email, cnpj });

            return res.status(201).json(user);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

};