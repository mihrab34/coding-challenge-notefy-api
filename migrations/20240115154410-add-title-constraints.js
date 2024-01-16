'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Notes', 'title', {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn('Notes', 'title', {
      type: Sequelize.STRING,
      allowNull: true // Allow null values again
    });
  }
};
