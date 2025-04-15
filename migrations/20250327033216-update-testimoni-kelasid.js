'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.removeColumn('testimonis', 'ProgressID');
    await queryInterface.addColumn('testimonis', 'KelasID', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'kelas',
        key: 'KelasID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.addColumn('testimonis', 'ProgressID', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'progressUsers', // Sesuaikan dengan nama tabel sebelumnya
        key: 'ProgressID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
    await queryInterface.removeColumn('testimonis', 'KelasID');
  }
};