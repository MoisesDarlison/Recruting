'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skillsOpportunities', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      skillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'skills',
          key: 'id'
        }
      },
      opportunityI: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'opportunities',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('skillsOpportunities');
  }
};