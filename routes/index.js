const router = require("express").Router();
const userRoute = require("./userRoute");
const roomRoute = require("./roomRoute");
const fightRoute = require("./fightRoute");
router.use(userRoute);
router.use(roomRoute);
router.use(fightRoute);

module.exports = router;
