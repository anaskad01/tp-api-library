'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('User', 'role', {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'utilisateur',
      });
    } catch (error) {
      console.log('Column role may already exist:', error.message);
    }

    await queryInterface.bulkInsert('User', [
      {
        username: 'admin',
        password: 'admin123',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'gerant',
        password: 'gerant123',
        role: 'gerant',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'utilisateur',
        password: 'user123',
        role: 'utilisateur',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('User', {
      username: ['admin', 'gerant', 'utilisateur']
    }, {});
    
    await queryInterface.removeColumn('User', 'role');
  }
};