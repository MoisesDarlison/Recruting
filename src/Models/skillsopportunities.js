'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class skillsOpportunities extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  skillsOpportunities.init({
    skillId: DataTypes.STRING,
    opportunityI: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'skillsOpportunities',
  });
  return skillsOpportunities;
};