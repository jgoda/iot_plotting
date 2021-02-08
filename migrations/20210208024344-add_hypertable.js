'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.sequelize.query("SELECT create_hypertable('sensor_data', 'time');");
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
