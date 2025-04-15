'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class progressUser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, { foreignKey: "UserID" })
      this.belongsTo(models.kelas, {foreignKey: "KelasID"})
      this.belongsTo(models.modul, {foreignKey: "ModulID"})
    }
  }
  progressUser.init({
    ProgressID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    UserID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    KelasID: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    ModulID: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    Status: DataTypes.BOOLEAN,
    ProgressPersen: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'progressUser',
  });
  return progressUser;
};