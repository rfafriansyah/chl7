"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class PlayerRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      PlayerRoom.hasMany(models.UserGameHistory, {
        foreignKey: "roomId",
      });

      PlayerRoom.belongsTo(models.User, {
        foreignKey: "ownerId",
      });

      PlayerRoom.belongsTo(models.User, {
        foreignKey: "challengerId",
      });
    }
  }
  PlayerRoom.init(
    {
      name: DataTypes.STRING,
      ownerId: DataTypes.INTEGER,
      challengerId: DataTypes.INTEGER,
      roomStatus: DataTypes.BOOLEAN,
      ownerTurn: DataTypes.BOOLEAN,
      challengerTurn: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "PlayerRoom",
    }
  );
  return PlayerRoom;
};
