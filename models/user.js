'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.kelas,{
        foreignKey: "UserID", as: "userKelas"
      })
      this.hasMany(models.progressUser,{
        foreignKey: "UserID", as: "userProgress"
      })
    }
  }
  user.init({
    UserID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Username: DataTypes.STRING,
    Email: DataTypes.STRING,
    Password: DataTypes.STRING,
    Role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};