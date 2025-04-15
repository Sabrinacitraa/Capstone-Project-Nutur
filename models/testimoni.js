'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class testimoni extends Model {
    static associate(models) {
      this.belongsTo(models.kelas, {
        foreignKey: "KelasID",
        as: "kelas"
      });

      this.belongsToMany(models.user, {
        through: models.progressUser,
        foreignKey: "KelasID",
        otherKey: "UserID",
        as: "users"
      });
    }
  }

  testimoni.init({
    TestiID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    KelasID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    UserID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Deskripsi: DataTypes.STRING
}, {
    sequelize,
    modelName: 'testimoni',
});


  return testimoni;
};