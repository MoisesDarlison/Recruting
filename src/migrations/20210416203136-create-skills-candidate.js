'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('skillsCandidates', {
      skillId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'skills',
          key: 'id'
        }
      },
      candidateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'candidates',
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
    await queryInterface.dropTable('skillsCandidates');
  }
};