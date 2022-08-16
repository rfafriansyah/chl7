const router = require("express").Router();
const roomController = require("../controllers/roomController");

const Authentication = require("../middlewares/authn");

router.post("/create-room", Authentication, roomController.createRoom);
router.post("/join-room/:room_id", Authentication, roomController.joinRoom);
module.exports = router;
