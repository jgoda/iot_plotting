'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class sensor_data extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  sensor_data.init({
    time: DataTypes.DATE,
    value: DataTypes.DOUBLE,
    sensorID: DataTypes.STRING,
    linkKey: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'sensor_data',
  });
  return sensor_data;
};