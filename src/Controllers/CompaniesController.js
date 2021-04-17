const Company = require('../Models/Companies');
const Opportunity = require('../Models/Opportunities');
const { Op } = require("sequelize");

module.exports = {
    async index(req, res) {

        try {
            const company = await Company.findAll({
                attributes: ['name', 'email', 'category'],
                include: [{
                    model: Opportunity,
                    attributes: ['name']
                }]
            });

            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async create(req, res) {
        try {
            const { name, address, category, email, password, cnpj } = req.body;

            const companyAlreadyExists = await Company.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { cnpj }
                    ]
                }
            });
            if (companyAlreadyExists) {
                //tratar
                return res.status(401).json({ message: 'EMAIL/CNPJ ALREADY EXISTS' });
            }

            const company = await Company.create({ name, address, category, password, email, cnpj });

            return res.status(201).json({ company });

        } catch (error) {
            return res.status(500).json(error);
        }
    },

    async filter(req, res) {
        const { id } = req.params;
        try {
            const company = await Company.findOne({
                attributes: ['name', 'email', 'category', 'address', 'cnpj'],
                where: {
                    id
                },
                include: [{
                    model: Opportunity,
                    attributes: ['name', 'description', 'level', 'requirements', 'numberOfJobsOpens']
                }]
            });
            if (!company) {
                //tratar
                return res.status(404).json({ message: 'COMPANY NOT FOUND' });
            }

            return res.status(200).json(company);
        } catch (error) {
            return res.status(500).json(error);
        }
    },
    async update(req, res) {

        const { userId } = req;
        const { id } = req.params;
        const { name, address, category, email, password, cnpj } = req.body;

        try {
            if (userId != id) {
                //tratar
                return res.status(404).json({ message: 'DOES NOT AUTHORIZED' });
            }

            const company = await Company.findOne({
                where: { id }
            });

            if (!company) {
                //tratar
                return res.status(404).json({ message: 'COMPANY NOT FOUND ' });
            }

            const companyAlreadyExists = await Company.findOne({
                where: {
                    [Op.or]: [
                        { email },
                        { cnpj }
                    ]
                }
            });

            if (companyAlreadyExists && companyAlreadyExists.id != company.id) {
                //tratar
                return res.status(401).json({ message: 'A EMAIL/CNPJ ALREADY EXISTS' });
            }

            await Company.update({
                name, address, category, email, password, cnpj
            }, {
                where: { id }
            });
            return res.status(201).json({ message: 'SUCCESSFULLY CHANGED' });
        } catch (error) {

            return res.status(500).json(error);
        }
    },
};
 /* Nao tem sentido deletar a empresa cadastrada
async destroy(req, res) {
const { id } = req.params;
const { userId } = req;

try {
const company = await Company.findOne({ where: { id } });

if (!company || id != userId) {
//tratar
return res.status(404).json({ message: 'DOES NOT AUTHORIZED' });
}
await Company.destroy({ where: { id } });

return res.status(204).json();
} catch (error) {
return res.status(500).json(error);
}
} */
