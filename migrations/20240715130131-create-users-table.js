'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { DataTypes } = Sequelize;
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      balance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 10000
      },
    });

    await queryInterface.bulkInsert('Users', [{
      balance: 10000,
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};