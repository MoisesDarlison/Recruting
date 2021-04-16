const Skill = require('../Models/Skills');

module.exports = {
    async index(req, res) {
        try {
            const skill = await Skill.findAll();
            return res.status(200).json(skill);

        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async create(req, res) {
        try {
            const { name, description } = req.body;
            const skill = await Skill.create({ name, description });

            return res.status(201).json(skill);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

};