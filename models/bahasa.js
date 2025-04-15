'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bahasa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.kelas, {
        foreignKey: "BahasaID", as: "bahasaKelas"
      })
      this.hasMany(models.cerpen, {
        foreignKey: "BahasaID", as: "bahasaCerpen"
      })
    }
  }
  bahasa.init({
    BahasaID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    NamaBahasa: DataTypes.STRING,
    Provinsi: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bahasa',
  });
  return bahasa;
};