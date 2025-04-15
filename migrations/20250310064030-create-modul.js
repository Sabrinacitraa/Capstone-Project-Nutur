'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('moduls', {
      ModulID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      JudulModul: {
        type: Sequelize.STRING
      },
      Deskripsi: {
        type: Sequelize.STRING
      },
      KelasID: {
        type: Sequelize.INTEGER,
        references: {
          model:'kelas',
          key:'KelasID'
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('moduls');
  }
};