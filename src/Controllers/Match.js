const Opportunity = require('../Models/Opportunities');
const Candidate = require('../Models/Candidates');
const Skill = require('../Models/Skills');
const Company = require('../Models/Companies');

module.exports = {
    async executeMatch(req, res) {

        try {

            const { id } = req.params;
            const { userId } = req;
            const quantityRequirementsForOpportunity = 1;//change so that it is informed in the registration of the vacancy

            //search a opportunity with your skills in company logged
            const skillQOpportunityHave = await Opportunity.findAll({
                where: { id },
                include: [{
                    model: Skill
                }, {
                    model: Company,
                    where: { id: userId }
                }]
            });

            if (!skillQOpportunityHave.length) {
                //tratar
                return res.status(404).json({ message: 'DOES NOT AUTHORIZED' });
            }

            //remove only names of the skills
            const skillQOpportunityHaveMap = skillQOpportunityHave[0].skills.map((op) => {
                return op.name;
            });

            //get all candidates and your skills
            const candidates = await Candidate.findAll({
                include: {
                    model: Skill
                }
            });

            //Array filter only candidates who have only one requested skill
            const candidateWithSkills = candidates.filter((candidate) => {
                //filter - compare and return only skill what belong to opportunity
                const candidateHaveFilter = candidate.skills.filter((skill) => {
                    return skillQOpportunityHaveMap.includes(skill.name);
                });
                //return candidates who have quantityRequirementsForOpportunity with params
                return candidateHaveFilter.length > quantityRequirementsForOpportunity;
            });

            return res.status(200).json(candidateWithSkills);

        } catch (error) {
            console.log(error);
            return res.status(500).json(error);
        }
    }
};