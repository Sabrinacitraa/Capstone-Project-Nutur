'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('kelas', {
      KelasID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      JudulKelas: {
        type: Sequelize.STRING
      },
      Deskripsi: {
        type: Sequelize.STRING
      },
      BahasaID: {
        type: Sequelize.INTEGER,
        references: {
          model:'bahasas',
          key:'BahasaID'
        }
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          model:'users',
          key:'UserID'
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
    await queryInterface.dropTable('kelas');
  }
};