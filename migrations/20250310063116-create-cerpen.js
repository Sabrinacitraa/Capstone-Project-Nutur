'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('cerpens', {
      CerpenID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Penulis: {
        type: Sequelize.STRING
      },
      Provinsi: {
        type: Sequelize.STRING
      },
      TeksCerpen: {
        type: Sequelize.STRING
      },
      audio: {
        type: Sequelize.STRING
      },
      BahasaID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'bahasas',
          key: 'BahasaID'
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
    await queryInterface.dropTable('cerpens');
  }
};