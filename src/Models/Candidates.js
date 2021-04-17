const connection = require("../config/DB/connection");
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const Candidates = connection.define('candidates', {

  name: {
    type: Sequelize.STRING
  },
  address: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  phone: {
    type: Sequelize.STRING
  },
  active: {
    type: Sequelize.BOOLEAN
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
  hooks: {
    afterValidate: (Candidates, options) => {
      {
        Candidates.password = Candidates.password && Candidates.password != "" ? bcrypt.hashSync(Candidates.password, 10) : "";
      }
    },
  }
});

module.exports = Candidates;