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

            const skillAlreadyExists = await Skill.findOne({
                where: { name: name.toLowerCase() }
            });

            if (skillAlreadyExists) {
                //tratar
                return res.status(401).json({ message: 'SKILL ALREADY EXISTS' });
            }
            const skill = await Skill.create({ name: name.toLowerCase(), description });

            return res.status(201).json(skill);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
};