const connection = require("../config/DB/connection");
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const Companies = connection.define('companies', {
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
    cnpj: {
        type: Sequelize.STRING
    },
    category: {
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
    freezeTableName: true,
    hooks: {
        afterValidate: (Companies, options) => {
            {
                Companies.password = Companies.password && Companies.password != "" ? bcrypt.hashSync(Companies.password, 10) : "";
            }
        },
    }
});

module.exports = Companies;