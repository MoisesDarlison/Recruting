const Company = require('../models/Companies');
const Candidate = require('../models/Candidates');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { SECRET_JWT } = process.env;

module.exports = {
    async authentication(req, res) {
        const { name, password } = req.body;
        let userSignup;
        try {
            userSignup = await Company.findOne({
                where: { name: name }, attributes: ['id', 'password'],
            });

            if (!userSignup) {
                userSignup = await Candidate.findOne({
                    where: { name: name }, attributes: ['id', 'password'],
                });
            }

            if (!userSignup) {
                return res.status(404).json({ error: 'USER NOT FOUND' });
            }

            const validateUser = bcrypt.compareSync(password, userSignup.dataValues.password);

            if (!validateUser) {
                return res.status(401).json({ error: 'INVALID PASSWORD' });
            }

            const token = jwt.sign({ userId: userSignup.dataValues.id }, SECRET_JWT, { expiresIn: 3000000 });
            return res.status(200).json({ id: userSignup, token });

        } catch (error) {
            return res.status(500).json(error);
        }
    },
};