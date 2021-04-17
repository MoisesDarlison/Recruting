const connection = require("../config/DB/connection");
const Sequelize = require('sequelize');
const Company = require('./Companies');

const Opportunity = connection.define('opportunities', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
  },
  level: {
    type: Sequelize.STRING
  },
  requirements: {
    type: Sequelize.STRING
  },
  numberOfJobsOpens: {
    type: Sequelize.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    type: Sequelize.DATE
  }
}, {
  freezeTableName: true,
});

Company.hasMany(Opportunity, {
  foreignKey: 'companyId'
});
Opportunity.belongsTo(Company);

module.exports = Opportunity;