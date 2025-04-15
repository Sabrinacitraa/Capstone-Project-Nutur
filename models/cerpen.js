'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cerpen extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.bahasa, {foreignKey: "BahasaID"})
    }
  }
  cerpen.init({
    CerpenID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Judul: DataTypes.STRING,
    Penulis: DataTypes.STRING,
    Provinsi: DataTypes.STRING,
    TeksCerpen: DataTypes.STRING,
    audio: DataTypes.STRING,
    BahasaID: {
      allowNull: false,
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'cerpen',
  });
  return cerpen;
};