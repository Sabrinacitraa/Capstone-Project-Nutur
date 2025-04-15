'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class modul extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.progressUser, {
        foreignKey: "ModulID", as: "modulProgress"
      })
      this.belongsTo(models.user, {foreignKey: "KelasID"})
    }
  }
  modul.init({
    ModulID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    JudulModul: DataTypes.STRING,
    Deskripsi: DataTypes.STRING,
    KelasID: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'modul',
  });
  return modul;
};