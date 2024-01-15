'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Notes', [{
      title: 'Building a React typescript application',
      body: 'This project was built using Vanilla JavaScript, HTML, and CSS',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Project 1',
      body: 'This project was built using Express & React.',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
