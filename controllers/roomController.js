const { PlayerRoom } = require("../models");

const createRoom = async (req, res, next) => {
  try {
    let { name } = req.body;
    let newRoom = await PlayerRoom.create({
      name,
      ownerId: req.userLogin.id,
      roomStatus: false,
      ownerTurn: false,
      challengerTurn: false,
    });
    res.status(201).json({ id: newRoom.id });
  } catch (error) {
    next(error);
  }
};

const joinRoom = async (req, res, next) => {
  try {
    let { room_id } = req.params;
    let userId = req.userLogin.id;
    let room = await PlayerRoom.findByPk(room_id);
    if (!room) {
      throw {
        message: "Room not found",
        statusCode: 404,
      };
    }
    if (room.challengerId) {
      throw {
        message: "Already have a challenger",
        statusCode: 400,
      };
    }
    await PlayerRoom.update(
      { challengerId: userId, roomStatus: true },
      { where: { id: room_id } }
    );
    res.status(200).json({ message: "Player 2 join the game" });
  } catch (error) {
    next(error);
  }
};

// const getAllRoom = async (req, res, next) => {
//   try {
//     let { name, roomStatus } = req.body;
//     let newRoom = await PlayerRoom.create({
//       name,
//       roomStatus,
//       ownerId: req.userLogin.id,
//       roomStatus: false,
//     });
//     res.status(201).json({ id: newRoom.id });
//   } catch (error) {
//     next(error);
//   }
// };

module.exports = {
  createRoom,
  joinRoom,
};
