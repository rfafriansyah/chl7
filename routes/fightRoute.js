const router = require("express").Router();
const fightController = require("../controllers/fightController");
const Authentication = require("../middlewares/authn");

router.get("/histories", fightController.getAllHistory);
router.post("/fight/:room_id", Authentication, fightController.match);
module.exports = router;
