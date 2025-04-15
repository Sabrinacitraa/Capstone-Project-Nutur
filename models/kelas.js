'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.modul, {
        foreignKey: "KelasID", as: "kelasModul"
      })
      this.hasMany(models.progressUser, {
        foreignKey: "KelasID", as: "kelasProgress"
      })
      this.belongsTo(models.user, { foreignKey: "UserID" })
      this.belongsTo(models.bahasa, { foreignKey: "BahasaID" })

    }
  }
  kelas.init({
    KelasID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    JudulKelas: DataTypes.STRING,
    Deskripsi: DataTypes.STRING,
    BahasaID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    UserID: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'kelas',
  });
  return kelas;
};