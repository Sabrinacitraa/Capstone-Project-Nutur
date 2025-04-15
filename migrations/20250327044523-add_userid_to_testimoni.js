module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('testimonis', 'UserID', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'users', // Nama tabel users
        key: 'UserID'
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('testimonis', 'UserID');
  }
};
