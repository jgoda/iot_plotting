'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.renameColumn('sensors','id','sensorid');
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
      return queryInterface.renameCOlumn('sensors','sensorid','id');
  }
};
