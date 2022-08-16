"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.hasMany(models.UserGameHistory, {
      //   foreignKey: "ownerId",
      // });
      User.hasMany(models.PlayerRoom, {
        foreignKey: "userId",
      });
      User.hasOne(models.PlayerRoom, {
        foreignKey: "challengerId",
      });
    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      password: {
        type: DataTypes.STRING,
        set(value) {
          this.setDataValue("password", hashPassword(value));
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
