const connection = require("../config/DB/connection");
const Sequelize = require('sequelize');

const Skill = connection.define('skills', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.STRING
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
  freezeTableName: true
});

module.exports = Skill;