'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('progressUsers', {
      ProgressID: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      UserID: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users',
          key:'UserID'
        }
      },
      KelasID: {
        type: Sequelize.INTEGER,
        references: {
          model:'kelas',
          key:'KelasID'
        }
      },
      ModulID: {
        type: Sequelize.INTEGER,
        references: {
          model:'moduls',
          key:'ModulID'
        }
      },
      Status: {
        type: Sequelize.BOOLEAN
      },
      ProgressPersen: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('progressUsers');
  }
};