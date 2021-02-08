'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sensors extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sensors.init({
    id: DataTypes.INTEGER,
    type: DataTypes.INTEGER,
    blockchainid: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sensors',
  });
  return sensors;
};