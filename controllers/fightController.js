const { User, PlayerRoom, UserGameHistory } = require("../models");
const { Op } = require("sequelize");

const match = async (req, res, next) => {
  try {
    let { playerChoice } = req.body;

    if (playerChoice !== "P" || playerChoice !== "R" || playerChoice !== "S") {
      throw {
        message: "Invalid input",
        statusCode: 400,
      };
    }
    let userId = req.userLogin.id;
    let { room_id } = req.params;

    let room = await PlayerRoom.findByPk(room_id);
    if (!room) {
      throw {
        message: "Room not found",
        statusCode: 404,
      };
    }

    if (!room.roomStatus) {
      throw {
        message: "There is no challenger",
        statusCode: 400,
      };
    }

    let totalRound = await UserGameHistory.findAll({
      where: { roomId: room_id, userId },
    });

    let history = await UserGameHistory.create({
      playerChoice,
      roomId: room_id,
      gameRound: totalRound.length,
      userId,
    });

    res.status(200).json({ message: "History created" });
  } catch (error) {
    next(error);
  }
};

const getAllHistory = async (req, res, next) => {
  try {
    let histories = await UserGameHistory.findAll();
    res.status(200).json(histories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  match,
  getAllHistory,
};
