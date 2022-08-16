"use strict";
const { Model, STRING } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserGameHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserGameHistory.belongsTo(models.User, {
        foreignKey: "userId",
      });
      UserGameHistory.belongsTo(models.PlayerRoom, {
        foreignKey: "roomId",
      });
    }
  }
  UserGameHistory.init(
    {
      playerChoice: DataTypes.STRING,
      // result: DataTypes.STRING,
      roomId: DataTypes.INTEGER,
      gameRound: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserGameHistory",
    }
  );
  return UserGameHistory;
};
